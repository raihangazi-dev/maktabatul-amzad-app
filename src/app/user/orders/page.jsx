"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { ChevronDown, PackageOpen } from "lucide-react";

const statusColor = (s) => {
  if (s === "delivered") return "text-green-700 bg-green-100";
  if (s === "cancelled") return "text-red bg-red-100";
  if (s === "shipped") return "text-blue-700 bg-blue-100";
  if (s === "processing") return "text-yellow-700 bg-yellow-100";
  return "text-gray-700 bg-gray-100";
};

export default function UserOrders() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    if (!session?.user?.email) return;
    fetch(`/api/orders?email=${encodeURIComponent(session.user.email)}`)
      .then((r) => r.json())
      .then((d) => { setOrders(Array.isArray(d) ? d : []); setLoading(false); });
  }, [session]);

  if (loading) return <div className="p-6 text-gray-500">Loading orders...</div>;

  if (orders.length === 0) {
    return (
      <div className="p-6 flex flex-col items-center justify-center text-center text-gray-400 mt-16">
        <PackageOpen className="h-16 w-16 mb-4" />
        <p className="text-lg font-medium">No orders yet</p>
        <p className="text-sm">Your orders will appear here after you place them.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      <div className="space-y-4">
        {orders.map((o, i) => {
          const total = (o.items || []).reduce((s, b) => s + b.price * b.qty, 0) + (o.deliveryCharge || 0);
          const isOpen = expanded === o._id;
          return (
            <div key={o._id} className="bg-white border rounded shadow-sm">
              <button
                onClick={() => setExpanded(isOpen ? null : o._id)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-400">#{i + 1}</span>
                  <div>
                    <p className="font-medium text-sm">{o.items?.length} item(s)</p>
                    <p className="text-xs text-gray-400">{o.createdAt ? new Date(o.createdAt).toLocaleDateString() : ""}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-sm">৳{total}</span>
                  <span className={`text-xs px-2 py-0.5 rounded capitalize ${statusColor(o.status)}`}>{o.status}</span>
                  <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </div>
              </button>
              {isOpen && (
                <div className="border-t p-4">
                  <div className="text-xs text-gray-500 mb-3">
                    <span className="font-medium">Delivery to:</span> {o.fullAddress?.moreDetails}, {o.fullAddress?.city}, {o.fullAddress?.district} {o.fullAddress?.zip}
                  </div>
                  <table className="w-full text-xs border-collapse">
                    <thead><tr className="bg-gray-50"><th className="text-left p-2 border">Book</th><th className="p-2 border">Qty</th><th className="p-2 border text-right">Price</th><th className="p-2 border text-right">Subtotal</th></tr></thead>
                    <tbody>
                      {(o.items || []).map((book, bi) => (
                        <tr key={bi}>
                          <td className="p-2 border">{book.title?.[1] || book.title?.[0] || book.bookId}</td>
                          <td className="p-2 border text-center">{book.qty}</td>
                          <td className="p-2 border text-right">৳{book.price}</td>
                          <td className="p-2 border text-right">৳{book.price * book.qty}</td>
                        </tr>
                      ))}
                      <tr><td colSpan={3} className="p-2 border text-right text-gray-500">Delivery</td><td className="p-2 border text-right">৳{o.deliveryCharge || 0}</td></tr>
                      <tr className="font-bold"><td colSpan={3} className="p-2 border text-right">Total</td><td className="p-2 border text-right">৳{total}</td></tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
