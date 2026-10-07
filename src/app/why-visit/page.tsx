import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import RevealObserver from "@/components/RevealObserver";
import Footer from "@/components/home/Footer";
import PageHero, { HeroCtas } from "@/components/PageHero";
import JoinBanner from "@/components/home/JoinBanner";
import { Connections, Intro, Products, Technologies } from "@/components/why/Sections";
import hero from "@/assets/about/hero.jpg";
import calendar from "@/assets/exhibit/icon-calendar.svg";
import pin from "@/assets/exhibit/icon-pin.svg";

export const metadata: Metadata = {
  title: "Why Visit | Fresh Food Expo APAC",
  description:
    "Fresh Food Expo APAC brings together suppliers, solution providers and industry professionals in one dedicated B2B platform – giving visitors direct access to new products, partners and commercial opportunities.",
};

const VENUE = [
  { icon: calendar, text: "16–18 November 2027" },
  { icon: pin, text: "Sands Expo & Convention Centre, Singapore" },
];

/** Figma 869:402 (Why_Visit_Desktop). */
export default function WhyVisitPage() {
  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        <PageHero
          size="why"
          title="Why Visit"
          img={hero}
          imgBox="lg:top-[-31.52%] lg:left-[17.42%] lg:h-[207.73%]! lg:w-[82.6%] lg:max-w-none"
          curveLeft={3.89}
          cta={
            <>
              {/* Date & Venue (869:783): 24px icons, 12px gap, 18/23 semibold, rows 10px apart, 4px padding, 4px right of the title. */}
              <ul className="flex flex-col gap-[10px] py-[4px] lg:ml-[4px]">
                {VENUE.map((v) => (
                  <li key={v.text} className="flex items-center gap-[12px]">
                    <Image src={v.icon} alt="" className="shrink-0" />
                    <span className="text-[17px] leading-[23px] font-semibold text-white md:text-[18px]">{v.text}</span>
                  </li>
                ))}
              </ul>
              <HeroCtas stayHref="/subscribe" className="mt-[24px] md:mt-[29px]" />
            </>
          }
        />

        <Intro />
        <Products />
        <Technologies />
        <Connections />

        {/* Figma 869:908: 446px banner, no eyebrow, two-line title, three-line lead; 43px below the last row. */}
        <JoinBanner
          layout="mt-[48px] h-[760px] lg:mt-[43px] lg:h-[446px]"
          imgCls="lg:top-[-8.98%] lg:left-[23.85%] lg:h-[134.08%] lg:w-[78.64%]"
          inner="lg:pt-[54px] lg:pb-0 lg:pl-[14.5px]"
          title={
            <>
              Be part of Asia Pacific’s <br className="max-md:hidden" />
              fresh food ecosystem.
            </>
          }
          titleCls="md:max-w-[751px]! lg:ml-[5px]"
          lead="Join buyers, sourcing professionals, distributors, retailers, foodservice operators and industry stakeholders looking to connect with the businesses shaping the region’s fresh food sector."
          leadMt="lg:mt-[27.21px] lg:ml-[1px] md:max-w-[679px]!"
          dateCls="mt-[25px] md:mt-[34px] lg:mt-[25.83px]"
          date="16-18 Nov. 2027"
          ctas={<HeroCtas stayHref="/subscribe" className="mt-[23px] md:mt-[25px]" />}
        />
      </main>
      {/* Footer content (869:606) sits 30px into its frame, 32px below the banner. */}
      <Footer mt="mt-[48px] lg:mt-[62px]" />
      <RevealObserver />
    </>
  );
}
