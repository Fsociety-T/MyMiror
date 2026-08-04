# AGENTS.md — My Mirror

This file defines how AI coding agents must work on this repository.

## Read first

- Read the complete `PROJECT_PLAN.md` before changing any code.
- Read `README.md` for the current phase status.

## Non-negotiable rules

1. Work on one phase at a time. Finish, verify, then stop and wait for approval.
2. Do not build Android (Capacitor) before the website is stable and tested.
3. Do not use React Native or Expo. Do not add iOS.
4. Use strict TypeScript and mobile-first responsive design.
5. Keep components small, typed and reusable. Do not rewrite working code unnecessarily.
6. Do not install unnecessary dependencies.
7. Never expose secret keys (Supabase service role, AI keys, GitHub tokens, signing secrets).
8. Never disable Supabase Row Level Security to fix a frontend problem.
9. All AI calls go through authenticated Supabase Edge Functions; AI-initiated database changes require user confirmation.
10. Respect the design system: tokens in `src/styles/tokens.css`, dark calm premium theme, 44px minimum touch targets, 360–430px phone widths, no horizontal scrolling.

## Required verification after major changes

```bash
npm run lint
npm run typecheck
npm run build
```

Fix all errors before stopping.

## Rules for the coding agent's output

- List all created and modified files.
- Explain important architecture decisions.
- Stop after completing the requested phase and wait for approval before starting the next one.
