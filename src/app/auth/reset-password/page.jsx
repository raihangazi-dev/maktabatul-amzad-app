"use client";
import { useState } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import { toast } from "sonner";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.info("Password reset instructions sent to your email (feature coming soon)");
  };

  return (
    <div className="flex flex-col min-h-screen w-full justify-center items-center py-10">
      <div className="w-full max-w-sm px-4">
        <div className="text-center mb-6">
          <img src="https://i.ibb.co/0sPhz6P/logo.png" className="h-10 mx-auto mb-3" alt="Maktabatul Amzad" />
          <h2 className="text-2xl font-bold text-primary">Reset Password</h2>
          <p className="text-gray-500 text-sm mt-1">Enter your email to reset password</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="pl-10 pr-3 py-2 border w-full focus:outline-none focus:border-primary"
              />
            </div>
          </div>
          <button type="submit" className="w-full py-2 bg-primary text-white font-semibold hover:bg-green-700 transition-colors">
            Send Reset Link
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Remember your password?{" "}
          <Link href="/auth/signin" className="text-primary font-medium hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
