"use client";
import { useEffect, useState } from "react";
import { BookOpen, PenLine, ShoppingBag, Tag } from "lucide-react";

export default function AdminDashboardClient() {
  const [stats, setStats] = useState({ books: 0, writers: 0, orders: 0, categories: 0 });

  useEffect(() => {
    Promise.all([
      fetch("/api/books/length").then((r) => r.json()),
      fetch("/api/writers").then((r) => r.json()),
      fetch("/api/orders").then((r) => r.json()),
      fetch("/api/categories").then((r) => r.json()),
    ]).then(([booksData, writers, orders, categories]) => {
      setStats({
        books: booksData.totalBooks || 0,
        writers: Array.isArray(writers) ? writers.length : 0,
        orders: Array.isArray(orders) ? orders.length : 0,
        categories: Array.isArray(categories) ? categories.length : 0,
      });
    });
  }, []);

  const cards = [
    { label: "Total Books", value: stats.books, icon: BookOpen, color: "bg-primary" },
    { label: "Total Writers", value: stats.writers, icon: PenLine, color: "bg-blue-600" },
    { label: "Total Orders", value: stats.orders, icon: ShoppingBag, color: "bg-gold" },
    { label: "Categories", value: stats.categories, icon: Tag, color: "bg-red" },
  ];

  return (
    <div className="p-5">
      <h3 className="text-xl font-bold mb-6">Overview</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className={`${color} text-white rounded p-4 flex items-center gap-3`}>
            <Icon className="h-8 w-8 opacity-80" />
            <div>
              <p className="text-2xl font-bold">{value}</p>
              <p className="text-sm opacity-80">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
