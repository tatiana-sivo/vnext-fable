export function fmtMoney(v: number): string {
  if (Math.abs(v) >= 1_000_000) {
    const m = v / 1_000_000;
    return `$${m.toFixed(m % 1 === 0 ? 0 : 2).replace(/\.?0+$/, "")}M`;
  }
  if (Math.abs(v) >= 1_000) {
    const k = v / 1_000;
    return `$${k.toFixed(k % 1 === 0 ? 0 : 1).replace(/\.0$/, "")}K`;
  }
  return `$${v}`;
}

export function fmtNum(v: number): string {
  return v.toLocaleString("en-US");
}

export function pct(v: number): string {
  return `${v}%`;
}
