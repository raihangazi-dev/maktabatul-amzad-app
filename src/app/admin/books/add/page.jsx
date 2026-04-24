"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import ToggleBtn from "@/components/form/ToggleBtn";
import SelectMultiple from "@/components/form/SelectMultiple";
import PickYear from "@/components/form/PickYear";
import { useLanguage } from "@/context/LanguageContext";

export default function AddBook() {
  const router = useRouter();
  const { language } = useLanguage();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

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

  const selectedCategory = watch("category");

  useEffect(() => {
    Promise.all([
      fetch("/api/writers").then((r) => r.json()),
      fetch("/api/editors").then((r) => r.json()),
      fetch("/api/translators").then((r) => r.json()),
      fetch("/api/publishers").then((r) => r.json()),
      fetch("/api/categories").then((r) => r.json()),
      fetch("/api/countries").then((r) => r.json()),
    ]).then(([w, e, t, p, c, co]) => {
      setWriters(Array.isArray(w) ? w : []);
      setEditors(Array.isArray(e) ? e : []);
      setTranslators(Array.isArray(t) ? t : []);
      setPublishers(Array.isArray(p) ? p : []);
      setCategories(Array.isArray(c) ? c : []);
      setCountries(Array.isArray(co) ? co : []);
    });
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetch(`/api/subcategories?mainCategory=${selectedCategory}`)
        .then((r) => r.json())
        .then((data) => setSubCategories(Array.isArray(data) ? data : []));
    }
  }, [selectedCategory]);

  const onSubmit = async (data) => {
    setSubmitting(true);
    let imageUrl = "";

    if (data.image?.[0]) {
      const formData = new FormData();
      formData.append("image", data.image[0]);
      try {
        const imgRes = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY || "e1f8cb2a3ec0064d89280dcbe819c1b7"}`, { method: "POST", body: formData });
        const imgData = await imgRes.json();
        if (imgData.success) imageUrl = imgData.data.display_url;
      } catch { /* continue without image */ }
    }

    const newBook = {
      thumb: imageUrl,
      title: [data.bookBangla || "", data.bookEnglish || "", data.bookArabic || ""],
      category: data.category,
      subCategory: data.subCategory,
      writer: selectedWriters.map((w) => w.writerId),
      translator: selectedTranslators.map((t) => t.translatorId),
      editor: selectedEditors.map((e) => e.editorId),
      publisher: data.publisher,
      importedCountry: data.country,
      price: parseInt(data.bookPrice) || 0,
      pages: parseInt(data.bookPages) || 0,
      stock: parseInt(data.bookQuantity) || 0,
      desc: [data.bnDesc || "", data.enDesc || "", data.arDesc || ""],
      status: data.bookStatus || "published",
      sold: parseInt(data.bookSold) || 0,
      binding, publishedYear: selectedYear, paperType,
      volume: data.volume, part: data.part,
      showCategory, showSubCategory, showWriters, showEditors, showTranslators,
      showImport, showPublisher, showPages, showPrice, showPieces, showStatus,
      showSummary, showPapertype, showBinding, showPublishYear, showVolume, showPart,
    };

    const res = await fetch("/api/books", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newBook) });
    const result = await res.json();
    setSubmitting(false);

    if (result.insertedId) {
      toast.success("Book added successfully");
      router.push("/admin/books");
    } else {
      toast.error("Failed to add book");
    }
  };

  const getLabel = (item) => {
    const name = item.name;
    if (Array.isArray(name)) return name[language] || name[1] || name[0] || "";
    return name || item.writerId || item.editorId || item.translatorId || "";
  };

  return (
    <div>
      <div className="text-center p-5 border-b-2">
        <h3 className="text-2xl font-bold">Add Book</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="m-4 space-y-4">
        <div className="flex justify-between gap-4">
          <div className="w-7/12 space-y-2">
            <input className="border p-2 w-full focus:outline-none focus:border-primary" placeholder="বইয়ের নাম বাংলায়" {...register("bookBangla")} />
            <input className="border p-2 w-full focus:outline-none focus:border-primary" placeholder="Book name in English" {...register("bookEnglish")} />
            <input className="border p-2 w-full focus:outline-none focus:border-primary" placeholder="اسم الكتاب بالعربية" {...register("bookArabic")} />
          </div>
          <div className="w-4/12 border p-4 flex flex-col items-center justify-center">
            <label className="text-sm mb-2">Book Cover Image</label>
            <input type="file" accept="image/*" {...register("image")} />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-7/12">
            <label className="text-sm">Category</label>
            <select {...register("category")} className="border w-full p-2 mt-1 focus:outline-none focus:border-primary">
              {categories.map((c) => <option key={c._id} value={c.categoryId}>{c.name?.[language] || c.name?.[1]}</option>)}
            </select>
          </div>
          <div className="w-4/12">
            <label className="text-sm">Sub Category</label>
            <select {...register("subCategory")} className="border w-full p-2 mt-1 focus:outline-none focus:border-primary">
              <option value="">Select</option>
              {subCategories.map((sc) => <option key={sc._id} value={sc.subCategoryId}>{sc.name?.[language] || sc.name?.[1]}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div><label className="text-sm">Writers</label><SelectMultiple items={writers} itemId="writerId" selected={selectedWriters} setSelected={setSelectedWriters} /></div>
          <div><label className="text-sm">Editors</label><SelectMultiple items={editors} itemId="editorId" selected={selectedEditors} setSelected={setSelectedEditors} /></div>
          <div><label className="text-sm">Translators</label><SelectMultiple items={translators} itemId="translatorId" selected={selectedTranslators} setSelected={setSelectedTranslators} /></div>
        </div>

        <div className="flex gap-4">
          <div className="w-6/12">
            <label className="text-sm">Publisher</label>
            <select {...register("publisher")} className="border w-full p-2 mt-1 focus:outline-none focus:border-primary">
              {publishers.map((p) => <option key={p._id} value={p.publisherId}>{Array.isArray(p.name) ? p.name[language] || p.name[1] : p.name}</option>)}
            </select>
          </div>
          <div className="w-5/12">
            <label className="text-sm">Imported Country</label>
            <select {...register("country")} className="border w-full p-2 mt-1 focus:outline-none focus:border-primary">
              {countries.map((c) => <option key={c._id} value={c.countryId}>{c.name}</option>)}
            </select>
          </div>
        </div>

        <div className="flex gap-4 flex-wrap">
          <div className="w-28"><label className="text-sm">Pages</label><input type="number" {...register("bookPages", { required: true })} className="border p-1 w-full mt-1" /></div>
          <div className="w-28"><label className="text-sm">Price (TK)</label><input type="number" {...register("bookPrice", { required: true })} className="border p-1 w-full mt-1" /></div>
          <div className="w-28"><label className="text-sm">Stock</label><input type="number" {...register("bookQuantity", { required: true })} className="border p-1 w-full mt-1" /></div>
          <div className="w-28"><label className="text-sm">Sold</label><input type="number" defaultValue={0} {...register("bookSold")} className="border p-1 w-full mt-1" /></div>
          <div className="w-32"><label className="text-sm">Status</label>
            <select {...register("bookStatus")} className="border p-1 w-full mt-1">
              <option value="published">Published</option>
              <option value="upcoming">Upcoming</option>
            </select>
          </div>
        </div>

        <div className="flex gap-4 flex-wrap items-end">
          <div><label className="text-sm">Publish Year</label><br/><PickYear selectedYear={selectedYear} setSelectedYear={setSelectedYear} /></div>
          <div><label className="text-sm">Binding</label>
            <select onChange={(e) => setBinding(e.target.value)} className="border p-1 mt-1 block">
              <option value="">Select</option><option value="paperback">Paperback</option><option value="hardcover">Hardcover</option>
            </select>
          </div>
          <div><label className="text-sm">Paper Type</label>
            <select onChange={(e) => setPaperType(e.target.value)} className="border p-1 mt-1 block">
              <option value="">Select</option><option value="white">White</option><option value="newsprint">Newsprint</option>
            </select>
          </div>
          <div><label className="text-sm">Volume</label><input placeholder="Volume" {...register("volume")} className="border p-1 mt-1 block w-24" /></div>
          <div><label className="text-sm">Part</label><input placeholder="Part" {...register("part")} className="border p-1 mt-1 block w-24" /></div>
        </div>

        <div className="space-y-2">
          <textarea {...register("bnDesc")} className="border w-full h-32 p-2 focus:outline-none focus:border-primary" placeholder="Bangla Summary" />
          <textarea {...register("enDesc")} className="border w-full h-32 p-2 focus:outline-none focus:border-primary" placeholder="English Summary" />
          <textarea {...register("arDesc")} className="border w-full h-32 p-2 focus:outline-none focus:border-primary" placeholder="Arabic Summary" />
        </div>

        <div className="flex flex-wrap gap-2">
          <ToggleBtn show={showCategory} setShow={setShowCategory} name="Category" />
          <ToggleBtn show={showSubCategory} setShow={setShowSubCategory} name="Sub Category" />
          <ToggleBtn show={showWriters} setShow={setShowWriters} name="Writers" />
          <ToggleBtn show={showTranslators} setShow={setShowTranslators} name="Translators" />
          <ToggleBtn show={showEditors} setShow={setShowEditors} name="Editors" />
          <ToggleBtn show={showImport} setShow={setShowImport} name="Import" />
          <ToggleBtn show={showPublisher} setShow={setShowPublisher} name="Publisher" />
          <ToggleBtn show={showPages} setShow={setShowPages} name="Pages" />
          <ToggleBtn show={showPieces} setShow={setShowPieces} name="Stock" />
          <ToggleBtn show={showPrice} setShow={setShowPrice} name="Price" />
          <ToggleBtn show={showStatus} setShow={setShowStatus} name="Status" />
          <ToggleBtn show={showSummary} setShow={setShowSummary} name="Summary" />
          <ToggleBtn show={showBinding} setShow={setShowBinding} name="Binding" />
          <ToggleBtn show={showPapertype} setShow={setShowPapertype} name="Papertype" />
          <ToggleBtn show={showPublishYear} setShow={setShowPublishYear} name="Published Year" />
          <ToggleBtn show={showVolume} setShow={setShowVolume} name="Volume" />
          <ToggleBtn show={showPart} setShow={setShowPart} name="Part" />
        </div>

        <button type="submit" disabled={submitting} className="py-2 px-8 bg-primary text-white disabled:opacity-60 hover:bg-green-700">
          {submitting ? "Adding..." : "Add Book"}
        </button>
      </form>
    </div>
  );
}
