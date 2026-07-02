import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/hero";
import HomeScanner from "@/components/sections/home-scanner";
import ServicesOverview from "@/components/sections/services-overview";
import StatsSection from "@/components/sections/stats-section";
import SecurityIndexBanner from "@/components/sections/security-index-banner";
import ReportBanner from "@/components/sections/report-banner";
import WhyChooseUs from "@/components/sections/why-choose-us";
import PortfolioPreview from "@/components/sections/portfolio-preview";
import FreeToolsSection from "@/components/sections/free-tools-section";
import ProcessSection from "@/components/sections/process-section";
import Testimonials from "@/components/sections/testimonials";
import PricingTeaser from "@/components/sections/pricing-teaser";
import Newsletter from "@/components/sections/newsletter";
import CTABanner from "@/components/sections/cta-banner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <HomeScanner />
      <ReportBanner />
      <ServicesOverview />
      <StatsSection />
      <WhyChooseUs />
      <SecurityIndexBanner />
      <FreeToolsSection />
      <PortfolioPreview />
      <ProcessSection />
      <Testimonials />
      <PricingTeaser />
      <Newsletter />
      <CTABanner />
      <Footer />
    </main>
  );
}
