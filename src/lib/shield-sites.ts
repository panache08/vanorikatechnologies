// Vanorika Shield — the sites under continuous monitoring.
//
// v0.1 keeps the client list here in the repo (there are only a handful to start —
// GlowTrack, Pearlsard, Nyasha). When the roster grows or we add stateful checks
// (content-diff, "new subdomain since last"), this moves to Supabase.
//
// `notify` receives every alert for that site. Add the business owner and yourself.

export type ShieldSite = {
  name: string; // business name, used in alerts
  host: string; // bare domain, e.g. "beauty-by-nyasha.vercel.app"
  notify: string[]; // email addresses to alert
  plan?: "essential" | "growth"; // for your own records
};

export const SHIELD_SITES: ShieldSite[] = [
  // Example — replace with real paying clients:
  // { name: "Beauty by Nyasha", host: "beautybynyasha.co.zw", notify: ["nyasha@example.com", "donovanmudarikwa@vanorikatechnologies.co.zw"], plan: "essential" },
  // { name: "GlowTrack Auctions", host: "glowtrack.co.zw", notify: ["ops@glowtrack.co.zw", "donovanmudarikwa@vanorikatechnologies.co.zw"], plan: "growth" },
];

// SSL warnings fire when the certificate has this many days (or fewer) left.
export const SSL_WARN_DAYS = [30, 7, 1];
