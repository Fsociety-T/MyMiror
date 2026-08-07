# Personal OS

Most life trackers die in week 3 because logging costs more than it gives back.
This one inverts that:

1. **Logging a whole day takes under 15 seconds.**
2. **Every week it tells you something about yourself you didn't already know.**

If a feature doesn't serve one of those two sentences, it doesn't ship in v1.

## Run it

```bash
npm install
cp .env.example .env.local   # fill in your Supabase URL + anon key
npm run dev -- --host        # then open the LAN IP on your phone
```

**Never design this on a desktop viewport.** Test on the phone from day one.

## Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. Paste `supabase/migrations/0001_init.sql` into the SQL editor and run it.
3. Copy the URL + anon key into `.env.local`.
4. Regenerate types whenever the schema changes:

```bash
npx supabase gen types typescript --project-id <id> > src/types/database.ts
```

## Scripts

| Command | Does |
|---|---|
| `npm run dev` | Vite dev server |
| `npm run build` | Typecheck + production build |
| `npm run lint` | oxlint |
| `node scripts/make-icons.mjs` | Regenerate the PWA icons |

## Architecture rules

Two hard rules, no exceptions:

- **No component over 150 lines.**
- **No Supabase call inside a component** — always through `features/*/api.ts`.

```
src/
├── app/          router + providers
├── features/     organized by domain, not by file type
├── components/   ui primitives + layout
├── lib/          supabase, score (pure + testable), date
└── index.css     design tokens
```

## Design system

Charcoal, not pure black — pure black smears on OLED during scroll and kills
depth. One accent (indigo). Category colors appear **only** as a 2px bar, a ring
stroke, or an icon tint — never as a card fill. Depth comes from a 1px border,
never a shadow.

Motion: entrances run once per mount, never on re-render. No ambient looping
animation anywhere except the Urge Surf modal. `prefers-reduced-motion` is
respected globally.

## Phases

- [x] **Phase 1 — Shell.** Auth, 3-tab router, design tokens, PWA, mock screens.
- [ ] **Phase 2 — Today + logging.** The (+) sheet writes real data.
- [ ] **Phase 3 — Tasks, projects, streaks.** Life Shield, Urge Surf logging.
- [ ] **Phase 4 — Insights.** The Pattern Feed. This is the moat.
- [ ] **Phase 5 — Polish.**

**Do not start a phase until the previous one has been used for real for at
least 3 days. Every unused feature is a bug.**
