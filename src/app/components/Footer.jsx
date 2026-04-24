import Link from "next/link";
import { Truck, RefreshCw, MessageSquare, Gift } from "lucide-react";

export default function Footer() {
  const features = [
    { icon: Truck, title: "Free Shipping", desc: "on orders over 5000 TK" },
    { icon: RefreshCw, title: "Easy Returns", desc: "30 day return policy" },
    { icon: MessageSquare, title: "24/7 Support", desc: "Dedicated support" },
    { icon: Gift, title: "Gift Cards", desc: "Available year round" },
  ];

  return (
    <footer className="mt-12 bg-black pt-8 text-white">
      <div className="container">
        <div className="md:flex justify-between">
          <div className="md:w-3/12 xl:w-2/12 md:border-r border-gray-700">
            <div className="flex flex-wrap md:flex-col justify-between md:justify-start">
              {features.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="mb-8 flex items-center transition-transform duration-150 hover:translate-x-1">
                  <div className="bg-primary p-4">
                    <Icon className="text-white h-5 w-5" />
                  </div>
                  <div className="ml-2">
                    <p className="text-red uppercase text-sm font-semibold">{title}</p>
                    <p className="text-gray-400 text-xs">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:w-9/12 xl:w-10/12 md:pl-5">
            <div className="flex flex-wrap justify-between pb-8 border-b border-gray-700">
              <div className="mb-5">
                <p className="uppercase text-base text-white mb-2"><strong>Signup for news and offers</strong></p>
                <p className="text-gray-400 text-sm">Stay updated with our interesting and special offers</p>
              </div>
              <div>
                <form className="flex">
                  <input name="email" placeholder="Your email" className="form-input min-w-0 text-black md:w-64" />
                  <button type="submit" className="btn btn-danger ml-2">Submit</button>
                </form>
              </div>
            </div>

            <div className="flex flex-wrap justify-between mb-5">
              <div className="mt-8">
                <h6 className="text-base uppercase text-white mb-3">Browse</h6>
                <div className="text-gray-400 text-sm space-y-1">
                  <p><Link href="/books" className="hover:text-white">Books</Link></p>
                  <p><Link href="/categories" className="hover:text-white">Categories</Link></p>
                  <p><Link href="/writers" className="hover:text-white">Writers</Link></p>
                  <p><Link href="/publishers" className="hover:text-white">Publishers</Link></p>
                </div>
              </div>
              <div className="mt-8">
                <h6 className="text-base uppercase text-white mb-3">Information</h6>
                <div className="text-gray-400 text-sm space-y-1">
                  <p><Link href="/about" className="hover:text-white">About Us</Link></p>
                  <p><Link href="#" className="hover:text-white">Privacy Policy</Link></p>
                  <p><Link href="#" className="hover:text-white">Orders & Returns</Link></p>
                </div>
              </div>
              <div className="mt-8">
                <h6 className="text-base uppercase text-white mb-3">My Account</h6>
                <div className="text-gray-400 text-sm space-y-1">
                  <p><Link href="/auth/signin" className="hover:text-white">Sign In</Link></p>
                  <p><Link href="/cart" className="hover:text-white">View Cart</Link></p>
                  <p><Link href="/user" className="hover:text-white">My Orders</Link></p>
                </div>
              </div>
              <div className="mt-8">
                <h6 className="text-base uppercase text-white mb-3">Location</h6>
                <div className="text-gray-400 text-sm space-y-1">
                  <p>North brook hall road, Banglabazar, Dhaka</p>
                  <p>maktabatulamjad@gmail.com</p>
                  <p>+8801749-669155</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center md:justify-between items-center py-4 border-t border-gray-700">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Maktabatul Amzad. All rights reserved.
          </p>
          <div className="flex items-center gap-2 mt-2 md:mt-0">
            <img className="w-12 bg-white p-1" src="https://i.ibb.co/H7WTt0c/Mastercard-Logo.png" alt="Mastercard" />
            <img className="w-12 bg-white p-1" src="https://i.ibb.co/XXfWCh4/paypal-logo-png-1.png" alt="PayPal" />
            <img className="w-12 bg-white p-1" src="https://i.ibb.co/NKghvtF/Visa-Logo.png" alt="Visa" />
          </div>
        </div>
      </div>
    </footer>
  );
}
