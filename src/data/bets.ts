import type { Bet, Play } from "./types";

export const bets: Bet[] = [
  {
    id: "fintech-pipeline",
    name: "Fintech pipeline Q3",
    kind: "pipeline",
    hypothesis:
      "Fintech mid-market is our highest-yield segment (40% of recent wins on 15% of ICP weight). Focused plays can double fintech pipeline this quarter.",
    target: "$1.2M qualified fintech pipeline (≥ Discovery) by Sep 30 · 20 opportunities",
    targetValue: 1200000,
    targetUnit: "$",
    window: "Jul 1 – Sep 30, 2026",
    falsification:
      "If < $400K by Aug 15, kill this shape: restructure to a vertical-webinar-only motion.",
    checkpoint: "Aug 15 checkpoint: $498K — cleared, margin thin.",
    signatures: [
      { personId: "maya", role: "owner (marketing)", state: "signed", date: "Jul 2, 2026" },
      { personId: "dana", role: "co-signer (sales)", state: "signed", date: "Jul 3, 2026" },
    ],
    money: { budget: 85000, spent: 52400 },
    credits: { budget: 90, spent: 58 },
    pace: {
      actual: 612000,
      planToDate: 780000,
      pacePct: 78,
      elapsedPct: 61,
      targetPct: 51,
      forecast: [1030000, 1110000],
      secondary: "11 of 20 opportunities",
    },
    clockSeries: {
      plan: [60, 140, 230, 330, 440, 550, 665, 780, 890, 995, 1080, 1150, 1200],
      actual: [40, 105, 190, 286, 371, 462, 540, 612],
    },
    standing: {
      ownerId: "maya",
      asOf: "Mon Aug 24, 2026",
      ownerLine:
        "Behind plan, but the gap is concentrated — stalled deals and one weak segment, not the whole funnel. Re-engagement is in flight and webinar sourcing is compounding. If wave results hold, I forecast ~$1.05M; I'd rather fix acceptance than widen top-of-funnel.",
      risk:
        "Fintech SQL acceptance is 44% vs 66% portal-wide; 71% of rejected fintech MQLs cite “no budget”, concentrated in the compliance-checklist self-serve cohort. If acceptance stays below 50%, quarter forecast drops to ~$860K.",
      riskReceipts: [
        { metric: "SQL acceptance — fintech", yours: "44%", corpus: "66% portal-wide", note: "n = 41 fintech MQLs since Jul 1" },
        { metric: "Top rejection reason", yours: "“No budget” — 71% of fintech rejections", corpus: "45% all-segment", note: "reason codes from definitions contract" },
        { metric: "Concentration", yours: "71% of those from compliance-checklist self-serve downloads", corpus: "—", note: "one acquisition source" },
        { metric: "Forecast if acceptance < 50%", yours: "~$860K (72% of target)", corpus: "—", note: "holding all else constant" },
      ],
      nextDecision:
        "Sep 2 — scale or kill re-engagement on wave 1–2 results; review ICP v4 reweight (drift proposal).",
    },
    playIds: ["webinar-series", "reengagement"],
    brandClockNote:
      "Brand effects of this Bet (branded search, direct traffic) read on the brand clock in Positions → Signal. Trend only — no progress bars there.",
  },
  {
    id: "authority",
    name: "Own the compliance-benchmark conversation",
    kind: "brand",
    hypothesis:
      "Publishing the category's benchmark data makes Plumbline the reference point for mid-market compliance buyers — authority the incumbents can't paid-media their way into.",
    target: "1,200 downloads of the 2026 Compliance Operations Benchmark Report · 8 earned placements by Sep 30",
    targetValue: 1200,
    targetUnit: "downloads",
    window: "Jul 1 – Sep 30, 2026",
    falsification:
      "If < 350 downloads by Aug 8, cut paid distribution and go organic-only.",
    checkpoint: "Aug 8 checkpoint: 517 downloads — cleared.",
    signatures: [
      { personId: "maya", role: "owner (marketing only)", state: "signed", date: "Jul 3, 2026" },
    ],
    money: { budget: 60000, spent: 37900 },
    credits: { budget: 60, spent: 38 },
    pace: {
      actual: 742,
      planToDate: 730,
      pacePct: 102,
      elapsedPct: 61,
      targetPct: 62,
      forecast: [1150, 1290],
      secondary: "5 of 8 earned placements",
    },
    clockSeries: {
      plan: [40, 110, 200, 300, 400, 510, 620, 730, 840, 950, 1050, 1130, 1200],
      actual: [52, 128, 214, 342, 449, 517, 614, 742],
    },
    standing: {
      ownerId: "maya",
      asOf: "Mon Aug 24, 2026",
      ownerLine:
        "On pace and compounding — downloads convert to list growth and podcast invitations. The open question is distribution mix once we cut the LinkedIn experiment.",
      risk:
        "Paid distribution concentration: P-127 (LinkedIn thought-leadership) is 24% of Bet spend producing 6% of downloads. Pruning docket is open; reallocation decision due at this week's Close.",
      riskReceipts: [
        { metric: "P-127 share of Bet spend", yours: "24% ($14.8K)", corpus: "—", note: "vs 6% of downloads (47 of 742)" },
        { metric: "P-127 CTR", yours: "0.31%", corpus: "p50 0.44 · p25 0.38", percentile: 18 },
        { metric: "P-127 cost per lead", yours: "$412", corpus: "p50 $176", percentile: 19 },
      ],
      nextDecision: "Aug 24 Close — prune or keep P-127; redeploy $9.2K remaining media.",
    },
    playIds: ["report-engine", "cfo-linkedin"],
    brandClockNote:
      "Awareness movement (branded search +31% Jul→Aug) reads on the brand clock only. It tried to earn a target this week and was denied — see Prosecutor.",
  },
];

export const plays: Play[] = [
  {
    id: "webinar-series",
    code: "P-121",
    name: "Security-review webinar series",
    betId: "fintech-pipeline",
    type: "Webinar promo",
    state: "healthy",
    stateLabel: "Above corpus median",
    audience: "ICP fintech + security-review intent (POS-01)",
    moneySpent: 18200,
    moneyBudget: 28000,
    creditsSpent: 21,
    creditsBudget: 30,
    lane: "Follow-up sends — L2 under grant G-12",
    summary:
      "Monthly deep-dive episodes (“Passing your first fintech security review”). Two episodes so far: 863 registrations, 47% attendance, 96 MQLs, 31 accepted SQLs, $348K pipeline touched.",
    receipts: [
      { metric: "Attendance rate", yours: "47%", corpus: "p50 41% · p75 49%", percentile: 71 },
      { metric: "Reg → MQL", yours: "24%", corpus: "p50 22%", percentile: 58 },
      { metric: "Cost per MQL", yours: "$96", corpus: "p50 $118", percentile: 66 },
    ],
  },
  {
    id: "reengagement",
    code: "P-134",
    name: "Stalled fintech re-engagement",
    betId: "fintech-pipeline",
    type: "Re-engagement",
    state: "pending-bid",
    stateLabel: "Bid awaiting signature",
    audience: "400 stalled fintech contacts (POS-03 “stalled” ∩ POS-01 fintech)",
    moneySpent: 0,
    moneyBudget: 6000,
    creditsSpent: 0,
    creditsBudget: 12,
    lane: "Lifecycle re-engagement — L1 (bid + sign per play)",
    summary:
      "AI-proposed recovery of stalled fintech opportunities. ◆12 bid, expected 8–15 recoveries on the 280K-corpus range. Parked since Friday — decay is real: each week of delay drops expected recoveries ~8%.",
  },
  {
    id: "report-engine",
    code: "P-118",
    name: "Benchmark Report engine",
    betId: "authority",
    type: "Content launch + nurture",
    state: "inline",
    stateLabel: "In line with corpus",
    audience: "Full ICP + subscriber base (POS-01)",
    moneySpent: 19400,
    moneyBudget: 26000,
    creditsSpent: 24,
    creditsBudget: 30,
    lane: "Nurture branch sends — L1 (review-required)",
    summary:
      "The 2026 Compliance Operations Benchmark Report: launch sequence, nurture branch, newsletter sponsorships. 742 downloads (62% of target), $210K influenced pipeline, $38 per download.",
    receipts: [
      { metric: "Cost per download", yours: "$38", corpus: "p50 $52 · p75 $36", percentile: 68 },
      { metric: "Download → MQL", yours: "19%", corpus: "p50 18%", percentile: 54 },
    ],
  },
  {
    id: "cfo-linkedin",
    code: "P-127",
    name: "CFO thought-leadership — LinkedIn",
    betId: "authority",
    type: "Paid thought-leadership",
    state: "underperforming",
    stateLabel: "Below p25 — pruning docket",
    audience: "CFO/finance titles, 50–500 employees (cold — sanctioned exception to POS-04)",
    moneySpent: 14800,
    moneyBudget: 24000,
    creditsSpent: 8,
    creditsBudget: 22,
    lane: "Ad copy variants — L1",
    summary:
      "Cold paid social test against the channel thesis. Six weeks in: CTR 0.31%, $412 per lead, 2 demo requests. Composite 19th percentile. The thesis (POS-04) predicted this; the docket recommends killing it.",
    receipts: [
      { metric: "CTR", yours: "0.31%", corpus: "p25 0.38 · p50 0.44", percentile: 18 },
      { metric: "Cost per lead", yours: "$412", corpus: "p50 $176", percentile: 19 },
      { metric: "MQL → SQL", yours: "8%", corpus: "p50 26%", percentile: 11 },
      { metric: "Demo requests", yours: "2", corpus: "cohort median 9 at this spend", percentile: 14 },
    ],
  },
];

export const playById = (id: string) => plays.find((p) => p.id === id)!;
export const betById = (id: string) => bets.find((b) => b.id === id)!;

/** Pruning docket for the weekly Close. */
export const pruneDocket = {
  playId: "cfo-linkedin",
  recommendation:
    "Kill P-127. Redeploy $9.2K remaining media to webinar paid promo (running at $86 per MQL) and return ◆14 to the Bet pool.",
  reclaim: { money: 9200, credits: 14 },
  alternative:
    "Narrow the scope instead: retargeting-only at $4K, which is what the channel thesis allows without an exception.",
  thesisNote:
    "POS-04 predicted this outcome. Keeping P-127 past this Close requires a written counter-thesis.",
};
