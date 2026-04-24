"use client";
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/context/CartContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { Toaster } from "sonner";

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <LanguageProvider>
        <CartProvider>
          {children}
          <Toaster position="top-right" richColors />
        </CartProvider>
      </LanguageProvider>
    </SessionProvider>
  );
}
