import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { BenchmarkRow, LedgerEntry, Signature, Tone } from "../data/types";
import { people } from "../data/company";
import { Chip, Cr, Note, cx } from "./ui";

/* ---------- signatures ---------- */

const sigState: Record<
  Signature["state"],
  { tone: Tone; glyph: string; label: string }
> = {
  signed: { tone: "good", glyph: "✓", label: "signed" },
  pending: { tone: "accent", glyph: "…", label: "awaiting signature" },
  "gate-pending": { tone: "warn", glyph: "◈", label: "gate pending" },
  notified: { tone: "neutral", glyph: "→", label: "notified" },
};

export function SignatureRow({ signatures }: { signatures: Signature[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {signatures.map((s) => {
        const st = sigState[s.state];
        const p = people[s.personId];
        return (
          <Chip key={s.personId + s.role} tone={st.tone} title={s.role}>
            <span aria-hidden>{st.glyph}</span>
            {p.name}
            <span className="font-normal opacity-75">
              · {s.role}
              {s.date ? ` · ${s.date}` : ""}
            </span>
          </Chip>
        );
      })}
    </div>
  );
}

/* ---------- benchmark receipts ---------- */

function pTone(p?: number): string {
  if (p == null) return "text-ink-2";
  if (p >= 60) return "text-good-text";
  if (p >= 40) return "text-ink-2";
  if (p >= 25) return "text-serious-text";
  return "text-critical-text";
}

export function ReceiptTable({ rows }: { rows: BenchmarkRow[] }) {
  return (
    <table className="w-full border-collapse text-[12px]">
      <thead>
        <tr className="border-b border-hairline text-left">
          <th className="py-1.5 pr-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-3">
            Metric
          </th>
          <th className="py-1.5 pr-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-3">
            Yours
          </th>
          <th className="py-1.5 pr-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-3">
            280K corpus
          </th>
          <th className="py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-3">
            Pctile
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.metric} className="border-b border-hairline/70 align-top last:border-b-0">
            <td className="py-1.5 pr-3 text-ink-2">
              {r.metric}
              {r.note && <div className="text-[10px] text-ink-3">{r.note}</div>}
            </td>
            <td className="py-1.5 pr-3 font-mono tabular-nums font-medium text-ink">
              {r.yours}
            </td>
            <td className="py-1.5 pr-3 font-mono tabular-nums text-ink-2">{r.corpus}</td>
            <td className={cx("py-1.5 font-mono tabular-nums font-medium", pTone(r.percentile))}>
              {r.percentile != null ? `p${r.percentile}` : "—"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* ---------- expandable receipts ---------- */

export function Receipts({
  summary = "receipts",
  children,
}: {
  summary?: string;
  children: ReactNode;
}) {
  return (
    <details className="group mt-2">
      <summary className="cursor-pointer list-none text-[11px] font-medium text-accent-deep hover:underline">
        <span className="group-open:hidden">▸ {summary}</span>
        <span className="hidden group-open:inline">▾ {summary}</span>
      </summary>
      <div className="mt-2 rounded border border-hairline bg-plane/60 p-3">{children}</div>
    </details>
  );
}

/* ---------- ledger ---------- */

const kindTone: Record<LedgerEntry["kind"], { tone: Tone; label: string }> = {
  grant: { tone: "accent", label: "grant" },
  spend: { tone: "credit", label: "spend" },
  outcome: { tone: "good", label: "outcome" },
  decision: { tone: "neutral", label: "decision" },
  signature: { tone: "accent", label: "signature" },
  gate: { tone: "warn", label: "gate" },
  incident: { tone: "critical", label: "incident" },
  amendment: { tone: "good", label: "amendment" },
  "change-order": { tone: "warn", label: "change order" },
  "promotion-gate": { tone: "warn", label: "promotion gate" },
};

export function LedgerTable({
  entries,
  highlight,
}: {
  entries: LedgerEntry[];
  highlight?: string[];
}) {
  return (
    <table className="w-full border-collapse text-[12px]">
      <tbody>
        {entries.map((e) => (
          <tr
            key={e.id}
            className={cx(
              "border-b border-hairline/70 align-top last:border-b-0",
              highlight?.includes(e.id) && "bg-warn-wash/40",
            )}
          >
            <td className="whitespace-nowrap py-1.5 pr-3 font-mono text-[11px] text-ink-3">
              {e.id}
            </td>
            <td className="whitespace-nowrap py-1.5 pr-3 font-mono text-[11px] tabular-nums text-ink-3">
              {e.date}
            </td>
            <td className="whitespace-nowrap py-1.5 pr-3">
              <Chip tone={kindTone[e.kind].tone}>{kindTone[e.kind].label}</Chip>
            </td>
            <td className="py-1.5 pr-3 leading-snug text-ink-2">
              {e.text}
              {e.backfilled && (
                <span className="ml-1.5 text-[10px] text-ink-3">
                  · backfilled from portal audit logs
                </span>
              )}
            </td>
            <td className="whitespace-nowrap py-1.5 text-right">
              {e.credits != null && <Cr v={e.credits} />}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* ---------- slack mirror ---------- */

export function SlackMirror({
  channel,
  time,
  header,
  children,
  buttons,
  chosen,
  footer,
}: {
  channel: string;
  time: string;
  header: string;
  children: ReactNode;
  buttons?: string[];
  chosen?: string;
  footer?: string;
}) {
  return (
    <div className="max-w-xl rounded-md border border-hairline bg-surface shadow-[0_1px_2px_rgba(11,11,11,0.04)]">
      <div className="flex items-center justify-between border-b border-hairline px-3 py-1.5">
        <span className="text-[11px] font-medium text-ink-3">{channel}</span>
        <span className="text-[10px] text-ink-3">Slack · mirror</span>
      </div>
      <div className="px-3 py-2.5">
        <div className="flex items-baseline gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded bg-credit text-[9px] font-bold text-surface">
            vN
          </span>
          <span className="text-[13px] font-bold text-ink">vNext</span>
          <span className="text-[10px] text-ink-3">{time}</span>
        </div>
        <div className="mt-1.5 border-l-2 border-hairline pl-2.5">
          <div className="text-[13px] font-semibold leading-snug text-ink">{header}</div>
          <div className="mt-1.5 space-y-1.5 text-[12px] leading-relaxed text-ink-2">
            {children}
          </div>
          {buttons && (
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {buttons.map((b) => (
                <span
                  key={b}
                  className={cx(
                    "rounded border px-2.5 py-1 text-[11px] font-semibold",
                    chosen === b
                      ? "border-good bg-good-wash text-good-text"
                      : "border-baseline text-ink-2",
                  )}
                >
                  {chosen === b ? `✓ ${b}` : b}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      {footer && (
        <div className="border-t border-hairline px-3 py-1.5">
          <Note>{footer}</Note>
        </div>
      )}
    </div>
  );
}

/* ---------- position diff ---------- */

export function DiffBlock({
  artifact,
  context,
  added,
}: {
  artifact: string;
  context?: string;
  added: string;
}) {
  return (
    <div className="overflow-hidden rounded border border-hairline">
      <div className="border-b border-hairline bg-plane px-3 py-1.5 font-mono text-[11px] text-ink-2">
        {artifact}
      </div>
      <div className="bg-surface p-0 font-mono text-[11.5px] leading-relaxed">
        {context && (
          <div className="px-3 py-1 text-ink-3">
            <span className="mr-2 select-none opacity-50">·</span>
            {context}
          </div>
        )}
        <div className="bg-good-wash px-3 py-1 text-good-text">
          <span className="mr-2 select-none font-bold">+</span>
          {added}
        </div>
      </div>
    </div>
  );
}

/* ---------- cross-link ---------- */

export function XLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="text-[12px] font-medium text-accent-deep hover:underline">
      {children} →
    </Link>
  );
}
