import type { Metadata } from "next";
import IndustryLanding from "@/components/sections/industry-landing";
import { Scale } from "lucide-react";

export const metadata: Metadata = {
  alternates: { canonical: "/security-for-law-firms" },
  title: "Cybersecurity for Law Firms in Zimbabwe",
  description:
    "Cybersecurity for Zimbabwean law firms — protect confidential client files, comply with the Data Protection Act, and stop email fraud. Penetration testing and audits from a CompTIA-certified team in Harare.",
};

export default function LawFirmsPage() {
  return (
    <IndustryLanding
      industry="Law Firms"
      path="/security-for-law-firms"
      BadgeIcon={Scale}
      title="Cybersecurity for Law Firms in Zimbabwe"
      intro="Confidential client data is the whole business — and it makes law firms a prime target. We help Zimbabwean firms protect privileged information, stay compliant, and keep client trust intact."
      serviceDescription="Cybersecurity, penetration testing, and Data Protection Act compliance services for law firms in Zimbabwe."
      stakes="A single breach of privileged client files isn't just a technical problem — it's a breach of confidentiality that can end client relationships and trigger Data Protection Act penalties."
      risks={[
        { title: "Confidential file exposure", desc: "Case files, contracts, and client records are exactly what attackers want — and what you're obligated to protect." },
        { title: "Business email compromise", desc: "Fraudsters impersonate partners to redirect trust-account payments. Law firms are a favourite target for this scam." },
        { title: "Data Protection Act exposure", desc: "Holding sensitive personal data raises your compliance bar — and the penalties for a mishandled breach." },
        { title: "Weak document portals", desc: "Client portals and shared drives are often set up once and never security-tested." },
        { title: "Ransomware", desc: "Locking up a firm's case files is devastating — and attackers know firms are pressured to pay." },
        { title: "Insider mistakes", desc: "Most breaches start with a wrong attachment or a reused password, not a master hacker." },
      ]}
      help={[
        { label: "Penetration testing of your systems & portals", href: "/penetration-testing" },
        { label: "Check your email security (SPF / DMARC)", href: "/tools/email-security" },
        { label: "Data Protection Act compliance checklist", href: "/blog/data-protection-act-compliance-checklist-zimbabwe" },
        { label: "Run a free security check now", href: "/tools/security-check" },
      ]}
    />
  );
}
