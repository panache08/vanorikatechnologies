"use client";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/data";
import { toast } from "sonner";
import SectionHeader from "@/components/ui/section-header";

const services = ["Website Development", "Custom Software", "Mobile App", "Cybersecurity", "Cloud Services", "IT Consulting", "AI & Automation", "Technical Support", "Other"];
const budgets = ["Under $500", "$500 – $1,000", "$1,000 – $3,000", "$3,000 – $10,000", "$10,000+", "Not Sure Yet"];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", service: "", budget: "", message: "" });
  const [loading, setLoading] = useState(false);
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    toast.success("Message sent! Panashe will contact you within 2 hours.");
    setForm({ name: "", company: "", email: "", phone: "", service: "", budget: "", message: "" });
    setLoading(false);
  };

  return (
    <main>
      <Navbar />
      <section className="relative pt-40 pb-20 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest text-cyan border border-cyan/30 rounded-full bg-cyan/5 mb-6">GET IN TOUCH</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">Let&apos;s Talk</h1>
          <p className="text-white/60 text-lg">Tell us about your project. We&apos;ll get back to you within 2 hours.</p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <SectionHeader badge="SEND A MESSAGE" title="Start Your" titleGradient="Project" centered={false} />
              <form onSubmit={handleSubmit} className="mt-10 space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  {[
                    { label: "Full Name *", key: "name", type: "text", placeholder: "Your full name" },
                    { label: "Company Name", key: "company", type: "text", placeholder: "Your company (optional)" },
                    { label: "Email Address *", key: "email", type: "email", placeholder: "your@email.com" },
                    { label: "Phone Number", key: "phone", type: "tel", placeholder: "+263 77 XXX XXXX" },
                  ].map((f) => (
                    <div key={f.key}>
                      <label className="block text-sm font-medium text-muted-foreground mb-1.5">{f.label}</label>
                      <input type={f.type} value={form[f.key as keyof typeof form]} onChange={set(f.key)} required={f.label.includes("*")}
                        placeholder={f.placeholder}
                        className="w-full px-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder-muted-foreground focus:border-electric focus:outline-none transition-all text-sm" />
                    </div>
                  ))}
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1.5">Service Needed *</label>
                    <select value={form.service} onChange={set("service")} required
                      className="w-full px-4 py-3 bg-card border border-border rounded-xl text-foreground focus:border-electric focus:outline-none transition-all text-sm">
                      <option value="">Select a service</option>
                      {services.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1.5">Project Budget</label>
                    <select value={form.budget} onChange={set("budget")}
                      className="w-full px-4 py-3 bg-card border border-border rounded-xl text-foreground focus:border-electric focus:outline-none transition-all text-sm">
                      <option value="">Select budget range</option>
                      {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1.5">Project Description *</label>
                  <textarea value={form.message} onChange={set("message")} required rows={5}
                    placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
                    className="w-full px-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder-muted-foreground focus:border-electric focus:outline-none transition-all text-sm resize-none" />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full py-4 bg-electric text-white font-semibold rounded-xl hover:bg-electric-dark transition-all disabled:opacity-70 flex items-center justify-center gap-2 blue-glow">
                  {loading ? "Sending..." : <><Send className="w-4 h-4" /> Send Message</>}
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
                        <p className="text-muted-foreground text-xs">{label}</p>
                        {href ? <a href={href} className="text-foreground font-medium text-sm hover:text-electric transition-colors">{value}</a>
                          : <p className="text-foreground font-medium text-sm">{value}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 p-5 bg-[#25D366]/10 border border-[#25D366]/30 rounded-2xl hover:bg-[#25D366]/20 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-[#25D366] flex items-center justify-center shrink-0">
                  <MessageCircle className="w-6 h-6 text-white fill-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground text-sm">Chat on WhatsApp</p>
                  <p className="text-muted-foreground text-xs">Get a response in minutes</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-[#25D366] group-hover:translate-x-1 transition-all" />
              </a>

              {/* Newsletter */}
              <div className="p-6 bg-card border border-border rounded-2xl">
                <h4 className="font-semibold text-foreground mb-2">Stay Updated</h4>
                <p className="text-muted-foreground text-xs mb-4">Get tech insights and exclusive offers delivered to your inbox.</p>
                <div className="flex gap-2">
                  <input type="email" placeholder="your@email.com" className="flex-1 px-3 py-2 bg-muted border border-border rounded-lg text-foreground text-xs focus:border-electric focus:outline-none" />
                  <button className="px-4 py-2 bg-electric text-white text-xs font-semibold rounded-lg hover:bg-electric-dark transition-all">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
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
          <a href={`https://maps.google.com/?q=Harare+Zimbabwe`} target="_blank" rel="noopener noreferrer" className="text-electric text-sm hover:underline mt-2 inline-block">
            Open in Google Maps →
          </a>
        </div>
      </div>

      <Footer />
    </main>
  );
}
