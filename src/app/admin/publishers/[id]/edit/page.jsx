"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function EditPublisher() {
  const { id } = useParams();
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch(`/api/publishers/${id}`)
      .then((r) => r.json())
      .then((p) =>
        reset({
          nameBangla: p.name?.[0] || "",
          nameEnglish: p.name?.[1] || "",
          nameArabic: p.name?.[2] || "",
          descBangla: p.desc?.[0] || "",
          descEnglish: p.desc?.[1] || "",
          descArabic: p.desc?.[2] || "",
          imageUrl: p.image || "",
        })
      );
  }, [id, reset]);

  const onSubmit = async (data) => {
    setSubmitting(true);
    await fetch(`/api/publishers/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: [data.nameBangla || "", data.nameEnglish || "", data.nameArabic || ""],
        desc: [data.descBangla || "", data.descEnglish || "", data.descArabic || ""],
        image: data.imageUrl || "",
      }),
    });
    setSubmitting(false);
    toast.success("Publisher updated");
    router.push("/admin/publishers");
  };

  return (
    <div>
      <div className="text-center p-5 border-b-2"><h3 className="text-2xl font-bold">Edit Publisher</h3></div>
      <form onSubmit={handleSubmit(onSubmit)} className="m-4 space-y-4 max-w-xl">
        <div><label className="text-sm">Name (Bangla)</label><input {...register("nameBangla")} className="border p-2 w-full mt-1 focus:outline-none focus:border-primary" /></div>
        <div><label className="text-sm">Name (English)</label><input {...register("nameEnglish")} className="border p-2 w-full mt-1 focus:outline-none focus:border-primary" /></div>
        <div><label className="text-sm">Name (Arabic)</label><input {...register("nameArabic")} className="border p-2 w-full mt-1 focus:outline-none focus:border-primary" /></div>
        <div><label className="text-sm">Description (Bangla)</label><textarea {...register("descBangla")} className="border p-2 w-full mt-1 h-24 focus:outline-none focus:border-primary" /></div>
        <div><label className="text-sm">Description (English)</label><textarea {...register("descEnglish")} className="border p-2 w-full mt-1 h-24 focus:outline-none focus:border-primary" /></div>
        <div><label className="text-sm">Description (Arabic)</label><textarea {...register("descArabic")} className="border p-2 w-full mt-1 h-24 focus:outline-none focus:border-primary" /></div>
        <div><label className="text-sm">Logo URL</label><input {...register("imageUrl")} className="border p-2 w-full mt-1 focus:outline-none focus:border-primary" placeholder="https://..." /></div>
        <button type="submit" disabled={submitting} className="py-2 px-8 bg-primary text-white disabled:opacity-60 hover:bg-green-700">
          {submitting ? "Updating..." : "Update Publisher"}
        </button>
      </form>
    </div>
  );
}
