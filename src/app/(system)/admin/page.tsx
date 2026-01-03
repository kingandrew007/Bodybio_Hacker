"use client";

import { useState } from "react";
import AdminGuard from "@/components/admin/AdminGuard";
import { AdminShell } from "@/components/admin/AdminShell"; // The new layout
import { ProductUploader } from "@/components/admin/ProductUploader";
import { ProductManager } from "@/components/admin/ProductManager";

export default function AdminDashboard() {
  // Local state for tabs is passed down to the shell
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <AdminGuard>
      <AdminShell activeTab={activeTab} setActiveTab={setActiveTab}>
        
        {/* DASHBOARD TAB */}
        {activeTab === "dashboard" && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <h2 className="text-4xl font-bold font-mono text-white mb-8">SYSTEM_OVERVIEW</h2>
            {/* ... Add your StatCards here as before ... */}
            <div className="p-10 border border-dashed border-white/20 rounded-xl text-center">
              <p className="text-gray-500 font-mono">LIVE_DATA_FEED_ACTIVE</p>
            </div>
          </div>
        )}

        {/* ADD PRODUCT TAB */}
        {activeTab === "add" && (
          <div className="animate-in slide-in-from-right-10 duration-500">
            <ProductUploader />
          </div>
        )}

        {/* INVENTORY TAB */}
        {activeTab === "manage" && (
          <div className="animate-in slide-in-from-bottom-10 duration-500">
            <ProductManager />
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === "settings" && (
          <div className="text-red-500 font-mono text-xl animate-pulse">
            RESTRICTED AREA // CONFIGURATION LOCKED
          </div>
        )}

      </AdminShell>
    </AdminGuard>
  );
}