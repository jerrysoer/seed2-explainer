"use client";

import { useState } from "react";
import { BookOpen, FileText, Share2, Check, Headphones } from "lucide-react";

interface MediaBarProps {
  /** PDF download URL (relative path like /slug.pdf) */
  pdfUrl?: string;
  /** Share title for the native share dialog */
  shareTitle?: string;
  /** Share description text */
  shareDescription?: string;
  /** Pre-filled share text */
  shareText?: string;
  /** Whether to show the Listen button (reserved for Phase 3) */
  showListen?: boolean;
}

export default function MediaBar({
  pdfUrl,
  shareTitle = "Scrolly Explainer",
  shareDescription = "",
  shareText,
  showListen = false,
}: MediaBarProps) {
  const [copied, setCopied] = useState(false);

  const scrollToContent = () => {
    const main = document.querySelector("main") ?? document.querySelector("article");
    if (main) {
      main.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const text = shareText ?? `${shareTitle} — ${shareDescription}`;

    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title: shareTitle, text, url });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className="sticky top-0 z-40 border-b"
      style={{
        backgroundColor: "color-mix(in srgb, var(--bg-card) 90%, transparent)",
        borderColor: "var(--border)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-2 sm:px-6">
        {/* Left: mode buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={scrollToContent}
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors"
            style={{
              backgroundColor: "var(--bg-secondary)",
              color: "var(--text-primary)",
            }}
          >
            <BookOpen size={14} />
            <span className="hidden sm:inline">Read</span>
          </button>

          {pdfUrl && (
            <a
              href={pdfUrl}
              download
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors hover:bg-bg-secondary"
              style={{ color: "var(--text-tertiary)" }}
            >
              <FileText size={14} />
              <span className="hidden sm:inline">PDF</span>
            </a>
          )}

          {showListen && (
            <button
              disabled
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium opacity-40 cursor-not-allowed"
              style={{ color: "var(--text-tertiary)" }}
              title="Coming soon"
            >
              <Headphones size={14} />
              <span className="hidden sm:inline">Listen</span>
            </button>
          )}
        </div>

        {/* Right: share button */}
        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors hover:bg-bg-secondary"
          style={{ color: "var(--text-tertiary)" }}
        >
          {copied ? (
            <>
              <Check size={14} className="text-accent-success" />
              <span className="hidden sm:inline">Copied!</span>
            </>
          ) : (
            <>
              <Share2 size={14} />
              <span className="hidden sm:inline">Share</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
