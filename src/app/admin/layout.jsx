"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "@/app/components/Header";
import {
  LayoutDashboard, BookOpen, PenLine, Edit3, Languages, Building2,
  Globe, Tag, FolderTree, Image, ShoppingBag, User, ChevronRight
} from "lucide-react";

const navLinks = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Banner List", href: "/admin/banners", icon: Image },
  { label: "Add Banner", href: "/admin/banners/add", icon: Image },
  { label: "Book List", href: "/admin/books", icon: BookOpen },
  { label: "Add Book", href: "/admin/books/add", icon: BookOpen },
  { label: "Writer List", href: "/admin/writers", icon: PenLine },
  { label: "Add Writer", href: "/admin/writers/add", icon: PenLine },
  { label: "Editor List", href: "/admin/editors", icon: Edit3 },
  { label: "Add Editor", href: "/admin/editors/add", icon: Edit3 },
  { label: "Translator List", href: "/admin/translators", icon: Languages },
  { label: "Add Translator", href: "/admin/translators/add", icon: Languages },
  { label: "Publisher List", href: "/admin/publishers", icon: Building2 },
  { label: "Add Publisher", href: "/admin/publishers/add", icon: Building2 },
  { label: "Importer List", href: "/admin/importers", icon: Globe },
  { label: "Add Importer", href: "/admin/importers/add", icon: Globe },
  { label: "Category List", href: "/admin/categories", icon: Tag },
  { label: "Add Category", href: "/admin/categories/add", icon: Tag },
  { label: "SubCategory List", href: "/admin/subcategories", icon: FolderTree },
  { label: "Add SubCategory", href: "/admin/subcategories/add", icon: FolderTree },
  { label: "Order List", href: "/admin/orders", icon: ShoppingBag },
  { label: "User Management", href: "/admin/users", icon: User },
];

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth/signin");
    if (status === "authenticated" && session?.user?.role !== "admin") router.push("/");
  }, [status, session, router]);

  if (status === "loading") return <div className="flex justify-center items-center min-h-screen"><p>Loading...</p></div>;

  return (
    <>
      <Header />
      <section className="container">
        <div className="mt-5 mb-3 border-b-2 border-primary pb-2">
          <h2 className="text-2xl font-bold text-primary">Admin Dashboard</h2>
        </div>
        <div className="grid grid-cols-12 mt-5">
          {/* Sidebar */}
          <div className="col-span-2 border-2 flex flex-col items-center py-4">
            <div className="h-20 w-20 overflow-hidden bg-primary flex justify-center items-center rounded-full mb-2">
              {session?.user?.image ? (
                <img src={session.user.image} className="h-full w-full object-cover" alt="" />
              ) : (
                <User className="h-10 w-10 text-white" />
              )}
            </div>
            <h3 className="text-center font-semibold capitalize text-sm mb-4">ADMIN</h3>
            <ul className="w-full">
              {navLinks.map(({ label, href, icon: Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`flex items-center gap-2 py-2 pl-3 text-sm block cursor-pointer hover:bg-gray-800 hover:text-white transition-colors ${
                      pathname === href ? "bg-primary text-white" : ""
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5 flex-shrink-0" />
                    <span className="truncate">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Content */}
          <div className="col-span-10 border-2 border-l-0 min-h-[600px]">
            {children}
          </div>
        </div>
      </section>
    </>
  );
}
