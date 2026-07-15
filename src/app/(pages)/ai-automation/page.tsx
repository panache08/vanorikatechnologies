import type { Metadata } from "next";
import ServiceLanding from "@/components/sections/service-landing";
import { Brain, Bot, Workflow, LineChart, Repeat2, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  alternates: { canonical: "/ai-automation" },
  title: "AI & Automation for Zimbabwe Businesses",
  description:
    "AI and automation for Zimbabwe businesses: chatbots, automated workflows, and AI integrations that remove repetitive work from your team. Built on proven tools, not hype.",
};

export default function AiAutomationPage() {
  return (
    <ServiceLanding
      path="/ai-automation"
      badge="AI & Automation"
      BadgeIcon={Brain}
      title="AI & Automation in Zimbabwe"
      intro="Remove the repetitive work from your team with tools that are already proven. Chatbots, automated workflows, and AI integrations that save hours every week, built for real businesses, not buzzwords."
      serviceDescription="AI and automation services: chatbots, workflow automation, and AI integrations for Zimbabwean businesses."
      primary={{ label: "Get a Quote", href: "/contact" }}
      secondary={{ label: "Talk to Us", href: "/contact" }}
      features={[
        { icon: Bot, title: "AI Chatbots", desc: "Answer customer questions and capture leads 24/7 on your website or WhatsApp." },
        { icon: Repeat2, title: "Business Automation", desc: "Automate invoicing, reminders, reporting, and the busywork that eats your day." },
        { icon: Workflow, title: "Workflow Automation", desc: "Connect your tools so data flows automatically. No more copy-paste between systems." },
        { icon: LineChart, title: "Data Analytics", desc: "Turn the data you already collect into dashboards and decisions." },
        { icon: Sparkles, title: "AI Integration", desc: "Add AI features (summaries, classification, drafting) into your existing systems." },
        { icon: Repeat2, title: "Process Automation", desc: "Map a repetitive process once, then let it run itself." },
      ]}
      included={[
        "Built on proven, reliable tools, not experiments",
        "A fixed quote agreed before work starts",
        "Integrated with the systems you already use",
        "Secure handling of your business data",
        "Training so your team can actually use it",
        "Support after launch",
      ]}
      price={{ label: "AI & automation", value: "Custom", note: "Scoped to your workflow. Book a free consultation to get a figure." }}
    />
  );
}
