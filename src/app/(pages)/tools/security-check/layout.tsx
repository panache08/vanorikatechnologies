import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Website Security Check",
  description:
    "Run a free passive security check on your website: security headers, SSL, and common exposure issues. Built by a CompTIA PenTest+ certified team in Harare, Zimbabwe.",
  alternates: { canonical: "/tools/security-check" },
};

export default function SecurityCheckLayout({ children }: { children: React.ReactNode }) {
  return children;
}
