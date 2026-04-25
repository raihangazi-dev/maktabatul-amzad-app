import { apiPlaceholder } from "@/lib/api-response";

export async function GET() {
  return apiPlaceholder("Review item", ["GET", "PATCH", "DELETE"]);
}

export async function PATCH() {
  return apiPlaceholder("Review item", ["GET", "PATCH", "DELETE"]);
}

export async function DELETE() {
  return apiPlaceholder("Review item", ["GET", "PATCH", "DELETE"]);
}

