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
- Client-side persistence for study data and preferences using `localStorage`.
- Responsive navigation drawer on small screens and adaptive page layouts.

## Current data and authentication model

This repository contains a frontend-only application. Study data is managed by the React context in `src/context/StudyContext.jsx` and persisted in the browser with `localStorage`. The project does **not** currently provide API-backed authentication, a backend service, or study-data API endpoints. The roadmap in Settings is a feature poll, not implemented authentication or cloud storage. The AI assistant also uses simulated responses rather than a remote AI service.

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
| `/tasks` | Tasks |
| `/courses` | Courses |
| `/assignments` | Assignments |
| `/examcountdown` | Exam countdown |
| `/notes` | Notes |
| `/ai-assistant` | Study assistant |
| `/settings` | Settings and roadmap |

Routes are declared in `src/App.jsx` using React Router. Unknown paths redirect to the dashboard.

## Project structure

```text
src/
├── App.jsx                  # Application routes and providers
├── App.css                  # Tailwind entry point
├── index.css                # Global theme and shared styles
├── components/
│   ├── common/              # Global search and notification popover
│   ├── layout/              # App shell, header, and responsive navigation
│   └── modals/              # Create/edit forms for study data
├── context/
│   └── StudyContext.jsx     # Shared application state and localStorage sync
├── pages/                   # Dashboard and routed feature pages
└── utils/                   # Seed data and localStorage helpers
```

## Responsive design

StudyFlow adapts across mobile phones, tablets, and desktop displays. On narrow screens, the persistent sidebar becomes an off-canvas navigation drawer, the header controls and content spacing contract, multi-column forms and dashboards stack, and dialogs fit within the viewport and scroll internally. Tablet and desktop breakpoints progressively restore multi-column cards, wider workspaces, and the full sidebar. Content is designed to reflow without requiring page-wide horizontal scrolling.
