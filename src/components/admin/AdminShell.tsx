"use client";

import { useState } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// 1. FIXED: Define 'cn' locally to stop the module error immediately
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ... imports

export function AdminShell({ children, activeTab, setActiveTab }: any) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    // FIX: Changed bg-black text-white -> bg-background text-foreground
    <div className="min-h-screen bg-background text-foreground flex overflow-hidden transition-colors duration-300">
      
      <AdminSidebar 
        isCollapsed={isCollapsed} 
        toggleCollapse={() => setIsCollapsed(!isCollapsed)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div 
        className={cn(
          // FIX: Ensure main content uses bg-background
          "flex-1 transition-all duration-300 ease-in-out flex flex-col min-w-0 bg-background",
          isCollapsed ? "ml-20" : "ml-72" 
        )}
      >
        <main className="flex-1 p-8 pt-24 overflow-y-auto max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
      
    </div>
  );
}