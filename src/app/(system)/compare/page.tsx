"use client";

import { useCompare } from "@/lib/compare-context";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function CompareIndexPage() {
  const { items } = useCompare();
  const router = useRouter();

  useEffect(() => {
    if (items.length > 0) {
      // Build the slug string (comma joined)
      const slugString = items.join(",");
      router.replace(`/compare/${slugString}`);
    } else {
      // No items? Send back to shop or home
      router.replace("/");
    }
  }, [items, router]);

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4">
      <Loader2 className="w-8 h-8 animate-spin text-hacker-green" />
      <p className="font-mono text-muted-foreground">INITIALIZING_COMPARISON_MATRIX...</p>
    </div>
  );
}
