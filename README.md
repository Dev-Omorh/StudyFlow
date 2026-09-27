# StudyFlow

StudyFlow is a responsive student productivity single-page application for organizing courses, tasks, assignments, exams, and study notes. It is built with React, Vite, React Router, and Tailwind CSS.

## Features

- Dashboard with study summaries, an exam countdown, and a Pomodoro timer.
- Task list and Kanban views, filters, and task status management.
- Course directory with progress summaries and related study data.
- Assignment tracker with status stages and grades.
- Exam countdowns with study-scope checklists.
- Notes workspace with search, course filtering, favorites, and Markdown export.
- Study assistant demo with suggested prompts and simulated responses.
- Global search, notifications, quick-create menus, and light/dark themes.
- API-backed account sessions and study data, with the selected theme persisted in `localStorage`.
- Responsive navigation drawer on small screens and adaptive page layouts.

## Current data and authentication model

Authentication and study data are supplied by a separate backend API. The frontend uses `src/services/api.js` to call `/api/auth/*` and the `/api/{tasks,courses,assignments,exams,notes,notifications}` endpoints, attaching the stored bearer token to requests and clearing expired sessions on `401`. Study data is not stored as a local mock; only the theme preference and the fallback profile are browser-persisted. The roadmap in Settings is a feature poll, not a promise of implemented cloud features. The AI assistant currently uses simulated responses rather than a remote AI service.

## Technology

- React 19 and JavaScript (ES modules)
- Vite 8
- React Router 7
- Tailwind CSS 4 with the Vite plugin
- Lucide React icons

## Getting started

Use a Node.js version supported by Vite 8 and npm.

```bash
npm install
npm run dev
```

Vite prints the local development URL in the terminal. To check the production bundle and lint the project:

```bash
npm run build
npm run lint
```

To serve a production build locally:

```bash
npm run preview
```

## Application routes

| Path | Page |
| --- | --- |
| `/` | Dashboard |
| `/login` | Sign in |
| `/signup` | Create an account |
| `/auth/callback` | Complete Google OAuth sign-in |
| `/tasks` | Tasks |
| `/courses` | Courses |
| `/assignments` | Assignments |
| `/examcountdown` | Exam countdown |
| `/notes` | Notes |
| `/ai-assistant` | Study assistant |
| `/settings` | Settings and roadmap |

Routes are declared in `src/App.jsx` using React Router. Study pages are guarded by the `/api/auth/me` session check. The Google OAuth callback stores the returned `token` as `auth_token` and verifies it before returning to the app. Unknown paths redirect to the dashboard.

## Project structure

```text
src/
├── App.jsx                  # Application routes and providers
├── App.css                  # Tailwind entry point
├── index.css                # Global theme and shared styles
├── components/
│   ├── auth/                # Protected route guard
│   ├── common/              # Global search and notification popover
│   ├── layout/              # App shell, header, and responsive navigation
│   └── modals/              # Create/edit forms for study data
├── context/
│   ├── AuthContext.jsx      # Login, signup, and session restoration
│   └── StudyContext.jsx     # API-backed study data and shared UI state
├── pages/                   # Auth pages and routed feature pages
├── services/
│   └── api.js               # Bearer-token fetch helper and 401 handling
└── utils/                   # Seed data and localStorage helpers
```

## Responsive design

StudyFlow adapts across mobile phones, tablets, and desktop displays. On narrow screens, the persistent sidebar becomes an off-canvas navigation drawer, the header controls and content spacing contract, multi-column forms and dashboards stack, and dialogs fit within the viewport and scroll internally. Tablet and desktop breakpoints progressively restore multi-column cards, wider workspaces, and the full sidebar. Content is designed to reflow without requiring page-wide horizontal scrolling.
