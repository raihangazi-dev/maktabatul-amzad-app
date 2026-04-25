import { apiPlaceholder } from "@/lib/api-response";

export async function POST() {
  return apiPlaceholder("Auth logout", ["POST"]);
}

