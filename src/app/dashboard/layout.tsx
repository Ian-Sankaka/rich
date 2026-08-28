import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySession, SESSION_COOKIE } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) redirect("/login");
  const payload = await verifySession(token);
  if (!payload) redirect("/login");
  return <>{children}</>;
}
