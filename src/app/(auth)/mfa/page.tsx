"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/app/(home)/navbar";

export default function MFAPage() {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to your MFA/2FA verification API
    setMessage("2FA code verified!");
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
        <form onSubmit={handleVerify} className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-sm flex flex-col gap-4">
          <h2 className="text-2xl font-bold mb-2 text-center">2FA Verification</h2>
          <input
            className="p-2 rounded bg-gray-800 text-white"
            type="text"
            placeholder="Enter 2FA code"
            value={code}
            onChange={e => setCode(e.target.value)}
            required
          />
          <Button type="submit" className="w-full">Verify</Button>
          {message && <div className="text-green-400 text-center">{message}</div>}
        </form>
      </main>
    </>
  );
}