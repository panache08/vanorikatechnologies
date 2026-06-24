"use client";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { useState, useMemo } from "react";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/data";
import { toast } from "sonner";
import SectionHeader from "@/components/ui/section-header";

const services = ["Website Development", "Custom Software", "Mobile App", "Cybersecurity", "Cloud Services", "IT Consulting", "AI & Automation", "Technical Support", "Other"];
const budgets = ["Under $500", "$500 – $1,000", "$1,000 – $3,000", "$3,000 – $10,000", "$10,000+", "Not Sure Yet"];

function makeCaptcha() {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  return { a, b, answer: a + b };
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", service: "", budget: "", message: "", _honey: "" });
  const [loading, setLoading] = useState(false);
  const [captchaInput, setCaptchaInput] = useState("");
  const captcha = useMemo(() => makeCaptcha(), []);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (form._honey) return;

    // Math CAPTCHA check
    if (parseInt(captchaInput, 10) !== captcha.answer) {
      toast.error(`Incorrect answer. ${captcha.a} + ${captcha.b} = ?`);
      setCaptchaInput("");
      return;
    }

    // Basic field validation
    if (!form.name.trim() || !form.email.trim() || !form.message.trim() || !form.service) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    const lines = [
      "New enquiry from vanorikatechnologies.co.zw",
      "",
      `Name: ${form.name}`,
      form.company ? `Company: ${form.company}` : null,
      `Email: ${form.email}`,
      form.phone ? `Phone: ${form.phone}` : null,
      `Service: ${form.service}`,
      form.budget ? `Budget: ${form.budget}` : null,
      "",
      `Project details: ${form.message}`,
    ].filter(Boolean);

    const waUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");

    toast.success("Opening WhatsApp — just hit send and Donovan will reply within 2 hours.");
    setForm({ name: "", company: "", email: "", phone: "", service: "", budget: "", message: "", _honey: "" });
    setCaptchaInput("");
    setLoading(false);
  };

  return (
    <main>
      <Navbar />
      <section className="relative pt-40 pb-20 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" /> GET IN TOUCH
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">Let&apos;s Talk</h1>
          <p className="text-white/55 text-lg">Tell us about your project. We&apos;ll get back to you within 2 hours.</p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <SectionHeader badge="SEND A MESSAGE" title="Start Your" titleGradient="Project" centered={false} />
              <form onSubmit={handleSubmit} className="mt-10 space-y-5" noValidate>
                <div className="grid md:grid-cols-2 gap-5">
                  {[
                    { label: "Full Name *", key: "name", type: "text", placeholder: "Your full name" },
                    { label: "Company Name", key: "company", type: "text", placeholder: "Your company (optional)" },
                    { label: "Email Address *", key: "email", type: "email", placeholder: "your@email.com" },
                    { label: "Phone Number", key: "phone", type: "tel", placeholder: "+263 77 XXX XXXX" },
                  ].map((f) => (
                    <div key={f.key}>
                      <label htmlFor={f.key} className="block text-sm font-medium text-muted-foreground mb-1.5">{f.label}</label>
                      <input
                        id={f.key}
                        type={f.type}
                        value={form[f.key as keyof typeof form]}
                        onChange={set(f.key)}
                        required={f.label.includes("*")}
                        placeholder={f.placeholder}
                        className="w-full px-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder-muted-foreground focus:border-electric focus:outline-none transition-all text-sm"
                      />
                    </div>
                  ))}
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-muted-foreground mb-1.5">Service Needed *</label>
                    <select id="service" value={form.service} onChange={set("service")} required
                      className="w-full px-4 py-3 bg-card border border-border rounded-xl text-foreground focus:border-electric focus:outline-none transition-all text-sm">
                      <option value="">Select a service</option>
                      {services.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-muted-foreground mb-1.5">Project Budget</label>
                    <select id="budget" value={form.budget} onChange={set("budget")}
                      className="w-full px-4 py-3 bg-card border border-border rounded-xl text-foreground focus:border-electric focus:outline-none transition-all text-sm">
                      <option value="">Select budget range</option>
                      {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-1.5">Project Description *</label>
                  <textarea id="message" value={form.message} onChange={set("message")} required rows={5}
                    placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
                    className="w-full px-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder-muted-foreground focus:border-electric focus:outline-none transition-all text-sm resize-none" />
                </div>

                {/* Math CAPTCHA */}
                <div>
                  <label htmlFor="captcha" className="block text-sm font-medium text-muted-foreground mb-1.5">
                    Quick check: What is {captcha.a} + {captcha.b}? *
                  </label>
                  <input
                    id="captcha"
                    type="number"
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    required
                    placeholder="Enter the answer"
                    className="w-40 px-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder-muted-foreground focus:border-electric focus:outline-none transition-all text-sm"
                  />
                </div>

                {/* Honeypot — visually hidden, bots fill it, humans don't */}
                <input
                  type="text"
                  name="_honey"
                  value={form._honey}
                  onChange={set("_honey")}
                  autoComplete="off"
                  tabIndex={-1}
                  aria-hidden="true"
                  style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }}
                />

                <button type="submit" disabled={loading}
                  className="w-full py-4 bg-electric text-white font-semibold rounded-xl hover:opacity-90 transition-all disabled:opacity-60 flex items-center justify-center gap-2 blue-glow-sm">
                  {loading ? "Sending…" : <><Send className="w-4 h-4" /> Send Message</>}
                </button>
                <p className="text-muted-foreground text-xs text-center">We respond within 2 hours during business hours. Free consultation, no obligation.</p>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-xl font-bold text-foreground mb-6">Contact Information</h3>
                <div className="space-y-4">
                  {[
                    { icon: Phone, label: "Phone / WhatsApp", value: siteConfig.phone, href: `tel:${siteConfig.phone}` },
                    { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
                    { icon: MapPin, label: "Location", value: siteConfig.address },
                    { icon: Clock, label: "Business Hours", value: siteConfig.hours },
                  ].map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-4 p-4 bg-card border border-border rounded-xl hover:border-electric/30 transition-all">
                      <div className="w-9 h-9 rounded-lg bg-electric/10 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-electric" />
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs mb-0.5">{label}</p>
                        {href
                          ? <a href={href} className="text-foreground font-medium text-sm hover:text-electric transition-colors">{value}</a>
                          : <p className="text-foreground font-medium text-sm">{value}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 p-5 bg-[#25D366]/10 border border-[#25D366]/30 rounded-2xl hover:bg-[#25D366]/15 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-[#25D366] flex items-center justify-center shrink-0">
                  <MessageCircle className="w-6 h-6 text-white fill-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground text-sm">Chat on WhatsApp</p>
                  <p className="text-muted-foreground text-xs">Get a response in minutes</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-[#25D366] group-hover:translate-x-1 transition-all" />
              </a>

              {/* Quick actions */}
              <div className="p-6 bg-card border border-border rounded-2xl space-y-3">
                <h4 className="font-semibold text-foreground text-sm mb-3">Quick Actions</h4>
                <a href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent("Hi, I'd like a free quote for my project.")}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-[#25D366] transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" /> Message on WhatsApp
                </a>
                <a href={`mailto:${siteConfig.email}?subject=Project Enquiry`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-electric transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" /> Send an Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <div className="h-80 bg-muted/30 border-t border-border flex items-center justify-center">
        <div className="text-center">
          <MapPin className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">{siteConfig.address}</p>
          <a href="https://maps.google.com/?q=Harare+Zimbabwe" target="_blank" rel="noopener noreferrer"
            className="text-electric text-sm hover:underline mt-2 inline-block">
            Open in Google Maps →
          </a>
        </div>
      </div>

      <Footer />
    </main>
  );
}
