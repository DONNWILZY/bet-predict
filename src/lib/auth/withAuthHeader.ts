// src/lib/auth/withAuthHeader.ts
import { getAccessToken } from "./storage";

/**
 * ✅ Fetch wrapper that automatically includes Bearer token when available.
 */
export async function fetchWithAuth(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = getAccessToken();
  const headers = new Headers(options.headers || {});

  if (token) headers.set("Authorization", `Bearer ${token}`);
  headers.set("Content-Type", "application/json");

  return fetch(url, { ...options, headers });
}

/**
 * ✅ Example: import and use anywhere
 * 
 * import { fetchWithAuth } from "@/lib/auth/withAuthHeader";
 * 
 * const res = await fetchWithAuth("/api/user/profile/123");
 * const data = await res.json();
 */
