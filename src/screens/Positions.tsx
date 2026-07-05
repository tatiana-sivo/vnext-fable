import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  icpDrift,
  mqlTelemetry,
  positions,
  sameness,
} from "../data/positions";
import { monthly } from "../data/portal";
import { winMix } from "../data/portal";
import { bench } from "../data/benchmarks";
import {
  Chip,
  Eyebrow,
  Note,
  Panel,
  PanelHeader,
  ScreenHead,
  cx,
} from "../components/ui";
import { ShareLines, TrendStat } from "../components/charts";
import { SignatureRow } from "../components/objects";

function last<T>(a: T[]): T {
  return a[a.length - 1];
}

export default function Positions() {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView({ block: "start" });
    }
  }, [hash]);

  return (
    <div>
      <ScreenHead
        title="Positions — the durable truths"
        lede={
          <>
            Versioned, co-signed commitments that outlive any quarter: who we sell to,
            how we sound, what counts as a lead, which channels we believe in. Every
            Play binds to them; every AI draft is checked against them; other tools
            subscribe to them over MCP and read <em>from</em> the portal. Changes are
            slow, deliberate, and carry a decision record.
          </>
        }
      />

      {/* brand clock */}
      <Panel className="mb-5 scroll-mt-16" id="signal">
        <PanelHeader
          eyebrow="Signal — the brand clock · read quarterly"
          title="Portfolio brand health"
          right={
            <Chip tone="neutral" title="Structurally enforced: this surface cannot render a progress bar">
              trend vs corpus band · no targets · no progress bars
            </Chip>
          }
        />
        <div className="grid grid-cols-2 gap-x-10">
          <div>
            <TrendStat
              label="Branded search — indexed"
              value={last(monthly.brandedSearchIdx)}
              delta="+31% Jul→Aug"
              deltaTone="neutral"
              sub="Sought a target this week; promotion DENIED — confounded (see Prosecutor)"
              data={monthly.brandedSearchIdx}
            />
            <TrendStat
              label="Direct traffic share"
              value={`${last(monthly.directTrafficShare)}%`}
              delta="+1.6 pts / 12mo"
              deltaTone="good"
              sub="Corpus band: p25–p75 for cohort"
              data={monthly.directTrafficShare}
              band={[7.4, 10.6]}
            />
            <TrendStat
              label="Content sameness (lower = distinct)"
              value={last(monthly.samenessScore).toFixed(2)}
              delta="rising all year"
              deltaTone="critical"
              sub={`Corpus median ${bench.sameness.p50} — drifting toward the category's converged voice`}
              data={monthly.samenessScore}
              median={bench.sameness.p50}
            />
          </div>
          <div>
            <Eyebrow className="mb-2">Share of category search — 12 months</Eyebrow>
            <ShareLines
              series={[
                { name: "Plumbline", color: "#2a78d6", data: monthly.shareOfSearch.plumbline },
                { name: "Certifly", color: "#1baf7a", data: monthly.shareOfSearch.certifly },
                { name: "Auditbase", color: "#eda100", data: monthly.shareOfSearch.auditbase },
              ]}
            />
            <Note className="mt-3">
              The cadence encodes the physics: you can't anxiously refresh a number
              that renders quarterly. A brand metric earns a business-clock target only
              through the promotion gate — and the AI argues against weak links.
            </Note>
          </div>
        </div>
      </Panel>

      {/* positions */}
      <div className="space-y-5">
        {positions.map((p) => (
          <Panel key={p.id} className="scroll-mt-16" id={p.id}>
            <PanelHeader
              eyebrow={`${p.code} · ${p.kind} · ${p.version} · ratified ${p.ratified}`}
              title={p.name}
              right={
                p.id === "promotions" ? (
                  <Chip tone="warn">◈ legal gate — permanent L0</Chip>
                ) : undefined
              }
            />
            <div className="grid grid-cols-12 gap-5">
              <div className="col-span-8">
                <ul className="space-y-1.5">
                  {p.body.map((line) => (
                    <li
                      key={line}
                      className={cx(
                        "flex gap-2 text-[12.5px] leading-relaxed",
                        line.startsWith("AMENDED")
                          ? "rounded bg-good-wash px-2 py-1 font-medium text-good-text"
                          : "text-ink-2",
                      )}
                    >
                      {!line.startsWith("AMENDED") && (
                        <span className="text-ink-3" aria-hidden>·</span>
                      )}
                      {line.startsWith("AMENDED") ? `+ ${line}` : line}
                    </li>
                  ))}
                </ul>

                {/* ICP drift */}
                {p.id === "icp" && (
                  <div className="mt-4 rounded border border-[#f2d9a4] bg-warn-wash/50 p-3.5">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-warn-text">
                      Drift detected · {icpDrift.window}
                    </span>
                    <p className="mt-1 text-[13px] font-medium leading-snug text-ink">
                      {icpDrift.headline}
                    </p>
                    <table className="mt-2.5 w-full border-collapse text-[12px]">
                      <thead>
                        <tr className="border-b border-hairline text-left">
                          {["Segment", "Stated ICP weight", "Actual share of wins", "Gap"].map((h) => (
                            <th key={h} className="py-1 pr-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-3">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {winMix.rows.map((r) => {
                          const gap = r.sharePct - r.icpWeightPct;
                          return (
                            <tr key={r.segment} className="border-b border-hairline/60 last:border-b-0">
                              <td className="py-1 pr-3 text-ink">{r.segment}</td>
                              <td className="py-1 pr-3 font-mono tabular-nums text-ink-2">{r.icpWeightPct}%</td>
                              <td className="py-1 pr-3 font-mono tabular-nums text-ink-2">
                                {r.sharePct}% ({r.wins} wins)
                              </td>
                              <td
                                className={cx(
                                  "py-1 font-mono tabular-nums font-medium",
                                  gap >= 15 ? "text-warn-text" : gap <= -10 ? "text-serious-text" : "text-ink-3",
                                )}
                              >
                                {gap > 0 ? "+" : ""}
                                {gap} pts
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {winMix.fintechVsBlended.map((f) => (
                        <Chip key={f.metric} tone="neutral" className="font-mono">
                          fintech {f.metric.toLowerCase()}: {f.fintech} vs {f.blended} ({f.delta})
                        </Chip>
                      ))}
                    </div>
                    <p className="mt-2.5 text-[12px] leading-snug text-ink-2">
                      <span className="font-semibold text-ink">Proposal (ghost — nothing changes until ratified): </span>
                      {icpDrift.proposal}
                    </p>
                    <div className="mt-1 text-[11px] text-ink-3">Decision: {icpDrift.decisionDate}</div>
                  </div>
                )}

                {/* voice sameness */}
                {p.id === "voice" && (
                  <div className="mt-4 rounded border border-[#f2d9a4] bg-warn-wash/50 p-3.5">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-warn-text">
                      Critic flag · {sameness.flaggedDraft}
                    </span>
                    <p className="mt-1 text-[13px] font-medium leading-snug text-ink">{sameness.line}</p>
                    <div className="mt-2 flex items-baseline gap-4 font-mono text-[12px]">
                      <span className="text-ink">
                        sameness <span className="text-[15px] font-bold">{sameness.score}</span>
                      </span>
                      <span className="text-ink-3">corpus median {sameness.corpusMedian}</span>
                    </div>
                    <div className="mt-2">
                      <Eyebrow className="mb-1">Your distinctive markers, missing from this draft</Eyebrow>
                      <ul className="space-y-1">
                        {sameness.missing.map((m) => (
                          <li key={m} className="flex gap-2 text-[12px] text-ink-2">
                            <span className="text-warn-text" aria-hidden>—</span>
                            {m}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Note className="mt-2">{sameness.note}</Note>
                  </div>
                )}

                {/* MQL telemetry */}
                {p.id === "mql-sql" && (
                  <div className="mt-4 rounded border border-hairline bg-plane/60 p-3.5">
                    <Eyebrow className="mb-2">
                      Rejection telemetry · {mqlTelemetry.window} — the contract meters itself
                    </Eyebrow>
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <div className="font-mono text-[16px] font-bold text-ink">{mqlTelemetry.sent}</div>
                        <div className="text-[11px] text-ink-3">MQLs handed to sales</div>
                      </div>
                      <div>
                        <div className="font-mono text-[16px] font-bold text-ink">
                          {mqlTelemetry.slaTouchPct}%
                        </div>
                        <div className="text-[11px] text-ink-3">
                          touched within 24h SLA · corpus p50 {mqlTelemetry.corpusSlaPct}%
                        </div>
                      </div>
                      <div>
                        <div className="font-mono text-[16px] font-bold text-ink">
                          {mqlTelemetry.acceptancePct}%
                        </div>
                        <div className="text-[11px] text-ink-3">
                          accepted ({mqlTelemetry.accepted} of {mqlTelemetry.workedToDisposition} worked)
                        </div>
                      </div>
                      <div>
                        <div className="font-mono text-[16px] font-bold text-critical-text">
                          {mqlTelemetry.fintechAcceptancePct}%
                        </div>
                        <div className="text-[11px] text-ink-3">fintech acceptance — the Bet's open risk</div>
                      </div>
                    </div>
                    <p className="mt-2.5 border-t border-hairline pt-2.5 text-[12px] leading-snug text-ink-2">
                      Top rejection reason: <span className="font-semibold text-ink">“{mqlTelemetry.topReason.reason}”</span>{" "}
                      — {mqlTelemetry.topReason.count} of {mqlTelemetry.rejected} rejections ({mqlTelemetry.topReason.sharePct}%).{" "}
                      {mqlTelemetry.concentration}
                    </p>
                    <Note className="mt-1.5">
                      Both sides see identical telemetry — the contract is the shared
                      instrument, so MQL fights become definition edits, not attribution
                      arguments. The v4.1 amendment above came from exactly that path.
                    </Note>
                  </div>
                )}
              </div>

              {/* meta column */}
              <div className="col-span-4 space-y-3">
                <div>
                  <Eyebrow className="mb-1.5">Signatures — the co-sign mechanic</Eyebrow>
                  <div className="space-y-1">
                    <SignatureRow signatures={p.signatures} />
                  </div>
                </div>
                <div>
                  <Eyebrow className="mb-1.5">Subscribed surfaces (MCP — they read from here)</Eyebrow>
                  <div className="flex flex-wrap gap-1.5">
                    {p.subscribers.map((s) => (
                      <Chip key={s} tone="neutral">{s}</Chip>
                    ))}
                  </div>
                </div>
                <div>
                  <Eyebrow className="mb-1.5">Version history — decision records</Eyebrow>
                  <div className="space-y-1">
                    {p.versions.map((v) => (
                      <div
                        key={v.v}
                        className={cx(
                          "flex gap-2 rounded px-1.5 py-1 text-[11.5px] leading-snug",
                          v.isAmendment ? "bg-good-wash text-good-text" : "text-ink-2",
                        )}
                      >
                        <span className="w-8 shrink-0 font-mono font-semibold">{v.v}</span>
                        <span className="w-24 shrink-0 font-mono text-ink-3">{v.date}</span>
                        <span>{v.note}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}
