import Image from "next/image";
import type { CSSProperties } from "react";
import venue from "@/assets/siaw/venue.jpg";

/** Figma 913:1115: 1280×488 panel, copy at (78, 83), venue collage on the right from xl. */
export default function BroaderImpact() {
  return (
    <section className="untrim container-narrow mt-[48px] lg:mt-[65px]">
      <div className="relative overflow-hidden rounded-[24px] bg-linear-to-r from-mint to-page lg:rounded-[32px] xl:min-h-[488px]">
        {/* Collage (913:1122), anchored to the panel's right edge; the bottom shape runs 14px past it. */}
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[527px] xl:block" aria-hidden>
          <div className="absolute top-0 right-0 h-[321.983px] w-[380.525px] rounded-tl-[292.711px] bg-accent" />
          <div className="absolute top-[64px] right-0 h-[424.431px] w-[526.88px] overflow-hidden rounded-tl-[46.834px] rounded-tr-[263.44px] rounded-bl-[292.711px] bg-linear-to-b from-mint to-[#c2e3c3]">
            {/* Fill: 137.48% wide at −37.54% → cover, right-aligned. */}
            <Image src={venue} alt="" placeholder="blur" sizes="527px" className="size-full object-cover object-[100%_0%]" />
          </div>
          <div className="absolute top-[399.55px] right-[271.85px] h-[102.449px] w-[175.627px] rounded-t-[102.449px] bg-[rgb(40_174_61/0.9)]" />
        </div>

        {/* Copy column ends 38px before the 527px collage (637px at 1440). */}
        <div className="relative flex flex-col items-start gap-[16px] px-[24px] py-[36px] lg:px-[52px] lg:py-[48px] xl:pt-[83px] xl:pr-[565px] xl:pl-[78px]" data-reveal>
          <p className="text-[15px] leading-[19px] font-medium tracking-[0.02em] text-accent uppercase">Broader impact</p>
          <h2 className="max-w-[540px] font-display text-[30px] leading-[36px] font-semibold text-forest md:text-[40px] md:leading-[46px] xl:text-[46px] xl:leading-[52px]">
            Where Industry,
            <br className="max-md:hidden" /> Innovation &amp; Trade
            <br className="max-md:hidden" /> Connect.
          </h2>
          <p className="max-w-[637px] text-[17px] leading-[23px] font-medium text-body md:text-[18px]">
            Together, Fresh Food Expo APAC and Singapore International Agri-Food Week bring business, trade, innovation and the wider agri-food ecosystem
            together, creating opportunities for knowledge exchange, industry collaboration and new partnerships across Asia Pacific.
          </p>
        </div>

        {/* Below xl the photo sits under the copy, as on the About page. */}
        <div className="relative h-[200px] md:h-[280px] xl:hidden" data-reveal style={{ "--i": 1 } as CSSProperties}>
          <Image src={venue} alt="" aria-hidden placeholder="blur" sizes="100vw" className="size-full object-cover" />
          <div className="absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-mint to-mint/0" />
        </div>
      </div>
    </section>
  );
}
