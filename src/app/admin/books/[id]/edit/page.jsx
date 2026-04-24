"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import ToggleBtn from "@/components/form/ToggleBtn";
import SelectMultiple from "@/components/form/SelectMultiple";
import PickYear from "@/components/form/PickYear";
import { useLanguage } from "@/context/LanguageContext";

export default function EditBook() {
  const { id } = useParams();
  const router = useRouter();
  const { language } = useLanguage();
  const { register, handleSubmit, reset } = useForm();

  const [book, setBook] = useState(null);
  const [writers, setWriters] = useState([]);
  const [editors, setEditors] = useState([]);
  const [translators, setTranslators] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [countries, setCountries] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [selectedWriters, setSelectedWriters] = useState([]);
  const [selectedEditors, setSelectedEditors] = useState([]);
  const [selectedTranslators, setSelectedTranslators] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [binding, setBinding] = useState("");
  const [paperType, setPaperType] = useState("");

  const [showCategory, setShowCategory] = useState(true);
  const [showSubCategory, setShowSubCategory] = useState(true);
  const [showWriters, setShowWriters] = useState(true);
  const [showEditors, setShowEditors] = useState(true);
  const [showTranslators, setShowTranslators] = useState(true);
  const [showImport, setShowImport] = useState(true);
  const [showPublisher, setShowPublisher] = useState(true);
  const [showPages, setShowPages] = useState(true);
  const [showPrice, setShowPrice] = useState(true);
  const [showPieces, setShowPieces] = useState(true);
  const [showStatus, setShowStatus] = useState(true);
  const [showSummary, setShowSummary] = useState(true);
  const [showPapertype, setShowPapertype] = useState(true);
  const [showBinding, setShowBinding] = useState(true);
  const [showPublishYear, setShowPublishYear] = useState(true);
  const [showVolume, setShowVolume] = useState(true);
  const [showPart, setShowPart] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch(`/api/books/${id}`).then((r) => r.json()),
      fetch("/api/writers").then((r) => r.json()),
      fetch("/api/editors").then((r) => r.json()),
      fetch("/api/translators").then((r) => r.json()),
      fetch("/api/publishers").then((r) => r.json()),
      fetch("/api/categories").then((r) => r.json()),
      fetch("/api/countries").then((r) => r.json()),
    ]).then(([bookData, w, e, t, p, c, co]) => {
      setBook(bookData);
      setWriters(Array.isArray(w) ? w : []);
      setEditors(Array.isArray(e) ? e : []);
      setTranslators(Array.isArray(t) ? t : []);
      setPublishers(Array.isArray(p) ? p : []);
      setCategories(Array.isArray(c) ? c : []);
      setCountries(Array.isArray(co) ? co : []);

      reset({
        bookBangla: bookData.title?.[0] || "",
        bookEnglish: bookData.title?.[1] || "",
        bookArabic: bookData.title?.[2] || "",
        category: bookData.category || "",
        subCategory: bookData.subCategory || "",
        publisher: bookData.publisher || "",
        country: bookData.importedCountry || "",
        bookPages: bookData.pages || "",
        bookPrice: bookData.price || "",
        bookQuantity: bookData.stock || "",
        bookSold: bookData.sold || 0,
        bookStatus: bookData.status || "published",
        volume: bookData.volume || "",
        part: bookData.part || "",
        bnDesc: bookData.desc?.[0] || "",
        enDesc: bookData.desc?.[1] || "",
        arDesc: bookData.desc?.[2] || "",
      });

      setBinding(bookData.binding || "");
      setPaperType(bookData.paperType || "");
      setSelectedYear(bookData.publishedYear || "");
      setShowCategory(bookData.showCategory ?? true);
      setShowSubCategory(bookData.showSubCategory ?? true);
      setShowWriters(bookData.showWriters ?? true);
      setShowEditors(bookData.showEditors ?? true);
      setShowTranslators(bookData.showTranslators ?? true);
      setShowImport(bookData.showImport ?? true);
      setShowPublisher(bookData.showPublisher ?? true);
      setShowPages(bookData.showPages ?? true);
      setShowPrice(bookData.showPrice ?? true);
      setShowPieces(bookData.showPieces ?? true);
      setShowStatus(bookData.showStatus ?? true);
      setShowSummary(bookData.showSummary ?? true);
      setShowPapertype(bookData.showPapertype ?? true);
      setShowBinding(bookData.showBinding ?? true);
      setShowPublishYear(bookData.showPublishYear ?? true);
      setShowVolume(bookData.showVolume ?? true);
      setShowPart(bookData.showPart ?? true);

      if (bookData.category) {
        fetch(`/api/subcategories?mainCategory=${bookData.category}`)
          .then((r) => r.json())
          .then((data) => setSubCategories(Array.isArray(data) ? data : []));
      }
    });
  }, [id, reset]);

  const onSubmit = async (data) => {
    setSubmitting(true);
    const updated = {
      title: [data.bookBangla || "", data.bookEnglish || "", data.bookArabic || ""],
      category: data.category,
      subCategory: data.subCategory,
      writer: selectedWriters.length > 0 ? selectedWriters.map((w) => w.writerId) : book.writer,
      translator: selectedTranslators.length > 0 ? selectedTranslators.map((t) => t.translatorId) : book.translator,
      editor: selectedEditors.length > 0 ? selectedEditors.map((e) => e.editorId) : book.editor,
      publisher: data.publisher,
      importedCountry: data.country,
      price: parseInt(data.bookPrice) || 0,
      pages: parseInt(data.bookPages) || 0,
      stock: parseInt(data.bookQuantity) || 0,
      desc: [data.bnDesc || "", data.enDesc || "", data.arDesc || ""],
      status: data.bookStatus,
      sold: parseInt(data.bookSold) || 0,
      binding, publishedYear: selectedYear, paperType,
      volume: data.volume, part: data.part,
      showCategory, showSubCategory, showWriters, showEditors, showTranslators,
      showImport, showPublisher, showPages, showPrice, showPieces, showStatus,
      showSummary, showPapertype, showBinding, showPublishYear, showVolume, showPart,
    };

    const res = await fetch(`/api/books/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(updated) });
    setSubmitting(false);
    if (res.ok) {
      toast.success("Book updated");
      router.push("/admin/books");
    } else {
      toast.error("Update failed");
    }
  };

  if (!book) return <div className="p-5">Loading...</div>;

  return (
    <div>
      <div className="text-center p-5 border-b-2">
        <h3 className="text-2xl font-bold">Edit Book</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="m-4 space-y-4">
        <div className="flex justify-between gap-4">
          <div className="w-full space-y-2">
            <input className="border p-2 w-full focus:outline-none focus:border-primary" placeholder="বইয়ের নাম বাংলায়" {...register("bookBangla")} />
            <input className="border p-2 w-full focus:outline-none focus:border-primary" placeholder="Book name in English" {...register("bookEnglish")} />
            <input className="border p-2 w-full focus:outline-none focus:border-primary" placeholder="اسم الكتاب بالعربية" {...register("bookArabic")} />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-7/12">
            <label className="text-sm">Category</label>
            <select {...register("category")} className="border w-full p-2 mt-1">
              {categories.map((c) => <option key={c._id} value={c.categoryId}>{c.name?.[language] || c.name?.[1]}</option>)}
            </select>
          </div>
          <div className="w-4/12">
            <label className="text-sm">Sub Category</label>
            <select {...register("subCategory")} className="border w-full p-2 mt-1">
              {subCategories.map((sc) => <option key={sc._id} value={sc.subCategoryId}>{sc.name?.[language] || sc.name?.[1]}</option>)}
            </select>
          </div>
        </div>

        <div className="flex gap-4 flex-wrap">
          <div className="w-28"><label className="text-sm">Pages</label><input type="number" {...register("bookPages")} className="border p-1 w-full mt-1" /></div>
          <div className="w-28"><label className="text-sm">Price</label><input type="number" {...register("bookPrice")} className="border p-1 w-full mt-1" /></div>
          <div className="w-28"><label className="text-sm">Stock</label><input type="number" {...register("bookQuantity")} className="border p-1 w-full mt-1" /></div>
          <div className="w-28"><label className="text-sm">Sold</label><input type="number" {...register("bookSold")} className="border p-1 w-full mt-1" /></div>
          <div className="w-32"><label className="text-sm">Status</label>
            <select {...register("bookStatus")} className="border p-1 w-full mt-1">
              <option value="published">Published</option>
              <option value="upcoming">Upcoming</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <textarea {...register("bnDesc")} className="border w-full h-28 p-2" placeholder="Bangla Summary" />
          <textarea {...register("enDesc")} className="border w-full h-28 p-2" placeholder="English Summary" />
          <textarea {...register("arDesc")} className="border w-full h-28 p-2" placeholder="Arabic Summary" />
        </div>

        <div className="flex flex-wrap gap-2">
          <ToggleBtn show={showCategory} setShow={setShowCategory} name="Category" />
          <ToggleBtn show={showWriters} setShow={setShowWriters} name="Writers" />
          <ToggleBtn show={showPrice} setShow={setShowPrice} name="Price" />
          <ToggleBtn show={showStatus} setShow={setShowStatus} name="Status" />
          <ToggleBtn show={showSummary} setShow={setShowSummary} name="Summary" />
          <ToggleBtn show={showPublisher} setShow={setShowPublisher} name="Publisher" />
        </div>

        <button type="submit" disabled={submitting} className="py-2 px-8 bg-primary text-white disabled:opacity-60">
          {submitting ? "Saving..." : "Update Book"}
        </button>
      </form>
    </div>
  );
}
