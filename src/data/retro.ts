/**
 * Screen 1 — the retroactive Close. Day one (Jul 2, 2026): Q2 reconstructed
 * from existing portal data as if the Loop had been running. No commitment
 * exists yet; this is the first value moment.
 */
export interface ImpliedBet {
  id: string;
  name: string;
  inferredFrom: string;
  spend: number;
  outcome: string;
  percentile: number;
  confidence: number; // grouping confidence, %
  verdict?: "did-not-pay";
  note?: string;
}

export const impliedBets: ImpliedBet[] = [
  {
    id: "q2-demand",
    name: "SOC 2 demand capture",
    inferredFrom: "Google Search “soc 2 automation” + /soc2 landing pages + G2 profile",
    spend: 68000,
    outcome: "$720K pipeline · 9 wins · $214K closed",
    percentile: 68,
    confidence: 88,
    note: "Highest-volume motion. 40% of Q2 pipeline on 34% of spend.",
  },
  {
    id: "q2-webinars",
    name: "Webinar program (3 episodes)",
    inferredFrom: "Webinar campaigns + promo sequences + follow-up flows",
    spend: 19000,
    outcome: "1,140 regs · 44% attend · $290K pipeline",
    percentile: 71,
    confidence: 85,
    note: "Best pipeline-per-dollar in the portfolio. Caveat attached in the narrative.",
  },
  {
    id: "q2-launch",
    name: "Product launch — Continuous Controls Monitoring",
    inferredFrom: "May 14 launch emails + PR retainer + launch webinar",
    spend: 41000,
    outcome: "$310K pipeline · $96K expansion",
    percentile: 55,
    confidence: 82,
  },
  {
    id: "q2-nurture",
    name: "Nurture & newsletter engine",
    inferredFrom: "6 sends/month + lifecycle flows",
    spend: 22000,
    outcome: "37.1% open · 2.63% CTR · $410K influenced",
    percentile: 62,
    confidence: 74,
    note: "Influence-heavy; source-share modest. Grouping least certain.",
  },
  {
    id: "q2-dinners",
    name: "Executive dinner series",
    inferredFrom: "3 field events + venue/catering vendors + 41 scanned contacts",
    spend: 28400,
    outcome: "2 opps · $0 closed · $14.2K per opp",
    percentile: 9,
    confidence: 91,
    verdict: "did-not-pay",
    note: "Corpus median for field events: $3.9K per opp. This ran at 3.6× that.",
  },
  {
    id: "q2-display",
    name: "Display retargeting",
    inferredFrom: "Programmatic display line items, Apr–Jun",
    spend: 11800,
    outcome: "1.1M impressions · 0.04% CTR · 0 sourced opps",
    percentile: 12,
    confidence: 86,
    verdict: "did-not-pay",
    note: "View-through noise only. Corpus p50 CTR is 0.08%.",
  },
];

export const retroTotals = {
  spend: 199800,
  unattributed: { spend: 9600, items: 14 },
  attributedPipeline: 1820000,
  multiple: 9.1,
  corpusMultipleP50: 7.2,
  multiplePercentile: 64,
  closedWonInQuarter: 412000,
  lagNote: "Typical lag 60–90 days — most Q2-sourced revenue lands in Q3.",
  didNotPaySpend: 40200,
  didNotPayShare: 20,
};

export const narrativeClaims = [
  {
    claim: "Program spend returned 9.1× in attributed pipeline (corpus median 7.2×).",
    status: "passed" as const,
    evidence: "$199.8K spend → $1.82M attributed pipeline across six clusters. p64 for the cohort.",
  },
  {
    claim: "Search demand capture is the engine: 40% of pipeline on 34% of spend.",
    status: "passed" as const,
    evidence: "$68K → $720K pipeline, 9 closed-won. Efficiency stable across all three months.",
  },
  {
    claim: "Webinars were the most efficient pipeline source ($6.6K per $100K pipeline).",
    status: "counterevidence" as const,
    evidence: "$19K → $290K pipeline, p71 attendance.",
    counter:
      "78% of webinar-sourced pipeline had a search touch in the prior 30 days. Webinars accelerate captured demand; they are not an independent source. This footnote travels with the claim.",
  },
  {
    claim: "20% of spend produced no measurable return and is redeployed in Q3.",
    status: "passed" as const,
    evidence: "Executive dinners ($28.4K, 2 opps, $0 closed) + display retargeting ($11.8K, 0 sourced opps) = $40.2K.",
  },
];

export const cfoStory = [
  {
    t: "0:00",
    line: "We spent $199.8K on programs in Q2 and can attribute $1.82M in new pipeline — 9.1×, against a mid-market corpus median of 7.2×.",
  },
  {
    t: "0:20",
    line: "Two-thirds of that return came from two motions: SOC 2 demand capture and the webinar program.",
  },
  {
    t: "0:40",
    line: "Two clusters clearly didn't pay: executive dinners — $28.4K, two opportunities, nothing closed — and display retargeting — $11.8K, zero sourced opportunities. Both are cut. That's $40.2K, 20% of spend, back on the table.",
  },
  {
    t: "1:05",
    line: "In Q3 that money moves to a fintech pipeline bet co-signed with sales and a category-authority bet, each with a kill condition. You'll get this same receipt-backed story every quarter — compiled, not assembled.",
  },
];

export const conversion = {
  confidenceNow: 70,
  confidenceNext: 95,
  ask: "Confirm these six groupings as Bets — about two minutes. Lineage turns on by default, and next quarter's Close compiles itself.",
};
