"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Minus, Plus, ShoppingCart, BookOpen,
  PenLine, Users, Pencil, Building2, Tag, Layers,
  CalendarDays, BookMarked, FileStack, FileText,
  Package, Paperclip, Archive,
} from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { useBreadcrumb } from "@/context/BreadcrumbContext";
import BookCard from "@/components/cards/BookCard";

const L = {
  writer:      ["লেখক",            "Writer",         "المؤلف"],
  translator:  ["অনুবাদক",         "Translator",     "المترجم"],
  editor:      ["সম্পাদক",         "Editor",         "المحرر"],
  publisher:   ["প্রকাশক",         "Publisher",      "الناشر"],
  category:    ["বিষয়",            "Category",       "الصنف"],
  subCategory: ["উপ বিষয়",        "Sub Category",   "تصنيف فرعي"],
  binding:     ["বাধাই",            "Binding",        "التجليد"],
  paperType:   ["কাগজের ধরণ",     "Paper Type",     "نوع الورق"],
  pages:       ["পৃষ্ঠা",           "Pages",          "الصفحات"],
  pubYear:     ["প্রকাশকাল",       "Published Year", "سنة النشر"],
  volume:      ["ভলিউম",            "Volume",         "المجلد"],
  part:        ["খন্ড",              "Part",           "الجزء"],
  stock:       ["স্টক",              "In Stock",       "المخزون"],
  addCart:     ["কার্টে যোগ করুন", "Add to Cart",    "أضف إلى السلة"],
  upcoming:    ["আপকামিং",          "Upcoming",       "القادمة"],
  stockOut:    ["ষ্টক আউট",         "Stock Out",      "المخزن نفذ"],
  about:        ["সংক্ষিপ্ত বর্ণনা", "About This Book",    "عن هذا الكتاب"],
  aboutWriter:  ["লেখক সম্পর্কে",        "About the Writer",      "عن المؤلف"],
  viewProfile:  ["প্রোফাইল দেখুন",       "View Full Profile",     "عرض الملف الكامل"],
  booksByAuthor:["লেখকের অন্যান্য বই",  "Books by This Author",  "كتب المؤلف"],
  noOtherBooks: ["অন্য কোনো বই নেই",   "No other books found",  "لا توجد كتب أخرى"],
  related:      ["সম্পর্কিত বই",         "Related Books",         "كتب ذات صلة"],
};

function t(key, lang) { return L[key]?.[lang] ?? L[key]?.[1] ?? ""; }

function getName(arr, lang) {
  if (!arr) return "";
  if (Array.isArray(arr)) return arr[lang] || arr[1] || arr.find(s => s && s.trim()) || "";
  return arr;
}

export default function BookDetailClient({ book }) {
  const { language } = useLanguage();
  const { cart, setCart } = useCart();
  const { setExtra } = useBreadcrumb();
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [relatedBooks, setRelatedBooks] = useState([]);
  const [writerBooks, setWriterBooks] = useState({});

  const {
    _id, category, price, title, thumb, status, stock, desc,
    writerDetails = [], translatorDetails = [], editorDetails = [],
    publisherDetails = [], categoryDetails = [], subCategoryDetails = [],
    showCategory, showSubCategory, showWriters, showEditors, showTranslators,
    showPublisher, showPages, showPrice, showPieces, showStatus, showSummary,
    binding, showBinding, paperType, showPapertype,
    publishedYear, showPublishYear, volume, showVolume, part, showPart, pages,
  } = book;

  const bookTitle    = getName(title, language);
  const categoryName = getName(categoryDetails[0]?.name, language);
  const isRTL        = language === 2;
  const numericPrice = Number(price);
  const formattedPrice = Number.isFinite(numericPrice)
    ? `Tk ${numericPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : `Tk ${price || "0.00"}`;

  useEffect(() => {
    if (!category) return;
    fetch(`/api/books?category=${category}&size=6`)
      .then(r => r.ok ? r.json() : [])
      .then(data => setRelatedBooks(Array.isArray(data) ? data.filter(b => b._id !== _id).slice(0, 5) : []))
      .catch(() => {});
  }, [category, _id]);

  useEffect(() => {
    if (!writerDetails.length) return;
    writerDetails.forEach(wr => {
      fetch(`/api/books?writer=${wr.writerId}&size=10`)
        .then(r => r.ok ? r.json() : [])
        .then(data => {
          const books = Array.isArray(data) ? data.filter(b => b._id !== _id).slice(0, 5) : [];
          setWriterBooks(prev => ({ ...prev, [wr.writerId]: books }));
        })
        .catch(() => {});
    });
  }, [_id]);

  useEffect(() => {
    const crumbs = [];
    if (categoryName && category) crumbs.push({ label: categoryName, href: `/categories/${category}` });
    crumbs.push({ label: getName(title, 1) || bookTitle });
    setExtra(crumbs);
    return () => setExtra([]);
  }, [categoryName, category, bookTitle]);

  const addToCart = () => {
    const existing = cart.find(item => item._id === _id);
    if (existing) {
      setCart(cart.map(item => item._id === _id ? { ...item, quantity: item.quantity + qty } : item));
      toast.success("Cart updated");
    } else {
      setCart([...cart, { ...book, quantity: qty }]);
      toast.success("Added to cart");
    }
  };

  const MetaRow = ({ icon: Icon, label, children }) => (
    <div className={`flex items-start gap-3 border-b border-gray-100 py-3 text-sm ${isRTL ? "flex-row-reverse text-right" : ""}`}>
      <span className="mt-0.5 flex-none text-primary"><Icon className="h-4 w-4" /></span>
      <span className="w-32 flex-none text-[11px] font-bold uppercase tracking-[0.1em] text-gray-400 mt-0.5">{label}</span>
      <span className="text-gray-800 font-medium">{children}</span>
    </div>
  );

  return (
    <div className="bg-white min-h-screen">
      <div className="container py-8 pb-16">

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[260px_1fr] lg:grid-cols-[300px_1fr]">

          {/* Cover — no padding, flush to edges */}
          <div className="relative overflow-hidden bg-[#173729] shadow-[0_20px_48px_rgba(15,23,42,0.2)] self-start">
            {showStatus && status === "upcoming" && (
              <span className="absolute left-3 top-3 z-10 bg-gray-700 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white">
                {t("upcoming", language)}
              </span>
            )}
            {showStatus && status !== "upcoming" && stock === 0 && (
              <span className="absolute left-3 top-3 z-10 bg-red px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white">
                {t("stockOut", language)}
              </span>
            )}
            {thumb ? (
              <img src={thumb} alt={bookTitle} className="aspect-[3/4] w-full object-cover block" />
            ) : (
              <div className="flex aspect-[3/4] w-full flex-col items-center justify-center bg-[radial-gradient(circle_at_38%_18%,rgba(255,255,255,0.22),transparent_24%),linear-gradient(135deg,#213f31,#10251d)] px-6 text-center text-white">
                <BookOpen className="mb-4 h-12 w-12 text-white/40" />
                <span className="font-serif text-xl italic leading-snug">{bookTitle}</span>
              </div>
            )}
          </div>

          {/* Details panel */}
          <div className={isRTL ? "text-right" : ""}>

            {/* Title */}
            <h1 className={`font-serif text-2xl leading-snug text-gray-950 sm:text-3xl lg:text-[2.1rem] ${isRTL ? "text-right" : ""}`}>
              {bookTitle}
            </h1>

            {/* Authors subtitle */}
            {showWriters && writerDetails.length > 0 && (
              <p className={`mt-2 text-sm text-gray-500 ${isRTL ? "text-right" : ""}`}>
                {writerDetails.map((wr, i) => (
                  <span key={wr.writerId}>
                    <button onClick={() => router.push(`/writers/${wr.writerId}`)} className="font-semibold text-primary hover:underline">
                      {getName(wr.name, language)}
                    </button>
                    {i < writerDetails.length - 1 && ", "}
                  </span>
                ))}
              </p>
            )}

            <div className="my-5 border-t border-gray-200" />

            {/* Price + cart */}
            {showPrice && (
              <div className={`flex flex-wrap items-center gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                <span className="font-serif text-3xl font-black text-red lg:text-4xl">{formattedPrice}</span>

                {showStatus && status !== "upcoming" && stock !== 0 && (
                  <>
                    <div className="flex items-center border border-gray-300">
                      <button onClick={() => setQty(q => Math.max(1, q - 1))} className="flex h-10 w-10 items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-10 select-none text-center text-sm font-bold">{qty}</span>
                      <button onClick={() => setQty(q => Math.min(stock || 99, q + 1))} className="flex h-10 w-10 items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <button onClick={addToCart} className="flex h-10 items-center gap-2 bg-primary px-7 text-sm font-black uppercase tracking-[0.12em] text-white transition-colors hover:bg-primary/90">
                      <ShoppingCart className="h-4 w-4" />
                      {t("addCart", language)}
                    </button>
                  </>
                )}
                {showStatus && status === "upcoming" && (
                  <span className="flex h-10 items-center bg-gray-700 px-7 text-sm font-black uppercase tracking-[0.12em] text-white">{t("upcoming", language)}</span>
                )}
                {showStatus && status !== "upcoming" && stock === 0 && (
                  <span className="flex h-10 items-center bg-red px-7 text-sm font-black uppercase tracking-[0.12em] text-white">{t("stockOut", language)}</span>
                )}
              </div>
            )}

            <div className="my-5 border-t border-gray-200" />

            {/* Metadata rows */}
            <div>
              {showWriters && writerDetails.length > 0 && (
                <MetaRow icon={PenLine} label={t("writer", language)}>
                  {writerDetails.map((wr, i) => (
                    <span key={wr.writerId}>
                      <button onClick={() => router.push(`/writers/${wr.writerId}`)} className="text-primary hover:underline">
                        {getName(wr.name, language)}
                      </button>
                      {i < writerDetails.length - 1 && ", "}
                    </span>
                  ))}
                </MetaRow>
              )}
              {showTranslators && translatorDetails.length > 0 && (
                <MetaRow icon={Users} label={t("translator", language)}>
                  {translatorDetails.map((tr, i) => (
                    <span key={tr.translatorId}>{getName(tr.name, language)}{i < translatorDetails.length - 1 ? ", " : ""}</span>
                  ))}
                </MetaRow>
              )}
              {showEditors && editorDetails.length > 0 && (
                <MetaRow icon={Pencil} label={t("editor", language)}>
                  {editorDetails.map((ed, i) => (
                    <span key={ed.editorId}>{getName(ed.name, language) || ed.name}{i < editorDetails.length - 1 ? ", " : ""}</span>
                  ))}
                </MetaRow>
              )}
              {showPublisher && publisherDetails[0] && (
                <MetaRow icon={Building2} label={t("publisher", language)}>
                  {getName(publisherDetails[0].name, language)}
                </MetaRow>
              )}
              {showCategory && categoryDetails[0] && (
                <MetaRow icon={Tag} label={t("category", language)}>
                  <Link href={`/categories/${category}`} className="text-primary hover:underline">
                    {getName(categoryDetails[0].name, language)}
                  </Link>
                </MetaRow>
              )}
              {showSubCategory && subCategoryDetails[0] && (
                <MetaRow icon={Layers} label={t("subCategory", language)}>
                  {getName(subCategoryDetails[0].name, language)}
                </MetaRow>
              )}
              {showPublishYear && publishedYear && (
                <MetaRow icon={CalendarDays} label={t("pubYear", language)}>{publishedYear}</MetaRow>
              )}
              {showVolume && volume && (
                <MetaRow icon={BookMarked} label={t("volume", language)}>{volume}</MetaRow>
              )}
              {showPart && part && (
                <MetaRow icon={FileStack} label={t("part", language)}>{part}</MetaRow>
              )}
              {showPages && pages && (
                <MetaRow icon={FileText} label={t("pages", language)}>{pages}</MetaRow>
              )}
              {showBinding && binding && (
                <MetaRow icon={Package} label={t("binding", language)}>
                  <span className="capitalize">{binding}</span>
                </MetaRow>
              )}
              {showPapertype && paperType && (
                <MetaRow icon={Paperclip} label={t("paperType", language)}>
                  <span className="capitalize">{paperType}</span>
                </MetaRow>
              )}
              {showPieces && status === "published" && stock > 0 && (
                <MetaRow icon={Archive} label={t("stock", language)}>{stock}</MetaRow>
              )}
            </div>
          </div>
        </div>

        {/* ── Description ── */}
        {showSummary && getName(desc, language) && (
          <div className="mt-14">
            <div className="mb-5 border-b border-gray-950/70 pb-3">
              <h2 className={`font-serif text-2xl text-gray-950 ${isRTL ? "text-right" : ""}`}>
                {t("about", language)}
              </h2>
            </div>
            <p className={`leading-8 text-gray-600 lg:max-w-3xl ${isRTL ? "text-right" : ""}`}>
              {getName(desc, language)}
            </p>
          </div>
        )}

        {/* ── About the Writer ── */}
        {showWriters && writerDetails.length > 0 && (
          <div className="mt-14">
            <div className="mb-6 border-b border-gray-950/70 pb-3">
              <h2 className="font-serif text-2xl text-gray-950">{t("aboutWriter", language)}</h2>
            </div>
            <div className="flex flex-col gap-10">
              {writerDetails.map((wr) => {
                const wrName  = getName(wr.name, language);
                const wrDesc  = getName(wr.desc, language);
                const initial = wrName?.trim()?.charAt(0)?.toUpperCase() || "A";
                const books   = writerBooks[wr.writerId] || [];

                return (
                  <div key={wr.writerId}>
                    {/* Writer card — vertical */}
                    <div className="flex flex-col items-start gap-3 border border-gray-100 bg-[#f9faf6] p-5">
                      {/* Image */}
                      <div className="h-24 w-24 overflow-hidden bg-[#eff5ed]">
                        {wr.image ? (
                          <img src={wr.image} alt={wrName} className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#1a4d2e,#0d2b18)] text-3xl font-black text-white/80">
                            {initial}
                          </div>
                        )}
                      </div>
                      {/* Name */}
                      <p className="font-serif text-lg font-semibold leading-tight text-gray-950">{wrName}</p>
                      {/* Description — 3 lines max */}
                      {wrDesc && (
                        <p className={`line-clamp-3 text-sm leading-6 text-gray-500 ${isRTL ? "text-right" : ""}`}>
                          {wrDesc}
                        </p>
                      )}
                      {/* Anchor */}
                      <Link
                        href={`/writers/${wr.writerId}`}
                        className="text-[11px] font-black uppercase tracking-[0.16em] text-primary hover:underline"
                      >
                        {t("viewProfile", language)} →
                      </Link>
                    </div>

                    {/* Books by this author */}
                    <div className="mt-6">
                      <div className="mb-4 flex items-end justify-between border-b border-gray-200 pb-2">
                        <h3 className="font-serif text-lg text-gray-950">{t("booksByAuthor", language)}</h3>
                        <Link
                          href={`/writers/${wr.writerId}`}
                          className="text-[11px] font-black uppercase tracking-[0.16em] text-gray-500 hover:text-primary transition-colors"
                        >
                          {t("viewProfile", language)} →
                        </Link>
                      </div>
                      {books.length > 0 ? (
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                          {books.map(b => <BookCard key={b._id} book={b} />)}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-400">{t("noOtherBooks", language)}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Related Books ── */}
        {relatedBooks.length > 0 && (
          <div className="mt-14">
            <div className="mb-5 flex items-end justify-between border-b border-gray-950/70 pb-3">
              <h2 className="font-serif text-2xl text-gray-950">{t("related", language)}</h2>
              {category && (
                <Link href={`/categories/${category}`} className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 hover:text-primary transition-colors">
                  {categoryName} →
                </Link>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {relatedBooks.map(b => <BookCard key={b._id} book={b} />)}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
