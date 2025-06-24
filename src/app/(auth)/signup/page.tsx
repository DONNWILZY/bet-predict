"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/app/(home)/navbar";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to your signup API
    setMessage("Check your email to verify your account.");
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
        <form onSubmit={handleSignup} className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-sm flex flex-col gap-4">
          <h2 className="text-2xl font-bold mb-2 text-center">Sign Up</h2>
          <input
            className="p-2 rounded bg-gray-800 text-white"
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            className="p-2 rounded bg-gray-800 text-white"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <Button type="submit" className="w-full">Sign Up</Button>
          <p className="text-sm text-center">
            Already have an account? <Link href="/login" className="text-blue-400 hover:underline">Sign In</Link>
          </p>
          {message && <div className="text-green-400 text-center">{message}</div>}
        </form>
      </main>
    </>
  );
}