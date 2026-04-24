import PublishersClient from "./PublishersClient";

export const metadata = { title: "Maktabatul Amzad - Publishers" };

const BASE = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export default async function PublishersPage() {
  const res = await fetch(`${BASE}/api/publishers`, { cache: "no-store" });
  const publishers = res.ok ? await res.json() : [];
  return <PublishersClient publishers={publishers} />;
}
