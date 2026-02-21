"use client";

import { useState, useEffect, useRef, CSSProperties } from "react";

interface GeneratedVideoProps {
  id: string;
  poster?: string;
  className?: string;
  loop?: boolean;
  muted?: boolean;
  autoplay?: boolean;
  controls?: boolean;
  aspectRatio?: string;
  reducedMotionFallback?: "poster" | "hide";
  pauseOnExit?: boolean;
  fullBleed?: boolean;
}

export default function GeneratedVideo({
  id,
  poster,
  className = "",
  loop = true,
  muted = true,
  autoplay = true,
  controls = false,
  aspectRatio,
  reducedMotionFallback = "poster",
  pauseOnExit = false,
  fullBleed = false,
}: GeneratedVideoProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Detect reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);

    return () => mq.removeEventListener("change", handler);
  }, []);

  // Play/pause on viewport entry/exit
  useEffect(() => {
    if (!videoRef.current || !autoplay) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(() => {
            // Autoplay failed, ignore
          });
        } else if (pauseOnExit && !entry.isIntersecting) {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(videoRef.current);

    return () => observer.disconnect();
  }, [autoplay, pauseOnExit]);

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

  const videoStyle: CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  // Reduced motion: show poster or hide
  if (prefersReducedMotion) {
    if (reducedMotionFallback === "hide") {
      return null;
    }

    if (poster) {
      return (
        <div style={wrapperStyle} className={className}>
          <img
            src={poster.startsWith("/generated/") ? poster : `/generated/${poster}.png`}
            alt=""
            style={videoStyle}
            aria-hidden="true"
          />
        </div>
      );
    }

    return null;
  }

  // Render video
  return (
    <div style={wrapperStyle} className={className}>
      <video
        ref={videoRef}
        playsInline
        muted={muted}
        loop={loop}
        controls={controls}
        poster={poster ? (poster.startsWith("/generated/") ? poster : `/generated/${poster}.png`) : undefined}
        style={videoStyle}
      >
        <source src={`/generated/${id}.webm`} type="video/webm" />
        <source src={`/generated/${id}.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
