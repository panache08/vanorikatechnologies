import type { Metadata } from "next";
import IndustryLanding from "@/components/sections/industry-landing";
import { HeartPulse } from "lucide-react";

export const metadata: Metadata = {
  alternates: { canonical: "/security-for-healthcare" },
  title: "Cybersecurity for Clinics & Healthcare in Zimbabwe",
  description:
    "Cybersecurity for Zimbabwean clinics and healthcare providers, built to protect patient records, comply with the Data Protection Act, and keep systems running. Audits and penetration testing from Harare.",
};

export default function HealthcarePage() {
  return (
    <IndustryLanding
      industry="Healthcare"
      path="/security-for-healthcare"
      BadgeIcon={HeartPulse}
      title="Cybersecurity for Clinics & Healthcare in Zimbabwe"
      intro="Patient records are among the most sensitive data there is. We help Zimbabwean clinics, surgeries, and healthcare providers protect them, stay compliant, and keep critical systems running."
      serviceDescription="Cybersecurity, patient-data protection, and penetration testing services for clinics and healthcare providers in Zimbabwe."
      stakes="A breach of patient records is both a profound breach of trust and a serious Data Protection Act matter, the kind of incident that follows a practice for years."
      risks={[
        { title: "Patient record exposure", desc: "Medical histories and personal details are extremely sensitive. Leaked, they become a legal liability." },
        { title: "Data Protection Act obligations", desc: "Health data carries some of the highest compliance expectations under the Act." },
        { title: "Ransomware on critical systems", desc: "Locking up patient systems can halt care, and attackers exploit that urgency." },
        { title: "Insecure patient portals", desc: "Online booking and patient portals are often deployed without security testing." },
        { title: "Email & billing fraud", desc: "Impersonation scams target billing and supplier payments in healthcare settings." },
        { title: "Unmanaged devices", desc: "Reception PCs and shared devices are frequent, overlooked entry points." },
      ]}
      help={[
        { label: "Security audit of your systems", href: "/penetration-testing" },
        { label: "Data Protection Act compliance checklist", href: "/blog/data-protection-act-compliance-checklist-zimbabwe" },
        { label: "Free website security check", href: "/tools/security-check" },
        { label: "Secure patient-portal development", href: "/web-development" },
      ]}
    />
  );
}
