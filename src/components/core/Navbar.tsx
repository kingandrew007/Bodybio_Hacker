"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/core/ThemeToggle";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-border bg-background/80 backdrop-blur-xl transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="font-mono text-xl tracking-tighter group cursor-pointer text-foreground">
          BODYBIO<span className="text-hacker-green group-hover:shadow-[0_0_10px_#00ff41] transition-all">_HACKER</span>
        </Link>

        {/* Links (Centered) */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink href="/" active={pathname === "/"}>Home</NavLink>
           <NavLink href="/about" active={pathname === "/about"}>About</NavLink>
          <NavLink href="/shop" active={pathname === "/shop"}>Shop</NavLink>
          <NavLink href="/blog" active={pathname.startsWith("/blog")}>Intel</NavLink>
        </div>

        {/* Right Side - LOCKDOWN MODE */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          {/* LOGIN HIDDEN FOR PUBLIC
          <Link href="/auth/login">
            <Button variant="default" size="sm">Login</Button>
          </Link> 
          */}

          {/* New CTA: Go to Shop */}
          <Link href="/shop">
            <Button variant="hacker" size="sm" className="hidden sm:flex font-bold">
              Get Supplies
            </Button>
          </Link>
        </div>
      </div>
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