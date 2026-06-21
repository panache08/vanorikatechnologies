import Link from "next/link";
import { Zap } from "lucide-react";
export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center">
        <Zap className="w-16 h-16 text-electric/30 mx-auto mb-6" />
        <p className="font-display text-8xl font-bold text-electric/10 mb-4">404</p>
        <h1 className="font-display text-3xl font-bold text-foreground mb-4">Page Not Found</h1>
        <p className="text-muted-foreground mb-10">This page doesn&apos;t exist or has been moved.</p>
        <Link href="/" className="inline-flex items-center gap-2 px-8 py-3 bg-electric text-[#07070D] font-bold rounded-xl hover:bg-electric-light transition-all gold-glow-sm">
          Return Home
        </Link>
      </div>
    </div>
  );
}
