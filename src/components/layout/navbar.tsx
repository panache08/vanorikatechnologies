"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap, MessageCircle, ChevronDown } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/data";
import { cn } from "@/lib/utils";

const servicesDropdown = [
  { label: "Cybersecurity", icon: "🛡️", href: "/services#cybersecurity" },
  { label: "Web Development", icon: "🌐", href: "/services#web-development" },
  { label: "Custom Software", icon: "💻", href: "/services#software-development" },
  { label: "Mobile Apps", icon: "📱", href: "/services#mobile-apps" },
  { label: "Technical Support", icon: "🔧", href: "/services#tech-support" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setMobileOpen(false); setShowServices(false); }, [pathname]);

  return (
    <>
      <motion.header initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-navy/90 backdrop-blur-2xl border-b border-white/6 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            : "bg-transparent"
        )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-electric to-cyan flex items-center justify-center blue-glow-sm group-hover:scale-105 transition-transform">
                <Zap className="w-5 h-5 text-white" strokeWidth={2.5} />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-electric to-cyan opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
              </div>
              <div>
                <p className="font-display font-extrabold text-[15px] text-white leading-none tracking-tight">PanasheTech</p>
                <p className="text-cyan/80 text-[9px] tracking-[0.2em] font-semibold uppercase">Solutions</p>
              </div>
            </Link>

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
                        "flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-xl transition-all",
                        pathname === link.href ? "text-electric bg-electric/10" : "text-white/60 hover:text-white hover:bg-white/5"
                      )}>
                        {link.label}
                        <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", showServices && "rotate-180")} />
                      </button>
                      <AnimatePresence>
                        {showServices && (
                          <motion.div initial={{ opacity: 0, y: 8, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.96 }} transition={{ duration: 0.18 }}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 glass-strong rounded-2xl border border-white/10 p-3 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                            {servicesDropdown.map((s) => (
                              <Link key={s.href} href={s.href}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/70 hover:text-white hover:bg-white/6 transition-all text-sm font-medium">
                                <span className="text-base">{s.icon}</span>
                                {s.label}
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
                      "px-4 py-2 text-sm font-medium rounded-xl transition-all relative",
                      pathname === link.href
                        ? "text-white bg-white/8"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    )}>
                    {pathname === link.href && (
                      <motion.div layoutId="nav-active" className="absolute inset-0 rounded-xl bg-white/8 border border-white/12" />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white/70 hover:text-white border border-white/10 rounded-xl hover:border-white/20 transition-all">
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
              <Link href="/contact"
                className="flex items-center gap-2 px-5 py-2.5 bg-electric text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-all blue-glow-sm shine">
                Get a Quote
                <span className="text-cyan text-xs">→</span>
              </Link>
            </div>

            {/* Mobile toggle */}
            <button onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-10 h-10 glass rounded-xl flex items-center justify-center text-white border border-white/10">
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
            <div className="absolute inset-0 bg-navy/95 backdrop-blur-2xl" onClick={() => setMobileOpen(false)} />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-navy/98 border-l border-white/8 p-8 flex flex-col">
              <button onClick={() => setMobileOpen(false)} className="self-end mb-8 p-2 rounded-xl glass border border-white/10">
                <X className="w-5 h-5 text-white" />
              </button>
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href}
                    className={cn(
                      "py-3.5 px-4 text-base font-medium rounded-xl transition-all",
                      pathname === link.href
                        ? "text-white bg-electric/15 border border-electric/20"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    )}>
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="mt-auto space-y-3">
                <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer"
                  className="block w-full text-center py-3.5 glass border border-white/12 text-white font-semibold rounded-xl text-sm">
                  💬 WhatsApp Us
                </a>
                <Link href="/contact"
                  className="block w-full text-center py-3.5 bg-electric text-white font-semibold rounded-xl text-sm blue-glow-sm">
                  Get a Free Quote →
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
