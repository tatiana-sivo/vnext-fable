/**
 * Screen 7 — multi-party coordination, end to end. Marketing owner, sales
 * co-signer, legal gate. State lives on the Play object; every surface is
 * a mirror that writes back.
 */
export interface CoordStep {
  n: number;
  title: string;
  when: string;
  kind: "object" | "routing" | "slack" | "writeback" | "delta" | "catch" | "amendment" | "outcome";
  body: string[];
}

export const steps: CoordStep[] = [
  {
    n: 1,
    title: "The bid, signed",
    when: "Tue Aug 25, 11:02",
    kind: "object",
    body: [
      "P-134 “Re-engage stalled fintech contacts” — 400 contacts, ◆12, expected 8–15 recoveries, waves 10/30/60 behind 24h holds, $75 gift-card incentive.",
      "Maya signs the grant (Ledger L-241). No spend yet — the bid is free; execution is what's metered.",
    ],
  },
  {
    n: 2,
    title: "Routing computes signers from rules, not org chart",
    when: "Tue Aug 25, 11:02",
    kind: "routing",
    body: [
      "Maya — owner signature (her L1 lane: bid + sign per play). Done.",
      "Priya (Legal) — HARD GATE. The incentive clause matched Promotions policy §2, which legal co-signed at setup. Nobody chose to loop legal in; the object did.",
      "Dana (Sales) — notified, not gating. He co-signed the Bet; the play touches pipeline he owns. Notification, because no contract clause of his is at stake.",
    ],
  },
  {
    n: 3,
    title: "Legal's Slack card — only the diff that concerns them",
    when: "Tue Aug 25, 14:30",
    kind: "slack",
    body: [
      "Priya sees two things: the incentive clause ($75 gift card, redemption exposure $3.2K) and the recipient jurisdictions (US 361 · DE 22 · FR 9 · NL 8) — with the matched rule cited (POS-05 §2, §2.1).",
      "Not the whole play. Not the copy. Not the audience logic. Approval scope = disclosure scope: she owns what she was shown.",
    ],
  },
  {
    n: 4,
    title: "The edit writes back to the object",
    when: "Wed Aug 26, 09:05",
    kind: "writeback",
    body: [
      "Priya taps Approve-with-edit: EU cash-equivalent cap €50 (DE strictest — UWG §7 risk on gifts to business contacts).",
      "The edit lands on the Play object, not in the thread. Ledger L-243.",
      "System re-checks the bid: credit cost unchanged (◆12); expected range shifts 8–15 → 8–14. Below the 10% materiality bound → no re-authorization bounce to Maya.",
    ],
  },
  {
    n: 5,
    title: "Dana's Delta speaks sales",
    when: "Wed Aug 26, 17:00",
    kind: "delta",
    body: [
      "“~34 recovered contacts entering your queue starting Thursday, tagged reengaged-q3.”",
      "Replies route to the original owner if active < 90 days, else round-robin. 8–14 expected to re-open as opportunities over three weeks.",
      "Same object, different mirror — Dana never sees marketing vocabulary.",
    ],
  },
  {
    n: 6,
    title: "The mid-deal catch",
    when: "Thu Aug 27, 09:27–11:40",
    kind: "catch",
    body: [
      "Wave 1 (40 contacts) dispatched 09:04. At 09:27 the CRM cross-check tripwire flags two recipients on open deals in Proposal: Sofia Marek (Harbor Lend Capital, $86K) and Daniel Oyelaran (Novapay, $54K).",
      "Dana, 11:40: “marketing touched my live deal.” The system doesn't route the argument to a thread — it locates the disagreement at the governing artifact: definitions contract POS-03 v4, whose “stalled” definition ran on an Aug 14 snapshot with no dispatch-time freshness check.",
      "Both parties receive the identical evidence panel: snapshot date, stage-change dates (Aug 21, Aug 24), dispatch time. Old terms govern until new ones are signed.",
    ],
  },
  {
    n: 7,
    title: "The one-line amendment",
    when: "Fri Aug 28, 11:30",
    kind: "amendment",
    body: [
      "v4.1 adds one line: eligibility is evaluated against live CRM state at dispatch; any contact on an open deal with sales activity in the last 21 days is excluded.",
      "Amendments get canaries too — the new rule runs in shadow first: of 360 remaining contacts, 69 drop out (54 stage-advanced, 13 recent sales activity, 2 open-deal), 24 newly-stalled enter → 315 eligible.",
      "Maya and Dana co-sign in one tap each. Decision record logged (L-248). Wave 2 resumes Monday under the amended definition.",
    ],
  },
  {
    n: 8,
    title: "What the mistake cost",
    when: "Fri Aug 28",
    kind: "outcome",
    body: [
      "Two contacts saw one email each. 38 suppressions, zero further exposure, deal owners briefed with exactly what their contacts received.",
      "The disagreement ended as a one-line tightening of a shared contract — not a meeting, not a policy doc, not revoked autonomy.",
      "Lane physics adjusted (holds 24h → 72h, canary 10% → 5%) — see the Undo screen for the full incident mechanics.",
    ],
  },
];

export const legalSlackCard = {
  channel: "#legal-gates",
  sender: "vNext",
  time: "Tue Aug 25, 14:30",
  header: "Legal gate — P-134 re-engagement (Fintech pipeline Q3)",
  matchedRule: "Matched: Promotions policy POS-05 §2 — “any contact-facing incentive above $0 routes to a legal gate.” You co-signed this rule Jan 15, 2026.",
  diff: [
    { k: "Incentive", v: "$75 gift card for a booked call · est. redemption exposure $3.2K" },
    { k: "Jurisdictions", v: "US 361 · DE 22 · FR 9 · NL 8 (§2.1 applies)" },
  ],
  buttons: ["Approve", "Approve with edit", "Block"],
  footer: "This card is a mirror of the Play object. Buttons write back; state never lives in Slack.",
  outcome: "Approved with edit · EU cash-equivalent cap €50 · Wed 09:05 · → Ledger L-243",
};

export const danaDeltaCard = {
  header: "Your Delta — Wed Aug 26",
  headline: "~34 recovered contacts entering your queue starting Thursday",
  rows: [
    "Tagged reengaged-q3 · replies route to original owner if active < 90d, else round-robin",
    "8–14 expected to re-open as opportunities over 3 weeks (corpus range, post-legal-edit)",
    "Source: marketing re-engagement under Fintech pipeline Q3 — you co-signed Jul 3",
  ],
};

export const evidencePanel = {
  title: "Shared evidence — both parties see exactly this",
  rows: [
    { k: "Segment snapshot", v: "Aug 14 (contract v4 evaluates on snapshot)" },
    { k: "Sofia Marek — Harbor Lend Capital", v: "Deal moved to Proposal Aug 21 · email sent Aug 27, 09:04" },
    { k: "Daniel Oyelaran — Novapay", v: "Deal moved to Proposal Aug 24 · email sent Aug 27, 09:04" },
    { k: "Governing clause", v: "POS-03 v4 “stalled” — no dispatch-time freshness check (the gap)" },
  ],
};
