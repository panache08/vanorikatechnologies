// Transactional email via Resend. Set RESEND_API_KEY (and optionally SHIELD_FROM) in the
// environment. Until the key is set, sending is a safe no-op that logs — so the cron
// endpoints run and report without ever crashing.

export type EmailAttachment = { filename: string; content: string /* base64 */ };

export type SendEmailInput = {
  to: string | string[];
  subject: string;
  html: string;
  attachments?: EmailAttachment[];
};

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM = process.env.SHIELD_FROM || "Vanorika Shield <shield@vanorikatechnologies.co.zw>";

export async function sendEmail(input: SendEmailInput): Promise<{ ok: boolean; skipped?: boolean; error?: string }> {
  if (!RESEND_API_KEY) {
    console.log(`[email] RESEND_API_KEY not set — skipped email to ${input.to} ("${input.subject}")`);
    return { ok: false, skipped: true };
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: FROM,
        to: Array.isArray(input.to) ? input.to : [input.to],
        subject: input.subject,
        html: input.html,
        attachments: input.attachments,
      }),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return { ok: false, error: `Resend ${res.status}: ${text.slice(0, 200)}` };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "send failed" };
  }
}
