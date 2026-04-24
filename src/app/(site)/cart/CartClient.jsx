"use client";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import PageTitle from "@/app/components/PageTitle";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";

export default function CartClient() {
  const { cart, handleDeleteCartItem } = useCart();
  const { language } = useLanguage();
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <section className="container">
      <PageTitle title={["কার্ট ডিটেইলস", "Cart Details", "تفاصيل العربة"]} />

      {cart.length > 0 ? (
        <>
          <div className="grid grid-cols-1 border border-primary border-b-0 mt-10">
            {cart.map((item) => (
              <div key={item._id} className="border-b border-primary flex items-center gap-4 p-4">
                <img src={item.thumb} alt={item.title?.[1]} className="w-16 h-20 object-cover" />
                <div className="flex-1">
                  <p className="font-medium">{item.title?.[language]}</p>
                  <p className="text-sm text-gray-500">Price: {item.price} TK</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  <p className="text-sm font-semibold text-primary">
                    Subtotal: {item.price * item.quantity} TK
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteCartItem(item._id)}
                  className="text-red hover:opacity-70"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>

          <div className="my-5 md:w-6/12 ml-auto">
            <div className="flex justify-between my-2">
              <p>Total Price</p>
              <p className="font-semibold">{totalPrice} TK</p>
            </div>
            <div className="flex justify-end mt-4">
              <Link
                href="/confirm-order"
                className="py-2 px-8 bg-primary text-white hover:bg-green-700 transition-colors"
              >
                Checkout
              </Link>
            </div>
          </div>
        </>
      ) : (
        <div className="flex justify-center mt-20">
          <div className="text-center">
            <h3 className="text-xl font-bold">Your cart is empty</h3>
            <Link href="/books" className="mt-4 inline-block text-primary hover:underline">
              Browse Books
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
