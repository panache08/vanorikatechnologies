"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle, ChevronDown, Shield } from "lucide-react";
import { siteConfig } from "@/lib/data";
import { useEffect, useRef } from "react";

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    // Scale down work on small screens / honour reduced-motion for performance.
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const PARTICLE_COUNT = isMobile ? 28 : 70;
    const drawLines = !isMobile; // O(n²) connection lines are the costly part — desktop only

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouse = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    canvas.addEventListener("mousemove", onMouse);

    // Gold + warm nodes
    const COLORS = [
      "rgba(201,168,76,",
      "rgba(226,201,122,",
      "rgba(240,223,160,",
    ];
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x:     Math.random() * (canvas.width  || 1200),
      y:     Math.random() * (canvas.height || 800),
      vx:    (Math.random() - 0.5) * 0.35,
      vy:    (Math.random() - 0.5) * 0.35,
      size:  Math.random() * 1.8 + 0.4,
      alpha: Math.random() * 0.5 + 0.08,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        // Mouse repel
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          const force = (100 - dist) / 100;
          p.vx += (dx / dist) * force * 0.6;
          p.vy += (dy / dist) * force * 0.6;
        }
        // Dampen velocity
        p.vx *= 0.98;
        p.vy *= 0.98;

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width)  p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();

        // Connection lines — gold (desktop only; O(n²) is the expensive part)
        if (drawLines) {
          for (let j = i + 1; j < particles.length; j++) {
            const ex = particles[j].x - p.x;
            const ey = particles[j].y - p.y;
            const d  = Math.sqrt(ex * ex + ey * ey);
            if (d < 130) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = `rgba(201,168,76,${0.07 * (1 - d / 130)})`;
              ctx.lineWidth = 0.6;
              ctx.stroke();
            }
          }
        }
      });

      // Reduced-motion: render a single static frame, no animation loop.
      if (!reducedMotion) animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-50" />;
}

const TICKER_ITEMS = [
  "Penetration Testing Specialist",
  "17+ Businesses Assessed",
  "ZW DPA 2021 Compliant",
  "HackerOne Bug Bounty",
  "Bugcrowd Researcher",
  "<48hr Audit Start",
  "Based in Harare, Zimbabwe",
  "Plain-English Reports",
  "Enterprise Security. Zero Compromise.",
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y       = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <>
      <section ref={ref} className="relative min-h-screen flex flex-col overflow-hidden bg-[#07070D]">
        {/* Background layers */}
        <div className="absolute inset-0 bg-mesh-gradient" />
        <div className="absolute inset-0 bg-grid opacity-100" />
        <ParticleCanvas />

        {/* Gold orbs */}
        <motion.div style={{ y }} className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[10%] left-[5%] w-[600px] h-[600px] rounded-full bg-gold/5 blur-[140px] animate-glow-pulse" />
          <div className="absolute bottom-[15%] right-[8%] w-[400px] h-[400px] rounded-full bg-gold/4 blur-[120px] animate-glow-pulse" style={{ animationDelay: "2s" }} />
        </motion.div>

        {/* Main content */}
        <motion.div style={{ opacity }} className="relative z-10 flex-1 flex items-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-36">
          <div className="grid lg:grid-cols-2 gap-16 items-center w-full">

            {/* LEFT */}
            <div>
              {/* Pulsing badge */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <span className="inline-flex items-center gap-2 px-4 py-2 font-mono text-[10px] tracking-[0.2em] text-green border border-green/25 rounded-full bg-green/5 backdrop-blur-sm mb-8 uppercase">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green" />
                  </span>
                  Taking New Clients · Response within 2 hours
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-display font-black text-white leading-[1.05] tracking-tight mb-6"
                style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)", letterSpacing: "-0.03em" }}>
                Your Business
                <br />
                <span className="text-gradient-white">Is Probably</span>
                <br />
                <span className="relative">
                  <span className="text-gradient">Exposed Online.</span>
                  <motion.span
                    className="absolute -bottom-1 left-0 h-[2px] bg-gold-gradient"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.2, delay: 0.9 }}
                    style={{ transformOrigin: "left" }}
                  />
                </span>
                <br />
                <span className="text-white/70 font-bold" style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)" }}>
                  Let&apos;s Fix That.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-muted font-light text-lg leading-[1.75] mb-8 max-w-lg">
                Donovan Mudarikwa — penetration tester and web developer, based in Harare.{" "}
                <span className="text-white/70">We find security vulnerabilities in Zimbabwean businesses and build websites that bring in real clients.</span>
              </motion.p>

              {/* Trust badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="flex flex-wrap gap-4 mb-10">
                {[
                  "Penetration Testing Specialist",
                  "Based in Harare — same day response",
                  "Reply within 2 hours",
                ].map((t) => (
                  <div key={t} className="flex items-center gap-2 text-white/45 text-sm font-light">
                    <CheckCircle className="w-4 h-4 text-gold/70 flex-shrink-0" />
                    <span>{t}</span>
                  </div>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact"
                  className="group relative overflow-hidden flex items-center justify-center gap-2.5 px-8 py-4 bg-gold text-[#07070D] font-bold rounded-xl text-base gold-glow shine uppercase tracking-wider">
                  <Shield className="w-4 h-4" />
                  <span className="relative z-10 flex items-center gap-2">
                    Get a Free Security Check
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gold-light opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <Link href="/portfolio"
                  className="group flex items-center justify-center gap-2.5 px-8 py-4 border border-[#1A1A30] text-white/60 font-medium rounded-xl text-base hover:border-gold/30 hover:text-white hover:bg-gold/4 transition-all">
                  View Our Work
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>

            {/* RIGHT — credentials card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="relative hidden lg:block">

              <div className="absolute inset-0 bg-gold/6 blur-3xl rounded-3xl scale-95" />

              <div className="relative bg-[#0D0D1A] rounded-2xl p-8 border border-[#1A1A30] overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
                {/* Scan line */}
                <div className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent animate-scan-line pointer-events-none" />

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green/80" />
                  </div>
                  <span className="font-mono text-white/20 text-[10px] tracking-wider uppercase">vanorikatechnologies.co.zw</span>
                </div>

                {/* Founder */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-gold/30 to-gold/10 border border-gold/20 flex items-center justify-center text-xl font-black text-gold">
                      DM
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green border-2 border-[#0D0D1A] flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#07070D] animate-ping" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-white text-lg">{siteConfig.founder}</h3>
                    <p className="text-gold text-sm font-mono">{siteConfig.founderTitle}</p>
                    <p className="text-white/30 text-xs font-light">Available now · Harare, ZW</p>
                  </div>
                </div>

                {/* Quick pitch */}
                <div className="mb-6">
                  <p className="text-white/55 text-sm font-light leading-relaxed">
                    Penetration testing and professional websites for Zimbabwean businesses — clear, plain-English reports and direct, founder-led delivery.
                  </p>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[
                    { v: "17+", l: "Businesses Assessed" },
                    { v: "<48h", l: "Audit Start Time" },
                  ].map((s) => (
                    <div key={s.l} className="bg-[#111122] border border-[#1A1A30] rounded-lg p-3 text-center">
                      <p className="font-display font-black text-gold text-xl">{s.v}</p>
                      <p className="text-white/30 text-[10px] font-light mt-0.5">{s.l}</p>
                    </div>
                  ))}
                </div>

                <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer"
                  className="block w-full text-center py-3.5 bg-gold text-[#07070D] font-bold rounded-xl text-sm hover:bg-gold-light transition-colors uppercase tracking-wider">
                  💬 Chat with Donovan Directly
                </a>
              </div>

              {/* Floating chips */}
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 bg-[#0D0D1A] border border-gold/20 rounded-xl px-4 py-2.5 shadow-xl">
                <div className="flex items-center gap-2">
                  <span className="text-green text-xs">●</span>
                  <span className="font-mono text-white/60 text-xs">ZW DPA 2021 Compliant</span>
                </div>
              </motion.div>

              <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-5 -left-6 bg-[#0D0D1A] border border-gold/20 rounded-xl px-4 py-2.5 shadow-xl">
                <div className="flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-gold" />
                  <span className="font-mono text-white/60 text-xs">HackerOne · Bugcrowd</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          className="absolute bottom-28 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20 z-10">
          <span className="font-mono text-[9px] tracking-[0.25em] uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.div>

        {/* Bottom fade to ticker */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#07070D] to-transparent z-10" />
      </section>

      {/* Gold ticker band */}
      <div className="relative bg-gold/5 border-y border-gold/15 py-3 overflow-hidden">
        <div className="flex animate-ticker whitespace-nowrap">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="font-mono text-[10px] text-gold/60 tracking-[0.18em] uppercase mx-8 flex-shrink-0">
              {item} <span className="text-gold/25 mx-4">·</span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
