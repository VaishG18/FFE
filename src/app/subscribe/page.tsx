import type { Metadata } from "next";
import Header from "@/components/Header";
import RevealObserver from "@/components/RevealObserver";
import Footer from "@/components/home/Footer";
import PageHero from "@/components/PageHero";
import SubscribeSection from "@/components/subscribe/SubscribeSection";
import hero from "@/assets/about/hero.jpg";

export const metadata: Metadata = {
  title: "Subscribe | Fresh Food Expo APAC",
  description:
    "Join the FFE APAC community: be the first to know about new exhibitors, programme announcements, networking opportunities and industry news.",
};

/** Figma 736:3286 (Subscribe_Desktop). */
export default function SubscribePage() {
  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        <PageHero
          size="tall"
          eyebrow="Stay connected"
          title={
            <>
              Join the FFE APAC <br className="hidden lg:block" />
              community
            </>
          }
          img={hero}
          imgBox="lg:top-[-0.09%] lg:left-[36.93%] lg:w-[63.04%]"
          date="17–18 November 2027"
        >
          Subscribe to stay connected — be the first to know about new exhibitors, programme announcements and opportunities at Asia’s premier trade show
          connecting the fresh food ecosystem across the source-to-market value chain.
        </PageHero>
        <SubscribeSection />
      </main>
      {/* Section has 64px bottom padding in Figma; footer content starts 20px into its frame. */}
      <Footer mt="mt-[48px] lg:mt-[84px]" />
      <RevealObserver />
    </>
  );
}
