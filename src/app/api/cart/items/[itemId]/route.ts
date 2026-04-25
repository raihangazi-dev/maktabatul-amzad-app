import { apiPlaceholder } from "@/lib/api-response";

export async function PATCH() {
  return apiPlaceholder("Cart item", ["PATCH", "DELETE"]);
}

export async function DELETE() {
  return apiPlaceholder("Cart item", ["PATCH", "DELETE"]);
}

