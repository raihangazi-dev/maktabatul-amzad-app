"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Pencil, Trash2, Plus, User } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/context/LanguageContext";

export default function AdminWriterList() {
  const { language } = useLanguage();
  const [writers, setWriters] = useState([]);

  const load = () => fetch("/api/writers").then((r) => r.json()).then((d) => setWriters(Array.isArray(d) ? d : []));
  useEffect(() => { load(); }, []);

  const handleDelete = async (writerId) => {
    if (!confirm("Delete this writer?")) return;
    await fetch(`/api/writers/${writerId}`, { method: "DELETE" });
    toast.success("Writer deleted");
    load();
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-5 border-b pb-3">
        <h3 className="text-xl font-bold">Writer List</h3>
        <Link href="/admin/writers/add" className="flex items-center gap-1 bg-primary text-white px-3 py-1.5 text-sm hover:bg-green-700">
          <Plus className="h-4 w-4" /> Add Writer
        </Link>
      </div>
      <table className="w-full text-sm border-collapse">
        <thead><tr className="bg-gray-100"><th className="text-left p-2 border">#</th><th className="p-2 border">Image</th><th className="text-left p-2 border">Name</th><th className="text-left p-2 border">Writer ID</th><th className="p-2 border">Actions</th></tr></thead>
        <tbody>
          {writers.map((w, i) => (
            <tr key={w._id} className="hover:bg-gray-50">
              <td className="p-2 border">{i + 1}</td>
              <td className="p-2 border text-center">{w.image ? <img src={w.image} className="h-10 w-10 object-cover mx-auto" alt={w.name?.[1] || "Writer"} /> : <User className="h-8 w-8 text-gray-400 mx-auto" />}</td>
              <td className="p-2 border">{w.name?.[language] || w.name?.[1]}</td>
              <td className="p-2 border text-gray-500 text-xs">{w.writerId}</td>
              <td className="p-2 border">
                <div className="flex gap-2 justify-center">
                  <Link href={`/admin/writers/${w.writerId}/edit`} className="text-blue-600"><Pencil className="h-4 w-4" /></Link>
                  <button onClick={() => handleDelete(w.writerId)} className="text-red"><Trash2 className="h-4 w-4" /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
