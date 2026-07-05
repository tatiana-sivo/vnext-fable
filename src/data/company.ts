import type { Person } from "./types";

/**
 * The fictional customer. Every number in the prototype reconciles back to
 * this company's portal data (see portal.ts) and the Q3 credit budget
 * (credits.ts). Entirely fictional; grounded in mid-market B2B SaaS norms.
 */
export const company = {
  name: "Plumbline",
  legalName: "Plumbline Security, Inc.",
  oneLiner:
    "Continuous compliance automation — SOC 2, ISO 27001 and HIPAA evidence collection and monitoring for B2B software companies.",
  hq: "Denver, CO",
  employees: 82,
  arr: "$14.2M",
  customers: 361,
  acv: "$38.1K",
  founded: 2019,
  stage: "Series B",
  portalSince: 2021,
  loopInstalled: "Jul 2, 2026",
};

export const people: Record<string, Person> = {
  maya: {
    id: "maya",
    name: "Maya Okafor",
    role: "Director of Marketing",
    team: "marketing",
    initials: "MO",
  },
  jonah: {
    id: "jonah",
    name: "Jonah Reyes",
    role: "Content Marketing Lead",
    team: "marketing",
    initials: "JR",
  },
  tessa: {
    id: "tessa",
    name: "Tessa Vogel",
    role: "Demand Gen Manager",
    team: "marketing",
    initials: "TV",
  },
  ravi: {
    id: "ravi",
    name: "Ravi Mehta",
    role: "Revenue Operations (shared with sales)",
    team: "marketing",
    initials: "RM",
  },
  dana: {
    id: "dana",
    name: "Dana Whitfield",
    role: "VP Sales",
    team: "sales",
    initials: "DW",
  },
  priya: {
    id: "priya",
    name: "Priya Shah",
    role: "Head of Legal",
    team: "legal",
    initials: "PS",
  },
  anna: {
    id: "anna",
    name: "Anna Kessler",
    role: "CEO",
    team: "exec",
    initials: "AK",
  },
  marcus: {
    id: "marcus",
    name: "Marcus Boyd",
    role: "CFO",
    team: "exec",
    initials: "MB",
  },
  tomas: {
    id: "tomas",
    name: "Tomás Rivera",
    role: "Account Executive",
    team: "sales",
    initials: "TR",
  },
  elena: {
    id: "elena",
    name: "Elena Ruiz",
    role: "Account Executive",
    team: "sales",
    initials: "ER",
  },
};

/** Q3 2026 quarter frame shared by every screen. */
export const quarter = {
  label: "Q3 2026",
  start: "Jul 1, 2026",
  end: "Sep 30, 2026",
  days: 92,
  /** The walkthrough's canonical "now": Tue Aug 25, 2026 — day 56, week 9. */
  today: "Tue Aug 25, 2026",
  dayOfQuarter: 56,
  elapsedPct: 61,
  weekJustClosed: 8,
};

/**
 * Each screen is a moment in the demo's timeline. The top bar pins the
 * credit meter to the moment, so spend is always honest for what you see.
 */
export interface DemoMoment {
  date: string;
  creditsSpent: number;
  moneySpent: number;
  note?: string;
}

export const moments: Record<string, DemoMoment> = {
  overview: { date: "Tue Aug 25, 2026", creditsSpent: 140, moneySpent: 161000 },
  retro: {
    date: "Thu Jul 2, 2026",
    creditsSpent: 0,
    moneySpent: 0,
    note: "day one — Loop installed",
  },
  close: {
    date: "Mon Aug 24, 2026",
    creditsSpent: 136,
    moneySpent: 159000,
    note: "week 8 Close",
  },
  delta: { date: "Tue Aug 25, 2026 · 10:15", creditsSpent: 140, moneySpent: 161000 },
  bet: { date: "Tue Aug 25, 2026", creditsSpent: 140, moneySpent: 161000 },
  bid: { date: "Tue Aug 25, 2026 · 11:02", creditsSpent: 140, moneySpent: 161000 },
  prosecutor: { date: "Tue Aug 25, 2026", creditsSpent: 140, moneySpent: 161000 },
  coordination: {
    date: "Tue Aug 25 – Fri Aug 28, 2026",
    creditsSpent: 143,
    moneySpent: 162400,
    note: "wave 1 spent ◆3",
  },
  positions: { date: "Mon Aug 31, 2026", creditsSpent: 147, moneySpent: 165100 },
  incident: { date: "Fri Aug 28, 2026", creditsSpent: 143, moneySpent: 162400 },
};
