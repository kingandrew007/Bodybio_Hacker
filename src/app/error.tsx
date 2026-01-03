"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to your analytics service (e.g., Sentry)
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black text-red-500 font-mono flex flex-col items-center justify-center p-6 text-center">
      
      <div className="p-8 border border-red-900/50 bg-red-950/10 rounded-xl backdrop-blur-sm max-w-md w-full relative overflow-hidden">
        {/* Red Pulse Background */}
        <div className="absolute inset-0 bg-red-500/5 animate-pulse" />
        
        <AlertTriangle className="w-16 h-16 mx-auto mb-6 text-red-500" />
        
        <h2 className="text-2xl font-bold mb-2 tracking-widest">CRITICAL_FAILURE</h2>
        <p className="text-sm text-red-400/70 mb-8">
          The system encountered an unrecoverable exception. <br />
          Error Digest: <span className="text-white bg-red-900/50 px-2 py-0.5 rounded select-all">{error.digest || "UNKNOWN_ERROR"}</span>
        </p>

        <div className="space-y-4">
          <Button 
            onClick={reset}
            className="w-full bg-red-600 hover:bg-red-500 text-white border-none shadow-[0_0_20px_rgba(220,38,38,0.4)]"
          >
            <RefreshCw className="mr-2 w-4 h-4" /> REBOOT_SYSTEM
          </Button>
          
          <div className="text-xs text-red-900/50">
            If this persists, contact super_admin.
          </div>
        </div>
      </div>
    </div>
  );
}