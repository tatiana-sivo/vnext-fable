import { useState } from "react";
import { bid, changeOrder, grantSignature } from "../data/bid";
import {
  Btn,
  Chip,
  Eyebrow,
  Note,
  Panel,
  PanelHeader,
  ScreenHead,
  Stat,
  cx,
} from "../components/ui";

type Phase = "unsigned" | "signed" | "change-order" | "resolved";

export default function BidFlow() {
  const [phase, setPhase] = useState<Phase>("unsigned");
  const [choice, setChoice] = useState<string | null>(null);

  return (
    <div>
      <ScreenHead
        title="The AI bids. You countersign."
        lede={
          <>
            You don't configure delegation — you edit and countersign the AI's proposed
            terms. Every AI job presents a bid before running: scope, credit cost,
            expected range, benchmark basis, what it will do without asking, what it
            comes back for, and the undo story. Framed like media spend, because
            funding a bet is a decision marketers already know how to make.
          </>
        }
      />

      {/* the bid card */}
      <Panel className="mb-4" pad={false}>
        <div className="flex items-center justify-between border-b border-hairline bg-plane/60 px-4 py-2.5">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-[11px] text-ink-3">{bid.playCode}</span>
            <span className="text-[14px] font-semibold text-ink">{bid.title}</span>
            <Chip tone="credit">bid — no spend until signed</Chip>
          </div>
          <span className="text-[11px] text-ink-3">
            {bid.proposedBy} · {bid.proposedAt}
          </span>
        </div>

        <div className="grid grid-cols-12 gap-0">
          {/* scope + cost */}
          <div className="col-span-4 border-r border-hairline p-4">
            <Eyebrow className="mb-2">Scope</Eyebrow>
            <div className="text-[13px] font-semibold text-ink">{bid.scope.audience}</div>
            <div className="mt-1 space-y-1 text-[11.5px] leading-relaxed text-ink-2">
              <div>{bid.scope.definition}</div>
              <div className="text-ink-3">{bid.scope.snapshot}</div>
              <div>{bid.scope.sequence}</div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-hairline pt-3">
              <Stat
                label="Credit cost"
                value={<span className="text-credit">◆{bid.credits}</span>}
                sub={bid.money}
              />
              <Stat
                label="Expected return"
                value={`${bid.expected.low}–${bid.expected.high}`}
                sub={bid.expected.unit}
              />
            </div>
            <div className="mt-3 rounded border border-hairline bg-plane/60 p-2.5">
              <Eyebrow className="mb-1">Benchmark basis</Eyebrow>
              <p className="text-[11.5px] leading-relaxed text-ink-2">{bid.benchmark}</p>
            </div>
          </div>

          {/* boundaries */}
          <div className="col-span-4 border-r border-hairline p-4">
            <Eyebrow className="mb-2">Will do without asking</Eyebrow>
            <ul className="space-y-1.5">
              {bid.willDo.map((w) => (
                <li key={w} className="flex gap-2 text-[12px] leading-snug text-ink-2">
                  <span className="text-good-text" aria-hidden>✓</span>
                  {w}
                </li>
              ))}
            </ul>
            <Eyebrow className="mb-2 mt-4">Will come back for</Eyebrow>
            <ul className="space-y-1.5">
              {bid.willReturnFor.map((w) => (
                <li key={w} className="flex gap-2 text-[12px] leading-snug text-ink-2">
                  <span className="text-warn-text" aria-hidden>◈</span>
                  {w}
                </li>
              ))}
            </ul>
          </div>

          {/* undo story */}
          <div className="col-span-4 p-4">
            <Eyebrow className="mb-2">The undo story — engineered before action</Eyebrow>
            <div className="space-y-2.5 text-[12px] leading-snug text-ink-2">
              <div>
                <span className="font-semibold text-ink">Waves. </span>
                {bid.undo.waves}
              </div>
              <div>
                <span className="font-semibold text-ink">Holds. </span>
                {bid.undo.holds}
              </div>
              <div>
                <span className="font-semibold text-ink">Tripwires. </span>
                auto-pause remaining waves on:
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {bid.undo.tripwires.map((t) => (
                    <Chip key={t} tone="neutral" className="font-mono">
                      {t}
                    </Chip>
                  ))}
                </div>
              </div>
              <div>
                <span className="font-semibold text-ink">Kill switch. </span>
                {bid.undo.kill}
              </div>
            </div>
          </div>
        </div>

        {/* routing */}
        <div className="border-t border-hairline px-4 py-3">
          <Eyebrow className="mb-2">Routing — computed from rules, not org chart</Eyebrow>
          <div className="grid grid-cols-3 gap-3">
            {bid.routing.map((r) => (
              <div key={r.who} className="rounded border border-hairline bg-plane/50 p-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-[12px] font-semibold text-ink">{r.who}</span>
                  <Chip
                    tone={r.state === "awaiting" ? "accent" : r.state === "queued" ? "warn" : "neutral"}
                  >
                    {r.state === "awaiting" ? "signature required" : r.state === "queued" ? "hard gate" : "notified"}
                  </Chip>
                </div>
                <p className="mt-1 text-[11px] leading-snug text-ink-3">{r.why}</p>
              </div>
            ))}
          </div>
        </div>

        {/* signature strip */}
        <div
          className={cx(
            "border-t border-hairline px-4 py-3",
            phase !== "unsigned" && "bg-good-wash/50",
          )}
        >
          {phase === "unsigned" ? (
            <div className="flex items-center justify-between">
              <Note>
                Edit the boundary lines, then sign. The grant is scoped to exactly these
                terms — accountability follows signatures, and every signature is scoped.
              </Note>
              <Btn variant="primary" onClick={() => setPhase("signed")}>
                Sign the grant — fund ◆{bid.credits}
              </Btn>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-[13px] font-semibold text-good-text">✓ Grant signed</span>
                <span className="font-mono text-[11.5px] text-ink-2">
                  scope {grantSignature.scopeHash} · {grantSignature.signer} ·{" "}
                  {grantSignature.signedAt} · Ledger {grantSignature.ledger}
                </span>
              </div>
              <span className="max-w-md text-right text-[11px] text-ink-3">
                {grantSignature.counterparty}
              </span>
            </div>
          )}
        </div>
      </Panel>

      {/* advance to change order */}
      {phase === "signed" && (
        <div className="mb-4 flex justify-center">
          <Btn onClick={() => setPhase("change-order")}>
            ⏩ Advance the demo clock → Wed 07:40, overnight CRM sync lands
          </Btn>
        </div>
      )}

      {(phase === "change-order" || phase === "resolved") && (
        <Panel className={cx("mb-4", phase === "change-order" && "border-warn/70")}>
          <PanelHeader
            eyebrow={`Change order · raised ${changeOrder.raisedAt}`}
            title="Scope drifted +30% — auto-paused, new bid presented"
            right={<Chip tone="warn">◈ paused before wave 1</Chip>}
          />
          <p className="max-w-3xl text-[12.5px] leading-relaxed text-ink-2">
            {changeOrder.trigger}
          </p>
          <p className="mt-1 text-[12px] font-medium text-ink">{changeOrder.status}</p>

          <div className="mt-3 grid grid-cols-3 gap-3">
            {changeOrder.options.map((o) => {
              const selected = choice === o.id;
              return (
                <button
                  key={o.id}
                  disabled={phase === "resolved"}
                  onClick={() => {
                    setChoice(o.id);
                    setPhase("resolved");
                  }}
                  className={cx(
                    "rounded border p-3 text-left transition-colors",
                    selected
                      ? "border-good bg-good-wash"
                      : "border-hairline bg-surface hover:bg-plane disabled:opacity-50",
                  )}
                >
                  <div className={cx("text-[12.5px] font-semibold", selected ? "text-good-text" : "text-ink")}>
                    {selected ? "✓ " : ""}
                    {o.label}
                  </div>
                  <div className="mt-0.5 text-[11.5px] text-ink-2">{o.detail}</div>
                </button>
              );
            })}
          </div>

          {phase === "resolved" && (
            <div className="mt-3 rounded border border-hairline bg-plane/60 px-3 py-2 text-[12px] text-ink-2">
              {choice === "keep" ? (
                <>{changeOrder.resolution}</>
              ) : choice === "expand" ? (
                <>
                  Expanded scope approved — ◆15, expected 10–19. (In the recorded
                  timeline Maya keeps the original 400; the walkthrough continues from
                  that state.) “Narrow the scope” renders with equal prominence either way.
                </>
              ) : (
                <>
                  Play cancelled, zero spend. (In the recorded timeline Maya keeps the
                  original 400 — the walkthrough continues from that state.)
                </>
              )}
            </div>
          )}
        </Panel>
      )}

      <Panel>
        <PanelHeader eyebrow="Why a bid, not a setting" title="What the bid changes" />
        <div className="grid grid-cols-3 gap-6 text-[12.5px] leading-relaxed text-ink-2">
          <p>
            <span className="font-semibold text-ink">Approval becomes funding.</span>{" "}
            “Fund this play at ◆12 for 8–15 recoveries” is a portfolio decision, not a
            software-permissions decision. The 280K-corpus range keeps the promise
            honest.
          </p>
          <p>
            <span className="font-semibold text-ink">Boundaries are the contract.</span>{" "}
            Out-of-bid execution auto-refunds credits and logs as a system fault.
            Mid-flight drift beyond ±25% auto-pauses into a change order — you just
            watched it happen.
          </p>
          <p>
            <span className="font-semibold text-ink">Reversibility is collateral.</span>{" "}
            Waves, holds and tripwires are signed before anything runs. Stop 9 shows
            this exact play's undo story firing for real.
          </p>
        </div>
      </Panel>
    </div>
  );
}
