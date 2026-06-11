import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/hero";
import ServicesOverview from "@/components/sections/services-overview";
import StatsSection from "@/components/sections/stats-section";
import WhyChooseUs from "@/components/sections/why-choose-us";
import PortfolioPreview from "@/components/sections/portfolio-preview";
import ProcessSection from "@/components/sections/process-section";
import Testimonials from "@/components/sections/testimonials";
import TechStack from "@/components/sections/tech-stack";
import CTABanner from "@/components/sections/cta-banner";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ServicesOverview />
      <StatsSection />
      <WhyChooseUs />
      <PortfolioPreview />
      <ProcessSection />
      <Testimonials />
      <TechStack />
      <CTABanner />
      <Footer />
    </main>
  );
}
