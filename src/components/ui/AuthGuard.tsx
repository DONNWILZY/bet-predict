//src\components\ui\AuthGuard.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UnauthorizedModal } from "./UnauthorizedModal";
import { requireAuth, requireRole, Role } from "@/lib/auth-helpers";

interface AuthGuardProps {
  allowedRoles: Role[];
  children: React.ReactNode;
}

/**
 * 🔒 AuthGuard:
 * - Redirects if not logged in
 * - Shows UnauthorizedModal if logged in but role not allowed
 * - Renders children only when authorized
 */
export const AuthGuard: React.FC<AuthGuardProps> = ({ allowedRoles, children }) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      // Step 1: Authentication
      const authResult = requireAuth();
      if (authResult.redirect) {
        router.replace(authResult.redirect);
        return;
      }

      // Step 2: Role Authorization
      const roleResult = requireRole(allowedRoles);
      if (roleResult.unauthorized) {
        setShowModal(true);
        setIsAuthorized(false);
      } else {
        setIsAuthorized(true);
      }

      setIsLoading(false);
    };

    checkAuth();
  }, [allowedRoles, router]);

  // Loader while checking auth
  if (isLoading) {
    return <div className="text-white text-center py-10">Loading authorization...</div>;
  }

  // Unauthorized → show page + modal overlay
  if (showModal) {
    return (
      <>
        {children}
        <UnauthorizedModal isOpen={showModal} onClose={() => setShowModal(false)} />
      </>
    );
  }

  // Authorized → render protected content
  if (isAuthorized) {
    return <>{children}</>;
  }

  return null; // Fallback
};
