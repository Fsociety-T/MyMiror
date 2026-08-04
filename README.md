# My Mirror

Your private space to reflect, plan, and take action.

A private personal life-management system: define who you want to become, turn goals into projects, projects into tasks, protect time with focus sessions, and learn from daily and weekly reviews.

## Status

| Phase | Name | Status |
| --- | --- | --- |
| 1 | Website foundation (shell, design system, navigation) | ✅ Done |
| 2 | Authentication | ⏳ Next |
| 3 | Onboarding, Vision, Home | — |
| 4 | Goals, Projects, Milestones | — |
| 5 | Tasks | — |
| 6 | Focus | — |
| 7 | Reviews and Notes | — |
| 8 | AI features | — |
| 9 | Testing and website release | — |
| 10 | Capacitor Android + cloud APK build | — |

See [PROJECT_PLAN.md](./PROJECT_PLAN.md) for the complete plan and agent rules.

## Tech stack

- React 19 + Vite + TypeScript (strict)
- React Router, Tailwind CSS, Lucide React
- TanStack Query, React Hook Form + Zod (later phases)
- Supabase (authentication, database, edge functions)
- Capacitor Android + GitHub Actions (later phases)

## Scripts

```bash
npm run dev        # start the dev server
npm run lint       # ESLint
npm run typecheck  # strict TypeScript checks
npm run build      # production website build
```

## Environment

Copy `.env.example` to `.env` and add your Supabase URL and anon key when authentication starts (Phase 2). No secrets are needed for Phase 1.

## Mobile-first

The application is designed mobile-first for Android. The web version is centered at 430px max width and already behaves like an Android app shell. Android packaging via Capacitor is added only after the website is stable (Phase 10).
