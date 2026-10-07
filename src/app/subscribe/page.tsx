import type { Metadata } from "next";
import Header from "@/components/Header";
import RevealObserver from "@/components/RevealObserver";
import Footer from "@/components/home/Footer";
import PageHero from "@/components/PageHero";
import SubscribeSection from "@/components/subscribe/SubscribeSection";
import hero from "@/assets/subscribe/hero.jpg";

export const metadata: Metadata = {
  title: "Subscribe | Fresh Food Expo APAC",
  description:
    "Join the FFE APAC community: be the first to know about new exhibitors, programme announcements, networking opportunities and industry news.",
};

/** Figma 736:3286 (Subscribe_Desktop), content and media per revision 495:2222. */
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
          // Fill 68.67% × 114.84% at (36.7%, −7.44%): the true ratio of the photo.
          imgBox="lg:top-[-7.44%] lg:left-[36.7%] lg:h-[114.84%]! lg:w-[68.67%] lg:max-w-none"
          date="16–18 November 2027"
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
