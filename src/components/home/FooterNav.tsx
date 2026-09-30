"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import plus from "@/assets/icon-plus.png";

// Column left padding after the divider follows Figma (359:559–359:562).
const COLS = [
  { title: "About", pl: "", gap: 7, links: ["Overview", "Our Story", "Strategic Vision", "Fresh Food Ecosystem", "Organiser"] },
  { title: "Exhibit", pl: "lg:pl-4 xl:pl-[24px]", gap: 8, links: ["Why Exhibit", "Who Should Exhibit", "Exhibitor Information", "Apply to Exhibit"] },
  { title: "Visit", pl: "lg:pl-4 xl:pl-[21px]", gap: 6, links: ["Why Visit", "Who Should Visit", "Visitor Information", "Register to Visit"] },
  { title: "Contact", pl: "lg:pl-4 xl:pl-[18px]", gap: 5, links: ["Contact Us", "Media & Press", "General Enquiries"] },
];

// Row paddings between the Figma rules 318:2065–318:2069 (first row is shorter).
const ROW = ["pt-[11.5px] pb-[15px]", "pt-[15px] pb-[16px]", "pt-[15px] pb-[16px]", "pt-[15px] pb-[17px]"];

const PHONE = "(max-width: 767.98px)";

/**
 * Footer columns. Phones (Figma 318:2070–318:2085): <details> accordion with a plus icon.
 * md+: always-open columns. Rendered open so links work without JS; collapsed on phones after mount.
 */
export default function FooterNav() {
  const refs = useRef<(HTMLDetailsElement | null)[]>([]);

  useEffect(() => {
    const mq = window.matchMedia(PHONE);
    const sync = () => refs.current.forEach((d) => d && (d.open = !mq.matches));
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <nav
      aria-label="Footer"
      className="mt-[27.5px] ml-[3px] border-b border-black/30 md:mt-0 md:ml-0 md:grid md:grid-cols-2 md:gap-x-6 md:gap-y-10 md:border-0 lg:flex lg:flex-1 lg:gap-0"
    >
      {COLS.map((c, i) => (
        <details
          key={c.title}
          open
          ref={(el) => {
            refs.current[i] = el;
          }}
          className={`group border-t border-black/30 md:border-0 lg:h-[250px] ${i ? "lg:border-l lg:border-black/50" : ""} lg:flex-1 ${
            i === 3 ? "" : i === 0 ? "xl:w-[219px] xl:flex-none" : "xl:w-[249px] xl:flex-none"
          } ${c.pl}`}
        >
          <summary
            onClick={(e) => !window.matchMedia(PHONE).matches && e.preventDefault()}
            className={`flex cursor-pointer list-none items-center justify-between pr-[11px] md:cursor-default md:p-0 [&::-webkit-details-marker]:hidden ${ROW[i]}`}
          >
            <span className="flex items-center" style={{ gap: c.gap }}>
              <span className="h-[33px] w-[3px] shrink-0 bg-accent" aria-hidden />
              <h3 className="text-[20px] leading-[normal] font-semibold text-black md:text-[25px]">{c.title}</h3>
            </span>
            <Image
              src={plus}
              alt=""
              sizes="30px"
              className="size-[30px] transition-transform duration-(--dur-ui) ease-(--ease-out) group-open:rotate-45 md:hidden"
            />
          </summary>
          <ul className="acc-body text-lead flex flex-col gap-[25.8px] pb-[20px] md:mt-[17px] md:pb-0" style={{ paddingLeft: 3 + c.gap }}>
            {c.links.map((l) => (
              <li key={l}>
                <a href="#" className="footer-link">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </details>
      ))}
    </nav>
  );
}
