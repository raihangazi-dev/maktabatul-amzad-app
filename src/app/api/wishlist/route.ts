import { apiPlaceholder } from "@/lib/api-response";

export async function GET() {
  return apiPlaceholder("Wishlist", ["GET", "POST"]);
}

export async function POST() {
  return apiPlaceholder("Wishlist", ["GET", "POST"]);
}

