"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function AddPublisher() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setSubmitting(true);
    const publisher = {
      publisherId: data.publisherId,
      name: [data.nameBangla || "", data.nameEnglish || "", data.nameArabic || ""],
      desc: [data.descBangla || "", data.descEnglish || "", data.descArabic || ""],
      image: data.imageUrl || "",
    };
    const res = await fetch("/api/publishers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(publisher),
    });
    const result = await res.json();
    setSubmitting(false);
    if (result.insertedId) { toast.success("Publisher added"); router.push("/admin/publishers"); }
    else toast.error("Failed to add publisher");
  };

  return (
    <div>
      <div className="text-center p-5 border-b-2"><h3 className="text-2xl font-bold">Add Publisher</h3></div>
      <form onSubmit={handleSubmit(onSubmit)} className="m-4 space-y-4 max-w-xl">
        <div>
          <label className="text-sm">Publisher ID (unique)</label>
          <input {...register("publisherId", { required: true })} className="border p-2 w-full mt-1 focus:outline-none focus:border-primary" placeholder="e.g. PUB001" />
        </div>
        <div><label className="text-sm">Name (Bangla)</label><input {...register("nameBangla")} className="border p-2 w-full mt-1 focus:outline-none focus:border-primary" /></div>
        <div><label className="text-sm">Name (English)</label><input {...register("nameEnglish")} className="border p-2 w-full mt-1 focus:outline-none focus:border-primary" /></div>
        <div><label className="text-sm">Name (Arabic)</label><input {...register("nameArabic")} className="border p-2 w-full mt-1 focus:outline-none focus:border-primary" /></div>
        <div><label className="text-sm">Description (Bangla)</label><textarea {...register("descBangla")} className="border p-2 w-full mt-1 h-24 focus:outline-none focus:border-primary" /></div>
        <div><label className="text-sm">Description (English)</label><textarea {...register("descEnglish")} className="border p-2 w-full mt-1 h-24 focus:outline-none focus:border-primary" /></div>
        <div><label className="text-sm">Description (Arabic)</label><textarea {...register("descArabic")} className="border p-2 w-full mt-1 h-24 focus:outline-none focus:border-primary" /></div>
        <div><label className="text-sm">Logo URL</label><input {...register("imageUrl")} className="border p-2 w-full mt-1 focus:outline-none focus:border-primary" placeholder="https://..." /></div>
        <button type="submit" disabled={submitting} className="py-2 px-8 bg-primary text-white disabled:opacity-60 hover:bg-green-700">
          {submitting ? "Adding..." : "Add Publisher"}
        </button>
      </form>
    </div>
  );
}
