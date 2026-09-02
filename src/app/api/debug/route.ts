import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
export const dynamic = "force-dynamic";
export async function GET() {
  try {
    const r = await pool.query("SELECT collection, status, count(*)::int as c FROM public.resources GROUP BY collection, status ORDER BY collection");
    const sample = await pool.query("SELECT id, title, collection, status FROM public.resources LIMIT 5");
    return NextResponse.json({ ok: true, counts: r.rows, sample: sample.rows, env: process.env.DATABASE_URL ? process.env.DATABASE_URL.slice(0,60) : "no env" });
  } catch (e:any) {
    return NextResponse.json({ ok:false, error: e.message, stack: e.stack?.slice(0,500), envPreview: process.env.DATABASE_URL?.slice(0,80) }, { status: 500 });
  }
}
