"use client";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { useState } from "react";
import { Mail, Check, X, AlertTriangle, ShieldAlert, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/data";

type Check = { label: string; state: "pass" | "fail" | "warn" | "unknown"; detail: string };

function analyze(raw: string): { checks: Check[]; from: string; returnPath: string; hops: number } {
  const text = raw.replace(/\r/g, "");
  const get = (h: string) => {
    const m = text.match(new RegExp(`^${h}:\\s*(.*(?:\\n\\s+.*)*)`, "im"));
    return m ? m[1].replace(/\n\s+/g, " ").trim() : "";
  };
  const authResults = (get("Authentication-Results") + " " + get("ARC-Authentication-Results")).toLowerCase();
  const from = get("From");
  const returnPath = get("Return-Path").replace(/[<>]/g, "");
  const fromDomain = (from.match(/@([a-z0-9.-]+)/i) || [])[1]?.toLowerCase() || "";
  const rpDomain = (returnPath.match(/@([a-z0-9.-]+)/i) || [])[1]?.toLowerCase() || "";
  const hops = (text.match(/^Received:/gim) || []).length;

  const verdict = (name: string): Check["state"] => {
    const m = authResults.match(new RegExp(`${name}=(\\w+)`));
    if (!m) return "unknown";
    if (m[1] === "pass") return "pass";
    if (["fail", "softfail", "permerror", "temperror"].includes(m[1])) return "fail";
    return "warn";
  };

  const checks: Check[] = [
    { label: "SPF", state: verdict("spf"), detail: "Did the sending server have permission to send for the From domain?" },
    { label: "DKIM", state: verdict("dkim"), detail: "Was the message cryptographically signed and intact?" },
    { label: "DMARC", state: verdict("dmarc"), detail: "Did the message pass the domain's anti-spoofing policy?" },
    {
      label: "From / Return-Path alignment",
      state: fromDomain && rpDomain ? (fromDomain === rpDomain ? "pass" : "warn") : "unknown",
      detail: fromDomain && rpDomain
        ? (fromDomain === rpDomain ? "Visible sender matches the envelope sender." : `Mismatch: From is ${fromDomain} but Return-Path is ${rpDomain} — common in spoofing and some mailing lists.`)
        : "Could not determine both addresses.",
    },
  ];
  return { checks, from, returnPath, hops };
}

const icon = { pass: Check, fail: X, warn: AlertTriangle, unknown: AlertTriangle };
const color = { pass: "text-green bg-green/10", fail: "text-red-500 bg-red-500/10", warn: "text-gold bg-gold/10", unknown: "text-muted-foreground bg-muted/30" };

export default function EmailHeaderAnalyzer() {
  const [raw, setRaw] = useState("");
  const [result, setResult] = useState<ReturnType<typeof analyze> | null>(null);

  return (
    <main>
      <Navbar />
      <section className="relative pt-40 pb-16 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-6">
            <Mail className="w-3.5 h-3.5" /> FREE TOOL
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">Email Header Analyzer</h1>
          <p className="text-white/60 text-lg">Suspect a phishing email? Paste its full headers and we&apos;ll check if it&apos;s really who it claims to be.</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <label htmlFor="hdr" className="block text-sm font-medium text-muted-foreground mb-1.5">Paste the full email headers</label>
          <textarea id="hdr" value={raw} onChange={(e) => setRaw(e.target.value)} rows={8}
            placeholder="In Gmail: open the email → ⋮ → Show original → copy everything. Paste it here…"
            className="w-full px-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder-muted-foreground focus:border-gold focus:outline-none transition-all text-xs font-mono resize-none" />
          <button onClick={() => setResult(analyze(raw))} disabled={!raw.trim()}
            className="mt-3 px-6 py-3 bg-gold text-[#07070D] font-bold rounded-xl hover:bg-gold-light transition-all disabled:opacity-60 text-sm gold-glow-sm">
            Analyze headers
          </button>

          {result && (
            <div className="mt-8 bg-card border border-border rounded-3xl p-8">
              <div className="space-y-4">
                {result.checks.map((c) => {
                  const Ic = icon[c.state];
                  return (
                    <div key={c.label} className="flex items-start gap-4">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${color[c.state]}`}><Ic className="w-4 h-4" /></div>
                      <div>
                        <p className="text-foreground font-medium text-sm">{c.label}: <span className="uppercase text-xs">{c.state === "unknown" ? "not found" : c.state}</span></p>
                        <p className="text-muted-foreground text-sm leading-relaxed">{c.detail}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 pt-6 border-t border-border text-sm space-y-1">
                <p className="text-muted-foreground">From: <span className="text-foreground break-all">{result.from || "—"}</span></p>
                <p className="text-muted-foreground">Return-Path: <span className="text-foreground break-all">{result.returnPath || "—"}</span></p>
                <p className="text-muted-foreground">Mail hops: <span className="text-foreground">{result.hops}</span></p>
              </div>
              <div className="mt-6 pt-6 border-t border-border flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">If SPF, DKIM or DMARC failed, treat the email as suspicious. Worried your staff are being targeted? We run phishing-awareness checks.</p>
                  <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-gold text-sm font-semibold hover:gap-2.5 transition-all">
                    Talk to us about phishing protection <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          )}
          <p className="text-muted-foreground/60 text-xs text-center mt-6">100% private — headers are analysed in your browser and never sent to a server.</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
