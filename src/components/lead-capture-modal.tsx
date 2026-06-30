"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Loader2, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/lib/data";

// Web3Forms access key. This is a public, client-side key by design (Web3Forms
// keys are meant to be embedded in the page) — spam protection is handled on their
// side. An env var override is supported; otherwise the default below is used.
// If somehow empty, the form gracefully skips capture and goes straight to WhatsApp.
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "d67988f4-7f52-433d-91e0-08b06ef25f41";

type Props = {
  /** Visible label on the trigger button */
  label: string;
  /** Classes for the trigger button */
  className?: string;
  /** Short source tag so you know which CTA produced the lead */
  source: string;
  /** The WhatsApp message we open after capture */
  whatsappMessage: string;
  /** Optional leading icon node */
  icon?: React.ReactNode;
  /** Heading + subtext shown inside the modal */
  heading?: string;
  subheading?: string;
};

function openWhatsApp(message: string) {
  const url = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

export default function LeadCaptureModal({
  label,
  className,
  source,
  whatsappMessage,
  icon,
  heading = "Where should we send your results?",
  subheading = "Drop your name and best contact — we'll follow up with your findings, then continue on WhatsApp now.",
}: Props) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const t = setTimeout(() => firstFieldRef.current?.focus(), 50);
    return () => {
      document.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [open]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    if (WEB3FORMS_KEY) {
      try {
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            subject: `New lead (${source}) — ${name || "no name"}`,
            from_name: "Vanorika Website",
            name,
            contact,
            source,
            message: `Lead from "${source}". Name: ${name}. Contact: ${contact}.`,
          }),
        });
      } catch {
        // Never block the user on a capture failure — fall through to WhatsApp.
      }
    }

    openWhatsApp(whatsappMessage);
    setStatus("done");
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {icon}
        {label}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={heading}
        >
          <div
            className="relative w-full max-w-md bg-[#0D0D1A] border border-gold/20 rounded-2xl p-7 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {status === "done" ? (
              <div className="text-center py-6">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                <h3 className="font-display text-xl font-bold text-white mb-2">You&apos;re all set</h3>
                <p className="text-white/60 text-sm mb-6">
                  WhatsApp just opened in a new tab. If it didn&apos;t, tap below — we&apos;ve got your details and will
                  follow up either way.
                </p>
                <button
                  type="button"
                  onClick={() => openWhatsApp(whatsappMessage)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gold text-black font-semibold hover:bg-gold-light transition-colors"
                >
                  <MessageCircle className="w-4 h-4" /> Open WhatsApp
                </button>
              </div>
            ) : (
              <>
                <h3 className="font-display text-xl font-bold text-white mb-2 pr-6">{heading}</h3>
                <p className="text-white/55 text-sm mb-6">{subheading}</p>
                <form onSubmit={submit} className="space-y-3">
                  <input
                    ref={firstFieldRef}
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl bg-[#07070D] border border-[#252545] text-white text-sm placeholder:text-white/30 focus:border-gold/50 focus:outline-none transition-colors"
                  />
                  <input
                    type="text"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="WhatsApp number or email"
                    className="w-full px-4 py-3 rounded-xl bg-[#07070D] border border-[#252545] text-white text-sm placeholder:text-white/30 focus:border-gold/50 focus:outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gold text-black font-semibold hover:bg-gold-light transition-colors disabled:opacity-60"
                  >
                    {status === "sending" ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <MessageCircle className="w-4 h-4" />
                    )}
                    Continue to WhatsApp
                  </button>
                </form>
                <p className="text-white/25 text-[11px] text-center mt-4">
                  No spam. We use your details only to follow up on this request.
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
