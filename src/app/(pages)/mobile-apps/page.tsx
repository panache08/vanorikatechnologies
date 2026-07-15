import type { Metadata } from "next";
import ServiceLanding from "@/components/sections/service-landing";
import { Smartphone, AppWindow, Bell, WifiOff, UploadCloud, Layers } from "lucide-react";

export const metadata: Metadata = {
  alternates: { canonical: "/mobile-apps" },
  title: "Mobile App Development in Zimbabwe",
  description:
    "Mobile app development for Zimbabwe businesses, covering Android and cross-platform apps built with React Native. Design, development, and app store deployment handled end to end. From $800.",
};

export default function MobileAppsPage() {
  return (
    <ServiceLanding
      path="/mobile-apps"
      badge="Mobile Apps"
      BadgeIcon={Smartphone}
      title="Mobile App Development in Zimbabwe"
      intro="Android and cross-platform apps built with React Native. We handle design, development, and deployment. You get the finished product on your customers' phones."
      serviceDescription="Mobile app development: Android and cross-platform React Native apps for Zimbabwean businesses, from design to app store deployment."
      primary={{ label: "Start Your App", href: "/contact" }}
      secondary={{ label: "See Our Work", href: "/portfolio" }}
      features={[
        { icon: Smartphone, title: "Android Apps", desc: "Native-feeling Android apps for the platform most of your customers are on." },
        { icon: Layers, title: "Cross-Platform (React Native)", desc: "One codebase, both Android and iOS, so it's faster to build and cheaper to maintain." },
        { icon: AppWindow, title: "App Store Deployment", desc: "We handle the Play Store and App Store submission, listings, and approvals." },
        { icon: Bell, title: "Push Notifications", desc: "Re-engage users with timely, relevant push notifications." },
        { icon: WifiOff, title: "Offline Support", desc: "Apps that keep working on patchy connections, built for Zimbabwean networks." },
        { icon: UploadCloud, title: "Backend & Updates", desc: "A connected backend plus ongoing updates and maintenance after launch." },
      ]}
      included={[
        "Design, development, and deployment handled end to end",
        "Full ownership of the app and its code",
        "Built and tested on real devices",
        "Secure data handling by a CompTIA-certified team",
        "App store listings set up for you",
        "A support period after launch",
      ]}
      price={{ label: "Mobile apps", value: "from $800", note: "Android / cross-platform. Final quote depends on scope." }}
    />
  );
}
