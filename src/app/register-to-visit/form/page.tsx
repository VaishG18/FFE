import type { Metadata } from "next";
import Header from "@/components/Header";
import RevealObserver from "@/components/RevealObserver";
import Footer from "@/components/home/Footer";
import PageHero from "@/components/PageHero";
import hero from "@/assets/visit/hero.jpg";

export const metadata: Metadata = {
  title: "Visitor Registration | Fresh Food Expo APAC",
  description:
    "Register as a trade visitor to Fresh Food Expo APAC. 16–18 November 2027, Sands Expo & Convention Centre, Singapore.",
};

const FORM = "https://forms.cloud.microsoft/r/M2XNWa49UM";

/** No Figma frame: Apply to Exhibit hero + a white card holding the Microsoft Forms embed. */
export default function VisitorFormPage() {
  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        <PageHero
          size="apply"
          title={
            <>
              Register as a <br className="max-lg:hidden" />
              Trade Visitor
            </>
          }
          img={hero}
          imgBox="lg:top-[-78.32%] lg:left-[16.45%] lg:h-[202.03%]! lg:w-[104.03%] lg:max-w-none"
          curveLeft={3.39}
        />

        {/* Full-bleed on phones: Microsoft swaps the form for a "Fill in the form" button when the frame is under ~330px wide. */}
        <section className="mx-auto mt-[32px] overflow-hidden bg-white sm:w-[min(1360px,100%-2*var(--gutter))] sm:rounded-[24px] md:mt-[40px] md:rounded-[28px]" data-reveal>
          {/* ponytail: MS Forms can't auto-size cross-origin and runs ~13000px, so the iframe fills the screen under the sticky header and scrolls inside. */}
          <iframe src={`${FORM}?embed=true`} title="Trade visitor registration form" className="block h-[max(520px,calc(100svh-var(--header-h)-24px))] w-full border-0" allowFullScreen />
        </section>
        <p className="untrim mx-auto mt-[16px] w-[min(1360px,100%-2*var(--gutter))] text-center text-[15px] leading-[22px] font-medium text-body">
          Trouble viewing the form?{" "}
          <a href={FORM} target="_blank" rel="noopener" className="font-semibold text-accent underline underline-offset-4">
            Open it in a new tab
          </a>
        </p>
      </main>
      <Footer mt="mt-[64px] lg:mt-[112px]" />
      <RevealObserver />
    </>
  );
}
