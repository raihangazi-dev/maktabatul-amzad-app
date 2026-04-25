import { apiPlaceholder } from "@/lib/api-response";

export async function GET() {
  return apiPlaceholder("Reviews collection", ["GET", "POST"]);
}

export async function POST() {
  return apiPlaceholder("Reviews collection", ["GET", "POST"]);
}

