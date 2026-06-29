import type { Metadata } from "next";
import { Outfit, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "sonner";
import WhatsAppButton from "@/components/ui/whatsapp-button";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/json-ld";
import { SITE_URL } from "@/lib/data";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Vanorika Technologies | Enterprise Security & Web Development — Zimbabwe",
    template: "%s | Vanorika Technologies",
  },
  description: "Vanorika Technologies — CompTIA PenTest+ certified penetration tester and web developer based in Harare, Zimbabwe. Enterprise security assessments and professional websites for Zimbabwean businesses.",
  keywords: [
    "penetration testing Zimbabwe",
    "cybersecurity Harare",
    "CompTIA PenTest+ Zimbabwe",
    "web development Zimbabwe",
    "security audit Zimbabwe",
    "Vanorika Technologies",
    "Donovan Mudarikwa",
    "IT company Harare",
    "enterprise security Zimbabwe",
  ],
  authors: [{ name: "Donovan Mudarikwa" }],
  creator: "Vanorika Technologies",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    locale: "en_ZW",
    url: SITE_URL,
    siteName: "Vanorika Technologies",
    title: "Vanorika Technologies | Enterprise Security & Web Development — Zimbabwe",
    description: "CompTIA PenTest+ certified penetration tester and web developer in Harare, Zimbabwe. Security assessments and professional websites.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vanorika Technologies | Enterprise Security — Zimbabwe",
    description: "Enterprise security and web development for businesses in Zimbabwe. CompTIA certified.",
  },
  robots: { index: true, follow: true },
  verification: { google: "c1oz6gI4CoaQs1YGH1Q_y-RPc3ExMnBRzEz5jH9OPrA" },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} ${ibmPlexMono.variable} antialiased`}>
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
          {children}
          <WhatsAppButton />
          <Toaster theme="dark" toastOptions={{ style: { fontFamily: "Outfit, sans-serif", background: "#0D0D1A", border: "1px solid #1A1A30", color: "#F0EDE8" } }} />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
