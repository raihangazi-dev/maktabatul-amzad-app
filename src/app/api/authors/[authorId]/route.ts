import { apiPlaceholder } from "@/lib/api-response";

export async function GET() {
  return apiPlaceholder("Author item", ["GET", "PATCH", "DELETE"]);
}

export async function PATCH() {
  return apiPlaceholder("Author item", ["GET", "PATCH", "DELETE"]);
}

export async function DELETE() {
  return apiPlaceholder("Author item", ["GET", "PATCH", "DELETE"]);
}

