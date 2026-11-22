import { create } from 'zustand'
import type { AttackId } from './data'
import {
  completeLab, completeSimulation, getUserProgress, resetProgress, saveQuizScore,
  addLearningTime,
  setLastVisitedPage, updateModuleProgress,
  type LearningSection, type UserProgress,
} from './services/progressService'

type State = UserProgress & {
  completed: AttackId[]
  labs: number
  points: number
  visited: AttackId[]
  complete: (id: AttackId, points?: number) => void
  visit: (id: AttackId, section?: LearningSection) => void
  completeSimulation: (id: AttackId) => void
  completeLab: (id: AttackId) => void
  saveQuizScore: (id: AttackId, score: number, maxScore: number) => void
  setPage: (page: string, id?: AttackId | null) => void
  reset: () => void
  completeSection: (id: AttackId, section: LearningSection) => void
  addLearningTime: (seconds: number, id?: AttackId | null) => void
}
const initial = getUserProgress()
const derive = (p: UserProgress): Partial<State> => ({
  ...p,
  completed: (Object.keys(p.modules) as AttackId[]).filter((id) => p.modules[id].completed),
  labs: (Object.keys(p.modules) as AttackId[]).filter((id) => p.modules[id].labCompleted).length,
  points: p.xp,
  visited: p.lastVisitedModule ? [p.lastVisitedModule] : [],
})
export const useProgress = create<State>((set) => ({
  ...initial,
  completed: (Object.keys(initial.modules) as AttackId[]).filter((id) => initial.modules[id].completed),
  labs: (Object.keys(initial.modules) as AttackId[]).filter((id) => initial.modules[id].labCompleted).length,
  points: initial.xp,
  visited: initial.lastVisitedModule ? [initial.lastVisitedModule] : [],
  complete: (id) => set(() => derive(completeSimulation(id)) as State),
  visit: (id, section = 'Overview') => set(() => derive(updateModuleProgress(id, section, `/attack/${id}`)) as State),
  completeSimulation: (id) => set(() => derive(completeSimulation(id)) as State),
  completeLab: (id) => set(() => derive(completeLab(id)) as State),
  saveQuizScore: (id, score, max) => set(() => derive(saveQuizScore(id, score, max)) as State),
  setPage: (page, id = null) => set(() => derive(setLastVisitedPage(page, id)) as State),
  reset: () => set(() => derive(resetProgress()) as State),
  completeSection: (id, section) => set(() => derive(updateModuleProgress(id, section, `/attack/${id}`)) as State),
  addLearningTime: (seconds, id = null) => set(() => derive(addLearningTime(seconds, id)) as State),
}))
