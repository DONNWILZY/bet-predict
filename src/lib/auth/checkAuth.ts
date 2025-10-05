// src/lib/auth/checkAuth.ts
import { getUser } from "./storage";

export interface AuthResult {
  isAuthenticated: boolean;
  user: any | null;
  redirect?: string;     // for full-page redirect
  unauthorized?: boolean; // for unauthorized pages
}

/**
 * ✅ Check if user is logged in.
 */
export function requireAuth(redirectTo: string = "/login"): AuthResult {
  const user = getUser();
  if (!user) {
    return { isAuthenticated: false, user: null, redirect: redirectTo };
  }
  return { isAuthenticated: true, user };
}

/**
 * ✅ Check if user has allowed role(s).
 */
export function requireRole(allowedRoles: string[]): AuthResult {
  const user = getUser();

  if (!user) {
    return { isAuthenticated: false, user: null, redirect: "/login" };
  }

  if (!allowedRoles.includes(user.role)) {
    return { isAuthenticated: true, user, unauthorized: true };
  }

  return { isAuthenticated: true, user };
}











