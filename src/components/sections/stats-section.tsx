"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { stats } from "@/lib/data";

const icons = ["🚀", "🌟", "⚡", "🛠️"];
const colors = [
  "from-blue-500 to-cyan-500",
  "from-violet-500 to-blue-500",
  "from-cyan-500 to-teal-500",
  "from-orange-500 to-red-500",
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(value); // real value on SSR; animates on scroll
  const ran = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !ran.current) {
          ran.current = true;
          observer.disconnect();

          if (value <= 2) { setN(value); return; }

          const dur = 1600;
          const start = performance.now();
          setN(0);
          const tick = (now: number) => {
            const p = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setN(Math.round(value * eased));
            if (p < 1) requestAnimationFrame(tick);
            else setN(value);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{n}{suffix}</span>;
}

export default function StatsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-navy" />
      <div className="absolute inset-0 bg-grid opacity-25" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric/40 to-transparent" />
      <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-64 h-64 bg-electric/8 rounded-full blur-3xl" />
      <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-48 h-48 bg-violet/6 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl glass border border-white/8 text-2xl mb-4 group-hover:scale-110 transition-transform">
                {icons[i]}
              </div>
              <p className={`font-display text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r ${colors[i]} bg-clip-text text-transparent`}>
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="text-white/45 text-sm tracking-wider uppercase font-medium">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
