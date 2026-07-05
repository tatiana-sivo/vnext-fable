/**
 * Screen 3 — the Delta. Tue Aug 25, 10:15. Diff since Fri Aug 22, 16:30,
 * ranked by remaining agency, not recency.
 */
export const deltaHeader = {
  since: "Fri Aug 22, 16:30",
  now: "Tue Aug 25, 10:15",
  line: "23 actions, all inside granted lanes. 2 deferrals waiting.",
  tripwires: 0,
};

export interface DeltaItem {
  rank: number;
  agency: string; // why it ranks here — remaining agency
  agencyTone: "critical" | "warn" | "accent" | "neutral";
  title: string;
  body: string;
  decisionClass: string; // boundary status tag
  actions?: string[];
  decay?: string;
}

export const deltaItems: DeltaItem[] = [
  {
    rank: 1,
    agency: "UNSEND — 8h 05m left",
    agencyTone: "warn",
    title: "Auto-committed: webinar ep2 follow-up C → 397 no-shows",
    body: "Committed Mon 18:20 under grant G-12 (L2). Queued in the 24h hold — dispatches Tue 18:20. Undo inside the hold is a true undo: zero recipient impact, credits refund. Preview and audience attached.",
    decisionClass: "committed under grant G-12",
    actions: ["Unsend", "Let it dispatch"],
  },
  {
    rank: 2,
    agency: "DECISION PENDING",
    agencyTone: "accent",
    title: "Re-engagement bid still parked (◆12 · 400 stalled fintech contacts)",
    body: "Deferred Friday. The bid holds, the cohort doesn't: staleness compounds.",
    decisionClass: "deferred — outside grant, needs signature",
    actions: ["Open the bid →"],
    decay: "Each week of delay, expected recoveries drop ~8% (cohort-based, corpus n=1,842).",
  },
  {
    rank: 3,
    agency: "EDIT WINDOW — until Wed 17:00",
    agencyTone: "accent",
    title: "Nurture #7 drafted, scheduled Thu 09:00",
    body: "Draft passed voice critic (sameness 0.74). Slots committed; body is diff-governed prose.",
    decisionClass: "queued under grant G-7 (L1) — dispatches only after review",
    actions: ["Review draft"],
  },
  {
    rank: 4,
    agency: "SAMPLE — optional",
    agencyTone: "neutral",
    title: "Calibration sample: 3 of 18 lane actions surfaced",
    body: "Random audit sample from delegated lanes (2 subject-line sets, 1 send-time shift). Keeps 'delegated' from becoming 'blind'; skipping is allowed and logged.",
    decisionClass: "committed under grants G-9, G-11 — sampled for audit",
    actions: ["Review sample"],
  },
  {
    rank: 5,
    agency: "DEFERRAL — decays slowly",
    agencyTone: "neutral",
    title: "ICP drift proposal parked to Sep 2",
    body: "Bundled with the Bet review. Definition change, not a cohort — low decay.",
    decisionClass: "deferred by owner — “not now” is a first-class reply",
    decay: "Low. Fintech win-mix has been stable for two quarters; two weeks changes little.",
  },
];

export const routineActions = {
  count: 18,
  line: "18 routine actions inside lanes — no review owed",
  examples: [
    "Subject-line variants ×14 (grant G-9, L2)",
    "Send-time shifts ×2 (grant G-11, L2)",
    "Suppression-list syncs ×2 (platform hygiene)",
  ],
};
