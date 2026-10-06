import Image, { type StaticImageData } from "next/image";
import { Inter } from "next/font/google";
import type { CSSProperties, ReactNode } from "react";
import broccoli from "@/assets/story/broccoli.jpg";
import tomatoes from "@/assets/story/tomatoes.jpg";
import leaf from "@/assets/story/leaf.svg";
import chevronSmWhite from "@/assets/chevron-sm-white.svg";
import { Button } from "../ui";
import RuleEyebrow from "./RuleEyebrow";

// Source lines are Inter SemiBold Italic in Figma (the only Inter on the site).
const inter = Inter({ subsets: ["latin"], weight: "600", style: "italic" });

type Fact = { title: string; text: ReactNode; source: string; img: StaticImageData; alt: string; pos: string; srcTop: string; box: string };

// Figma 777:481 / 914:1231 (628×236, sitting 7.68 / 8px down a 250px row).
const FACTS: Fact[] = [
  {
    title: "50% more",
    text: (
      <>
        Food, feed and fibre will need to be produced globally by 2050 <b className="font-semibold text-black">compared with 2012 levels</b>.
      </>
    ),
    source: "Source: FAO — The State of the World’s Land and Water Resources for Food and Agriculture 2025",
    img: broccoli,
    alt: "Broccoli heads in a wooden market crate",
    // Fill 162.19% wide at −60.96% → cover, 98% across.
    pos: "object-[98%_50%]",
    srcTop: "xl:top-[193.68px]",
    box: "",
  },
  {
    title: "13.3% of food",
    text: "Is lost globally after harvest and before reaching retail, including during transport, storage, wholesale and processing.",
    source: "Source: UNEP & FAO — Sustainable Food Cold Chains: Opportunities, Challenges and the Way Forward",
    img: tomatoes,
    alt: "Vine tomatoes on a blue conveyor",
    // Fill 176.3% wide at −40.63% → cover, 53.3% across.
    pos: "object-[53.3%_50%]",
    srcTop: "xl:top-[204.68px]",
    box: "xl:mt-[0.32px]",
  },
];

/** Figma 777:474: 1360px mint panel (40px padding, 22px gaps), heading, two fact cards, note. */
export default function WhyNow() {
  return (
    <section className="untrim mx-auto mt-[48px] w-[min(1360px,100%-2*var(--gutter))] lg:mt-[80px]">
      <div className="flex flex-col items-start gap-[22px] rounded-[24px] bg-linear-to-b from-mint to-[#eef6ef] p-[20px] md:p-[40px] lg:rounded-[32px]">
        <div className="flex flex-col items-start gap-[22px]" data-reveal>
          <RuleEyebrow>Why this matters now</RuleEyebrow>
          <h2 className="font-display text-[26px] leading-[32px] font-semibold text-forest md:text-[30px] md:leading-[38px] lg:text-[34px] lg:leading-[42px]">
            The <span className="text-accent">Global Food System</span> is under increasing pressure <br className="max-lg:hidden" />
            to produce more while making better <span className="text-accent">use of limited resources.</span>
          </h2>
        </div>

        <div className="grid w-full gap-[24px] xl:h-[250px] xl:grid-cols-2 xl:items-start xl:pt-[7.68px]">
          {FACTS.map((f, idx) => (
            <article
              key={f.title}
              className={`lift group relative rounded-[22px] bg-white p-[20px] md:p-[24px] xl:h-[236px] xl:pb-0 ${f.box}`}
              data-reveal
              style={{ "--i": idx } as CSSProperties}
            >
              <div className="flex flex-col gap-[20px] sm:flex-row sm:items-start sm:gap-[22px]">
                <div className="relative size-[160px] shrink-0 overflow-hidden rounded-[18px] bg-linear-to-b from-mint to-[#c2e3c3]">
                  <Image src={f.img} alt={f.alt} placeholder="blur" sizes="160px" className={`zoom absolute inset-0 size-full object-cover ${f.pos}`} />
                </div>
                <div className="flex flex-col items-start gap-[10px] xl:w-[398px]">
                  <h3 className="font-display text-[30px] leading-[36px] font-semibold text-accent md:text-[34px] md:leading-[40px]">{f.title}</h3>
                  <p className="text-[15px] leading-[24px] font-medium text-body">{f.text}</p>
                  <Button href="#" chevron={chevronSmWhite} w={160} h={40} pl={19} gap={5.28} fs={15} className="border border-accent bg-accent text-white">
                    Read the report
                  </Button>
                </div>
              </div>
              <p className={`${inter.className} mt-[14px] max-w-[496px] text-[10px] leading-[18px] font-semibold text-accent italic xl:absolute xl:left-[33px] xl:mt-0 xl:max-w-none xl:whitespace-nowrap ${f.srcTop}`}>
                {f.source}
              </p>
            </article>
          ))}
        </div>

        <div className="flex w-full items-center gap-[16px] rounded-[22px] bg-white p-[20px] md:gap-[24px] md:py-[24px] md:pr-[32px] md:pl-[28px]" data-reveal>
          {/* Deco · Leaf: 60×40 rotated 60° in a 64.64×71.96 box. */}
          <span className="relative hidden h-[71.962px] w-[64.641px] shrink-0 sm:block" aria-hidden>
            <Image src={leaf} alt="" className="absolute top-1/2 left-1/2 max-w-none -translate-1/2 rotate-60" />
          </span>
          <p className="min-w-0 flex-1 text-[16px] leading-[24px] font-medium text-black md:text-[18px] md:leading-[26px]">
            For the fresh food sector, this reinforces the need for{" "}
            <b className="font-semibold text-accent">better post-harvest technology, cooling, preservation, cold chain, logistics and distribution</b>,{" "}
            <b className="font-semibold">to preserve more of what is produced, move it efficiently and connect supply with the markets that need it.</b>
          </p>
        </div>
      </div>
    </section>
  );
}
