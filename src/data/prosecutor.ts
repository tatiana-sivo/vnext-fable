/**
 * Screen 6 — the prosecutor lives in artifacts, not notifications.
 * Three placements: the risk line, the narrative compiler, the promotion gate.
 */
export const narrativeCase = {
  where: "Quarterly narrative compiler — Q3 draft, compiled Aug 24",
  claim:
    "Pipeline growth this quarter is driven by the email nurture engine (+34% QoQ nurture-sourced pipeline).",
  claimAuthor: "Drafted from Ledger + attribution tables",
  counter: [
    "62% of nurture-converted contacts had a paid-search or webinar touchpoint within the prior 30 days — attribution is shared, not owned.",
    "Nurture-only cohort converts at 1.9% vs 4.7% blended.",
    "Nurture-sourced fintech pipeline: $214K of $612K total.",
  ],
  rule:
    "A claim that fails its own falsification pass cannot ship without its counterevidence attached. You read your own report after it was cross-examined.",
  shippedForm:
    "“Email nurture contributed to pipeline growth (+34% QoQ nurture-sourced)*   *shared attribution: 62% of converted contacts carried prior paid or webinar touches; nurture-only conversion is 1.9% vs 4.7% blended.”",
};

export const promotionCase = {
  where: "Promotion gate — brand metric seeking a business-clock target",
  applicant: "Branded search volume",
  movement: "+31% Jul → Aug (index 122 → 160)",
  request: "Earn a Q4 target tied to demo requests (proposed +25%)",
  argued: [
    "Incumbent (Certifly) pricing change on Jul 14 lifted category-wide search — the rise is not yours alone.",
    "G2 summer grid placement (Jul 22) is a non-spend event in the same window.",
    "UK holdout — no brand spend all quarter — rose +24% anyway.",
    "12-month correlation with demo requests is r = 0.41; controlling for week-of-quarter, the link collapses.",
  ],
  verdict:
    "DENIED — branded search stays on the brand clock. Re-apply with holdout evidence after the benchmark-report push.",
  logged: "Ledger L-238 · Aug 24",
  note: "Gates don't have mute buttons. A brand metric earns a target only by surviving the argued link.",
};
