/**
 * Screen 9 — undo in action. The wrong-audience catch, contained by
 * engineered reversibility: waves, holds, tripwires.
 */
export const incidentStatus = {
  state: "CONTAINED",
  line: "Waves 2–3 held before dispatch (true undo) · 38 suppressions active · 2 deal owners briefed · root cause fixed on the Position",
};

export const waves = [
  {
    n: 1,
    label: "Wave 1 — canary",
    size: 40,
    pct: 10,
    state: "sent" as const,
    detail: "Dispatched Thu Aug 27, 09:04 · 2 recipients flagged mid-deal",
  },
  {
    n: 2,
    label: "Wave 2",
    size: 120,
    pct: 30,
    state: "held" as const,
    detail: "Was scheduled Fri 09:00 · auto-held 09:27 · 0 sent",
  },
  {
    n: 3,
    label: "Wave 3",
    size: 240,
    pct: 60,
    state: "held" as const,
    detail: "Was scheduled Tue Sep 1 · auto-held · 0 sent",
  },
];

export const timeline = [
  { t: "Thu 09:04", text: "Wave 1 dispatched — 40 contacts (10% canary).", tone: "neutral" as const },
  {
    t: "Thu 09:27",
    text: "Tripwire: dispatch-time CRM cross-check flags 2 recipients with open deals in Proposal (Harbor Lend Capital $86K, Novapay $54K). Trigger: “mid-deal contact match > 0”.",
    tone: "critical" as const,
  },
  {
    t: "Thu 09:27",
    text: "Waves 2–3 auto-paused inside their holds. 360 contacts, zero dispatched — a true undo, no recipient impact.",
    tone: "good" as const,
  },
  {
    t: "Thu 09:29",
    text: "Suppression: remaining 38 wave-1 recipients pulled from touches 2–3; 14-day cool-off applied.",
    tone: "good" as const,
  },
  {
    t: "Thu 09:31",
    text: "Context alerts to deal owners (Tomás Rivera, Elena Ruiz) with exactly what their contacts received.",
    tone: "neutral" as const,
  },
  {
    t: "Thu 09:40",
    text: "Owner-first: incident lands in Maya's Delta. The shared standing answer updates after she's had a working day — critical tripwires are the only exception to sequencing.",
    tone: "neutral" as const,
  },
  {
    t: "Fri 10:12",
    text: "Root cause pinned: segment snapshot dated Aug 14 — 13 days stale at dispatch. Contract v4 “stalled” had no dispatch-time freshness clause.",
    tone: "neutral" as const,
  },
  {
    t: "Fri 11:30",
    text: "Fix is one line on one artifact: definitions contract v4.1, co-signed Maya + Dana. Shadow canary of the amended rule: 360 → 315 eligible.",
    tone: "good" as const,
  },
  {
    t: "Mon 09:00",
    text: "Wave 2 resumes under v4.1 — 120 contacts behind the new 72h hold.",
    tone: "neutral" as const,
  },
];

export const dealAlerts = [
  {
    owner: "Tomás Rivera",
    contact: "Sofia Marek · VP Engineering",
    company: "Harbor Lend Capital · $86K · Proposal",
    body: "Your contact received one re-engagement email Thu 09:04 offering a gift card for a call. No further touches will occur (suppressed). Suggested: acknowledge in your next touch.",
  },
  {
    owner: "Elena Ruiz",
    contact: "Daniel Oyelaran · CTO",
    company: "Novapay · $54K · Proposal",
    body: "Your contact received one re-engagement email Thu 09:04. Suppressed from all remaining touches. Deal timeline unaffected on our side; flag if the contact mentions it.",
  },
];

export const rootCauseChain = [
  "Wave 1 sends to 40 contacts (09:04)",
  "CRM cross-check flags 2 recipients mid-deal (09:27)",
  "Segment snapshot dated Aug 14 — 13 days stale at dispatch",
  "Contract v4 “stalled” has no dispatch-time freshness clause",
  "Fix: one line added — v4.1, co-signed by both parties",
];

export const positionDiff = {
  artifact: "POS-03 · MQL/SQL definitions contract · v4 → v4.1",
  context: "Stalled (re-engagement eligible): open opp created >45 days ago, no stage advance in 30 days, no marketing engagement in 21 days.",
  added:
    "Eligibility is evaluated against live CRM state at dispatch time; any contact on an open deal with sales activity in the last 21 days is excluded.",
};

export const trustPhysics = {
  lane: "Lifecycle re-engagement lane (G-12 class)",
  rows: [
    { k: "Hold window", before: "24h", after: "72h" },
    { k: "Canary wave", before: "10%", after: "5%" },
    { k: "Tripwire classes", before: "4", after: "5 (adds dispatch-time CRM check)" },
    { k: "Interrupt budget", before: "1/day", after: "unchanged" },
  ],
  restore: "Auto-restores after 3 clean plays in this lane. Trust is physics, not a toggle — the lane narrowed; nothing was revoked.",
  echo: "Second staleness-class event this year (see L-117, Apr 14 — closed-lost exclusion). Platform response: dispatch-time freshness governor enabled portfolio-wide. No lane can opt out.",
};

export const incidentCredits =
  "Incident response metered at ◆0 — pausing, suppressing, re-filtering, drafting corrections, alerting owners. The meter never runs during containment, even when the root cause is a human-signed grant.";
