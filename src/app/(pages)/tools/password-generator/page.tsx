"use client";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { useState, useEffect, useCallback } from "react";
import { KeyRound, Copy, Check, RefreshCw } from "lucide-react";

const WORDS = ["harbour", "copper", "willow", "ember", "granite", "falcon", "marble", "cobalt", "cedar", "quartz", "raven", "tundra", "summit", "vortex", "amber", "onyx", "lunar", "drift", "echo", "flint", "garnet", "horizon", "indigo", "jasper", "kelvin", "lagoon", "meadow", "nimbus", "opal", "pixel", "ripple", "saffron", "talon", "umber", "velvet", "walnut"];

function randInt(max: number) {
  const a = new Uint32Array(1);
  crypto.getRandomValues(a);
  return a[0] % max;
}

export default function PasswordGenerator() {
  const [mode, setMode] = useState<"password" | "passphrase">("password");
  const [length, setLength] = useState(20);
  const [words, setWords] = useState(4);
  const [opts, setOpts] = useState({ upper: true, lower: true, digits: true, symbols: true });
  const [value, setValue] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    if (mode === "passphrase") {
      const parts = Array.from({ length: words }, () => {
        const w = WORDS[randInt(WORDS.length)];
        return w.charAt(0).toUpperCase() + w.slice(1);
      });
      setValue(parts.join("-") + randInt(100));
      return;
    }
    let pool = "";
    if (opts.lower) pool += "abcdefghijkmnpqrstuvwxyz";
    if (opts.upper) pool += "ABCDEFGHJKLMNPQRSTUVWXYZ";
    if (opts.digits) pool += "23456789";
    if (opts.symbols) pool += "!@#$%^&*-_=+?";
    if (!pool) pool = "abcdefghijkmnpqrstuvwxyz";
    setValue(Array.from({ length }, () => pool[randInt(pool.length)]).join(""));
  }, [mode, length, words, opts]);

  useEffect(() => { generate(); }, [generate]);

  const copy = () => navigator.clipboard?.writeText(value).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });

  return (
    <main>
      <Navbar />
      <section className="relative pt-40 pb-16 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-6">
            <KeyRound className="w-3.5 h-3.5" /> FREE TOOL
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">Password Generator</h1>
          <p className="text-white/60 text-lg">Strong, random passwords and passphrases — generated privately in your browser.</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Output */}
          <div className="bg-card border border-border rounded-2xl p-5 flex items-center gap-3 mb-6">
            <code className="flex-1 text-foreground font-mono text-base sm:text-lg break-all">{value}</code>
            <button onClick={generate} aria-label="Regenerate" className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold/30 transition-all shrink-0"><RefreshCw className="w-4 h-4" /></button>
            <button onClick={copy} className="px-4 h-10 rounded-lg bg-gold text-[#07070D] font-bold text-sm flex items-center gap-1.5 hover:bg-gold-light transition-all shrink-0">
              {copied ? <><Check className="w-4 h-4" /> Copied</> : <><Copy className="w-4 h-4" /> Copy</>}
            </button>
          </div>

          {/* Mode toggle */}
          <div className="flex gap-2 mb-6">
            {(["password", "passphrase"] as const).map((m) => (
              <button key={m} onClick={() => setMode(m)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${mode === m ? "bg-gold text-[#07070D]" : "bg-card border border-border text-muted-foreground hover:text-foreground"}`}>
                {m === "password" ? "Random password" : "Memorable passphrase"}
              </button>
            ))}
          </div>

          {mode === "password" ? (
            <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
              <div>
                <div className="flex justify-between text-sm mb-2"><span className="text-muted-foreground">Length</span><span className="text-foreground font-mono">{length}</span></div>
                <input type="range" min={8} max={48} value={length} onChange={(e) => setLength(+e.target.value)} className="w-full accent-[#C9A84C]" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {([["upper", "Uppercase A-Z"], ["lower", "Lowercase a-z"], ["digits", "Digits 0-9"], ["symbols", "Symbols !@#$"]] as const).map(([k, label]) => (
                  <label key={k} className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                    <input type="checkbox" checked={opts[k]} onChange={(e) => setOpts((o) => ({ ...o, [k]: e.target.checked }))} className="accent-[#C9A84C] w-4 h-4" />
                    {label}
                  </label>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex justify-between text-sm mb-2"><span className="text-muted-foreground">Number of words</span><span className="text-foreground font-mono">{words}</span></div>
              <input type="range" min={3} max={7} value={words} onChange={(e) => setWords(+e.target.value)} className="w-full accent-[#C9A84C]" />
              <p className="text-muted-foreground text-xs mt-3">Passphrases are easier to remember and just as strong — e.g. for your master password.</p>
            </div>
          )}

          <p className="text-muted-foreground/60 text-xs text-center mt-6">Generated locally with your browser&apos;s secure random generator. Nothing is sent or stored.</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
