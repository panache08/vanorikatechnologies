import Link from "next/link";
import { Zap, MapPin, Phone, Mail, Clock, Linkedin, Twitter, Facebook, Instagram, Github } from "lucide-react";
import { siteConfig, navLinks, services } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative bg-navy border-t border-white/5">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric/30 to-transparent" />
      <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-electric to-cyan flex items-center justify-center blue-glow-sm group-hover:scale-105 transition-transform">
                <Zap className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <p className="font-display font-extrabold text-[15px] text-white leading-none">PanasheTech</p>
                <p className="text-cyan/80 text-[9px] tracking-[0.2em] font-semibold uppercase mt-0.5">Solutions</p>
              </div>
            </Link>
            <p className="text-white/45 text-sm leading-relaxed mb-7">
              Websites, software, and cybersecurity — built and delivered by a founder who answers his own phone. Based in Harare, working everywhere.
            </p>
            <div className="flex items-center gap-2.5">
              {[
                { icon: Linkedin, href: siteConfig.social.linkedin },
                { icon: Twitter, href: siteConfig.social.twitter },
                { icon: Facebook, href: siteConfig.social.facebook },
                { icon: Instagram, href: siteConfig.social.instagram },
                { icon: Github, href: siteConfig.social.github },
              ].map(({ icon: Icon, href }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl glass border border-white/8 flex items-center justify-center text-white/35 hover:text-white hover:border-electric/40 hover:bg-electric/8 transition-all">
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-white text-sm mb-6 uppercase tracking-widest">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/45 hover:text-cyan text-sm transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-electric/40 group-hover:bg-cyan transition-colors" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display font-semibold text-white text-sm mb-6 uppercase tracking-widest">
              Services
            </h3>
            <ul className="space-y-3">
              {services.slice(0, 6).map((s) => (
                <li key={s.id}>
                  <Link href={s.href} className="text-white/45 hover:text-cyan text-sm transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-electric/40 group-hover:bg-cyan transition-colors" />
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-white text-sm mb-6 uppercase tracking-widest">
              Contact
            </h3>
            <ul className="space-y-4">
              {[
                { icon: MapPin, value: siteConfig.address },
                { icon: Phone, value: siteConfig.phone, href: `tel:${siteConfig.phone}` },
                { icon: Mail, value: siteConfig.email, href: `mailto:${siteConfig.email}` },
                { icon: Clock, value: siteConfig.hours },
              ].map(({ icon: Icon, value, href }) => (
                <li key={value} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-electric/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-3.5 h-3.5 text-electric" />
                  </div>
                  {href
                    ? <a href={href} className="text-white/45 text-sm hover:text-cyan transition-colors leading-relaxed">{value}</a>
                    : <span className="text-white/45 text-sm leading-relaxed">{value}</span>
                  }
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs">
            © {new Date().getFullYear()} Panashe Tech Solutions. All rights reserved.
          </p>
          <div className="flex gap-6">
            {[{ l: "Privacy Policy", h: "/privacy" }, { l: "Terms of Service", h: "/terms" }].map((i) => (
              <Link key={i.h} href={i.h} className="text-white/25 hover:text-cyan text-xs transition-colors">{i.l}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
