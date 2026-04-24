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
      image: data.imageUrl || "",
    };
    const res = await fetch("/api/publishers", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(publisher) });
    const result = await res.json();
    setSubmitting(false);
    if (result.insertedId) { toast.success("Publisher added"); router.push("/admin/publishers"); }
    else toast.error("Failed");
  };
  return (
    <div>
      <div className="text-center p-5 border-b-2"><h3 className="text-2xl font-bold">Add Publisher</h3></div>
      <form onSubmit={handleSubmit(onSubmit)} className="m-4 space-y-4 max-w-sm">
        <div><label className="text-sm">Publisher ID</label><input {...register("publisherId", { required: true })} className="border p-2 w-full mt-1" /></div>
        <div><label className="text-sm">Name (Bangla)</label><input {...register("nameBangla")} className="border p-2 w-full mt-1" /></div>
        <div><label className="text-sm">Name (English)</label><input {...register("nameEnglish")} className="border p-2 w-full mt-1" /></div>
        <div><label className="text-sm">Name (Arabic)</label><input {...register("nameArabic")} className="border p-2 w-full mt-1" /></div>
        <div><label className="text-sm">Logo URL</label><input {...register("imageUrl")} className="border p-2 w-full mt-1" /></div>
        <button type="submit" disabled={submitting} className="py-2 px-8 bg-primary text-white">{submitting ? "Adding..." : "Add Publisher"}</button>
      </form>
    </div>
  );
}
