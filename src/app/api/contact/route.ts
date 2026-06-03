import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;
    if (!name || !email || !message) return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    console.log("Contact submission:", body);
    // TODO: Add email sending via Resend or Nodemailer
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
