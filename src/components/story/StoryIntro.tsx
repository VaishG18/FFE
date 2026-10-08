import Image from "next/image";
import type { CSSProperties } from "react";
import peppers from "@/assets/story/peppers.jpg";
import RuleEyebrow from "./RuleEyebrow";

/** Figma 777:457: 640px copy, 64px gap, 319px photo filling the rest. */
export default function StoryIntro() {
  return (
    <section className="untrim container-narrow mt-[48px] flex flex-col gap-[32px] lg:mt-[83.32px] xl:flex-row xl:items-center xl:gap-[64px]">
      <div className="flex flex-col items-start gap-[16px] xl:w-[640px] xl:shrink-0" data-reveal>
        <RuleEyebrow>Our story</RuleEyebrow>
        <h2 className="font-display text-[30px] leading-[36px] font-semibold text-forest md:text-[36px] md:leading-[44px] lg:text-[38px] lg:leading-[46px]">
          The future of fresh food depends <br className="max-md:hidden" />
          on a more connected ecosystem.
        </h2>
        <p className="text-[15px] leading-[24px] font-medium text-body">
          Across Asia Pacific, the fresh food industry is evolving as food security, sustainability, technology, supply chain resilience and cross-border
          trade reshape how food moves from source to market.
        </p>
        <p className="text-[15px] leading-[24px] font-medium text-body">
          Yet the value chain remains fragmented, with producers, suppliers, technology providers, logistics operators, distributors, retailers and buyers
          often working across separate parts of the ecosystem.
        </p>
        <p className="text-[15px] leading-[24px] font-bold text-body">Fresh Food Expo APAC was created to connect the ecosystem.</p>
      </div>

      {/* Image · Fresh lettuce: fill 106.89% tall at −0.09% → cover, top-aligned. */}
      <div
        className="group relative aspect-[576/319] w-full overflow-hidden md:max-w-[576px] xl:max-w-none rounded-[24px] bg-linear-to-b from-mint to-[#c2e3c3] lg:rounded-[30px] xl:aspect-auto xl:h-[319px] xl:min-w-0 xl:flex-1"
        data-reveal
        style={{ "--i": 1 } as CSSProperties}
      >
        <Image
          src={peppers}
          alt="Yellow peppers moving along a sorting conveyor"
          placeholder="blur"
          sizes="(min-width: 1280px) 576px, 100vw"
          className="zoom absolute inset-0 size-full object-cover object-[50%_1.3%]"
        />
      </div>
    </section>
  );
}
