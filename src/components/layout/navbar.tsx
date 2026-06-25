"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Shield } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/data";
import { cn } from "@/lib/utils";

const servicesDropdown = [
  { label: "Cybersecurity", icon: "🛡️", href: "/services#cybersecurity" },
  { label: "Web Development", icon: "🌐", href: "/services#web-development" },
  { label: "Custom Software", icon: "💻", href: "/services#software-development" },
  { label: "Mobile Apps", icon: "📱", href: "/services#mobile-apps" },
  { label: "AI & Automation", icon: "🤖", href: "/services#ai-solutions" },
  { label: "Casino Suite", icon: "🎰", href: "/casino" },
  { label: "Free Security Tools", icon: "🔍", href: "/tools" },
];

function VanorikaLogo() {
  return (
    <Link href="/" className="flex items-center gap-3 group">
      {/* Hex shield icon */}
      <div className="relative w-10 h-10 flex items-center justify-center gold-glow-sm group-hover:scale-105 transition-transform">
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
          <path d="M20 2L36 11V29L20 38L4 29V11L20 2Z" fill="#0D0D1A" stroke="#C9A84C" strokeWidth="1.5"/>
          <path d="M20 2L36 11V29L20 38L4 29V11L20 2Z" fill="url(#hex-fill)" fillOpacity="0.15"/>
          {/* V mark */}
          <path d="M13 14L20 26L27 14" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <defs>
            <linearGradient id="hex-fill" x1="4" y1="2" x2="36" y2="38" gradientUnits="userSpaceOnUse">
              <stop stopColor="#C9A84C"/>
              <stop offset="1" stopColor="#E2C97A"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div>
        <p className="font-display font-black text-[15px] tracking-[0.08em] text-white leading-none uppercase">VANORIKA</p>
        <p className="font-mono text-[8px] tracking-[0.25em] text-gold/70 uppercase mt-0.5">Technologies</p>
      </div>
    </Link>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setMobileOpen(false); setShowServices(false); }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-[#07070D]/90 backdrop-blur-2xl border-b border-[#1A1A30] shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
            : "bg-transparent"
        )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <VanorikaLogo />

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isServices = link.label === "Services";
                if (isServices) {
                  return (
                    <div key={link.href} className="relative"
                      onMouseEnter={() => setShowServices(true)}
                      onMouseLeave={() => setShowServices(false)}>
                      <button className={cn(
                        "flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-all",
                        pathname === link.href
                          ? "text-gold"
                          : "text-white/50 hover:text-white/90"
                      )}>
                        {link.label}
                        <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", showServices && "rotate-180")} />
                      </button>
                      <AnimatePresence>
                        {showServices && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.97 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-60 bg-[#0D0D1A] rounded-xl border border-[#1A1A30] p-2 shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
                            {servicesDropdown.map((s) => (
                              <Link key={s.href} href={s.href}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/55 hover:text-white hover:bg-[#C9A84C]/6 transition-all text-sm font-medium group">
                                <span className="text-base">{s.icon}</span>
                                <span className="group-hover:text-gold transition-colors">{s.label}</span>
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }
                return (
                  <Link key={link.href} href={link.href}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium rounded-lg transition-all",
                      pathname === link.href
                        ? "text-gold"
                        : "text-white/50 hover:text-white/90"
                    )}>
                    {pathname === link.href && (
                      <motion.div
                        layoutId="nav-active"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-gold rounded-full"
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white/50 hover:text-white/90 transition-all">
                <Shield className="w-4 h-4 text-gold" />
                WhatsApp
              </a>
              <Link href="/contact"
                className="flex items-center gap-2 px-5 py-2.5 bg-gold text-[#07070D] text-sm font-bold rounded-lg hover:bg-gold-light transition-all gold-glow-sm uppercase tracking-wider">
                GET FREE ASSESSMENT
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="lg:hidden w-10 h-10 border border-[#1A1A30] rounded-lg flex items-center justify-center text-white/60 bg-[#0D0D1A]">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden">
            <div className="absolute inset-0 bg-[#07070D]/95 backdrop-blur-2xl" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-[#0D0D1A] border-l border-[#1A1A30] p-8 flex flex-col">
              <button onClick={() => setMobileOpen(false)} className="self-end mb-8 p-2 rounded-lg border border-[#1A1A30]">
                <X className="w-5 h-5 text-white/60" />
              </button>
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href}
                    className={cn(
                      "py-3.5 px-4 text-base font-medium rounded-lg transition-all",
                      pathname === link.href
                        ? "text-gold bg-gold/8 border border-gold/20"
                        : "text-white/55 hover:text-white hover:bg-white/4"
                    )}>
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="mt-auto space-y-3">
                <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer"
                  className="block w-full text-center py-3.5 border border-[#1A1A30] text-white/60 font-medium rounded-lg text-sm">
                  💬 WhatsApp Us
                </a>
                <Link href="/contact"
                  className="block w-full text-center py-3.5 bg-gold text-[#07070D] font-bold rounded-lg text-sm uppercase tracking-wider">
                  GET FREE ASSESSMENT
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
