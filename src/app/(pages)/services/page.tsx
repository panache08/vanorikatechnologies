import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import CTABanner from "@/components/sections/cta-banner";
import type { Metadata } from "next";
import Link from "next/link";
import SectionHeader from "@/components/ui/section-header";
import {
  Globe, Code2, Smartphone, Shield, Brain, ArrowRight,
  ScanSearch, FileText, Network, UserX, Lock, Radio,
  LayoutTemplate, ShoppingCart, SearchCheck, BarChart3, Plug, MonitorSmartphone,
  Database, Layers, Cpu, GitBranch, LayoutDashboard, Workflow,
  AppWindow, Bell, Wifi, PackageCheck, Store,
  Bot, Zap, Repeat2, LineChart, Link2, SlidersHorizontal,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Services",
  description: "Penetration testing, web development, custom software, mobile apps, and AI automation — delivered by a CompTIA PenTest+ certified professional in Harare, Zimbabwe.",
};

const services = [
  {
    id: "cybersecurity",
    icon: Shield,
    color: "from-red-500/20 to-orange-500/20",
    iconColor: "text-red-400",
    borderColor: "border-red-500/20 hover:border-red-400/40",
    accentColor: "bg-red-500/10",
    label: "SECURITY",
    title: "Cybersecurity & Penetration Testing",
    description: "We attack your systems the way a real threat actor would — then hand you a plain-English report with every gap and exactly how to close it.",
    features: [
      { icon: ScanSearch,    label: "Penetration Testing",       desc: "Manual exploitation of web apps, APIs, and network perimeter" },
      { icon: Network,       label: "Network Vulnerability Scan", desc: "Port-level enumeration and CVE mapping against live infrastructure" },
      { icon: UserX,         label: "Phishing Simulation",        desc: "Controlled credential-harvest campaign to measure staff risk" },
      { icon: Lock,          label: "Authentication Review",      desc: "Session handling, token entropy, MFA bypass checks" },
      { icon: FileText,      label: "Remediation Report",         desc: "Findings ranked by CVSS score with fix-by-fix action plan" },
      { icon: Radio,         label: "Post-Fix Retest",            desc: "Verify every high/critical finding is fully closed" },
    ],
  },
  {
    id: "web-development",
    icon: Globe,
    color: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-400",
    borderColor: "border-blue-500/20 hover:border-blue-400/40",
    accentColor: "bg-blue-500/10",
    label: "WEB",
    title: "Website Development",
    description: "Professional websites delivered in 1–2 weeks. Fast, mobile-ready, and built to generate enquiries — not just sit there looking good.",
    features: [
      { icon: LayoutTemplate,    label: "Business Websites",      desc: "Multi-page sites with contact, pricing, services and blog" },
      { icon: ShoppingCart,      label: "E-Commerce",             desc: "Product catalogue, cart, checkout and payment gateway" },
      { icon: SearchCheck,       label: "On-Page SEO",            desc: "Meta tags, sitemap, structured data and Core Web Vitals" },
      { icon: MonitorSmartphone, label: "Mobile-Responsive",      desc: "Pixel-perfect on every viewport, tested on real devices" },
      { icon: BarChart3,         label: "Analytics Setup",        desc: "Google Analytics 4 with conversion tracking from day one" },
      { icon: Plug,              label: "CMS Integration",        desc: "Headless CMS so your team can update content without code" },
    ],
  },
  {
    id: "software-development",
    icon: Code2,
    color: "from-violet-500/20 to-blue-500/20",
    iconColor: "text-violet-400",
    borderColor: "border-violet-500/20 hover:border-violet-400/40",
    accentColor: "bg-violet-500/10",
    label: "SOFTWARE",
    title: "Custom Software Development",
    description: "Business systems, dashboards and internal tools built around how your company actually operates. Quoted before we start — no scope creep.",
    features: [
      { icon: LayoutDashboard, label: "Admin Dashboards",         desc: "Role-based control panels with charts, filters and exports" },
      { icon: Database,        label: "Database Design",          desc: "Relational schema, indexing strategy and migration scripts" },
      { icon: GitBranch,       label: "API Development",          desc: "REST APIs with auth, rate-limiting and full OpenAPI docs" },
      { icon: Layers,          label: "System Integration",       desc: "Connect your ERP, CRM, payment and third-party services" },
      { icon: Cpu,             label: "Business Automation",      desc: "Replace manual processes with rule-based background jobs" },
      { icon: Workflow,        label: "Custom Workflows",         desc: "Approval chains, notifications and audit trails built in" },
    ],
  },
  {
    id: "mobile-apps",
    icon: Smartphone,
    color: "from-cyan-500/20 to-teal-500/20",
    iconColor: "text-cyan-400",
    borderColor: "border-cyan-500/20 hover:border-cyan-400/40",
    accentColor: "bg-cyan-500/10",
    label: "MOBILE",
    title: "Mobile Applications",
    description: "Android and cross-platform apps built with React Native. We handle design, development and Play Store deployment — you get the finished product.",
    features: [
      { icon: AppWindow,     label: "Android & iOS",             desc: "Single React Native codebase targeting both platforms" },
      { icon: Store,         label: "App Store Deployment",      desc: "Play Store and App Store submission handled for you" },
      { icon: Bell,          label: "Push Notifications",        desc: "Targeted alerts via Firebase Cloud Messaging" },
      { icon: Wifi,          label: "Offline-First Mode",        desc: "Local storage sync so the app works without internet" },
      { icon: PackageCheck,  label: "OTA Updates",               desc: "Ship JS updates instantly without going through the store" },
      { icon: MonitorSmartphone, label: "Responsive UI",         desc: "Adaptive layouts for tablets, foldables and small screens" },
    ],
  },
  {
    id: "ai-solutions",
    icon: Brain,
    color: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400",
    borderColor: "border-purple-500/20 hover:border-purple-400/40",
    accentColor: "bg-purple-500/10",
    label: "AI",
    title: "AI & Automation",
    description: "Chatbots, automated workflows and AI integrations that strip repetitive work from your team. Built on proven tools — deployed fast.",
    features: [
      { icon: Bot,            label: "AI Chatbots",              desc: "Context-aware bots trained on your docs, FAQs and products" },
      { icon: Zap,            label: "Workflow Automation",      desc: "Trigger-based pipelines that replace manual back-office tasks" },
      { icon: Repeat2,        label: "Process Automation",       desc: "Scheduled jobs, email parsing and data-entry elimination" },
      { icon: LineChart,      label: "Data Analytics",           desc: "Automated reports and dashboards from your existing data" },
      { icon: Link2,          label: "AI Integration",           desc: "Claude, GPT and open-source models wired into your stack" },
      { icon: SlidersHorizontal, label: "Custom Fine-Tuning",    desc: "Domain-specific model tuning for your industry and terminology" },
    ],
  },
];

export default function ServicesPage() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-40 pb-24 bg-[#07070D] overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 text-xs font-mono tracking-widest text-gold border border-gold/25 rounded-full bg-gold/5 mb-6 uppercase">
            What We Offer
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">Our Services</h1>
          <p className="text-white/50 text-lg font-light">Five services. Quoted honestly. Delivered on time.</p>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-[#07070D]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {services.map((svc) => {
            const MainIcon = svc.icon;
            return (
              <div
                key={svc.id}
                id={svc.id}
                className={`rounded-2xl border ${svc.borderColor} bg-[#0D0D1A] overflow-hidden transition-colors duration-300`}
              >
                {/* Header */}
                <div className={`px-8 py-7 bg-gradient-to-r ${svc.color} border-b border-white/5`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl ${svc.accentColor} flex items-center justify-center border border-white/10 shrink-0`}>
                      <MainIcon className={`w-6 h-6 ${svc.iconColor}`} />
                    </div>
                    <div>
                      <span className={`font-mono text-[10px] tracking-[0.2em] uppercase ${svc.iconColor} opacity-70`}>
                        {svc.label}
                      </span>
                      <h2 className="font-display text-xl md:text-2xl font-bold text-white leading-tight">
                        {svc.title}
                      </h2>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="px-8 py-8">
                  <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-2xl font-light">
                    {svc.description}
                  </p>

                  {/* Feature grid */}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
                    {svc.features.map((f) => {
                      const FIcon = f.icon;
                      return (
                        <div
                          key={f.label}
                          className="flex gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors group"
                        >
                          <div className={`w-8 h-8 rounded-lg ${svc.accentColor} flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform`}>
                            <FIcon className={`w-4 h-4 ${svc.iconColor}`} />
                          </div>
                          <div>
                            <p className="text-white/80 text-xs font-semibold mb-0.5">{f.label}</p>
                            <p className="text-white/30 text-xs leading-relaxed font-light">{f.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-gold text-[#07070D] font-bold rounded-xl hover:bg-gold/90 transition-all text-sm"
                  >
                    Get a Quote <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <CTABanner />
      <Footer />
    </main>
  );
}
