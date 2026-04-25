import { apiPlaceholder } from "@/lib/api-response";

export async function GET() {
  return apiPlaceholder("Authors collection", ["GET", "POST"]);
}

export async function POST() {
  return apiPlaceholder("Authors collection", ["GET", "POST"]);
}

