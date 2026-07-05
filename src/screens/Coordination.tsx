import { useState } from "react";
import {
  danaDeltaCard,
  evidencePanel,
  legalSlackCard,
  steps,
} from "../data/coordination";
import { bid } from "../data/bid";
import { positionDiff } from "../data/incident";
import {
  Btn,
  Chip,
  Eyebrow,
  Note,
  Panel,
  ScreenHead,
  cx,
} from "../components/ui";
import { DiffBlock, SlackMirror, XLink } from "../components/objects";

export default function Coordination() {
  const [idx, setIdx] = useState(0);
  const step = steps[idx];

  return (
    <div>
      <ScreenHead
        title="One play, three parties, zero meetings"
        lede={
          <>
            Marketing owner, sales co-signer, legal gate. Three rules govern everything
            you're about to click through: state lives on the object and every surface
            is a mirror that writes back; everything shown to anyone is a diff against
            something they signed; and visibility follows signatures — you see what
            you've signed, been named on, or are bound by.
          </>
        }
      />

      {/* stepper */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        {steps.map((s, i) => (
          <button
            key={s.n}
            onClick={() => setIdx(i)}
            className={cx(
              "rounded border px-2.5 py-1.5 text-[11.5px] font-medium transition-colors",
              i === idx
                ? "border-ink bg-ink text-surface"
                : i < idx
                  ? "border-hairline bg-plane text-ink-2 hover:bg-plane/60"
                  : "border-hairline bg-surface text-ink-3 hover:bg-plane",
            )}
          >
            {s.n}. {s.title}
          </button>
        ))}
      </div>

      <Panel className="mb-4 min-h-[380px]">
        <div className="mb-3 flex items-start justify-between gap-4 border-b border-hairline pb-3">
          <div>
            <Eyebrow className="mb-1">
              Step {step.n} of {steps.length} · {step.when}
            </Eyebrow>
            <h2 className="text-[17px] font-semibold text-ink">{step.title}</h2>
          </div>
          <div className="flex shrink-0 gap-2">
            <Btn disabled={idx === 0} onClick={() => setIdx(idx - 1)}>
              ← Back
            </Btn>
            <Btn
              variant="primary"
              disabled={idx === steps.length - 1}
              onClick={() => setIdx(idx + 1)}
            >
              Next →
            </Btn>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-5 space-y-2.5">
            {step.body.map((b) => (
              <p key={b} className="text-[13px] leading-relaxed text-ink-2">
                {b}
              </p>
            ))}
          </div>

          {/* artifact area */}
          <div className="col-span-7">
            {step.kind === "object" && (
              <div className="rounded border border-hairline bg-plane/50 p-4">
                <Eyebrow className="mb-2">The Play object — the single source of state</Eyebrow>
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-[11px] text-ink-3">{bid.playCode}</span>
                  <span className="text-[14px] font-semibold text-ink">{bid.title}</span>
                </div>
                <div className="mt-2 grid grid-cols-3 gap-3 text-[12px]">
                  <div>
                    <Eyebrow className="mb-0.5">Scope</Eyebrow>
                    <span className="text-ink-2">{bid.scope.audience}</span>
                  </div>
                  <div>
                    <Eyebrow className="mb-0.5">Cost / return</Eyebrow>
                    <span className="font-mono text-credit">◆{bid.credits}</span>
                    <span className="text-ink-2"> · {bid.expected.low}–{bid.expected.high} recoveries</span>
                  </div>
                  <div>
                    <Eyebrow className="mb-0.5">Undo</Eyebrow>
                    <span className="text-ink-2">waves 10/30/60 · 24h holds · 4 tripwires</span>
                  </div>
                </div>
                <div className="mt-3 flex gap-1.5 border-t border-hairline pt-2.5">
                  <Chip tone="good">✓ Maya — owner, signed 11:02</Chip>
                  <Chip tone="warn">◈ Legal — gate pending</Chip>
                  <Chip tone="neutral">→ Dana — notified</Chip>
                </div>
              </div>
            )}

            {step.kind === "routing" && (
              <div className="space-y-2.5">
                {bid.routing.map((r) => (
                  <div key={r.who} className="rounded border border-hairline bg-plane/50 p-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[12.5px] font-semibold text-ink">{r.who}</span>
                      <Chip
                        tone={r.state === "awaiting" ? "good" : r.state === "queued" ? "warn" : "neutral"}
                      >
                        {r.state === "awaiting" ? "✓ signed" : r.state === "queued" ? "◈ hard gate" : "→ notified"}
                      </Chip>
                    </div>
                    <p className="mt-1 text-[11.5px] leading-snug text-ink-3">{r.why}</p>
                  </div>
                ))}
                <Note>
                  Nobody picked approvers. The object's clauses matched the rules the
                  parties themselves co-signed — that's the routing table.
                </Note>
              </div>
            )}

            {(step.kind === "slack" || step.kind === "writeback") && (
              <div className="space-y-3">
                <SlackMirror
                  channel={legalSlackCard.channel}
                  time={legalSlackCard.time}
                  header={legalSlackCard.header}
                  buttons={legalSlackCard.buttons}
                  chosen={step.kind === "writeback" ? "Approve with edit" : undefined}
                  footer={legalSlackCard.footer}
                >
                  <p className="text-[11.5px] text-ink-3">{legalSlackCard.matchedRule}</p>
                  {legalSlackCard.diff.map((d) => (
                    <div key={d.k} className="flex gap-2">
                      <span className="w-24 shrink-0 font-medium text-ink">{d.k}</span>
                      <span>{d.v}</span>
                    </div>
                  ))}
                </SlackMirror>
                {step.kind === "writeback" && (
                  <div className="rounded border border-hairline bg-plane/60 p-3">
                    <Eyebrow className="mb-1.5">Writes back to the object</Eyebrow>
                    <div className="font-mono text-[12px]">
                      <span className="text-ink-3 line-through">incentive: $75 gift card (all)</span>
                      <span className="ml-2 rounded bg-good-wash px-1.5 py-0.5 text-good-text">
                        incentive: $75 US · €50 EU cap
                      </span>
                    </div>
                    <p className="mt-2 text-[11.5px] leading-snug text-ink-2">
                      {legalSlackCard.outcome}. Re-check: cost unchanged ◆12; expected
                      8–15 → 8–14 — under the 10% materiality bound, so no
                      re-authorization bounce.
                    </p>
                  </div>
                )}
              </div>
            )}

            {step.kind === "delta" && (
              <div className="max-w-lg rounded-md border border-hairline bg-surface p-4">
                <Eyebrow className="mb-2">{danaDeltaCard.header} — Dana's mirror of the same object</Eyebrow>
                <div className="text-[14px] font-semibold leading-snug text-ink">
                  {danaDeltaCard.headline}
                </div>
                <ul className="mt-2 space-y-1.5">
                  {danaDeltaCard.rows.map((r) => (
                    <li key={r} className="flex gap-2 text-[12px] leading-snug text-ink-2">
                      <span className="text-ink-3" aria-hidden>·</span>
                      {r}
                    </li>
                  ))}
                </ul>
                <Note className="mt-3 border-t border-hairline pt-2">
                  No marketing vocabulary, no dashboards to visit. Sales-language mirror,
                  same signed state.
                </Note>
              </div>
            )}

            {step.kind === "catch" && (
              <div className="space-y-3">
                <div className="rounded border border-[#f0bcbc] bg-critical-wash/50 p-3">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-critical-text">
                    Dana's flag · Thu 11:40
                  </span>
                  <p className="mt-1 text-[13px] font-medium text-ink">
                    “Marketing touched my live deal.”
                  </p>
                </div>
                <div className="rounded border border-hairline bg-plane/60 p-3">
                  <Eyebrow className="mb-2">{evidencePanel.title}</Eyebrow>
                  {evidencePanel.rows.map((r) => (
                    <div key={r.k} className="flex gap-3 border-b border-hairline/70 py-1.5 text-[12px] last:border-b-0">
                      <span className="w-48 shrink-0 font-medium text-ink">{r.k}</span>
                      <span className="text-ink-2">{r.v}</span>
                    </div>
                  ))}
                </div>
                <Note>
                  Disagreement is a state, not a thread. The contested play operates
                  under the last ratified version until a new one is signed — and the
                  argument is located at the artifact that governs it.
                </Note>
              </div>
            )}

            {step.kind === "amendment" && (
              <div className="space-y-3">
                <DiffBlock
                  artifact={positionDiff.artifact}
                  context={positionDiff.context}
                  added={positionDiff.added}
                />
                <div className="flex gap-1.5">
                  <Chip tone="good">✓ Maya — co-signed Fri 11:30</Chip>
                  <Chip tone="good">✓ Dana — co-signed Fri 11:34</Chip>
                  <Chip tone="neutral">Ledger L-248</Chip>
                </div>
                <div className="rounded border border-hairline bg-plane/60 p-3">
                  <Eyebrow className="mb-1">Shadow canary — amendments get waves too</Eyebrow>
                  <p className="font-mono text-[12px] text-ink-2">
                    360 remaining → <span className="text-critical-text">−69</span> (54
                    stage-advanced · 13 recent activity · 2 open-deal) ·{" "}
                    <span className="text-good-text">+24</span> newly stalled → 315 eligible
                  </p>
                </div>
              </div>
            )}

            {step.kind === "outcome" && (
              <div className="space-y-3">
                <div className="rounded border border-good bg-good-wash/50 p-4">
                  <div className="text-[13px] font-semibold text-good-text">
                    The mistake ended as a one-line tightening of a shared contract.
                  </div>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-2">
                    Two contacts saw one email each. Zero further exposure. Both deal
                    owners briefed. No meeting scheduled, no autonomy revoked, no
                    policy doc written.
                  </p>
                </div>
                <div className="flex gap-4">
                  <XLink to="/incident">the undo mechanics, step by step</XLink>
                  <XLink to="/positions#mql-sql">the amended contract</XLink>
                </div>
              </div>
            )}
          </div>
        </div>
      </Panel>

      <Note>
        Degraded paths are designed, not hoped away: gates never auto-unblock (work
        reshapes around them and latency becomes Ledger data); unroutable gates escalate
        as “blocked, no valid approver”; and if nobody signs anything, the system falls
        back to marketing-side lineage with unsigned contracts as documented
        assumptions. It never tries to fix politics with notifications.
      </Note>
    </div>
  );
}
