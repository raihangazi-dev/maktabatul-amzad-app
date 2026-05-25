import BannerSlider from "@/app/components/BannerSlider";
import HomeOurBooks from "./HomeOurBooks";
import HomeCategories from "./HomeCategories";
import HomeWriters from "./HomeWriters";
import HomePublishers from "./HomePublishers";
import HomeBestSeller from "./HomeBestSeller";
import HomeAllBooks from "./HomeAllBooks";
import { getBaseUrl } from "@/lib/baseUrl";

export const metadata = { title: "Maktabatul Amzad - Home" };

export default async function HomePage() {
  const BASE = await getBaseUrl();

  const [banners, books, categories, writers, publishers] = await Promise.all([
    fetch(`${BASE}/api/banners`,       { cache: "no-store" }).then(r => r.ok ? r.json() : []).catch(() => []),
    fetch(`${BASE}/api/books?size=20`, { cache: "no-store" }).then(r => r.ok ? r.json() : []).catch(() => []),
    fetch(`${BASE}/api/categories`,    { cache: "no-store" }).then(r => r.ok ? r.json() : []).catch(() => []),
    fetch(`${BASE}/api/writers`,       { cache: "no-store" }).then(r => r.ok ? r.json() : []).catch(() => []),
    fetch(`${BASE}/api/publishers`,    { cache: "no-store" }).then(r => r.ok ? r.json() : []).catch(() => []),
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
