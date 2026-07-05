import { Link, useParams } from "react-router-dom";
import { betById, playById } from "../data/bets";
import { ledgerForBet } from "../data/ledger";
import { people } from "../data/company";
import { fmtMoney } from "../lib/format";
import {
  Chip,
  Cr,
  Eyebrow,
  Note,
  Panel,
  PanelHeader,
  ScreenHead,
  Stat,
  cx,
} from "../components/ui";
import { BusinessClock } from "../components/charts";
import {
  LedgerTable,
  ReceiptTable,
  Receipts,
  SignatureRow,
  XLink,
} from "../components/objects";
import type { PlayState, Tone } from "../data/types";

const stateTone: Record<PlayState, Tone> = {
  healthy: "good",
  inline: "accent",
  underperforming: "critical",
  "pending-bid": "warn",
  active: "accent",
  paused: "warn",
};

function Meter({
  label,
  spent,
  budget,
  kind,
}: {
  label: string;
  spent: number;
  budget: number;
  kind: "money" | "credits";
}) {
  const w = Math.min(100, (spent / budget) * 100);
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-[11px] text-ink-2">{label}</span>
        <span className={cx("font-mono text-[11px] font-medium", kind === "credits" ? "text-credit" : "text-ink")}>
          {kind === "money" ? `${fmtMoney(spent)} / ${fmtMoney(budget)}` : `◆${spent} / ◆${budget}`}
        </span>
      </div>
      <div className={cx("mt-1 h-1.5 rounded-r", kind === "credits" ? "bg-credit-wash" : "bg-accent-wash")}>
        <div
          className={cx("h-full rounded-r", kind === "credits" ? "bg-credit" : "bg-accent")}
          style={{ width: `${w}%` }}
        />
      </div>
    </div>
  );
}

export default function BetDetail() {
  const { betId } = useParams();
  const bet = betById(betId === "authority" ? "authority" : "fintech-pipeline");
  const other = betById(bet.id === "authority" ? "fintech-pipeline" : "authority");
  const owner = people[bet.standing.ownerId];
  const entries = ledgerForBet(bet.id);

  return (
    <div>
      <ScreenHead
        title={bet.name}
        lede={
          <>
            <span className="font-medium text-ink">Hypothesis:</span> {bet.hypothesis}
          </>
        }
        right={
          <Link
            to={`/bets/${other.id}`}
            className="rounded border border-hairline bg-surface px-3 py-1.5 text-[12px] font-medium text-ink-2 transition-colors hover:bg-plane"
          >
            switch: {other.name} →
          </Link>
        }
      />

      <div className="mb-4 grid grid-cols-12 gap-4">
        {/* standing answer */}
        <Panel className="col-span-8">
          <PanelHeader
            eyebrow="The standing answer — computed, never hand-authored"
            title="What's true right now"
            right={<Chip tone="neutral">as of {bet.standing.asOf}</Chip>}
          />
          <blockquote className="border-l-2 border-ink pl-3">
            <p className="text-[14px] font-medium leading-relaxed text-ink">
              “{bet.standing.ownerLine}”
            </p>
            <div className="mt-1 text-[11px] text-ink-3">
              {owner.name} — owner's judgment, on record. The CMO reads this first,
              numbers second. Calibration accrues: called right or wrong, it's logged.
            </div>
          </blockquote>

          <div className="mt-4 grid grid-cols-4 gap-4 border-t border-hairline pt-3">
            <Stat
              label="Pace vs plan"
              value={`${bet.pace.pacePct}%`}
              sub={bet.pace.secondary}
            />
            <Stat
              label="Spend — money"
              value={fmtMoney(bet.money.spent)}
              sub={`of ${fmtMoney(bet.money.budget)} budget`}
            />
            <Stat
              label="Spend — credits"
              value={<span className="text-credit">◆{bet.credits.spent}</span>}
              sub={`of ◆${bet.credits.budget} budget`}
            />
            <Stat label="Next decision" value={bet.standing.nextDecision.split("—")[0]} sub={bet.standing.nextDecision.split("— ")[1]} />
          </div>

          <div className="mt-4 rounded border border-[#f2d9a4] bg-warn-wash/60 p-3">
            <div className="flex items-start gap-2">
              <span className="pt-px text-[12px] text-warn-text" aria-hidden>▲</span>
              <div className="min-w-0">
                <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-warn-text">
                  Biggest open risk — computed, unmutable
                </span>
                <p className="mt-0.5 text-[12.5px] leading-relaxed text-ink">
                  {bet.standing.risk}
                </p>
                <Receipts summary="receipts — the prosecutor's evidence">
                  <ReceiptTable rows={bet.standing.riskReceipts} />
                </Receipts>
              </div>
            </div>
          </div>
        </Panel>

        {/* bet terms */}
        <Panel className="col-span-4">
          <PanelHeader eyebrow="The commitment" title="Bet terms" />
          <div className="space-y-3">
            <div>
              <Eyebrow className="mb-1">Target</Eyebrow>
              <p className="text-[12.5px] font-medium leading-snug text-ink">{bet.target}</p>
              <div className="mt-0.5 text-[11px] text-ink-3">{bet.window}</div>
            </div>
            <div>
              <Eyebrow className="mb-1">Falsification condition</Eyebrow>
              <p className="text-[12px] leading-snug text-ink-2">{bet.falsification}</p>
              <Chip tone="good" className="mt-1.5">✓ {bet.checkpoint}</Chip>
            </div>
            <div>
              <Eyebrow className="mb-1.5">Signatures</Eyebrow>
              <SignatureRow signatures={bet.signatures} />
              {bet.kind === "brand" && (
                <Note className="mt-1.5">
                  Marketing-only Bet — no sales co-signature required; nothing here
                  enters a sales queue.
                </Note>
              )}
            </div>
            <div className="space-y-2.5 border-t border-hairline pt-3">
              <Meter label="Money" spent={bet.money.spent} budget={bet.money.budget} kind="money" />
              <Meter label="Credits" spent={bet.credits.spent} budget={bet.credits.budget} kind="credits" />
              <Note>
                Credits are budgeted per Bet with auto-stop — allocated like media,
                not consumed like a utility.
              </Note>
            </div>
          </div>
        </Panel>
      </div>

      {/* business clock */}
      <Panel className="mb-4">
        <PanelHeader
          eyebrow="Business clock — lives on Bets only"
          title="Pace vs plan"
          right={
            <Chip tone="accent" title="Progress bars and targets exist only on this clock">
              progress bar · target · read weekly
            </Chip>
          }
        />
        <BusinessClock
          actual={bet.pace.actual}
          plan={bet.pace.planToDate}
          target={bet.targetValue}
          elapsedPct={bet.pace.elapsedPct}
          unit={bet.targetUnit === "$" ? "$" : "count"}
        />
        <div className="mt-3 flex items-center justify-between border-t border-hairline pt-2.5">
          <span className="text-[12px] text-ink-2">
            Forecast at current pace:{" "}
            <span className="font-mono font-medium text-ink">
              {bet.targetUnit === "$"
                ? `${fmtMoney(bet.pace.forecast[0])}–${fmtMoney(bet.pace.forecast[1])}`
                : `${bet.pace.forecast[0]}–${bet.pace.forecast[1]}`}
            </span>
          </span>
          <span className="text-[12px] text-ink-3">
            {bet.brandClockNote?.split(".")[0]}.{" "}
            <XLink to="/positions#signal">brand clock</XLink>
          </span>
        </div>
      </Panel>

      {/* plays */}
      <div className="mb-4 grid grid-cols-2 gap-4">
        {bet.playIds.map((pid) => {
          const p = playById(pid);
          return (
            <Panel key={p.id}>
              <PanelHeader
                eyebrow={`${p.code} · ${p.type}`}
                title={p.name}
                right={<Chip tone={stateTone[p.state]}>{p.stateLabel}</Chip>}
              />
              <p className="text-[12px] leading-relaxed text-ink-2">{p.summary}</p>
              <div className="mt-2.5 flex items-center gap-4 border-t border-hairline pt-2.5 text-[11.5px] text-ink-2">
                <span>
                  audience: <span className="text-ink">{p.audience}</span>
                </span>
              </div>
              <div className="mt-1.5 flex items-center justify-between text-[11.5px]">
                <span className="font-mono tabular-nums text-ink-2">
                  {fmtMoney(p.moneySpent)} / {fmtMoney(p.moneyBudget)} · <Cr v={p.creditsSpent} />
                  <span className="text-ink-3">/{p.creditsBudget}</span>
                </span>
                {p.lane && <Chip tone="credit">{p.lane}</Chip>}
              </div>
              {p.receipts && (
                <Receipts summary="benchmark receipts">
                  <ReceiptTable rows={p.receipts} />
                </Receipts>
              )}
              {p.id === "reengagement" && (
                <div className="mt-2">
                  <XLink to="/plays/reengagement/bid">open the bid</XLink>
                </div>
              )}
              {p.id === "cfo-linkedin" && (
                <div className="mt-2">
                  <XLink to="/close/weekly">pruning docket at the Close</XLink>
                </div>
              )}
            </Panel>
          );
        })}
      </div>

      {/* ledger */}
      <Panel pad={false}>
        <div className="p-4 pb-2">
          <PanelHeader
            eyebrow="Append-only · delegation grants, credit spend, outcomes, decisions"
            title={`Ledger — ${bet.name}`}
            right={<Chip tone="neutral">{entries.length} entries</Chip>}
          />
        </div>
        <div className="px-4 pb-4">
          <LedgerTable entries={entries} />
        </div>
      </Panel>
    </div>
  );
}
