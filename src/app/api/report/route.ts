import { NextResponse } from "next/server";
import { runReport, normalizeHost } from "@/lib/report-scan";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let host: string | null = null;
  try {
    host = normalizeHost(String((await req.json())?.domain ?? ""));
  } catch {
    /* ignore */
  }
  if (!host) {
    return NextResponse.json({ error: "Please enter a valid website address, e.g. yourbusiness.co.zw" }, { status: 400 });
  }
  const report = await runReport(host);
  return NextResponse.json(report);
}
