"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

export default function SignInClient() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (res?.error) {
      toast.error("Invalid email or password");
    } else {
      toast.success("Signed in successfully");
      router.push("/");
    }
  };

  const handleGoogle = () => signIn("google", { callbackUrl: "/" });

  return (
    <div className="flex flex-col min-h-screen w-full justify-center items-center py-10">
      <div className="w-full max-w-sm px-4">
        <div className="text-center mb-6">
          <img src="https://i.ibb.co/0sPhz6P/logo.png" className="h-10 mx-auto mb-3" alt="Maktabatul Amzad" />
          <h2 className="text-2xl font-bold text-primary">Sign In</h2>
          <p className="text-gray-500 text-sm mt-1">Welcome back</p>
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

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type={showPwd ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="pl-10 pr-10 py-2 border w-full focus:outline-none focus:border-primary"
              />
              <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <Link href="/auth/reset-password" className="text-sm text-primary hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button type="submit" disabled={loading} className="w-full py-2 bg-primary text-white font-semibold hover:bg-green-700 transition-colors disabled:opacity-60">
            {loading ? "Signing in..." : "SIGN IN"}
          </button>
        </form>

        <div className="my-4 flex items-center gap-3">
          <hr className="flex-1 border-gray-300" />
          <span className="text-sm text-gray-400">or</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        <button onClick={handleGoogle} className="w-full py-2 border border-gray-300 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
          <img src="https://www.google.com/favicon.ico" className="h-4 w-4" alt="Google" />
          <span className="text-sm font-medium">Continue with Google</span>
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="text-primary font-medium hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
