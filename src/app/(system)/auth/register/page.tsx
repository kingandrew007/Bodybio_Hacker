"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const { login, isLoading } = useAuth();
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  
  const [error, setError] = useState("");

  // Particle Animation (Reused for consistency)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles: any[] = [];
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speedY: Math.random() * 1.5 + 0.5
      });
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#3b82f6"; // Blue particles for Register (Different vibe)
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("PASSWORDS_DO_NOT_MATCH");
      return;
    }

    if (formData.password.length < 6) {
      setError("PASSWORD_TOO_WEAK (MIN 6 CHARS)");
      return;
    }

    // Mock Registration Logic
    // In real app: await registerUser(formData)
    login(formData.email); // Auto-login after register
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-black">
      <canvas ref={canvasRef} className="absolute inset-0 opacity-20" />

      <div className="relative z-10 w-full max-w-md p-4">
        <div className="bg-black/80 border border-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl relative overflow-hidden">
          
          {/* Blue accent for Register */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold font-mono tracking-tighter text-white">
              NEW_<span className="text-blue-500">INITIATE</span>
            </h1>
            <p className="text-gray-500 text-sm mt-2">Create your encrypted identity.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Name Field */}
            <div className="group">
              <label className="block text-xs font-mono text-blue-500 mb-1">CODENAME (NAME)</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-white/5 border border-white/20 rounded p-3 text-white focus:outline-none focus:border-blue-500 transition-all text-sm"
                placeholder="John Doe"
                required
              />
            </div>

            {/* Email Field */}
            <div className="group">
              <label className="block text-xs font-mono text-blue-500 mb-1">CONTACT_POINT (EMAIL)</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-white/5 border border-white/20 rounded p-3 text-white focus:outline-none focus:border-blue-500 transition-all text-sm"
                placeholder="john@example.com"
                required
              />
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="group">
                <label className="block text-xs font-mono text-blue-500 mb-1">SECRET_KEY</label>
                <input 
                  type="password" 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-white/5 border border-white/20 rounded p-3 text-white focus:outline-none focus:border-blue-500 transition-all text-sm"
                  placeholder="••••••"
                  required
                />
              </div>
              <div className="group">
                <label className="block text-xs font-mono text-blue-500 mb-1">VERIFY_KEY</label>
                <input 
                  type="password" 
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="w-full bg-white/5 border border-white/20 rounded p-3 text-white focus:outline-none focus:border-blue-500 transition-all text-sm"
                  placeholder="••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-xs font-mono bg-red-900/10 p-2 rounded border border-red-900/50 text-center animate-pulse">
                ERROR: {error}
              </div>
            )}

            <Button 
              disabled={isLoading}
              className="w-full h-12 bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all mt-4"
            >
              {isLoading ? "CREATING_ID..." : "REGISTER_IDENTITY"}
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-gray-600 font-mono">
            <p>Already have clearance? <Link href="/auth/login" className="text-white hover:underline">Access Portal</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}