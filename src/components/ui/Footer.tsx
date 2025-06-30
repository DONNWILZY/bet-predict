import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-gray-900 border-t border-gray-800 text-gray-300 py-6 mt-8">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="text-sm">
          &copy; {new Date().getFullYear()} Bet-Predict. All rights reserved.
        </div>
        <div className="flex gap-4 text-xs">
          <Link href="/about" className="hover:text-blue-400 transition-colors">About</Link>
          <Link href="/contact" className="hover:text-blue-400 transition-colors">Contact</Link>
          <Link href="/blog" className="hover:text-blue-400 transition-colors">Blog</Link>
        </div>
      </div>
    </footer>
  );
}