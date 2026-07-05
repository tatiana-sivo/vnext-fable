import { useState } from "react";
import {
  cfoStory,
  conversion,
  impliedBets,
  narrativeClaims,
  retroTotals,
} from "../data/retro";
import { corpus } from "../data/benchmarks";
import { fmtMoney } from "../lib/format";
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

export default function RetroClose() {
  const [checked, setChecked] = useState<Record<string, boolean>>(
    Object.fromEntries(impliedBets.map((b) => [b.id, true])),
  );
  const [confirmed, setConfirmed] = useState(false);
  const checkedCount = Object.values(checked).filter(Boolean).length;

  return (
    <div>
      <ScreenHead
        title="Q2 2026, reconstructed"
        lede={
          <>
            Day one. Nothing has been configured and nothing has been asked of anyone.
            The system read twelve months of portal data, clustered last quarter's spend
            into <strong>implied Bets</strong>, benchmarked each against the {corpus.portals}-portal
            corpus ({corpus.cohort}), and compiled the story below — counterevidence attached.
            The first act is taking work off Maya's desk, not adding to it.
          </>
        }
      />

      {/* topline */}
      <Panel className="mb-4">
        <div className="grid grid-cols-5 gap-6">
          <Stat label="Q2 program spend" value={fmtMoney(retroTotals.spend)} sub="excl. salaries" />
          <Stat
            label="Attributed pipeline"
            value={fmtMoney(retroTotals.attributedPipeline)}
            sub="across six clusters"
          />
          <Stat
            label="Pipeline per $"
            value={`${retroTotals.multiple}×`}
            sub={`corpus p50 ${retroTotals.corpusMultipleP50}× · p${retroTotals.multiplePercentile}`}
          />
          <Stat
            label="Closed-won in-quarter"
            value={fmtMoney(retroTotals.closedWonInQuarter)}
            sub={retroTotals.lagNote}
          />
          <Stat
            label="Spend that didn't pay"
            value={
              <span className="text-critical-text">{fmtMoney(retroTotals.didNotPaySpend)}</span>
            }
            sub={`${retroTotals.didNotPayShare}% of program spend — named below`}
          />
        </div>
      </Panel>

      {/* implied bets */}
      <Panel className="mb-4" pad={false}>
        <div className="p-4 pb-0">
          <PanelHeader
            eyebrow="Inferred from spend clusters — nobody filed anything"
            title="Six implied Bets"
            right={<Chip tone="neutral">grouping confidence shown per cluster</Chip>}
          />
        </div>
        <div>
          {impliedBets.map((b) => (
            <label
              key={b.id}
              className={cx(
                "flex cursor-pointer items-start gap-3 border-t border-hairline px-4 py-3 transition-colors hover:bg-plane/60",
                b.verdict === "did-not-pay" && "bg-critical-wash/30",
              )}
            >
              <input
                type="checkbox"
                checked={checked[b.id]}
                disabled={confirmed}
                onChange={(e) => setChecked({ ...checked, [b.id]: e.target.checked })}
                className="mt-1 h-3.5 w-3.5 accent-[#0b0b0b]"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-[13px] font-semibold text-ink">{b.name}</span>
                  {b.verdict === "did-not-pay" && (
                    <Chip tone="critical">✕ did not pay</Chip>
                  )}
                </div>
                <div className="mt-0.5 text-[11px] text-ink-3">
                  inferred from: {b.inferredFrom}
                </div>
                {b.note && <div className="mt-1 text-[11.5px] text-ink-2">{b.note}</div>}
              </div>
              <div className="w-20 shrink-0 text-right">
                <div className="font-mono text-[13px] font-semibold tabular-nums text-ink">
                  {fmtMoney(b.spend)}
                </div>
                <div className="text-[10px] text-ink-3">spend</div>
              </div>
              <div className="w-56 shrink-0 text-right">
                <div className="font-mono text-[12px] tabular-nums text-ink-2">{b.outcome}</div>
                <div className="mt-0.5 flex items-center justify-end gap-1.5">
                  <Chip
                    tone={b.percentile >= 60 ? "good" : b.percentile >= 40 ? "neutral" : "critical"}
                  >
                    corpus p{b.percentile}
                  </Chip>
                  <span className="text-[10px] text-ink-3">grouping {b.confidence}%</span>
                </div>
              </div>
            </label>
          ))}
          <div className="flex items-center justify-between border-t border-hairline px-4 py-2.5">
            <span className="text-[12px] text-ink-2">
              Unattributed work — allowed, visible, costed
            </span>
            <span className="font-mono text-[12px] tabular-nums text-ink-2">
              {fmtMoney(retroTotals.unattributed.spend)} · {retroTotals.unattributed.items} items
            </span>
          </div>
        </div>
      </Panel>

      <div className="mb-4 grid grid-cols-2 gap-4">
        {/* narrative */}
        <Panel>
          <PanelHeader
            eyebrow="Drafted for the CEO/CFO — cross-examined before you saw it"
            title="Leadership narrative, Q2"
          />
          <div className="space-y-3">
            {narrativeClaims.map((c) => (
              <div key={c.claim} className="border-l-2 border-hairline pl-3">
                <div className="flex items-start gap-2">
                  <span className="text-[13px] font-medium leading-snug text-ink">
                    “{c.claim}”
                  </span>
                </div>
                <div className="mt-1 text-[11.5px] text-ink-2">{c.evidence}</div>
                {c.status === "counterevidence" ? (
                  <div className="mt-1.5 rounded border border-[#f2d9a4] bg-warn-wash px-2.5 py-1.5 text-[11.5px] leading-relaxed text-warn-text">
                    <span className="font-semibold">Counterevidence attached · </span>
                    {c.counter}
                  </div>
                ) : (
                  <div className="mt-1 text-[10px] font-medium uppercase tracking-wide text-good-text">
                    ✓ survived falsification pass
                  </div>
                )}
              </div>
            ))}
          </div>
        </Panel>

        {/* CFO story */}
        <Panel>
          <PanelHeader
            eyebrow="Forwardable as-is — the first value moment"
            title="The 90-second CFO story"
          />
          <div className="space-y-3">
            {cfoStory.map((s) => (
              <div key={s.t} className="flex gap-3">
                <span className="w-9 shrink-0 pt-0.5 font-mono text-[11px] tabular-nums text-ink-3">
                  {s.t}
                </span>
                <p className="text-[13px] leading-relaxed text-ink-2">{s.line}</p>
              </div>
            ))}
          </div>
          <Note className="mt-3 border-t border-hairline pt-2.5">
            Compiled, not assembled. Building this by hand took Maya two days last
            quarter. Reading status is always free — it's the trust on-ramp before any
            delegation exists.
          </Note>
        </Panel>
      </div>

      {/* conversion */}
      <Panel className={cx(confirmed && "border-good bg-good-wash/40")}>
        {!confirmed ? (
          <div className="flex items-center justify-between gap-6">
            <div>
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[20px] font-bold text-ink">
                  {conversion.confidenceNow}%
                </span>
                <span className="text-[13px] text-ink-2">
                  right today, from inference alone —
                </span>
                <span className="font-mono text-[20px] font-bold text-good-text">
                  {conversion.confidenceNext}%
                </span>
                <span className="text-[13px] text-ink-2">next quarter, if you ratify.</span>
              </div>
              <p className="mt-1 text-[12.5px] text-ink-2">{conversion.ask}</p>
            </div>
            <Btn
              variant="primary"
              disabled={checkedCount === 0}
              onClick={() => setConfirmed(true)}
            >
              Confirm {checkedCount} grouping{checkedCount === 1 ? "" : "s"} as Bets
            </Btn>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-6">
            <div>
              <div className="text-[14px] font-semibold text-good-text">
                ✓ {checkedCount} Bets ratified for lineage · logged L-130
              </div>
              <p className="mt-1 text-[12.5px] text-ink-2">
                Lineage is now default-on: everything ships with a guessed attribution,
                corrected in batch at the Close. Two forward Bets were signed the same
                week — see stop 2 for the quarter in motion.
              </p>
            </div>
            <Eyebrow>ratification: ~2 minutes</Eyebrow>
          </div>
        )}
      </Panel>
    </div>
  );
}
