import { apiPlaceholder } from "@/lib/api-response";

export async function GET() {
  return apiPlaceholder("Books collection", ["GET", "POST"]);
}

export async function POST() {
  return apiPlaceholder("Books collection", ["GET", "POST"]);
}

