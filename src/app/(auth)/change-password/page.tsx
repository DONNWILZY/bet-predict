"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/app/(home)/navbar";

export default function ChangePasswordPage() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to your change password API
    setMessage("Password changed successfully!");
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
        <form onSubmit={handleChange} className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-sm flex flex-col gap-4">
          <h2 className="text-2xl font-bold mb-2 text-center">Change Password</h2>
          <input
            className="p-2 rounded bg-gray-800 text-white"
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={e => setOldPassword(e.target.value)}
            required
          />
          <input
            className="p-2 rounded bg-gray-800 text-white"
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            required
          />
          <Button type="submit" className="w-full">Change Password</Button>
          {message && <div className="text-green-400 text-center">{message}</div>}
        </form>
      </main>
    </>
  );
}