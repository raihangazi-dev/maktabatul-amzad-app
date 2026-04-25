"use client";
import { useEffect, useState } from "react";
import { Trash2, ChevronDown } from "lucide-react";
import { toast } from "sonner";

const STATUS_OPTIONS = ["pending", "processing", "shipped", "delivered", "cancelled"];

export default function AdminOrderList() {
  const [orders, setOrders] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const load = () => fetch("/api/orders").then((r) => r.json()).then((d) => setOrders(Array.isArray(d) ? d : []));
  useEffect(() => { load(); }, []);

  const handleStatusChange = async (id, editedStatus) => {
    await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ editedStatus }),
    });
    toast.success("Status updated"); load();
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete order?")) return;
    await fetch(`/api/orders/${id}`, { method: "DELETE" });
    toast.success("Deleted"); load();
  };

  const statusColor = (s) => {
    if (s === "delivered") return "text-green-700 bg-green-100";
    if (s === "cancelled") return "text-red bg-red-100";
    if (s === "shipped") return "text-blue-700 bg-blue-100";
    if (s === "processing") return "text-yellow-700 bg-yellow-100";
    return "text-gray-700 bg-gray-100";
  };

  return (
    <div className="p-5">
      <div className="mb-5 border-b pb-3">
        <h3 className="text-xl font-bold">Order List ({orders.length})</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-2 border">#</th>
              <th className="text-left p-2 border">Customer</th>
              <th className="text-left p-2 border">Phone</th>
              <th className="text-left p-2 border">District</th>
              <th className="text-right p-2 border">Total</th>
              <th className="p-2 border">Status</th>
              <th className="text-left p-2 border">Date</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o, i) => {
              const total = (o.items || []).reduce((s, b) => s + b.price * b.qty, 0) + (o.deliveryCharge || 0);
              return (
                <>
                  <tr key={o._id} className="hover:bg-gray-50">
                    <td className="p-2 border">{i + 1}</td>
                    <td className="p-2 border">
                      <button onClick={() => setExpanded(expanded === o._id ? null : o._id)} className="flex items-center gap-1 text-left font-medium text-blue-600 hover:underline">
                        {o.name} <ChevronDown className={`h-3 w-3 transition-transform ${expanded === o._id ? "rotate-180" : ""}`} />
                      </button>
                      <div className="text-xs text-gray-400">{o.email}</div>
                    </td>
                    <td className="p-2 border">{o.phone}</td>
                    <td className="p-2 border">{o.fullAddress?.district}</td>
                    <td className="p-2 border text-right font-medium">৳{total}</td>
                    <td className="p-2 border">
                      <select
                        value={o.status}
                        onChange={(e) => handleStatusChange(o._id, e.target.value)}
                        className={`text-xs px-2 py-1 rounded border-0 outline-none cursor-pointer ${statusColor(o.status)}`}
                      >
                        {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td className="p-2 border text-xs text-gray-500">{o.createdAt ? new Date(o.createdAt).toLocaleDateString() : "—"}</td>
                    <td className="p-2 border text-center"><button onClick={() => handleDelete(o._id)} className="text-red"><Trash2 className="h-4 w-4" /></button></td>
                  </tr>
                  {expanded === o._id && (
                    <tr key={`${o._id}-detail`} className="bg-gray-50">
                      <td colSpan={8} className="p-3 border">
                        <div className="text-xs text-gray-600 mb-2">
                          <span className="font-medium">Address:</span> {o.fullAddress?.moreDetails}, {o.fullAddress?.city}, {o.fullAddress?.district} — {o.fullAddress?.zip}
                        </div>
                        <table className="w-full text-xs border-collapse">
                          <thead><tr className="bg-white"><th className="text-left p-1 border">Book</th><th className="p-1 border">Qty</th><th className="p-1 border text-right">Price</th><th className="p-1 border text-right">Subtotal</th></tr></thead>
                          <tbody>
                            {(o.items || []).map((book, bi) => (
                              <tr key={bi}>
                                <td className="p-1 border">{book.title?.[1] || book.title?.[0] || book.bookId}</td>
                                <td className="p-1 border text-center">{book.qty}</td>
                                <td className="p-1 border text-right">৳{book.price}</td>
                                <td className="p-1 border text-right">৳{book.price * book.qty}</td>
                              </tr>
                            ))}
                            <tr className="font-medium">
                              <td colSpan={3} className="p-1 border text-right text-gray-500">Delivery Charge</td>
                              <td className="p-1 border text-right">৳{o.deliveryCharge || 0}</td>
                            </tr>
                            <tr className="font-bold">
                              <td colSpan={3} className="p-1 border text-right">Total</td>
                              <td className="p-1 border text-right">৳{total}</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
