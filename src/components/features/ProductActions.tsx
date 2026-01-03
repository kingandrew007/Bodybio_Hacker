"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import { AlertTriangle, Scale, ShoppingCart } from "lucide-react"; // Import ShoppingCart
import { useCompare } from "@/lib/compare-context";

// 👇 UPDATE PROPS: Add 'buyLink'
export function ProductActions({ purityScore, slug, buyLink }: { purityScore: number, slug: string, buyLink: string }) {
  
  const { addToCompare } = useCompare();

  useEffect(() => {
    if (purityScore < 5) {
      toast.error("CONTAMINANT DETECTED", {
        description: "Warning: High Mercury levels detected in this batch.",
        icon: <AlertTriangle className="w-4 h-4 text-red-500 animate-pulse" />,
        duration: 8000,
      });
    }
  }, [purityScore]);

  const handleCompare = () => {
    addToCompare(slug);
  };

  return (
    <div className="flex gap-4 pt-4">
      {/* 👇 FIX: Wrap Button in Anchor Tag with the Link */}
      <a 
        href={buyLink} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="flex-1"
      >
        <Button className="w-full bg-white text-black font-bold h-12 hover:bg-gray-200 transition-colors">
          <ShoppingCart className="w-4 h-4 mr-2" /> Check Price (Amazon)
        </Button>
      </a>
      
      {/* Compare Button (Unchanged) */}
      <Button 
        onClick={handleCompare}
        variant="outline"
        className="flex-1 border-border h-12 hover:bg-hacker-green/10 hover:border-hacker-green hover:text-hacker-green transition-all"
      >
        <Scale className="w-4 h-4 mr-2" /> Compare vs. Others
      </Button>
    </div>
  );
}