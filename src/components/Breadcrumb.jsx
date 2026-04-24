"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

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

const isIdSegment = (seg) => {
  if (LABELS[seg]) return false;
  if (/^[a-f0-9]{24}$/.test(seg)) return true;
  return true;
};

export default function Breadcrumb({ className = "", variant = "site" }) {
  const pathname = usePathname();

  if (pathname === "/" || pathname === "/admin") return null;

  const segments = pathname.split("/").filter(Boolean);
  const isAdmin = segments[0] === "admin";

  const items = [];
  const baseHref = isAdmin ? "/admin" : "/";
  const baseLabel = isAdmin ? "Dashboard" : "Home";
  items.push({ label: baseLabel, href: baseHref, isBase: true });

  let builtPath = "";
  segments.forEach((seg, i) => {
    if (isAdmin && i === 0) { builtPath = "/admin"; return; }
    builtPath += `/${seg}`;
    if (isIdSegment(seg)) return;
    const label = LABELS[seg] || seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, " ");
    items.push({ label, href: builtPath });
  });

  if (items.length <= 1) return null;

  return (
    <nav aria-label="breadcrumb" className={`flex items-center gap-1 text-sm ${className}`}>
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <span key={item.href} className="flex items-center gap-1">
            {idx > 0 && <ChevronRight className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />}
            {isLast ? (
              <span className="text-gray-900 font-semibold">{item.label}</span>
            ) : (
              <Link
                href={item.href}
                className="flex items-center gap-1 text-gray-500 hover:text-primary transition-colors duration-150"
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
