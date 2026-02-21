"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

interface Highlight {
  value: string;
  label: string;
  color?: string;
}

interface CompletionCardProps {
  variant?: "confetti" | "minimal" | "dashboard";
  title?: string;
  subtitle?: string;
  quote?: string;
  highlights?: Highlight[];
  sharePrompt?: string;
}

const confettiColors = [
  "var(--sc-accent-primary, var(--accent-primary, #6366f1))",
  "var(--warm-amber, #f59e0b)",
  "var(--golden, #eab308)",
  "var(--correct-green, #22c55e)",
  "var(--accent-purple, #8b5cf6)",
];

const confettiPieces = Array.from({ length: 24 }, (_, i) => ({
  x: `${5 + Math.random() * 90}%`,
  delay: `${Math.random() * 1.5}s`,
  duration: `${1.5 + Math.random() * 1.5}s`,
  color: confettiColors[i % confettiColors.length],
  size: 4 + Math.random() * 6,
  shape: i % 3,
}));

export default function CompletionCard({
  variant = "confetti",
  title = "You Made It",
  subtitle,
  quote,
  highlights = [],
  sharePrompt = "Found this interesting? Share it with someone curious.",
}: CompletionCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (variant === "minimal") {
    return (
      <div
        ref={ref}
        data-completion-card
        className={`mx-auto max-w-3xl px-4 py-20 text-center transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <div className="relative rounded-2xl border border-border bg-bg-card p-8 shadow-lg sm:p-14">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-correct-green">
            <Check className="h-8 w-8 text-correct-green" />
          </div>

          <p className="font-mono text-xs font-medium uppercase tracking-widest text-text-tertiary">
            Explainer complete
          </p>

          <h3 className="mt-5 font-serif text-3xl font-bold text-text-primary sm:text-4xl">
            {title}
          </h3>

          {subtitle && (
            <p className="mx-auto mt-4 max-w-lg font-sans text-base leading-relaxed text-text-secondary">
              {subtitle}
            </p>
          )}

          <p className="mt-8 font-sans text-sm text-text-tertiary">
            {sharePrompt}
          </p>
        </div>
      </div>
    );
  }

  if (variant === "dashboard") {
    return (
      <div
        ref={ref}
        data-completion-card
        className={`mx-auto max-w-3xl px-4 py-20 text-center transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <div className="relative overflow-hidden rounded-2xl border border-border bg-bg-primary p-8 shadow-xl sm:p-14"
          style={{ background: "var(--bg-primary)" }}
        >
          <div className="absolute left-0 right-0 top-0 h-1"
            style={{ background: "linear-gradient(90deg, var(--sc-accent-primary, var(--accent-primary, #6366f1)), transparent)" }}
          />

          <p className="font-mono text-xs font-medium uppercase tracking-widest text-text-tertiary">
            Explainer complete
          </p>

          <h3 className="mt-5 font-serif text-3xl font-bold text-text-primary sm:text-4xl">
            {title}
          </h3>

          {highlights.length > 0 && (
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {highlights.map((h) => (
                <div key={h.label} className="rounded-xl border border-border bg-bg-card p-4">
                  <p
                    className="font-mono text-2xl font-bold"
                    style={{ color: h.color ?? "var(--sc-accent-primary, var(--accent-primary))" }}
                  >
                    {h.value}
                  </p>
                  <p className="mt-0.5 font-sans text-xs text-text-tertiary">{h.label}</p>
                </div>
              ))}
            </div>
          )}

          {quote && (
            <blockquote className="mx-auto mt-8 max-w-lg font-serif text-base leading-relaxed text-text-secondary italic">
              &ldquo;{quote}&rdquo;
            </blockquote>
          )}

          <p className="mt-8 font-sans text-sm text-text-tertiary">
            {sharePrompt}
          </p>
        </div>
      </div>
    );
  }

  // Default: confetti variant
  return (
    <div
      ref={ref}
      data-completion-card
      className={`mx-auto max-w-3xl px-4 py-20 text-center transition-all duration-1000 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      <div className="relative overflow-hidden rounded-2xl border border-border bg-bg-card p-8 shadow-lg sm:p-14">
        {/* Confetti burst */}
        {visible && (
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            {confettiPieces.map((piece, i) => (
              <span
                key={i}
                className="absolute"
                style={{
                  left: piece.x,
                  top: "-10px",
                  width: piece.shape === 2 ? piece.size * 1.5 : piece.size,
                  height: piece.size,
                  backgroundColor: piece.color,
                  borderRadius: piece.shape === 0 ? "50%" : "2px",
                  animation: `confetti-fall ${piece.duration} ease-out ${piece.delay} both`,
                  opacity: 0.8,
                }}
              />
            ))}
          </div>
        )}

        {/* Gradient accent line at top */}
        <div className="absolute left-0 right-0 top-0 h-1"
          style={{ background: "linear-gradient(90deg, var(--sc-accent-primary, var(--accent-primary, #6366f1)), var(--warm-amber, #f59e0b), var(--golden, #eab308))" }}
        />

        <p className="font-mono text-xs font-medium uppercase tracking-widest text-text-tertiary">
          Explainer complete
        </p>

        <h3 className="mt-5 font-serif text-3xl font-bold text-text-primary sm:text-4xl">
          {title}
        </h3>

        {quote && (
          <blockquote className="mx-auto mt-6 max-w-lg font-serif text-base leading-relaxed text-text-secondary italic">
            &ldquo;{quote}&rdquo;
          </blockquote>
        )}

        {highlights.length > 0 && (
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {highlights.map((h) => (
              <div key={h.label} className="rounded-xl bg-bg-secondary p-4">
                <p
                  className={`font-mono text-2xl font-bold ${h.color ?? ""}`}
                  style={h.color ? undefined : { color: "var(--sc-accent-primary, var(--accent-primary))" }}
                >
                  {h.value}
                </p>
                <p className="mt-0.5 font-sans text-xs text-text-tertiary">{h.label}</p>
              </div>
            ))}
          </div>
        )}

        <p className="mt-8 font-sans text-sm text-text-tertiary">
          {sharePrompt}
        </p>
      </div>
    </div>
  );
}
