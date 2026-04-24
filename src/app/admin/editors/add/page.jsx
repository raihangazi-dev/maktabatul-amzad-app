"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function AddEditor() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [submitting, setSubmitting] = useState(false);
  const onSubmit = async (data) => {
    setSubmitting(true);
    const res = await fetch("/api/editors", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ editorId: data.editorId, name: data.name }) });
    const result = await res.json();
    setSubmitting(false);
    if (result.insertedId) { toast.success("Editor added"); router.push("/admin/editors"); }
    else toast.error("Failed");
  };
  return (
    <div>
      <div className="text-center p-5 border-b-2"><h3 className="text-2xl font-bold">Add Editor</h3></div>
      <form onSubmit={handleSubmit(onSubmit)} className="m-4 space-y-4 max-w-sm">
        <div><label className="text-sm">Editor ID (unique)</label><input {...register("editorId", { required: true })} className="border p-2 w-full mt-1" placeholder="e.g. ED001" /></div>
        <div><label className="text-sm">Name</label><input {...register("name", { required: true })} className="border p-2 w-full mt-1" /></div>
        <button type="submit" disabled={submitting} className="py-2 px-8 bg-primary text-white">{submitting ? "Adding..." : "Add Editor"}</button>
      </form>
    </div>
  );
}
