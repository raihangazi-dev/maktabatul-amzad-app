"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/context/LanguageContext";

export default function AdminCategoryList() {
  const { language } = useLanguage();
  const [categories, setCategories] = useState([]);
  const load = () => fetch("/api/categories").then((r) => r.json()).then((d) => setCategories(Array.isArray(d) ? d : []));
  useEffect(() => { load(); }, []);
  const handleDelete = async (categoryId) => {
    if (!confirm("Delete?")) return;
    await fetch(`/api/categories/${categoryId}`, { method: "DELETE" });
    toast.success("Deleted"); load();
  };
  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-5 border-b pb-3">
        <h3 className="text-xl font-bold">Category List</h3>
        <Link href="/admin/categories/add" className="flex items-center gap-1 bg-primary text-white px-3 py-1.5 text-sm hover:bg-green-700"><Plus className="h-4 w-4" /> Add Category</Link>
      </div>
      <table className="w-full text-sm border-collapse">
        <thead><tr className="bg-gray-100"><th className="text-left p-2 border">#</th><th className="text-left p-2 border">Name</th><th className="text-left p-2 border">Category ID</th><th className="p-2 border">Actions</th></tr></thead>
        <tbody>
          {categories.map((c, i) => (
            <tr key={c._id} className="hover:bg-gray-50">
              <td className="p-2 border">{i + 1}</td>
              <td className="p-2 border">{Array.isArray(c.name) ? c.name[language] || c.name[1] : c.name}</td>
              <td className="p-2 border text-xs text-gray-500">{c.categoryId}</td>
              <td className="p-2 border"><div className="flex gap-2 justify-center"><Link href={`/admin/categories/${c.categoryId}/edit`} className="text-blue-600"><Pencil className="h-4 w-4" /></Link><button onClick={() => handleDelete(c.categoryId)} className="text-red"><Trash2 className="h-4 w-4" /></button></div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
