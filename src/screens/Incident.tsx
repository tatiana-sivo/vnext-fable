import {
  dealAlerts,
  incidentCredits,
  incidentStatus,
  positionDiff,
  rootCauseChain,
  timeline,
  trustPhysics,
  waves,
} from "../data/incident";
import {
  Chip,
  Eyebrow,
  Note,
  Panel,
  PanelHeader,
  ScreenHead,
  cx,
} from "../components/ui";
import { WavePlan } from "../components/charts";
import { DiffBlock, SlackMirror, XLink } from "../components/objects";

const toneDot = {
  neutral: "bg-baseline",
  critical: "bg-critical",
  good: "bg-good",
} as const;

export default function Incident() {
  return (
    <div>
      <ScreenHead
        title="Undo in action — the wrong-audience catch"
        lede={
          <>
            You can't unsend email. But you can structure sends so mistakes are
            catchable and bounded — waves, holds, tripwires, signed before anything
            ran. This is P-134's wave 1 hitting two mid-deal contacts on Thursday
            morning, contained in 23 minutes, root-caused to a stale definition, and
            closed with a one-line fix on the Position.
          </>
        }
      />

      {/* status */}
      <Panel className="mb-4 border-good/60 bg-good-wash/30">
        <div className="flex items-center gap-3">
          <Chip tone="good" className="text-[12px]">■ {incidentStatus.state}</Chip>
          <span className="text-[13px] font-medium text-ink">{incidentStatus.line}</span>
        </div>
      </Panel>

      {/* wave plan */}
      <Panel className="mb-4">
        <PanelHeader
          eyebrow="The wave plan — signed in the bid, now doing its job"
          title="400 contacts, released in waves"
          right={<Chip tone="critical">▲ 2 of 40 flagged mid-deal</Chip>}
        />
        <WavePlan waves={waves} />
        <Note className="mt-3 border-t border-hairline pt-2.5">
          Waves 2–3 were still inside their 24h holds when the tripwire fired — 360 of
          400 contacts saw nothing. Undo inside a hold is a true undo: zero recipient
          impact, credits refund.
        </Note>
      </Panel>

      <div className="mb-4 grid grid-cols-12 gap-4">
        {/* timeline */}
        <Panel className="col-span-7">
          <PanelHeader eyebrow="Thu Aug 27 → Mon Aug 31" title="Containment timeline" />
          <div className="space-y-0">
            {timeline.map((t, i) => (
              <div key={i} className="relative flex gap-3 pb-3.5 last:pb-0">
                {i < timeline.length - 1 && (
                  <span className="absolute left-[3.5px] top-3 h-full w-px bg-hairline" aria-hidden />
                )}
                <span
                  className={cx("relative mt-1.5 h-2 w-2 shrink-0 rounded-full ring-2 ring-surface", toneDot[t.tone])}
                  aria-hidden
                />
                <div>
                  <span className="font-mono text-[11px] font-semibold tabular-nums text-ink-3">
                    {t.t}
                  </span>
                  <p className="mt-0.5 text-[12.5px] leading-relaxed text-ink-2">{t.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        {/* deal-owner alerts */}
        <div className="col-span-5 space-y-3">
          <Eyebrow>Context alerts — the escaped contacts' deal owners</Eyebrow>
          {dealAlerts.map((a) => (
            <SlackMirror
              key={a.owner}
              channel={`DM · ${a.owner}`}
              time="Thu 09:31"
              header={`Context: your deal ${a.company}`}
              buttons={["View message", "Mark handled"]}
              footer="Suppression already applied — this alert asks for awareness, not action."
            >
              <div className="font-medium text-ink">{a.contact}</div>
              <p>{a.body}</p>
            </SlackMirror>
          ))}
        </div>
      </div>

      {/* root cause */}
      <Panel className="mb-4">
        <PanelHeader
          eyebrow="Remediation always ends in one line tightened on one artifact"
          title="Root cause → one-line fix"
          right={<XLink to="/positions#mql-sql">the amended contract</XLink>}
        />
        <div className="mb-3 flex flex-wrap items-center gap-1.5">
          {rootCauseChain.map((c, i) => (
            <span key={c} className="flex items-center gap-1.5">
              <span
                className={cx(
                  "rounded border px-2 py-1 text-[11.5px] leading-snug",
                  i === rootCauseChain.length - 1
                    ? "border-good bg-good-wash font-medium text-good-text"
                    : "border-hairline bg-plane/60 text-ink-2",
                )}
              >
                {c}
              </span>
              {i < rootCauseChain.length - 1 && (
                <span className="text-ink-3" aria-hidden>→</span>
              )}
            </span>
          ))}
        </div>
        <DiffBlock
          artifact={positionDiff.artifact}
          context={positionDiff.context}
          added={positionDiff.added}
        />
      </Panel>

      {/* trust physics */}
      <div className="grid grid-cols-12 gap-4">
        <Panel className="col-span-7">
          <PanelHeader
            eyebrow="Trust is physics, not a toggle"
            title={trustPhysics.lane}
          />
          <table className="w-full border-collapse text-[12.5px]">
            <thead>
              <tr className="border-b border-hairline text-left">
                <th className="py-1.5 pr-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-3">
                  Lane parameter
                </th>
                <th className="py-1.5 pr-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-3">
                  Before
                </th>
                <th className="py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-3">
                  After the incident
                </th>
              </tr>
            </thead>
            <tbody>
              {trustPhysics.rows.map((r) => (
                <tr key={r.k} className="border-b border-hairline/70 last:border-b-0">
                  <td className="py-2 pr-3 text-ink-2">{r.k}</td>
                  <td className="py-2 pr-3 font-mono tabular-nums text-ink-3">{r.before}</td>
                  <td
                    className={cx(
                      "py-2 font-mono tabular-nums font-medium",
                      r.after === "unchanged" ? "text-ink-3" : "text-warn-text",
                    )}
                  >
                    {r.after}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-2.5 text-[12px] leading-relaxed text-ink-2">{trustPhysics.restore}</p>
        </Panel>

        <div className="col-span-5 space-y-4">
          <Panel>
            <Eyebrow className="mb-1.5">Pattern check</Eyebrow>
            <p className="text-[12.5px] leading-relaxed text-ink-2">{trustPhysics.echo}</p>
          </Panel>
          <Panel className="border-[#d8d1f0] bg-credit-wash/40">
            <Eyebrow className="mb-1.5">The meter during all of this</Eyebrow>
            <p className="text-[12.5px] leading-relaxed text-ink-2">{incidentCredits}</p>
          </Panel>
        </div>
      </div>
    </div>
  );
}
