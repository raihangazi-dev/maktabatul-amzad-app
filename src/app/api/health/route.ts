import { apiPlaceholder } from "@/lib/api-response";

export async function GET() {
  return apiPlaceholder("Health check", ["GET"]);
}

