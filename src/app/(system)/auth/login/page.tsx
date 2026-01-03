"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";
import { Fingerprint, ShieldAlert, KeyRound, User } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function LoginPage() {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Added password state
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 1. Particle Animation Effect (The "3D" Feel)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: any[] = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speedY: Math.random() * 2 + 0.5
      });
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"; // Trails
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#00ff41";

      particles.forEach((p) => {
        p.y += p.speedY;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(animate);
    }
    animate();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // 2. HARDCODED CREDENTIAL CHECK
    if (email === "adminblog" && password === "sumukha123") {
      toast.success("IDENTITY_CONFIRMED", {
        description: "Welcome back, Commander.",
        icon: <Fingerprint className="w-4 h-4 text-hacker-green" />,
        style: { borderColor: '#00ff41' }
      });
      login("adminblog"); // Triggers Admin Role in AuthContext
    } 
    else if (email === "super@bodybio.com") {
      toast.success("OVERRIDE_ACCEPTED", {
        description: "Super Admin Clearance Granted.",
        icon: <ShieldAlert className="w-4 h-4 text-red-500" />,
        style: { borderColor: '#ef4444' }
      });
      login("super@bodybio.com"); // Triggers Super Admin Role
    } 
    else {
      toast.error("ACCESS_DENIED", { 
        description: "Invalid Credentials. Incident Logged.",
        style: { borderColor: '#ef4444' }
      });
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-black">
      {/* Background Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-20" />

      <div className="relative z-10 w-full max-w-md p-4">
        {/* Animated Border Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-hacker-green to-transparent opacity-50 blur-lg animate-pulse" />
        
        <div className="bg-black/80 border border-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl relative overflow-hidden">
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold font-mono tracking-tighter text-white">
              ACCESS_<span className="text-hacker-green">PORTAL</span>
            </h1>
            <p className="text-gray-500 text-sm mt-2">Enter credentials to decrypt session.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Username/Email Field */}
            <div className="group">
              <label className="flex items-center gap-2 text-xs font-mono text-hacker-green mb-2 group-focus-within:text-white transition-colors">
                <User className="w-3 h-3" /> USER_IDENTITY
              </label>
              <input 
                type="text" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="adminblog"
                className="w-full bg-white/5 border border-white/20 rounded p-4 text-white focus:outline-none focus:border-hacker-green transition-all font-mono"
                required
              />
            </div>

            {/* Password Field */}
            <div className="group">
              <label className="flex items-center gap-2 text-xs font-mono text-hacker-green mb-2 group-focus-within:text-white transition-colors">
                <KeyRound className="w-3 h-3" /> SECURITY_KEY
              </label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••"
                className="w-full bg-white/5 border border-white/20 rounded p-4 text-white focus:outline-none focus:border-hacker-green transition-all font-mono"
                required
              />
            </div>

            <Button 
              disabled={isLoading}
              className="w-full h-12 bg-hacker-green text-black font-bold hover:bg-white hover:scale-[1.02] transition-all"
            >
              {isLoading ? "DECRYPTING..." : "INITIALIZE_SESSION"}
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-gray-600 font-mono">
            <p>Don't have clearance? <Link href="/auth/register" className="text-white hover:underline">Request Access</Link></p>
          </div>

          {/* Updated Cheat Sheet */}
          <div className="mt-8 p-4 bg-white/5 rounded border border-white/5 text-[10px] text-gray-500 font-mono">
            <p className="font-bold text-gray-300 mb-2">DEV_CHEAT_SHEET:</p>
            <p>1. User: <span className="text-hacker-green">adminblog</span> | Pass: <span className="text-hacker-green">sumukha123</span></p>
            <p>2. Super: <span className="text-red-500">super@bodybio.com</span> (No pass required for dev)</p>
          </div>
        </div>
      </div>
    </div>
  );
}