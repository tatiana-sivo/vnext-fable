import { useState } from "react";
import { Link } from "react-router-dom";
import {
  decisionsDue,
  lineageBatch,
  returned,
  shipped,
  weekCost,
} from "../data/close";
import { playById, pruneDocket } from "../data/bets";
import { fmtMoney } from "../lib/format";
import {
  Btn,
  Chip,
  Cr,
  Eyebrow,
  Note,
  Panel,
  PanelHeader,
  ScreenHead,
  cx,
} from "../components/ui";
import { ReceiptTable } from "../components/objects";

type PruneState = "open" | "killed" | "narrowed" | "kept";

export default function WeeklyClose() {
  const [prune, setPrune] = useState<PruneState>("open");
  const [lineageDone, setLineageDone] = useState(false);
  const p127 = playById("cfo-linkedin");

  return (
    <div>
      <ScreenHead
        title="The Close — week 8 of Q3"
        lede={
          <>
            Monday, 25 minutes, replaces the status meeting. Four questions, always the
            same: what shipped, what it cost, what came back, what needs a decision.
            Nothing here was authored — it's compiled from the objects. The Delta
            (stop 3) is this same structure, continuous; the quarterly Close is this
            same structure, zoomed out.
          </>
        }
      />

      <div className="mb-4 grid grid-cols-12 gap-4">
        {/* shipped */}
        <Panel className="col-span-7" pad={false}>
          <div className="p-4 pb-1">
            <PanelHeader
              eyebrow="Section 1"
              title="Shipped — 9 items"
              right={<Chip tone="neutral">lineage guessed at birth</Chip>}
            />
          </div>
          <div>
            {shipped.map((s) => (
              <div
                key={s.what}
                className="flex items-start gap-3 border-t border-hairline/70 px-4 py-2"
              >
                <span className="w-8 shrink-0 pt-0.5 font-mono text-[10px] uppercase text-ink-3">
                  {s.day}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-[12.5px] leading-snug text-ink">{s.what}</div>
                  <div className="mt-0.5 flex items-center gap-1.5">
                    <Chip tone={s.who.startsWith("AI") ? "credit" : "neutral"}>{s.who}</Chip>
                    {s.betId === "fintech-pipeline" && (
                      <Chip tone={s.provisional && !lineageDone ? "warn" : "accent"}>
                        {s.provisional && !lineageDone ? "◌ provisional → " : "✓ "}
                        Fintech pipeline Q3
                      </Chip>
                    )}
                    {s.betId === "authority" && (
                      <Chip tone="accent">✓ Benchmark conversation</Chip>
                    )}
                    {s.betId === null && <Chip tone="neutral">unattributed — allowed</Chip>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <div className="col-span-5 space-y-4">
          {/* cost */}
          <Panel>
            <PanelHeader
              eyebrow="Section 2"
              title={
                <>
                  Cost — {fmtMoney(weekCost.money)} · <Cr v={weekCost.credits} />
                </>
              }
            />
            <div className="grid grid-cols-2 gap-x-6">
              <div>
                <Eyebrow className="mb-1">Dollars</Eyebrow>
                {weekCost.moneyRows.map((r) => (
                  <div key={r.label} className="flex justify-between gap-2 border-b border-hairline/70 py-1 text-[11.5px] last:border-b-0">
                    <span className="text-ink-2">{r.label}</span>
                    <span className="font-mono tabular-nums text-ink">{fmtMoney(r.v)}</span>
                  </div>
                ))}
              </div>
              <div>
                <Eyebrow className="mb-1">Credits (AI labor)</Eyebrow>
                {weekCost.creditRows.map((r) => (
                  <div key={r.label} className="flex justify-between gap-2 border-b border-hairline/70 py-1 text-[11.5px] last:border-b-0">
                    <span className="text-ink-2">{r.label}</span>
                    <Cr v={r.v} />
                  </div>
                ))}
                <Note className="mt-2">
                  Same ledger as dollars, same attribution model. AI ROI is automatic,
                  and it can go negative, visibly.
                </Note>
              </div>
            </div>
          </Panel>

          {/* returned */}
          <Panel>
            <PanelHeader eyebrow="Section 3" title="Returned" />
            <div className="space-y-2">
              {returned.map((r) => (
                <div key={r.line} className="border-b border-hairline/70 pb-2 last:border-b-0 last:pb-0">
                  <div className="text-[12.5px] font-medium text-ink">{r.line}</div>
                  <div className="text-[11px] text-ink-3">{r.detail}</div>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>

      {/* needs a decision */}
      <Panel className="mb-4">
        <PanelHeader
          eyebrow="Section 4"
          title="Needs a decision — 3 items"
          right={<Chip tone="warn">the only section that asks anything of you</Chip>}
        />
        <div className="space-y-3">
          {/* 4a — pruning docket */}
          <div className="rounded border border-hairline bg-plane/50 p-3.5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-semibold text-ink">{decisionsDue[0].title}</span>
                  <Chip tone="critical">below p25 · 6 weeks</Chip>
                </div>
                <p className="mt-1 max-w-2xl text-[12px] text-ink-2">
                  {p127.summary}
                </p>
              </div>
              <div className="text-right">
                <div className="font-mono text-[12px] tabular-nums text-ink-2">
                  {fmtMoney(p127.moneySpent)} spent · <Cr v={p127.creditsSpent} />
                </div>
                <div className="text-[10px] text-ink-3">of {fmtMoney(p127.moneyBudget)} · ◆{p127.creditsBudget}</div>
              </div>
            </div>

            <div className="mt-3 rounded border border-hairline bg-surface p-3">
              <Eyebrow className="mb-2">Benchmark receipts — {`280K corpus`}</Eyebrow>
              <ReceiptTable rows={p127.receipts!} />
            </div>

            <div className="mt-3 text-[12px] text-ink-2">
              <span className="font-semibold text-ink">System recommendation: </span>
              {pruneDocket.recommendation}
              <span className="ml-1 text-ink-3">{pruneDocket.thesisNote}</span>
            </div>

            {prune === "open" ? (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Btn variant="danger" onClick={() => setPrune("killed")}>
                  Kill the play — reclaim <span className="font-mono">◆14 + $9.2K</span>
                </Btn>
                <Btn onClick={() => setPrune("narrowed")}>
                  Narrow the scope — retargeting-only, $4K
                </Btn>
                <Btn onClick={() => setPrune("kept")}>Keep as-is (requires counter-thesis)</Btn>
                <Note className="ml-1">
                  “Narrow” always renders beside “kill” — queue relief must never only
                  mean “delegate more”.
                </Note>
              </div>
            ) : (
              <div
                className={cx(
                  "mt-3 rounded border px-3 py-2 text-[12.5px] font-medium",
                  prune === "killed" && "border-good bg-good-wash text-good-text",
                  prune === "narrowed" && "border-[#b7d3f6] bg-accent-faint text-accent-deep",
                  prune === "kept" && "border-[#f2d9a4] bg-warn-wash text-warn-text",
                )}
              >
                {prune === "killed" && (
                  <>
                    ✓ P-127 killed. <Cr v={14} /> returned to the Bet pool ·{" "}
                    {fmtMoney(9200)} redeployed to webinar paid promo. Pruning has
                    negative cost — this is portfolio hygiene, not an admission of
                    failure. Logged to the Ledger.
                  </>
                )}
                {prune === "narrowed" && (
                  <>
                    ✓ Scope narrowed to retargeting-only ($4K) — back inside the channel
                    thesis (POS-04). ◆10 returned to the Bet pool. Logged.
                  </>
                )}
                {prune === "kept" && (
                  <>
                    Kept. A written counter-thesis to POS-04 is now owed by Friday —
                    the docket returns at every Close until the play clears p25 or dies.
                  </>
                )}
              </div>
            )}
          </div>

          {/* 4b — bid */}
          <div className="flex items-center justify-between rounded border border-hairline bg-plane/50 p-3.5">
            <div>
              <div className="text-[13px] font-semibold text-ink">{decisionsDue[1].title}</div>
              <div className="mt-0.5 text-[12px] text-ink-2">{decisionsDue[1].body}</div>
            </div>
            <Link
              to="/plays/reengagement/bid"
              className="shrink-0 rounded border border-ink bg-ink px-3 py-1.5 text-[12px] font-medium text-surface transition-colors hover:bg-ink/80"
            >
              Open the bid →
            </Link>
          </div>

          {/* 4c — lineage batch */}
          <div className="flex items-center justify-between rounded border border-hairline bg-plane/50 p-3.5">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-semibold text-ink">
                  “{lineageBatch.prompt}”
                </span>
                {!lineageDone && <Chip tone="warn">{lineageBatch.count} provisional</Chip>}
              </div>
              <div className="mt-0.5 max-w-2xl text-[11.5px] text-ink-3">{lineageBatch.note}</div>
            </div>
            {!lineageDone ? (
              <div className="flex shrink-0 gap-2">
                <Btn variant="primary" onClick={() => setLineageDone(true)}>
                  Confirm all six
                </Btn>
                <Btn onClick={() => setLineageDone(true)}>Review individually</Btn>
              </div>
            ) : (
              <Chip tone="good">✓ six edges confirmed — one tap</Chip>
            )}
          </div>
        </div>
      </Panel>

      <Note>
        Pressure moved from ship-time (where it blocks flow) to review-time (where it's
        just information). Humans ship unattributed freely; only AI spend at scale must
        attach to a Bet.
      </Note>
    </div>
  );
}
