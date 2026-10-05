import Image from "next/image";
import type { CSSProperties } from "react";
import photo from "@/assets/about/fruit-logistica.png";
import dots from "@/assets/about/dots.svg";
import flLogo from "@/assets/logo-fruit-logistica.svg";
import CountUp from "../CountUp";
import { box } from "../ui";

const STATS = [
  { n: <CountUp to={2500} suffix="+" group />, label: "Exhibitors" },
  { n: <CountUp to={90000} suffix="+" group />, label: "Trade visitors" },
  { n: <CountUp to={150} suffix="+" />, label: ["Countries", "represented"] },
  { n: "Since 1993", label: ["Organised by", "Messe Berlin"] },
];

// Media collage (736:2363) is a 608×420 frame; shapes overhang its edges.
const m = (l: number, t: number, w: number, h: number) => box(608, 420, l, t, w, h);

export default function FruitLogistica() {
  return (
    <section className="untrim container-narrow mt-[46px] flex flex-col gap-[40px] lg:mt-[74px] lg:flex-row lg:items-center lg:gap-[40px] xl:gap-[72px]">
      <div className="flex flex-col items-start gap-[16px] lg:w-[54%] lg:shrink-0 xl:w-[600px]" data-reveal>
        <p className="text-[15px] leading-[19px] font-medium tracking-[0.02em] text-accent uppercase">Global expertise</p>
        <h2 className="font-display text-[30px] leading-[36px] font-semibold text-forest md:text-[40px] md:leading-[46px] lg:text-[44px] lg:leading-[50px]">
          FRUIT LOGISTICA in <span className="text-accent">Berlin.</span>
        </h2>
        <div className="flex flex-col gap-[12px] text-[15px] leading-[22px] font-medium text-body">
          <p>
            Fresh Food Expo APAC draws on the international fresh produce expertise behind FRUIT LOGISTICA in Berlin, the leading trade show for the
            global fresh produce business.
          </p>
          <p>
            Bringing together the international fresh produce industry across the entire value chain, FRUIT LOGISTICA demonstrates the global reach,
            industry connections and trade fair expertise that Messe Berlin has built over decades.
          </p>
        </div>
        <p className="text-[12px] leading-[15px] font-medium text-body">*Figures below refer to FRUIT LOGISTICA in Berlin and not to Fresh Food Expo APAC.</p>
        {/* Stats (736:2350): 2×2 on phones (as the mobile frame), one row from md. */}
        <dl className="grid w-full grid-cols-2 gap-y-[16px] pt-[10px] whitespace-nowrap md:flex">
          {STATS.map((s, idx) => (
            <div
              key={idx}
              className={`flex flex-col-reverse justify-end gap-[6px] pr-[16px] ${idx % 2 ? "border-l border-[#c2e3c3] pl-[18px]" : ""} ${idx === 2 ? "md:border-l md:border-[#c2e3c3] md:pl-[18px]" : ""} ${idx === 3 ? "md:flex-1" : ""}`}
            >
              <dt className="text-[13px] leading-[17px] font-medium text-body">
                {Array.isArray(s.label) ? (
                  <>
                    {s.label[0]}
                    <br />
                    {s.label[1]}
                  </>
                ) : (
                  s.label
                )}
              </dt>
              <dd className="font-display text-[28px] leading-[34px] font-semibold text-accent">{s.n}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="relative mx-auto aspect-[608/420] w-full max-w-[608px] lg:mx-0 lg:min-w-0 lg:flex-1" data-reveal style={{ "--i": 1 } as CSSProperties}>
        <Image src={dots} alt="" aria-hidden style={m(-10, 160, 61, 75)} />
        <div className="rounded-tr-[90px] rounded-bl-[90px] bg-accent" style={m(496, -21, 130, 150)} aria-hidden />
        <div className="rounded-br-[110px] bg-sun" style={m(464, 296, 170, 140)} aria-hidden />
        <div className="group overflow-hidden rounded-[30px] rounded-bl-none" style={m(20, 8, 568, 400)}>
          <Image
            src={photo}
            alt="Visitors walking towards the Messe Berlin hall in winter"
            placeholder="blur"
            sizes="(min-width: 1024px) 568px, 95vw"
            className="zoom size-full object-cover"
          />
        </div>
        <Image src={flLogo} alt="FRUIT LOGISTICA" style={m(61, 49.68, 131, 44.885)} />
      </div>
    </section>
  );
}
