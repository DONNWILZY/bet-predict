import { getUser } from "./authMiddleware";
export type Role = "USER" | "ADMIN" | "SUPERADMIN";

export interface AuthResult {
  isAuthenticated: boolean;
  user: any | null;
  // Full-page redirect (e.g., not logged in → /login)
  redirect?: string;
  // Indicates logged in but unauthorized for this resource
  unauthorized?: boolean;
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
 * ✅ Check if user has the right role.
 */
export function requireRole(allowedRoles: Role[]): AuthResult {
  const user = getUser();

  if (!user) {
    // Not logged in → redirect to login
    return { isAuthenticated: false, user: null, redirect: "/login" };
  }

  if (!allowedRoles.includes(user.role)) {
    // Logged in but wrong role
    return { isAuthenticated: true, user, unauthorized: true };
  }

  return { isAuthenticated: true, user };
}
