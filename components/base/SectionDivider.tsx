interface SectionDividerProps {
  variant?: "wave" | "dashed-line" | "gradient-fade" | "zigzag" | "numbered" | "none";
  number?: number;
  className?: string;
}

export default function SectionDivider({
  variant = "wave",
  number,
  className = "",
}: SectionDividerProps) {
  if (variant === "none") return null;

  if (variant === "wave") {
    return (
      <div className={`relative w-full overflow-hidden ${className}`} aria-hidden="true">
        <svg
          viewBox="0 0 1440 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="block w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 24C240 4 480 44 720 24C960 4 1200 44 1440 24V48H0V24Z"
            fill="var(--bg-secondary, #f5f5f5)"
            opacity="0.5"
          />
        </svg>
      </div>
    );
  }

  if (variant === "dashed-line") {
    return (
      <div
        className={`mx-auto max-w-4xl px-6 ${className}`}
        aria-hidden="true"
      >
        <hr
          className="border-0"
          style={{
            height: "1px",
            backgroundImage: "repeating-linear-gradient(90deg, var(--border) 0, var(--border) 8px, transparent 8px, transparent 16px)",
          }}
        />
      </div>
    );
  }

  if (variant === "gradient-fade") {
    return (
      <div
        className={`mx-auto max-w-4xl px-6 ${className}`}
        aria-hidden="true"
      >
        <hr
          className="border-0"
          style={{
            height: "1px",
            background: "linear-gradient(90deg, transparent, var(--border), transparent)",
          }}
        />
      </div>
    );
  }

  if (variant === "zigzag") {
    return (
      <div className={`relative w-full overflow-hidden ${className}`} aria-hidden="true">
        <svg
          viewBox="0 0 1440 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="block w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 12L48 0L96 12L144 0L192 12L240 0L288 12L336 0L384 12L432 0L480 12L528 0L576 12L624 0L672 12L720 0L768 12L816 0L864 12L912 0L960 12L1008 0L1056 12L1104 0L1152 12L1200 0L1248 12L1296 0L1344 12L1392 0L1440 12"
            stroke="var(--border)"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </div>
    );
  }

  if (variant === "numbered") {
    return (
      <div
        className={`section-number-divider flex items-center gap-4 mx-auto max-w-4xl px-6 ${className}`}
        aria-hidden="true"
      >
        <span
          className="flex-1"
          style={{
            height: "1px",
            background: "linear-gradient(90deg, transparent, var(--border), transparent)",
          }}
        />
        <span
          className="flex h-9 w-9 items-center justify-center rounded-full border text-xs font-medium"
          style={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "13px",
            fontWeight: 500,
            color: "var(--text-tertiary)",
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border)",
          }}
        >
          {number ?? ""}
        </span>
        <span
          className="flex-1"
          style={{
            height: "1px",
            background: "linear-gradient(90deg, transparent, var(--border), transparent)",
          }}
        />
      </div>
    );
  }

  return null;
}
