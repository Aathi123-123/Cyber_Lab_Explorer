# CyberLab Explorer

<div align="center">
  <img src="./public/logo-kit/cyberlab-logo-horizontal-white-1200.png" alt="CyberLab Explorer" width="600" />
  <br />
  <strong>Understand Every Attack. Master Every Defense.</strong>
  <br /><br />

  [![Live Demo](https://img.shields.io/badge/Live_Demo-CyberLab_Explorer-40d9ff?style=for-the-badge&logo=netlify&logoColor=white)](https://cyberlabexplorer.netlify.app)
  [![GitHub](https://img.shields.io/badge/GitHub-Aathi123--123-111827?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Aathi123-123)
  [![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
</div>

---

## About

**CyberLab Explorer** is a browser-based cybersecurity learning platform for understanding vulnerabilities through controlled, interactive simulations. It focuses on attack mechanics, defensive implementation, practical labs, and measurable learning progress.

The application runs entirely in the browser. It does not connect to real targets, execute exploit payloads, access a real database, or send security testing traffic outside the app.

## Live Application

**Production:** [cyberlabexplorer.netlify.app](https://cyberlabexplorer.netlify.app)

No login or account is required. Learning progress is stored locally in the current browser.

## Features

- 28+ vulnerability learning modules
- Interactive browser-only attack simulations
- Vulnerable and protected implementation modes
- Animated traffic, request, validation, and response flows
- DDoS / DoS, SQL injection, XSS, CSRF, SSRF, IDOR, and many more labs
- Start, pause, resume, reset, step, and playback-speed controls
- Event timeline and simulated request inspector
- Monaco-based vulnerable versus secure code examples
- Practical labs with completion tracking
- Multiple-choice knowledge tests
- XP, achievements, streaks, and activity history
- Personalized learning roadmap
- LocalStorage progress persistence
- Responsive desktop, tablet, and mobile layouts
- Reduced-motion accessibility support

## Main Sections

| Section | Purpose |
|---|---|
| Dashboard | Learning overview and continue-learning card |
| Attack Explorer | Searchable vulnerability library |
| Network Attacks | Network availability simulations |
| Web Applications | Categorized browser security laboratory |
| Interactive Labs | Practical browser-based challenges |
| Defense Center | Security controls and implementation concepts |
| Knowledge Tests | Module quizzes and feedback |
| My Learning | XP, progress, roadmap, achievements, and activity |

## Technology

- React 18
- TypeScript
- Vite
- Zustand
- React Router
- Motion
- Monaco Editor
- Recharts
- Lucide React
- LocalStorage

## Local Development

### Requirements

- Node.js 20 or newer
- npm

### Install and run

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:5173`.

### Production build

```bash
npm run build
npm run preview
```

The production bundle is generated in `dist/`.

## Netlify Deployment

This repository includes `netlify.toml` and `public/_redirects`.

Netlify settings:

- Build command: `npm run build`
- Publish directory: `dist`

## Progress and Privacy

Progress is stored locally in the browser under a versioned LocalStorage key. It includes:

- Started and completed modules
- Individual learning-stage completion
- Simulation and lab completion
- Quiz results
- XP history
- Achievements
- Activity history
- Learning streak
- Last visited module and section

Progress is private to the browser and does not require authentication or transmit personal data to a server.

## Safety

CyberLab Explorer uses only synthetic data and simulated flows:

- No real network flooding
- No external scanning
- No real SQL database attacks
- No executable JavaScript injection
- No shell-command execution
- No real SSRF requests
- No real file-system access
- No real account or authentication actions

## Project Structure

```text
src/
  components/
  layout/
  dashboard/
  attack/
  simulation/
  labs/
  code/
  quiz/
  pages/
  data/
  hooks/
  store/
  services/
  types/
  utils/
```

## Author

**Ahammed Aathif Meppatta Chalil**

- GitHub: [@Aathi123-123](https://github.com/Aathi123-123)
- Repository: [Aathi123-123/Cyber_Lab_Explorer](https://github.com/Aathi123-123/Cyber_Lab_Explorer)

## License

Educational use. Add a license to the repository before using this project for commercial distribution.
