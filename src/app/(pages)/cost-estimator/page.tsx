import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import type { Metadata } from "next";
import { Calculator } from "lucide-react";
import CostEstimator from "@/components/sections/cost-estimator";
import Breadcrumbs from "@/components/ui/breadcrumbs";

export const metadata: Metadata = {
  alternates: { canonical: "/cost-estimator" },
  title: "Website & Project Cost Estimator",
  description:
    "Get an instant price estimate for your website, online store, app, or custom software in Zimbabwe. Pick what you need and see a real USD range — free, no email required.",
};

export default function CostEstimatorPage() {
  return (
    <main>
      <Navbar />
      <section className="relative pt-28 pb-14 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs className="mb-8" items={[{ name: "Home", path: "/" }, { name: "Cost Estimator", path: "/cost-estimator" }]} />
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-6">
              <Calculator className="w-3.5 h-3.5" /> FREE ESTIMATOR
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">What will your project cost?</h1>
            <p className="text-white/60 text-lg">Pick what you need and get an instant USD estimate. No email, no sales call — just a real number to budget with.</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <CostEstimator />
        </div>
      </section>

      <Footer />
    </main>
  );
}
