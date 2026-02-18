"use client";

import { useSyncExternalStore } from "react";
import { Sun, Moon } from "lucide-react";

function getThemeSnapshot(): "light" | "dark" {
  if (typeof document === "undefined") return "light";
  const stored = localStorage.getItem("seed2-explainer-theme");
  if (stored === "dark") return "dark";
  if (!stored && document.documentElement.getAttribute("data-theme") === "dark") return "dark";
  return "light";
}

function getServerSnapshot(): "light" | "dark" {
  return "light";
}

function subscribe(callback: () => void) {
  // Listen for storage changes from other tabs
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getThemeSnapshot, getServerSnapshot);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("seed2-explainer-theme", next);
    // Force re-render by dispatching storage event
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <button
      onClick={toggle}
      className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg-card shadow-sm transition-all hover:shadow-md sm:left-6 sm:top-6"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <Moon className="h-4 w-4 text-text-secondary" />
      ) : (
        <Sun className="h-4 w-4 text-text-secondary" />
      )}
    </button>
  );
}
