# vNext — working prototype

A fully clickable prototype of the **vNext clean-room concept** — Positions,
Bets, Plays, Ledger, Signal, Close and Delta — built as a nine-stop walkthrough
of one fictional customer's quarter. The product thesis in one line:

> vNext exists so a marketer can place fewer, provable bets and hand each one
> to AI at exactly the level of trust it has earned.

The concept document this implements is in [`docs/concept.md`](docs/concept.md).
The exact demo click path is in [`DEMO.md`](DEMO.md).

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
```

`npm run build` typechecks and produces a static build; `npm run preview`
serves it.

## What's inside

- **Vite + React 19 + TypeScript + Tailwind v4 + React Router** — no component
  libraries, no state management beyond React.
- **`src/data/`** — the entire fictional world as structured TypeScript:
  Plumbline Security (mid-market compliance-automation SaaS, 82 people), its
  marketing team, 12 months of portal data, the 280K-portal benchmark ranges,
  two active Bets, four Plays, five Positions, an append-only Ledger, the Q3
  credit economy (◆200/quarter), and the scripted narratives for each screen.
  Components render only what the data files say — numbers reconcile across
  screens.
- **`src/screens/`** — the nine stops plus the overview.
- **`src/components/`** — the instrument-panel kit: the two structurally
  distinct clocks (BusinessClock with progress/plan/target; TrendSpark/
  TrendStat with corpus bands and deliberately no progress bars), wave plans,
  Slack-card mirrors, ledger tables, signature rows, diff blocks, receipts.

## Scope notes

Deliberately not built: auth, settings, admin, real API calls, mobile layouts,
animation beyond hover. Interactions are per-screen and reset on reload — each
stop initializes to its scripted moment so the demo never has ordering
dependencies. All companies, people and numbers are fictional.
