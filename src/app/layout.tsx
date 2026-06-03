import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "sonner";
import WhatsAppButton from "@/components/ui/whatsapp-button";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-plus-jakarta" });

export const metadata: Metadata = {
  title: { default: "Panashe Tech Solutions | Premium Technology Company – Zimbabwe", template: "%s | Panashe Tech Solutions" },
  description: "Panashe Tech Solutions delivers premium web development, custom software, mobile apps, cybersecurity, cloud services, and AI solutions for businesses in Zimbabwe and beyond.",
  keywords: ["Panashe Tech Solutions", "web development Zimbabwe", "software development Harare", "mobile app development Zimbabwe", "cybersecurity Zimbabwe", "IT company Harare", "cloud services Zimbabwe", "AI solutions Zimbabwe"],
  authors: [{ name: "Panashe Party" }],
  creator: "Panashe Tech Solutions",
  metadataBase: new URL("https://panashetechsolution.co.zw"),
  openGraph: {
    type: "website", locale: "en_ZW",
    url: "https://panashetechsolution.co.zw",
    siteName: "Panashe Tech Solutions",
    title: "Panashe Tech Solutions | Premium Technology Company – Zimbabwe",
    description: "Premium technology solutions for businesses in Zimbabwe. Web development, software, mobile apps, cybersecurity & AI.",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "Panashe Tech Solutions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Panashe Tech Solutions | Technology Company – Zimbabwe",
    description: "Premium tech solutions for businesses in Zimbabwe.",
    images: ["/images/og-image.jpg"],
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
