import { NextRequest, NextResponse } from "next/server";
import sanitizeHtml from "sanitize-html";

const sanitize = (value: unknown): string =>
  sanitizeHtml(String(value ?? ""), { allowedTags: [], allowedAttributes: {} }).trim();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message, _honey } = body;

    // Honeypot: bots fill hidden fields, humans don't
    if (_honey) return NextResponse.json({ success: true }); // silently discard

    const cleanName = sanitize(name);
    const cleanEmail = sanitize(email);
    const cleanMessage = sanitize(message);

    if (!cleanName || !cleanEmail || !cleanMessage) {
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    }

    // Basic email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    console.log("Contact submission:", { name: cleanName, email: cleanEmail, message: cleanMessage });
    // TODO: wire up Resend/Nodemailer here when ready
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
