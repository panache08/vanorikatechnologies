import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Instagram, Linkedin } from "lucide-react";
import { siteConfig, navLinks } from "@/lib/data";

const footerServices = [
  { label: "Penetration Testing", href: "/penetration-testing" },
  { label: "Web Development", href: "/web-development" },
  { label: "Custom Software", href: "/custom-software" },
  { label: "Mobile Apps", href: "/mobile-apps" },
  { label: "AI & Automation", href: "/ai-automation" },
];

const footerIndustries = [
  { label: "Law Firms", href: "/security-for-law-firms" },
  { label: "Travel Agencies", href: "/security-for-travel-agencies" },
  { label: "Healthcare", href: "/security-for-healthcare" },
  { label: "Casinos", href: "/casino" },
];

function VanorikaFooterLogo() {
  return (
    <Link href="/" className="flex items-center gap-3 group mb-6">
      <div className="relative w-9 h-9 flex items-center justify-center group-hover:scale-105 transition-transform">
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9">
          <path d="M20 2L36 11V29L20 38L4 29V11L20 2Z" fill="#0D0D1A" stroke="#C9A84C" strokeWidth="1.5"/>
          <path d="M13 14L20 26L27 14" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div>
        <p className="font-display font-black text-[14px] tracking-[0.08em] text-white leading-none uppercase">VANORIKA</p>
        <p className="font-mono text-[8px] tracking-[0.25em] text-gold/60 uppercase mt-0.5">Technologies</p>
      </div>
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="relative bg-[#07070D] border-t border-[#1A1A30]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <VanorikaFooterLogo />
            <p className="text-muted text-sm leading-relaxed mb-2 font-light">
              {siteConfig.tagline}
            </p>
            <p className="text-white/30 text-xs leading-relaxed mb-7 font-light">
              Penetration testing and web development — Harare-based, founder-led.
            </p>
            <div className="flex items-center gap-2">
              {[
                { icon: Instagram, href: siteConfig.social.instagram, label: "Vanorika Technologies on Instagram" },
                { icon: Linkedin,  href: siteConfig.social.linkedin,  label: "Donovan Mudarikwa on LinkedIn" },
              ].map(({ icon: Icon, href, label }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-9 h-9 rounded-lg border border-[#1A1A30] flex items-center justify-center text-white/25 hover:text-gold hover:border-gold/30 hover:bg-gold/5 transition-all">
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-mono text-[10px] font-semibold text-gold/70 mb-6 uppercase tracking-[0.2em]">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                ...navLinks,
                { label: "Book a Call", href: "/book" },
                { label: "Free Monitoring", href: "/monitoring" },
                { label: "Free Clinic", href: "/clinic" },
                { label: "Refer & Earn", href: "/referral" },
                { label: "Free Security Report", href: "/report" },
                { label: "ZW Security Index", href: "/security-index" },
                { label: "2026 Security Report", href: "/research/zimbabwe-web-security-2026" },
                { label: "Free Tools", href: "/tools" },
                { label: "Cost Estimator", href: "/cost-estimator" },
                { label: "Security Guide", href: "/cybersecurity-zimbabwe" },
                { label: "Case Studies", href: "/case-studies" },
                { label: "Resources", href: "/resources" },
                { label: "Glossary", href: "/security-glossary" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href}
                    className="text-white/35 hover:text-gold text-sm transition-colors flex items-center gap-2 group font-light">
                    <span className="w-3 h-px bg-gold/20 group-hover:bg-gold group-hover:w-4 transition-all" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-mono text-[10px] font-semibold text-gold/70 mb-6 uppercase tracking-[0.2em]">
              Services
            </h3>
            <ul className="space-y-3">
              {footerServices.map((s) => (
                <li key={s.href}>
                  <Link href={s.href}
                    className="text-white/35 hover:text-gold text-sm transition-colors flex items-center gap-2 group font-light">
                    <span className="w-3 h-px bg-gold/20 group-hover:bg-gold group-hover:w-4 transition-all" />
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h3 className="font-mono text-[10px] font-semibold text-gold/70 mb-6 uppercase tracking-[0.2em]">
              Industries
            </h3>
            <ul className="space-y-3">
              {footerIndustries.map((s) => (
                <li key={s.href}>
                  <Link href={s.href}
                    className="text-white/35 hover:text-gold text-sm transition-colors flex items-center gap-2 group font-light">
                    <span className="w-3 h-px bg-gold/20 group-hover:bg-gold group-hover:w-4 transition-all" />
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-mono text-[10px] font-semibold text-gold/70 mb-6 uppercase tracking-[0.2em]">
              Contact
            </h3>
            <ul className="space-y-4">
              {[
                { icon: MapPin, value: siteConfig.address },
                { icon: Phone,  value: siteConfig.phone, href: `tel:${siteConfig.phone}` },
                { icon: Mail,   value: siteConfig.email, href: `mailto:${siteConfig.email}` },
                { icon: Clock,  value: siteConfig.hours },
              ].map(({ icon: Icon, value, href }) => (
                <li key={value} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-gold/8 border border-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-3.5 h-3.5 text-gold/60" />
                  </div>
                  {href
                    ? <a href={href} className="text-white/35 text-sm hover:text-gold transition-colors leading-relaxed font-light">{value}</a>
                    : <span className="text-white/35 text-sm leading-relaxed font-light">{value}</span>
                  }
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-[#1A1A30]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] text-white/20 tracking-wider">
            © {new Date().getFullYear()} VANORIKA TECHNOLOGIES. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-6">
            {[
              { l: "Privacy Policy",    h: "/privacy" },
              { l: "Terms of Service",  h: "/terms" },
              { l: "Security",          h: "/security" },
              { l: "Status",            h: "/status" },
            ].map((i) => (
              <Link key={i.h} href={i.h}
                className="font-mono text-[10px] text-white/20 hover:text-gold/60 transition-colors tracking-wider uppercase">
                {i.l}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
