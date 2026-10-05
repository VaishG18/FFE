import Image from "next/image";
import type { CSSProperties } from "react";
import produce from "@/assets/about/produce.jpg";
import leaf from "@/assets/about/leaf-community.svg";
import CommunityForm from "./CommunityForm";

/** Figma 736:2534: 600px intro card + form card, 24px apart, equal height. */
export default function JoinCommunity() {
  return (
    <section id="community" className="untrim container-narrow mt-[46px] flex flex-col gap-[16px] xl:flex-row xl:items-stretch xl:gap-[24px]">
      <div
        className="relative flex flex-col overflow-hidden rounded-[24px] bg-linear-to-b from-mint to-page lg:rounded-[32px] xl:block xl:w-[600px] xl:shrink-0"
        data-reveal
      >
        <div className="relative px-[24px] pt-[32px] md:px-[40px] md:pt-[40px] xl:absolute xl:inset-x-[48px] xl:top-[48px] xl:p-0">
          <p className="text-[15px] leading-[19px] font-medium tracking-[0.02em] text-accent uppercase">Stay connected</p>
          <h2 className="mt-[14px] font-display text-[30px] leading-[36px] font-semibold text-forest md:text-[40px] md:leading-[46px] lg:mt-[16px] lg:text-[44px] lg:leading-[50px]">
            Join the <span className="text-accent">FFE APAC</span>
            <br />
            community
          </h2>
          <p className="mt-[14px] max-w-[440px] text-[15px] leading-[22px] font-medium text-body lg:mt-[16px]">
            Subscribe to stay connected — be the first to know about new exhibitors, programme announcements and opportunities at Asia’s premier trade
            show connecting the fresh food ecosystem across the source-to-market value chain.
          </p>
        </div>

        {/* Leaf (736:2540): 440×239 rotated -89.24° in a 244.8×443.1 box at (48, 283.68). */}
        <div className="pointer-events-none absolute top-[283.68px] left-[48px] hidden h-[443.121px] w-[244.796px] xl:block" aria-hidden>
          <Image src={leaf} alt="" className="absolute top-1/2 left-1/2 h-[239px] w-[440px] max-w-none -translate-1/2 rotate-[-89.24deg]" />
        </div>
        {/* Photo (736:2539): 379×384 at (221, 336.68), runs off the card's bottom edge. */}
        <div className="relative mt-[24px] ml-auto h-[200px] w-[72%] overflow-hidden rounded-tl-[160px] bg-linear-to-b from-mint to-[#c2e3c3] md:h-[280px] md:w-[379px] md:rounded-tl-[240px] xl:absolute xl:top-[336.68px] xl:left-[221px] xl:mt-0 xl:h-[384px]">
          <Image src={produce} alt="Crowds of visitors at a busy fresh produce exhibition hall" placeholder="blur" sizes="(min-width: 768px) 379px, 72vw" className="size-full object-cover" />
        </div>
      </div>

      <div className="min-w-0 flex-1 rounded-[24px] bg-white px-[22px] py-[28px] md:px-[40px] md:py-[36px] lg:rounded-[32px]" data-reveal style={{ "--i": 1 } as CSSProperties}>
        <CommunityForm />
      </div>
    </section>
  );
}
