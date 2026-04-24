import WritersClient from "./WritersClient";

export const metadata = { title: "Maktabatul Amzad - Writers" };

const BASE = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export default async function WritersPage() {
  const res = await fetch(`${BASE}/api/writers`, { cache: "no-store" });
  const writers = res.ok ? await res.json() : [];
  return <WritersClient writers={writers} />;
}
