"use client";
import { useSession } from "next-auth/react";
import { ShoppingBag, User } from "lucide-react";
import Link from "next/link";

export default function UserDashboard() {
  const { data: session } = useSession();
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Account</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl">
        <div className="bg-white rounded shadow-sm p-5 border">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-semibold">{session?.user?.name}</p>
              <p className="text-sm text-gray-500">{session?.user?.email}</p>
            </div>
          </div>
          <p className="text-xs text-gray-400 capitalize">Role: {session?.user?.role || "customer"}</p>
        </div>
        <Link href="/user/orders" className="bg-white rounded shadow-sm p-5 border flex items-center gap-4 hover:border-primary transition-colors">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <ShoppingBag className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="font-semibold">My Orders</p>
            <p className="text-sm text-gray-500">View your order history</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
