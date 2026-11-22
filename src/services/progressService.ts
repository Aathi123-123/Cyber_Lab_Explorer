import type { AttackId } from '../data'

export type LearningSection = 'Overview' | 'Attack Flow' | 'Interactive Simulation' | 'Practical Lab' | 'Vulnerable vs Secure Code' | 'Defense' | 'Knowledge Test'
export type ModuleProgress = {
  started: boolean
  completed: boolean
  sections: Record<LearningSection, boolean>
  startedAt: string | null
  completedAt: string | null
  simulationCompleted: boolean
  labCompleted: boolean
  quizBestScore: number
  quizAttempts: number
  timeSpentSeconds: number
  lastSection: LearningSection
}
export type ActivityRecord = { id: string; name: string; module: string; completed: boolean; timestamp: string; xpEarned: number }
export type XPRecord = { id: string; reason: string; amount: number; timestamp: string }
export type Achievement = { id: string; name: string; unlockedAt: string }
export type QuizResult = { module: AttackId; score: number; maxScore: number; timestamp: string }
export type UserProgress = {
  version: 1
  userId: string
  modules: Record<AttackId, ModuleProgress>
  currentModule: AttackId | null
  currentSection: LearningSection | null
  lastVisitedPage: string
  lastVisitedModule: AttackId | null
  xp: number
  xpHistory: XPRecord[]
  achievements: Achievement[]
  activityHistory: ActivityRecord[]
  quizResults: QuizResult[]
  streak: number
  lastActivityTimestamp: string | null
  timeSpentSeconds: number
}

const STORAGE_KEY = 'cyberlab-progress-v1'
export const moduleSections: LearningSection[] = ['Overview', 'Attack Flow', 'Interactive Simulation', 'Practical Lab', 'Vulnerable vs Secure Code', 'Defense', 'Knowledge Test']
const attackIds: AttackId[] = ['ddos','sqli','xss','csrf','reflected-xss','stored-xss','dom-xss','command-injection','ssti','xxe','clickjacking','open-redirect','ssrf','idor','broken-access','privilege-escalation','auth-bypass','session-weakness','jwt','password-reset','bola','api-exposure','function-auth','api-rate-limit','cors','path-traversal','file-upload','deserialization']

const newModule = (): ModuleProgress => ({
  started: false, completed: false,
  sections: Object.fromEntries(moduleSections.map((section) => [section, false])) as Record<LearningSection, boolean>,
  startedAt: null, completedAt: null, simulationCompleted: false, labCompleted: false,
  quizBestScore: 0, quizAttempts: 0, timeSpentSeconds: 0, lastSection: 'Overview',
})
export const createDefaultProgress = (): UserProgress => ({
  version: 1, userId: crypto.randomUUID(), modules: Object.fromEntries(attackIds.map((id) => [id, newModule()])) as Record<AttackId, ModuleProgress>,
  currentModule: null, currentSection: null, lastVisitedPage: '/', lastVisitedModule: null,
  xp: 0, xpHistory: [], achievements: [], activityHistory: [], quizResults: [],
  streak: 0, lastActivityTimestamp: null, timeSpentSeconds: 0,
})

export function isValidProgress(value: unknown): value is UserProgress {
  if (!value || typeof value !== 'object') return false
  const p = value as Partial<UserProgress>
  return p.version === 1 && typeof p.userId === 'string' && !!p.modules &&
    typeof p.xp === 'number' && Array.isArray(p.activityHistory) &&
    ['ddos','sqli','xss','csrf'].every((id) => !!(p.modules as Partial<Record<AttackId, ModuleProgress>>)[id as AttackId])
}

export function getUserProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed: unknown = JSON.parse(raw)
      if (isValidProgress(parsed)) return migrateMissingFields(parsed)
    }
  } catch { /* Corrupt or unavailable storage falls back safely. */ }
  try {
    const legacyRaw = localStorage.getItem('cyberlab-progress')
    if (legacyRaw) {
      const legacy = JSON.parse(legacyRaw) as { completed?: AttackId[]; labs?: number; points?: number; visited?: AttackId[] }
      const migrated = createDefaultProgress()
      migrated.xp = typeof legacy.points === 'number' && legacy.points >= 0 ? legacy.points : 0
      for (const id of Array.isArray(legacy.completed) ? legacy.completed.filter((item) => attackIds.includes(item)) : []) {
        migrated.modules[id].started = true
        migrated.modules[id].completed = true
        migrated.modules[id].completedAt = new Date().toISOString()
        moduleSections.forEach((section) => { migrated.modules[id].sections[section] = true })
      }
      migrated.lastVisitedModule = Array.isArray(legacy.visited) ? legacy.visited.find((id) => attackIds.includes(id)) || null : null
      saveUserProgress(migrated)
      return migrated
    }
  } catch { /* Ignore malformed legacy data and create a clean profile. */ }
  const fresh = createDefaultProgress()
  saveUserProgress(fresh)
  return fresh
}
function migrateMissingFields(p: UserProgress): UserProgress {
  const defaults = createDefaultProgress()
  const modules = { ...defaults.modules }
  for (const id of attackIds) {
    const current = p.modules[id] as ModuleProgress | undefined
    modules[id] = current ? { ...newModule(), ...current, sections: { ...newModule().sections, ...(current.sections || {}) } } : modules[id]
  }
  return { ...defaults, ...p, modules, xpHistory: p.xpHistory || [], achievements: p.achievements || [], quizResults: p.quizResults || [] }
}
export function saveUserProgress(progress: UserProgress): void {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)) } catch { /* Storage can be unavailable in privacy modes. */ }
}

function mutate(mutator: (p: UserProgress) => void): UserProgress {
  const p = getUserProgress()
  const previousActivityTimestamp = p.lastActivityTimestamp
  mutator(p)
  const now = new Date()
  p.lastActivityTimestamp = now.toISOString()
  if (!previousActivityTimestamp) {
    p.streak = 1
  } else {
    const previous = new Date(previousActivityTimestamp)
    const dayDistance = Math.floor((Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) - Date.UTC(previous.getFullYear(), previous.getMonth(), previous.getDate())) / 86400000)
    p.streak = dayDistance === 0 ? Math.max(1, p.streak) : dayDistance === 1 ? p.streak + 1 : 1
  }
  saveUserProgress(p)
  return p
}
function addActivity(p: UserProgress, name: string, module: string, xpEarned: number) {
  p.activityHistory.unshift({ id: crypto.randomUUID(), name, module, completed: true, timestamp: new Date().toISOString(), xpEarned })
  p.activityHistory = p.activityHistory.slice(0, 100)
}
function addXP(p: UserProgress, reason: string, amount: number, activityKey: string): number {
  if (p.xpHistory.some((entry) => entry.id === activityKey)) return 0
  p.xp += amount
  p.xpHistory.push({ id: activityKey, reason, amount, timestamp: new Date().toISOString() })
  return amount
}
function unlockAchievement(p: UserProgress, id: string, name: string) {
  if (!p.achievements.some((item) => item.id === id)) p.achievements.push({ id, name, unlockedAt: new Date().toISOString() })
}
function maybeCompleteModule(p: UserProgress, id: AttackId) {
  const m = p.modules[id]
  const required: LearningSection[] = ['Overview', 'Attack Flow', 'Interactive Simulation', 'Practical Lab', 'Vulnerable vs Secure Code', 'Defense', 'Knowledge Test']
  if (!m.completed && required.every((section) => m.sections[section])) {
    m.completed = true
    m.completedAt = new Date().toISOString()
    const xp = addXP(p, `${id} module completed`, 50, `module:${id}:complete`)
    addActivity(p, 'Attack module completed', id, xp)
    unlockAchievement(p, 'cyberlab-master', 'CyberLab Master')
  }
}

export function updateModuleProgress(id: AttackId, section: LearningSection, page = `/attack/${id}`): UserProgress {
  return mutate((p) => {
    const m = p.modules[id]
    m.started = true
    m.startedAt ||= new Date().toISOString()
    m.sections[section] = true
    if (section === 'Overview') {
      const xp = addXP(p, `${id} overview completed`, 10, `module:${id}:overview`)
      if (xp) addActivity(p, 'Overview completed', id, xp)
    }
    m.lastSection = section
    p.currentModule = id
    p.currentSection = section
    p.lastVisitedModule = id
    p.lastVisitedPage = page
  })
}
export function completeModule(id: AttackId): UserProgress {
  return mutate((p) => {
    moduleSections.forEach((section) => { p.modules[id].sections[section] = true })
    maybeCompleteModule(p, id)
  })
}
export function updateSimulationProgress(id: AttackId, section: LearningSection = 'Interactive Simulation'): UserProgress {
  return mutate((p) => {
    p.modules[id].started = true
    p.modules[id].lastSection = section
    p.modules[id].sections[section] = p.modules[id].sections[section]
    p.currentModule = id
    p.currentSection = section
  })
}
export function completeSimulation(id: AttackId): UserProgress {
  return mutate((p) => {
    const m = p.modules[id]
    m.started = true
    m.startedAt ||= new Date().toISOString()
    m.sections['Interactive Simulation'] = true
    m.simulationCompleted = true
    m.lastSection = 'Interactive Simulation'
    p.currentModule = id
    p.currentSection = 'Interactive Simulation'
    p.lastVisitedModule = id
    p.lastVisitedPage = `/attack/${id}`
    const xp = addXP(p, `${id} simulation completed`, 20, `module:${id}:simulation`)
    addActivity(p, 'Simulation completed', id, xp)
    if (id === 'ddos') unlockAchievement(p, 'network-explorer', 'Network Explorer')
    unlockAchievement(p, 'first-steps', 'First Steps')
    maybeCompleteModule(p, id)
  })
}
export function completeLab(id: AttackId): UserProgress {
  return mutate((p) => {
    const m = p.modules[id]
    m.started = true
    m.sections['Practical Lab'] = true
    m.labCompleted = true
    const xp = addXP(p, `${id} lab completed`, 30, `module:${id}:lab`)
    addActivity(p, 'Practical lab completed', id, xp)
    unlockAchievement(p, 'lab-specialist', 'Lab Specialist')
    maybeCompleteModule(p, id)
  })
}
export function saveQuizScore(id: AttackId, score: number, maxScore: number): UserProgress {
  return mutate((p) => {
    const m = p.modules[id]
    m.started = true
    m.quizAttempts += 1
    m.quizBestScore = Math.max(m.quizBestScore, score)
    m.sections['Knowledge Test'] = score === maxScore
    p.quizResults.push({ module: id, score, maxScore, timestamp: new Date().toISOString() })
    p.quizResults = p.quizResults.slice(-100)
    const earned = score === maxScore ? 50 : Math.round(score / maxScore * 30)
    const xp = addXP(p, `${id} quiz completed`, earned, `module:${id}:quiz`)
    addActivity(p, `Quiz completed — ${score}/${maxScore}`, id, xp)
    if (score === maxScore && id === 'sqli') unlockAchievement(p, 'sql-defender', 'SQL Defender')
    if (score === maxScore && (id === 'xss' || id === 'csrf')) unlockAchievement(p, 'browser-security', 'Browser Security Expert')
    maybeCompleteModule(p, id)
  })
}
export function awardXP(amount: number, reason: string, activityId: string): UserProgress {
  return mutate((p) => {
    const xp = addXP(p, reason, amount, activityId)
    addActivity(p, reason, 'General', xp)
  })
}
export function getLearningStreak(progress = getUserProgress()): number {
  if (!progress.lastActivityTimestamp) return 0
  const last = new Date(progress.lastActivityTimestamp)
  const today = new Date()
  const dayDistance = Math.floor((Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) - Date.UTC(last.getFullYear(), last.getMonth(), last.getDate())) / 86400000)
  return dayDistance <= 1 ? Math.max(1, progress.streak) : 0
}
export function getLastVisitedModule(): AttackId | null { return getUserProgress().lastVisitedModule }
export function setLastVisitedPage(page: string, id: AttackId | null = null): UserProgress {
  return mutate((p) => { p.lastVisitedPage = page; if (id) p.lastVisitedModule = id })
}
export function addLearningTime(seconds: number, id: AttackId | null = null): UserProgress {
  const safeSeconds = Number.isFinite(seconds) && seconds > 0 ? Math.round(seconds) : 0
  if (!safeSeconds) return getUserProgress()
  return mutate((p) => {
    p.timeSpentSeconds += safeSeconds
    if (id) p.modules[id].timeSpentSeconds += safeSeconds
  })
}
export function resetProgress(): UserProgress {
  const fresh = createDefaultProgress()
  saveUserProgress(fresh)
  return fresh
}
