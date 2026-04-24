"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function AddBanner() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [thumbUrl, setThumbUrl] = useState("");

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("image", file);
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`, { method: "POST", body: fd });
    const data = await res.json();
    setUploading(false);
    if (data.data?.url) setThumbUrl(data.data.url);
    else toast.error("Image upload failed");
  };

  const onSubmit = async (data) => {
    setSubmitting(true);
    const res = await fetch("/api/banners", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        thumb: thumbUrl || data.thumbUrl,
        title: [data.titleBangla || "", data.titleEnglish || "", data.titleArabic || ""],
        text: [data.textBangla || "", data.textEnglish || "", data.textArabic || ""],
        isActive: data.isActive === "true",
      }),
    });
    const result = await res.json();
    setSubmitting(false);
    if (result.insertedId) { toast.success("Banner added"); router.push("/admin/banners"); }
    else toast.error("Failed");
  };

  return (
    <div>
      <div className="text-center p-5 border-b-2"><h3 className="text-2xl font-bold">Add Banner</h3></div>
      <form onSubmit={handleSubmit(onSubmit)} className="m-4 space-y-4 max-w-lg">
        <div>
          <label className="text-sm">Banner Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="border p-2 w-full mt-1" />
          {uploading && <p className="text-xs text-gray-500 mt-1">Uploading...</p>}
          {thumbUrl && <img src={thumbUrl} className="h-24 mt-2 object-cover" alt="Banner preview" />}
          <input {...register("thumbUrl")} placeholder="Or paste image URL" className="border p-2 w-full mt-2 text-sm" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className="text-sm">Title (Bangla)</label><input {...register("titleBangla")} className="border p-2 w-full mt-1" /></div>
          <div><label className="text-sm">Title (English)</label><input {...register("titleEnglish")} className="border p-2 w-full mt-1" /></div>
          <div><label className="text-sm">Title (Arabic)</label><input {...register("titleArabic")} className="border p-2 w-full mt-1" /></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className="text-sm">Text (Bangla)</label><textarea {...register("textBangla")} rows={2} className="border p-2 w-full mt-1" /></div>
          <div><label className="text-sm">Text (English)</label><textarea {...register("textEnglish")} rows={2} className="border p-2 w-full mt-1" /></div>
          <div><label className="text-sm">Text (Arabic)</label><textarea {...register("textArabic")} rows={2} className="border p-2 w-full mt-1" /></div>
        </div>
        <div>
          <label className="text-sm">Status</label>
          <select {...register("isActive")} className="border p-2 w-full mt-1">
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>
        <button type="submit" disabled={submitting} className="py-2 px-8 bg-primary text-white">{submitting ? "Adding..." : "Add Banner"}</button>
      </form>
    </div>
  );
}
