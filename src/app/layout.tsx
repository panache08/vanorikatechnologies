import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "sonner";
import WhatsAppButton from "@/components/ui/whatsapp-button";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-plus-jakarta" });

export const metadata: Metadata = {
  title: { default: "Panashe Tech Solutions | Penetration Testing & Web Development – Zimbabwe", template: "%s | Panashe Tech Solutions" },
  description: "Panashe Tech Solutions — CompTIA PenTest+ certified penetration tester and web developer based in Harare, Zimbabwe. Security assessments, vulnerability testing, and professional websites for Zimbabwean businesses.",
  keywords: ["penetration testing Zimbabwe", "cybersecurity Harare", "CompTIA PenTest+ Zimbabwe", "web development Zimbabwe", "security audit Zimbabwe", "Panashe Tech Solutions", "Donovan Mudarikwa", "IT company Harare"],
  authors: [{ name: "Donovan Mudarikwa" }],
  creator: "Panashe Tech Solutions",
  metadataBase: new URL("https://panashe-tech.vercel.app"),
  openGraph: {
    type: "website", locale: "en_ZW",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://panashe-tech.vercel.app",
    siteName: "Panashe Tech Solutions",
    title: "Panashe Tech Solutions | Penetration Testing & Web Development – Zimbabwe",
    description: "CompTIA PenTest+ certified penetration tester and web developer in Harare, Zimbabwe. Security assessments and professional websites.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Panashe Tech Solutions | Technology Company – Zimbabwe",
    description: "Premium tech solutions for businesses in Zimbabwe.",
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${plusJakarta.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <WhatsAppButton />
          <Toaster theme="system" toastOptions={{ style: { fontFamily: "Inter, sans-serif" } }} />
        </ThemeProvider>
      </body>
    </html>
  );
}
