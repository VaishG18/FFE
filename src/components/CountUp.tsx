"use client";

import { useEffect, useRef } from "react";

type Props = { to: number; decimals?: number; suffix?: string; duration?: number };

/**
 * Counts up to `to` the first time it scrolls into view (ease-out).
 * Server/no-JS/reduced-motion render the final value; screen readers only get the final value.
 */
export default function CountUp({ to, decimals = 0, suffix = "", duration = 1600 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const final = to.toFixed(decimals) + suffix;

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const show = (v: number) => (el.textContent = v.toFixed(decimals) + suffix);
    show(0);
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / duration);
          show(to * (1 - (1 - p) ** 3));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      show(to);
    };
  }, [to, decimals, suffix, duration]);

  return (
    <>
      <span ref={ref} aria-hidden className="tabular-nums">
        {final}
      </span>
      <span className="sr-only">{final}</span>
    </>
  );
}
