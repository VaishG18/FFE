import Image, { type StaticImageData } from "next/image";
import type { CSSProperties, ReactNode } from "react";
import heroCurve from "@/assets/about/hero-curve.png";
import chevronSmBrand from "@/assets/chevron-sm-brand.svg";
import chevronSmWhite from "@/assets/chevron-sm-white.svg";
import { Button, DateVenue, crop } from "./ui";

const i = (n: number) => ({ "--i": n }) as CSSProperties;

type Props = {
  eyebrow: string;
  title: ReactNode;
  children: ReactNode;
  img: StaticImageData;
  /** Desktop position of the photo inside the 1395×501 panel (Figma fill box). */
  imgBox: string;
  /** Date + venue block (About only). */
  date?: string;
  /** Left offset of the corner curve (image 78) inside the panel. */
  curveLeft?: number;
  /** "Stay Connected" target; omit to render no CTAs (Subscribe). */
  stayHref?: string;
  /**
   * "compact" = News 736:3042: 426px panel, content at (67, 77), wider gaps, 195×165 curve.
   * "tall" = Subscribe 736:3301: two-line title, content at (69.5, 55), 194.6×165.4 curve.
   */
  size?: "default" | "compact" | "tall";
};

const SIZES = {
  default: { panel: "lg:h-[501px]", curve: "bottom-0 h-[181px] w-[213px]", content: "lg:pt-[80px] lg:pl-[6.5px]", desc: "lg:mt-[31px]", date: "md:mt-[28px]", ctas: "md:mt-[34px]" },
  compact: { panel: "lg:h-[426px]", curve: "bottom-[5px] h-[165px] w-[195px]", content: "lg:pt-[77px] lg:pl-[12.5px]", desc: "lg:mt-[39px]", date: "md:mt-[28px]", ctas: "md:mt-[34px] lg:mt-[39.6px]" },
  tall: { panel: "lg:h-[501px]", curve: "bottom-0 h-[165.352px] w-[194.586px]", content: "lg:pt-[55px] lg:pl-[15px]", desc: "lg:mt-[28px]", date: "md:mt-[28px] lg:mt-[34.6px]", ctas: "" },
};

/**
 * Inner-page hero: 1395×501 brand panel, photo on the right, two 538px fades, three CTAs.
 * Figma 736:2149 (About), 736:2710 (Contact).
 */
export default function PageHero({ eyebrow, title, children, img, imgBox, date, curveLeft = 0, stayHref, size = "default" }: Props) {
  const z = SIZES[size];
  return (
    <section id="top" className="container-wide relative mt-[10px] md:mt-0">
      <div className={`relative overflow-hidden rounded-[20px] bg-brand md:rounded-[24px] lg:rounded-[25px] ${z.panel}`}>
        <div className="absolute inset-0" aria-hidden>
          <Image
            src={img}
            alt=""
            preload
            quality={90}
            placeholder="blur"
            sizes="(min-width: 1024px) 880px, 100vw"
            className={`absolute inset-0 size-full object-cover lg:inset-auto lg:h-full ${imgBox}`}
          />
        </div>
        {/* Below lg: brand green over the photo so white copy stays readable. */}
        <div className="absolute inset-0 bg-linear-to-b from-brand from-35% via-brand/85 to-brand/65 lg:hidden" />
        {/* Desktop: two 538px fades over the photo's left edge. */}
        <div className="absolute inset-y-0 left-[16.7%] hidden w-[38.57%] bg-linear-to-l from-brand/0 to-brand lg:block" />
        <div className="absolute inset-y-0 left-[36.63%] hidden w-[38.57%] bg-linear-to-l from-brand/0 to-brand lg:block" />
        {/* image 78: 213×181 slot, Figma fill crop. */}
        <span className={`pointer-events-none absolute hidden overflow-hidden lg:block ${z.curve}`} style={{ left: curveLeft }} aria-hidden>
          <Image src={heroCurve} alt="" sizes="231px" style={crop(108.45, 101.93, -8.45, 0)} />
        </span>

        <div className={`container-page relative pt-[48px] pb-[56px] text-white md:pt-12 md:pb-16 lg:pb-0 ${z.content}`}>
          <p className="eyebrow load-in" style={i(0)}>
            {eyebrow}
          </p>
          <h1
            className="load-in mt-[22px] font-display text-[30px] leading-[35px] font-semibold tracking-[0.02em] uppercase md:text-[44px] md:leading-[1.08] lg:mt-[31px] lg:text-[50px] lg:leading-[53px]"
            style={i(1)}
          >
            {title}
          </h1>
          <p
            className={`load-in mt-[23px] max-w-[535px] text-[17px] leading-[normal] tracking-[0.02em] md:mt-[22px] md:text-[22px] md:leading-[31px] ${z.desc}`}
            style={i(2)}
          >
            {children}
          </p>
          {date && <DateVenue date={date} className={`load-in mt-[22px] ${z.date}`} style={i(3)} />}

          {stayHref && (
            <div className={`load-in mt-[24px] flex flex-col items-start gap-[11px] md:flex-row md:flex-wrap md:gap-[13px] ${z.ctas}`} style={i(4)}>
              <Button href="/#be-involved" chevron={chevronSmBrand} w={160} h={40} pl={19} gap={6} fs={15} m={{ w: 178, h: 43, pl: 25, gap: 7, fs: 15 }} className="border border-white bg-white text-brand">
                Register to Visit
              </Button>
              <Button href="/#be-involved" chevron={chevronSmWhite} w={162} h={40} pl={19} gap={12} fs={15} m={{ w: 178, h: 43, pl: 25, gap: 9, fs: 15 }} className="border border-white text-white hover:bg-white/10">
                Apply To Exhibit
              </Button>
              <Button href={stayHref} chevron={chevronSmWhite} w={162} h={40} pl={19} gap={14} fs={15} m={{ w: 178, h: 43, pl: 25, gap: 9, fs: 15 }} className="border border-white text-white hover:bg-white/10">
                Stay Connected
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
