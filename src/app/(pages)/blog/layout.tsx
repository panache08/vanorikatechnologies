import type { Metadata } from "next";
import { Playfair_Display, Jost } from "next/font/google";

export const metadata: Metadata = {
  alternates: { types: { "application/rss+xml": "/blog/rss.xml" } },
};

// Beauty by Nyasha typography: Playfair Display (serif headings) + Jost (body).
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});
const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${playfair.variable} ${jost.variable}`}>{children}</div>;
}
