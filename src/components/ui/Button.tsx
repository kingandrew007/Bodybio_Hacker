import * as React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility for merging classes safely
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "hacker";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Base Styles (Cursor Pointer Enforced)
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-hacker-green disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none",
          
          // Variants
          variant === "default" && "bg-white text-black hover:bg-gray-200 shadow-sm",
          variant === "hacker" && "bg-hacker-green text-black font-mono tracking-tighter hover:bg-green-400 shadow-[0_0_15px_rgba(0,255,65,0.3)]",
          variant === "outline" && "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground border-white/20 hover:border-white/50 text-white",
          variant === "ghost" && "hover:bg-white/10 text-gray-300 hover:text-white",

          // Sizes
          size === "sm" && "h-8 px-3 text-xs",
          size === "md" && "h-10 px-8 py-2",
          size === "lg" && "h-12 px-8 text-md font-bold",
          
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";