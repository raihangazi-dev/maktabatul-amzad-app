"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PageTitle from "@/app/components/PageTitle";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";

export default function BookDetailClient({ book }) {
  const { language } = useLanguage();
  const { handleAddtoCart } = useCart();
  const router = useRouter();

  const {
    _id, category, price, title, thumb, status, stock, desc,
    writerDetails = [], translatorDetails = [], editorDetails = [],
    publisherDetails = [], categoryDetails = [], subCategoryDetails = [],
    showCategory, showSubCategory, showWriters, showEditors, showTranslators,
    showImport, showPublisher, showPages, showPrice, showPieces, showStatus,
    showSummary, binding, showBinding, paperType, showPapertype,
    publishedYear, showPublishYear, volume, showVolume, part, showPart, pages,
  } = book;

  const row = (label, value) => (
    <div className={`flex ${language === 2 ? "flex-row-reverse" : ""}`}>
      <div className="font-medium min-w-[120px]">{label}</div>
      <div className="ml-2 mr-2">{value}</div>
    </div>
  );

  return (
    <section className="container">
      <PageTitle title={[title?.[0], title?.[1], title?.[2]]} />
      <div className="container mx-auto px-0.5 sm:px-3 md:px-0 mb-8 mt-5">
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-12 md:col-span-9">
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-5">
              <img src={thumb} className="px-20 sm:px-0 sm:col-span-2" alt={title?.[1]} />
              <div className="mx-auto sm:col-span-3">
                <h2 className={`text-xl sm:text-2xl font-semibold text-primary ${language === 2 ? "text-right" : ""}`}>
                  {title?.[language]}
                </h2>

                {showPublishYear && publishedYear && row(
                  language === 0 ? "প্রকাশকালঃ" : language === 2 ? ": سنة النشر" : "Published Year:",
                  publishedYear
                )}
                {showPart && part && row(
                  language === 0 ? "খন্ডঃ" : language === 2 ? ": شريحة" : "Part:",
                  part
                )}
                {showVolume && volume && row(
                  language === 0 ? "ভলিউমঃ" : language === 2 ? ": المجلد" : "Volume:",
                  volume
                )}
                {showWriters && row(
                  language === 0 ? "লেখকঃ" : language === 2 ? "كاتب :" : "Writer:",
                  <span>
                    {writerDetails.map((wr) => (
                      <button key={wr.writerId} onClick={() => router.push(`/writers/${wr.writerId}`)} className="font-medium hover:text-red mr-1">
                        {wr.name?.[language]},
                      </button>
                    ))}
                  </span>
                )}
                {showTranslators && translatorDetails.length > 0 && row(
                  language === 0 ? "অনুবাদকঃ" : language === 2 ? ": مترجم" : "Translator:",
                  translatorDetails.map((tr) => <span key={tr.translatorId} className="mr-2">{tr.name?.[language]},</span>)
                )}
                {showEditors && editorDetails.length > 0 && row(
                  language === 0 ? "সম্পাদকঃ" : language === 2 ? ": محرر" : "Editor:",
                  editorDetails.map((ed) => <span key={ed.editorId} className="mr-2">{ed.name?.[language] || ed.name},</span>)
                )}
                {showPublisher && row(
                  language === 0 ? "প্রকাশকঃ" : language === 2 ? ":الناشر" : "Publisher:",
                  Array.isArray(publisherDetails[0]?.name) ? publisherDetails[0]?.name[language] : publisherDetails[0]?.name
                )}
                {showCategory && row(
                  language === 0 ? "বিষয়ঃ" : language === 2 ? ": الصنف" : "Category:",
                  <Link href={`/categories/${category}`} className="font-medium hover:text-red">
                    {categoryDetails[0]?.name?.[language]}
                  </Link>
                )}
                {showSubCategory && row(
                  language === 0 ? "উপ বিষয়ঃ" : language === 2 ? ": تصنيف فرعي" : "Sub Category:",
                  subCategoryDetails[0]?.name?.[language]
                )}
                {showBinding && binding && row(
                  language === 0 ? "বাধাইঃ" : language === 2 ? ": العقبة" : "Binding:",
                  <span className="capitalize">{binding}</span>
                )}
                {showPapertype && paperType && row(
                  language === 0 ? "কাগজের ধরণঃ" : language === 2 ? ": نوع الورق" : "Papertype:",
                  <span className="capitalize">{paperType}</span>
                )}
                {showPages && pages && row(
                  language === 0 ? "পৃষ্ঠাঃ" : language === 2 ? ": الصفحات" : "Pages:",
                  pages
                )}
                {showPrice && row(
                  language === 0 ? "দামঃ" : language === 2 ? ": السعر" : "Price:",
                  `${price} TK`
                )}
                {showPieces && status === "published" && row(
                  language === 0 ? "স্টকঃ" : language === 2 ? ": مخزون" : "Stock:",
                  stock
                )}

                {showStatus && (
                  <div className="mt-4">
                    {status === "upcoming" ? (
                      <button className="py-2 px-12 bg-slate-700 text-white text-lg">
                        {language === 0 ? "আপকামিং" : language === 2 ? "القادمة" : "Upcoming"}
                      </button>
                    ) : stock === 0 ? (
                      <button className="py-2 px-12 bg-red text-white text-lg">
                        {language === 0 ? "ষ্টক আউট" : language === 2 ? "المخزن نفذ" : "Stock Out"}
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAddtoCart(book)}
                        className="bg-primary text-white py-2 px-12 border border-primary text-lg font-semibold hover:border-black hover:bg-transparent hover:text-black transition-colors"
                      >
                        {language === 0 ? "কার্টে যোগ করুন" : language === 2 ? "أضف إلى السلة" : "Add to cart"}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {showSummary && desc?.[language]?.length > 0 && (
              <>
                <p className={`text-xl font-semibold border-b pb-1 mb-5 mt-10 ${language === 2 ? "text-right" : ""}`}>
                  {language === 0 ? "সংক্ষিপ্ত বর্ণনা" : language === 2 ? "وصف مختصر" : "Brief Description"}
                </p>
                <p className={`text-lg ${language === 2 ? "text-right" : ""}`}>{desc[language]}</p>
              </>
            )}
          </div>

          {/* Related books sidebar */}
          <div className="col-span-12 md:col-span-3">
            <p className="font-semibold mb-3 text-lg">Related Books</p>
            <p className="text-sm text-gray-500">Browse more books in the same category.</p>
            <Link href={`/categories/${category}`} className="mt-3 inline-block text-primary hover:underline text-sm">
              View Category →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
