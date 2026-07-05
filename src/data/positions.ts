import type { Signature } from "./types";

export interface PositionVersion {
  v: string;
  date: string;
  note: string;
  isAmendment?: boolean;
}

export interface Position {
  id: string;
  code: string;
  name: string;
  kind: string;
  version: string;
  ratified: string;
  signatures: Signature[];
  subscribers: string[]; // other tools reading FROM the portal via MCP
  body: string[];
  versions: PositionVersion[];
}

export const positions: Position[] = [
  {
    id: "icp",
    code: "POS-01",
    name: "ICP definition",
    kind: "Market truth",
    version: "v3",
    ratified: "May 12, 2026",
    signatures: [
      { personId: "maya", role: "owner", state: "signed", date: "May 12, 2026" },
      { personId: "dana", role: "co-signer (sales)", state: "signed", date: "May 14, 2026" },
    ],
    subscribers: [
      "Ad-platform audience sync",
      "SDR enrichment (Clay)",
      "Content briefs",
      "Play audience builder",
    ],
    body: [
      "B2B software companies, 50–500 employees, US/EU, post-Series A.",
      "Buyer: CTO / Head of Security / first compliance hire. Trigger: enterprise deal blocked on SOC 2 / ISO 27001.",
      "Expected vertical mix: horizontal SaaS 45% · healthtech 20% · fintech 15% · devtools 12% · other 8%.",
      "Exclusions: agencies, pre-seed, companies with a dedicated GRC team (>2 FTE).",
    ],
    versions: [
      { v: "v1", date: "Sep 2024", note: "Initial — drafted from closed-won patterns at Loop install… backfilled" },
      { v: "v2", date: "Nov 2025", note: "Added EU; raised employee floor 25 → 50" },
      { v: "v3", date: "May 12, 2026", note: "Added exclusions; co-signed by sales" },
    ],
  },
  {
    id: "voice",
    code: "POS-02",
    name: "Brand voice & claims",
    kind: "Compiler input",
    version: "v2",
    ratified: "Feb 9, 2026",
    signatures: [
      { personId: "jonah", role: "owner", state: "signed", date: "Feb 9, 2026" },
      { personId: "maya", role: "approver", state: "signed", date: "Feb 9, 2026" },
    ],
    subscribers: ["Every AI draft (critic pass)", "Agency briefs", "Sales one-pagers"],
    body: [
      "Named numbers over adjectives. “14 hours to audit-ready”, never “blazing fast”.",
      "First-person auditor anecdotes — we publish what auditors actually check.",
      "Plain-verb CTAs. No fear-based hooks; compliance anxiety is the category's crutch.",
      "Claims only from the approved list (12 approved, versioned). Nothing implied about certification outcomes.",
    ],
    versions: [
      { v: "v1", date: "Jun 2025", note: "Initial voice doc — backfilled" },
      { v: "v2", date: "Feb 9, 2026", note: "Approved-claims list added (12 claims)" },
    ],
  },
  {
    id: "mql-sql",
    code: "POS-03",
    name: "MQL / SQL definitions contract",
    kind: "Contract with sales",
    version: "v4.1",
    ratified: "Jun 20, 2026 · amended Aug 28",
    signatures: [
      { personId: "maya", role: "owner", state: "signed", date: "Jun 20, 2026" },
      { personId: "dana", role: "co-signer (sales)", state: "signed", date: "Jun 20, 2026" },
    ],
    subscribers: ["Lead routing", "Play audience builder", "Deal-record Ledger panel", "SLA telemetry"],
    body: [
      "MQL: ICP fit ≥ threshold AND a high-intent action (demo request, pricing view ×2, security-review template download).",
      "SQL: sales-accepted MQL with confirmed budget owner and a scheduled discovery call.",
      "SLA: sales touches every MQL within 24 business hours. Rejections carry a reason code.",
      "Stalled (re-engagement eligible): open opp created >45 days ago, no stage advance in 30 days, no marketing engagement in 21 days.",
      "AMENDED v4.1 — Eligibility is evaluated against live CRM state at dispatch time; any contact on an open deal with sales activity in the last 21 days is excluded.",
    ],
    versions: [
      { v: "v2", date: "Oct 2025", note: "Reason codes added to rejections — backfilled" },
      { v: "v3", date: "Feb 2026", note: "Intent actions expanded" },
      { v: "v4", date: "Jun 20, 2026", note: "Stalled definition added for re-engagement plays" },
      {
        v: "v4.1",
        date: "Aug 28, 2026",
        note: "One-line amendment after the Aug 27 mid-deal catch: dispatch-time CRM freshness check",
        isAmendment: true,
      },
    ],
  },
  {
    id: "channel-thesis",
    code: "POS-04",
    name: "Channel thesis — depth over reach",
    kind: "Channel truth",
    version: "v1",
    ratified: "Mar 4, 2026",
    signatures: [
      { personId: "maya", role: "owner", state: "signed", date: "Mar 4, 2026" },
    ],
    subscribers: ["Budget allocation", "Play type selector"],
    body: [
      "Security buyers convert through depth, not impressions: webinars and benchmark data outperform paid social for this ICP.",
      "Paid social runs retargeting-only. Cold paid social requires a sanctioned exception test with a kill date.",
      "Evidence, trailing 12 months (cost per MQL): webinars $96 · search $118 · newsletter sponsorships $84 · LinkedIn cold $402 · display $610.",
      "Review date: Oct 1, 2026. Status: holding — P-127 ran as the sanctioned exception; results confirm the thesis.",
    ],
    versions: [{ v: "v1", date: "Mar 4, 2026", note: "Ratified after Q1 channel review" }],
  },
  {
    id: "promotions",
    code: "POS-05",
    name: "Incentives & promotions policy",
    kind: "Legal-gated",
    version: "v1",
    ratified: "Jan 15, 2026",
    signatures: [
      { personId: "maya", role: "owner", state: "signed", date: "Jan 15, 2026" },
      { personId: "priya", role: "legal co-sign (permanent gate)", state: "signed", date: "Jan 15, 2026" },
    ],
    subscribers: ["Play routing rules", "Legal gate router"],
    body: [
      "§1 — No incentives to contacts in an active sales process.",
      "§2 — Any contact-facing incentive above $0 routes to a legal gate before dispatch.",
      "§2.1 — Jurisdiction rules apply per recipient country; EU cash-equivalent gifts are capped case-by-case (DE strictest — UWG §7).",
      "§3 — No sweepstakes or chance-based promotions.",
    ],
    versions: [{ v: "v1", date: "Jan 15, 2026", note: "Co-signed by legal at Loop setup" }],
  },
];

/** ICP drift detector output (renders on POS-01). */
export const icpDrift = {
  headline:
    "Closed-won profile has drifted from your definition — fintech is 40% of wins vs 15% of stated ICP.",
  window: "Trailing two quarters, n = 47 closed-won",
  proposal:
    "Draft v4 reweights fintech 15% → 35% and adds a named fintech segment with its own plays. Ghost draft ready — nothing changes until you ratify.",
  decisionDate: "Sep 2, 2026 (bundled with Fintech pipeline Bet review)",
};

/** Voice critic output (renders on POS-02). */
export const sameness = {
  flaggedDraft: "Benchmark Report launch email v3 · drafted Aug 21",
  score: 0.87,
  corpusMedian: 0.79,
  line:
    "This draft is statistically indistinguishable from what ~4,000 other portals shipped in this category this month (similarity 0.87 vs anonymized aggregate).",
  missing: [
    "Named numbers (present in your top-decile posts, absent here)",
    "First-person auditor anecdote",
    "Plain-verb CTA — draft uses “Unlock insights”",
  ],
  note: "Two rewrites suggested — free (critic work is never metered). The same bar applies to human drafts.",
};

/** Rejection telemetry (renders on POS-03). */
export const mqlTelemetry = {
  window: "Since Jul 1, 2026",
  sent: 203,
  slaTouchPct: 61,
  corpusSlaPct: 68,
  workedToDisposition: 138,
  accepted: 91,
  acceptancePct: 66,
  rejected: 47,
  topReason: { reason: "No budget", count: 21, sharePct: 45 },
  concentration:
    "71% of “no budget” rejections come from one segment: compliance-checklist self-serve downloads.",
  fintechAcceptancePct: 44,
};
