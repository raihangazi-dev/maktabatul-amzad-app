import BannerSlider from "@/app/components/BannerSlider";
import HomeOurBooks from "./HomeOurBooks";
import HomeCategories from "./HomeCategories";
import HomeWriters from "./HomeWriters";
import HomePublishers from "./HomePublishers";
import HomeBestSeller from "./HomeBestSeller";
import HomeAllBooks from "./HomeAllBooks";

const BASE = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

async function getBanners() {
  try {
    const res = await fetch(`${BASE}/api/banners`, { cache: "no-store" });
    return res.ok ? res.json() : [];
  } catch { return []; }
}

async function getBooks() {
  try {
    const res = await fetch(`${BASE}/api/books?size=20`, { cache: "no-store" });
    return res.ok ? res.json() : [];
  } catch { return []; }
}

async function getCategories() {
  try {
    const res = await fetch(`${BASE}/api/categories`, { cache: "no-store" });
    return res.ok ? res.json() : [];
  } catch { return []; }
}

async function getWriters() {
  try {
    const res = await fetch(`${BASE}/api/writers`, { cache: "no-store" });
    return res.ok ? res.json() : [];
  } catch { return []; }
}

async function getPublishers() {
  try {
    const res = await fetch(`${BASE}/api/publishers`, { cache: "no-store" });
    return res.ok ? res.json() : [];
  } catch { return []; }
}

export const metadata = { title: "Maktabatul Amzad - Home" };

export default async function HomePage() {
  const [banners, books, categories, writers, publishers] = await Promise.all([
    getBanners(),
    getBooks(),
    getCategories(),
    getWriters(),
    getPublishers(),
  ]);

  return (
    <div>
      <section className="container my-10">
        <BannerSlider banners={banners} />
      </section>
      <HomeOurBooks books={books} />
      <HomeCategories categories={categories} />
      <HomeWriters writers={writers} />
      <HomePublishers publishers={publishers} />
      <HomeBestSeller books={books} />
      <HomeAllBooks books={books} />
    </div>
  );
}
