import { apiPlaceholder } from "@/lib/api-response";

export async function GET() {
  return apiPlaceholder("Orders collection", ["GET", "POST"]);
}

export async function POST() {
  return apiPlaceholder("Orders collection", ["GET", "POST"]);
}

