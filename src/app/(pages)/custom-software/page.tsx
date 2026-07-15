import type { Metadata } from "next";
import ServiceLanding from "@/components/sections/service-landing";
import { Code2, Database, LayoutDashboard, Workflow, Plug, Layers, GitBranch } from "lucide-react";

export const metadata: Metadata = {
  alternates: { canonical: "/custom-software" },
  title: "Custom Software Development in Zimbabwe",
  description:
    "Custom software development for Zimbabwe businesses. Management systems, web apps, dashboards, and internal tools built for how your company actually works. Fixed quotes, no scope creep. From $500.",
};

export default function CustomSoftwarePage() {
  return (
    <ServiceLanding
      path="/custom-software"
      badge="Custom Software"
      BadgeIcon={Code2}
      title="Custom Software in Zimbabwe"
      intro="If your current software isn't doing what you need, we'll build something that does. Business systems, dashboards, and tools built around how your company actually works, quoted before we start."
      serviceDescription="Custom software development: business management systems, web applications, dashboards, and internal tools for Zimbabwean businesses."
      primary={{ label: "Get a Quote", href: "/contact" }}
      secondary={{ label: "See Our Work", href: "/portfolio" }}
      features={[
        { icon: LayoutDashboard, title: "Business Management Systems", desc: "Replace spreadsheets and disconnected tools with one system built for your operation." },
        { icon: Layers, title: "Web Applications", desc: "Full web apps with logins, roles, and real workflows, not just a website with a form." },
        { icon: Plug, title: "API Development & Integration", desc: "Connect the tools you already use, or build APIs other systems can plug into." },
        { icon: Database, title: "Database Design", desc: "Properly structured data so your system stays fast and reliable as you grow." },
        { icon: LayoutDashboard, title: "Admin Dashboards", desc: "Clear dashboards that show the numbers that matter, in real time." },
        { icon: GitBranch, title: "System Integration", desc: "Make EcoCash, accounting, CRM, and your other systems talk to each other." },
      ]}
      included={[
        "A fixed quote agreed before any work starts",
        "Full ownership of the code and database",
        "Built and tested for real-world use, not just a demo",
        "Security hardening by a CompTIA-certified team",
        "Documentation and a handover walkthrough",
        "A support period after launch",
      ]}
      price={{ label: "Custom software", value: "from $500", note: "Quoted per project. No hourly billing, no scope creep." }}
    />
  );
}
