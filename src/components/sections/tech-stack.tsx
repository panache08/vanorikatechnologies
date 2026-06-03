"use client";
import { motion } from "framer-motion";
import { techStack } from "@/lib/data";
import SectionHeader from "@/components/ui/section-header";

const categoryColors: Record<string, string> = {
  Frontend: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Backend: "bg-green-500/10 text-green-400 border-green-500/20",
  Database: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Cloud: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  DevOps: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  Mobile: "bg-pink-500/10 text-pink-400 border-pink-500/20",
};

export default function TechStack() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader badge="TECH STACK" title="Technologies" titleGradient="We Use"
          subtitle="We work with modern, industry-leading technologies to build powerful, scalable solutions." />
        <div className="mt-16 flex flex-wrap justify-center gap-4">
          {techStack.map((tech, i) => (
            <motion.div key={tech.name} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ delay: i * 0.04 }}
              whileHover={{ scale: 1.05 }}
              className={`px-5 py-2.5 rounded-full border text-sm font-semibold ${categoryColors[tech.category]} cursor-default`}>
              {tech.name}
            </motion.div>
          ))}
        </div>
        <div className="mt-8 flex justify-center gap-6 flex-wrap">
          {Object.keys(categoryColors).map((cat) => (
            <div key={cat} className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${categoryColors[cat].split(" ")[0].replace("bg-", "bg-").replace("/10", "/60")}`} />
              <span className="text-muted-foreground text-xs">{cat}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
