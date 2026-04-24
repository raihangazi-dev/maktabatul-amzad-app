"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BookOpen, PenLine, ShoppingBag, Tag, TrendingUp,
  Users, Building2, Image as ImageIcon,
  FolderTree, Languages, Edit3,
} from "lucide-react";

const STATUS_CONFIG = [
  { key: "pending",    label: "Pending",    color: "bg-gold",      textColor: "text-[#b45309]", bg: "bg-[#fef3c7]" },
  { key: "processing", label: "Processing", color: "bg-blue-500",  textColor: "text-blue-700",  bg: "bg-blue-50"   },
  { key: "shipped",    label: "Shipped",    color: "bg-purple-500",textColor: "text-purple-700",bg: "bg-purple-50" },
  { key: "delivered",  label: "Delivered",  color: "bg-primary",   textColor: "text-primary",   bg: "bg-green-50"  },
  { key: "cancelled",  label: "Cancelled",  color: "bg-red",       textColor: "text-red",       bg: "bg-red-50"    },
];

const statusBadgeClass = (s) => {
  const map = { pending: "badge-gold", processing: "badge-blue", shipped: "badge-purple", delivered: "badge-green", cancelled: "badge-red" };
  return `badge ${map[s] || "badge-gray"}`;
};

function getMonthlyData(orders) {
  const months = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const label = d.toLocaleDateString("en-GB", { month: "short", year: "2-digit" });
    months.push({ key, label, count: 0, revenue: 0 });
  }
  orders.forEach((o) => {
    if (!o.timestamp) return;
    const d = new Date(o.timestamp);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const m = months.find((x) => x.key === key);
    if (m) {
      m.count++;
      m.revenue += (o.orders || []).reduce((s, b) => s + (b.price || 0) * (b.items || 0), 0) + (o.deliveryCharge || 0);
    }
  });
  return months;
}

export default function AdminDashboardClient() {
  const [stats, setStats] = useState({ books: 0, writers: 0, publishers: 0, categories: 0, translators: 0, editors: 0 });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/books/length").then((r) => r.json()),
      fetch("/api/writers").then((r) => r.json()),
      fetch("/api/publishers").then((r) => r.json()),
      fetch("/api/orders").then((r) => r.json()),
      fetch("/api/categories").then((r) => r.json()),
      fetch("/api/translators").then((r) => r.json()),
      fetch("/api/editors").then((r) => r.json()),
    ]).then(([booksData, writers, publishers, ordersData, categories, translators, editors]) => {
      setStats({
        books:       booksData.totalBooks ?? 0,
        writers:     Array.isArray(writers)     ? writers.length     : 0,
        publishers:  Array.isArray(publishers)  ? publishers.length  : 0,
        categories:  Array.isArray(categories)  ? categories.length  : 0,
        translators: Array.isArray(translators) ? translators.length : 0,
        editors:     Array.isArray(editors)     ? editors.length     : 0,
      });
      setOrders(Array.isArray(ordersData) ? ordersData : []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const revenue = orders.reduce((sum, o) => {
    return sum + (o.orders || []).reduce((s, b) => s + (b.price || 0) * (b.items || 0), 0) + (o.deliveryCharge || 0);
  }, 0);

  const statusCounts = STATUS_CONFIG.reduce((acc, { key }) => {
    acc[key] = orders.filter((o) => o.status === key).length;
    return acc;
  }, {});

  const recentOrders  = [...orders].slice(0, 6);
  const monthlyData   = getMonthlyData(orders);
  const maxCount      = Math.max(...monthlyData.map((m) => m.count), 1);

  const kpiCards = [
    { label: "Total Books",   value: stats.books,      icon: BookOpen,   border: "border-primary",   iconBg: "bg-primary/10",  iconColor: "text-primary"   },
    { label: "Total Orders",  value: orders.length,    icon: ShoppingBag,border: "border-red",       iconBg: "bg-red/10",      iconColor: "text-red"       },
    { label: "Revenue (BDT)", value: `৳${revenue.toLocaleString()}`, icon: TrendingUp, border: "border-gold", iconBg: "bg-[#fef3c7]", iconColor: "text-[#b45309]" },
    { label: "Total Writers", value: stats.writers,    icon: PenLine,    border: "border-slate-400", iconBg: "bg-slate-100",   iconColor: "text-slate-600" },
  ];

  const catalogCards = [
    { label: "Publishers",  value: stats.publishers,  icon: Building2,  color: "text-indigo-600",  bg: "bg-indigo-50"  },
    { label: "Categories",  value: stats.categories,  icon: Tag,        color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Translators", value: stats.translators, icon: Languages,  color: "text-violet-600",  bg: "bg-violet-50"  },
    { label: "Editors",     value: stats.editors,     icon: Edit3,      color: "text-orange-600",  bg: "bg-orange-50"  },
  ];

  const quickActions = [
    { label: "Add Book",       href: "/admin/books/add",       icon: BookOpen    },
    { label: "Add Writer",     href: "/admin/writers/add",     icon: PenLine     },
    { label: "Add Publisher",  href: "/admin/publishers/add",  icon: Building2   },
    { label: "Add Category",   href: "/admin/categories/add",  icon: Tag         },
    { label: "Sub Category",   href: "/admin/subcategories/add", icon: FolderTree },
    { label: "Add Banner",     href: "/admin/banners/add",     icon: ImageIcon   },
    { label: "View Orders",    href: "/admin/orders",          icon: ShoppingBag },
    { label: "Manage Users",   href: "/admin/users",           icon: Users       },
  ];

  const val = (v) => (loading ? "—" : v);

  return (
    <div className="p-6 space-y-5 animate-fadeIn">

      {/* ── Primary KPI Cards ── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {kpiCards.map(({ label, value, icon: Icon, border, iconBg, iconColor }) => (
          <div key={label} className={`bg-white border-l-4 ${border} p-5 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow duration-200`}>
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
              <p className={`text-3xl font-bold text-gray-900 ${loading ? "animate-pulse" : ""}`}>{val(value)}</p>
            </div>
            <div className={`h-12 w-12 ${iconBg} flex items-center justify-center flex-shrink-0`}>
              <Icon className={`h-5 w-5 ${iconColor}`} />
            </div>
          </div>
        ))}
      </div>

      {/* ── Catalog Stats ── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {catalogCards.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white p-4 flex items-center gap-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className={`h-10 w-10 ${bg} flex items-center justify-center flex-shrink-0`}>
              <Icon className={`h-4.5 w-4.5 ${color}`} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{label}</p>
              <p className={`text-2xl font-bold text-gray-900 ${loading ? "animate-pulse" : ""}`}>{val(value)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Recent Orders + Order Status ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

        <div className="xl:col-span-2 bg-white shadow-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h3 className="section-heading text-sm">Recent Orders</h3>
            <Link href="/admin/orders" className="text-xs text-primary hover:underline font-medium">View all →</Link>
          </div>
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-8 text-center text-gray-400 text-sm">Loading...</div>
            ) : recentOrders.length === 0 ? (
              <div className="p-8 text-center text-gray-400 text-sm">No orders yet</div>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>District</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((o) => {
                    const total = (o.orders || []).reduce((s, b) => s + b.price * b.items, 0) + (o.deliveryCharge || 0);
                    return (
                      <tr key={o._id}>
                        <td className="font-medium">{o.name}</td>
                        <td className="text-gray-500 text-xs">{o.fullAddress?.district || "—"}</td>
                        <td className="text-center">{o.orders?.length || 0}</td>
                        <td className="font-semibold text-gray-800">৳{total}</td>
                        <td><span className={statusBadgeClass(o.status)}>{o.status}</span></td>
                        <td className="text-gray-400 text-xs">
                          {o.timestamp ? new Date(o.timestamp).toLocaleDateString("en-GB", { day: "2-digit", month: "short" }) : "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="bg-white shadow-sm">
          <div className="px-5 py-4 border-b border-gray-100">
            <h3 className="section-heading text-sm">Order Status</h3>
          </div>
          <div className="p-5 space-y-4">
            {STATUS_CONFIG.map(({ key, label, color, textColor }) => {
              const count = statusCounts[key] || 0;
              const pct   = orders.length > 0 ? Math.round((count / orders.length) * 100) : 0;
              return (
                <div key={key}>
                  <div className="flex justify-between items-center mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className={`inline-block h-2 w-2 ${color}`} />
                      <span className="text-xs text-gray-600 font-medium">{label}</span>
                    </div>
                    <span className={`text-xs font-bold ${textColor}`}>{count}</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 w-full">
                    <div className={`h-full ${color} transition-all duration-700 ease-out`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
            <div className="pt-4 border-t border-gray-100 grid grid-cols-2 gap-3 text-center">
              <div className="bg-green-50 py-3">
                <p className="text-2xl font-bold text-primary">{statusCounts.delivered || 0}</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-0.5">Delivered</p>
              </div>
              <div className="bg-[#fef3c7] py-3">
                <p className="text-2xl font-bold text-[#b45309]">{statusCounts.pending || 0}</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-0.5">Pending</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Monthly Orders Chart ── */}
      <div className="bg-white shadow-sm">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="section-heading text-sm">Monthly Orders — Last 6 Months</h3>
          <span className="text-xs text-gray-400">{orders.length} total orders</span>
        </div>
        <div className="px-6 py-5">
          <div className="flex items-end gap-3" style={{ height: "120px" }}>
            {monthlyData.map(({ label, count, revenue: rev }) => {
              const barH = maxCount > 0 ? Math.round((count / maxCount) * 88) : 0;
              return (
                <div key={label} className="flex-1 flex flex-col items-center gap-1 min-w-0">
                  <span className="text-[11px] font-bold text-gray-700">{count > 0 ? count : ""}</span>
                  <div className="w-full flex justify-center" style={{ height: "88px", alignItems: "flex-end", display: "flex" }}>
                    <div
                      className="w-full max-w-[48px] bg-primary transition-all duration-700 ease-out"
                      style={{ height: `${barH}px`, minHeight: count > 0 ? "4px" : "0" }}
                    />
                  </div>
                  <span className="text-[10px] text-gray-400 w-full text-center truncate">{label}</span>
                  <span className="text-[10px] text-gray-500">
                    {rev > 0 ? `৳${rev >= 1000 ? `${(rev / 1000).toFixed(1)}k` : rev}` : "—"}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-lg font-bold text-gray-800">{orders.filter((o) => {
                const d = new Date(o.timestamp);
                const now = new Date();
                return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
              }).length}</p>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">This Month</p>
            </div>
            <div>
              <p className="text-lg font-bold text-gray-800">
                ৳{orders.filter((o) => {
                  const d = new Date(o.timestamp);
                  const now = new Date();
                  return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
                }).reduce((s, o) => s + (o.orders || []).reduce((a, b) => a + (b.price || 0) * (b.items || 0), 0) + (o.deliveryCharge || 0), 0).toLocaleString()}
              </p>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">This Month Revenue</p>
            </div>
            <div>
              <p className="text-lg font-bold text-gray-800">
                {orders.length > 0 ? Math.round((statusCounts.delivered / orders.length) * 100) : 0}%
              </p>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">Delivery Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Quick Actions ── */}
      <div className="bg-white shadow-sm">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="section-heading text-sm">Quick Actions</h3>
        </div>
        <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickActions.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2.5 border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 hover:border-primary hover:text-primary hover:bg-green-50/50 transition-all duration-150 group"
            >
              <Icon className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors duration-150 flex-shrink-0" />
              {label}
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
