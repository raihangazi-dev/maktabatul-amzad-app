import NextAuth from "next-auth";
import authConfig from "@/lib/auth.config";

// Uses only Edge-compatible authConfig — no bcrypt/mongoose imports here.
export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  matcher: ["/admin/:path*", "/user/:path*", "/confirm-order/:path*"],
};
