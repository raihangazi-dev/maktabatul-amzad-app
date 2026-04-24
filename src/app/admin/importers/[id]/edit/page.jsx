"use client";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function EditImporter() {
  const { id } = useParams();
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm();
  useEffect(() => {
    fetch(`/api/countries/${id}`).then((r) => r.json()).then((c) => reset({ name: c.name || "" }));
  }, [id, reset]);
  const onSubmit = async (data) => {
    await fetch(`/api/countries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: data.name }),
    });
    toast.success("Updated"); router.push("/admin/importers");
  };
  return (
    <div>
      <div className="text-center p-5 border-b-2"><h3 className="text-2xl font-bold">Edit Importer Country</h3></div>
      <form onSubmit={handleSubmit(onSubmit)} className="m-4 space-y-4 max-w-sm">
        <div><label className="text-sm">Country Name</label><input {...register("name", { required: true })} className="border p-2 w-full mt-1" /></div>
        <button type="submit" className="py-2 px-8 bg-primary text-white">Update Importer</button>
      </form>
    </div>
  );
}
