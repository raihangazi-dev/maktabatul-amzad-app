"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function EditWriter() {
  const { writerId } = useParams();
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch(`/api/writers/${writerId}`).then((r) => r.json()).then((w) => {
      reset({
        nameBangla: w.name?.[0] || "", nameEnglish: w.name?.[1] || "", nameArabic: w.name?.[2] || "",
        descBangla: w.desc?.[0] || "", descEnglish: w.desc?.[1] || "", descArabic: w.desc?.[2] || "",
        imageUrl: w.image || "",
      });
    });
  }, [writerId, reset]);

  const onSubmit = async (data) => {
    setSubmitting(true);
    await fetch(`/api/writers/${writerId}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: [data.nameBangla, data.nameEnglish, data.nameArabic], desc: [data.descBangla, data.descEnglish, data.descArabic], image: data.imageUrl }),
    });
    setSubmitting(false);
    toast.success("Writer updated");
    router.push("/admin/writers");
  };

  return (
    <div>
      <div className="text-center p-5 border-b-2"><h3 className="text-2xl font-bold">Edit Writer</h3></div>
      <form onSubmit={handleSubmit(onSubmit)} className="m-4 space-y-4 max-w-xl">
        <div><label className="text-sm">Name (Bangla)</label><input {...register("nameBangla")} className="border p-2 w-full mt-1" /></div>
        <div><label className="text-sm">Name (English)</label><input {...register("nameEnglish")} className="border p-2 w-full mt-1" /></div>
        <div><label className="text-sm">Name (Arabic)</label><input {...register("nameArabic")} className="border p-2 w-full mt-1" /></div>
        <div><label className="text-sm">Bio (Bangla)</label><textarea {...register("descBangla")} className="border p-2 w-full mt-1 h-24" /></div>
        <div><label className="text-sm">Bio (English)</label><textarea {...register("descEnglish")} className="border p-2 w-full mt-1 h-24" /></div>
        <div><label className="text-sm">Bio (Arabic)</label><textarea {...register("descArabic")} className="border p-2 w-full mt-1 h-24" /></div>
        <div><label className="text-sm">Image URL</label><input {...register("imageUrl")} className="border p-2 w-full mt-1" /></div>
        <button type="submit" disabled={submitting} className="py-2 px-8 bg-primary text-white disabled:opacity-60">{submitting ? "Saving..." : "Update Writer"}</button>
      </form>
    </div>
  );
}
