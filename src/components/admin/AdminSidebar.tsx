"use client";

import { 
  LayoutDashboard, 
  PlusCircle, 
  Package, 
  Settings, 
  LogOut, 
  ChevronLeft, 
  ChevronRight, 
  ShieldAlert
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";

// Helper for classes
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

interface SidebarProps {
  isCollapsed: boolean;
  toggleCollapse: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function AdminSidebar({ isCollapsed, toggleCollapse, activeTab, setActiveTab }: SidebarProps) {
  const { logout } = useAuth();

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 h-full z-50 border-r border-white/10 bg-black/90 backdrop-blur-xl transition-all duration-300 ease-in-out flex flex-col shadow-2xl",
        isCollapsed ? "w-20" : "w-72"
      )}
    >
      {/* 1. HEADER (Fixed Overlay Issue) */}
      <div className="h-24 flex items-center px-6 border-b border-white/10 relative overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        <div className={cn("flex items-center gap-4 transition-all duration-300", isCollapsed ? "opacity-0 -translate-x-10" : "opacity-100 translate-x-0")}>
           <ShieldAlert className="w-8 h-8 text-hacker-green shrink-0 drop-shadow-[0_0_8px_rgba(0,255,65,0.5)]" />
           <div className="whitespace-nowrap overflow-hidden">
             <h1 className="text-xl font-bold font-mono tracking-tighter text-white">ADMIN_CORE</h1>
             <p className="text-[10px] text-gray-500 font-mono">V2.4.0 // GOD_MODE</p>
           </div>
        </div>

        {/* Collapsed Icon Fallback */}
        <div className={cn("absolute inset-0 flex items-center justify-center transition-all duration-300", isCollapsed ? "opacity-100 delay-100" : "opacity-0 pointer-events-none")}>
            <ShieldAlert className="w-8 h-8 text-hacker-green animate-pulse" />
        </div>
      </div>

      {/* 2. NAVIGATION */}
      <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto overflow-x-hidden custom-scrollbar">
        <SidebarItem icon={LayoutDashboard} label="Overview" active={activeTab === "dashboard"} collapsed={isCollapsed} onClick={() => setActiveTab("dashboard")} />
        <SidebarItem icon={PlusCircle} label="Inject Product" active={activeTab === "add"} collapsed={isCollapsed} onClick={() => setActiveTab("add")} />
        <SidebarItem icon={Package} label="Inventory" active={activeTab === "manage"} collapsed={isCollapsed} onClick={() => setActiveTab("manage")} />
        <div className="my-4 border-t border-white/10" />
        <SidebarItem icon={Settings} label="System Config" active={activeTab === "settings"} collapsed={isCollapsed} onClick={() => setActiveTab("settings")} />
      </nav>

      {/* 3. FOOTER */}
      <div className="p-3 border-t border-white/10 bg-white/5 space-y-2 flex-shrink-0">
        <button onClick={logout} className={cn("flex items-center gap-3 px-3 py-3 w-full rounded hover:bg-red-900/20 text-red-400 transition-all group overflow-hidden", isCollapsed ? "justify-center" : "justify-start")}>
          <LogOut className="w-5 h-5 shrink-0 group-hover:scale-110 transition-transform" />
          <span className={cn("text-xs font-mono font-bold whitespace-nowrap transition-all duration-300", isCollapsed ? "opacity-0 w-0 hidden" : "opacity-100")}>TERMINATE</span>
        </button>

        <button onClick={toggleCollapse} className="w-full flex items-center justify-center py-2 text-gray-500 hover:text-white hover:bg-white/10 rounded transition-colors cursor-pointer">
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </aside>
  );
}

// Sidebar Item Helper
function SidebarItem({ icon: Icon, label, active, collapsed, onClick }: any) {
  return (
    <button onClick={onClick} className={cn("relative flex items-center w-full p-3 rounded-lg transition-all duration-200 group overflow-hidden", active ? "bg-hacker-green text-black font-bold shadow-[0_0_15px_#00ff41]" : "text-gray-400 hover:text-white hover:bg-white/5", collapsed ? "justify-center" : "justify-start gap-4")}>
      <Icon className={cn("w-5 h-5 shrink-0 transition-transform", active && "scale-110")} />
      <span className={cn("text-sm whitespace-nowrap transition-all duration-200", collapsed ? "opacity-0 w-0 absolute" : "opacity-100")}>{label}</span>
      {collapsed && <div className="absolute left-full ml-4 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none z-50 whitespace-nowrap border border-white/20">{label}</div>}
    </button>
  );
}