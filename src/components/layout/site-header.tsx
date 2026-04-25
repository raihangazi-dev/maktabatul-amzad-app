import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { TopHeader } from "@/components/layout/top-header";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Books", href: "/books" },
  { label: "Writers", href: "/authors" },
  { label: "Publishers", href: "/publishers" },
  { label: "Categories", href: "/categories" },
  { label: "About", href: "/about" },
];

export function SiteHeader() {
  return (
    <header>
      <TopHeader />

      <nav className="bg-[#108D41] text-white shadow-[0_10px_30px_rgba(0,0,0,0.22)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-5 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <Link href="/" aria-label="Maktabatul Amzad home" className="inline-flex shrink-0 items-center">
            <Image
              src="/images/logos/header-logo.png"
              alt="Maktabatul Amzad"
              width={194}
              height={52}
              className="h-12 w-auto"
              priority
            />
          </Link>

          <div className="flex flex-wrap items-center gap-x-9 gap-y-3 text-xs font-bold uppercase tracking-[0.22em] text-white">
            {navItems.map((item) => (
              <Link className="text-white transition hover:text-white/80" href={item.href} key={item.label}>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <label className="flex min-w-0 flex-1 items-center gap-3 bg-white/12 px-4 py-3 text-white ring-1 ring-white/10 lg:w-72">
              <Search className="h-4 w-4 shrink-0" />
              <input
                aria-label="Search books"
                className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white"
                placeholder="Search for books, author"
              />
            </label>
          </div>
        </div>
      </nav>
    </header>
  );
}
