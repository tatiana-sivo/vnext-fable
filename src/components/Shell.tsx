import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { stops, stopForPath } from "../data/walkthrough";
import { company, moments, people } from "../data/company";
import { creditBudget, moneyBudget } from "../data/credits";
import { fmtMoney } from "../lib/format";
import { Chip, Eyebrow, cx } from "./ui";

function CreditMeter({ spent }: { spent: number }) {
  const pctv = (spent / creditBudget.quarter) * 100;
  return (
    <div className="flex items-center gap-2" title="Q3 credit budget — credits meter AI labor">
      <span className="font-mono text-[12px] font-semibold text-credit">
        ◆{spent}
        <span className="font-normal text-ink-3"> / {creditBudget.quarter}</span>
      </span>
      <div className="h-1.5 w-20 rounded-r bg-credit-wash">
        <div className="h-full rounded-r bg-credit" style={{ width: `${pctv}%` }} />
      </div>
    </div>
  );
}

export default function Shell() {
  const { pathname } = useLocation();
  const stop = stopForPath(pathname);
  const moment = moments[stop.momentKey];
  const prev = stops.find((s) => s.n === stop.n - 1);
  const next = stops.find((s) => s.n === stop.n + 1);

  return (
    <div className="flex min-h-screen">
      {/* ---- sidebar ---- */}
      <aside className="sticky top-0 flex h-screen w-[230px] shrink-0 flex-col border-r border-hairline bg-surface">
        <div className="border-b border-hairline px-4 py-4">
          <div className="flex items-baseline gap-1.5">
            <span className="text-credit" aria-hidden>◆</span>
            <span className="text-[15px] font-bold tracking-tight text-ink">vNext</span>
          </div>
          <div className="mt-0.5 text-[10px] text-ink-3">
            clean-room concept · working prototype
          </div>
          <div className="mt-2 text-[11px] font-medium text-ink-2">
            {company.name} — {company.arr} ARR
          </div>
          <div className="text-[10px] leading-snug text-ink-3">
            compliance automation · {company.employees} people
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto px-2 py-3">
          <Eyebrow className="px-2 pb-2">The walkthrough</Eyebrow>
          {stops.map((s) => (
            <NavLink
              key={s.path}
              to={s.path}
              end={s.path === "/"}
              className={() => {
                const active = stop.path === s.path;
                return cx(
                  "mb-px flex items-center gap-2.5 rounded px-2 py-[7px] text-[12.5px] transition-colors",
                  active
                    ? "bg-plane font-semibold text-ink"
                    : "text-ink-2 hover:bg-plane/70 hover:text-ink",
                );
              }}
            >
              <span
                className={cx(
                  "flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-sm border text-[10px] font-semibold",
                  stop.path === s.path
                    ? "border-ink bg-ink text-surface"
                    : "border-hairline text-ink-3",
                )}
              >
                {s.n}
              </span>
              {s.nav}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-hairline px-4 py-3">
          <div className="text-[10px] leading-relaxed text-ink-3">
            All companies, people and numbers are fictional. Benchmarks reference
            the concept's 280K-portal corpus. See <span className="font-mono">DEMO.md</span> for
            the click path.
          </div>
        </div>
      </aside>

      {/* ---- main ---- */}
      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-10 border-b border-hairline bg-plane/95 backdrop-blur-sm">
          <div className="mx-auto flex max-w-[1060px] items-center justify-between px-8 py-2.5">
            <div className="flex items-center gap-3">
              <Eyebrow>
                Stop {stop.n} of 9 — {stop.title}
              </Eyebrow>
              <Chip tone="neutral" title="The moment in the demo timeline this screen renders">
                {moment.date}
                {moment.note ? ` · ${moment.note}` : ""}
              </Chip>
            </div>
            <div className="flex items-center gap-4">
              <CreditMeter spent={moment.creditsSpent} />
              <span
                className="font-mono text-[12px] text-ink-2"
                title="Q3 program dollars — spend to date / budget"
              >
                {fmtMoney(moment.moneySpent)}
                <span className="text-ink-3"> / {fmtMoney(moneyBudget.quarter)}</span>
              </span>
              <span
                className="flex items-center gap-1.5 text-[12px] text-ink-2"
                title={people.maya.role}
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ink text-[9px] font-bold text-surface">
                  {people.maya.initials}
                </span>
                {people.maya.name}
              </span>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1060px] px-8 py-6">
          <Outlet />

          {/* ---- walkthrough footer ---- */}
          <footer className="mt-10 rounded-md border border-hairline bg-surface p-4">
            <div className="flex items-start justify-between gap-6">
              <div className="max-w-2xl">
                <Eyebrow className="mb-1">What this stop shows</Eyebrow>
                <p className="text-[12.5px] leading-relaxed text-ink-2">{stop.proves}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                {prev && (
                  <Link
                    to={prev.path}
                    className="rounded border border-hairline bg-surface px-3 py-1.5 text-[12px] font-medium text-ink transition-colors hover:bg-plane"
                  >
                    ← {prev.n}. {prev.nav}
                  </Link>
                )}
                {next && (
                  <Link
                    to={next.path}
                    className="rounded border border-ink bg-ink px-3 py-1.5 text-[12px] font-medium text-surface transition-colors hover:bg-ink/80"
                  >
                    {next.n}. {next.nav} →
                  </Link>
                )}
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
