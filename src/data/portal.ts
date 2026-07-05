/**
 * Twelve months of portal data, Sep 2025 – Aug 2026. Aug 2026 is partial
 * (through Aug 25) — flagged wherever it renders. These series feed the
 * brand clock (Signal), the retro Close, and the drift detector.
 */
export const months = [
  "Sep",
  "Oct",
  "Nov",
  "Dec",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
];

export const monthly = {
  emailsSentK: [38, 42, 44, 31, 47, 49, 52, 50, 55, 58, 54, 61],
  openRate: [
    33.8, 34.1, 34.9, 35.6, 34.4, 35.2, 36.1, 35.4, 36.8, 37.2, 36.4, 37.0,
  ],
  ctr: [2.2, 2.3, 2.4, 2.1, 2.3, 2.4, 2.6, 2.4, 2.7, 2.8, 2.6, 2.7],
  // Apr bump = the April wrong-audience incident (Ledger L-117)
  unsub: [
    0.21, 0.19, 0.18, 0.16, 0.2, 0.18, 0.17, 0.22, 0.16, 0.15, 0.17, 0.16,
  ],
  mqls: [118, 126, 131, 84, 142, 138, 155, 149, 161, 158, 171, 138],
  newPipelineK: [480, 510, 540, 290, 560, 540, 610, 580, 640, 610, 660, 612],
  webinarRegs: [0, 410, 0, 0, 385, 0, 412, 380, 398, 362, 422, 441],
  blogSessionsK: [24, 26, 27, 22, 29, 31, 33, 32, 35, 36, 38, 39],
  // Brand-clock series (Signal). No targets on any of these.
  brandedSearchIdx: [100, 103, 101, 98, 104, 109, 112, 115, 118, 121, 122, 160],
  directTrafficShare: [
    8.2, 8.4, 8.3, 8.1, 8.6, 8.8, 9.0, 9.1, 9.3, 9.4, 9.5, 9.8,
  ],
  samenessScore: [
    0.71, 0.72, 0.74, 0.73, 0.75, 0.78, 0.79, 0.81, 0.82, 0.84, 0.85, 0.87,
  ],
  shareOfSearch: {
    plumbline: [
      13.8, 14.0, 14.1, 14.0, 14.4, 14.7, 15.0, 15.2, 15.6, 15.9, 16.1, 17.2,
    ],
    certifly: [
      46.2, 46.0, 45.8, 45.9, 45.3, 45.0, 44.6, 44.5, 44.1, 43.8, 43.9, 43.5,
    ],
    auditbase: [
      27.4, 27.3, 27.5, 27.2, 27.0, 27.1, 26.9, 27.0, 26.8, 26.9, 26.7, 26.8,
    ],
  },
};

/** Closed-won mix, trailing two quarters (n = 47) — feeds ICP drift. */
export const winMix = {
  n: 47,
  rows: [
    { segment: "Fintech", wins: 19, sharePct: 40, icpWeightPct: 15 },
    { segment: "Horizontal SaaS", wins: 13, sharePct: 28, icpWeightPct: 45 },
    { segment: "Healthtech", wins: 6, sharePct: 13, icpWeightPct: 20 },
    { segment: "Devtools", wins: 5, sharePct: 11, icpWeightPct: 12 },
    { segment: "Other", wins: 4, sharePct: 8, icpWeightPct: 8 },
  ],
  fintechVsBlended: [
    { metric: "ACV", fintech: "$52.4K", blended: "$38.1K", delta: "+38%" },
    { metric: "Sales cycle", fintech: "41 days", blended: "53 days", delta: "−22%" },
    { metric: "Win rate", fintech: "31%", blended: "24%", delta: "+7 pts" },
  ],
};

/** Named records used by the incident and coordination screens. */
export const liveDeals = [
  {
    company: "Harbor Lend Capital",
    amount: "$86K",
    stage: "Proposal",
    ownerId: "tomas",
    contact: "Sofia Marek",
    title: "VP Engineering",
    stageMoved: "Aug 21",
  },
  {
    company: "Novapay",
    amount: "$54K",
    stage: "Proposal",
    ownerId: "elena",
    contact: "Daniel Oyelaran",
    title: "CTO",
    stageMoved: "Aug 24",
  },
];

export const recentWins = [
  { company: "Brightledger", segment: "Fintech", amount: "$52K" },
  { company: "Payrail", segment: "Fintech", amount: "$61K" },
  { company: "Solvent", segment: "Fintech", amount: "$48K" },
  { company: "Fondura", segment: "Fintech", amount: "$57K" },
  { company: "Attikon Health", segment: "Healthtech", amount: "$34K" },
  { company: "Cloudpine", segment: "Horizontal SaaS", amount: "$41K" },
  { company: "Mesa Robotics", segment: "Other", amount: "$29K" },
  { company: "Statmill", segment: "Devtools", amount: "$31K" },
];
