"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function AddCategory() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setSubmitting(true);
    let imageUrl = data.imageUrl || "";
    if (data.image?.[0]) {
      const fd = new FormData();
      fd.append("image", data.image[0]);
      const ir = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        { method: "POST", body: fd }
      );
      const id = await ir.json();
      if (id.success) imageUrl = id.data.display_url;
    }

    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        categoryId: data.categoryId,
        name: [data.nameBangla || "", data.nameEnglish || "", data.nameArabic || ""],
        desc: [data.descBangla || "", data.descEnglish || "", data.descArabic || ""],
        image: imageUrl,
      }),
    });
    const result = await res.json();
    setSubmitting(false);
    if (result.insertedId) { toast.success("Category added"); router.push("/admin/categories"); }
    else toast.error("Failed to add category");
  };

  return (
    <div>
      <div className="text-center p-5 border-b-2"><h3 className="text-2xl font-bold">Add Category</h3></div>
      <form onSubmit={handleSubmit(onSubmit)} className="m-4 space-y-4 max-w-xl">
        <div>
          <label className="text-sm">Category ID (unique)</label>
          <input {...register("categoryId", { required: true })} className="border p-2 w-full mt-1 focus:outline-none focus:border-primary" placeholder="e.g. CAT001" />
        </div>
        <div><label className="text-sm">Name (Bangla)</label><input {...register("nameBangla")} className="border p-2 w-full mt-1 focus:outline-none focus:border-primary" /></div>
        <div><label className="text-sm">Name (English)</label><input {...register("nameEnglish")} className="border p-2 w-full mt-1 focus:outline-none focus:border-primary" /></div>
        <div><label className="text-sm">Name (Arabic)</label><input {...register("nameArabic")} className="border p-2 w-full mt-1 focus:outline-none focus:border-primary" /></div>
        <div><label className="text-sm">Description (Bangla)</label><textarea {...register("descBangla")} className="border p-2 w-full mt-1 h-20 focus:outline-none focus:border-primary" /></div>
        <div><label className="text-sm">Description (English)</label><textarea {...register("descEnglish")} className="border p-2 w-full mt-1 h-20 focus:outline-none focus:border-primary" /></div>
        <div><label className="text-sm">Description (Arabic)</label><textarea {...register("descArabic")} className="border p-2 w-full mt-1 h-20 focus:outline-none focus:border-primary" /></div>
        <div><label className="text-sm">Cover Image URL (or upload below)</label><input {...register("imageUrl")} className="border p-2 w-full mt-1 focus:outline-none focus:border-primary" placeholder="https://..." /></div>
        <div><label className="text-sm">Upload Image</label><input type="file" accept="image/*" {...register("image")} className="mt-1 block" /></div>
        <button type="submit" disabled={submitting} className="py-2 px-8 bg-primary text-white disabled:opacity-60 hover:bg-green-700">
          {submitting ? "Adding..." : "Add Category"}
        </button>
      </form>
    </div>
  );
}
