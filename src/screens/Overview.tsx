import { Link } from "react-router-dom";
import { company, people, quarter } from "../data/company";
import { bets } from "../data/bets";
import { creditBudget, moneyBudget } from "../data/credits";
import { stops } from "../data/walkthrough";
import { fmtMoney } from "../lib/format";
import {
  Chip,
  Eyebrow,
  Note,
  Panel,
  PanelHeader,
  ScreenHead,
} from "../components/ui";

const objects = [
  {
    name: "Position",
    def: "Durable truth, versioned & co-signed: ICP, voice, definitions, channel theses.",
    to: "/positions",
  },
  {
    name: "Bet",
    def: "Time-bound commitment: a number, an owner, money + credits, a kill condition.",
    to: "/bets/fintech-pipeline",
  },
  {
    name: "Play",
    def: "Typed execution unit with corpus-benchmarked outcome and cost ranges.",
    to: "/plays/reengagement/bid",
  },
  {
    name: "Ledger",
    def: "Append-only record: decisions, grants, credit spend, outcomes.",
    to: "/bets/fintech-pipeline",
  },
  {
    name: "Signal",
    def: "Brand clock: trend vs benchmark. No targets, no progress bars, ever.",
    to: "/positions#signal",
  },
  {
    name: "Close / Delta",
    def: "The reconciliation ritual — weekly, and continuously as a ranked diff.",
    to: "/close/weekly",
  },
];

const cast = ["maya", "jonah", "tessa", "ravi", "dana", "priya"] as const;

export default function Overview() {
  return (
    <div>
      <ScreenHead
        title="Commitments, reconciled against reality"
        lede={
          <>
            <strong>
              vNext exists so a marketer can place fewer, provable bets and hand each
              one to AI at exactly the level of trust it has earned.
            </strong>{" "}
            This prototype walks the entire Loop through one fictional customer's
            quarter — nine stops, every major mechanism, clickable end to end. Follow
            the numbered stops in order; DEMO.md carries the exact script.
          </>
        }
      />

      <div className="mb-4 grid grid-cols-12 gap-4">
        {/* customer */}
        <Panel className="col-span-5">
          <PanelHeader eyebrow="The fictional customer" title={company.legalName} />
          <p className="text-[12.5px] leading-relaxed text-ink-2">{company.oneLiner}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <Chip tone="neutral">{company.hq}</Chip>
            <Chip tone="neutral">{company.employees} employees</Chip>
            <Chip tone="neutral">{company.arr} ARR · {company.stage}</Chip>
            <Chip tone="neutral">{company.customers} customers · ACV {company.acv}</Chip>
            <Chip tone="neutral">portal since {company.portalSince}</Chip>
          </div>
          <div className="mt-3 border-t border-hairline pt-3">
            <Eyebrow className="mb-1.5">The cast</Eyebrow>
            <div className="space-y-1">
              {cast.map((id) => {
                const p = people[id];
                return (
                  <div key={id} className="flex items-center gap-2 text-[12px]">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink text-[8.5px] font-bold text-surface">
                      {p.initials}
                    </span>
                    <span className="font-medium text-ink">{p.name}</span>
                    <span className="text-ink-3">— {p.role}</span>
                    {id === "maya" && <Chip tone="accent">your persona</Chip>}
                  </div>
                );
              })}
            </div>
          </div>
        </Panel>

        {/* quarter state */}
        <Panel className="col-span-7">
          <PanelHeader
            eyebrow={`${quarter.label} · day ${quarter.dayOfQuarter} of ${quarter.days} · week ${quarter.weekJustClosed} just closed`}
            title="The quarter, at a glance"
          />
          <div className="space-y-3">
            {bets.map((b) => (
              <Link
                key={b.id}
                to={`/bets/${b.id}`}
                className="block rounded border border-hairline bg-plane/50 p-3 transition-colors hover:bg-plane"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-semibold text-ink">{b.name}</span>
                    <Chip tone={b.kind === "pipeline" ? "accent" : "neutral"}>
                      {b.kind === "pipeline" ? "pipeline · co-signed with sales" : "brand · marketing-only"}
                    </Chip>
                  </div>
                  <span className="font-mono text-[11.5px] tabular-nums text-ink-2">
                    {fmtMoney(b.money.spent)}/{fmtMoney(b.money.budget)} ·{" "}
                    <span className="text-credit">◆{b.credits.spent}/◆{b.credits.budget}</span>
                  </span>
                </div>
                <p className="mt-1 text-[12px] leading-snug text-ink-2">
                  {b.target} — pacing{" "}
                  <span className="font-mono font-medium text-ink">{b.pace.pacePct}%</span> of plan.
                </p>
              </Link>
            ))}
            <div className="flex items-center justify-between rounded border border-hairline bg-plane/50 p-3">
              <span className="text-[12px] text-ink-2">
                Q3 budgets — money and credits, side by side, always
              </span>
              <span className="font-mono text-[11.5px] tabular-nums text-ink-2">
                {fmtMoney(moneyBudget.spentToDate)}/{fmtMoney(moneyBudget.quarter)} ·{" "}
                <span className="text-credit">
                  ◆{creditBudget.spentToDate}/◆{creditBudget.quarter}
                </span>
              </span>
            </div>
          </div>
          <Note className="mt-3">
            Two active Bets is the whole skeleton — three confirmed Bets per quarter is
            enough. Roughly 95% of structure is inferred from work; the 5% that must be
            human-authored is requested only where value is already on the table.
          </Note>
        </Panel>
      </div>

      {/* object model */}
      <Panel className="mb-4">
        <PanelHeader eyebrow="The object model" title="Six objects replace campaigns, goals and status decks" />
        <div className="grid grid-cols-6 gap-2.5">
          {objects.map((o) => (
            <Link
              key={o.name}
              to={o.to}
              className="rounded border border-hairline bg-plane/40 p-2.5 transition-colors hover:bg-plane"
            >
              <div className="text-[12.5px] font-bold text-ink">{o.name}</div>
              <p className="mt-1 text-[11px] leading-snug text-ink-2">{o.def}</p>
            </Link>
          ))}
        </div>
      </Panel>

      {/* walkthrough */}
      <Panel pad={false}>
        <div className="p-4 pb-1">
          <PanelHeader
            eyebrow="Nine stops · every major mechanism"
            title="The walkthrough"
            right={
              <Link
                to="/close/retro"
                className="rounded border border-ink bg-ink px-3 py-1.5 text-[12px] font-medium text-surface transition-colors hover:bg-ink/80"
              >
                Start at stop 1 →
              </Link>
            }
          />
        </div>
        <div>
          {stops
            .filter((s) => s.n > 0)
            .map((s) => (
              <Link
                key={s.n}
                to={s.path}
                className="flex items-baseline gap-3 border-t border-hairline/70 px-4 py-2.5 transition-colors hover:bg-plane/60"
              >
                <span className="flex h-[18px] w-[18px] shrink-0 translate-y-0.5 items-center justify-center rounded-sm border border-hairline text-[10px] font-semibold text-ink-3">
                  {s.n}
                </span>
                <span className="w-44 shrink-0 text-[13px] font-semibold text-ink">{s.nav}</span>
                <span className="text-[12px] leading-snug text-ink-2">{s.proves}</span>
              </Link>
            ))}
        </div>
      </Panel>
    </div>
  );
}
