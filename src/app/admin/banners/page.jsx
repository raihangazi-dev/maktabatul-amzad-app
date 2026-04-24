"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Pencil, Trash2, Plus, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

export default function AdminBannerList() {
  const [banners, setBanners] = useState([]);
  const load = () => fetch("/api/banners").then((r) => r.json()).then((d) => setBanners(Array.isArray(d) ? d : []));
  useEffect(() => { load(); }, []);
  const handleDelete = async (id) => {
    if (!confirm("Delete?")) return;
    await fetch(`/api/banners/${id}`, { method: "DELETE" });
    toast.success("Deleted"); load();
  };
  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-5 border-b pb-3">
        <h3 className="text-xl font-bold">Banner List</h3>
        <Link href="/admin/banners/add" className="flex items-center gap-1 bg-primary text-white px-3 py-1.5 text-sm hover:bg-green-700"><Plus className="h-4 w-4" /> Add Banner</Link>
      </div>
      <table className="w-full text-sm border-collapse">
        <thead><tr className="bg-gray-100"><th className="text-left p-2 border">#</th><th className="p-2 border">Image</th><th className="text-left p-2 border">Title (English)</th><th className="text-left p-2 border">Status</th><th className="p-2 border">Actions</th></tr></thead>
        <tbody>
          {banners.map((b, i) => (
            <tr key={b._id} className="hover:bg-gray-50">
              <td className="p-2 border">{i + 1}</td>
              <td className="p-2 border text-center">{b.thumb ? <img src={b.thumb} className="h-12 w-20 object-cover mx-auto" alt={b.title?.[1] || "Banner"} /> : <ImageIcon className="h-8 w-8 text-gray-400 mx-auto" />}</td>
              <td className="p-2 border">{b.title?.[1] || b.title?.[0] || "—"}</td>
              <td className="p-2 border"><span className={`px-2 py-0.5 text-xs rounded ${b.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red"}`}>{b.isActive ? "Active" : "Inactive"}</span></td>
              <td className="p-2 border"><div className="flex gap-2 justify-center"><Link href={`/admin/banners/${b._id}/edit`} className="text-blue-600"><Pencil className="h-4 w-4" /></Link><button onClick={() => handleDelete(b._id)} className="text-red"><Trash2 className="h-4 w-4" /></button></div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
