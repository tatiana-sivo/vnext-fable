import type { ReactNode } from "react";
import { Eyebrow, cx } from "./ui";
import { fmtMoney } from "../lib/format";

/*
 * The two clocks are structurally different components on purpose.
 * BusinessClock: progress bar, plan marker, target — lives on Bets only.
 * TrendStat: trend line vs corpus band, no target, no progress — Signal only.
 */

export function BusinessClock({
  actual,
  plan,
  target,
  elapsedPct,
  unit,
}: {
  actual: number;
  plan: number;
  target: number;
  elapsedPct: number;
  unit: "$" | "count";
}) {
  const f = (v: number) =>
    unit === "$" ? fmtMoney(v) : v.toLocaleString("en-US");
  const aPct = Math.min(100, (actual / target) * 100);
  const pPct = Math.min(100, (plan / target) * 100);
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between">
        <span className="text-[12px] text-ink-2">
          actual <span className="font-mono font-semibold text-ink">{f(actual)}</span>
        </span>
        <span className="text-[12px] text-ink-2">
          target <span className="font-mono font-semibold text-ink">{f(target)}</span>
        </span>
      </div>
      <div className="relative">
        <div className="h-2.5 w-full rounded-r bg-accent-wash" />
        <div
          className="absolute inset-y-0 left-0 rounded-r bg-accent"
          style={{ width: `${aPct}%` }}
        />
        {/* plan-to-date marker */}
        <div
          className="absolute -top-1 h-[18px] w-0.5 bg-ink"
          style={{ left: `${pPct}%` }}
          title={`plan-to-date ${f(plan)}`}
        />
      </div>
      <div className="mt-1 flex items-baseline justify-between">
        <span className="text-[11px] text-ink-3">
          plan-to-date {f(plan)} · pacing{" "}
          <span className="font-mono font-medium text-ink-2">
            {Math.round((actual / plan) * 100)}%
          </span>{" "}
          of plan
        </span>
        <span className="text-[11px] text-ink-3">
          {elapsedPct}% of quarter elapsed
        </span>
      </div>
      <div className="mt-1.5 h-1 w-full bg-hairline/70">
        <div
          className="h-full bg-baseline"
          style={{ width: `${elapsedPct}%` }}
        />
      </div>
    </div>
  );
}

function sparkPath(
  data: number[],
  w: number,
  h: number,
  min: number,
  max: number,
  pad: number,
) {
  const n = data.length;
  const span = max - min || 1;
  const pts = data.map((v, i) => {
    const x = pad + (i * (w - pad * 2)) / (n - 1);
    const y = pad + ((max - v) / span) * (h - pad * 2);
    return [x, y] as const;
  });
  return {
    pts,
    d: pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" "),
  };
}

export function TrendSpark({
  data,
  band,
  median,
  w = 150,
  h = 44,
}: {
  data: number[];
  band?: [number, number];
  median?: number;
  w?: number;
  h?: number;
}) {
  const pad = 5;
  const all = [...data, ...(band ?? []), ...(median != null ? [median] : [])];
  const min = Math.min(...all);
  const max = Math.max(...all);
  const span = max - min || 1;
  const yOf = (v: number) => pad + ((max - v) / span) * (h - pad * 2);
  const { pts, d } = sparkPath(data, w, h, min, max, pad);
  const [ex, ey] = pts[pts.length - 1];
  return (
    <svg width={w} height={h} className="shrink-0" aria-hidden>
      {band && (
        <rect
          x={pad}
          width={w - pad * 2}
          y={yOf(band[1])}
          height={Math.max(1, yOf(band[0]) - yOf(band[1]))}
          fill="#e1e0d9"
          opacity={0.55}
        />
      )}
      {median != null && (
        <line
          x1={pad}
          x2={w - pad}
          y1={yOf(median)}
          y2={yOf(median)}
          stroke="#c3c2b7"
          strokeWidth={1}
        />
      )}
      <path
        d={d}
        fill="none"
        stroke="#2a78d6"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={ex} cy={ey} r={4} fill="#2a78d6" stroke="#fcfcfb" strokeWidth={2} />
    </svg>
  );
}

/** A brand-clock stat: label, current value, 12-month trend vs corpus band. NO progress bar. */
export function TrendStat({
  label,
  value,
  delta,
  deltaTone = "neutral",
  sub,
  data,
  band,
  median,
}: {
  label: string;
  value: ReactNode;
  delta?: string;
  deltaTone?: "good" | "critical" | "neutral";
  sub?: string;
  data: number[];
  band?: [number, number];
  median?: number;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-hairline py-3 last:border-b-0">
      <div className="min-w-0">
        <Eyebrow className="mb-0.5">{label}</Eyebrow>
        <div className="flex items-baseline gap-2">
          <span className="text-[16px] font-semibold text-ink">{value}</span>
          {delta && (
            <span
              className={cx(
                "text-[11px] font-medium",
                deltaTone === "good" && "text-good-text",
                deltaTone === "critical" && "text-critical-text",
                deltaTone === "neutral" && "text-ink-3",
              )}
            >
              {delta}
            </span>
          )}
        </div>
        {sub && <div className="mt-0.5 text-[11px] text-ink-3">{sub}</div>}
      </div>
      <TrendSpark data={data} band={band} median={median} />
    </div>
  );
}

export function WavePlan({
  waves,
}: {
  waves: {
    n: number;
    label: string;
    size: number;
    pct: number;
    state: "sent" | "held";
    detail: string;
    flagged?: number;
  }[];
}) {
  return (
    <div>
      <div className="flex gap-[2px]">
        {waves.map((wv) => (
          <div
            key={wv.n}
            style={{ width: `${wv.pct}%` }}
            className={cx(
              "flex h-7 min-w-0 items-center justify-center rounded-sm text-[10px] font-semibold uppercase tracking-wide",
              wv.state === "sent"
                ? "bg-accent text-surface"
                : "bg-accent-wash text-accent-deep",
            )}
          >
            {wv.state === "sent" ? "sent" : "held"} · {wv.pct}%
          </div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-3 gap-4">
        {waves.map((wv) => (
          <div key={wv.n}>
            <div className="text-[11px] font-medium text-ink">
              {wv.label} · {wv.size} contacts
            </div>
            <div className="text-[10px] leading-snug text-ink-3">{wv.detail}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Small multi-series line chart with direct end labels + legend. */
export function ShareLines({
  series,
  w = 360,
  h = 110,
}: {
  series: { name: string; color: string; data: number[] }[];
  w?: number;
  h?: number;
}) {
  const pad = 6;
  const labelW = 76;
  const all = series.flatMap((s) => s.data);
  const min = Math.min(...all);
  const max = Math.max(...all);
  return (
    <div>
      <svg width={w} height={h} aria-hidden>
        {series.map((s) => {
          const { pts, d } = sparkPath(s.data, w - labelW, h, min, max, pad);
          const [ex, ey] = pts[pts.length - 1];
          return (
            <g key={s.name}>
              <path
                d={d}
                fill="none"
                stroke={s.color}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx={ex} cy={ey} r={3.5} fill={s.color} stroke="#fcfcfb" strokeWidth={2} />
              <text
                x={ex + 8}
                y={ey + 3.5}
                fontSize={10}
                fill="#52514e"
                fontFamily="system-ui, sans-serif"
              >
                {s.name} {s.data[s.data.length - 1]}%
              </text>
            </g>
          );
        })}
      </svg>
      <div className="mt-1 flex gap-4">
        {series.map((s) => (
          <span key={s.name} className="flex items-center gap-1.5 text-[11px] text-ink-2">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: s.color }}
            />
            {s.name}
          </span>
        ))}
      </div>
    </div>
  );
}
