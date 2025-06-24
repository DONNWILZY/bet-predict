"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/app/(home)/navbar";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to your login API
    setMessage("Logged in! (Demo)");
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
        <form onSubmit={handleLogin} className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-sm flex flex-col gap-4">
          <h2 className="text-2xl font-bold mb-2 text-center">Sign In</h2>
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
          <Button type="submit" className="w-full">Sign In</Button>
          <div className="flex justify-between text-sm mt-2">
            <Link href="/forgot-password" className="text-blue-400 hover:underline">Forgot password?</Link>
            <Link href="/signup" className="text-blue-400 hover:underline">Sign Up</Link>
          </div>
          {message && <div className="text-green-400 text-center">{message}</div>}
        </form>
      </main>
    </>
  );
}