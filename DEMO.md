# vNext prototype — demo walkthrough

A clickable prototype of the vNext clean-room concept (Positions, Bets, Plays,
Ledger, Close, Delta), demonstrated through one fictional customer's quarter.

```bash
npm install
npm run dev        # → http://localhost:5173
```

Everything is fictional: **Plumbline Security, Inc.** (compliance automation,
82 people, $14.2M ARR), its people, and every number. Benchmarks reference the
concept's 280K-portal corpus. All data lives in `src/data/*.ts`.

**The demo has two time anchors.** Stop 1 is day one (Thu Jul 2, 2026 — the
Loop just installed). Stops 2–9 are week 8–9 of Q3 (Aug 24–31, 2026). The top
bar pins the credit and dollar meters to each screen's moment, so spend is
always honest for what you're looking at.

Your persona throughout: **Maya Okafor, Director of Marketing.**

---

## The click path

Start at **`/`** (stop 0 — Overview). Skim the cast, the two active Bets, and
the six-object model. Click **“Start at stop 1 →”**. Every screen has a footer
with “what this stop shows” and prev/next buttons — the path below adds the
clicks worth performing inside each stop.

### Stop 1 — Retroactive Close (`/close/retro`) · day one

1. Read the topline: $199.8K Q2 spend → $1.82M attributed pipeline (9.1× vs
   corpus median 7.2×), and **$40.2K that didn't pay — named**, not buried
   (executive dinners, display retargeting — both rows tinted red).
2. Note grouping confidence on each implied Bet and the visible
   **unattributed bucket** at the bottom of the list.
3. In the leadership narrative, find the webinar claim — the one shipping with
   **counterevidence attached** (78% had prior search touch).
4. Read the **90-second CFO story** aloud. That's the first value moment; no
   commitment exists yet.
5. Click **“Confirm 6 groupings as Bets”** — the 70% → 95% conversion prompt.
   This is the only ask, and it's two minutes, after value was delivered.
   (Probe: uncheck all six first — the button disables.)

### Stop 2 — Weekly Close (`/close/weekly`) · Mon Aug 24

1. Scan the four sections: **shipped / cost / returned / needs a decision**.
   Shipped items carry lineage chips (⚠ provisional vs ✓ confirmed) and
   author chips (human vs `AI · grant G-12 (L2)`).
2. In Cost, note credits itemized **beside** dollars — same ledger, same
   attribution.
3. In Returned, find the closed-won line: Brightledger $52K filed to the **Q2
   webinar cluster** (97-day lag) — not claimed by this week.
4. In the pruning docket, expand nothing — the benchmark receipts are already
   open: every metric below p25. Click **“Kill the play — reclaim ◆14 + $9.2K”**
   → pruning has negative cost. (Note “Narrow the scope” renders beside it,
   equal prominence.)
5. Click **“Confirm all six”** on the lineage batch — “Six items auto-filed
   under Fintech pipeline Q3. Right?” One tap; the provisional chips flip.

### Stop 3 — Delta (`/delta`) · Tue Aug 25, 10:15

1. Read the header: **“23 actions, all inside granted lanes. 2 deferrals
   waiting.”** — catch-up is scanning boundaries, not reading actions.
2. Item 1 is the auto-committed email **inside its 24h unsend window** — it
   outranks everything older because you can still act on it. Click
   **“Unsend”** to watch a true undo (◆4 refunds), or “Let it dispatch”.
3. Item 2: the parked bid with its **decay line** (−8%/week, cohort-based).
4. Note the credit strip: **◆14 this week · 60 of 200 Q3 remaining**, split
   per Bet.
5. Expand “18 routine actions inside lanes” at the bottom — collapsed because
   no review is owed.

### Stop 4 — Bet detail (`/bets/fintech-pipeline`)

1. The **standing answer**: Maya's judgment is the headline; computed facts
   (pace 78% of plan · $52.4K · ◆58 · next decision Sep 2) sit beneath it.
2. Expand **“receipts — the prosecutor's evidence”** under the risk line.
3. The **business clock**: progress bar, plan tick, target — and the link to
   the **brand clock** (trend only) at the right.
4. Two plays: the healthy webinar series and the pending-bid re-engagement.
5. Scroll the **Ledger** — grants, spends, outcomes, gates, the incident,
   the amendment — the whole quarter, append-only.
6. Use “switch: Own the compliance-benchmark conversation →” to see the
   brand Bet (marketing-only signature, same anatomy).

### Stop 5 — Bid & delegation (`/plays/reengagement/bid`)

1. Read the bid card left to right: **scope → ◆12 → expected 8–15 →
   benchmark basis (n=1,842)**, will-do / will-come-back-for, and the
   **undo story** (waves 10/30/60, 24h holds, four tripwires).
2. Note routing: legal is a **hard gate** because the incentive clause matched
   a rule legal co-signed — computed, not org-chart.
3. Click **“Sign the grant — fund ◆12”** → the scoped signature appears
   (scope hash, Ledger L-241, system countersignature).
4. Click **“⏩ Advance the demo clock”** → overnight sync grows the audience
   +30% → **auto-paused change order** with a re-bid.
5. Pick **“Keep original scope”** (the recorded timeline) — narrowing renders
   with equal prominence to expanding.

### Stop 6 — Prosecutor (`/prosecutor`)

Three placements, three artifacts:

1. **A** — the Bet's risk line with receipts (mirror of stop 4).
2. **B** — the narrative compiler: the nurture claim, its counterevidence
   (62% shared attribution), and the footnoted form that actually ships.
3. **C** — the promotion gate: branded search (+31%) argues for a target; the
   AI argues back (incumbent pricing change, G2 grid, UK holdout, r=0.41) —
   **DENIED**, logged L-238.

### Stop 7 — Coordination (`/coordination`)

Click **Next →** through all eight steps:

1. The signed bid (state on the object).
2. Routing computed from rules.
3. **Legal's Slack card** — only the diff that concerns them, rule cited.
4. Approve-with-edit (€50 EU cap) **writes back**; bid re-check passes below
   materiality — no re-auth bounce.
5. **Dana's Delta in sales language**: “~34 recovered contacts entering your
   queue starting Thursday.”
6. The mid-deal catch — disagreement located at the **definitions contract**,
   both parties get identical evidence.
7. The **one-line amendment** (v4.1) with its shadow canary (360 → 315).
8. What the mistake cost — links onward to stops 8 and 9.

### Stop 8 — Positions (`/positions`)

1. Top panel is **Signal — the brand clock**: trends vs corpus bands, share of
   category search — and structurally **no progress bars**.
2. **POS-01 ICP**: the drift card — fintech 40% of wins vs 15% of stated ICP,
   with the ghost v4 proposal and a decision date.
3. **POS-02 Voice**: the sameness flag — 0.87 vs corpus 0.79,
   “indistinguishable from what ~4,000 other portals shipped this month,”
   with your missing distinctive markers.
4. **POS-03 MQL/SQL contract**: rejection telemetry (203 sent · 61% SLA touch
   · top reason “no budget”, concentrated in one segment) and the **v4.1
   amendment** highlighted in the version history.
5. Note co-signatures everywhere, subscriber chips (MCP), and POS-05's
   permanent legal gate.

### Stop 9 — Undo in action (`/incident`)

1. Status banner: **CONTAINED** — then the wave plan: wave 1 sent (2 flagged),
   waves 2–3 **held with zero dispatched**.
2. Walk the containment timeline: tripwire at 09:27, auto-pause, suppression,
   deal-owner context alerts, owner-first sequencing.
3. The two **Slack mirror alerts** to deal owners — exactly what each contact
   received, nothing more.
4. Root cause chain → the **one-line diff on POS-03** (green line).
5. **Trust physics**: holds 24h → 72h, canary 10% → 5%, auto-restore after 3
   clean plays — the lane narrowed; nothing was revoked.
6. The violet panel: **incident response metered at ◆0**.

---

## Mechanism → where to see it

| Mechanism | Stop |
|---|---|
| Retroactive Close / cold start / 90-sec CFO story | 1 |
| Implied Bets + confirmation prompt (70% → 95%) | 1 |
| Narrative counterevidence | 1 & 6B |
| Shipped/cost/returned/decide ritual | 2 |
| Pruning docket + credits reclaimed | 2 |
| Batch lineage confirmation | 2 |
| Delta ranked by remaining agency; unsend window | 3 |
| Decision-class tags; deferral decay | 3 |
| Standing answer (judgment + receipts) | 4 |
| Business clock vs brand clock | 4 & 8 |
| Per-Bet Ledger; credit budgets with auto-stop | 4 |
| Credit quote / bid / grant signature | 5 |
| Change order on scope drift | 5 |
| Prosecutor placements (risk line, narrative, promotion gate) | 6 |
| Multi-party routing, Slack mirrors, write-back | 7 |
| Disagreement located at the contract; one-line amendment | 7 & 9 |
| Sales-language Delta | 7 |
| ICP drift, sameness score, rejection telemetry, co-sign | 8 |
| Waves / holds / tripwires; suppression; owner alerts | 9 |
| Trust-level physics after an incident | 9 |
| Credits ◆ as visible as dollars | every screen (top bar + cost lines) |
