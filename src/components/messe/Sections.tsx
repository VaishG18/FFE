import Image, { type StaticImageData } from "next/image";
import type { CSSProperties } from "react";
import RuleEyebrow from "../story/RuleEyebrow";
import { box } from "../ui";
import external from "@/assets/messe/icon-external.svg";
import curve from "@/assets/messe/curve.svg";
import messe from "@/assets/about/messe.jpg";
import messeLogo from "@/assets/about/messe-logo.png";
import smartHealth from "@/assets/messe/smart-health-asia.png";
import itbAsia from "@/assets/messe/itb-asia.png";
import itbIndia from "@/assets/messe/itb-india.png";
import mice from "@/assets/messe/mice-show-asia.png";
import travelTech from "@/assets/messe/travel-tech-asia.png";
import travelMeet from "@/assets/logo-travel-meet-asia.png";

const i = (n: number) => ({ "--i": n }) as CSSProperties;

// Both text blocks sit at x 100 with 80px right padding: 23px / 3px inside the 1286px column.
const COLUMN = "container-page xl:pr-[3px] xl:pl-[23px]";
const BODY = "text-[16px] leading-[25px] font-medium text-black md:text-[17px] md:leading-[27px]";
const LINK = "font-semibold text-accent underline decoration-from-font underline-offset-2 transition-colors duration-(--dur-ui) hover:text-forest";

/** "For more information: <url>" + 18px external icon, 8px apart (781:1731 / 781:1812). */
function MoreInfo({ href }: { href: string }) {
  return (
    <p className="text-[15px] leading-[24px] font-medium text-black md:text-[16px]">
      For more information:{" "}
      <a href={href} target="_blank" rel="noopener noreferrer" className={`group inline-flex items-center gap-[8px] ${LINK}`}>
        <span>{href}</span>
        <Image
          src={external}
          alt="(opens in a new tab)"
          className="size-[18px] shrink-0 transition-transform duration-(--dur-ui) ease-(--ease-out) group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
        />
      </a>
    </p>
  );
}

/** Messe Berlin Asia Pacific (781:1723): mint → page gradient band, 40px vertical padding, 18px gaps. */
export function MesseAsia() {
  const events = ["Smart Health Asia", "ITB Asia", "ITB India", "MICE Show Asia", "Travel Tech Asia", "Travel Meet Asia"];
  return (
    <section className="untrim bg-linear-to-r from-mint to-page py-[32px] md:py-[40px]">
      <div className={COLUMN}>
        <div className="flex max-w-[1236px] flex-col items-start gap-[18px]">
          <div className="load-in" style={i(0)}>
            <RuleEyebrow>About us</RuleEyebrow>
          </div>
          <h1 className="load-in font-display text-[38px] leading-[42px] font-semibold text-forest md:text-[52px] md:leading-[58px] lg:text-[56px] lg:leading-[60px]" style={i(1)}>
            Messe Berlin Asia Pacific
          </h1>
          <p className={`load-in ${BODY}`} style={i(2)}>
            Messe Berlin Asia Pacific, a subsidiary of Messe Berlin, is a leading organiser of world-class trade fairs across Southeast Asia, India, and
            beyond. Since establishing its regional headquarters in Singapore in 2007, it has been at the forefront of delivering high-impact events that
            cater to the diverse needs of businesses in the region. Its portfolio includes renowned events such as{" "}
            {events.map((e, n) => (
              <span key={e}>
                {/* TODO: event websites. */}
                <a href="#" className={LINK}>
                  {e}
                </a>
                {n < events.length - 2 ? ", " : n === events.length - 2 ? ", and " : "."}
              </span>
            ))}
          </p>
          <div className="load-in" style={i(3)}>
            <MoreInfo href="https://www.messe-berlin.asia" />
          </div>
        </div>
      </div>
    </section>
  );
}

type Logo = { src: StaticImageData; alt: string; img: string; style?: CSSProperties; box?: string };

// Each logo sits in a 125px circle (Smart Health is 126 wide); fills as in Figma 793:3943.
const LOGOS: Logo[] = [
  // Fill 103.09% × 103.81% at (−1.37%, −1.73%).
  { src: smartHealth, alt: "Smart Health Asia", img: "", box: "xl:w-[126px]!", style: { position: "absolute", width: "103.09%", height: "103.81%", left: "-1.37%", top: "-1.73%", maxWidth: "none" } },
  { src: itbAsia, alt: "ITB Asia", img: "size-full object-cover" },
  // Fill 130.58% × 57.53% at (−18.88%, 21.17%): the logo’s true ratio, sides run under the circle mask.
  { src: itbIndia, alt: "ITB India", img: "", style: { position: "absolute", width: "130.58%", height: "57.53%", left: "-18.88%", top: "21.17%", maxWidth: "none" } },
  { src: mice, alt: "MICE Show Asia", img: "size-full object-contain" },
  { src: travelTech, alt: "Travel Tech Asia", img: "size-full object-cover" },
  { src: travelMeet, alt: "Travel Meet Asia", img: "size-full object-contain" },
];

/** Portfolio (793:3942): white band, 28px vertical padding, 125px logos with 3px #e6e6e6 rules, 50px apart at 1440. */
export function Portfolio() {
  return (
    <section aria-label="Messe Berlin Asia Pacific portfolio" className="bg-white py-[24px] lg:py-[28px]">
      <ul className="container-page grid grid-cols-3 justify-items-center gap-y-[20px] lg:flex lg:items-center lg:justify-center lg:gap-[28px] xl:gap-[40px] min-[1370px]:gap-[50px]!">
        {LOGOS.map((l, n) => (
          <li key={l.alt} className="contents">
            {n > 0 && <span aria-hidden className="hidden w-[3px] shrink-0 self-stretch rounded-full bg-[#e6e6e6] lg:-mx-[1.5px] lg:block" />}
            <span
              className={`relative block size-[88px] shrink-0 overflow-hidden rounded-full bg-white md:size-[110px] xl:size-[125px] ${l.box ?? ""}`}
              data-reveal="scale"
              style={i(n)}
            >
              <Image src={l.src} alt={l.alt} sizes="(min-width: 1280px) 164px, 144px" className={l.img} style={l.style} />
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

// Media (781:1794) is a 560×420 frame; the curve and photo overhang its left and top edges.
const m = (l: number, t: number, w: number, h: number) => box(560, 420, l, t, w, h);

/** Messe Berlin (781:1793): 560×420 media + content (flex-1), 64px apart, centred, 48px vertical padding. */
export function MesseBerlin() {
  return (
    <section className="untrim py-[40px] lg:py-[48px]">
      <div className={`${COLUMN} flex flex-col gap-[40px] lg:flex-row lg:items-center lg:gap-[40px] xl:gap-[64px]`}>
        <div className="relative mx-auto aspect-[560/420] w-full max-w-[560px] lg:mx-0 lg:w-[45%] lg:shrink-0 xl:w-[560px]" data-reveal>
          {/* Vector 3 at (−101.01, −43.49), drawn at its natural 725.9×406.2. Hidden at lg–xl, where it would cross the copy beside it. */}
          <Image src={curve} alt="" aria-hidden className="pointer-events-none max-w-none lg:max-xl:hidden" style={m(-101.01, -43.49, 725.902, 406.245)} />
          <div className="group overflow-hidden rounded-[30px] rounded-tr-none bg-linear-to-b from-mint to-[#c2e3c3]" style={m(-5, 19.94, 570, 386)}>
            <Image
              src={messe}
              alt="Berlin Funkturm and the Messe Berlin exhibition grounds at dusk"
              placeholder="blur"
              sizes="(min-width: 1280px) 570px, (min-width: 1024px) 46vw, 100vw"
              className="zoom absolute inset-0 size-full object-cover"
            />
            {/* image 77: 111×31 at (35, 30) of the photo. */}
            <Image src={messeLogo} alt="Messe Berlin" className="absolute object-cover" style={box(570, 386, 35, 30, 111, 31)} />
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col items-start gap-[18px]" data-reveal style={i(1)}>
          <RuleEyebrow>Messe Berlin</RuleEyebrow>
          <h2 className="font-display text-[36px] leading-[40px] font-semibold text-forest md:text-[48px] md:leading-[54px] xl:text-[60px] xl:leading-[66px]">Messe Berlin</h2>
          <p className={BODY}>
            As one of the leading trade fair companies in the world, Messe Berlin has been organising international trade fairs and congresses since 1822.
            The company organises more than 100 regional, national, and international in-house and guest events each year. Messe Berlin’s portfolio
            includes leading international trade shows such as ITB, InnoTrans, and Fruit Logistica. Its international program of trade fairs covers a wide
            range of events – food, travel, logistics, finance, agriculture, healthcare IT, and consumer electronics.
          </p>
          <MoreInfo href="https://www.messe-berlin.de/en" />
        </div>
      </div>
    </section>
  );
}
