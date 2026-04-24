import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  if (pathname.startsWith("/admin")) {
    if (!session) return NextResponse.redirect(new URL("/auth/signin", req.url));
    if (session.user?.role !== "admin") return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname.startsWith("/user")) {
    if (!session) return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  if (pathname.startsWith("/confirm-order")) {
    if (!session) return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/user/:path*", "/confirm-order/:path*"],
};
