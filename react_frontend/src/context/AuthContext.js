import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { api } from "../api/client";

const AuthContext = createContext(null);

function readStoredAuth() {
  try {
    const token = localStorage.getItem("sms_access_token");
    const role = localStorage.getItem("sms_role");
    return { token, role };
  } catch {
    return { token: null, role: null };
  }
}

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  /** Provides auth state (token + role) and actions. */
  const stored = readStoredAuth();
  const [token, setToken] = useState(stored.token);
  const [role, setRole] = useState(stored.role);
  const [user, setUser] = useState(null);

  const isAuthenticated = !!token;

  const persist = useCallback((newToken, newRole) => {
    try {
      if (newToken) localStorage.setItem("sms_access_token", newToken);
      else localStorage.removeItem("sms_access_token");
      if (newRole) localStorage.setItem("sms_role", newRole);
      else localStorage.removeItem("sms_role");
    } catch {
      // ignore storage issues
    }
  }, []);

  // PUBLIC_INTERFACE
  const logout = useCallback(() => {
    setToken(null);
    setRole(null);
    setUser(null);
    persist(null, null);
  }, [persist]);

  // PUBLIC_INTERFACE
  const login = useCallback(
    async ({ email, password }) => {
      // NOTE: Backend OpenAPI currently does not include auth endpoints.
      // This will work once /auth/login exists and returns {access_token, role, user}.
      const res = await api.login({ email, password });
      const newToken = res?.access_token || res?.token || null;
      const newRole = res?.role || res?.user?.role || "admin";
      setToken(newToken);
      setRole(newRole);
      setUser(res?.user || null);
      persist(newToken, newRole);
      return res;
    },
    [persist]
  );

  const value = useMemo(
    () => ({
      token,
      role,
      user,
      isAuthenticated,
      login,
      logout
    }),
    [token, role, user, isAuthenticated, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// PUBLIC_INTERFACE
export function useAuth() {
  /** Hook to access auth context. */
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}

// PUBLIC_INTERFACE
export function hasAnyRole(currentRole, allowedRoles) {
  /** Returns true if currentRole is in allowedRoles. */
  if (!allowedRoles || allowedRoles.length === 0) return true;
  if (!currentRole) return false;
  return allowedRoles.includes(currentRole);
}
