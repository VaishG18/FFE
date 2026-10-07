"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import logo from "@/assets/logo.png";
import logoCompact from "@/assets/logo-compact.png";
import menuIcon from "@/assets/icon-menu.png";
import chevronContact from "@/assets/chevron-contact.svg";
import chevronLang from "@/assets/chevron-lang.svg";
import searchIcon from "@/assets/icon-search.png";
import { Button, crop } from "./ui";

// Absolute so the links work from every page; same-page hashes still just scroll.
const NAV = [
  { label: "About", href: "/about" },
  { label: "Exhibit", href: "/#be-involved" },
  { label: "Visit", href: "/#be-involved" },
  { label: "Programme", href: "/programme" },
  { label: "News & Media", href: "/news" },
];

const SITES = ["FFE MENA", "FFE Europe", "FFE China", "FFE India"];
const UTIL = [
  { label: "Newsletter", href: "/subscribe" },
  { label: "Press", href: "/news" },
];

const Divider = () => <span className="h-[22px] w-px bg-white" aria-hidden />;

/**
 * Utility bar above the header (Figma 736:1498). Scrolls away; the header below stays sticky.
 * Below lg there is no design: the four regional sites collapse into an "FFE Network" dropdown,
 * language + search stay visible, and Newsletter / Press move into the mobile menu.
 */
function TopBar() {
  const net = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const close = (e: Event) => {
      const d = net.current;
      if (d?.open && (e instanceof KeyboardEvent ? e.key === "Escape" : !d.contains(e.target as Node))) d.open = false;
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", close);
    };
  }, []);

  return (
    <div className="bg-forest font-medium tracking-[0.02em] text-white">
      <div className="container-page flex h-[44px] items-center justify-between text-[14px] lg:hidden">
        <details ref={net} className="group relative">
          <summary className="flex h-[44px] cursor-pointer list-none items-center gap-[6px] uppercase [&::-webkit-details-marker]:hidden">
            FFE Network
            <Image src={chevronLang} alt="" className="rotate-180 transition-transform duration-(--dur-ui) group-open:rotate-0" />
          </summary>
          <ul className="absolute top-full left-[-12px] z-[60] min-w-[200px] rounded-b-[16px] bg-forest py-[6px] uppercase shadow-[0_16px_32px_-16px_rgb(0_0_0/0.5)]">
            {SITES.map((l) => (
              <li key={l}>
                <a href="#" className="flex min-h-[44px] items-center px-[12px] transition-colors hover:bg-white/10">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </details>
        <div className="-mr-[12px] flex items-center">
          <a href="#" aria-label="Language: English" className="flex h-[44px] items-center gap-[5px] px-[8px] text-white/50 uppercase">
            EN
            <Image src={chevronLang} alt="" className="rotate-180" />
          </a>
          <a href="#" aria-label="Search" className="grid size-[44px] place-items-center">
            <Image src={searchIcon} alt="" sizes="18px" className="size-[18px]" />
          </a>
        </div>
      </div>

      <div className="container-page hidden h-[49px] items-center justify-between text-[15px] lg:flex">
        <nav aria-label="Fresh Food Expo network">
          <ul className="flex items-center gap-[18px] uppercase">
            {SITES.map((l, i) => (
              <li key={l} className="flex items-center gap-[18px]">
                {i > 0 && <Divider />}
                <a href="#" className="footer-link hover:text-white/70">{l}</a>
              </li>
            ))}
          </ul>
        </nav>
        <ul className="flex items-center gap-[18px]">
          {UTIL.map((l) => (
            <li key={l.label} className="flex items-center gap-[18px]">
              <Link href={l.href} className="footer-link hover:text-white/70">
                {l.label}
              </Link>
              <Divider />
            </li>
          ))}
          <li>
            <a href="#" aria-label="Language: English" className="footer-link flex items-start gap-[5px] text-white/50 uppercase hover:text-white/70">
              <span className="trim">EN</span>
              <Image src={chevronLang} alt="" className="mt-[5px] rotate-180" />
            </a>
          </li>
          <li className="ml-[-4px]">
            <a href="#" aria-label="Search" className="block transition-opacity duration-(--dur-ui) hover:opacity-70">
              <Image src={searchIcon} alt="" sizes="18px" className="size-[18px]" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default function Header() {
  const pathname = usePathname();
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
    <>
      <TopBar />
      <header
        className={`sticky top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ease-(--ease-out) ${
          solid ? "bg-page/90 shadow-[0_6px_24px_-12px_rgb(2_93_3/0.25)] backdrop-blur-md" : "bg-page/0"
        }`}
      >
        <div className="container-page flex h-(--header-h) items-center justify-between lg:items-start lg:pt-[17px]">
          <Link href="/" aria-label="Fresh Food Expo Asia Pacific — home" className="tap shrink-0">
            <Image src={logo} alt="Fresh Food Expo Asia Pacific" sizes="131px" preload className="hidden h-[90px] w-[131px] object-cover object-right lg:block" />
            {/* Compact "FFE" mark below lg (Figma 318:1795, 79×42 crop). */}
            <span className="relative block h-[42px] w-[79px] overflow-hidden lg:hidden">
              <Image src={logoCompact} alt="Fresh Food Expo Asia Pacific" sizes="100px" preload style={crop(126.03, 131.85, -12.67, -16.56)} />
            </span>
          </Link>

          <div className="hidden items-center gap-[35px] lg:mt-[18px] lg:flex">
            <nav aria-label="Primary">
              <ul className="flex items-center gap-[25px] font-display text-[19px] font-medium uppercase tracking-[0.02em] text-ink">
                {NAV.map((n) => (
                  <li key={n.label}>
                    <Link
                      href={n.href}
                      aria-current={n.href === pathname ? "page" : undefined}
                      className="nav-link trim block transition-colors duration-(--dur-ui) hover:text-forest"
                    >
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <Button href="/contact" chevron={chevronContact} w={162} h={47} pl={25} gap={13} className="bg-brand text-white">
              Contact Us
            </Button>
          </div>

          {/* Below lg (Figma 318:2092 / 318:2089): Contact pill + 47px ringed menu button. */}
          <div className="flex items-center gap-[13px] lg:hidden">
            <Button
              href="/contact"
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
                  <Link
                    href={n.href}
                    aria-current={n.href === pathname ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className="flex min-h-12 items-center rounded-2xl px-4 transition-colors hover:bg-mint aria-[current]:text-forest"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
            {/* Utility links that don't fit the mobile bar. */}
            <ul className="mt-2 flex border-t border-black/10 pt-2 text-[16px] font-medium text-body">
              {UTIL.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} onClick={() => setOpen(false)} className="flex min-h-12 items-center rounded-2xl px-4 transition-colors hover:bg-mint">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
