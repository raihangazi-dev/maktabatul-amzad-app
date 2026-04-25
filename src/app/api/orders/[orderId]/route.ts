import { apiPlaceholder } from "@/lib/api-response";

export async function GET() {
  return apiPlaceholder("Order item", ["GET", "PATCH"]);
}

export async function PATCH() {
  return apiPlaceholder("Order item", ["GET", "PATCH"]);
}

