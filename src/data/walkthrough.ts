export interface Stop {
  n: number;
  path: string;
  /** Longest-prefix match for highlighting (defaults to path). */
  match?: string;
  nav: string;
  title: string;
  momentKey: string;
  proves: string;
}

export const stops: Stop[] = [
  {
    n: 0,
    path: "/",
    nav: "Overview",
    title: "The Loop",
    momentKey: "overview",
    proves:
      "The frame: fewer, provable bets — each handed to AI at exactly the trust it has earned.",
  },
  {
    n: 1,
    path: "/close/retro",
    nav: "Retroactive Close",
    title: "Retroactive Close — day one",
    momentKey: "retro",
    proves:
      "First value before any commitment: the system reconstructs last quarter, names what didn't pay, and only then asks for two minutes of ratification.",
  },
  {
    n: 2,
    path: "/close/weekly",
    nav: "Weekly Close",
    title: "Weekly Close — week 8",
    momentKey: "close",
    proves:
      "The ritual that replaces status meetings: shipped / cost / returned / decide — pruning with receipts, lineage confirmed in batch, killing a play framed as reclaiming budget.",
  },
  {
    n: 3,
    path: "/delta",
    nav: "Delta",
    title: "Delta — Tuesday catch-up",
    momentKey: "delta",
    proves:
      "Catching up is a diff ranked by remaining agency, not a feed ranked by recency. The header tells you whether the AI stayed inside its lanes.",
  },
  {
    n: 4,
    path: "/bets/fintech-pipeline",
    match: "/bets",
    nav: "Bet detail",
    title: "Bet — the standing answer",
    momentKey: "bet",
    proves:
      "Status is a byproduct of real objects: the owner's judgment on top, computed receipts beneath, the Ledger under everything — and the two clocks kept structurally apart.",
  },
  {
    n: 5,
    path: "/plays/reengagement/bid",
    nav: "Bid & delegation",
    title: "Credit quote & delegation",
    momentKey: "bid",
    proves:
      "Delegation is a countersigned bid — scope, cost, expected range, undo story — not a settings page. Scope drift bounces back as a change order.",
  },
  {
    n: 6,
    path: "/prosecutor",
    nav: "Prosecutor",
    title: "Prosecutor moments",
    momentKey: "prosecutor",
    proves:
      "The prosecutor lives inside artifacts you already touch — the risk line, your own narrative, the promotion gate. You can't mute your own report.",
  },
  {
    n: 7,
    path: "/coordination",
    nav: "Coordination",
    title: "Multi-party coordination",
    momentKey: "coordination",
    proves:
      "State lives on the object; Slack cards are mirrors that write back; a disagreement resolves as one line tightened on the governing contract.",
  },
  {
    n: 8,
    path: "/positions",
    nav: "Positions",
    title: "Positions & the brand clock",
    momentKey: "positions",
    proves:
      "Durable truths with drift detection, sameness scoring, rejection telemetry and co-signatures — and the brand clock: trends vs corpus, never progress bars.",
  },
  {
    n: 9,
    path: "/incident",
    nav: "Undo in action",
    title: "Undo in action",
    momentKey: "incident",
    proves:
      "Trust is physics — waves, holds, tripwires. A live mistake gets contained in 23 minutes and ends as one line tightened on one artifact, not revoked autonomy.",
  },
];

export function stopForPath(pathname: string): Stop {
  let best = stops[0];
  let bestLen = -1;
  for (const s of stops) {
    const m = s.match ?? s.path;
    if (
      (m === "/" && pathname === "/") ||
      (m !== "/" && pathname.startsWith(m))
    ) {
      if (m.length > bestLen) {
        best = s;
        bestLen = m.length;
      }
    }
  }
  return best;
}
