import { apiPlaceholder } from "@/lib/api-response";

export async function GET() {
  return apiPlaceholder("Publishers collection", ["GET", "POST"]);
}

export async function POST() {
  return apiPlaceholder("Publishers collection", ["GET", "POST"]);
}

