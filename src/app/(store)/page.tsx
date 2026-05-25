import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CreditCard,
  Gift,
  Quote,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Truck,
  type LucideIcon,
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
  { title: "Quran & Tafseer", books: 342, mark: "۞" },
  { title: "Hadith Collection", books: 215, mark: "ح" },
  { title: "Fiqh & Islamic Law", books: 189, mark: "فق" },
  { title: "Seerah & Biography", books: 127, mark: "س" },
  { title: "Aqeedah", books: 98, mark: "ع" },
  { title: "Tasawwuf", books: 76, mark: "ت" },
  { title: "Children's Books", books: 143, mark: "ص" },
  { title: "Arabic Language", books: 88, mark: "ا" },
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

type PromoMessage = {
  label: string;
  Icon: LucideIcon;
  accentClass?: string;
};

const promoMessages: PromoMessage[] = [
  { label: "Free delivery on orders above Tk 999", Icon: Gift, accentClass: "text-[#ffbd17]" },
  { label: "New arrivals every week", Icon: Sparkles },
  { label: "Authentic Islamic books", Icon: ShieldCheck },
  { label: "Secure online payment", Icon: CreditCard },
  { label: "Easy returns", Icon: RotateCcw },
  { label: "Fast delivery across Bangladesh", Icon: Truck },
];

const formatPrice = (price: number) => `Tk ${price.toLocaleString("en-US")}.00`;

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

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
            className="hidden items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#263127] transition hover:text-[#108D41] sm:flex"
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
        <h3
          className="mt-3 truncate font-serif text-xl leading-snug text-[#1f2c22] transition group-hover:text-[#108D41]"
          title={book.title}
        >
          {book.title}
        </h3>
        <p className="mt-1 truncate text-sm text-[#747873]" title={book.author}>
          {book.author}
        </p>
        <p className="mt-2 text-base font-extrabold text-[#d32f2f]">{formatPrice(book.price)}</p>
      </div>
    </article>
  );
}

function PromoMarquee() {
  return (
    <section aria-label="Store benefits" className="home-promo-marquee">
      <p className="sr-only">{promoMessages.map((item) => item.label).join(". ")}</p>
      <div aria-hidden="true" className="home-promo-track">
        {[0, 1].map((groupIndex) => (
          <div className="home-promo-group" key={groupIndex}>
            {promoMessages.map(({ label, Icon, accentClass }) => (
              <div className="home-promo-item" key={`${groupIndex}-${label}`}>
                <Icon className={`h-4 w-4 shrink-0 ${accentClass ?? "text-white/80"}`} strokeWidth={2.4} />
                <span>{label}</span>
                <span className="home-promo-separator" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f4f7ef] text-[#263127]">
      <section className="six-books-hero relative min-h-[580px] overflow-hidden border-b border-black text-white md:min-h-[650px]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,15,15,0.98)_0%,rgba(19,17,15,0.94)_34%,rgba(26,19,15,0.72)_58%,rgba(18,13,10,0.18)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.06)_52%,rgba(0,0,0,0.52)_100%)]" />
        <div className="site-container relative flex min-h-[580px] items-center py-20 md:min-h-[650px]">
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
                className="brand-button brand-button-primary w-full sm:w-auto"
              >
                Browse Collection <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="brand-button brand-button-neutral w-full sm:w-auto"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PromoMarquee />

      <section className="paper-panel py-16">
        <div className="site-container">
          <SectionHeader eyebrow="Featured Partner" title="Maktabatul Amzad Publishers" href="/publishers" />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {featuredBooks.map((book) => (
              <ProductCard key={book.title} book={book} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7faf3] py-16">
        <div className="site-container">
          <div className="flex items-start justify-between gap-6 border-b border-[#e4e8df] pb-4">
            <div>
              <h2 className="font-serif text-3xl leading-tight text-[#111111] md:text-4xl">
                Browse By <span className="text-[#007a46]">Category</span>
              </h2>
              <div className="mt-3 h-1 w-24 bg-[#007a46]" />
            </div>
            <Link
              href="/categories"
              className="mt-3 shrink-0 text-xs font-extrabold uppercase tracking-[0.08em] text-[#007a46] transition hover:text-[#d32f2f]"
            >
              All Categories →
            </Link>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Link
                href="/categories"
                key={category.title}
                className="group flex min-h-[76px] items-center gap-5 border-l-4 border-[#007a46] bg-white px-4 py-3 shadow-[0_8px_24px_rgba(17,17,17,0.035)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(17,17,17,0.08)]"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center bg-[#eef4ea] font-serif text-xl font-bold text-[#007a46]">
                  {category.mark}
                </span>
                <span>
                  <span className="block font-serif text-lg font-bold leading-tight text-[#111111] transition group-hover:text-[#007a46]">
                    {category.title}
                  </span>
                  <span className="mt-1 block text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-[#747873]">
                    {category.books} Books
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#edf2e9] py-16">
        <div className="site-container">
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
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {newArrivals.map((book) => (
              <article key={book.title} className="group">
                <BookCover book={book} compact />
                <h3 className="mt-4 truncate font-serif text-xl text-[#263127] group-hover:text-[#108D41]" title={book.title}>
                  {book.title}
                </h3>
                <p className="mt-1 text-sm font-extrabold text-[#d32f2f]">{formatPrice(book.price)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="site-container">
          <div className="flex items-start justify-between gap-6 pb-4">
            <div>
              <h2 className="font-serif text-3xl leading-tight text-[#111111] md:text-4xl">
                Distinguished <span className="text-[#007a46]">Authors</span>
              </h2>
              <div className="mt-3 h-1 w-24 bg-[#007a46]" />
            </div>
            <Link
              href="/authors"
              className="mt-3 shrink-0 text-xs font-extrabold uppercase tracking-[0.08em] text-[#007a46] transition hover:text-[#d32f2f]"
            >
              All Authors →
            </Link>
          </div>

          <div className="mt-4 grid gap-x-5 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {authors.map((author) => (
              <Link
                href="/authors"
                key={author.name}
                className="group block text-left"
              >
                <span className={`relative block aspect-[4/5] overflow-hidden bg-gradient-to-br ${author.portraitClass} shadow-[0_12px_30px_rgba(17,17,17,0.12)]`}>
                  <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(255,255,255,0.2),transparent_22%),linear-gradient(180deg,transparent_45%,rgba(0,0,0,0.48)_100%)]" />
                  <span className="absolute left-1/2 top-[17%] h-[22%] w-[30%] -translate-x-1/2 rounded-t-full bg-white/72 shadow-[inset_0_-18px_20px_rgba(0,0,0,0.28)]" />
                  <span className="absolute left-1/2 top-[37%] h-[42%] w-[58%] -translate-x-1/2 rounded-t-[46%] bg-white/16 shadow-[inset_0_18px_24px_rgba(255,255,255,0.08)]" />
                  <span className="absolute left-1/2 top-[29%] h-px w-[35%] -translate-x-1/2 bg-black/45" />
                  <span className="absolute bottom-4 left-4 font-serif text-xl font-bold tracking-[0.05em] text-white/84">
                    {getInitials(author.name)}
                  </span>
                </span>
                <span className="mt-3 block min-w-0">
                  <span className="block truncate font-serif text-sm font-semibold leading-tight text-[#111111] transition group-hover:text-[#007a46]" title={author.name}>
                    {author.name}
                  </span>
                  <span className="mt-1 block truncate text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-[#747873]" title={author.era}>
                    {author.era}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black py-16 text-white">
        <div className="site-container grid gap-12 lg:grid-cols-2">
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

      <section className="border-b border-t border-black bg-[#f7faf3] py-20 text-center">
        <div className="site-container">
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
              <span className="h-2 w-2 bg-[#108D41]" />
              <span className="h-2 w-2 bg-[#d6ddd2]" />
              <span className="h-2 w-2 bg-[#d6ddd2]" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="site-container">
          <div className="grid gap-8 bg-[#108D41] px-8 py-10 text-white md:grid-cols-[1fr_0.95fr] md:items-center lg:px-12">
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
        </div>
      </section>

      <div className="fixed bottom-5 right-5 hidden gap-3 rounded-full bg-white px-5 py-3 text-xs font-extrabold uppercase tracking-[0.14em] text-[#108D41] shadow-[0_20px_50px_rgba(0,0,0,0.2)] ring-1 ring-black/5 lg:flex">
        <Sparkles className="h-4 w-4 text-[#d32f2f]" /> Authentic Books
        <ShieldCheck className="h-4 w-4 text-[#108D41]" /> Secure
        <Truck className="h-4 w-4 text-[#8e3c44]" /> Fast Delivery
      </div>
    </main>
  );
}
