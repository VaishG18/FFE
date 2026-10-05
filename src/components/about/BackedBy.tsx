import Image from "next/image";
import type { CSSProperties } from "react";
import messe from "@/assets/about/messe.jpg";
import messeLogo from "@/assets/about/messe-logo.png";
import { Pill, box } from "../ui";

// Media (736:2468) is a 600×380 frame.
const m = (l: number, t: number, w: number, h: number) => box(600, 380, l, t, w, h);

export default function BackedBy() {
  return (
    <section className="untrim container-narrow mt-[46px] flex flex-col gap-[32px] lg:mt-[61px] lg:flex-row lg:items-center lg:gap-[40px] xl:gap-[72px]">
      <div className="relative aspect-[600/380] w-full max-w-[600px] lg:w-[48%] lg:shrink-0 xl:w-[600px]" data-reveal>
        <div className="rounded-[30px] rounded-bl-[120px] bg-accent" style={m(0, 0, 298, 230)} aria-hidden />
        <div className="group overflow-hidden rounded-[30px] rounded-tr-none bg-linear-to-b from-mint to-[#c2e3c3]" style={m(30, 26, 570, 340)}>
          <Image
            src={messe}
            alt="Berlin Funkturm and the Messe Berlin exhibition grounds at dusk"
            placeholder="blur"
            sizes="(min-width: 1024px) 570px, 95vw"
            className="zoom absolute inset-0 size-full object-cover"
          />
          <Image src={messeLogo} alt="Messe Berlin" className="absolute top-[6.96%] left-[4.21%] h-auto w-[19.47%]" />
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col items-start gap-[16px]" data-reveal style={{ "--i": 1 } as CSSProperties}>
        <p className="text-[15px] leading-[19px] font-medium tracking-[0.02em] text-accent uppercase">Organiser</p>
        <h2 className="font-display text-[30px] leading-[36px] font-semibold text-forest md:text-[40px] md:leading-[46px] lg:text-[44px] lg:leading-[50px]">
          Backed by <span className="text-accent">Messe Berlin.</span>
        </h2>
        <div className="flex flex-col gap-[12px] text-[15px] leading-[22px] font-medium text-body">
          <p>Fresh Food Expo APAC is organised by Messe Berlin, one of the world’s leading trade fair companies.</p>
          <p>
            With decades of international exhibition expertise and a global network spanning industries and markets, Messe Berlin creates professional
            platforms that bring industries together, facilitate international business and connect markets.
          </p>
          <p>
            Fresh Food Expo APAC brings this international trade fair expertise to Singapore, creating a dedicated platform built around the
            opportunities and priorities of Asia Pacific’s fresh food ecosystem.
          </p>
        </div>
        <div className="pt-[6px]">
          <Pill href="#" className="border-[1.5px] border-accent bg-mint text-accent">
            Discover Messe Berlin
          </Pill>
        </div>
      </div>
    </section>
  );
}
