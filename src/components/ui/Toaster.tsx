"use client";

import { Toaster as Sonner } from "sonner";
import { useTheme } from "next-themes";

export function Toaster() {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-black group-[.toaster]:text-white group-[.toaster]:border-white/10 group-[.toaster]:shadow-2xl group-[.toaster]:font-mono group-[.toaster]:tracking-tight",
          description: "group-[.toast]:text-gray-500 group-[.toast]:text-xs",
          actionButton:
            "group-[.toast]:bg-hacker-green group-[.toast]:text-black group-[.toast]:font-bold",
          cancelButton:
            "group-[.toast]:bg-white/10 group-[.toast]:text-gray-300",
          success: 
            "group-[.toaster]:!border-l-4 group-[.toaster]:!border-l-hacker-green",
          error: 
            "group-[.toaster]:!border-l-4 group-[.toaster]:!border-l-red-500",
          warning: 
            "group-[.toaster]:!border-l-4 group-[.toaster]:!border-l-yellow-500",
          info: 
            "group-[.toaster]:!border-l-4 group-[.toaster]:!border-l-blue-500",
        },
      }}
    />
  );
}

type ToasterProps = React.ComponentProps<typeof Sonner>;