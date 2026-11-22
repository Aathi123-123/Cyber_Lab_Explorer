export type AttackId = 'ddos' | 'sqli' | 'xss' | 'csrf' | 'reflected-xss' | 'stored-xss' | 'dom-xss' | 'command-injection' | 'ssti' | 'xxe' | 'clickjacking' | 'open-redirect' | 'ssrf' | 'idor' | 'broken-access' | 'privilege-escalation' | 'auth-bypass' | 'session-weakness' | 'jwt' | 'password-reset' | 'bola' | 'api-exposure' | 'function-auth' | 'api-rate-limit' | 'cors' | 'path-traversal' | 'file-upload' | 'deserialization'
export type Attack = { id: AttackId; name: string; short: string; category: string; severity: string; difficulty: string; time: string; accent: string; icon: string }

export const attacks: Attack[] = [
  { id: 'ddos', name: 'DDoS / DoS', short: 'Overwhelm availability with coordinated request pressure.', category: 'Network', severity: 'High', difficulty: 'Beginner', time: '12 min', accent: '#40d9ff', icon: '◉' },
  { id: 'sqli', name: 'SQL Injection', short: 'Change query meaning through unsafe string construction.', category: 'Web', severity: 'Critical', difficulty: 'Intermediate', time: '15 min', accent: '#a78bfa', icon: '⌘' },
  { id: 'xss', name: 'Cross-site Scripting', short: 'See why untrusted browser content must be encoded.', category: 'Web', severity: 'High', difficulty: 'Beginner', time: '10 min', accent: '#fb7185', icon: '</>' },
  { id: 'csrf', name: 'CSRF', short: 'Understand forged requests and token-based protection.', category: 'Web', severity: 'High', difficulty: 'Intermediate', time: '14 min', accent: '#fbbf24', icon: '↯' },
  { id:'reflected-xss',name:'Reflected XSS',short:'Unsafe input is reflected into the browser response.',category:'Browser-side',severity:'High',difficulty:'Beginner',time:'12 min',accent:'#fb7185',icon:'<>'},
  { id:'stored-xss',name:'Stored XSS',short:'Untrusted content persists and affects later visitors.',category:'Browser-side',severity:'Critical',difficulty:'Intermediate',time:'16 min',accent:'#fb7185',icon:'DB'},
  { id:'dom-xss',name:'DOM-based XSS',short:'Client-side JavaScript creates unsafe DOM behavior.',category:'Browser-side',severity:'High',difficulty:'Intermediate',time:'14 min',accent:'#fb7185',icon:'DOM'},
  { id:'command-injection',name:'Command Injection',short:'Input changes the meaning of an application command.',category:'Injection',severity:'Critical',difficulty:'Advanced',time:'18 min',accent:'#a78bfa',icon:'>_'},
  { id:'ssti',name:'Server-Side Template Injection',short:'Template expressions expose server-side interpretation.',category:'Injection',severity:'Critical',difficulty:'Advanced',time:'20 min',accent:'#a78bfa',icon:'{{'},
  { id:'xxe',name:'XML External Entity',short:'Unsafe XML parsing resolves external entities.',category:'Injection',severity:'High',difficulty:'Advanced',time:'17 min',accent:'#a78bfa',icon:'XML'},
  { id:'ssrf',name:'Server-Side Request Forgery',short:'Server-side requests reach unintended internal services.',category:'Server-side',severity:'Critical',difficulty:'Advanced',time:'18 min',accent:'#60a5fa',icon:'URL'},
  { id:'idor',name:'IDOR',short:'Object identifiers expose records without ownership checks.',category:'Authorization',severity:'High',difficulty:'Beginner',time:'12 min',accent:'#34d399',icon:'ID'},
  { id:'bola',name:'BOLA',short:'API object authorization permits access outside the user scope.',category:'API security',severity:'Critical',difficulty:'Intermediate',time:'16 min',accent:'#34d399',icon:'API'},
  { id:'broken-access',name:'Broken Access Control',short:'Application routes lack consistent authorization checks.',category:'Authorization',severity:'Critical',difficulty:'Intermediate',time:'16 min',accent:'#34d399',icon:'AC'},
  { id:'privilege-escalation',name:'Privilege Escalation',short:'A low-privilege identity reaches protected capabilities.',category:'Authorization',severity:'Critical',difficulty:'Advanced',time:'18 min',accent:'#34d399',icon:'UP'},
  { id:'auth-bypass',name:'Authentication Bypass',short:'Login decisions can be reached without valid identity proof.',category:'Authentication',severity:'Critical',difficulty:'Intermediate',time:'15 min',accent:'#fbbf24',icon:'KEY'},
  { id:'session-weakness',name:'Session Management',short:'Session identifiers or lifetimes weaken account protection.',category:'Authentication',severity:'High',difficulty:'Intermediate',time:'14 min',accent:'#fbbf24',icon:'SID'},
  { id:'jwt',name:'JWT Misconfiguration',short:'Token algorithms or signatures are not validated correctly.',category:'Authentication',severity:'Critical',difficulty:'Advanced',time:'19 min',accent:'#fbbf24',icon:'JWT'},
  { id:'password-reset',name:'Password Reset Weakness',short:'Reset flows fail to authenticate the recovery request.',category:'Authentication',severity:'High',difficulty:'Intermediate',time:'15 min',accent:'#fbbf24',icon:'RST'},
  { id:'api-exposure',name:'Excessive Data Exposure',short:'API responses reveal fields the client does not need.',category:'API security',severity:'High',difficulty:'Beginner',time:'11 min',accent:'#60a5fa',icon:'{}'},
  { id:'function-auth',name:'Broken Function Authorization',short:'Sensitive functions lack role-based enforcement.',category:'API security',severity:'High',difficulty:'Intermediate',time:'14 min',accent:'#60a5fa',icon:'FN'},
  { id:'api-rate-limit',name:'API Rate Limiting',short:'Uncontrolled API volume enables automated abuse.',category:'API security',severity:'Medium',difficulty:'Beginner',time:'10 min',accent:'#60a5fa',icon:'RPM'},
  { id:'cors',name:'CORS Misconfiguration',short:'Browser origin policy grants overly broad cross-origin access.',category:'Configuration',severity:'High',difficulty:'Intermediate',time:'13 min',accent:'#c084fc',icon:'CORS'},
  { id:'path-traversal',name:'Path Traversal',short:'Untrusted paths escape an allowed file directory.',category:'File handling',severity:'High',difficulty:'Intermediate',time:'14 min',accent:'#60a5fa',icon:'../'},
  { id:'file-upload',name:'Unrestricted File Upload',short:'Uploaded content bypasses type and storage controls.',category:'File handling',severity:'Critical',difficulty:'Intermediate',time:'15 min',accent:'#60a5fa',icon:'UP'},
  { id:'deserialization',name:'Insecure Deserialization',short:'Serialized data triggers unsafe object reconstruction.',category:'Server-side',severity:'Critical',difficulty:'Advanced',time:'20 min',accent:'#60a5fa',icon:'SER'},
  { id:'clickjacking',name:'Clickjacking',short:'A trusted interface is obscured beneath deceptive framing.',category:'Browser-side',severity:'Medium',difficulty:'Beginner',time:'11 min',accent:'#fb7185',icon:'IFR'},
  { id:'open-redirect',name:'Open Redirect',short:'Redirect parameters send users to attacker-controlled destinations.',category:'Browser-side',severity:'Medium',difficulty:'Beginner',time:'10 min',accent:'#fb7185',icon:'→'},
]

export const quiz: Partial<Record<AttackId, { q: string; options: string[]; answer: number; why: string }[]>> = {
  ddos: [{ q: 'What does rate limiting help control?', options: ['Request volume', 'Password length', 'Database schema', 'HTML parsing'], answer: 0, why: 'Rate limiting caps requests per source or route.' }],
  sqli: [{ q: 'What is the primary defense against SQL injection?', options: ['Parameterized queries', 'Larger servers', 'Base64 passwords', 'More CSS'], answer: 0, why: 'Parameters keep data separate from SQL instructions.' }],
  xss: [{ q: 'What should a comment preview do with markup?', options: ['Render it as text', 'Execute it', 'Evaluate it', 'Save it as code'], answer: 0, why: 'Context-aware output encoding prevents interpretation.' }],
  csrf: [{ q: 'Which value proves a form came from the trusted app?', options: ['CSRF token', 'User-agent string', 'Screen size', 'Referrer alone'], answer: 0, why: 'A secret per-session or per-request token must be validated.' }],
}
