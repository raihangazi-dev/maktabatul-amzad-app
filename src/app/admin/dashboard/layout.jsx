import Link from "next/link";

export default function AdminDashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50 text-black">
      <aside className="w-64 border-r border-gray-200 bg-white p-6">
        <h2 className="text-lg font-bold">Admin</h2>
        <nav className="mt-6 flex flex-col gap-3 text-sm font-medium text-gray-700">
          <Link href="/admin/dashboard">Dashboard</Link>
          <Link href="/admin/dashboard/books">Books</Link>
          <Link href="/admin/dashboard/users">Users</Link>
          <Link href="/admin/dashboard/orders">Orders</Link>
        </nav>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
