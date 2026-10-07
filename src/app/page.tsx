import Header from "@/components/Header";
import RevealObserver from "@/components/RevealObserver";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Siaw from "@/components/home/Siaw";
import Ecosystem from "@/components/home/Ecosystem";
import BeInvolved from "@/components/home/BeInvolved";
import Organiser from "@/components/home/Organiser";
import JoinBanner from "@/components/home/JoinBanner";
import Newsletter from "@/components/home/Newsletter";
import Partners from "@/components/home/Partners";
import Footer from "@/components/home/Footer";

export default function Home() {
  return (
    <>
      <Header />
      {/* Phones use flex so JoinBanner/Newsletter can follow Partners, as in the mobile frame. */}
      <main className="flex flex-col overflow-x-clip md:block">
        <Hero />
        <About />
        <Siaw />
        <Ecosystem />
        <BeInvolved />
        <Organiser />
        <JoinBanner date="16-18 Nov. 2027" />
        <Newsletter />
        <Partners />
      </main>
      {/* Footer logo 12px lower than the shared default (Figma 621:791 at y 5947). */}
      <Footer mt="mt-[47px] md:mt-20 lg:mt-[108px]" />
      <RevealObserver />
    </>
  );
}
