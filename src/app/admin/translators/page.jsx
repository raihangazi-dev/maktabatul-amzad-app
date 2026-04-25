"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

export default function AdminTranslatorList() {
  const [translators, setTranslators] = useState([]);
  const load = () => fetch("/api/translators").then((r) => r.json()).then((d) => setTranslators(Array.isArray(d) ? d : []));
  useEffect(() => { load(); }, []);
  const handleDelete = async (translatorId) => {
    if (!confirm("Delete?")) return;
    await fetch(`/api/translators/${translatorId}`, { method: "DELETE" });
    toast.success("Deleted"); load();
  };
  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-5 border-b pb-3">
        <h3 className="text-xl font-bold">Translator List</h3>
        <Link href="/admin/translators/add" className="flex items-center gap-1 bg-primary text-white px-3 py-1.5 text-sm hover:bg-green-700"><Plus className="h-4 w-4" /> Add Translator</Link>
      </div>
      <table className="w-full text-sm border-collapse">
        <thead><tr className="bg-gray-100"><th className="text-left p-2 border">#</th><th className="text-left p-2 border">Name</th><th className="text-left p-2 border">Translator ID</th><th className="p-2 border">Actions</th></tr></thead>
        <tbody>
          {translators.map((t, i) => (
            <tr key={t._id} className="hover:bg-gray-50">
              <td className="p-2 border">{i + 1}</td><td className="p-2 border">{Array.isArray(t.name) ? (t.name[1] || t.name[0]) : t.name}</td><td className="p-2 border text-xs text-gray-500">{t.translatorId}</td>
              <td className="p-2 border"><div className="flex gap-2 justify-center"><Link href={`/admin/translators/${t.translatorId}/edit`} className="text-blue-600"><Pencil className="h-4 w-4" /></Link><button onClick={() => handleDelete(t.translatorId)} className="text-red"><Trash2 className="h-4 w-4" /></button></div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
