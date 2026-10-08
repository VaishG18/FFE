"use client";

import { useEffect, useRef, useState } from "react";
import poster from "@/assets/about/siaw.jpg";

/**
 * SIAW trailer (1080p H.264, CRF 23). Loads nothing until scrolled into view, then plays muted
 * on loop and pauses off-screen. Reduced motion: no autoplay, native controls instead.
 */
export default function SiawVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = ref.current!;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.controls = true;
      return;
    }
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.25 });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <video
        ref={ref}
        src="/video/siaw-trailer.mp4"
        poster={poster.src}
        muted={muted}
        loop
        playsInline
        preload="none"
        aria-label="Singapore International Agri-Food Week trailer"
        className="absolute inset-0 size-full object-cover"
      />
      <button
        type="button"
        onClick={() => setMuted((m) => !m)}
        aria-label={muted ? "Unmute trailer" : "Mute trailer"}
        className="absolute right-4 bottom-4 grid motion-reduce:hidden size-11 place-items-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors duration-(--dur-ui) hover:bg-black/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="size-5">
          <path d="M11 5 6 9H2v6h4l5 4V5Z" fill="currentColor" />
          {muted ? <path d="m22 9-6 6m0-6 6 6" /> : <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" />}
        </svg>
      </button>
    </>
  );
}
