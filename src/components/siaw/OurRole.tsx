import Image, { type StaticImageData } from "next/image";
import { Fragment, type CSSProperties } from "react";
import ring from "@/assets/siaw/ring.svg";
import arrow from "@/assets/siaw/arrow.svg";
import imgFresh from "@/assets/siaw/card-fresh.jpg";
import imgAgri from "@/assets/siaw/card-agri.jpg";
import imgLogistics from "@/assets/eco-logistics.jpg";
import iconFresh from "@/assets/icon-fresh-food.png";
import iconAgri from "@/assets/icon-agri-tech.png";
import iconLogistics from "@/assets/icon-logistics.png";
import { Pill } from "../ui";

type Card = { title: string; items: string; img: StaticImageData; alt: string; pos: string; icon: StaticImageData; ring: [number, number] };

// Figma 453:4707 / 453:4724 / 453:4741. Ring (60.71 circle, 68.71 svg with shadow) sits at
// (26, 142) on the first card and (22, 136) on the other two; icon 32.52px, 14.09/13.5 inside it.
const CARDS: Card[] = [
  {
    title: "Fresh Food",
    items: "Fruit & Vegetables  ·  Meat & Poultry  ·  Seafood  · Eggs & Dairy",
    img: imgFresh,
    alt: "Worker sorting fresh vegetables at a packing station",
    pos: "object-center",
    icon: iconFresh,
    ring: [26, 142],
  },
  {
    title: "Agri & Fresh Technology",
    items: "Agri-Tech  ·  Digital Solutions  ·  Preservation  · Packaging",
    img: imgAgri,
    alt: "Robotic arm tending leafy greens in a vertical farm",
    pos: "object-center",
    icon: iconAgri,
    ring: [22, 136],
  },
  {
    title: "Logistics & Distribution",
    items: "Distribution & Supply Chain  ·  Cold Chain  ·  \nFreight & Transportation  ·  Storage & Warehousing",
    img: imgLogistics,
    alt: "Refrigerated truck being loaded with fresh produce at a cold storage facility",
    // Figma fill: 129.02% tall at −3.49% → cover, 11% down.
    pos: "object-[50%_11%]",
    icon: iconLogistics,
    ring: [22, 136],
  },
];

/** Figma 453:4699: header, three 332px cards with 18px arrows (12px gaps), closing line, CTA. */
export default function OurRole() {
  return (
    <section className="untrim container-narrow mt-[48px] flex flex-col items-start gap-[16px] lg:mt-[65px]">
      <div className="flex flex-col items-start gap-[16px]" data-reveal>
        <p className="text-[15px] leading-[19px] font-medium tracking-[0.02em] text-accent uppercase">Our role</p>
        <h2 className="font-display text-[30px] leading-[36px] font-semibold text-forest md:text-[40px] md:leading-[46px] lg:text-[44px] lg:leading-[50px]">
          <span className="text-accent">Fresh Food Expo APAC</span> at SIAW 2027
        </h2>
        <p className="max-w-[1046px] text-[17px] leading-[23px] font-medium text-body md:text-[18px]">
          Within SIAW, Fresh Food Expo APAC serves as the dedicated B2B trade platform for the fresh food ecosystem, connecting
        </p>
      </div>

      <div className="flex w-full flex-col items-center pt-[16px] pb-[8px] lg:flex-row lg:items-stretch lg:gap-[12px]">
        {CARDS.map((c, idx) => (
          <Fragment key={c.title}>
            {idx > 0 && (
              <div className="flex h-[44px] items-center justify-center lg:h-auto" aria-hidden>
                <Image src={arrow} alt="" className="rotate-90 lg:rotate-0" />
              </div>
            )}
            <div className="w-full max-w-[520px] lg:max-w-none lg:min-w-0 lg:flex-1" data-reveal style={{ "--i": idx } as CSSProperties}>
              <article className="lift group relative flex h-full min-h-[332px] flex-col overflow-hidden rounded-[24px] bg-white">
                <div className="relative h-[170px] shrink-0 overflow-hidden bg-linear-to-b from-mint to-[#c2e3c3]">
                  <Image src={c.img} alt={c.alt} placeholder="blur" sizes="(min-width: 1024px) 400px, (min-width: 520px) 520px, 100vw" className={`zoom absolute inset-0 size-full object-cover ${c.pos}`} />
                </div>
                <Image src={ring} alt="" className="absolute max-w-none" style={{ left: c.ring[0] - 4, top: c.ring[1] }} />
                <Image src={c.icon} alt="" sizes="33px" className="absolute size-[32.52px]" style={{ left: c.ring[0] + 14.09, top: c.ring[1] + 13.5 }} />
                <div className="flex flex-col gap-[12px] px-[26px] pt-[44px] pb-[28px]">
                  <h3 className="font-display text-[26px] leading-[32px] font-semibold text-accent">{c.title}</h3>
                  <p className="text-[15px] leading-[23px] font-medium text-body lg:whitespace-pre-wrap">{c.items}</p>
                </div>
              </article>
            </div>
          </Fragment>
        ))}
      </div>

      <p className="text-[17px] leading-[23px] font-medium text-body md:text-[18px]" data-reveal>
        By bringing these sectors together, Fresh Food Expo APAC creates a one-stop platform for suppliers, solution providers, buyers and industry
        stakeholders to source, discover, connect and build new partnerships.
      </p>
      <div className="pt-[8px]" data-reveal>
        <Pill href="/#ecosystem" className="bg-accent text-white max-md:px-[18px]">
          Explore the Fresh Food Ecosystem
        </Pill>
      </div>
    </section>
  );
}
