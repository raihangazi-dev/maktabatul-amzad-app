import Link from "next/link";
import Image from "next/image";
import { TopHeader } from "@/components/layout/top-header";
import {
  ArrowLeft,
  ArrowRight,
  AtSign,
  BookOpen,
  ChevronRight,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Quote,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";

type Book = {
  title: string;
  author: string;
  category: string;
  price: number;
  coverTitle: string;
  coverSubtitle: string;
  coverClass: string;
  tagClass?: string;
};

type Author = {
  name: string;
  era: string;
  portraitClass: string;
};

const featuredBooks: Book[] = [
  {
    title: "Principles of Islamic Jurisprudence",
    author: "Sheikh Al-Islam",
    category: "Fiqh",
    price: 850,
    coverTitle: "Usul al-Fiqh",
    coverSubtitle: "Foundations of Law",
    coverClass: "from-[#9b6d25] via-[#234232] to-[#0a1b15]",
  },
  {
    title: "The Golden Age of Baghdad",
    author: "Dr. Omar Tariq",
    category: "History",
    price: 1200,
    coverTitle: "Golden Baghdad",
    coverSubtitle: "A Scholarly Journey",
    coverClass: "from-[#080808] via-[#171717] to-[#3b2c24]",
  },
  {
    title: "Forty Hadith Explained",
    author: "Imam An-Nawawi",
    category: "Hadith",
    price: 450,
    coverTitle: "40 Hadith",
    coverSubtitle: "Teachings for Work",
    coverClass: "from-[#014b6f] via-[#08779a] to-[#061a23]",
  },
  {
    title: "Lights of Revelation",
    author: "Al-Baydawi",
    category: "Tafsir",
    price: 2500,
    coverTitle: "Safe at Work",
    coverSubtitle: "Revelation Notes",
    coverClass: "from-[#050505] via-[#1f1b17] to-[#0d0d0d]",
  },
  {
    title: "The Sealed Nectar",
    author: "Safiur Rahman",
    category: "Biography",
    price: 680,
    coverTitle: "Sealed Nectar",
    coverSubtitle: "Prophetic Biography",
    coverClass: "from-[#0d2230] via-[#155f7a] to-[#071119]",
  },
];

const newArrivals: Book[] = [
  {
    title: "Al-Itqan",
    author: "Jalaluddin Suyuti",
    category: "Quran",
    price: 1450,
    coverTitle: "Al-Itqan",
    coverSubtitle: "Quranic Sciences",
    coverClass: "from-[#101915] via-[#111111] to-[#353535]",
  },
  {
    title: "Riyad as-Salihin",
    author: "Imam An-Nawawi",
    category: "Hadith",
    price: 950,
    coverTitle: "Riyad",
    coverSubtitle: "Gardens of the Righteous",
    coverClass: "from-[#101820] via-[#224b61] to-[#071017]",
  },
  {
    title: "Al-Muqaddimah",
    author: "Ibn Khaldun",
    category: "History",
    price: 1800,
    coverTitle: "Muqaddimah",
    coverSubtitle: "Civilization and Society",
    coverClass: "from-[#5e7d89] via-[#263f4d] to-[#101316]",
  },
  {
    title: "The Book of Wisdom",
    author: "Ibn Ata Allah",
    category: "Spiritual Growth",
    price: 550,
    coverTitle: "Hikam",
    coverSubtitle: "Book of Wisdom",
    coverClass: "from-[#031014] via-[#11313d] to-[#05080a]",
  },
];

const categories = [
  "Aqeedah",
  "Fiqh",
  "Sirah",
  "Hadith",
  "History",
  "Arabic Language",
  "Spiritual Growth",
  "Children's Books",
  "Tasawwuf",
];

const authors: Author[] = [
  { name: "Imam Al-Ghazali", era: "1058 - 1111 CE", portraitClass: "from-[#141414] via-[#343434] to-[#090909]" },
  { name: "Ibn Kathir", era: "1300 - 1373 CE", portraitClass: "from-[#202020] via-[#4b4b4b] to-[#101010]" },
  { name: "Sheikh Al-Albani", era: "1914 - 1999 CE", portraitClass: "from-[#9d9d9d] via-[#d8d8d8] to-[#5d5d5d]" },
  { name: "Ibn Hazm", era: "994 - 1064 CE", portraitClass: "from-[#0f0f0f] via-[#2c2c2c] to-[#111111]" },
  { name: "Dr. Bilal Philips", era: "Contemporary", portraitClass: "from-[#222222] via-[#555555] to-[#141414]" },
  { name: "Fatima al-Fihri", era: "Legacy", portraitClass: "from-[#111111] via-[#424242] to-[#090909]" },
];

const bestSellers = [
  { title: "Tafsir Ibn Kathir (Complete Set)", price: 5500, badge: "BEST" },
  { title: "The Ideal Muslimah", price: 450, badge: "NEW" },
  { title: "Ar-Raheeq Al-Makhtum", price: 720, badge: "BIO" },
];

const recentPurchases = [
  { title: "History of Islam", time: "Purchased 2 mins ago", price: 900 },
  { title: "Fundamentals of Tawheed", time: "Purchased 15 mins ago", price: 350 },
  { title: "Patience and Gratitude", time: "Purchased 1 hour ago", price: 280 },
];

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

const formatPrice = (price: number) => `Tk ${price.toLocaleString("en-US")}.00`;

function SectionHeader({ eyebrow, title, href }: { eyebrow?: string; title: string; href?: string }) {
  return (
    <div className="mb-7 border-b border-[#263127] pb-4">
      <div className="flex items-end justify-between gap-6">
        <div>
          {eyebrow ? (
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-[#d32f2f]">{eyebrow}</p>
          ) : null}
          <h2 className="font-serif text-3xl leading-tight text-[#263127] md:text-4xl">{title}</h2>
        </div>
        {href ? (
          <Link
            href={href}
            className="hidden items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#263127] transition hover:text-[#006437] sm:flex"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        ) : null}
      </div>
    </div>
  );
}

function BookCover({ book, compact = false }: { book: Book; compact?: boolean }) {
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br ${book.coverClass} shadow-[0_18px_38px_rgba(0,0,0,0.22)] ${
        compact ? "aspect-[4/5]" : "aspect-[3/4]"
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_18%,rgba(255,255,255,0.28),transparent_24%),linear-gradient(90deg,rgba(0,0,0,0.35),transparent_18%,transparent_78%,rgba(255,255,255,0.08))]" />
      <div className="absolute inset-x-4 top-5 h-px bg-white/25" />
      <div className="relative flex h-full flex-col items-center justify-center px-5 text-center text-white">
        <p className="text-[0.62rem] font-bold uppercase tracking-[0.32em] text-white/65">Al-Maktaba</p>
        <h3 className="mt-4 font-serif text-2xl italic leading-none md:text-3xl">{book.coverTitle}</h3>
        <p className="mt-4 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/70">{book.coverSubtitle}</p>
      </div>
    </div>
  );
}

function ProductCard({ book }: { book: Book }) {
  return (
    <article className="group">
      <BookCover book={book} />
      <div className="mt-4">
        <span className="bg-black px-2 py-1 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-white">
          {book.category}
        </span>
        <h3 className="mt-3 font-serif text-xl leading-snug text-[#1f2c22] transition group-hover:text-[#006437]">
          {book.title}
        </h3>
        <p className="mt-1 text-sm text-[#747873]">{book.author}</p>
        <p className="mt-2 text-base font-extrabold text-[#d32f2f]">{formatPrice(book.price)}</p>
      </div>
    </article>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f4f7ef] text-[#263127]">
      <header>
        <TopHeader />

        <nav className="bg-[#006437] text-white shadow-[0_10px_30px_rgba(0,0,0,0.22)]">
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
              <Link className="text-white transition hover:text-white/80" href="/">Home</Link>
              <Link className="text-white transition hover:text-white/80" href="/books">Books</Link>
              <Link className="text-white transition hover:text-white/80" href="/authors">Writers</Link>
              <Link className="text-white transition hover:text-white/80" href="/publishers">Publishers</Link>
              <Link className="text-white transition hover:text-white/80" href="/categories">Categories</Link>
              <Link className="text-white transition hover:text-white/80" href="/about">About</Link>
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

      <section className="six-books-hero relative min-h-[580px] overflow-hidden border-b border-black text-white md:min-h-[650px]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,15,15,0.98)_0%,rgba(19,17,15,0.94)_34%,rgba(26,19,15,0.72)_58%,rgba(18,13,10,0.18)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.06)_52%,rgba(0,0,0,0.52)_100%)]" />
        <div className="relative mx-auto flex min-h-[580px] max-w-[1440px] items-center px-6 py-20 md:min-h-[650px] lg:px-10">
          <div className="max-w-[650px]">
            <h1 className="max-w-[560px] font-sans text-[3.35rem] font-extrabold leading-[1.02] tracking-[-0.045em] text-white sm:text-[4.2rem] lg:text-[4.55rem]">
              The Six Books Collection
            </h1>
            <p className="mt-7 font-sans text-[1.45rem] font-medium leading-snug tracking-[-0.02em] text-[#ffbd17] sm:text-[1.62rem]">
              Bukhari, Muslim, Abu Dawud, Tirmidhi, Nasa&apos;i and Ibn Majah
            </p>
            <p className="mt-5 max-w-[650px] font-sans text-[1.08rem] font-normal leading-8 tracking-[-0.012em] text-white/90 sm:text-[1.18rem]">
              Discover authentic Islamic literature and expand your knowledge with our curated collection of classical and contemporary works.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/shop"
                className="brand-button brand-button-primary w-full sm:w-[210px]"
              >
                Browse Collection
              </Link>
              <Link
                href="/about"
                className="brand-button brand-button-neutral w-full sm:w-[150px]"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="paper-panel px-4 py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader eyebrow="Featured Partner" title="Maktabatul Amzad Publishers" href="/publishers" />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {featuredBooks.map((book) => (
              <ProductCard key={book.title} book={book} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#edf2e9] px-4 py-16 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.72fr_1.5fr]">
          <div>
            <SectionHeader title="Browse Categories" />
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Link
                  href="/categories"
                  key={category}
                  className="bg-black px-4 py-2 text-xs font-extrabold uppercase tracking-[0.12em] text-white transition hover:bg-[#006437]"
                >
                  {category}
                </Link>
              ))}
            </div>
            <blockquote className="mt-9 border-l-4 border-[#d32f2f] bg-white px-7 py-8 font-serif text-xl italic leading-relaxed text-[#747873] shadow-sm">
              The pursuit of knowledge is an obligation upon every Muslim. We curate our collection to ensure authenticity and scholarly rigor.
              <footer className="mt-5 font-sans text-xs font-bold uppercase tracking-[0.15em] text-[#747873]">Editorial Board</footer>
            </blockquote>
          </div>

          <div>
            <div className="mb-7 flex items-end justify-between border-b border-[#263127] pb-4">
              <h2 className="font-serif text-3xl leading-tight text-[#263127] md:text-4xl">New Arrivals</h2>
              <div className="flex gap-2">
                <button className="grid h-10 w-10 place-items-center border border-[#263127] text-[#263127] transition hover:bg-[#263127] hover:text-white" aria-label="Previous arrivals">
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button className="grid h-10 w-10 place-items-center border border-[#263127] text-[#263127] transition hover:bg-[#263127] hover:text-white" aria-label="Next arrivals">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-4">
              {newArrivals.map((book) => (
                <article key={book.title} className="group">
                  <BookCover book={book} compact />
                  <h3 className="mt-4 font-serif text-xl text-[#263127] group-hover:text-[#006437]">{book.title}</h3>
                  <p className="mt-1 text-sm font-extrabold text-[#d32f2f]">{formatPrice(book.price)}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 lg:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="font-serif text-4xl text-[#263127]">Distinguished Authors</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {authors.map((author) => (
              <Link href="/authors" key={author.name} className="group block">
                <div className={`relative aspect-square overflow-hidden bg-gradient-to-br ${author.portraitClass}`}>
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute left-1/2 top-[44%] h-16 w-16 -translate-x-1/2 rounded-full bg-white/70 shadow-inner" />
                  <div className="absolute left-1/2 top-[31%] h-12 w-12 -translate-x-1/2 rounded-full bg-white/75" />
                  <BookOpen className="absolute bottom-5 left-1/2 h-8 w-8 -translate-x-1/2 text-white/75 transition group-hover:text-white" />
                </div>
                <h3 className="mt-4 font-serif text-lg text-[#263127] transition group-hover:text-[#006437]">{author.name}</h3>
                <p className="text-xs text-[#747873]">{author.era}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black px-4 py-16 text-white lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
          <div>
            <h2 className="border-b border-white/20 pb-5 font-serif text-4xl">Best Sellers</h2>
            <div className="mt-7 space-y-5">
              {bestSellers.map((item) => (
                <div key={item.title} className="flex gap-5">
                  <div className="grid h-20 w-16 shrink-0 place-items-center bg-gradient-to-br from-[#8e3c44] to-[#111] text-center text-xs font-black uppercase tracking-[0.12em] text-[#d9c08a]">
                    {item.badge}
                  </div>
                  <div>
                    <h3 className="font-serif text-xl">{item.title}</h3>
                    <p className="mt-1 font-extrabold text-[#00c875]">{formatPrice(item.price)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="border-b border-white/20 pb-5 font-serif text-4xl">Recently Purchased</h2>
            <div className="mt-7 space-y-4">
              {recentPurchases.map((item) => (
                <div key={item.title} className="flex items-center justify-between gap-5 bg-white/10 px-6 py-5">
                  <div>
                    <h3 className="font-serif text-lg">{item.title}</h3>
                    <p className="mt-1 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-white/40">{item.time}</p>
                  </div>
                  <p className="shrink-0 font-extrabold">{formatPrice(item.price)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-t border-black bg-[#f7faf3] px-4 py-20 text-center lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Quote className="mx-auto h-10 w-10 fill-[#d32f2f] text-[#d32f2f]" />
          <p className="mt-7 font-serif text-2xl italic leading-relaxed text-[#263127] md:text-3xl">
            The quality of the binding and the scholarly selection at Al-Maktaba is unmatched. Finally, a place that treats books with the respect they deserve.
          </p>
          <div className="mt-8">
            <h3 className="font-serif text-lg font-semibold">Dr. Abdullah Mansoor</h3>
            <p className="text-sm text-[#747873]">Oxford Institute of Islamic Studies</p>
          </div>
          <div className="mt-7 flex justify-center gap-2">
            <span className="h-2 w-2 bg-[#006437]" />
            <span className="h-2 w-2 bg-[#d6ddd2]" />
            <span className="h-2 w-2 bg-[#d6ddd2]" />
          </div>
        </div>
      </section>

      <section className="px-4 py-14 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 bg-[#006437] px-8 py-10 text-white md:grid-cols-[1fr_0.95fr] md:items-center lg:px-12">
          <div>
            <h2 className="font-serif text-4xl">Join Our Knowledge Circle</h2>
            <p className="mt-3 text-sm font-semibold text-white/70">Subscribe for exclusive scholarly releases and weekly insights.</p>
          </div>
          <form className="flex flex-col gap-3 sm:flex-row">
            <input
              aria-label="Email address"
              className="h-10 flex-1 bg-white px-5 text-sm text-[#263127] outline-none placeholder:text-[#747873]"
              placeholder="Your email address"
              type="email"
            />
            <button className="brand-button brand-button-secondary px-10" type="button">
              Join Now
            </button>
          </form>
        </div>
      </section>

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
                {[
                  { icon: AtSign, label: "Email" },
                  { icon: MessageCircle, label: "Message" },
                  { icon: Send, label: "Telegram" },
                  { icon: BookOpen, label: "Catalog" },
                ].map(({ icon: Icon, label }) => (
                  <Link
                    aria-label={label}
                    className="grid h-10 w-10 place-items-center border border-white/15 text-[#9aa29d] transition hover:border-[#006437] hover:bg-[#006437] hover:text-white"
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
              <div className="mt-4 h-px w-24 bg-[#006437]" />
              <div className="mt-7 grid gap-4">
                {quickLinks.map((link) => (
                  <Link
                    className="group flex items-center gap-2 text-sm text-[#9aa29d] transition hover:text-white"
                    href={link.href}
                    key={link.label}
                  >
                    <ChevronRight className="h-3.5 w-3.5 text-[#006437] transition group-hover:translate-x-1" />
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-base font-extrabold uppercase tracking-[0.22em] text-white">Categories</h3>
              <div className="mt-4 h-px w-24 bg-[#006437]" />
              <div className="mt-7 grid gap-4">
                {footerCategories.map((category) => (
                  <Link
                    className="group flex items-center gap-2 text-sm text-[#9aa29d] transition hover:text-white"
                    href={category.href}
                    key={category.label}
                  >
                    <ChevronRight className="h-3.5 w-3.5 text-[#006437] transition group-hover:translate-x-1" />
                    {category.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-base font-extrabold uppercase tracking-[0.22em] text-white">Contact Us</h3>
              <div className="mt-4 h-px w-24 bg-[#006437]" />
              <div className="mt-7 grid gap-5 text-sm leading-7 text-[#9aa29d]">
                <div className="flex gap-4">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-[#006437]" />
                  <p>123 Islampur Road, Old Dhaka, Bangladesh 1100</p>
                </div>
                <div className="flex gap-4">
                  <Phone className="mt-1 h-4 w-4 shrink-0 text-[#006437]" />
                  <p>
                    +880 1700-000000
                    <br />
                    +880 2-9570000
                  </p>
                </div>
                <div className="flex gap-4">
                  <Mail className="mt-1 h-4 w-4 shrink-0 text-[#006437]" />
                  <p>info@maktabatulamzad.com</p>
                </div>
                <div className="flex gap-4">
                  <Clock className="mt-1 h-4 w-4 shrink-0 text-[#006437]" />
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
              <Link className="text-[#006437] transition hover:text-white" href="/privacy-policy">
                Privacy Policy
              </Link>{" "}
              ·{" "}
              <Link className="text-[#006437] transition hover:text-white" href="/terms-and-conditions">
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

      <div className="fixed bottom-5 right-5 hidden gap-3 rounded-full bg-white px-5 py-3 text-xs font-extrabold uppercase tracking-[0.14em] text-[#006437] shadow-[0_20px_50px_rgba(0,0,0,0.2)] ring-1 ring-black/5 lg:flex">
        <Sparkles className="h-4 w-4 text-[#d32f2f]" /> Authentic Books
        <ShieldCheck className="h-4 w-4 text-[#006437]" /> Secure
        <Truck className="h-4 w-4 text-[#8e3c44]" /> Fast Delivery
      </div>
    </main>
  );
}
