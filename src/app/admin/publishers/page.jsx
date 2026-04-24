"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Pencil, Trash2, Plus, BookOpen } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/context/LanguageContext";

export default function AdminPublisherList() {
  const { language } = useLanguage();
  const [publishers, setPublishers] = useState([]);
  const load = () => fetch("/api/publishers").then((r) => r.json()).then((d) => setPublishers(Array.isArray(d) ? d : []));
  useEffect(() => { load(); }, []);
  const handleDelete = async (id) => {
    if (!confirm("Delete?")) return;
    await fetch(`/api/publishers/${id}`, { method: "DELETE" });
    toast.success("Deleted"); load();
  };
  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-5 border-b pb-3">
        <h3 className="text-xl font-bold">Publisher List</h3>
        <Link href="/admin/publishers/add" className="flex items-center gap-1 bg-primary text-white px-3 py-1.5 text-sm hover:bg-green-700"><Plus className="h-4 w-4" /> Add Publisher</Link>
      </div>
      <table className="w-full text-sm border-collapse">
        <thead><tr className="bg-gray-100"><th className="text-left p-2 border">#</th><th className="p-2 border">Logo</th><th className="text-left p-2 border">Name</th><th className="text-left p-2 border">Publisher ID</th><th className="p-2 border">Actions</th></tr></thead>
        <tbody>
          {publishers.map((p, i) => (
            <tr key={p._id} className="hover:bg-gray-50">
              <td className="p-2 border">{i + 1}</td>
              <td className="p-2 border text-center">{p.image ? <img src={p.image} className="h-10 w-10 object-contain mx-auto" /> : <BookOpen className="h-8 w-8 text-gray-400 mx-auto" />}</td>
              <td className="p-2 border">{Array.isArray(p.name) ? p.name[language] || p.name[1] : p.name}</td>
              <td className="p-2 border text-xs text-gray-500">{p.publisherId}</td>
              <td className="p-2 border"><div className="flex gap-2 justify-center"><Link href={`/admin/publishers/${p._id}/edit`} className="text-blue-600"><Pencil className="h-4 w-4" /></Link><button onClick={() => handleDelete(p._id)} className="text-red"><Trash2 className="h-4 w-4" /></button></div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
