import PublishersClient from "./PublishersClient";
import { getBaseUrl } from "@/lib/baseUrl";

export const metadata = { title: "Maktabatul Amzad - Publishers" };

export default async function PublishersPage() {
  const BASE = await getBaseUrl();
  const res = await fetch(`${BASE}/api/publishers`, { cache: "no-store" });
  const publishers = res.ok ? await res.json() : [];
  return <PublishersClient publishers={publishers} />;
}
