"use client";

import Link from "next/link";
import { ChevronDown, Globe2, Mail, Phone, ShoppingCart, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type OpenMenu = "language" | "account" | null;

const languages = ["Bangla", "English", "Arabic"];

export function TopHeader() {
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!headerRef.current?.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenMenu(null);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="border-y border-[#006437] bg-[#111111] text-white" ref={headerRef}>
      <div className="mx-auto flex min-h-9 max-w-[1210px] items-center justify-between gap-6 px-4 text-xs font-semibold leading-none lg:px-0">
        <div className="flex flex-wrap items-center gap-6 text-white">
          <span className="flex items-center gap-1.5">
            <Phone className="h-3.5 w-3.5" />
            +8801749-669155
          </span>
          <span className="flex items-center gap-1.5">
            <Mail className="h-3.5 w-3.5" />
            maktabatulamjad@gmail.com
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-7">
          <div className="relative">
            <button
              aria-expanded={openMenu === "language"}
              className={`flex items-center gap-1.5 transition hover:text-[#00a85a] ${openMenu === "language" ? "text-[#00a85a]" : "text-white"}`}
              onClick={() => setOpenMenu((current) => (current === "language" ? null : "language"))}
              type="button"
            >
              <Globe2 className="h-3.5 w-3.5" />
              English
              <ChevronDown className={`h-3.5 w-3.5 transition ${openMenu === "language" ? "rotate-180" : ""}`} />
            </button>

            {openMenu === "language" ? (
              <div className="absolute right-0 top-[calc(100%+10px)] z-50 w-44 bg-white py-2 text-sm text-[#1f2937] shadow-[0_18px_40px_rgba(0,0,0,0.16)]">
                {languages.map((language) => {
                  const isActive = language === "English";

                  return (
                    <button
                      className={`flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-[#eaf7ef] hover:text-[#006437] ${isActive ? "bg-[#eaf7ef] font-bold text-[#006437]" : "text-[#1f2937]"}`}
                      key={language}
                      onClick={() => setOpenMenu(null)}
                      type="button"
                    >
                      <span className={`h-1.5 w-1.5 ${isActive ? "bg-[#006437]" : "bg-[#e5e7eb]"}`} />
                      {language}
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>

          <div className="relative">
            <button
              aria-expanded={openMenu === "account"}
              className={`flex items-center gap-1.5 transition hover:text-[#00a85a] ${openMenu === "account" ? "text-[#00a85a]" : "text-white"}`}
              onClick={() => setOpenMenu((current) => (current === "account" ? null : "account"))}
              type="button"
            >
              <User className="h-3.5 w-3.5" />
              Account
              <ChevronDown className={`h-3.5 w-3.5 transition ${openMenu === "account" ? "rotate-180" : ""}`} />
            </button>

            {openMenu === "account" ? (
              <div className="absolute right-0 top-[calc(100%+10px)] z-50 w-48 bg-white py-2 text-sm text-[#1f2937] shadow-[0_18px_40px_rgba(0,0,0,0.16)]">
                <Link
                  className="flex items-center gap-3 bg-[#eaf7ef] px-4 py-3 text-[#1f2937] transition hover:text-[#006437]"
                  href="/cart"
                  onClick={() => setOpenMenu(null)}
                >
                  <ShoppingCart className="h-4 w-4 text-[#9aa29d]" />
                  Cart
                </Link>
                <Link
                  className="block px-4 py-3 text-[#1f2937] transition hover:bg-[#eaf7ef] hover:text-[#006437]"
                  href="/login"
                  onClick={() => setOpenMenu(null)}
                >
                  Sign In
                </Link>
                <Link
                  className="block px-4 py-3 font-bold text-[#006437] transition hover:bg-[#eaf7ef]"
                  href="/register"
                  onClick={() => setOpenMenu(null)}
                >
                  Create Account
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
