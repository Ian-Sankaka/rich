import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL?.replace("?sslmode=require", ""),
  ssl: { rejectUnauthorized: false },
});

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) return NextResponse.json({ error: "Missing" }, { status: 400 });
    const { rows } = await pool.query("select id, email, password, name from users where email = $1 limit 1", [email]);
    const user = rows[0];
    if (!user) return NextResponse.json({ error: "Those credentials do not match our records." }, { status: 401 });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return NextResponse.json({ error: "Those credentials do not match our records." }, { status: 401 });
    // log to supabase search_logs if needed
    return NextResponse.json({ ok: true, user: { id: user.id, email: user.email, name: user.name } });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
