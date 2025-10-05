// src/app/admin/page.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { requireRole } from "@/lib/auth/checkAuth";

export default function AdminDashboard() {
  const router = useRouter();
  const auth = requireRole(["ADMIN", "SUPERADMIN"], {
    name: '',
    email: '',
  });

  useEffect(() => {
    if (!auth.isAuthenticated && auth.redirect) router.push(auth.redirect);
    if (auth.unauthorized) router.push("/unauthorized");
  }, [auth, router]);

  if (auth.unauthorized) return null;
  if (!auth.isAuthenticated) return null;

  return <div>
    
    Welcome, Admin {auth.user.name} <br />
     Welcome, Admin {auth.user.email}
  
  </div>;
}
