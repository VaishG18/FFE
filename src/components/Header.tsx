"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";
import logoCompact from "@/assets/logo-compact.png";
import menuIcon from "@/assets/icon-menu.png";
import chevronContact from "@/assets/chevron-contact.svg";
import { Button, crop } from "./ui";

const NAV = [
  { label: "About", href: "#about" },
  { label: "Exhibit", href: "#be-involved" },
  { label: "Visit", href: "#be-involved" },
  { label: "Programme", href: "#" },
  { label: "News & Media", href: "#" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ease-(--ease-out) ${
        solid ? "bg-page/90 shadow-[0_6px_24px_-12px_rgb(2_93_3/0.25)] backdrop-blur-md" : "bg-page/0"
      }`}
    >
      <div className="container-page flex h-(--header-h) items-center justify-between lg:items-start lg:pt-[20px]">
        <a href="#top" aria-label="Fresh Food Expo Asia Pacific — home" className="shrink-0">
          <Image src={logo} alt="Fresh Food Expo Asia Pacific" sizes="131px" preload className="hidden h-[90px] w-[131px] object-cover object-right lg:block" />
          {/* Compact "FFE" mark below lg (Figma 318:1795, 79×42 crop). */}
          <span className="relative block h-[42px] w-[79px] overflow-hidden lg:hidden">
            <Image src={logoCompact} alt="Fresh Food Expo Asia Pacific" sizes="100px" preload style={crop(126.03, 131.85, -12.67, -16.56)} />
          </span>
        </a>

        <div className="hidden items-center gap-[35px] lg:mt-[18px] lg:flex">
          <nav aria-label="Primary">
            <ul className="flex items-center gap-[25px] font-display text-[19px] font-medium uppercase tracking-[0.02em] text-ink">
              {NAV.map((n) => (
                <li key={n.label}>
                  <a href={n.href} className="nav-link trim block transition-colors duration-(--dur-ui) hover:text-forest">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <Button href="#contact" chevron={chevronContact} w={162} h={47} pl={25} gap={13} className="bg-brand text-white">
            Contact Us
          </Button>
        </div>

        {/* Below lg (Figma 318:2092 / 318:2089): Contact pill + 47px ringed menu button. */}
        <div className="flex items-center gap-[13px] lg:hidden">
          <Button
            href="#contact"
            chevron={chevronContact}
            w={162}
            h={47}
            pl={25}
            gap={13}
            m={{ w: 134, h: 43, pl: 22, gap: 6, fs: 15, chev: 0.916 }}
            className="bg-accent text-white"
          >
            Contact Us
          </Button>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
            className="relative grid size-[47px] place-items-center rounded-full border-2 border-[#032919] text-[#032919] transition-colors duration-(--dur-ui) hover:bg-mint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
          >
            <Image
              src={menuIcon}
              alt=""
              sizes="21px"
              className={`size-[21px] transition-[opacity,transform] duration-(--dur-ui) ease-(--ease-out) ${open ? "scale-75 opacity-0" : "opacity-100"}`}
            />
            {[45, -45].map((deg) => (
              <span
                key={deg}
                className="absolute h-[2px] w-[18px] rounded-full bg-current transition-[transform,opacity] duration-(--dur-ui) ease-(--ease-out)"
                style={{ transform: `rotate(${open ? deg : 0}deg) scaleX(${open ? 1 : 0})`, opacity: open ? 1 : 0 }}
              />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile menu: opacity + transform only; inert while closed. */}
      <div
        id="mobile-menu"
        inert={!open}
        className={`absolute inset-x-0 top-full transition-[opacity,transform] duration-(--dur-ui) ease-(--ease-out) lg:hidden ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <nav aria-label="Mobile" className="container-wide rounded-[24px] bg-white p-3 shadow-[0_24px_48px_-24px_rgb(2_93_3/0.35)]">
          <ul className="font-display text-[19px] font-medium uppercase tracking-[0.02em] text-ink">
            {NAV.map((n) => (
              <li key={n.label}>
                <a href={n.href} onClick={() => setOpen(false)} className="flex min-h-12 items-center rounded-2xl px-4 transition-colors hover:bg-mint">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
