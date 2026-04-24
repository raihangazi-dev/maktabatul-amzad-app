"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function EditEditor() {
  const { editorId } = useParams();
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm();
  useEffect(() => {
    fetch(`/api/editors/${editorId}`).then((r) => r.json()).then((e) => reset({ name: e.name }));
  }, [editorId, reset]);
  const onSubmit = async (data) => {
    await fetch(`/api/editors/${editorId}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: data.name }) });
    toast.success("Updated"); router.push("/admin/editors");
  };
  return (
    <div>
      <div className="text-center p-5 border-b-2"><h3 className="text-2xl font-bold">Edit Editor</h3></div>
      <form onSubmit={handleSubmit(onSubmit)} className="m-4 space-y-4 max-w-sm">
        <div><label className="text-sm">Name</label><input {...register("name", { required: true })} className="border p-2 w-full mt-1" /></div>
        <button type="submit" className="py-2 px-8 bg-primary text-white">Update Editor</button>
      </form>
    </div>
  );
}
