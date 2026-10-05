"use client";

import { useEffect, useRef } from "react";

type Props = { to: number; decimals?: number; suffix?: string; duration?: number; /** Thousands separators ("2,500"). */ group?: boolean };

/**
 * Counts up to `to` the first time it scrolls into view (ease-out).
 * Server/no-JS/reduced-motion render the final value; screen readers only get the final value.
 */
export default function CountUp({ to, decimals = 0, suffix = "", duration = 1600, group = false }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const fmt = (v: number) => (group ? Math.round(v).toLocaleString("en-US") : v.toFixed(decimals)) + suffix;
  const final = fmt(to);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const show = (v: number) => (el.textContent = fmt(v));
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
    // eslint-disable-next-line react-hooks/exhaustive-deps -- fmt only depends on the listed props
  }, [to, decimals, suffix, duration, group]);

  return (
    <>
      <span ref={ref} aria-hidden className="tabular-nums">
        {final}
      </span>
      <span className="sr-only">{final}</span>
    </>
  );
}
