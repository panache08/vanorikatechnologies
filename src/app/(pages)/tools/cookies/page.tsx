"use client";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { useState } from "react";
import { Cookie, Search, Loader2, Check, X, ShieldAlert, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/data";

type Data = { host: string; cookiesSetOnLoad: number; cookieNames: string[]; trackers: string[]; hasPrivacyLink: boolean; concern: boolean };

export default function CookiesPage() {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState("");

  const run = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setData(null); setLoading(true);
    try {
      const res = await fetch("/api/tools/cookies", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ domain }) });
      const d = await res.json();
      if (!res.ok) setError(d.error || "Something went wrong."); else setData(d);
    } catch { setError("Could not run the check."); } finally { setLoading(false); }
  };

  const Row = ({ ok, label, detail }: { ok: boolean; label: string; detail: string }) => (
    <div className="flex items-start gap-3 py-3 border-b border-border last:border-0">
      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${ok ? "bg-green/10 text-green" : "bg-gold/10 text-gold"}`}>{ok ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}</div>
      <div><p className="text-foreground text-sm font-medium">{label}</p><p className="text-muted-foreground text-xs mt-0.5">{detail}</p></div>
    </div>
  );

  return (
    <main>
      <Navbar />
      <section className="relative pt-40 pb-16 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-6">
            <Cookie className="w-3.5 h-3.5" /> FREE TOOL
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">Cookie &amp; Privacy Scanner</h1>
          <p className="text-white/60 text-lg">See which cookies and trackers your website sets — and whether you have the privacy basics the Data Protection Act expects.</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={run} className="flex flex-col sm:flex-row gap-3">
            <input value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="yourbusiness.co.zw" aria-label="Website"
              className="flex-1 px-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder-muted-foreground focus:border-gold focus:outline-none transition-all text-sm" />
            <button type="submit" disabled={loading} className="px-6 py-3 bg-gold text-[#07070D] font-bold rounded-xl hover:bg-gold-light transition-all disabled:opacity-60 flex items-center justify-center gap-2 text-sm gold-glow-sm">
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Scanning…</> : <><Search className="w-4 h-4" /> Scan</>}
            </button>
          </form>
          {error && <p className="text-red-400 text-sm mt-4">{error}</p>}

          {data && (
            <div className="mt-8 bg-card border border-border rounded-3xl p-8">
              <p className="font-display text-lg font-bold text-foreground mb-5 break-all">{data.host}</p>
              <Row ok={data.hasPrivacyLink} label={data.hasPrivacyLink ? "Privacy policy found" : "No privacy policy detected"} detail="Required under the Data Protection Act (2021) if you collect any personal data." />
              <Row ok={data.cookiesSetOnLoad === 0} label={`${data.cookiesSetOnLoad} cookie(s) set on load`} detail={data.cookieNames.length ? data.cookieNames.join(", ") : "None set before any interaction."} />
              <Row ok={data.trackers.length === 0} label={data.trackers.length ? `${data.trackers.length} third-party tracker(s)` : "No common trackers detected"} detail={data.trackers.length ? data.trackers.join(", ") + " — these may set cookies that need consent." : "Nothing obvious loading third-party tracking."} />

              <div className="mt-6 pt-6 border-t border-border flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">{data.concern ? "You have tracking but no clear privacy policy — a Data Protection Act compliance gap." : "Want a full privacy & compliance review? We'll check consent, retention and your whole data flow."}</p>
                  <a href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(`Hi Donovan, I scanned ${data.host} with your cookie tool${data.hasPrivacyLink ? "" : " — no privacy policy detected"}. Can you help with DPA compliance?`)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-gold text-sm font-semibold hover:gap-2.5 transition-all">
                    Get a compliance review — free <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          )}
          <p className="text-muted-foreground/60 text-xs text-center mt-6">Reads the homepage only, passively. A full review checks consent banners, retention and sub-pages.</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
