"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

type CompareContextType = {
  items: string[]; // Stores Product Slugs
  addToCompare: (slug: string) => void;
  removeFromCompare: (slug: string) => void;
  clearCompare: () => void;
};

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<string[]>([]);

  // Load from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("compare_list");
    if (saved) setItems(JSON.parse(saved));
  }, []);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem("compare_list", JSON.stringify(items));
  }, [items]);

  const addToCompare = (slug: string) => {
    if (items.includes(slug)) {
      toast.info("ALREADY_QUEUED", { description: "Item is already in comparison tray." });
      return;
    }
    
    // 👇 UPDATED LIMIT TO 5 ITEMS
    if (items.length >= 5) {
      toast.warning("BUFFER_OVERFLOW", { description: "Max 5 items allowed in comparison." });
      return;
    }
    
    setItems((prev) => [...prev, slug]);
    toast.success("SAMPLE_ACQUIRED", { description: "Added to comparison tray." });
  };

  const removeFromCompare = (slug: string) => {
    setItems((prev) => prev.filter((i) => i !== slug));
  };

  const clearCompare = () => setItems([]);

  return (
    <CompareContext.Provider value={{ items, addToCompare, removeFromCompare, clearCompare }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) throw new Error("useCompare must be used within CompareProvider");
  return context;
}