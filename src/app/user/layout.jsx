"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, User } from "lucide-react";

const navLinks = [
  { href: "/user", label: "Dashboard", icon: LayoutDashboard },
  { href: "/user/orders", label: "My Orders", icon: ShoppingBag },
];

export default function UserLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth/signin");
  }, [status, router]);

  if (status === "loading") return <div className="flex items-center justify-center h-screen text-gray-500">Loading...</div>;
  if (!session) return null;

  return (
    <div className="flex min-h-screen">
      <aside className="w-56 bg-gray-900 text-white flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium truncate">{session.user?.name}</p>
              <p className="text-xs text-gray-400 truncate">{session.user?.email}</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2 px-3 py-2 rounded text-sm transition-colors ${pathname === href ? "bg-primary text-white" : "text-gray-300 hover:bg-gray-700"}`}
            >
              <Icon className="h-4 w-4" /> {label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 bg-gray-50 overflow-auto">{children}</main>
    </div>
  );
}
