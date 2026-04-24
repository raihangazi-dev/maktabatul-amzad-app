// Edge-compatible auth config — no Node.js imports (bcrypt/mongoose not allowed here)
// Used by middleware.js which runs on the Edge runtime.

const authConfig = {
  pages: { signIn: "/auth/signin" },
  session: { strategy: "jwt" },
  providers: [],
  callbacks: {
    authorized({ auth: session, request: { nextUrl } }) {
      const isLoggedIn = !!session?.user;
      const isAdmin   = session?.user?.role === "admin";
      const { pathname } = nextUrl;

      if (pathname.startsWith("/admin")) {
        if (!isLoggedIn) return false; // NextAuth redirects to signIn page
        if (!isAdmin)    return Response.redirect(new URL("/", nextUrl));
        return true;
      }

      if (pathname.startsWith("/user") || pathname.startsWith("/confirm-order")) {
        return isLoggedIn;
      }

      return true;
    },
  },
};

export default authConfig;
