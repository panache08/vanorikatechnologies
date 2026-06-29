"use client";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { useEffect, useState, useCallback } from "react";
import { CheckCircle2, AlertTriangle, Loader2, RefreshCw, Activity } from "lucide-react";

type Comp = { name: string; description: string; operational: boolean; status: number; latencyMs: number };
type Status = { allOperational: boolean; checkedAt: string; components: Comp[] };

export default function StatusPage() {
  const [data, setData] = useState<Status | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/status", { cache: "no-store" });
      setData(await res.json());
    } catch {
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    const t = setInterval(load, 60000);
    return () => clearInterval(t);
  }, [load]);

  const allOk = data?.allOperational;

  return (
    <main>
      <Navbar />
      <section className="relative pt-40 pb-16 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-6">
            <Activity className="w-3.5 h-3.5" /> SYSTEM STATUS
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">Status</h1>
          <p className="text-white/60 text-lg">Live status of Vanorika Technologies services.</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Overall banner */}
          <div className={`rounded-2xl border p-6 mb-8 flex items-center gap-4 ${
            loading && !data ? "border-border bg-card"
              : allOk ? "border-green/30 bg-green/5" : "border-red-500/30 bg-red-500/5"
          }`}>
            {loading && !data
              ? <Loader2 className="w-7 h-7 text-muted-foreground animate-spin" />
              : allOk
                ? <CheckCircle2 className="w-7 h-7 text-green" />
                : <AlertTriangle className="w-7 h-7 text-red-500" />}
            <div className="flex-1">
              <p className="font-display text-lg font-bold text-foreground">
                {loading && !data ? "Checking services…" : allOk ? "All systems operational" : "Some systems are degraded"}
              </p>
              {data && <p className="text-muted-foreground text-xs mt-0.5">Last checked {new Date(data.checkedAt).toLocaleTimeString("en-GB")}</p>}
            </div>
            <button onClick={load} aria-label="Refresh status"
              className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold/30 transition-all">
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>

          {/* Components */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            {(data?.components ?? []).map((c, i) => (
              <div key={c.name} className={`flex items-center gap-4 px-6 py-4 ${i !== 0 ? "border-t border-border" : ""}`}>
                <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${c.operational ? "bg-green" : "bg-red-500"}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-foreground text-sm font-medium">{c.name}</p>
                  <p className="text-muted-foreground text-xs">{c.description}</p>
                </div>
                <span className={`text-sm font-medium ${c.operational ? "text-green" : "text-red-500"}`}>
                  {c.operational ? "Operational" : "Down"}
                </span>
              </div>
            ))}
            {!data && !loading && (
              <div className="px-6 py-8 text-center text-muted-foreground text-sm">Could not load status. Please refresh.</div>
            )}
          </div>

          <p className="text-muted-foreground/60 text-xs text-center mt-6">Auto-refreshes every 60 seconds.</p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
