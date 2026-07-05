/**
 * Screen 2 — the weekly Close, week 8 of Q3 (Aug 17–23), run Mon Aug 24.
 * Four sections: shipped / cost / returned / needs a decision.
 */
export interface ShippedItem {
  what: string;
  who: string; // human name, or "AI · grant G-nn (L2)"
  betId: "fintech-pipeline" | "authority" | null;
  provisional: boolean; // guessed lineage awaiting batch confirm
  day: string;
}

export const shipped: ShippedItem[] = [
  {
    what: "Webinar ep2 — “Passing your first fintech security review” (441 registrants)",
    who: "Tessa Vogel",
    betId: "fintech-pipeline",
    provisional: true,
    day: "Thu",
  },
  {
    what: "Follow-up A → registrants (recording + security-review checklist)",
    who: "AI · grant G-12 (L2)",
    betId: "fintech-pipeline",
    provisional: true,
    day: "Fri",
  },
  {
    what: "Follow-up B → attendees (auditor Q&A digest)",
    who: "AI · grant G-12 (L2)",
    betId: "fintech-pipeline",
    provisional: true,
    day: "Fri",
  },
  {
    what: "Google Ads copy refresh — 3 ad groups (AI drafts, human-committed)",
    who: "Tessa Vogel",
    betId: "fintech-pipeline",
    provisional: true,
    day: "Tue",
  },
  {
    what: "Webinar ep3 landing page + reg flow",
    who: "Tessa Vogel",
    betId: "fintech-pipeline",
    provisional: true,
    day: "Wed",
  },
  {
    what: "Sales one-pager: fintech security-review checklist",
    who: "Jonah Reyes",
    betId: "fintech-pipeline",
    provisional: true,
    day: "Thu",
  },
  {
    what: "Nurture #6 — benchmark-report branch",
    who: "AI · grant G-7 (L1, Maya approved)",
    betId: "authority",
    provisional: false,
    day: "Tue",
  },
  {
    what: "Blog: “SOC 2 evidence collection: what auditors actually check”",
    who: "Jonah Reyes",
    betId: "authority",
    provisional: false,
    day: "Mon",
  },
  {
    what: "MQL routing fix — reason-code required on rejection",
    who: "Ravi Mehta",
    betId: null,
    provisional: false,
    day: "Wed",
  },
];

export const weekCost = {
  money: 12400,
  moneyRows: [
    { label: "Search (SOC 2 demand capture)", v: 5200 },
    { label: "Webinar promo (paid)", v: 2400 },
    { label: "Newsletter sponsorship", v: 2100 },
    { label: "Retargeting", v: 1500 },
    { label: "Tools & misc", v: 1200 },
  ],
  credits: 12,
  creditRows: [
    { label: "Webinar follow-up sequences (G-12)", v: 6 },
    { label: "Ad copy deploys", v: 2 },
    { label: "List hygiene run", v: 2 },
    { label: "Nurture #6 branch", v: 2 },
  ],
};

export const returned = [
  {
    line: "47 MQLs (34 from webinar ep2)",
    detail: "Reg → MQL running 24% vs corpus p50 22%",
  },
  {
    line: "9 SQLs accepted by sales",
    detail: "Fintech acceptance still 44% — the Bet's open risk, receipts on the Bet card",
  },
  {
    line: "$148K new qualified pipeline ($61K fintech)",
    detail: "Bet pace moves 71% → 78% of plan-to-date",
  },
  {
    line: "128 report downloads (742 cumulative)",
    detail: "62% of target at 61% of quarter — on pace",
  },
  {
    line: "1 closed-won: Brightledger, $52K",
    detail: "Sourced by May webinar — 97-day lag. Filed to the Q2 webinar cluster, not this week's work.",
  },
];

export const lineageBatch = {
  prompt: "Six items auto-filed under Fintech pipeline Q3. Right?",
  count: 6,
  note: "Provisional lineage, guessed at ship time. Confirming costs one tap; correcting costs seconds. Unattributed stays allowed — it just shows up with a cost line.",
};

export const decisionsDue = [
  {
    id: "prune",
    title: "Pruning docket — P-127 CFO thought-leadership",
    body: "Below the 25th percentile on every core metric for six weeks. Receipts below.",
  },
  {
    id: "bid",
    title: "Re-engagement bid awaiting signature (◆12)",
    body: "Parked since Friday. Decay: expected recoveries drop ~8% per week of delay (cohort staleness, corpus-based).",
  },
  {
    id: "lineage",
    title: "Lineage batch confirmation",
    body: "Six provisional items → Fintech pipeline Q3.",
  },
];
