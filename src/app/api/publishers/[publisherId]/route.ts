import { apiPlaceholder } from "@/lib/api-response";

export async function GET() {
  return apiPlaceholder("Publisher item", ["GET", "PATCH", "DELETE"]);
}

export async function PATCH() {
  return apiPlaceholder("Publisher item", ["GET", "PATCH", "DELETE"]);
}

export async function DELETE() {
  return apiPlaceholder("Publisher item", ["GET", "PATCH", "DELETE"]);
}

