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
        <JoinBanner />
        <Newsletter />
        <Partners />
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}
