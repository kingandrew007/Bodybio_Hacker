"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type UserRole = "guest" | "user" | "admin" | "super_admin";

interface AuthContextType {
  user: { name: string; email: string; role: UserRole } | null;
  login: (email: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthContextType["user"]>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simulate checking session on load
    const storedUser = localStorage.getItem("bodybio_session");
    if (storedUser) setUser(JSON.parse(storedUser));
    setIsLoading(false);
  }, []);

  const login = (email: string) => {
    setIsLoading(true);
    
    // MOCK LOGIC: Determine role based on email pattern
    let role: UserRole = "user";
    if (email.includes("admin")) role = "admin";
    if (email.includes("super")) role = "super_admin";

    const mockUser = {
      name: email.split("@")[0].toUpperCase(),
      email,
      role,
    };

    // Simulate Network Delay for "Real Feel"
    setTimeout(() => {
      setUser(mockUser);
      localStorage.setItem("bodybio_session", JSON.stringify(mockUser));
      setIsLoading(false);
      
      // Redirect based on role
      if (role === "super_admin") router.push("/super-admin");
      else if (role === "admin") router.push("/admin");
      else router.push("/");
    }, 1500);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("bodybio_session");
    router.push("/auth/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};