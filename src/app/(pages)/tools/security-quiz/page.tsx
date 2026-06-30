"use client";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { useState } from "react";
import { ShieldCheck, Check, X, RotateCcw, MessageCircle, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/data";

const questions = [
  "Does your website load over HTTPS with a valid SSL certificate?",
  "Do you have SPF and DMARC records so no one can spoof your email?",
  "Is your website software (CMS, plugins, server) updated within the last 3 months?",
  "Do all admin/staff accounts use two-factor authentication (2FA)?",
  "Do you have a published privacy policy (Data Protection Act 2021)?",
  "Do you take regular, tested backups of your website and data?",
  "Have you ever had a professional security assessment of your systems?",
  "Do staff get any training on spotting phishing emails?",
  "Are strong, unique passwords enforced (not reused across accounts)?",
  "Do you know which subdomains and services of yours are exposed online?",
];

function band(score: number) {
  if (score >= 80) return { label: "Strong", color: "text-green", desc: "You're ahead of most Zimbabwean SMEs. A professional assessment would confirm it and close any blind spots." };
  if (score >= 50) return { label: "At Risk", color: "text-gold", desc: "You have real, fixable gaps that an attacker could find. Worth tightening before they're exploited." };
  return { label: "Exposed", color: "text-red-500", desc: "The basics aren't in place. Treat this as urgent — most breaches start exactly here." };
}

export default function SecurityQuiz() {
  const [answers, setAnswers] = useState<(boolean | null)[]>(Array(questions.length).fill(null));
  const [done, setDone] = useState(false);

  const set = (i: number, v: boolean) => setAnswers((a) => a.map((x, j) => (j === i ? v : x)));
  const answered = answers.filter((a) => a !== null).length;
  const yes = answers.filter((a) => a === true).length;
  const score = Math.round((yes / questions.length) * 100);
  const b = band(score);

  const reset = () => { setAnswers(Array(questions.length).fill(null)); setDone(false); };

  return (
    <main>
      <Navbar />
      <section className="relative pt-40 pb-16 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-6">
            <ShieldCheck className="w-3.5 h-3.5" /> 2-MINUTE QUIZ
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">How Cyber-Safe Is Your Business?</h1>
          <p className="text-white/60 text-lg">Answer 10 honest questions and get your security score — no email required.</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {!done ? (
            <>
              <div className="h-1.5 bg-card rounded-full overflow-hidden mb-8">
                <div className="h-full bg-gold transition-all" style={{ width: `${(answered / questions.length) * 100}%` }} />
              </div>
              <div className="space-y-4">
                {questions.map((q, i) => (
                  <div key={i} className="bg-card border border-border rounded-2xl p-5">
                    <p className="text-foreground text-sm font-medium mb-3"><span className="text-gold font-mono mr-2">{i + 1}.</span>{q}</p>
                    <div className="flex gap-2">
                      {[["Yes", true], ["No", false]].map(([label, val]) => (
                        <button key={label as string} onClick={() => set(i, val as boolean)}
                          className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${answers[i] === val ? (val ? "bg-green/15 text-green border border-green/30" : "bg-red-500/15 text-red-500 border border-red-500/30") : "bg-background border border-border text-muted-foreground hover:text-foreground"}`}>
                          {label as string}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => setDone(true)} disabled={answered < questions.length}
                className="mt-8 w-full py-4 bg-gold text-[#07070D] font-bold rounded-xl hover:bg-gold-light transition-all disabled:opacity-50 text-sm gold-glow-sm">
                {answered < questions.length ? `Answer all ${questions.length} questions (${answered}/${questions.length})` : "See my score"}
              </button>
            </>
          ) : (
            <div className="bg-card border border-border rounded-3xl p-8 text-center">
              <p className="text-muted-foreground text-sm uppercase tracking-widest mb-2">Your security score</p>
              <p className={`font-display font-black text-6xl mb-1 ${b.color}`}>{score}<span className="text-2xl text-muted-foreground">/100</span></p>
              <p className={`font-display text-xl font-bold mb-4 ${b.color}`}>{b.label}</p>
              <p className="text-muted-foreground leading-relaxed max-w-md mx-auto mb-8">{b.desc}</p>

              <div className="text-left bg-background border border-border rounded-2xl p-5 mb-8">
                <p className="text-foreground font-medium text-sm mb-3">Where to focus first:</p>
                <ul className="space-y-2">
                  {questions.map((q, i) => answers[i] === false && (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" /> {q}
                    </li>
                  ))}
                  {yes === questions.length && <li className="flex items-center gap-2 text-sm text-green"><Check className="w-4 h-4" /> Nothing flagged — excellent. Confirm it with a professional assessment.</li>}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(`Hi Donovan, I scored ${score}/100 (${b.label}) on your cyber-safety quiz, with ${questions.length - yes} area(s) flagged. Can you help me improve my security?`)}`} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-[#07070D] font-bold rounded-xl hover:bg-gold-light transition-all text-sm gold-glow-sm">
                  <MessageCircle className="w-4 h-4" /> Get a free assessment
                </a>
                <button onClick={reset} className="inline-flex items-center gap-2 px-6 py-3 border border-border text-muted-foreground hover:text-foreground rounded-xl transition-all text-sm">
                  <RotateCcw className="w-4 h-4" /> Retake
                </button>
              </div>
              <a href="/tools" className="inline-flex items-center gap-1.5 text-gold text-sm font-medium mt-6 hover:gap-2.5 transition-all">
                Try our free security tools <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
