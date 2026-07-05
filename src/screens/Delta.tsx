import { useState } from "react";
import { Link } from "react-router-dom";
import { deltaHeader, deltaItems, routineActions } from "../data/delta";
import { creditBudget } from "../data/credits";
import {
  Btn,
  Chip,
  Eyebrow,
  Note,
  Panel,
  PanelHeader,
  ScreenHead,
  cx,
} from "../components/ui";

type UnsendState = "pending" | "recalled" | "stands";

const agencyTone = {
  critical: "critical",
  warn: "warn",
  accent: "accent",
  neutral: "neutral",
} as const;

export default function Delta() {
  const [unsend, setUnsend] = useState<UnsendState>("pending");

  return (
    <div>
      <ScreenHead
        title="Your Delta"
        lede={
          <>
            Tuesday, 10:15. A diff since you last looked ({deltaHeader.since}), ranked
            by <strong>remaining agency</strong> — what you can still change — never by
            recency. Catching up isn't reading actions; it's scanning whether the AI
            stayed inside the lines. The header does that work.
          </>
        }
      />

      {/* decision-class header + credit strip */}
      <Panel className="mb-4">
        <div className="flex items-center justify-between gap-6">
          <div>
            <div className="text-[16px] font-semibold text-ink">
              {deltaHeader.line}
            </div>
            <div className="mt-1 flex items-center gap-1.5">
              <Chip tone="good">✓ 0 tripwires</Chip>
              <Chip tone="good">✓ 0 out-of-lane actions</Chip>
              <Chip tone="neutral">boundary status carried on every action below</Chip>
            </div>
          </div>
          <div className="shrink-0 border-l border-hairline pl-6">
            <Eyebrow className="mb-1">Credit spend</Eyebrow>
            <div className="text-[15px] font-semibold text-credit">
              ◆{creditBudget.thisWeek} this week
              <span className="ml-2 font-normal text-ink-2">
                · {creditBudget.remaining} of {creditBudget.quarter} Q3 remaining
              </span>
            </div>
            <div className="mt-1.5 flex gap-4">
              {creditBudget.allocation
                .filter((a) => a.betId !== "house")
                .map((a) => (
                  <span key={a.betId} className="text-[11px] text-ink-3">
                    {a.label}:{" "}
                    <span className="font-mono font-medium text-ink-2">
                      ◆{a.budget - a.spent} left
                    </span>
                  </span>
                ))}
            </div>
          </div>
        </div>
      </Panel>

      {/* ranked items */}
      <div className="space-y-3">
        {deltaItems.map((item) => (
          <Panel key={item.rank} className={cx(item.rank === 1 && "border-warn/60")}>
            <div className="flex items-start gap-4">
              <div className="flex w-7 shrink-0 flex-col items-center pt-0.5">
                <span className="font-mono text-[13px] font-bold text-ink-3">{item.rank}</span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Chip tone={agencyTone[item.agencyTone]}>{item.agency}</Chip>
                  <span className="text-[13.5px] font-semibold text-ink">{item.title}</span>
                </div>
                <p className="mt-1.5 max-w-3xl text-[12.5px] leading-relaxed text-ink-2">
                  {item.body}
                </p>
                {item.decay && (
                  <p className="mt-1.5 text-[11.5px] text-serious-text">
                    Decay: {item.decay}
                  </p>
                )}
                <div className="mt-2 flex items-center gap-2">
                  <Chip tone="neutral" className="font-mono">
                    {item.decisionClass}
                  </Chip>
                </div>

                {/* item-1 unsend interaction */}
                {item.rank === 1 && (
                  <div className="mt-3">
                    {unsend === "pending" ? (
                      <div className="flex items-center gap-2">
                        <Btn variant="danger" onClick={() => setUnsend("recalled")}>
                          Unsend — true undo, ◆ refunds
                        </Btn>
                        <Btn onClick={() => setUnsend("stands")}>Let it dispatch</Btn>
                        <Note className="ml-1">
                          It outranks everything older because you can still act on it.
                        </Note>
                      </div>
                    ) : unsend === "recalled" ? (
                      <div className="rounded border border-good bg-good-wash px-3 py-2 text-[12.5px] font-medium text-good-text">
                        ✓ Recalled inside the hold. 397 messages never left the queue —
                        zero recipient impact. ◆4 refunded. Logged to the Ledger.
                      </div>
                    ) : (
                      <div className="rounded border border-hairline bg-plane px-3 py-2 text-[12.5px] text-ink-2">
                        Will dispatch Tue 18:20 as committed. The item drops out of the
                        Delta once its agency window closes.
                      </div>
                    )}
                  </div>
                )}

                {item.rank === 2 && (
                  <div className="mt-3">
                    <Link
                      to="/plays/reengagement/bid"
                      className="rounded border border-ink bg-ink px-3 py-1.5 text-[12px] font-medium text-surface transition-colors hover:bg-ink/80"
                    >
                      Open the bid →
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </Panel>
        ))}

        {/* routine actions — collapsed */}
        <Panel>
          <details>
            <summary className="cursor-pointer list-none">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[13px] font-bold text-ink-3">·</span>
                  <span className="text-[13px] font-medium text-ink-2">
                    {routineActions.line}
                  </span>
                </div>
                <span className="text-[11px] font-medium text-accent-deep">expand</span>
              </div>
            </summary>
            <div className="mt-3 space-y-1 border-t border-hairline pt-3">
              {routineActions.examples.map((e) => (
                <div key={e} className="text-[12px] text-ink-2">
                  · {e}
                </div>
              ))}
              <Note className="pt-1">
                Inside granted lanes, review isn't owed — that's what the grant means.
                The calibration sample (item 4) keeps the track record honest anyway.
              </Note>
            </div>
          </details>
        </Panel>
      </div>

      <Panel className="mt-4">
        <PanelHeader eyebrow="Why this isn't a feed" title="Ranking rule" />
        <p className="max-w-3xl text-[12.5px] leading-relaxed text-ink-2">
          An auto-committed email inside its unsend window outranks anything already
          immutable. A parked decision with real decay outranks news. Information you
          can't act on renders last, collapsed. Deferral is a first-class reply — free,
          but it shows honest decay, computed from the cohort, not claimed.
        </p>
      </Panel>
    </div>
  );
}
