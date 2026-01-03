"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Twitter, Instagram, Linkedin, ArrowRight, Activity } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 pt-20 pb-10 overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-hacker-green/50 to-transparent opacity-50" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          
          {/* Column 1: Brand */}
          <div className="space-y-6">
            <h2 className="text-2xl font-mono font-bold tracking-tighter text-white">
              BODYBIO<span className="text-hacker-green">_HACKER</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Deconstructing the supplement industry with raw data, lab testing, and zero nonsense.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={Twitter} />
              <SocialIcon icon={Instagram} />
              <SocialIcon icon={Linkedin} />
            </div>
          </div>

          {/* Column 2: Explore */}
          <div className="space-y-6">
            <h3 className="font-mono text-sm text-gray-500 uppercase tracking-widest">Database</h3>
            <ul className="space-y-4 text-sm font-medium text-gray-300">
              <FooterLink href="/reviews/omega-3">Omega 3 Analysis</FooterLink>
              <FooterLink href="/reviews/whey">Whey Protein</FooterLink>
              <FooterLink href="/reviews/creatine">Creatine Monohydrate</FooterLink>
              <FooterLink href="/explore">Full Index</FooterLink>
            </ul>
          </div>

          {/* Column 3: Company */}
         <div className="space-y-6">
  <h3 className="font-mono text-sm text-gray-500 uppercase tracking-widest">Intel</h3>
  <ul className="space-y-4 text-sm font-medium text-gray-300">
    <FooterLink href="/about">Manifesto</FooterLink>
    <FooterLink href="/methodology">Lab Methodology</FooterLink>
    {/* <FooterLink href="/careers">Join the Team</FooterLink> */} 
    {/* <FooterLink href="/contact">Encrypted Contact</FooterLink> */}
    <li className="text-gray-600 cursor-not-allowed">Encrypted Contact (Offline)</li>
  </ul>
</div>

          {/* Column 4: Newsletter (Premium Interaction) */}
          <div className="space-y-6">
             <h3 className="font-mono text-sm text-hacker-green uppercase tracking-widest">Join_Protocol</h3>
             <p className="text-xs text-gray-500">Get the latest lab results before they go public.</p>
             <div className="relative group">
               <input 
                 type="email" 
                 placeholder="Enter secure email" 
                 className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm text-white focus:outline-none focus:border-hacker-green transition-all"
               />
               <button className="absolute right-2 top-2 p-1.5 bg-hacker-green text-black rounded hover:scale-105 transition-transform">
                 <ArrowRight className="w-4 h-4" />
               </button>
             </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 font-mono">
          <p>© 2025 BodyBio Hacker Inc. All systems nominal.</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-hacker-green animate-pulse" />
            <span className="text-hacker-green">SYSTEM_ONLINE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ icon: Icon }: any) {
  return (
    <a href="#" className="p-2 rounded-full border border-white/10 hover:bg-white hover:text-black hover:scale-110 transition-all text-gray-400">
      <Icon className="w-4 h-4" />
    </a>
  );
}

function FooterLink({ href, children }: any) {
  return (
    <li>
      <Link href={href} className="hover:text-hacker-green hover:pl-2 transition-all flex items-center gap-2 group">
        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-hacker-green">{'>'}</span>
        {children}
      </Link>
    </li>
  );
}