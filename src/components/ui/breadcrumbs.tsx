import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

/** Visible breadcrumb trail + matching BreadcrumbList JSON-LD. `items` runs Home → current. */
export default function Breadcrumbs({ items, className = "" }: { items: { name: string; path: string }[]; className?: string }) {
  return (
    <>
      <BreadcrumbJsonLd items={items} />
      <nav aria-label="Breadcrumb" className={className}>
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-white/40 font-jost">
          {items.map((it, i) => {
            const last = i === items.length - 1;
            return (
              <li key={it.path} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="w-3 h-3 text-white/25" />}
                {last ? (
                  <span className="text-gold/80">{it.name}</span>
                ) : (
                  <Link href={it.path} className="hover:text-white/70 transition-colors">{it.name}</Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
