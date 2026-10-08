"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import poster from "@/assets/popup-poster.jpg";
import calendar from "@/assets/about/icon-calendar.svg";
import pin from "@/assets/about/icon-pin.svg";

// Pages that already are the call to action.
const SKIP = ["/register-to-visit", "/apply-to-exhibit"];

const OPTIONS = [
  { q: "Planning to visit?", cta: "Register to Visit", href: "/register-to-visit", cls: "bg-brand text-white" },
  { q: "Looking to exhibit?", cta: "Book Your Booth", href: "/apply-to-exhibit", cls: "border-[1.5px] border-accent bg-white text-accent hover:bg-mint" },
];

/**
 * Registration popup, opened on every full page load (client-side navigation keeps the layout, so it
 * doesn’t reappear while browsing). Native <dialog>: Esc, backdrop click and the close button dismiss it.
 */
export default function LaunchPopup() {
  const ref = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (SKIP.some((p) => pathname.startsWith(p))) return;
    // Let the hero load-in play first.
    const t = setTimeout(() => {
      const d = ref.current;
      if (!d) return;
      d.showModal();
      // Focus the dialog itself so the first CTA doesn’t open with a focus ring; Tab still moves into it.
      d.focus();
    }, 800);
    return () => clearTimeout(t);
    // Only on the first load.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const close = () => ref.current?.close();

  return (
    <dialog
      ref={ref}
      aria-labelledby="launch-popup-title"
      tabIndex={-1}
      onClick={(e) => e.target === e.currentTarget && close()}
      className="modal m-auto max-h-[calc(100dvh-24px)] w-[calc(100%-24px)] max-w-[1040px] overflow-y-auto rounded-[24px] bg-transparent outline-none"
    >
      {/* Zero-height sticky row: the close button stays in view when the popup scrolls on short phones. */}
      <div className="sticky top-0 z-10 h-0">
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute top-[10px] right-[10px] grid size-[44px] place-items-center rounded-full bg-white/90 text-ink shadow-[0_6px_16px_-6px_rgb(3_41_26/0.35)] transition-colors duration-(--dur-ui) hover:bg-mint focus-visible:outline-2 focus-visible:outline-forest md:top-[12px] md:right-[12px]"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden className="size-[18px]">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </div>

      <div className="modal-body grid overflow-hidden rounded-[24px] bg-white lg:grid-cols-[minmax(0,1.12fr)_minmax(0,1fr)] landscape-phone:grid-cols-2">
        {/* Whole poster, never cropped: its own background is white, so any spare height blends in. */}
        <div className="flex items-center bg-white">
          <Image src={poster} alt="Fresh Food Expo APAC 2027 poster" placeholder="blur" sizes="(min-width: 1024px) 550px, 100vw" className="h-auto w-full" />
        </div>

        <div className="untrim flex flex-col gap-[14px] p-[20px] md:gap-[18px] md:p-[32px] lg:py-[36px] landscape-phone:gap-[12px]! landscape-phone:p-[20px]!">
          <p className="inline-flex items-center gap-[8px] self-start rounded-full bg-mint px-[14px] py-[6px] text-[12px] leading-[18px] font-semibold tracking-[0.02em] text-forest uppercase md:text-[13px]">
            <span className="size-[8px] animate-pulse rounded-full bg-accent" aria-hidden />
            Registration is now open!
          </p>
          <h2 id="launch-popup-title" className="font-display text-[23px] leading-[29px] font-semibold text-forest md:text-[30px] md:leading-[36px] landscape-phone:text-[22px]! landscape-phone:leading-[28px]!">
            Be Part of Asia Pacific’s Fresh Food Marketplace!
          </h2>

          <ul className="grid gap-[10px] sm:grid-cols-2 md:gap-[12px] landscape-phone:grid-cols-1!">
            {OPTIONS.map((o) => (
              <li key={o.cta} className="flex flex-col items-start gap-[10px] rounded-[18px] bg-mint/60 p-[14px] md:gap-[12px] md:p-[16px] landscape-phone:flex-row! landscape-phone:items-center! landscape-phone:justify-between landscape-phone:p-[12px]!">
                <p className="text-[13px] leading-[17px] font-semibold tracking-[0.04em] text-body uppercase">{o.q}</p>
                <Link href={o.href} onClick={close} className={`pill shrink-0 whitespace-nowrap ${o.cls} md:h-[44px]! md:px-[20px]! md:text-[16px]!`}>
                  <span>
                    {o.cta}
                    {"\u2060"}
                    <span aria-hidden className="pill-chev ml-[10px]">
                      ›
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Phones (and phones held sideways): the poster already shows the date and venue. */}
          <ul className="mt-auto hidden flex-col gap-[8px] border-t border-black/10 pt-[16px] text-[15px] leading-[21px] font-medium text-body md:flex landscape-phone:hidden!">
            <li className="flex items-center gap-[10px]">
              <Image src={calendar} alt="" className="size-[20px] shrink-0" />
              16–18 November 2027
            </li>
            <li className="flex items-center gap-[10px]">
              <Image src={pin} alt="" className="size-[20px] shrink-0" />
              Sands Expo &amp; Convention Centre, Singapore
            </li>
          </ul>
        </div>
      </div>
    </dialog>
  );
}
