"use client";

import { useEffect, useRef, useState } from "react";
import { PartyPopper } from "lucide-react";

export default function CompletionCard() {
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

  return (
    <div
      ref={ref}
      className={`mx-auto max-w-2xl px-4 py-16 text-center transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="rounded-2xl border border-border bg-bg-card p-8 shadow-sm sm:p-12">
        <PartyPopper className="mx-auto h-10 w-10 text-accent-amber" />
        <h3 className="mt-4 font-serif text-2xl font-semibold text-text-primary sm:text-3xl">
          You explored all of this!
        </h3>
        <p className="mt-3 font-sans text-base text-text-secondary">
          8 sections, 6 benchmarks, 4 competitions, 3 model tiers, and 1 big
          disruption. Now you know Seed2.0.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <span className="rounded-full bg-forward-blue/10 px-4 py-1.5 font-mono text-sm text-forward-blue">
            4/6 benchmarks led
          </span>
          <span className="rounded-full bg-accent-amber/10 px-4 py-1.5 font-mono text-sm text-accent-amber">
            ~10x cheaper
          </span>
          <span className="rounded-full bg-correct-green/10 px-4 py-1.5 font-mono text-sm text-correct-green">
            100M+ DAU
          </span>
        </div>
      </div>
    </div>
  );
}
