"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";
import PageTitle from "@/app/components/PageTitle";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

const districts = ["barisal","chittagong","dhaka","maymensingh","khulna","rajshahi","comilla","rangpur","sylhet"];

export default function ConfirmOrderClient() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const { language } = useLanguage();
  const { data: session } = useSession();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [selectedDistrict, setSelectedDistrict] = useState("dhaka");
  const [submitting, setSubmitting] = useState(false);

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryCharge = selectedDistrict === "dhaka" ? 60 : 120;

  const onSubmit = async (data) => {
    setSubmitting(true);
    const orderDetails = {
      name: data.name,
      mail: data.mail,
      fullAddress: { district: data.district, city: data.city, zip: data.zip, moreDetails: data.address },
      phone: data.phone,
      orders: cart.map((item) => ({ bookId: item._id, title: item.title, items: item.quantity, price: item.price })),
      deliveryCharge,
      status: "pending",
    };
    try {
      const res = await fetch("/api/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(orderDetails) });
      const result = await res.json();
      if (result.insertedId) {
        toast.success("Order placed successfully!");
        clearCart();
        router.push("/");
      }
    } catch {
      toast.error("Failed to place order");
    } finally {
      setSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <section className="container">
        <PageTitle title={["অর্ডার নিশ্চিত", "Confirm Order", "تأكيد الطلب"]} />
        <div className="flex justify-center mt-40">
          <div className="text-center">
            <h3 className="text-xl font-bold">No items in cart</h3>
            <Link href="/books" className="mt-4 inline-block text-primary hover:underline">Browse Books</Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container">
      <PageTitle title={["অর্ডার নিশ্চিত", "Confirm Order", "تأكيد الطلب"]} />
      <div className="md:flex justify-between my-5 gap-10">
        {/* Order Summary */}
        <div className="md:w-4/12">
          <p className="text-xl font-semibold mb-5">Order Summary</p>
          <div className="h-[350px] overflow-y-auto space-y-4">
            {cart.map((item) => (
              <div key={item._id} className="flex items-center gap-3">
                <Link href={`/books/${item._id}`}>
                  <img src={item.thumb} className="w-16 h-20 object-cover" alt="" />
                </Link>
                <div>
                  <p className="font-semibold text-sm">{item.title?.[language]}</p>
                  <p className="text-xs text-gray-500">Price: {item.price} TK</p>
                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  <p className="text-xs font-semibold">Total: {item.price * item.quantity} TK</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 space-y-2 border-t border-primary pt-3">
            <div className="flex justify-between"><p>Total Price</p><p>{totalPrice} TK</p></div>
            <div className="flex justify-between"><p>Delivery Charge</p><p>{deliveryCharge} TK</p></div>
            <div className="flex justify-between font-bold border-t border-primary pt-2"><p>Grand Total</p><p>{totalPrice + deliveryCharge} TK</p></div>
          </div>
        </div>

        {/* Billing Form */}
        <div className="mt-5 md:mt-0 md:w-7/12">
          <p className="text-xl font-semibold mb-5">Billing Address</p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Name</label>
              <input {...register("name", { required: true })} defaultValue={session?.user?.name} className="py-1 px-3 border w-full focus:outline-none focus:border-primary" />
              {errors.name && <p className="text-red text-sm">Name is required</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input {...register("mail", { required: true })} defaultValue={session?.user?.email} className="py-1 px-3 border w-full focus:outline-none focus:border-primary" />
                {errors.mail && <p className="text-red text-sm">Email is required</p>}
              </div>
              <div>
                <label className="block text-sm mb-1">Phone</label>
                <input {...register("phone", { required: true })} className="py-1 px-3 border w-full focus:outline-none focus:border-primary" />
                {errors.phone && <p className="text-red text-sm">Phone is required</p>}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm mb-1">District</label>
                <select {...register("district", { required: true })} onChange={(e) => setSelectedDistrict(e.target.value)} className="py-1 px-3 border w-full capitalize focus:outline-none focus:border-primary">
                  {districts.map((d) => <option key={d} value={d} className="capitalize">{d}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1">City</label>
                <input {...register("city", { required: true })} className="py-1 px-3 border w-full focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm mb-1">Zip</label>
                <input {...register("zip", { required: true })} className="py-1 px-3 border w-full focus:outline-none focus:border-primary" />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1">Address Details</label>
              <textarea {...register("address", { required: true })} className="py-1 px-3 border w-full h-28 focus:outline-none focus:border-primary" />
            </div>

            <button type="submit" disabled={submitting} className="py-2 px-8 bg-primary text-white disabled:opacity-60 hover:bg-green-700 transition-colors">
              {submitting ? "Placing Order..." : "Confirm Order"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
