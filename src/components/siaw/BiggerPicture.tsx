import Image from "next/image";
import type { CSSProperties } from "react";
import tomatoes from "@/assets/siaw/tomatoes.jpg";

/** Figma 453:4675: 1360px card (white → #eef6ef), 560px copy, 48px gap, photo fills the rest at 398px. */
export default function BiggerPicture() {
  return (
    <section className="untrim mx-auto mt-[48px] w-[min(1360px,100%-2*var(--gutter))] lg:mt-[65px]">
      <div className="flex flex-col gap-[32px] rounded-[24px] bg-linear-to-r from-white to-[#eef6ef] px-[24px] py-[32px] md:p-[40px] lg:rounded-[36px] xl:flex-row xl:items-center xl:gap-[48px] xl:py-[40px] xl:pr-[40px] xl:pl-[48px]">
        <div className="flex flex-col items-start gap-[16px] xl:w-[560px] xl:shrink-0" data-reveal>
          <p className="text-[15px] leading-[19px] font-medium tracking-[0.02em] text-accent uppercase">The bigger picture</p>
          <h2 className="font-display text-[30px] leading-[36px] font-semibold text-forest md:text-[40px] md:leading-[46px] lg:text-[44px] lg:leading-[50px]">
            Bringing the <span className="text-accent">Agri-Food</span>
            <br className="max-md:hidden" /> <span className="text-accent">Ecosystem</span> Together.
          </h2>
          <div className="flex flex-col gap-[14px] text-[15px] leading-[24px] font-medium text-body">
            <p>
              Singapore International Agri-Food Week brings together stakeholders from across the agri-food ecosystem to address shared priorities
              including food security, climate resilience, innovation and stronger regional supply chains.
            </p>
            <p className="xl:max-w-[550px]">
              Through its programme of events and activities, SIAW creates opportunities for government, industry, researchers, investors and innovators
              to exchange ideas, build partnerships and explore new opportunities for collaboration.
            </p>
          </div>
        </div>

        {/* Image · SIAW exhibition (453:4684): portrait fill at 236.09% height, top −100.7% → cover at 74% down. */}
        <div
          className="group relative aspect-[664/398] w-full overflow-hidden rounded-[20px] bg-linear-to-b from-mint to-[#c2e3c3] lg:rounded-[30px] xl:aspect-auto xl:h-[398px] xl:min-w-0 xl:flex-1"
          data-reveal
          style={{ "--i": 1 } as CSSProperties}
        >
          <Image
            src={tomatoes}
            alt="Vine tomatoes moving along a blue conveyor in a packing line"
            placeholder="blur"
            sizes="(min-width: 1280px) 664px, 100vw"
            className="zoom absolute inset-0 size-full object-cover object-[50%_74%]"
          />
        </div>
      </div>
    </section>
  );
}
