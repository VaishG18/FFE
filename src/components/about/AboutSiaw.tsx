import Image from "next/image";
import siaw from "@/assets/about/siaw.jpg";
import { Pill } from "../ui";

/** Figma 736:2219: 560×428 photo, 72px gap, content column. */
export default function AboutSiaw() {
  return (
    <section className="untrim container-narrow mt-[46px] flex flex-col gap-[32px] lg:flex-row lg:items-center lg:gap-[40px] xl:gap-[72px]">
      <div
        className="relative aspect-[560/428] w-full overflow-hidden rounded-[24px] rounded-bl-none bg-[#d9d9d9] lg:w-[44%] lg:shrink-0 xl:w-[560px] lg:rounded-[30.474px] lg:rounded-bl-none"
        data-reveal
      >
        <Image
          src={siaw}
          alt="Drought-cracked earth, a forest under smoke and a flooded village side by side"
          placeholder="blur"
          sizes="(min-width: 1024px) 560px, 100vw"
          className="zoom absolute inset-0 size-full object-cover"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col items-start gap-[16px]" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
        <p className="text-[15px] leading-[19px] font-medium tracking-[0.02em] text-accent uppercase">Part of</p>
        <h2 className="h-section trim max-w-[525px] lg:min-h-[98px]">
          Singapore International <br className="hidden lg:block" />
          Agri-Food Week.
        </h2>
        <div className="flex flex-col gap-[12px] text-[15px] leading-[22px] font-medium text-body">
          <p>
            Fresh Food Expo APAC is part of Singapore International Agri-Food Week (SIAW) 2027, bringing together government, industry, innovation and
            business to advance a more sustainable, resilient and connected food future in Asia.
          </p>
          <p>
            Within SIAW, Fresh Food Expo APAC serves as the dedicated B2B trade platform for the fresh food ecosystem, connecting fresh food, agri and
            fresh technology, logistics and distribution.
          </p>
        </div>
        <p className="text-[15px] leading-[22px] font-semibold text-black">
          Supported by Singapore Food Agency, Enterprise Singapore and Singapore Tourism Board.*
        </p>
        <div className="pt-[6px]">
          <Pill href="/siaw" className="border-[1.5px] border-accent bg-mint text-accent lg:max-xl:h-auto lg:max-xl:min-h-[52px] lg:max-xl:py-[12px] lg:max-xl:whitespace-normal">
            <span className="md:hidden">Discover SIAW 2027</span>
            <span className="max-md:hidden">Discover Singapore International Agri-Week 2027</span>
          </Pill>
        </div>
      </div>
    </section>
  );
}
