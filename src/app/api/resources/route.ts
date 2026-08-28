import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { verifySession, SESSION_COOKIE } from "@/lib/auth";
import { rateLimit, getClientIp } from "@/lib/rateLimit";

export const dynamic = "force-dynamic";

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60) + "-" + Date.now().toString(36);
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req as unknown as Request);
  const rl = rateLimit(`resources:${ip}`, 10, 15 * 60 * 1000);
  if (!rl.ok) return NextResponse.json({ error: "Too many submissions. Try later." }, { status: 429 });

  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const sess = await verifySession(token);
  if (!sess) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: any;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }

  const title = String(body.title || "").trim().slice(0, 120);
  const abstract = String(body.abstract || body.summary || "").trim().slice(0, 5000);
  const type = String(body.type || "").trim().slice(0, 80);
  const collection = String(body.collection || "research_outputs").trim();
  const author = String(body.author || sess.name).trim().slice(0, 200);
  const date = String(body.date || "").trim();
  const licensing = String(body.licensing || "CC BY 4.0 (Open)").trim();
  const geography = Array.isArray(body.geography) ? body.geography.map((v: any) => String(v)).join(", ") : String(body.geography || "").slice(0, 500);
  const themes = Array.isArray(body.themes) ? body.themes.map((v: any) => String(v)).join(", ") : String(body.themes || "").slice(0, 500);
  const cluster = String(body.cluster || "").trim().slice(0, 100);
  const pathway = String(body.pathway || "").trim().slice(0, 100);
  const audience = Array.isArray(body.audience) ? body.audience.map((v: any) => String(v)).join(", ") : String(body.audience || "").slice(0, 500);

  if (title.length < 8) return NextResponse.json({ error: "Title must be at least 8 characters." }, { status: 400 });
  if (abstract.length < 30) return NextResponse.json({ error: "Abstract must be at least 30 characters." }, { status: 400 });
  if (!type) return NextResponse.json({ error: "Resource type required." }, { status: 400 });

  const slug = slugify(title);
  const summary = abstract;
  const contentType = type;
  // store as pending for admin review
  const status = "pending";

  try {
    const { rows } = await pool.query(
      `insert into public.resources (title, slug, summary, abstract, collection, content_type, status, user_id, author_name, author_email, license, geography, themes, cluster, pathway, audience, publication_date, created_at, updated_at)
       values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17, now(), now()) returning id, title, slug, status, created_at`,
      [title, slug, summary, abstract, collection, contentType, status, sess.id, author, sess.email, licensing, geography, themes, cluster, pathway, audience, date]
    );
    return NextResponse.json({ ok: true, resource: rows[0] });
  } catch (e: unknown) {
    console.error("[resources POST]", e);
    return NextResponse.json({ error: "Failed to save resource." }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const sess = await verifySession(token);
  if (!sess) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url = new URL(req.url);
  const mine = url.searchParams.get("mine") === "1";
  const isAdmin = sess.email.toLowerCase() === "lead@rich.africa" || sess.email.toLowerCase() === "admin@rich.africa";

  const selectCols = `r.id, r.title, r.slug, r.summary, r.abstract, r.collection, r.content_type, r.status, r.user_id, r.author_name, r.author_email, r.license, r.geography, r.themes, r.cluster, r.pathway, r.audience, r.publication_date, r.created_at, r.updated_at, u.name as user_name, u.email as user_email`;
  try {
    // mine=1 → only caller's submissions; otherwise admin sees all, regular users fall back to theirs
    if (mine) {
      const { rows } = await pool.query(
        `select ${selectCols} from public.resources r left join public.users u on u.id = r.user_id where r.user_id = $1 order by r.created_at desc limit 100`,
        [sess.id]
      );
      return NextResponse.json({ resources: rows });
    }
    if (!isAdmin) {
      const { rows } = await pool.query(
        `select ${selectCols} from public.resources r left join public.users u on u.id = r.user_id where r.user_id = $1 order by r.created_at desc limit 100`,
        [sess.id]
      );
      return NextResponse.json({ resources: rows });
    }
    const { rows } = await pool.query(
      `select ${selectCols} from public.resources r left join public.users u on u.id = r.user_id order by r.created_at desc limit 100`
    );
    return NextResponse.json({ resources: rows });
  } catch (e) {
    console.error("[resources GET]", e);
    return NextResponse.json({ error: "Failed to fetch." }, { status: 500 });
  }
}
