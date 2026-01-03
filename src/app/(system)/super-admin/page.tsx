// "use client";

// import { Button } from "@/components/ui/Button";
// import { AlertTriangle, Lock, Users, Activity, Trash2 } from "lucide-react";

// // Mock Role for testing (Change to 'admin' to see Access Denied)
// const USER_ROLE = "super_admin"; 

// export default function SuperAdminPage() {
//   if (USER_ROLE !== 'super_admin') {
//     return (
//       <div className="h-screen flex flex-col items-center justify-center bg-black text-red-600 font-mono gap-4">
//         <Lock className="w-16 h-16 animate-pulse" />
//         <h1 className="text-2xl tracking-widest">ACCESS_VIOLATION // LEVEL_5_REQUIRED</h1>
//         <p className="text-sm text-red-900">Your IP has been logged.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen pt-24 px-6 max-w-7xl mx-auto bg-black text-white selection:bg-red-900">
      
//       {/* Dangerous Header */}
//       <div className="border-b border-red-900/30 pb-8 mb-12 flex items-end justify-between">
//         <div>
//           <div className="flex items-center gap-3 mb-2">
//             <AlertTriangle className="text-red-500" />
//             <span className="text-xs font-mono text-red-500 tracking-[0.3em]">GOD_MODE_ENABLED</span>
//           </div>
//           <h1 className="text-4xl font-bold font-mono text-white">OVERSEER_PANEL</h1>
//         </div>
        
//         <div className="flex gap-3">
//           <Button variant="outline" className="border-red-900 text-red-400 hover:bg-red-950">
//             Audit Logs
//           </Button>
//           <Button className="bg-red-600 hover:bg-red-700 text-white border-none shadow-[0_0_20px_rgba(220,38,38,0.5)]">
//             Emergency Lockdown
//           </Button>
//         </div>
//       </div>

//       {/* The Controls */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
//         {/* User Management */}
//         <div className="p-6 rounded-lg border border-white/10 bg-white/5 hover:border-red-500/50 transition-colors group">
//           <div className="flex items-center justify-between mb-6">
//             <h3 className="font-mono text-gray-400">USER_DB</h3>
//             <Users className="text-gray-600 group-hover:text-red-500 transition-colors" />
//           </div>
//           <div className="space-y-3">
//              <div className="flex justify-between text-sm">
//                <span>Total Registered</span>
//                <span className="font-mono">15,420</span>
//              </div>
//              <div className="flex justify-between text-sm">
//                <span>Banned Users</span>
//                <span className="font-mono text-red-400">23</span>
//              </div>
//              <Button variant="ghost" size="sm" className="w-full mt-4 text-xs border border-white/10">
//                Manage Permissions
//              </Button>
//           </div>
//         </div>

//         {/* System Health */}
//         <div className="p-6 rounded-lg border border-white/10 bg-white/5 hover:border-red-500/50 transition-colors group">
//           <div className="flex items-center justify-between mb-6">
//             <h3 className="font-mono text-gray-400">INFRASTRUCTURE</h3>
//             <Activity className="text-gray-600 group-hover:text-red-500 transition-colors" />
//           </div>
//           <div className="space-y-4">
//              <div className="w-full bg-gray-900 h-2 rounded-full overflow-hidden">
//                <div className="bg-red-500 w-[12%] h-full shadow-[0_0_10px_red]" />
//              </div>
//              <p className="text-xs text-gray-500 font-mono">CPU_LOAD: 12% // STABLE</p>
             
//              <div className="w-full bg-gray-900 h-2 rounded-full overflow-hidden">
//                <div className="bg-blue-500 w-[45%] h-full" />
//              </div>
//              <p className="text-xs text-gray-500 font-mono">MEMORY: 45% // OPTIMAL</p>
//           </div>
//         </div>

//         {/* Dangerous Actions */}
//         <div className="p-6 rounded-lg border border-red-900/30 bg-red-950/10 hover:bg-red-950/20 transition-colors">
//           <div className="flex items-center justify-between mb-6">
//             <h3 className="font-mono text-red-500">DANGER_ZONE</h3>
//             <Trash2 className="text-red-500" />
//           </div>
//           <p className="text-xs text-red-400/70 mb-6 leading-relaxed">
//             Actions here are irreversible. Requires 2FA verification.
//           </p>
//           <div className="space-y-3">
//             <Button className="w-full bg-transparent border border-red-800 text-red-500 hover:bg-red-900 hover:text-white text-xs h-8">
//               Flush Redis Cache
//             </Button>
//             <Button className="w-full bg-transparent border border-red-800 text-red-500 hover:bg-red-900 hover:text-white text-xs h-8">
//               Reset Product Database
//             </Button>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }