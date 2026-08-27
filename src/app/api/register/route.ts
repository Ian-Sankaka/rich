import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL?.replace("?sslmode=require", ""),
  ssl: { rejectUnauthorized: false },
});

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();
  if (!name || !email || !password) return NextResponse.json({ error: "Missing" }, { status: 400 });
  const hash = await bcrypt.hash(password, 10);
  try {
    await pool.query("insert into users (name, email, password, created_at, updated_at) values ($1,$2,$3,now(),now())", [name, email, hash]);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
