"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/core/ThemeToggle";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-border bg-background/80 backdrop-blur-xl transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="font-mono text-xl tracking-tighter group cursor-pointer text-foreground z-50">
          BODYBIO<span className="text-hacker-green group-hover:shadow-[0_0_10px_#00ff41] transition-all">_HACKER</span>
        </Link>

        {/* Desktop Links (Centered) */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink href="/" active={pathname === "/"}>Home</NavLink>
          <NavLink href="/about" active={pathname === "/about"}>About</NavLink>
          <NavLink href="/shop" active={pathname === "/shop"}>Shop</NavLink>
          <NavLink href="/blog" active={pathname.startsWith("/blog")}>Intel</NavLink>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4 z-50">
          <ThemeToggle />
          
          {/* New CTA: Go to Shop */}
          <Link href="/shop">
            <Button variant="hacker" size="sm" className="hidden sm:flex font-bold">
              Get Supplies
            </Button>
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

      </div>

      {/* Mobile Fullscreen Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-0 left-0 w-screen h-screen bg-background/95 backdrop-blur-3xl z-40 flex flex-col items-center justify-center space-y-8 md:hidden p-8 animate-in slide-in-from-top-10 duration-200">
           <div className="flex flex-col items-center gap-8 text-2xl font-mono">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className={pathname === "/" ? "text-hacker-green" : "text-foreground"}>HOME</Link>
              <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className={pathname === "/about" ? "text-hacker-green" : "text-foreground"}>ABOUT</Link>
              <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)} className={pathname === "/shop" ? "text-hacker-green" : "text-foreground"}>SHOP</Link>
              <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} className={pathname.startsWith("/blog") ? "text-hacker-green" : "text-foreground"}>INTEL</Link>
           </div>
           <div className="w-full h-px bg-border max-w-xs" />
           <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)} className="w-full max-w-xs">
              <Button variant="hacker" size="lg" className="w-full font-bold">ACCESS DATABASE</Button>
           </Link>
        </div>
      )}
    </nav>
  );
}

// Helper for consistent links with active state
function NavLink({ href, children, active }: { href: string, children: React.ReactNode, active?: boolean }) {
  return (
    <Link 
      href={href} 
      className={`text-sm font-medium transition-all hover:scale-105 ${
        active ? "text-hacker-green" : "text-gray-500 hover:text-foreground"
      }`}
    >
      {children}
    </Link>
  )
}