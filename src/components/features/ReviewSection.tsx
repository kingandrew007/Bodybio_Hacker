"use client";

// import { useAuth } from "@/lib/auth-context"; // Disabled for Lockdown
import { Button } from "@/components/ui/Button";
// import { StarInput } from "@/components/ui/StarInput";
// import { submitReview } from "@/app/actions/review-actions";
// import { toast } from "sonner";
import { Lock, PenTool, Archive } from "lucide-react";
// import Link from "next/link";
// import { useState } from "react";

export function ReviewSection({ productId }: { productId: string }) {
  // LOCKDOWN: Force user to null so the form never shows
  const user = null; 

  return (
    <div className="mt-16 border-t border-white/10 pt-10">
      <h3 className="text-2xl font-bold font-mono mb-6 flex items-center gap-2">
        <PenTool className="text-hacker-green" /> USER_ANALYSIS_LOGS
      </h3>

      {/* 1. LOCKDOWN LOGIC: Always show the Locked View */}
      <div className="bg-black/50 border border-white/10 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-center">
          
          <div className="p-4 rounded-full bg-white/5 mb-4 relative group">
            <Lock className="w-8 h-8 text-gray-500 group-hover:text-red-500 transition-colors" />
            <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <h4 className="text-lg font-bold text-white mb-2">Database Locked</h4>
          
          <p className="text-gray-500 text-sm mb-6 max-w-sm leading-relaxed">
            Public write access is currently suspended.<br />
            The system is in <strong>READ_ONLY</strong> mode for maintenance protocols.
          </p>
          
          {/* Status Badge */}
          <div className="flex items-center gap-2 text-xs font-mono text-hacker-green bg-hacker-green/10 px-4 py-2 rounded border border-hacker-green/20">
            <Archive className="w-3 h-3" />
            STATUS: ARCHIVE_MODE
          </div>

          {/* HIDDEN: The Login Button is removed entirely
          <Link href="/auth/login">
            <Button variant="outline">Initialize Session</Button>
          </Link> 
          */}
      </div>
    </div>
  );
}