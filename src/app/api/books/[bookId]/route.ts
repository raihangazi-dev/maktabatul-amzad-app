import { apiPlaceholder } from "@/lib/api-response";

export async function GET() {
  return apiPlaceholder("Book item", ["GET", "PATCH", "DELETE"]);
}

export async function PATCH() {
  return apiPlaceholder("Book item", ["GET", "PATCH", "DELETE"]);
}

export async function DELETE() {
  return apiPlaceholder("Book item", ["GET", "PATCH", "DELETE"]);
}

