"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface StoryQAProps {
  question: string;
  answer: string;
}

export function StoryQA({ question, answer }: StoryQAProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border/50 first:border-t py-2 hover:bg-hacker-green/5 transition-colors duration-300 px-4 -mx-4 rounded-lg group">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left py-4 focus:outline-none"
      >
        <span className={`text-lg md:text-xl font-bold font-mono transition-colors duration-300 ${isOpen ? 'text-hacker-green' : 'text-foreground group-hover:text-hacker-green'}`}>
          {question}
        </span>
        <div className={`relative flex-shrink-0 ml-4 w-8 h-8 flex items-center justify-center rounded-full border transition-all duration-300 ${isOpen ? 'bg-hacker-green text-black border-hacker-green' : 'border-border text-muted-foreground group-hover:border-hacker-green group-hover:text-hacker-green group-hover:scale-110'}`}>
          <Plus className={`w-5 h-5 absolute transition-transform duration-300 ${isOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`} />
          <Minus className={`w-5 h-5 absolute transition-transform duration-300 ${isOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`} />
        </div>
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed pl-1 border-l-2 border-hacker-green/30 ml-1">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
