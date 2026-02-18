"use client";

import { useState, useRef, useEffect } from "react";

interface JargonTermProps {
  term: string;
  definition: string;
}

export default function JargonTerm({ term, definition }: JargonTermProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <span ref={ref} className="relative inline">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="cursor-help border-b border-dotted border-text-tertiary text-text-primary transition-colors hover:border-forward-blue hover:text-forward-blue"
      >
        {term}
      </button>
      {isOpen && (
        <span
          role="tooltip"
          className="absolute bottom-full left-1/2 z-50 mb-2 w-64 -translate-x-1/2 rounded-lg border border-border bg-bg-card p-3 text-left font-sans text-sm leading-relaxed text-text-secondary shadow-lg"
        >
          <span className="mb-1 block font-semibold text-text-primary">
            {term}
          </span>
          {definition}
          <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-bg-card" />
        </span>
      )}
    </span>
  );
}
