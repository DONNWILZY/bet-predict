"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/app/(home)/navbar";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to your reset password API (use token from URL)
    setMessage("Password reset successful!");
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
        <form onSubmit={handleReset} className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-sm flex flex-col gap-4">
          <h2 className="text-2xl font-bold mb-2 text-center">Reset Password</h2>
          <input
            className="p-2 rounded bg-gray-800 text-white"
            type="password"
            placeholder="New Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <Button type="submit" className="w-full">Reset Password</Button>
          {message && <div className="text-green-400 text-center">{message}</div>}
        </form>
      </main>
    </>
  );
}