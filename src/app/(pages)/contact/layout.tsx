import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get a free consultation with Vanorika Technologies: penetration testing, web development, and custom software in Harare, Zimbabwe. Reply within 2 hours via WhatsApp.",
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
