import sanitizeHtml from "sanitize-html";

const sanitize = (value: unknown): string =>
  sanitizeHtml(String(value ?? ""), { allowedTags: [], allowedAttributes: {} }).trim();

const ipLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now    = Date.now();
  const window = 60 * 60 * 1000; // 1 hour in ms
  const limit  = 5;

  const hits = (ipLog.get(ip) || []).filter(t => now - t < window);
  if (hits.length >= limit) return true;
  ipLog.set(ip, [...hits, now]);
  return false;
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "anonymous";
    if (isRateLimited(ip)) {
      return Response.json({ error: "Too many requests. Try again later." }, { status: 429 });
    }

    const body = await req.json();
    const { name, email, message, _honey } = body;

    // Honeypot: bots fill hidden fields, humans don't
    if (_honey) return Response.json({ success: true }); // silently discard

    const cleanName = sanitize(name);
    const cleanEmail = sanitize(email);
    const cleanMessage = sanitize(message);

    if (!cleanName || !cleanEmail || !cleanMessage) {
      return Response.json({ error: "Required fields missing" }, { status: 400 });
    }

    // Basic email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return Response.json({ error: "Invalid email" }, { status: 400 });
    }

    console.log("Contact submission:", { name: cleanName, email: cleanEmail, message: cleanMessage });
    // TODO: wire up Resend/Nodemailer here when ready
    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
