import { narrativeCase, promotionCase } from "../data/prosecutor";
import { betById } from "../data/bets";
import {
  Chip,
  Note,
  Panel,
  PanelHeader,
  ScreenHead,
} from "../components/ui";
import { ReceiptTable, Receipts, XLink } from "../components/objects";

export default function Prosecutor() {
  const fintech = betById("fintech-pipeline");

  return (
    <div>
      <ScreenHead
        title="The prosecutor lives in the artifacts"
        lede={
          <>
            Not a notification channel you can mute — an adversarial pass embedded in
            three things you already touch. Mutes exist only for the interactive tier,
            are scoped to flag classes, and are logged. High dismiss rates lower a flag
            class's volume automatically: mute-worthiness is treated as the
            prosecutor's quality bug, not your attitude problem.
          </>
        }
      />

      {/* A — risk line */}
      <Panel className="mb-4">
        <PanelHeader
          eyebrow="Placement A · every Bet's standing answer"
          title="The risk line you can't remove"
          right={<XLink to="/bets/fintech-pipeline">lives on the Bet</XLink>}
        />
        <div className="rounded border border-[#f2d9a4] bg-warn-wash/60 p-3">
          <div className="flex items-start gap-2">
            <span className="pt-px text-[12px] text-warn-text" aria-hidden>▲</span>
            <div className="min-w-0">
              <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-warn-text">
                Biggest open risk — {fintech.name}
              </span>
              <p className="mt-0.5 text-[12.5px] leading-relaxed text-ink">{fintech.standing.risk}</p>
              <Receipts summary="receipts">
                <ReceiptTable rows={fintech.standing.riskReceipts} />
              </Receipts>
            </div>
          </div>
        </div>
        <Note className="mt-2">
          Computed from the Ledger and telemetry, with receipts. Forward the standing
          answer to the CMO and the risk line travels with it — you can't mute the
          status mechanism itself.
        </Note>
      </Panel>

      {/* B — narrative compiler */}
      <Panel className="mb-4">
        <PanelHeader
          eyebrow={`Placement B · ${narrativeCase.where}`}
          title="Your own report, cross-examined before you read it"
        />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Chip tone="neutral" className="mb-2">draft claim</Chip>
            <p className="text-[13.5px] font-medium leading-relaxed text-ink">
              “{narrativeCase.claim}”
            </p>
            <div className="mt-1 text-[11px] text-ink-3">{narrativeCase.claimAuthor}</div>
            <div className="mt-3 rounded border border-[#f2d9a4] bg-warn-wash p-3">
              <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-warn-text">
                Counterevidence — attached automatically
              </span>
              <ul className="mt-1.5 space-y-1.5">
                {narrativeCase.counter.map((c) => (
                  <li key={c} className="flex gap-2 text-[12px] leading-snug text-ink">
                    <span className="text-warn-text" aria-hidden>—</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <Chip tone="good" className="mb-2">what actually ships</Chip>
            <div className="rounded border border-hairline bg-plane/60 p-3 text-[12.5px] leading-relaxed text-ink-2">
              {narrativeCase.shippedForm}
            </div>
            <Note className="mt-2">{narrativeCase.rule}</Note>
            <Note className="mt-2">
              The conflict of interest is structural — the party selling credits also
              proves whether credits paid. The only manageable posture is radical
              willingness to show negative findings. This footnote is that posture.
            </Note>
          </div>
        </div>
      </Panel>

      {/* C — promotion gate */}
      <Panel>
        <PanelHeader
          eyebrow={`Placement C · ${promotionCase.where}`}
          title="A brand metric argues for a target. The AI argues back."
          right={<XLink to="/positions#signal">brand clock</XLink>}
        />
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4">
            <div className="rounded border border-hairline bg-plane/60 p-3">
              <Chip tone="accent" className="mb-2">the application</Chip>
              <div className="text-[13px] font-semibold text-ink">{promotionCase.applicant}</div>
              <div className="mt-0.5 font-mono text-[12px] text-ink-2">{promotionCase.movement}</div>
              <p className="mt-2 text-[12px] leading-snug text-ink-2">
                Request: {promotionCase.request}
              </p>
            </div>
          </div>
          <div className="col-span-8">
            <Chip tone="serious" className="mb-2">the argument against — computed, not claimed</Chip>
            <ul className="space-y-1.5">
              {promotionCase.argued.map((a) => (
                <li key={a} className="flex gap-2 text-[12.5px] leading-snug text-ink-2">
                  <span className="text-serious-text" aria-hidden>✕</span>
                  {a}
                </li>
              ))}
            </ul>
            <div className="mt-3 flex items-center justify-between rounded border border-[#f0bcbc] bg-critical-wash/70 px-3 py-2">
              <span className="text-[12.5px] font-semibold text-critical-text">
                {promotionCase.verdict}
              </span>
              <span className="font-mono text-[11px] text-ink-3">{promotionCase.logged}</span>
            </div>
            <Note className="mt-2">{promotionCase.note}</Note>
          </div>
        </div>
      </Panel>
    </div>
  );
}
