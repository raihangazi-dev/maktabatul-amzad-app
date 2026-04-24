"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import {
  LayoutDashboard, BookOpen, PenLine, Edit3, Languages, Building2,
  Globe, Tag, FolderTree, Image as ImageIcon, ShoppingBag, Users,
  LogOut, ChevronLeft, ChevronRight, Plus, User, ExternalLink,
} from "lucide-react";

const NAV_GROUPS = [
  {
    label: "Overview",
    items: [
      { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    ],
  },
  {
    label: "Content",
    items: [
      { label: "Banners",  href: "/admin/banners", icon: ImageIcon, addHref: "/admin/banners/add" },
      { label: "Books",    href: "/admin/books",   icon: BookOpen,  addHref: "/admin/books/add"   },
    ],
  },
  {
    label: "Catalog",
    items: [
      { label: "Writers",        href: "/admin/writers",       icon: PenLine,   addHref: "/admin/writers/add"       },
      { label: "Editors",        href: "/admin/editors",       icon: Edit3,     addHref: "/admin/editors/add"       },
      { label: "Translators",    href: "/admin/translators",   icon: Languages, addHref: "/admin/translators/add"   },
      { label: "Publishers",     href: "/admin/publishers",    icon: Building2, addHref: "/admin/publishers/add"    },
      { label: "Importers",      href: "/admin/importers",     icon: Globe,     addHref: "/admin/importers/add"     },
      { label: "Categories",     href: "/admin/categories",    icon: Tag,       addHref: "/admin/categories/add"    },
      { label: "Sub Categories", href: "/admin/subcategories", icon: FolderTree,addHref: "/admin/subcategories/add" },
    ],
  },
  {
    label: "Commerce",
    items: [
      { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
      { label: "Users",  href: "/admin/users",  icon: Users },
    ],
  },
];

function NavItem({ item, collapsed, pathname }) {
  const Icon = item.icon;
  const isActive = item.href === "/admin"
    ? pathname === "/admin"
    : pathname.startsWith(item.href);

  return (
    <div
      className={`group flex items-center transition-all duration-150 border-l-[3px] ${
        isActive
          ? "border-primary bg-primary/10"
          : "border-transparent hover:bg-white/5"
      }`}
    >
      <Link
        href={item.href}
        title={collapsed ? item.label : undefined}
        className={`flex items-center gap-3 py-2.5 flex-1 min-w-0 ${
          collapsed ? "justify-center px-[18px]" : "px-4"
        } ${isActive ? "text-primary" : "text-slate-400 hover:text-slate-200"} transition-colors duration-150`}
      >
        <Icon className="h-[17px] w-[17px] flex-shrink-0" />
        {!collapsed && (
          <span className="text-[13px] truncate">{item.label}</span>
        )}
      </Link>
      {!collapsed && item.addHref && (
        <Link
          href={item.addHref}
          title={`Add ${item.label}`}
          className="pr-3 py-2.5 text-slate-600 hover:text-primary opacity-0 group-hover:opacity-100 transition-all duration-150 flex-shrink-0"
        >
          <Plus className="h-3.5 w-3.5" />
        </Link>
      )}
    </div>
  );
}

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="flex items-center gap-3 text-gray-500">
          <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-sm">Loading...</span>
        </div>
      </div>
    );
  }

  if (!session?.user || session.user.role !== "admin") return null;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">

      {/* ── Sidebar ── */}
      <aside
        className={`${collapsed ? "w-[60px]" : "w-[230px]"} bg-[#0f172a] flex flex-col flex-shrink-0 overflow-hidden transition-[width] duration-300 ease-in-out`}
      >
        {/* Brand header */}
        <div className={`h-16 flex items-center border-b border-white/8 flex-shrink-0 ${
          collapsed ? "justify-center" : "justify-between px-4"
        }`}>
          {!collapsed && (
            <Link href="/" className="text-white font-bold text-[11px] tracking-[0.12em] uppercase leading-tight">
              Maktabatul<br />Amzad
            </Link>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`text-slate-500 hover:text-white transition-colors p-1.5 hover:bg-white/5 flex-shrink-0 ${
              collapsed ? "" : ""
            }`}
          >
            {collapsed
              ? <ChevronRight className="h-4 w-4" />
              : <ChevronLeft  className="h-4 w-4" />
            }
          </button>
        </div>

        {/* User info */}
        <div className={`border-b border-white/8 flex-shrink-0 ${collapsed ? "py-3 flex justify-center" : "px-4 py-3"}`}>
          <div className={`flex items-center ${collapsed ? "" : "gap-3"}`}>
            <div className="h-8 w-8 bg-primary flex items-center justify-center flex-shrink-0 overflow-hidden">
              {session?.user?.image
                ? <img src={session.user.image} className="h-full w-full object-cover" alt="" />
                : <User className="h-4 w-4 text-white" />
              }
            </div>
            {!collapsed && (
              <div className="overflow-hidden">
                <p className="text-white text-[13px] font-semibold truncate">{session?.user?.name || "Admin"}</p>
                <p className="text-slate-500 text-[11px] truncate">{session?.user?.email}</p>
              </div>
            )}
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-2 scrollbar-thin">
          {NAV_GROUPS.map((group) => (
            <div key={group.label} className="mb-1">
              {!collapsed ? (
                <p className="px-4 pt-3 pb-1 text-[10px] font-bold text-slate-600 uppercase tracking-[0.1em]">
                  {group.label}
                </p>
              ) : (
                <div className="mx-3 my-2 h-px bg-white/6" />
              )}
              {group.items.map((item) => (
                <NavItem
                  key={item.href}
                  item={item}
                  collapsed={collapsed}
                  pathname={pathname}
                />
              ))}
            </div>
          ))}
        </nav>

        {/* Footer actions */}
        <div className="border-t border-white/8 flex-shrink-0">
          {!collapsed && (
            <Link
              href="/"
              className="flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-slate-500 hover:text-white transition-colors"
            >
              <ExternalLink className="h-4 w-4 flex-shrink-0" />
              View Site
            </Link>
          )}
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            title={collapsed ? "Sign Out" : undefined}
            className={`flex items-center gap-2.5 w-full py-3 text-slate-500 hover:text-red-400 hover:bg-red-500/5 transition-colors ${
              collapsed ? "justify-center px-0" : "px-4"
            }`}
          >
            <LogOut className="h-4 w-4 flex-shrink-0" />
            {!collapsed && <span className="text-[13px]">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* ── Right panel ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Topbar */}
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0">
          <Breadcrumb />
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span className="hidden sm:block">{session?.user?.name}</span>
            <div className="h-7 w-7 bg-primary flex items-center justify-center overflow-hidden flex-shrink-0">
              {session?.user?.image
                ? <img src={session.user.image} className="h-full w-full object-cover" alt="" />
                : <User className="h-3.5 w-3.5 text-white" />
              }
            </div>
          </div>
        </div>

        {/* Content */}
        <main className="flex-1 overflow-auto admin-content">
          {children}
        </main>
      </div>
    </div>
  );
}
