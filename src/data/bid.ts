/**
 * Screen 5 — the credit quote (bid), the grant signature, and the change
 * order. Delegation is a countersigned bid, not a settings page.
 */
export const bid = {
  playCode: "P-134",
  title: "Re-engage stalled fintech contacts",
  proposedBy: "AI · under Bet “Fintech pipeline Q3”",
  proposedAt: "Tue Aug 25, 09:12",
  scope: {
    audience: "400 stalled fintech contacts",
    definition: "“Stalled” per definitions contract POS-03 v4 ∩ fintech per ICP POS-01 v3",
    snapshot: "Segment snapshot: Aug 14",
    sequence: "3 touches over 9 days · $75 gift card for a booked call",
  },
  credits: 12,
  money: "$3.2K incentive exposure (est. 40% redemption on booked calls)",
  expected: { low: 8, high: 15, unit: "recovered opportunities / booked calls" },
  benchmark:
    "Based on 1,842 re-engagement plays like yours — B2B mid-market, audience 300–600. Median recovery 2.6% of audience (IQR 2.1–3.8%).",
  willDo: [
    "Draft all touches inside Brand voice POS-02; critic pass before queue",
    "Send-time optimization per recipient (grant G-11)",
    "Suppress unsubs, bounces, and contract-excluded contacts",
    "Stagger waves 10% / 30% / 60%, each behind a 24h hold",
    "Throttle: max 80 sends/day/domain",
  ],
  willReturnFor: [
    "Audience drift beyond ±25% of bid scope",
    "Incentive redemptions above $1.2K total",
    "Any tripwire event",
    "Copy that fails the voice critic twice",
    "Recipients in a jurisdiction not covered by POS-05 §2.1",
  ],
  undo: {
    waves: "Wave 1 is a 10% canary (40 contacts). Nothing reaches everyone at once.",
    holds: "24h hold per wave — undo inside the hold is a true undo, zero recipient impact.",
    tripwires: [
      "bounce > 2%",
      "unsub > 0.6%",
      "complaint > 0.08%",
      "mid-deal contact match > 0",
    ],
    kill: "Stop-all available at any time; incident response is never metered.",
  },
  routing: [
    { who: "Maya Okafor", why: "Play owner — signature required (L1 lane: bid + sign per play)", state: "awaiting" },
    { who: "Priya Shah (Legal)", why: "Hard gate — incentive clause matched Promotions policy §2 (POS-05, legal co-signed Jan 15)", state: "queued" },
    { who: "Dana Whitfield (Sales)", why: "Notified, not gating — Bet co-signer; play touches owned pipeline", state: "notified" },
  ],
};

export const grantSignature = {
  scopeHash: "#a41f92c",
  signer: "Maya Okafor",
  signedAt: "Tue Aug 25, 11:02",
  ledger: "L-241",
  counterparty:
    "Countersigned: system. Execution is bound to bid terms — out-of-bid work auto-refunds credits and logs as a system fault.",
};

export const changeOrder = {
  raisedAt: "Wed Aug 26, 07:40",
  trigger:
    "Overnight CRM sync (pipeline-cleanup import) grew the matching audience 400 → 521 (+30%). Bid bound: ±25%.",
  status: "Auto-paused before wave 1 — no sends, no spend.",
  newBid: {
    credits: 15,
    expected: { low: 10, high: 19 },
  },
  options: [
    {
      id: "expand",
      label: "Approve expanded scope",
      detail: "521 contacts · ◆15 · expected 10–19 recoveries",
    },
    {
      id: "keep",
      label: "Keep original scope",
      detail: "400 highest-fit by ICP score · ◆12 · expected 8–14 (post-legal-edit)",
    },
    {
      id: "cancel",
      label: "Cancel the play",
      detail: "No spend. Cohort decays ~8%/week if re-bid later.",
    },
  ],
  resolution:
    "Maya keeps the original scope — 400 highest-fit. Logged L-244. “Narrow the scope” always renders with equal prominence to “grant more”.",
};
