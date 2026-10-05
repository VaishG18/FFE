import type { Metadata } from "next";
import Header from "@/components/Header";
import RevealObserver from "@/components/RevealObserver";
import Footer from "@/components/home/Footer";
import PageHero from "@/components/PageHero";
import HelpCards from "@/components/contact/HelpCards";
import SendMessage from "@/components/contact/SendMessage";
import UsefulResources from "@/components/contact/UsefulResources";
import JoinPanel from "@/components/contact/JoinPanel";
import hero from "@/assets/contact/hero.jpg";

export const metadata: Metadata = {
  title: "Contact Us | Fresh Food Expo APAC",
  description:
    "Get in touch with the Fresh Food Expo APAC team about exhibiting, sponsorship, partnerships or general enquiries. We reply within three business days.",
};

/** Figma 736:2694 (Contact_Us_Desktop). Sections sit 65px apart, as in the frame. */
export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        <PageHero eyebrow="Get in touch" title="Contact Us" img={hero} imgBox="lg:top-[0.03%] lg:left-[37.38%] lg:w-[62.66%]" curveLeft={5} stayHref="/subscribe">
          Whether you’re looking to exhibit, <br className="hidden lg:block" />
          explore a partnership, enquire about sponsorship or simply finding out more about FFE APAC — our team is ready to help. Fill in the form below
          and we’ll be in touch within three business days.
        </PageHero>
        <HelpCards />
        <SendMessage />
        <UsefulResources />
        <JoinPanel />
      </main>
      <Footer mt="mt-[48px] lg:mt-[65px]" />
      <RevealObserver />
    </>
  );
}
