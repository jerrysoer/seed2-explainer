"use client";

import { useState, useEffect, useRef, CSSProperties } from "react";

interface GeneratedImageProps {
  id: string;
  alt: string;
  className?: string;
  overlay?: "film-grain" | "gradient-dark" | "gradient-light" | "none";
  aspectRatio?: string;
  objectFit?: "cover" | "contain" | "fill";
  priority?: boolean;
  fallback?: string | null;
  fullBleed?: boolean;
}

export default function GeneratedImage({
  id,
  alt,
  className = "",
  overlay = "none",
  aspectRatio,
  objectFit = "cover",
  priority = false,
  fallback,
  fullBleed = false,
}: GeneratedImageProps) {
  const [visible, setVisible] = useState(false);
  const [useGenerated, setUseGenerated] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Lazy load via IntersectionObserver (unless priority)
  useEffect(() => {
    if (priority) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  // Try generated path, fallback on error
  const src = useGenerated ? `/generated/${id}.png` : fallback || "";

  const handleError = () => {
    if (useGenerated && fallback) {
      setUseGenerated(false);
    }
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const wrapperStyle: CSSProperties = {
    position: "relative",
    overflow: "hidden",
    borderRadius: "0.75rem",
    ...(aspectRatio && { aspectRatio }),
    ...(fullBleed && {
      width: "100vw",
      marginLeft: "calc(-50vw + 50%)",
    }),
  };

  const imageStyle: CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit,
    opacity: isLoaded ? 1 : 0,
    transform: isLoaded ? "translateY(0)" : "translateY(12px)",
    transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
  };

  return (
    <div ref={ref} style={wrapperStyle} className={className}>
      {visible && src && (
        <>
          <img
            src={src}
            alt={alt}
            style={imageStyle}
            onError={handleError}
            onLoad={handleLoad}
            loading={priority ? undefined : "lazy"}
          />

          {/* Film grain overlay */}
          {overlay === "film-grain" && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                opacity: 0.035,
                mixBlendMode: "overlay",
                pointerEvents: "none",
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                backgroundRepeat: "repeat",
              }}
              aria-hidden="true"
            />
          )}

          {/* Gradient overlays */}
          {overlay === "gradient-dark" && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.8) 100%)",
                pointerEvents: "none",
              }}
              aria-hidden="true"
            />
          )}

          {overlay === "gradient-light" && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.5) 100%)",
                pointerEvents: "none",
              }}
              aria-hidden="true"
            />
          )}
        </>
      )}

      {/* Fallback if no src available */}
      {visible && !src && (
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "var(--color-surface-secondary, #f3f4f6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--color-text-tertiary, #9ca3af)",
          }}
        >
          <span>Image unavailable</span>
        </div>
      )}
    </div>
  );
}
