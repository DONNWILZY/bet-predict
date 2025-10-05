"use client";

import Link from "next/link";
import { useRouter } from "next/navigation"; // 1. Import useRouter
import { ArrowLeft } from "lucide-react"; // Optional: Add an icon

export default function UnauthorizedPage() {
  const router = useRouter(); // 2. Initialize the router

  // The primary color is purple-800 (#581c87)
  const primaryColor = "bg-purple-800 hover:bg-purple-900";
  const secondaryColor = "border border-purple-800 text-purple-800 hover:bg-purple-50";

  return (
    // Background is white/light gray as requested
    <main className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      
      {/* Container for the content, using a subtle shadow/border for visual separation */}
      <div className="p-8 max-w-lg w-full bg-white shadow-xl rounded-lg text-center">
        
        {/* Title now uses the requested purple color */}
        <h1 className="text-4xl font-extrabold text-purple-800 mb-4">
          🚫 Access Denied
        </h1>
        
        <p className="text-gray-600 text-center mb-8">
          You don’t have permission to access this page or perform this action.
          Please ensure you are logged into an account with the necessary privileges.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          
          {/* 3. The new "Go Back" button using the primary color */}
          <button
            onClick={() => router.back()} // Use router.back() for history redirect
            className={`flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white rounded-lg transition ${primaryColor} focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50`}
          >
            <ArrowLeft size={20} />
            Go Back
          </button>

          {/* Existing "Go Home" button, styled with secondary/outline look */}
          <Link
            href="/"
            className={`flex items-center justify-center px-6 py-3 font-semibold rounded-lg transition ${secondaryColor}`}
          >
            Go Home
          </Link>
          
          {/* Optional: Removed "Login Again" as "Go Home" usually covers this, 
             but you can re-add it using the secondary color style if needed.
             Example re-add:
             <Link href="/login" className={`... ${secondaryColor}`}>Login</Link>
          */}
        </div>
      </div>
    </main>
  );
}