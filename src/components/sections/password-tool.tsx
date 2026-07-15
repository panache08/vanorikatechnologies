"use client";
import { useState } from "react";
import { Eye, EyeOff, ShieldCheck, ShieldAlert, Check, X } from "lucide-react";

const COMMON = new Set([
  "password", "123456", "123456789", "qwerty", "111111", "12345678", "abc123",
  "password1", "1234567", "admin", "letmein", "welcome", "monkey", "iloveyou",
  "zimbabwe", "harare", "qwerty123", "000000", "1q2w3e4r",
]);

function fmtTime(seconds: number): string {
  if (!isFinite(seconds) || seconds > 3.15e9 * 100) return "centuries";
  if (seconds < 1) return "instantly";
  const m = 60, h = 3600, d = 86400, y = 31557600;
  if (seconds < m) return `${Math.round(seconds)} seconds`;
  if (seconds < h) return `${Math.round(seconds / m)} minutes`;
  if (seconds < d) return `${Math.round(seconds / h)} hours`;
  if (seconds < y) return `${Math.round(seconds / d)} days`;
  const years = seconds / y;
  if (years < 1000) return `${Math.round(years)} years`;
  if (years < 1e6) return `${Math.round(years / 1000)} thousand years`;
  return "millions of years";
}

function analyze(pw: string) {
  const checks = {
    length: pw.length >= 12,
    lower: /[a-z]/.test(pw),
    upper: /[A-Z]/.test(pw),
    digit: /[0-9]/.test(pw),
    symbol: /[^A-Za-z0-9]/.test(pw),
  };
  let pool = 0;
  if (checks.lower) pool += 26;
  if (checks.upper) pool += 26;
  if (checks.digit) pool += 10;
  if (checks.symbol) pool += 33;
  let entropy = pw.length * Math.log2(pool || 1);

  const isCommon = COMMON.has(pw.toLowerCase());
  const hasRepeats = /(.)\1\1/.test(pw);
  const hasSequence = /(abc|bcd|cde|123|234|345|456|567|678|789|qwe|asd|zxc)/i.test(pw);
  if (isCommon) entropy = Math.min(entropy, 10);
  if (hasRepeats || hasSequence) entropy *= 0.7;

  const seconds = Math.pow(2, entropy) / 1e10; // 10 billion guesses/sec, offline attack

  let score = 0;
  if (entropy >= 28) score = 1;
  if (entropy >= 40) score = 2;
  if (entropy >= 60) score = 3;
  if (entropy >= 80) score = 4;
  if (isCommon) score = 0;

  return { checks, entropy, seconds, score, isCommon, hasRepeats, hasSequence };
}

const LABELS = ["Very weak", "Weak", "Fair", "Strong", "Very strong"];
const COLORS = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#16a34a"];

export default function PasswordTool() {
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const a = pw ? analyze(pw) : null;

  const checkRows: { key: keyof NonNullable<typeof a>["checks"]; label: string }[] = [
    { key: "length", label: "At least 12 characters" },
    { key: "lower", label: "Lowercase letters" },
    { key: "upper", label: "Uppercase letters" },
    { key: "digit", label: "Numbers" },
    { key: "symbol", label: "Symbols (!@#$…)" },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
        <label htmlFor="pw" className="block text-foreground text-sm font-medium mb-3">Type a password to test its strength</label>
        <div className="relative">
          <input
            id="pw"
            type={show ? "text" : "password"}
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            autoComplete="off"
            placeholder="Start typing…"
            className="w-full bg-background border border-border rounded-xl px-4 py-3.5 pr-12 text-foreground text-sm outline-none focus:border-gold/50 transition-colors font-mono"
          />
          <button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-gold transition-colors">
            {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        {/* Strength bar */}
        <div className="mt-5">
          <div className="flex gap-1.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="h-2 flex-1 rounded-full transition-colors duration-300"
                style={{ background: a && a.score >= i && pw ? COLORS[a.score] : "rgba(255,255,255,0.08)" }} />
            ))}
          </div>
          <div className="flex items-center justify-between mt-3 text-sm">
            <span className="font-semibold" style={{ color: a && pw ? COLORS[a.score] : undefined }}>
              {a && pw ? LABELS[a.score] : "Not rated yet"}
            </span>
            {a && pw && (
              <span className="text-muted-foreground text-xs">
                Time to crack: <strong className="text-foreground">{fmtTime(a.seconds)}</strong>
              </span>
            )}
          </div>
        </div>

        {/* Checklist */}
        <div className="mt-6 grid sm:grid-cols-2 gap-2">
          {checkRows.map((row) => {
            const ok = a?.checks[row.key];
            return (
              <div key={row.key} className="flex items-center gap-2 text-sm">
                {ok ? <Check className="w-4 h-4 text-green-500 shrink-0" /> : <X className="w-4 h-4 text-muted-foreground/40 shrink-0" />}
                <span className={ok ? "text-foreground" : "text-muted-foreground"}>{row.label}</span>
              </div>
            );
          })}
        </div>

        {/* Warnings */}
        {a && pw && (a.isCommon || a.hasRepeats || a.hasSequence) && (
          <div className="mt-5 flex items-start gap-2 bg-red-500/8 border border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-400">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              {a.isCommon && "This is one of the most common passwords in the world. Change it immediately. "}
              {a.hasRepeats && "Avoid repeated characters (aaa, 111). "}
              {a.hasSequence && "Avoid sequences (abc, 123, qwe). "}
            </span>
          </div>
        )}
      </div>

      {/* Privacy note */}
      <p className="flex items-center justify-center gap-2 text-muted-foreground/70 text-xs mt-4">
        <ShieldCheck className="w-3.5 h-3.5 text-gold" />
        100% private: everything is checked inside your browser. Your password is never sent anywhere.
      </p>
    </div>
  );
}
