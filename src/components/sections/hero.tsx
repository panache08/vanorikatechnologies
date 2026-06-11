"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle, Zap, Star, Play, ChevronDown } from "lucide-react";
import { siteConfig } from "@/lib/data";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number; color: string }[] = [];
    const colors = ["rgba(74,144,255,", "rgba(0,212,255,", "rgba(124,58,237,"];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.6 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();

        // Connection lines
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - p.x;
          const dy = particles[j].y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(74,144,255,${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />;
}

const words = ["Websites", "Mobile Apps", "AI Systems", "Software", "Automation"];

export default function Hero() {
  const [email, setEmail] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    const t = setInterval(() => setWordIndex((i) => (i + 1) % words.length), 2800);
    return () => clearInterval(t);
  }, []);

  const handleLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Thanks! We'll be in touch within 24 hours.");
    setEmail("");
  };

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy">
      {/* Layered backgrounds */}
      <div className="absolute inset-0 bg-mesh-gradient" />
      <div className="absolute inset-0 bg-grid opacity-100" />
      <ParticleCanvas />

      {/* Large glowing orbs */}
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[15%] left-[10%] w-[500px] h-[500px] rounded-full bg-electric/10 blur-[120px] animate-glow-pulse" />
        <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full bg-violet/8 blur-[100px] animate-glow-pulse" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-[40%] right-[25%] w-[300px] h-[300px] rounded-full bg-cyan/6 blur-[80px] animate-glow-pulse" style={{ animationDelay: "3s" }} />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-36">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* LEFT */}
          <div>
            {/* Badge */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-[0.15em] text-cyan border border-cyan/25 rounded-full bg-cyan/5 backdrop-blur-sm mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan" />
                </span>
                COMPTIA PENTEST+ CERTIFIED · HARARE, ZIMBABWE
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-5xl md:text-6xl xl:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-4">
              Your Business
              <br />
              <span className="text-gradient-white">Is Probably</span>
              <br />
              <span className="relative">
                <span className="text-gradient">Exposed.</span>
                <motion.span
                  className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-electric via-cyan to-violet"
                  initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.2, delay: 0.8 }}
                  style={{ transformOrigin: "left" }}
                />
              </span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              className="text-white/60 text-lg md:text-xl leading-relaxed mb-8 max-w-lg">
              Most Zimbabwean businesses have never had a security test.{" "}
              <span className="text-white/80 font-medium">I&apos;ll find your vulnerabilities before someone else does — CompTIA PenTest+ certified. One of a handful in the country.</span>
            </motion.p>

            {/* Trust indicators */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
              className="flex flex-wrap gap-5 mb-10">
              {["CompTIA Security+ Certified", "CompTIA PenTest+", "CompTIA A+"].map((t) => (
                <div key={t} className="flex items-center gap-2 text-white/50 text-sm">
                  <CheckCircle className="w-4 h-4 text-cyan flex-shrink-0" />
                  <span>{t}</span>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link href="/contact"
                className="group relative overflow-hidden flex items-center justify-center gap-2.5 px-8 py-4 bg-electric text-white font-semibold rounded-2xl text-base blue-glow shine">
                <span className="relative z-10 flex items-center gap-2">
                  Get a Free Security Check
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-electric to-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link href="/portfolio"
                className="group flex items-center justify-center gap-2.5 px-8 py-4 glass border border-white/12 text-white font-semibold rounded-2xl text-base hover:border-electric/40 hover:bg-white/5 transition-all">
                <Play className="w-4 h-4 text-cyan" />
                View Our Work
              </Link>
            </motion.div>

            {/* Lead form */}
            <motion.form onSubmit={handleLead} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
              className="flex gap-2 max-w-md">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email — I'll respond within 2 hours"
                className="flex-1 px-4 py-3 glass border border-white/12 rounded-xl text-white placeholder-white/30 focus:border-electric/50 focus:outline-none text-sm bg-white/3" />
              <button type="submit"
                className="px-5 py-3 bg-gradient-to-r from-cyan to-electric text-white font-semibold rounded-xl hover:opacity-90 transition-opacity text-sm whitespace-nowrap">
                Get Quote
              </button>
            </motion.form>

            {/* Star rating */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
              className="flex items-center gap-3 mt-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                ))}
              </div>
              <span className="text-white/40 text-sm">Taking new clients · Response within 2 hours</span>
            </motion.div>
          </div>

          {/* RIGHT — Dashboard card */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.3 }}
            className="relative hidden lg:block">
            {/* Main card */}
            <div className="relative">
              {/* Glow behind card */}
              <div className="absolute inset-0 bg-electric/10 blur-3xl rounded-3xl scale-95" />

              <div className="relative glass-strong rounded-3xl p-8 border border-white/10 card-premium overflow-hidden">
                {/* Scan line effect */}
                <div className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan/30 to-transparent animate-scan-line pointer-events-none" />

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-white/30 text-xs font-mono">panashe.tech</span>
                </div>

                {/* Founder */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-electric to-cyan flex items-center justify-center text-2xl font-bold text-white blue-glow-sm">
                      DM
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-400 border-2 border-navy flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white animate-ping" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">{siteConfig.founder}</h3>
                    <p className="text-cyan text-sm">{siteConfig.founderTitle}</p>
                    <p className="text-white/40 text-xs">Available now</p>
                  </div>
                </div>

                {/* Services mini grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[
                    { label: "Web Dev", color: "from-blue-600 to-cyan-500", icon: "🌐" },
                    { label: "Mobile Apps", color: "from-violet-600 to-blue-500", icon: "📱" },
                    { label: "AI & Automation", color: "from-purple-600 to-pink-500", icon: "🤖" },
                    { label: "Cybersecurity", color: "from-red-500 to-orange-500", icon: "🛡️" },
                  ].map((s) => (
                    <div key={s.label} className={`rounded-xl bg-gradient-to-br ${s.color} p-3 opacity-80 hover:opacity-100 transition-opacity cursor-default`}>
                      <span className="text-lg">{s.icon}</span>
                      <p className="text-white text-xs font-semibold mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>

                <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer"
                  className="block w-full text-center py-3.5 bg-gradient-to-r from-electric to-cyan text-white font-semibold rounded-xl text-sm hover:opacity-90 transition-opacity blue-glow-sm">
                  💬 Chat with Donovan Directly
                </a>
              </div>
            </div>

            {/* Floating chips */}
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-8 -right-8 glass rounded-2xl px-4 py-3 border border-white/10 shadow-card-premium">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1">{["⭐","⭐","⭐","⭐","⭐"].map((s, i) => <span key={i} className="text-xs">{s}</span>)}</div>
                <span className="text-white text-xs font-semibold">5.0 Rating</span>
              </div>
            </motion.div>

            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-6 -left-8 glass rounded-2xl px-4 py-3 border border-cyan/20 shadow-card-premium">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan" />
                <span className="text-white text-xs font-semibold">Delivered in days, not months</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 z-10">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
}
