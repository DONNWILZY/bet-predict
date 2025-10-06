export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role?: string;
}

export const auth = {
  getUser(): AuthUser | null {
    if (typeof window === "undefined") return null;
    try {
      const userStr = localStorage.getItem("user");
      if (!userStr) return null;
      return JSON.parse(userStr);
    } catch (err) {
      console.error("Failed to parse user:", err);
      return null;
    }
  },

  isLoggedIn(): boolean {
    if (typeof window === "undefined") return false;
    const token = localStorage.getItem("token");
    return !!token;
  },

  logout(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/signin";
  },
};
