import type { Metadata } from "next";
import { Mail, ShieldAlert, Terminal } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Contact Protocol | BodyBio Hacker",
  description: "Secure communication channels.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-gray-300 font-mono pt-32 pb-20 px-6">
      <div className="max-w-2xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="border-b border-hacker-green/20 pb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tighter">
            CONTACT_PROTOCOL<span className="text-hacker-green">.exe</span>
          </h1>
          <p className="text-sm text-hacker-green/80 uppercase tracking-widest">
            Status: Encrypted // Channels_Open
          </p>
        </div>

        {/* Secure Form (Simulated/Offline) */}
        <div className="p-8 bg-white/5 border border-white/10 rounded-xl relative overflow-hidden">
             
             {/* "Offline" Overlay */}
             <div className="absolute top-4 right-4 flex items-center gap-2 text-xs text-red-500 font-bold uppercase border border-red-500/50 px-2 py-1 rounded bg-red-500/10">
                <ShieldAlert className="w-3 h-3" /> Secure Form Offline
             </div>

             <div className="space-y-6 opacity-50 pointer-events-none grayscale">
                <div>
                    <label className="block text-xs uppercase mb-2">Codename</label>
                    <input type="text" className="w-full bg-black border border-white/20 p-2 rounded" placeholder="Enter alias..." />
                </div>
                <div>
                    <label className="block text-xs uppercase mb-2">Message Payload</label>
                    <textarea className="w-full bg-black border border-white/20 p-2 rounded h-32" placeholder="Encryption key required..." />
                </div>
                <Button className="w-full">TRANSMIT</Button>
             </div>

             <div className="mt-8 pt-8 border-t border-white/10 text-center">
                <p className="text-white mb-4">Direct Uplink Available via Email Protocol</p>
                <a href="mailto:bodybiohacker@protonmail.com">
                    <Button variant="hacker" className="w-full md:w-auto">
                        <Mail className="w-4 h-4 mr-2" /> SEND EMAIL (bodybiohacker@protonmail.com)
                    </Button>
                </a>
             </div>

        </div>

        {/* Terminal Info */}
        <div className="bg-black border border-hacker-green/30 p-4 rounded font-mono text-xs text-hacker-green/80">
            <div className="flex items-center gap-2 mb-2 text-hacker-green">
                <Terminal className="w-4 h-4" /> SYSTEM_MESSAGE
            </div>
            <p> Detecting high latency on secure channels.</p>
            <p> Form submission disabled for security audit.</p>
            <p> Use direct email uplink for critical intelligence.</p>
        </div>

      </div>
    </div>
  );
}
