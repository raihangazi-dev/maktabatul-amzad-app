"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { User as UserIcon, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

const ROLES = ["user", "admin"];

export default function AdminUserList() {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);
  const load = () => fetch("/api/users").then((r) => r.json()).then((d) => setUsers(Array.isArray(d) ? d : []));
  useEffect(() => { load(); }, []);

  const handleRoleChange = async (id, role) => {
    if (!confirm(`Change role to "${role}"?`)) return;
    const res = await fetch(`/api/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });
    if (res.ok) { toast.success("Role updated"); load(); }
    else toast.error("Failed");
  };

  return (
    <div className="p-5">
      <div className="mb-5 border-b pb-3">
        <h3 className="text-xl font-bold">User Management</h3>
        <p className="text-xs text-gray-500 mt-1">The admin email set in <code className="bg-gray-100 px-1 rounded">ADMIN_EMAIL</code> always has admin access regardless of DB role.</p>
      </div>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left p-2 border">#</th>
            <th className="p-2 border">Avatar</th>
            <th className="text-left p-2 border">Name</th>
            <th className="text-left p-2 border">Email</th>
            <th className="p-2 border">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => {
            const isSelf = u.email === session?.user?.email;
            const isEnvAdmin = u.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;
            return (
              <tr key={u._id} className="hover:bg-gray-50">
                <td className="p-2 border">{i + 1}</td>
                <td className="p-2 border text-center">
                  {u.image ? (
                    <img src={u.image} className="h-8 w-8 rounded-full object-cover mx-auto" alt="" />
                  ) : (
                    <UserIcon className="h-7 w-7 text-gray-400 mx-auto" />
                  )}
                </td>
                <td className="p-2 border font-medium">
                  <div className="flex items-center gap-1.5">
                    {u.name}
                    {u.role === "admin" && <ShieldCheck className="h-3.5 w-3.5 text-primary" />}
                    {isSelf && <span className="text-xs text-gray-400">(you)</span>}
                  </div>
                </td>
                <td className="p-2 border text-gray-600">{u.email}</td>
                <td className="p-2 border text-center">
                  {isSelf || isEnvAdmin ? (
                    <span className={`text-xs px-2 py-0.5 rounded capitalize ${u.role === "admin" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                      {u.role}
                    </span>
                  ) : (
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u._id, e.target.value)}
                      className={`text-xs px-2 py-1 rounded border outline-none cursor-pointer ${u.role === "admin" ? "bg-green-100 text-green-700 border-green-300" : "bg-gray-100 text-gray-700 border-gray-300"}`}
                    >
                      {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
