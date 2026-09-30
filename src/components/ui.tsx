import Image, { type StaticImageData } from "next/image";
import type { CSSProperties, ReactNode } from "react";
import calendar from "@/assets/icon-calendar.png";
import location from "@/assets/icon-location.png";

/** Figma chevrons are "^" glyphs rotated 90°; the wrapper reserves the rotated box. */
export function Chevron({ src, className = "" }: { src: StaticImageData; className?: string }) {
  const box = { "--cw": `${src.height}px`, "--ch": `${src.width}px` } as CSSProperties;
  return (
    <span className={`chev inline-flex shrink-0 items-center justify-center ${className}`} style={box}>
      <Image src={src} alt="" className="max-w-none rotate-90" />
    </span>
  );
}

type MobileBox = {
  w: number;
  h: number;
  pl?: number;
  gap?: number;
  fs: number;
  /** Chevron scale vs. the desktop asset. */
  chev?: number;
  /** Two-line label: line height + max label width. */
  lh?: number;
  tw?: number;
  /** Chevron flows inline after the last word (wrapped labels). */
  inline?: boolean;
  /** Centered label, no chevron. */
  center?: boolean;
};

type ButtonProps = {
  href: string;
  children: ReactNode;
  chevron: StaticImageData;
  /** Figma box: width, height, left padding to label, label→chevron gap, font size. */
  w: number;
  h: number;
  pl: number;
  gap: number;
  fs?: 15 | 18;
  className: string;
  /** Mobile Figma box (<768px). Without it the pill stays fluid on phones. */
  m?: MobileBox;
};

/** Pill CTA. Exact Figma box at ≥768px, and on phones when `m` is given. */
export function Button({ href, children, chevron, w, h, pl, gap, fs = 18, className, m }: ButtonProps) {
  const vars = {
    "--w": `${w}px`,
    "--h": `${h}px`,
    "--pl": `${pl}px`,
    "--gap": `${gap}px`,
    "--fs": `${fs}px`,
    ...(m && {
      "--mw": `${m.w}px`,
      "--mh": `${m.h}px`,
      "--mpl": `${m.pl ?? 0}px`,
      "--mgap": `${m.gap ?? 0}px`,
      "--mfs": `${m.fs}px`,
      "--mcs": m.chev ?? 1,
      ...(m.lh && { "--mlh": `${m.lh}px` }),
      ...(m.tw && { "--mtw": `${m.tw}px` }),
    }),
  } as CSSProperties;
  return (
    <a
      href={href}
      className={`btn ${className}`}
      style={vars}
      data-m={m ? "" : undefined}
      data-m-wrap={m?.tw ? "" : undefined}
      data-m-center={m?.center ? "" : undefined}
    >
      <span className="trim">
        {children}
        {m?.inline && <Chevron src={chevron} className="ml-(--mgap) align-middle md:hidden" />}
      </span>
      <Chevron src={chevron} className={m?.inline || m?.center ? "max-md:hidden" : ""} />
    </a>
  );
}

/** Date + venue block with the white rule (hero + join banner). */
export function DateVenue({ className = "", style }: { className?: string; style?: CSSProperties }) {
  const rows = [
    { icon: calendar, text: "17-18 Nov. 2027" },
    { icon: location, text: "Sands Expo & Convention Centre, Singapore" },
  ];
  return (
    // Mobile (Figma 318:1802): 60px rule, 17/16px icons, 17px copy wrapping at 239px, top-aligned rows.
    <ul
      className={`relative flex flex-col gap-[10px] pt-[8px] pl-[16px] before:absolute before:top-0 before:left-0 before:h-[60px] before:w-[5px] before:bg-white md:gap-[12px] md:border-l-[5px] md:border-white md:py-[9px] md:pl-[11px] md:before:hidden ${className}`}
      style={style}
    >
      {rows.map((r, i) => (
        <li key={r.text} className="flex items-start gap-[11px] font-medium tracking-[0.02em] text-white md:h-[23px] md:items-center">
          <Image src={r.icon} alt="" className={`shrink-0 md:mr-0 md:size-[23px] ${i ? "mr-px size-[16px]" : "size-[17px]"}`} />
          <span className="mt-[2px] block max-w-[239px] text-[17px] leading-[21px] [text-box:trim-both_cap_alphabetic] md:mt-0 md:max-w-none md:text-[22px] md:leading-[31px] md:[text-box:normal]">
            {r.text}
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Figma image-fill crop (percentages of the frame box). Box must keep Figma's aspect ratio. */
export const crop = (w: number, h: number, l: number, t: number): CSSProperties => ({
  position: "absolute",
  width: `${w}%`,
  height: `${h}%`,
  left: `${l}%`,
  top: `${t}%`,
  maxWidth: "none",
});
