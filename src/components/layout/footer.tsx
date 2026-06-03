import Link from "next/link";
import { Zap, MapPin, Phone, Mail, Clock, Linkedin, Twitter, Facebook, Instagram, Github } from "lucide-react";
import { siteConfig, navLinks, services } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-navy border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-6">
              <div className="w-9 h-9 rounded-lg bg-electric-gradient flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-display font-bold text-base text-white leading-none">Panashe Tech</p>
                <p className="text-cyan text-[10px] tracking-widest">SOLUTIONS</p>
              </div>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Premium technology solutions for businesses in Zimbabwe and beyond. We transform ideas into powerful digital products.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Linkedin, href: siteConfig.social.linkedin },
                { icon: Twitter, href: siteConfig.social.twitter },
                { icon: Facebook, href: siteConfig.social.facebook },
                { icon: Instagram, href: siteConfig.social.instagram },
                { icon: Github, href: siteConfig.social.github },
              ].map(({ icon: Icon, href }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg glass border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-electric/40 transition-all">
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-white mb-6 relative">
              Quick Links <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-electric" />
            </h3>
            <ul className="space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/50 hover:text-cyan text-sm transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-electric/50" />{l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display font-semibold text-white mb-6 relative">
              Services <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-electric" />
            </h3>
            <ul className="space-y-3">
              {services.slice(0, 6).map((s) => (
                <li key={s.id}>
                  <Link href={s.href} className="text-white/50 hover:text-cyan text-sm transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-electric/50" />{s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-white mb-6 relative">
              Contact <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-electric" />
            </h3>
            <ul className="space-y-4">
              {[
                { icon: MapPin, value: siteConfig.address },
                { icon: Phone, value: siteConfig.phone, href: `tel:${siteConfig.phone}` },
                { icon: Mail, value: siteConfig.email, href: `mailto:${siteConfig.email}` },
                { icon: Clock, value: siteConfig.hours },
              ].map(({ icon: Icon, value, href }) => (
                <li key={value} className="flex items-start gap-3">
                  <Icon className="w-4 h-4 text-electric mt-0.5 shrink-0" />
                  {href ? <a href={href} className="text-white/50 text-sm hover:text-cyan transition-colors">{value}</a>
                    : <span className="text-white/50 text-sm">{value}</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">© {new Date().getFullYear()} Panashe Tech Solutions. All rights reserved. Built by Panashe Party.</p>
          <div className="flex gap-6">
            {[{ l: "Privacy Policy", h: "/privacy" }, { l: "Terms of Service", h: "/terms" }].map((i) => (
              <Link key={i.h} href={i.h} className="text-white/30 hover:text-cyan text-xs transition-colors">{i.l}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
