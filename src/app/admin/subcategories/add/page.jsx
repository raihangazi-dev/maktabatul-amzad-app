"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function AddSubCategory() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [submitting, setSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch("/api/categories").then((r) => r.json()).then((d) => setCategories(Array.isArray(d) ? d : []));
  }, []);
  const onSubmit = async (data) => {
    setSubmitting(true);
    const res = await fetch("/api/subcategories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subCategoryId: data.subCategoryId,
        mainCategory: data.mainCategory,
        name: [data.nameBangla || "", data.nameEnglish || "", data.nameArabic || ""],
      }),
    });
    const result = await res.json();
    setSubmitting(false);
    if (result.insertedId) { toast.success("Sub Category added"); router.push("/admin/subcategories"); }
    else toast.error("Failed");
  };
  return (
    <div>
      <div className="text-center p-5 border-b-2"><h3 className="text-2xl font-bold">Add Sub Category</h3></div>
      <form onSubmit={handleSubmit(onSubmit)} className="m-4 space-y-4 max-w-sm">
        <div><label className="text-sm">Sub Category ID</label><input {...register("subCategoryId", { required: true })} className="border p-2 w-full mt-1" /></div>
        <div>
          <label className="text-sm">Main Category</label>
          <select {...register("mainCategory", { required: true })} className="border p-2 w-full mt-1">
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c._id} value={c.categoryId}>{c.name?.[1] || c.categoryId}</option>
            ))}
          </select>
        </div>
        <div><label className="text-sm">Name (Bangla)</label><input {...register("nameBangla")} className="border p-2 w-full mt-1" /></div>
        <div><label className="text-sm">Name (English)</label><input {...register("nameEnglish")} className="border p-2 w-full mt-1" /></div>
        <div><label className="text-sm">Name (Arabic)</label><input {...register("nameArabic")} className="border p-2 w-full mt-1" /></div>
        <button type="submit" disabled={submitting} className="py-2 px-8 bg-primary text-white">{submitting ? "Adding..." : "Add Sub Category"}</button>
      </form>
    </div>
  );
}
