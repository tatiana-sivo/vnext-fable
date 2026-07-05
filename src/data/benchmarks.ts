/**
 * The 280K-portal benchmark corpus. Plumbline's cohort: B2B mid-market
 * software, marketing-owned portals, 25–200 employees. Percentiles are
 * performance percentiles (p75 = better than 75% of cohort portals).
 */
export const corpus = {
  portals: "280K",
  cohort: "B2B mid-market software · 25–200 employees",
};

export const bench = {
  email: {
    open: { p25: 29.8, p50: 34.6, p75: 39.9 },
    ctr: { p25: 1.7, p50: 2.4, p75: 3.2 },
    unsub: { p50: 0.18 },
  },
  reEngagement: {
    n: 1842,
    label: "re-engagement plays · audience 300–600",
    recoveryPct: { p25: 2.1, p50: 2.6, p75: 3.8 },
    replyPct: { p50: 8.1 },
  },
  webinar: {
    attendPct: { p25: 33, p50: 41, p75: 49 },
    regToMqlPct: { p50: 22 },
  },
  paidThoughtLeadership: {
    ctr: { p25: 0.38, p50: 0.44, p75: 0.61 },
    cpl: { p25: 261, p50: 176, p75: 122 }, // $ per lead at that performance percentile
    mqlToSqlPct: { p50: 26 },
  },
  contentLaunch: {
    costPerDownload: { p25: 74, p50: 52, p75: 36 },
    downloadToMqlPct: { p50: 18 },
  },
  fieldEvents: {
    costPerOpp: { p25: 6800, p50: 3900, p75: 2100 },
  },
  displayRetargeting: {
    ctr: { p25: 0.05, p50: 0.08, p75: 0.14 },
  },
  pipelinePerDollar: { p25: 4.1, p50: 7.2, p75: 11.8 },
  mqlOps: {
    slaTouchPct: { p50: 68 },
    acceptancePct: { p50: 63 },
  },
  /** Content sameness vs anonymized category aggregate. Lower = more distinct. */
  sameness: { p50: 0.79 },
};
