"use client";
import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, User, Phone, Mail, ChevronDown, Menu, X, LogOut } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { useSession, signOut } from "next-auth/react";

const navLinks = [
  { en: "Home", bn: "হোম", ar: "بيت", href: "/" },
  { en: "Books", bn: "বই", ar: "كتب", href: "/books" },
  { en: "Writers", bn: "লেখক", ar: "الكتاب", href: "/writers" },
  { en: "Publishers", bn: "প্রকাশক", ar: "الناشرين", href: "/publishers" },
  { en: "Category", bn: "ক্যাটেগরি", ar: "فئة", href: "/categories" },
  { en: "About", bn: "আমাদের সম্পর্কে", ar: "عن", href: "/about" },
];

const langLabels = ["বাংলা", "English", "العربية"];

export default function Header() {
  const { cart } = useCart();
  const { language, changeLanguage } = useLanguage();
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const getLabel = (link) => {
    if (language === 0) return link.bn;
    if (language === 2) return link.ar;
    return link.en;
  };

  return (
    <header className="w-full sticky top-0 left-0 z-30">
      {/* Top bar */}
      <div className="bg-black text-white">
        <div className="container flex flex-col gap-2 py-2 text-sm font-medium md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-4 text-gray-100">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-300" />
              <span>+8801749-669155</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-300" />
              <span>maktabatulamjad@gmail.com</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-5 text-gray-100">
            <Link href="/cart" className="flex items-center gap-2 hover:text-primary transition-colors">
              <ShoppingCart className="h-4 w-4" />
              <span>Cart ({cart.length})</span>
            </Link>

            {/* Language switcher */}
            <div className="relative">
              <button
                onClick={() => { setLangOpen(!langOpen); setAccountOpen(false); }}
                className="flex items-center gap-1 hover:text-primary transition-colors"
              >
                <span>{langLabels[language]}</span>
                <ChevronDown className="h-3 w-3" />
              </button>
              {langOpen && (
                <div className="absolute top-full right-0 mt-1 bg-white text-black shadow-lg border min-w-[120px]">
                  {langLabels.map((label, i) => (
                    <button
                      key={i}
                      onClick={() => { changeLanguage(i); setLangOpen(false); }}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${language === i ? "text-primary font-semibold" : ""}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Account */}
            <div className="relative">
              <button
                onClick={() => { setAccountOpen(!accountOpen); setLangOpen(false); }}
                className="flex items-center gap-1 hover:text-primary transition-colors"
              >
                <User className="h-4 w-4" />
                <span>{session?.user?.name || "Account"}</span>
                <ChevronDown className="h-3 w-3" />
              </button>
              {accountOpen && (
                <div className="absolute top-full right-0 mt-1 bg-white text-black shadow-lg border min-w-[140px]">
                  {session ? (
                    <>
                      <Link href="/user" className="block px-4 py-2 text-sm hover:bg-gray-100">My Orders</Link>
                      {session.user?.role === "admin" && (
                        <Link href="/admin" className="block px-4 py-2 text-sm hover:bg-gray-100">Admin Panel</Link>
                      )}
                      <button
                        onClick={() => signOut()}
                        className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red"
                      >
                        <LogOut className="h-3 w-3" /> Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link href="/auth/signin" className="block px-4 py-2 text-sm hover:bg-gray-100">Sign In</Link>
                      <Link href="/auth/signup" className="block px-4 py-2 text-sm hover:bg-gray-100">Sign Up</Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="bg-primary py-2">
        <div className="container flex justify-between items-center">
          <Link href="/">
            <img src="https://i.ibb.co/0sPhz6P/logo.png" className="h-6 md:h-8 lg:h-10" alt="Maktabatul Amzad" />
          </Link>

          {/* Desktop menu */}
          <ul className="hidden md:flex items-center space-x-2 md:space-x-4 text-white font-medium">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-md lg:text-lg capitalize hover:text-gold transition-colors">
                  {getLabel(link)}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile menu toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="block md:hidden text-white">
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-primary border-t border-green-700">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-6 py-3 text-white hover:bg-green-700 capitalize"
              >
                {getLabel(link)}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
