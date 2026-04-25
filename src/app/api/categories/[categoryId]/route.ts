import { apiPlaceholder } from "@/lib/api-response";

export async function GET() {
  return apiPlaceholder("Category item", ["GET", "PATCH", "DELETE"]);
}

export async function PATCH() {
  return apiPlaceholder("Category item", ["GET", "PATCH", "DELETE"]);
}

export async function DELETE() {
  return apiPlaceholder("Category item", ["GET", "PATCH", "DELETE"]);
}

