import type { Metadata } from "next";
import IndustryLanding from "@/components/sections/industry-landing";
import { Plane } from "lucide-react";

export const metadata: Metadata = {
  alternates: { canonical: "/security-for-travel-agencies" },
  title: "Cybersecurity for Travel Agencies in Zimbabwe",
  description:
    "Cybersecurity for Zimbabwean travel agencies. Protect passport scans, payment details, and bookings. Passive assessments and penetration testing from a CompTIA-certified team in Harare.",
};

export default function TravelAgenciesPage() {
  return (
    <IndustryLanding
      industry="Travel Agencies"
      path="/security-for-travel-agencies"
      BadgeIcon={Plane}
      title="Cybersecurity for Travel Agencies in Zimbabwe"
      intro="Travel agencies hold a goldmine of personal data: passports, payment cards, itineraries. We help Zimbabwean agencies protect it, keep bookings flowing, and stop fraud before it costs a customer."
      serviceDescription="Cybersecurity, passive assessments, and penetration testing services for travel agencies in Zimbabwe."
      stakes="One of our real assessments found a live server error that had quietly broken an agency's Instagram booking link, costing them leads every single day before anyone noticed."
      risks={[
        { title: "Passport & ID data theft", desc: "Scans of passports and IDs are among the most valuable data there is for identity fraud, and you hold them." },
        { title: "Payment card exposure", desc: "Taking deposits and payments makes you a target, and raises your security obligations." },
        { title: "Booking-site downtime & errors", desc: "A broken or slow booking page silently loses leads; often the owner is the last to know." },
        { title: "Fake booking & refund scams", desc: "Fraudsters impersonate your agency to take deposits from would-be travellers." },
        { title: "Lookalike domains", desc: "Scammers register domains that look like yours to phish your customers." },
        { title: "Weak third-party integrations", desc: "Booking widgets and payment plugins are common, under-tested weak points." },
      ]}
      help={[
        { label: "Free passive security assessment", href: "/tools/security-check" },
        { label: "Find lookalike domains impersonating you", href: "/tools/lookalike" },
        { label: "Penetration testing & audits", href: "/penetration-testing" },
        { label: "Secure booking website development", href: "/web-development" },
      ]}
    />
  );
}
