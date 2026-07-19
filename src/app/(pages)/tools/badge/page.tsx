"use client";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { useState } from "react";
import { BadgeCheck, Copy, Check } from "lucide-react";

const SITE = "https://www.vanorikatechnologies.co.zw";

function snippet(theme: "dark" | "light") {
  const bg = theme === "dark" ? "#0D0D1A" : "#ffffff";
  const fg = theme === "dark" ? "#F0EDE8" : "#1A1A1A";
  const border = "#C9A84C";
  return `<a href="${SITE}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:8px;font-family:system-ui,sans-serif;font-size:13px;font-weight:600;color:${fg};background:${bg};border:1px solid ${border};border-radius:10px;padding:8px 14px;text-decoration:none">
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${border}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2 4 5v6c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V5l-8-3Z"/></svg> Secured by Vanorika
</a>`;
}

function Preview({ theme }: { theme: "dark" | "light" }) {
  const dark = theme === "dark";
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "system-ui, sans-serif", fontSize: 13, fontWeight: 600,
      color: dark ? "#F0EDE8" : "#1A1A1A", background: dark ? "#0D0D1A" : "#ffffff",
      border: "1px solid #C9A84C", borderRadius: 10, padding: "8px 14px",
    }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2 4 5v6c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V5l-8-3Z" />
      </svg> Secured by Vanorika
    </span>
  );
}

export default function BadgePage() {
  const [copied, setCopied] = useState("");
  const copy = (k: string, text: string) => navigator.clipboard?.writeText(text).then(() => { setCopied(k); setTimeout(() => setCopied(""), 2000); });

  return (
    <main>
      <Navbar />
      <section className="relative pt-40 pb-16 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-6">
            <BadgeCheck className="w-3.5 h-3.5" /> TRUST BADGE
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">&ldquo;Secured by Vanorika&rdquo; Badge</h1>
          <p className="text-white/60 text-lg">Passed a security review with us? Show it. Add a trust badge to your site&apos;s footer. It reassures your customers and links back to us.</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {(["dark", "light"] as const).map((theme) => (
            <div key={theme} className="bg-card border border-border rounded-2xl p-6">
              <p className="text-foreground text-sm font-semibold mb-4 capitalize">{theme} background</p>
              <div className={`rounded-xl p-6 flex items-center justify-center mb-4 ${theme === "dark" ? "bg-[#07070D]" : "bg-white"}`}>
                <Preview theme={theme} />
              </div>
              <div className="relative">
                <pre className="bg-background border border-border rounded-lg p-3 text-[11px] text-muted-foreground font-mono overflow-x-auto whitespace-pre-wrap break-all">{snippet(theme)}</pre>
                <button onClick={() => copy(theme, snippet(theme))}
                  className="absolute top-2 right-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-gold text-[#07070D] rounded-lg text-xs font-semibold hover:bg-gold-light transition-all">
                  {copied === theme ? <><Check className="w-3.5 h-3.5" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                </button>
              </div>
            </div>
          ))}
          <p className="text-muted-foreground/60 text-xs text-center">Paste the snippet into your site&apos;s footer HTML. The badge is self-contained, with no images or scripts to load.</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
