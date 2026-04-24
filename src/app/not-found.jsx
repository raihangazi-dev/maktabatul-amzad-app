import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <BookOpen className="h-20 w-20 text-gray-300 mb-6" />
      <h1 className="text-6xl font-bold text-primary mb-2">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-3">Page Not Found</h2>
      <p className="text-gray-500 mb-8 max-w-md">The page you are looking for does not exist or has been moved.</p>
      <Link href="/" className="bg-primary text-white px-6 py-2.5 rounded hover:bg-green-700 transition-colors">
        Back to Home
      </Link>
    </div>
  );
}
