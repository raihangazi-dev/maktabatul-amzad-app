"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/context/LanguageContext";

export default function AdminBookList() {
  const { language } = useLanguage();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = (showLoading = true) => {
    if (showLoading) setLoading(true);
    fetch("/api/books?size=100")
      .then((r) => r.json())
      .then((data) => setBooks(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetch("/api/books?size=100")
      .then((r) => r.json())
      .then((data) => setBooks(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this book?")) return;
    await fetch(`/api/books/${id}`, { method: "DELETE" });
    toast.success("Book deleted");
    load();
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-5 border-b pb-3">
        <h3 className="text-xl font-bold">Book List</h3>
        <Link href="/admin/books/add" className="flex items-center gap-1 bg-primary text-white px-3 py-1.5 text-sm hover:bg-green-700">
          <Plus className="h-4 w-4" /> Add Book
        </Link>
      </div>
      {loading ? <p>Loading...</p> : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-2 border">#</th>
                <th className="text-left p-2 border">Image</th>
                <th className="text-left p-2 border">Title</th>
                <th className="text-left p-2 border">Price</th>
                <th className="text-left p-2 border">Stock</th>
                <th className="text-left p-2 border">Status</th>
                <th className="text-left p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, i) => (
                <tr key={book._id} className="hover:bg-gray-50">
                  <td className="p-2 border">{i + 1}</td>
                  <td className="p-2 border"><img src={book.thumb} className="h-10 w-8 object-cover" alt="" /></td>
                  <td className="p-2 border max-w-[200px] truncate">{book.title?.[language] || book.title?.[1]}</td>
                  <td className="p-2 border">{book.price} TK</td>
                  <td className="p-2 border">{book.stock}</td>
                  <td className="p-2 border capitalize">{book.status}</td>
                  <td className="p-2 border">
                    <div className="flex gap-2">
                      <Link href={`/admin/books/${book._id}/edit`} className="text-blue-600 hover:opacity-70"><Pencil className="h-4 w-4" /></Link>
                      <button onClick={() => handleDelete(book._id)} className="text-red hover:opacity-70"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {books.length === 0 && <p className="text-gray-500 text-center py-10">No books found</p>}
        </div>
      )}
    </div>
  );
}
