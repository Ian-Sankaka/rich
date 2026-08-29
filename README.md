# RICH Knowledge Repository - Next.js + Postgres (Supabase-ready)

Africa's central platform for climate AI knowledge. Frontend matches `RICH_repository_homepage.html` with Next.js components, light/dark mode, and Postgres backend via Supabase.

## Stack
- **Frontend:** Next.js 16 (App Router), Tailwind CSS 4, Playfair Display + Lato
- **Backend:** Postgres (Supabase pooler), `pg`, Prisma schema in `prisma/schema.prisma`
- **Auth:** email/password with `bcryptjs` → `users` table (replace with Supabase Auth / NextAuth in prod)

## Quick start
```bash
npm install
cp .env.example .env   # set DATABASE_URL
npx prisma db push     # creates tables on Supabase
npm run dev            # http://localhost:3000
```

## Env
```
DATABASE_URL="postgresql://postgres.<ref>:[PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:5432/postgres?pgbouncer=true&connection_limit=1"
# For local: postgresql://postgres:postgres@localhost:5432/rich
```
Supabase Dashboard → Project → Database → Connection string (pooler, port 5432) → replace password.

## Prisma (Supabase)
```bash
npx prisma generate
npx prisma db push        # or npx prisma migrate dev --name init
npx prisma studio
```
Schema (`prisma/schema.prisma`): `User`, `Resource`, `Tag`, `Requirement` - uses `postgresql` provider. Tables map to `users`, `resources`, `tags`, `requirements` with `_ResourceTags` join.

## Routes
- `/` - homepage (Hero, Stats, About, Collections, Principles, Phases, Articles, CTA, Partners)
- `/collections` + `/collections/[slug]` - four collections
- `/submit` - intake form (wiring to `/api/resources`)
- `/articles` - insights listing
- `/login`, `/register` - auth (POST to `/api/login`, `/api/register`)
- `/dashboard` - stats & recent resources (swap to Prisma query)

## Auth API
- `POST /api/register` { name, email, password } → hashes with bcrypt, inserts into `users` (409 if exists)
- `POST /api/login` { email, password } → verifies, sets `rich_user` cookie

Both use `src/lib/db.ts` singleton `Pool` with `ssl: { rejectUnauthorized: false }` for Supabase pooler.

## Light / Dark mode
- `src/components/ThemeProvider` + `ThemeToggle` - class-based `.dark` on `<html>`, persisted in `localStorage`, respects `prefers-color-scheme`. Toggle in header.
- Tailwind v4: `@custom-variant dark (&:where(.dark, .dark *));` in `globals.css`. Section backgrounds use CSS vars (`--background`, `--off-white`, etc.) with `.dark` overrides.

## Supabase deploy
1. Create Supabase project → copy pooler URL to `DATABASE_URL`
2. `npx prisma db push`
3. Vercel → add `DATABASE_URL` env → deploy (Next.js auto-detected)
4. Optional: enable Supabase Auth and replace `/api/*` with `@supabase/ssr`

## Next steps
- Wire `/api/resources` with Prisma (filter by `collection`, `tags`, full-text search)
- Add `next-auth` or Supabase Auth for real sessions
- Seed 20–25 launch resources (see Design Doc §9.1) via `prisma/seed.ts`
