"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ShieldAlert } from "lucide-react";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (!user || (user.role !== 'admin' && user.role !== 'super_admin')) {
        router.push("/auth/login");
      } else {
        setAuthorized(true);
      }
    }
  }, [user, isLoading, router]);

  if (isLoading || !authorized) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-hacker-green animate-pulse">
          <ShieldAlert className="w-12 h-12" />
          <span className="font-mono tracking-widest">VERIFYING_ENCRYPTION...</span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}