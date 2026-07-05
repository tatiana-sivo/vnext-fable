/**
 * Q3 2026 credit economy. Credits meter AI labor the way dollars meter
 * media. Budgeted per Bet, with a small "house" envelope for cross-Bet
 * work. Human attention and incident response are never metered.
 */
export const creditBudget = {
  quarter: 200,
  allocation: [
    { betId: "fintech-pipeline", label: "Fintech pipeline Q3", budget: 90, spent: 58 },
    { betId: "authority", label: "Benchmark conversation", budget: 60, spent: 38 },
    { betId: "house", label: "House (cross-Bet)", budget: 50, spent: 44 },
  ],
  /** As of Tue Aug 25, 10:15. */
  spentToDate: 140,
  remaining: 60,
  thisWeek: 14, // trailing 7 days, Aug 19–25
  weekly: [20, 18, 16, 19, 17, 20, 14, 12], // W1–W8 (through Aug 23); +4 W9-to-date
};

export const moneyBudget = {
  quarter: 265000,
  spentToDate: 161000,
  allocation: [
    { label: "Fintech pipeline Q3", budget: 85000, spent: 52400 },
    { label: "Benchmark conversation", budget: 60000, spent: 37900 },
    { label: "Always-on / shared", budget: 120000, spent: 70700 },
  ],
};

export const creditRules = [
  "Credits meter AI labor. Human attention is never metered.",
  "Exploration, drafts and co-authoring are free. Shipping at scale is metered.",
  "Every AI job bids before it runs — scope, cost, expected range, benchmark basis.",
  "Deferral is free but shows honest decay.",
  "Incident response is never metered. Out-of-bid execution refunds itself.",
];
