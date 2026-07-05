# Verify this repo

Single-package Vite + React + TS SPA. No tests; verification is driving the
app in a browser.

## Build & serve

```bash
npm install
npm run build                          # tsc --noEmit && vite build
npx vite preview --port 4173 --strictPort   # serves dist/ with SPA fallback
```

(`npm run dev` on :5173 works too; preview is closer to shipped output.)

## Drive

Chromium is preinstalled; use playwright-core (install it in a scratch dir,
not this repo) with `executablePath: "/opt/pw-browsers/chromium"`,
viewport 1440×900.

Routes: `/`, `/close/retro`, `/close/weekly`, `/delta`,
`/bets/fintech-pipeline`, `/bets/authority`, `/plays/reengagement/bid`,
`/prosecutor`, `/coordination`, `/positions` (+ `#signal`, `#mql-sql`
anchors), `/incident`. Unknown routes redirect to `/`.

Flows worth exercising (each resets on reload; no ordering dependencies):

- retro: uncheck boxes (confirm disables at 0) → "Confirm 6 groupings"
- weekly close: "Kill the play" → reclaim banner; "Confirm all six" → chips flip
- delta: "Unsend — true undo" → recall banner
- bid: "Sign the grant" → "Advance the demo clock" → pick a change-order option
- coordination: "Next →" through all 8 steps (artifact area changes per step)
- bet detail: `<details>` receipts; switch link between the two bets

## Gotchas

- Full-page screenshots duplicate the sticky sidebar/topbar mid-image —
  screenshot artifact, not a bug. Use viewport shots to judge chrome.
- Numbers are cross-reconciled in `src/data/` (credits per moment in
  `company.ts` → top bar; wave math 40/120/240; ◆14/60-of-200 strip). If you
  change one, grep for its neighbors.
