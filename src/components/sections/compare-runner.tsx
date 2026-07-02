"use client";

import { useEffect, useState, useCallback } from "react";
import { Loader2, Swords, Check, X, MessageCircle, Link2, ArrowRight, Trophy } from "lucide-react";
import { siteConfig } from "@/lib/data";
import LeadCaptureModal from "@/components/lead-capture-modal";
import type { ReportData } from "@/lib/report-pdf";

const GRADE_COLOR: Record<string, string> = {
  A: "text-emerald-400 border-emerald-400/40 bg-emerald-400/10",
  B: "text-lime-400 border-lime-400/40 bg-lime-400/10",
  C: "text-amber-400 border-amber-400/40 bg-amber-400/10",
  D: "text-orange-400 border-orange-400/40 bg-orange-400/10",
  F: "text-red-400 border-red-400/40 bg-red-400/10",
};

async function scan(domain: string): Promise<ReportData> {
  const res = await fetch("/api/report", {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ domain }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Scan failed");
  return data;
}

function GradeCard({ r, label, winner }: { r: ReportData; label: string; winner: boolean }) {
  return (
    <div className={`relative flex-1 rounded-2xl border p-5 text-center ${winner ? "border-gold/40 bg-gold/[0.04]" : "border-border bg-card"}`}>
      {winner && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-gold text-black text-[10px] font-bold">
          <Trophy className="w-3 h-3" /> AHEAD
        </span>
      )}
      <p className="text-muted-foreground text-[11px] uppercase tracking-widest mb-1">{label}</p>
      <p className="font-display text-sm font-bold text-foreground break-all mb-3">{r.host}</p>
      <div className={`w-16 h-16 mx-auto rounded-xl border flex flex-col items-center justify-center ${GRADE_COLOR[r.grade]}`}>
        <span className="font-display text-2xl font-black leading-none">{r.grade}</span>
        <span className="text-[10px] opacity-80">{r.score}</span>
      </div>
    </div>
  );
}

export default function CompareRunner() {
  const [you, setYou] = useState("");
  const [them, setThem] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ you: ReportData; them: ReportData } | null>(null);
  const [copied, setCopied] = useState(false);

  const run = useCallback(async (a: string, b: string) => {
    setError(""); setResult(null); setLoading(true);
    try {
      const [yr, tr] = await Promise.all([scan(a), scan(b)]);
      setResult({ you: yr, them: tr });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not run the comparison. Check both addresses.");
    } finally {
      setLoading(false);
    }
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (you.trim() && them.trim()) run(you, them);
  };

  // Deep-link: /compare?you=a&them=b auto-runs, so shared links work.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const a = p.get("you"), b = p.get("them");
    if (a && b) { setYou(a); setThem(b); run(a, b); }
  }, [run]);

  const share = () => {
    if (!result) return;
    const url = `${window.location.origin}/compare?you=${encodeURIComponent(result.you.host)}&them=${encodeURIComponent(result.them.host)}`;
    navigator.clipboard?.writeText(url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  const youAhead = result ? result.you.score > result.them.score : false;
  const tie = result ? result.you.score === result.them.score : false;

  const leadMessage = result
    ? `Hi Donovan, I compared ${result.you.host} (grade ${result.you.grade}) against ${result.them.host} (grade ${result.them.grade}) on your site. ${youAhead ? "I want to stay ahead" : "I want to close the gap"} — can you help?`
    : "Hello! I'd like to discuss a security comparison.";

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={onSubmit} className="space-y-3">
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gold/70 font-mono uppercase tracking-wider mb-1.5">Your site</label>
            <input value={you} onChange={(e) => setYou(e.target.value)} placeholder="yourbusiness.co.zw"
              className="w-full px-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder-muted-foreground focus:border-gold focus:outline-none text-sm" />
          </div>
          <div>
            <label className="block text-xs text-gold/70 font-mono uppercase tracking-wider mb-1.5">Competitor</label>
            <input value={them} onChange={(e) => setThem(e.target.value)} placeholder="competitor.co.zw"
              className="w-full px-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder-muted-foreground focus:border-gold focus:outline-none text-sm" />
          </div>
        </div>
        <button type="submit" disabled={loading}
          className="w-full px-7 py-3.5 bg-gold text-[#07070D] font-bold rounded-xl hover:bg-gold-light transition-all disabled:opacity-60 flex items-center justify-center gap-2 text-sm gold-glow-sm">
          {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Comparing…</> : <><Swords className="w-4 h-4" /> Compare us</>}
        </button>
      </form>
      {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
      {!result && !loading && <p className="text-white/30 text-xs mt-4 text-center">Passive checks only — public information, nothing intrusive, for either site.</p>}

      {result && (
        <div className="mt-8 bg-card border border-border rounded-3xl p-6 sm:p-8">
          <div className="flex items-stretch gap-3 sm:gap-5 mb-6">
            <GradeCard r={result.you} label="You" winner={youAhead && !tie} />
            <div className="flex items-center text-muted-foreground font-display font-black text-sm">VS</div>
            <GradeCard r={result.them} label="Them" winner={!youAhead && !tie} />
          </div>

          <div className="text-center pb-6 border-b border-border">
            {tie ? (
              <p className="text-foreground font-display font-bold">Neck and neck — you both scored {result.you.score}.</p>
            ) : youAhead ? (
              <p className="text-emerald-400 font-display font-bold">You&apos;re ahead by {result.you.score - result.them.score} points. Now keep it that way.</p>
            ) : (
              <p className="text-orange-400 font-display font-bold">You&apos;re behind by {result.them.score - result.you.score} points. Here&apos;s exactly where.</p>
            )}
          </div>

          {/* Per-check comparison */}
          <div className="pt-6 space-y-2">
            {result.you.checks.map((c, i) => {
              const t = result.them.checks[i];
              const gap = !c.pass && t?.pass; // they win, you lose = the gap
              return (
                <div key={c.id} className={`flex items-center justify-between gap-3 px-3 py-2 rounded-lg ${gap ? "bg-red-500/5 border border-red-500/15" : ""}`}>
                  <span className="text-foreground text-sm">{c.label}</span>
                  <div className="flex items-center gap-6 shrink-0">
                    {c.pass ? <Check className="w-4 h-4 text-emerald-400" /> : <X className="w-4 h-4 text-red-400/70" />}
                    <span className="w-px h-4 bg-border" />
                    {t?.pass ? <Check className="w-4 h-4 text-emerald-400" /> : <X className="w-4 h-4 text-red-400/70" />}
                  </div>
                </div>
              );
            })}
            <div className="flex items-center justify-end gap-6 px-3 pt-1 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
              <span>You</span><span className="w-px h-3" /><span>Them</span>
            </div>
          </div>

          <div className="mt-7 pt-6 border-t border-border flex flex-wrap items-center gap-4">
            <LeadCaptureModal
              source={`Compare (${result.you.host} vs ${result.them.host})`}
              label={youAhead ? "Keep us ahead" : "Close the gap"}
              icon={<MessageCircle className="w-4 h-4 order-last" />}
              whatsappMessage={leadMessage}
              heading={youAhead ? "Stay ahead of them" : "Let's close that gap"}
              subheading="Leave your name and contact and we'll come back with exactly what to fix to win. We'll open WhatsApp so you can send the comparison over."
              className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-[#07070D] font-bold rounded-xl hover:bg-gold-light transition-all text-sm uppercase tracking-wider" />
            <button onClick={share} type="button" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-sm transition-colors">
              <Link2 className="w-4 h-4" /> {copied ? "Link copied" : "Copy shareable link"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
