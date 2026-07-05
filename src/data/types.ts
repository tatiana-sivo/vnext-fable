export type TrustLevel = "L0" | "L1" | "L2";

export type Tone =
  | "neutral"
  | "accent"
  | "credit"
  | "good"
  | "warn"
  | "serious"
  | "critical";

export interface Person {
  id: string;
  name: string;
  role: string;
  team: "marketing" | "sales" | "legal" | "exec";
  initials: string;
}

export interface Signature {
  personId: string;
  role: string; // "owner" | "co-signer" | "legal gate" | ...
  state: "signed" | "pending" | "gate-pending" | "notified";
  date?: string;
}

export type PlayState =
  | "healthy"
  | "inline"
  | "underperforming"
  | "pending-bid"
  | "active"
  | "paused";

export interface BenchmarkRow {
  metric: string;
  yours: string;
  corpus: string;
  percentile?: number; // performance percentile in the 280K corpus
  note?: string;
}

export interface Play {
  id: string;
  code: string; // P-121
  name: string;
  betId: string;
  type: string;
  state: PlayState;
  stateLabel: string;
  audience: string;
  moneySpent: number;
  moneyBudget: number;
  creditsSpent: number;
  creditsBudget: number;
  lane?: string; // delegation lane + trust level
  summary: string;
  receipts?: BenchmarkRow[];
}

export interface LedgerEntry {
  id: string; // L-241
  date: string;
  kind:
    | "grant"
    | "spend"
    | "outcome"
    | "decision"
    | "signature"
    | "gate"
    | "incident"
    | "amendment"
    | "change-order"
    | "promotion-gate";
  betId?: "fintech-pipeline" | "authority" | "house";
  text: string;
  credits?: number; // credits spent (negative = reclaimed/refunded)
  backfilled?: boolean; // reconstructed from portal audit logs, pre-Loop
}

export interface Bet {
  id: "fintech-pipeline" | "authority";
  name: string;
  kind: "pipeline" | "brand";
  hypothesis: string;
  target: string;
  targetValue: number;
  targetUnit: "$" | "downloads";
  window: string;
  falsification: string;
  checkpoint: string;
  signatures: Signature[];
  money: { budget: number; spent: number };
  credits: { budget: number; spent: number };
  pace: {
    actual: number;
    planToDate: number;
    pacePct: number; // actual / plan-to-date
    elapsedPct: number;
    targetPct: number; // actual / target
    forecast: [number, number];
    secondary?: string;
  };
  clockSeries: { plan: number[]; actual: number[] }; // cumulative, by week
  standing: {
    ownerLine: string;
    ownerId: string;
    asOf: string;
    risk: string;
    riskReceipts: BenchmarkRow[];
    nextDecision: string;
  };
  playIds: string[];
  brandClockNote?: string;
}
