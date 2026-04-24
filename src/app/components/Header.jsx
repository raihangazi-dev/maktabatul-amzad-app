import { ShoppingCart, User, Phone, Mail, ChevronDown } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full">
      <div className="bg-black text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-2 text-sm font-medium md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-4 text-gray-100">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-300" />
              <span className="tracking-tight">(880) 1455474744484</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-300" />
              <span className="tracking-tight">amjad@gmail.com</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-gray-100">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4 text-white" />
              <span className="tracking-tight">Cart (0 item)</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="tracking-tight">Language</span>
              <ChevronDown className="h-3 w-3 text-gray-200" />
            </div>
            <div className="flex items-center gap-1">
              <User className="h-4 w-4 text-white" />
              <span className="tracking-tight">Account</span>
              <ChevronDown className="h-3 w-3 text-gray-200" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
