"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { ChevronLeft, ChevronRight, LayoutDashboard, ShoppingBag, User } from "lucide-react";

const navLinks = [
  { href: "/user", label: "Dashboard", icon: LayoutDashboard },
  { href: "/user/orders", label: "My Orders", icon: ShoppingBag },
];

export default function UserLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth/signin");
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 text-gray-500">
        Loading...
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className={`${collapsed ? "w-[64px]" : "w-64"} flex flex-col bg-[#0f172a] text-white transition-[width] duration-300`}>
        <div className={`flex h-16 items-center border-b border-white/10 ${collapsed ? "justify-center" : "justify-between px-4"}`}>
          {!collapsed && (
            <Link href="/" className="text-xs font-black uppercase tracking-[0.14em]">
              Maktabatul Amzad
            </Link>
          )}
          <button
            type="button"
            onClick={() => setCollapsed((value) => !value)}
            className="p-1.5 text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
            aria-label="Toggle user sidebar"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        <div className={`border-b border-white/10 ${collapsed ? "flex justify-center py-4" : "p-4"}`}>
          <div className={`flex items-center ${collapsed ? "" : "gap-3"}`}>
            <div className="flex h-9 w-9 items-center justify-center bg-primary">
              <User className="h-5 w-5 text-white" />
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{session.user?.name}</p>
                <p className="truncate text-xs text-slate-400">{session.user?.email}</p>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 py-3">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                title={collapsed ? label : undefined}
                className={`flex items-center gap-3 border-l-[3px] py-3 text-sm font-medium transition-colors ${
                  collapsed ? "justify-center px-0" : "px-4"
                } ${
                  active
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-transparent text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                {!collapsed && <span>{label}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>

      <main className="min-w-0 flex-1 overflow-auto">{children}</main>
    </div>
  );
}
