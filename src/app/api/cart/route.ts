import { apiPlaceholder } from "@/lib/api-response";

export async function GET() {
  return apiPlaceholder("Cart", ["GET", "POST"]);
}

export async function POST() {
  return apiPlaceholder("Cart", ["GET", "POST"]);
}

