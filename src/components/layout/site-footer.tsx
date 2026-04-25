import Link from "next/link";
import { AtSign, BookOpen, ChevronRight, Clock, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "All Books", href: "/books" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Best Sellers", href: "/best-sellers" },
  { label: "Publishers", href: "/publishers" },
  { label: "Authors", href: "/authors" },
];

const footerCategories = [
  { label: "Quran & Tafseer", href: "/categories/quran-tafseer" },
  { label: "Hadith Collection", href: "/categories/hadith" },
  { label: "Fiqh & Islamic Law", href: "/categories/fiqh" },
  { label: "Seerah & Biography", href: "/categories/seerah" },
  { label: "Children's Books", href: "/categories/children-books" },
  { label: "Arabic Language", href: "/categories/arabic-language" },
];

const paymentMethods = ["bKash", "Nagad", "Visa", "MasterCard", "COD"];

const socialLinks = [
  { icon: AtSign, label: "Email" },
  { icon: MessageCircle, label: "Message" },
  { icon: Send, label: "Telegram" },
  { icon: BookOpen, label: "Catalog" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[#162018] bg-black px-4 py-14 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.25fr_1fr_1fr_1.25fr]">
          <div>
            <h2 className="text-4xl font-black tracking-[-0.06em] text-white md:text-[2.55rem]">
              মাকতাবাতুল আমজাদ
            </h2>
            <p className="mt-5 text-xs font-medium uppercase tracking-[0.28em] text-[#747873]">
              Islamic Book Centre - Est. 2005
            </p>
            <p className="mt-6 max-w-sm text-base leading-8 text-[#9aa29d]">
              Bangladesh&apos;s trusted destination for authentic Islamic books in Bangla, Arabic, and English.
              Serving readers for over two decades.
            </p>
            <div className="mt-7 flex gap-3">
              {socialLinks.map(({ icon: Icon, label }) => (
                <Link
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center border border-white/15 text-[#9aa29d] transition hover:border-[#108D41] hover:bg-[#108D41] hover:text-white"
                  href="/contact"
                  key={label}
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-base font-extrabold uppercase tracking-[0.22em] text-white">Quick Links</h3>
            <div className="mt-4 h-px w-24 bg-[#108D41]" />
            <div className="mt-7 grid gap-4">
              {quickLinks.map((link) => (
                <Link
                  className="group flex items-center gap-2 text-sm text-[#9aa29d] transition hover:text-white"
                  href={link.href}
                  key={link.label}
                >
                  <ChevronRight className="h-3.5 w-3.5 text-[#108D41] transition group-hover:translate-x-1" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-base font-extrabold uppercase tracking-[0.22em] text-white">Categories</h3>
            <div className="mt-4 h-px w-24 bg-[#108D41]" />
            <div className="mt-7 grid gap-4">
              {footerCategories.map((category) => (
                <Link
                  className="group flex items-center gap-2 text-sm text-[#9aa29d] transition hover:text-white"
                  href={category.href}
                  key={category.label}
                >
                  <ChevronRight className="h-3.5 w-3.5 text-[#108D41] transition group-hover:translate-x-1" />
                  {category.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-base font-extrabold uppercase tracking-[0.22em] text-white">Contact Us</h3>
            <div className="mt-4 h-px w-24 bg-[#108D41]" />
            <div className="mt-7 grid gap-5 text-sm leading-7 text-[#9aa29d]">
              <div className="flex gap-4">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-[#108D41]" />
                <p>123 Islampur Road, Old Dhaka, Bangladesh 1100</p>
              </div>
              <div className="flex gap-4">
                <Phone className="mt-1 h-4 w-4 shrink-0 text-[#108D41]" />
                <p>
                  +880 1700-000000
                  <br />
                  +880 2-9570000
                </p>
              </div>
              <div className="flex gap-4">
                <Mail className="mt-1 h-4 w-4 shrink-0 text-[#108D41]" />
                <p>info@maktabatulamzad.com</p>
              </div>
              <div className="flex gap-4">
                <Clock className="mt-1 h-4 w-4 shrink-0 text-[#108D41]" />
                <p>
                  Saturday - Thursday: 9am - 9pm
                  <br />
                  Friday: Closed during Jumu&apos;ah
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-white/10 pt-7 text-sm text-[#747873] md:flex-row md:items-center md:justify-between">
          <p>
            © 2025 Maktabatul Amzad. All rights reserved.{" "}
            <Link className="text-[#108D41] transition hover:text-white" href="/privacy-policy">
              Privacy Policy
            </Link>{" "}
            ·{" "}
            <Link className="text-[#108D41] transition hover:text-white" href="/terms-and-conditions">
              Terms
            </Link>
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-2 text-xs">Accepted:</span>
            {paymentMethods.map((method) => (
              <span
                className="border border-white/10 px-4 py-2 text-xs font-medium tracking-[0.08em] text-[#9aa29d]"
                key={method}
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
