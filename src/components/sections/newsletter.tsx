"use client";
import { useState } from "react";
import { Mail, Send, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { siteConfig } from "@/lib/data";

/**
 * Newsletter signup.
 * If EmailJS env vars are configured it sends via the EmailJS REST API
 * (same provider already used on Beauty by Nyasha). Otherwise it falls
 * back to opening a pre-filled email so a subscription is never lost.
 */
export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setLoading(true);

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_NEWSLETTER_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    try {
      if (serviceId && templateId && publicKey) {
        const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            service_id: serviceId,
            template_id: templateId,
            user_id: publicKey,
            template_params: {
              subscriber_email: email,
              to_email: siteConfig.email,
              source: "vanorikatechnologies.co.zw",
            },
          }),
        });
        if (!res.ok) throw new Error("EmailJS request failed");
      } else {
        // No backend configured — open a pre-filled subscribe email.
        const subject = encodeURIComponent("Newsletter subscription");
        const body = encodeURIComponent(`Please add ${email} to the Vanorika cybersecurity newsletter.`);
        window.open(`mailto:${siteConfig.email}?subject=${subject}&body=${body}`, "_blank");
      }
      setDone(true);
      setEmail("");
      toast.success("You're subscribed. Watch your inbox for monthly security updates.");
    } catch {
      toast.error("Something went wrong. Please email us directly and we'll add you.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-20 bg-background overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-card border border-border rounded-3xl p-10 md:p-12 text-center">
          <div className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-6">
            <Mail className="w-7 h-7 text-gold" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">Stay Ahead of Threats</h2>
          <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto mb-8">
            One email a month. Zimbabwe cybersecurity updates, free tips, and vulnerabilities
            affecting local businesses. No spam.
          </p>

          {done ? (
            <p className="inline-flex items-center gap-2 text-gold font-medium">
              <ShieldCheck className="w-5 h-5" /> Thanks for subscribing!
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Your email"
                aria-label="Your email"
                className="flex-1 px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder-muted-foreground focus:border-gold focus:outline-none transition-all text-sm"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-gold text-[#07070D] font-bold rounded-xl hover:bg-gold-light transition-all disabled:opacity-60 flex items-center justify-center gap-2 text-sm gold-glow-sm"
              >
                {loading ? "Subscribing…" : <><Send className="w-4 h-4" /> Subscribe</>}
              </button>
            </form>
          )}
          <p className="text-muted-foreground/60 text-xs mt-5">One email a month. Unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  );
}
