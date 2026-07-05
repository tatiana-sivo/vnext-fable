import type { ReactNode } from "react";
import type { Tone } from "../data/types";
import { fmtMoney } from "../lib/format";

export function cx(...parts: Array<string | false | undefined | null>) {
  return parts.filter(Boolean).join(" ");
}

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-3",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Panel({
  children,
  className,
  pad = true,
  id,
}: {
  children: ReactNode;
  className?: string;
  pad?: boolean;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cx(
        "rounded-md border border-hairline bg-surface",
        pad && "p-4",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function PanelHeader({
  eyebrow,
  title,
  right,
}: {
  eyebrow?: string;
  title: ReactNode;
  right?: ReactNode;
}) {
  return (
    <div className="mb-3 flex items-start justify-between gap-4">
      <div>
        {eyebrow && <Eyebrow className="mb-1">{eyebrow}</Eyebrow>}
        <h2 className="text-[15px] font-semibold leading-tight text-ink">
          {title}
        </h2>
      </div>
      {right && <div className="shrink-0">{right}</div>}
    </div>
  );
}

const chipTones: Record<Tone, string> = {
  neutral: "border-hairline bg-plane text-ink-2",
  accent: "border-[#b7d3f6] bg-accent-faint text-accent-deep",
  credit: "border-[#d8d1f0] bg-credit-wash text-credit",
  good: "border-[#c2e5c2] bg-good-wash text-good-text",
  warn: "border-[#f2d9a4] bg-warn-wash text-warn-text",
  serious: "border-[#f5c9b4] bg-serious-wash text-serious-text",
  critical: "border-[#f0bcbc] bg-critical-wash text-critical-text",
};

export function Chip({
  tone = "neutral",
  children,
  className,
  title,
}: {
  tone?: Tone;
  children: ReactNode;
  className?: string;
  title?: string;
}) {
  return (
    <span
      title={title}
      className={cx(
        "inline-flex items-center gap-1 whitespace-nowrap rounded-sm border px-1.5 py-px text-[11px] font-medium",
        chipTones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Stat({
  label,
  value,
  sub,
  className,
}: {
  label: string;
  value: ReactNode;
  sub?: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <Eyebrow className="mb-0.5">{label}</Eyebrow>
      <div className="text-[17px] font-semibold leading-snug text-ink">
        {value}
      </div>
      {sub && <div className="mt-0.5 text-[11px] text-ink-3">{sub}</div>}
    </div>
  );
}

export function KV({ k, v }: { k: string; v: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-hairline py-1.5 last:border-b-0">
      <span className="text-[12px] text-ink-2">{k}</span>
      <span className="text-right text-[12px] font-medium text-ink">{v}</span>
    </div>
  );
}

const btnVariants = {
  primary: "bg-ink text-surface hover:bg-ink/80 border border-ink",
  ghost: "border border-hairline bg-surface text-ink hover:bg-plane",
  danger:
    "border border-[#f0bcbc] bg-surface text-critical-text hover:bg-critical-wash",
};

export function Btn({
  variant = "ghost",
  children,
  onClick,
  disabled,
  className,
}: {
  variant?: keyof typeof btnVariants;
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cx(
        "rounded px-3 py-1.5 text-[12px] font-medium transition-colors disabled:cursor-default disabled:opacity-40",
        btnVariants[variant],
        className,
      )}
    >
      {children}
    </button>
  );
}

/** System/caption note — used for mirror captions and mechanism explainers. */
export function Note({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cx("text-[11px] leading-relaxed text-ink-3", className)}>
      {children}
    </p>
  );
}

export function ScreenHead({
  title,
  lede,
  right,
}: {
  title: string;
  lede: ReactNode;
  right?: ReactNode;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-6">
      <div className="max-w-3xl">
        <h1 className="text-[21px] font-bold tracking-tight text-ink">{title}</h1>
        <p className="mt-1.5 text-[13px] leading-relaxed text-ink-2">{lede}</p>
      </div>
      {right && <div className="shrink-0">{right}</div>}
    </div>
  );
}

export function Money({ v }: { v: number }) {
  return <span className="font-mono font-medium text-ink">{fmtMoney(v)}</span>;
}

/** Credits — the second currency, always visibly distinct. */
export function Cr({ v, className }: { v: number; className?: string }) {
  return (
    <span className={cx("font-mono font-medium text-credit", className)}>
      ◆{v}
    </span>
  );
}
