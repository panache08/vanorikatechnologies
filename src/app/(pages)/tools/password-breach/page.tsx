"use client";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { useState } from "react";
import { ShieldAlert, ShieldCheck, Loader2, Search, Eye, EyeOff, KeyRound } from "lucide-react";

async function sha1Hex(text: string) {
  const buf = await crypto.subtle.digest("SHA-1", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("").toUpperCase();
}

export default function PasswordBreachPage() {
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ count: number } | null>(null);
  const [error, setError] = useState("");

  const check = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pw) return;
    setError(""); setResult(null); setLoading(true);
    try {
      const hash = await sha1Hex(pw);
      const prefix = hash.slice(0, 5);
      const suffix = hash.slice(5);
      // k-anonymity: only the first 5 hash chars ever leave the browser.
      const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
      const text = await res.text();
      const line = text.split("\n").find((l) => l.split(":")[0].trim().toUpperCase() === suffix);
      setResult({ count: line ? parseInt(line.split(":")[1], 10) : 0 });
    } catch {
      setError("Could not reach the breach database. Try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <Navbar />
      <section className="relative pt-40 pb-16 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-6">
            <KeyRound className="w-3.5 h-3.5" /> FREE TOOL
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">Password Breach Checker</h1>
          <p className="text-white/60 text-lg">Find out if a password has appeared in a known data breach — checked privately, the password never leaves your browser.</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={check} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input type={show ? "text" : "password"} value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Enter a password to check"
                aria-label="Password" autoComplete="off"
                className="w-full px-4 py-3 pr-11 bg-card border border-border rounded-xl text-foreground placeholder-muted-foreground focus:border-gold focus:outline-none transition-all text-sm" />
              <button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? "Hide" : "Show"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <button type="submit" disabled={loading || !pw}
              className="px-6 py-3 bg-gold text-[#07070D] font-bold rounded-xl hover:bg-gold-light transition-all disabled:opacity-60 flex items-center justify-center gap-2 text-sm gold-glow-sm">
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Checking…</> : <><Search className="w-4 h-4" /> Check</>}
            </button>
          </form>
          {error && <p className="text-red-400 text-sm mt-4">{error}</p>}

          {result && (
            <div className={`mt-8 rounded-3xl p-8 border ${result.count > 0 ? "bg-red-500/5 border-red-500/30" : "bg-green/5 border-green/30"}`}>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${result.count > 0 ? "bg-red-500/10 text-red-500" : "bg-green/10 text-green"}`}>
                  {result.count > 0 ? <ShieldAlert className="w-6 h-6" /> : <ShieldCheck className="w-6 h-6" />}
                </div>
                <div>
                  {result.count > 0 ? (
                    <>
                      <p className="font-display text-lg font-bold text-red-500">Found in {result.count.toLocaleString()} breaches</p>
                      <p className="text-muted-foreground text-sm mt-1">This password is public. Stop using it everywhere and change it now.</p>
                    </>
                  ) : (
                    <>
                      <p className="font-display text-lg font-bold text-green">Not found in any known breach</p>
                      <p className="text-muted-foreground text-sm mt-1">Good — but still use a unique password per account and enable 2FA.</p>
                    </>
                  )}
                </div>
              </div>
              {result.count > 0 && (
                <a href="/tools/password-generator" className="inline-flex items-center gap-2 mt-5 text-gold text-sm font-semibold hover:gap-2.5 transition-all">
                  Generate a strong replacement →
                </a>
              )}
            </div>
          )}

          <p className="text-muted-foreground/60 text-xs text-center mt-6">
            Private by design: your browser hashes the password and sends only the first 5 characters of that hash (k-anonymity). The password itself is never transmitted or stored.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
