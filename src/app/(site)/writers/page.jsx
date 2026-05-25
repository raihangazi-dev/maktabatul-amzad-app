import WritersClient from "./WritersClient";
import { getBaseUrl } from "@/lib/baseUrl";

export const metadata = { title: "Maktabatul Amzad - Writers" };

export default async function WritersPage() {
  const BASE = await getBaseUrl();
  const res = await fetch(`${BASE}/api/writers`, { cache: "no-store" });
  const writers = res.ok ? await res.json() : [];
  return <WritersClient writers={writers} />;
}
