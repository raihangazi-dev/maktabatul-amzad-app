"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

export default function AdminImporterList() {
  const [importers, setImporters] = useState([]);
  const load = () => fetch("/api/countries").then((r) => r.json()).then((d) => setImporters(Array.isArray(d) ? d : []));
  useEffect(() => { load(); }, []);
  const handleDelete = async (id) => {
    if (!confirm("Delete?")) return;
    await fetch(`/api/countries/${id}`, { method: "DELETE" });
    toast.success("Deleted"); load();
  };
  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-5 border-b pb-3">
        <h3 className="text-xl font-bold">Importer Country List</h3>
        <Link href="/admin/importers/add" className="flex items-center gap-1 bg-primary text-white px-3 py-1.5 text-sm hover:bg-green-700"><Plus className="h-4 w-4" /> Add Importer</Link>
      </div>
      <table className="w-full text-sm border-collapse">
        <thead><tr className="bg-gray-100"><th className="text-left p-2 border">#</th><th className="text-left p-2 border">Country Name</th><th className="text-left p-2 border">Country ID</th><th className="p-2 border">Actions</th></tr></thead>
        <tbody>
          {importers.map((c, i) => (
            <tr key={c._id} className="hover:bg-gray-50">
              <td className="p-2 border">{i + 1}</td>
              <td className="p-2 border">{c.name}</td>
              <td className="p-2 border text-xs text-gray-500">{c.countryId}</td>
              <td className="p-2 border"><div className="flex gap-2 justify-center"><Link href={`/admin/importers/${c._id}/edit`} className="text-blue-600"><Pencil className="h-4 w-4" /></Link><button onClick={() => handleDelete(c._id)} className="text-red"><Trash2 className="h-4 w-4" /></button></div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
