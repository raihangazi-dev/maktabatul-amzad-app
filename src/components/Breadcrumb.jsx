"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { useBreadcrumb } from "@/context/BreadcrumbContext";

const LABELS = {
  books: "Books",
  writers: "Writers",
  editors: "Editors",
  translators: "Translators",
  publishers: "Publishers",
  importers: "Importers",
  categories: "Categories",
  subcategories: "Sub Categories",
  banners: "Banners",
  orders: "Orders",
  users: "Users",
  add: "Add New",
  edit: "Edit",
  about: "About Us",
  cart: "Cart",
  "confirm-order": "Confirm Order",
  auth: "Auth",
  signin: "Sign In",
  signup: "Sign Up",
  user: "My Account",
  admin: "Dashboard",
  dashboard: "Dashboard",
};

const isIdSegment = (seg) => !LABELS[seg];

export default function Breadcrumb({ className = "" }) {
  const pathname = usePathname();
  const { extra } = useBreadcrumb() ?? { extra: [] };

  if (pathname === "/" || pathname === "/admin") return null;

  const segments = pathname.split("/").filter(Boolean);
  const isAdmin = segments[0] === "admin";

  const items = [];
  const baseLabel = isAdmin ? "Dashboard" : "Home";
  const baseHref  = isAdmin ? "/admin"    : "/";
  items.push({ label: baseLabel, href: baseHref, isBase: true });

  let builtPath = "";
  for (const [i, seg] of segments.entries()) {
    if (isAdmin && i === 0) { builtPath = "/admin"; continue; }
    builtPath += `/${seg}`;
    if (isIdSegment(seg)) continue; // skip raw IDs — extra[] will fill them in
    const label = LABELS[seg] ?? (seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, " "));
    items.push({ label, href: builtPath });
  }

  // Append extra crumbs provided by the current page (e.g. category + book title)
  for (const crumb of extra) {
    items.push(crumb);
  }

  if (items.length <= 1) return null;

  return (
    <nav aria-label="breadcrumb" className={`flex items-center gap-1 text-sm flex-wrap ${className}`}>
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <span key={`${item.href ?? item.label}-${idx}`} className="flex items-center gap-1">
            {idx > 0 && <ChevronRight className="h-3.5 w-3.5 flex-shrink-0 text-gray-400" />}
            {isLast || !item.href ? (
              <span className="font-semibold text-gray-900">{item.label}</span>
            ) : (
              <Link
                href={item.href}
                className="flex items-center gap-1 text-gray-500 transition-colors duration-150 hover:text-primary"
              >
                {item.isBase && <Home className="h-3.5 w-3.5 flex-shrink-0" />}
                <span>{item.label}</span>
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
