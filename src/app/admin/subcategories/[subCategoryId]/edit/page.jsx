"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function EditSubCategory() {
  const { subCategoryId } = useParams();
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch("/api/categories").then((r) => r.json()).then((d) => setCategories(Array.isArray(d) ? d : []));
    fetch(`/api/subcategories/${subCategoryId}`).then((r) => r.json()).then((sc) => {
      reset({
        nameBangla: sc.name?.[0] || "",
        nameEnglish: sc.name?.[1] || "",
        nameArabic: sc.name?.[2] || "",
        mainCategory: sc.mainCategory || "",
      });
    });
  }, [subCategoryId, reset]);
  const onSubmit = async (data) => {
    await fetch(`/api/subcategories/${subCategoryId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: [data.nameBangla, data.nameEnglish, data.nameArabic],
        mainCategory: data.mainCategory,
      }),
    });
    toast.success("Updated"); router.push("/admin/subcategories");
  };
  return (
    <div>
      <div className="text-center p-5 border-b-2"><h3 className="text-2xl font-bold">Edit Sub Category</h3></div>
      <form onSubmit={handleSubmit(onSubmit)} className="m-4 space-y-4 max-w-sm">
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
        <button type="submit" className="py-2 px-8 bg-primary text-white">Update Sub Category</button>
      </form>
    </div>
  );
}
