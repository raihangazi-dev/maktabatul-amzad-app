"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  ChevronDown,
  Globe,
  LogOut,
  Mail,
  Menu,
  Phone,
  Search,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Books", href: "/books" },
  { label: "Writers", href: "/writers" },
  { label: "Publishers", href: "/publishers" },
  { label: "Categories", href: "/categories" },
  { label: "About", href: "/about" },
];

const langLabels = ["Bangla", "English", "Arabic"];

export default function Header() {
  const { cart } = useCart();
  const { language, changeLanguage } = useLanguage();
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const closeMenus = () => {
    setLangOpen(false);
    setAccountOpen(false);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    router.push(`/books?title=${encodeURIComponent(q)}`);
    setSearchQuery("");
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full shadow-[0_2px_18px_rgba(0,0,0,0.08)]">
      <div className="bg-black text-white">
        <div className="container flex flex-col gap-2 py-2 text-xs font-medium md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-4 text-white/75">
            <a href="tel:+8801749669155" className="flex items-center gap-1.5 hover:text-primary transition-colors">
              <Phone className="h-3.5 w-3.5" />
              <span>+8801749-669155</span>
            </a>
            <a href="mailto:maktabatulamjad@gmail.com" className="flex items-center gap-1.5 hover:text-primary transition-colors">
              <Mail className="h-3.5 w-3.5" />
              <span>maktabatulamjad@gmail.com</span>
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-white/75">
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setLangOpen((open) => !open);
                  setAccountOpen(false);
                }}
                className="flex items-center gap-1.5 hover:text-primary transition-colors"
              >
                <Globe className="h-3.5 w-3.5" />
                <span>{langLabels[language] || "English"}</span>
                <ChevronDown className={`h-3 w-3 transition-transform ${langOpen ? "rotate-180" : ""}`} />
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 min-w-36 border border-gray-100 bg-white py-1 text-gray-800 shadow-xl animate-slideDown">
                  {langLabels.map((label, index) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => {
                        changeLanguage(index);
                        setLangOpen(false);
                      }}
                      className={`flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm hover:bg-green-50 transition-colors ${
                        language === index ? "font-semibold text-primary" : ""
                      }`}
                    >
                      <span className={`h-1.5 w-1.5 ${language === index ? "bg-primary" : "bg-gray-200"}`} />
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setAccountOpen((open) => !open);
                  setLangOpen(false);
                }}
                className="flex items-center gap-1.5 hover:text-primary transition-colors"
              >
                <User className="h-3.5 w-3.5" />
                <span className="max-w-24 truncate">{session?.user?.name?.split(" ")[0] || "Account"}</span>
                <ChevronDown className={`h-3 w-3 transition-transform ${accountOpen ? "rotate-180" : ""}`} />
              </button>
              {accountOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 min-w-44 border border-gray-100 bg-white py-1 text-gray-800 shadow-xl animate-slideDown">
                  {session ? (
                    <>
                      <div className="border-b border-gray-100 px-4 py-3">
                        <p className="truncate text-xs font-bold text-gray-900">{session.user?.name}</p>
                        <p className="truncate text-[11px] text-gray-500">{session.user?.email}</p>
                      </div>
                      <Link href="/user" onClick={closeMenus} className="block px-4 py-2.5 text-sm hover:bg-green-50 transition-colors">
                        My Account
                      </Link>
                      <Link href="/cart" onClick={closeMenus} className="flex items-center justify-between px-4 py-2.5 text-sm hover:bg-green-50 transition-colors">
                        <span className="flex items-center gap-2">
                          <ShoppingCart className="h-3.5 w-3.5 text-gray-400" />
                          Cart
                        </span>
                        {cart.length > 0 && (
                          <span className="flex h-4 min-w-4 items-center justify-center bg-red px-1 text-[10px] font-bold text-white">
                            {cart.length}
                          </span>
                        )}
                      </Link>
                      {session.user?.role === "admin" && (
                        <Link href="/admin" onClick={closeMenus} className="block px-4 py-2.5 text-sm font-semibold text-primary hover:bg-green-50 transition-colors">
                          Admin Panel
                        </Link>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          signOut({ callbackUrl: "/" });
                          closeMenus();
                        }}
                        className="flex w-full items-center gap-2 border-t border-gray-100 px-4 py-2.5 text-left text-sm text-red hover:bg-red/5 transition-colors"
                      >
                        <LogOut className="h-3.5 w-3.5" />
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link href="/cart" onClick={closeMenus} className="flex items-center justify-between px-4 py-2.5 text-sm hover:bg-green-50 transition-colors">
                        <span className="flex items-center gap-2">
                          <ShoppingCart className="h-3.5 w-3.5 text-gray-400" />
                          Cart
                        </span>
                        {cart.length > 0 && (
                          <span className="flex h-4 min-w-4 items-center justify-center bg-red px-1 text-[10px] font-bold text-white">
                            {cart.length}
                          </span>
                        )}
                      </Link>
                      <div className="border-t border-gray-100" />
                      <Link href="/auth/signin" onClick={closeMenus} className="block px-4 py-2.5 text-sm hover:bg-green-50 transition-colors">
                        Sign In
                      </Link>
                      <Link href="/auth/signup" onClick={closeMenus} className="block px-4 py-2.5 text-sm font-semibold text-primary hover:bg-green-50 transition-colors">
                        Create Account
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <nav className="bg-primary text-white">
        <div className="container grid min-h-16 grid-cols-[auto_1fr_auto] items-center gap-4">
          <Link href="/" onClick={closeMenus} className="flex items-center gap-2 pr-2">
            <span className="flex h-10 w-10 items-center justify-center bg-white text-lg font-black text-primary">MA</span>
            <span className="hidden text-sm font-black uppercase tracking-[0.12em] sm:block">
              Maktabatul Amzad
            </span>
          </Link>

          <ul className="hidden items-center justify-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`group relative inline-flex px-3 py-5 text-sm font-semibold transition-colors ${
                      active ? "text-white" : "text-white/80 hover:text-white"
                    }`}
                  >
                    {link.label}
                    <span className={`absolute bottom-0 left-3 right-3 h-[3px] bg-white transition-transform duration-200 ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center justify-end gap-2">
            <form onSubmit={handleSearch} className="hidden h-10 items-center border border-white/25 bg-white/10 transition-colors focus-within:border-white md:flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search books..."
                className="h-full w-48 bg-transparent px-3 text-sm text-white outline-none placeholder:text-white/60 xl:w-56"
              />
              <button type="submit" className="flex h-full w-10 items-center justify-center bg-black/15 hover:bg-black/25 transition-colors">
                <Search className="h-4 w-4" />
              </button>
            </form>

            <button
              type="button"
              onClick={() => {
                setMobileOpen((open) => !open);
                closeMenus();
              }}
              className="flex h-10 w-10 items-center justify-center bg-black/15 hover:bg-black/25 transition-colors lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t border-white/10 bg-primary pb-3 lg:hidden animate-slideDown">
            <form onSubmit={handleSearch} className="container mt-3 flex border border-white/25 bg-white/10">
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search books..."
                className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-white/60"
              />
              <button type="submit" className="px-3 text-white">
                <Search className="h-4 w-4" />
              </button>
            </form>
            <div className="container mt-3 grid gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2 text-sm font-semibold text-white/90 hover:bg-black/10 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
