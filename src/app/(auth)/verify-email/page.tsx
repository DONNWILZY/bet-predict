"use client";
import { useState } from "react";
import { Navbar } from "@/app/(home)/navbar";

export default function VerifyEmailPage() {
  const [message, setMessage] = useState("Please check your email for a confirmation link.");

  // TODO: Handle token from query params and verify via API

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
        <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-sm flex flex-col gap-4 text-center">
          <h2 className="text-2xl font-bold mb-2">Verify Your Email</h2>
          <p>{message}</p>
        </div>
      </main>
    </>
  );
}