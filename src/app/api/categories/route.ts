import { apiPlaceholder } from "@/lib/api-response";

export async function GET() {
  return apiPlaceholder("Categories collection", ["GET", "POST"]);
}

export async function POST() {
  return apiPlaceholder("Categories collection", ["GET", "POST"]);
}

