// Zimbabwe Web Security Index: dataset.
//
// Built from a passive, external scan of 17 prominent Zimbabwean organisations
// across 6 sectors. Only public signals were checked (HTTPS reachability, response
// headers, and published SPF/DMARC DNS records). Nothing was logged into, probed
// aggressively, or disrupted. Entries are anonymised to sector level: we publish the
// aggregate picture, and offer each organisation its named, detailed breakdown privately.
//
// To refresh: re-run the passive scan, recompute grades with gradeFor(), and update
// SCAN_DATE. Grades use the weights in SCORE_WEIGHTS (total 100).

export const SCAN_DATE = "2026-06-30";
export const SCAN_SAMPLE = 17;
export const SCAN_SECTORS = 6;

export const SCORE_WEIGHTS = {
  https: 30, // serves a working HTTPS response
  hsts: 10, // Strict-Transport-Security
  csp: 10, // Content-Security-Policy
  xfo: 7, // X-Frame-Options
  xcto: 7, // X-Content-Type-Options
  refpol: 6, // Referrer-Policy
  spf: 15, // SPF record (anti-spoofing)
  dmarc: 15, // DMARC record (anti-spoofing)
} as const;

export type IndexChecks = {
  https: boolean;
  hsts: boolean;
  csp: boolean;
  xfo: boolean;
  xcto: boolean;
  refpol: boolean;
  spf: boolean;
  dmarc: boolean;
};

export type IndexGrade = "A" | "B" | "C" | "D" | "F";

export type IndexEntry = {
  id: string; // anonymised label, e.g. "Bank A"
  sector: string;
  checks: IndexChecks;
};

export function scoreFor(c: IndexChecks): number {
  return (Object.keys(SCORE_WEIGHTS) as (keyof IndexChecks)[]).reduce(
    (sum, k) => sum + (c[k] ? SCORE_WEIGHTS[k] : 0),
    0
  );
}

export function gradeFor(score: number): IndexGrade {
  if (score >= 90) return "A";
  if (score >= 75) return "B";
  if (score >= 60) return "C";
  if (score >= 40) return "D";
  return "F";
}

const t = true,
  f = false;

// Raw anonymised dataset (real scan results, names withheld).
export const INDEX_ENTRIES: IndexEntry[] = [
  { id: "Bank A", sector: "Banking", checks: { https: t, hsts: t, csp: t, xfo: t, xcto: t, refpol: t, spf: t, dmarc: t } },
  { id: "Bank B", sector: "Banking", checks: { https: t, hsts: t, csp: t, xfo: t, xcto: t, refpol: f, spf: t, dmarc: t } },
  { id: "Bank C", sector: "Banking", checks: { https: t, hsts: f, csp: t, xfo: t, xcto: t, refpol: f, spf: t, dmarc: t } },
  { id: "Bank D", sector: "Banking", checks: { https: t, hsts: f, csp: t, xfo: t, xcto: t, refpol: f, spf: t, dmarc: t } },
  { id: "Bank E", sector: "Banking", checks: { https: f, hsts: f, csp: f, xfo: f, xcto: f, refpol: f, spf: t, dmarc: t } },
  { id: "Telecom A", sector: "Telecom", checks: { https: t, hsts: f, csp: f, xfo: t, xcto: f, refpol: t, spf: t, dmarc: t } },
  { id: "Telecom B", sector: "Telecom", checks: { https: t, hsts: f, csp: f, xfo: f, xcto: f, refpol: f, spf: t, dmarc: t } },
  { id: "Telecom C", sector: "Telecom", checks: { https: f, hsts: f, csp: f, xfo: f, xcto: f, refpol: f, spf: t, dmarc: t } },
  { id: "Government A", sector: "Government", checks: { https: t, hsts: t, csp: f, xfo: t, xcto: t, refpol: t, spf: t, dmarc: t } },
  { id: "Government B", sector: "Government", checks: { https: f, hsts: f, csp: f, xfo: f, xcto: f, refpol: f, spf: t, dmarc: f } },
  { id: "Insurer A", sector: "Insurance", checks: { https: f, hsts: f, csp: f, xfo: f, xcto: f, refpol: f, spf: t, dmarc: t } },
  { id: "Insurer B", sector: "Insurance", checks: { https: f, hsts: f, csp: f, xfo: f, xcto: f, refpol: f, spf: t, dmarc: f } },
  { id: "Media A", sector: "Media", checks: { https: t, hsts: f, csp: t, xfo: t, xcto: t, refpol: t, spf: f, dmarc: f } },
  { id: "Media B", sector: "Media", checks: { https: t, hsts: t, csp: f, xfo: t, xcto: t, refpol: f, spf: f, dmarc: f } },
  { id: "Media C", sector: "Media", checks: { https: f, hsts: f, csp: f, xfo: f, xcto: f, refpol: f, spf: t, dmarc: t } },
  { id: "Retailer A", sector: "Retail", checks: { https: t, hsts: f, csp: f, xfo: f, xcto: f, refpol: f, spf: t, dmarc: t } },
  { id: "Retailer B", sector: "Retail", checks: { https: f, hsts: f, csp: f, xfo: f, xcto: f, refpol: f, spf: f, dmarc: f } },
];

export type ScoredEntry = IndexEntry & { score: number; grade: IndexGrade };

export const SCORED: ScoredEntry[] = INDEX_ENTRIES.map((e) => {
  const score = scoreFor(e.checks);
  return { ...e, score, grade: gradeFor(score) };
}).sort((a, b) => b.score - a.score);

export const GRADE_COUNTS: Record<IndexGrade, number> = SCORED.reduce(
  (acc, e) => {
    acc[e.grade] += 1;
    return acc;
  },
  { A: 0, B: 0, C: 0, D: 0, F: 0 } as Record<IndexGrade, number>
);

export const AVG_SCORE = Math.round(SCORED.reduce((s, e) => s + e.score, 0) / SCORED.length);
export const AVG_GRADE = gradeFor(AVG_SCORE);

export type SectorSummary = { sector: string; count: number; avg: number; grade: IndexGrade };

export const SECTOR_SUMMARY: SectorSummary[] = Object.values(
  SCORED.reduce((acc, e) => {
    (acc[e.sector] ??= { sector: e.sector, total: 0, count: 0 }).total += e.score;
    acc[e.sector].count += 1;
    return acc;
  }, {} as Record<string, { sector: string; total: number; count: number }>)
)
  .map((s) => {
    const avg = Math.round(s.total / s.count);
    return { sector: s.sector, count: s.count, avg, grade: gradeFor(avg) };
  })
  .sort((a, b) => b.avg - a.avg);

// Headline aggregate stats (computed, so they always reconcile with the dataset).
export const STAT_FAILING = SCORED.filter((e) => e.grade === "F").length;
export const STAT_TOP = GRADE_COUNTS.A;
export const STAT_NO_HSTS = SCORED.filter((e) => !e.checks.hsts).length;
export const STAT_NO_DMARC = SCORED.filter((e) => !e.checks.dmarc).length;
export const STAT_NO_HTTPS = SCORED.filter((e) => !e.checks.https).length;

export const CHECK_LABELS: { key: keyof IndexChecks; label: string; short: string }[] = [
  { key: "https", label: "Working HTTPS", short: "HTTPS" },
  { key: "hsts", label: "HSTS (forced HTTPS)", short: "HSTS" },
  { key: "csp", label: "Content-Security-Policy", short: "CSP" },
  { key: "xfo", label: "X-Frame-Options", short: "XFO" },
  { key: "xcto", label: "X-Content-Type-Options", short: "XCTO" },
  { key: "refpol", label: "Referrer-Policy", short: "Ref" },
  { key: "spf", label: "SPF (anti-spoofing)", short: "SPF" },
  { key: "dmarc", label: "DMARC (anti-spoofing)", short: "DMARC" },
];
