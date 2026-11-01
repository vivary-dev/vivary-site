"use client";

import { useEffect, useRef } from "react";

// The demo plays muted while it is on screen. preload="none" keeps the MP4 off the network until then.
// Reduced motion and capture mode (?still=1) keep the poster. The controls stay visible so anyone can pause.
export function DemoVideo({ src, poster, describedBy }: { src: string; poster: string; describedBy: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.location.search.includes("still")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // A pause that this component did not start is the reader's choice, so scrolling back does not resume.
    let readerPaused = false;
    let selfPausing = false;
    const onPause = () => {
      if (selfPausing) selfPausing = false;
      else readerPaused = true;
    };
    const onPlay = () => {
      readerPaused = false;
    };
    video.addEventListener("pause", onPause);
    video.addEventListener("play", onPlay);
    const io = new IntersectionObserver(
      ([entry]) => {
        // isIntersecting is true for any visible sliver, so the ratio decides.
        if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
          if (!readerPaused) void video.play().catch(() => {});
        } else if (!video.paused) {
          selfPausing = true;
          video.pause();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(video);
    return () => {
      io.disconnect();
      video.removeEventListener("pause", onPause);
      video.removeEventListener("play", onPlay);
    };
  }, []);
  return (
    <video
      ref={ref}
      width={1280}
      height={676}
      poster={poster}
      preload="none"
      muted
      loop
      playsInline
      controls
      aria-describedby={describedBy}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
