import Image from "next/image";
import logo from "@/assets/logo.png";
import linkedin from "@/assets/social-linkedin.png";
import instagram from "@/assets/social-instagram.png";
import youtube from "@/assets/social-youtube.png";
import FooterNav from "./FooterNav";

const SOCIAL = [
  { label: "LinkedIn", icon: linkedin },
  { label: "Instagram", icon: instagram },
  { label: "YouTube", icon: youtube },
];

export default function Footer() {
  return (
    <footer id="contact" className="container-page mt-[47px] pb-[38px] md:mt-20 md:pb-10 lg:mt-[96px] lg:pb-[48px]">
      <div className="flex flex-col md:gap-12 lg:flex-row lg:gap-0">
        <div className="ml-[3px] md:ml-0 lg:w-[240px] lg:shrink-0 lg:pt-[8px] xl:w-[346px]">
          <Image src={logo} alt="Fresh Food Expo Asia Pacific" sizes="131px" className="h-[90px] w-[131px] object-cover object-right" />
          <p className="text-lead mt-[21px] max-w-[245px] text-[18px]">Asia Pacific&apos;s premier trade fair for fresh food</p>
          <ul className="mt-[23px] flex gap-[7px]">
            {SOCIAL.map((s) => (
              <li key={s.label}>
                <a
                  href="#"
                  aria-label={s.label}
                  className="block rounded-md transition-transform duration-(--dur-ui) ease-(--ease-out) hover:-translate-y-[2px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
                >
                  <Image src={s.icon} alt="" sizes="29px" className="size-[29px]" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <FooterNav />
      </div>

      <div className="mt-10 hidden h-px bg-black/50 md:block lg:mt-[18px]" />
      {/* Phones (318:2086–318:2088): policies first, then organiser and copyright, left-aligned. */}
      <div className="text-lead mt-[30px] ml-[3px] flex flex-col items-start md:mt-[26px] md:ml-0 md:items-center md:gap-4 md:text-center lg:mt-[24.5px] lg:flex-row lg:justify-between lg:text-left">
        <p className="mt-[34px] md:mt-0 xl:w-[245px]">Organised by Messe Berlin</p>
        <p className="mt-[23px] md:mt-0 xl:w-[400px]">© 2027 Fresh Food Expo APAC. All rights reserved</p>
        {/* Figma text box is 387px wide on mobile, a touch wider than the 385px column. */}
        <p className="order-first -mr-[4px] -ml-px whitespace-pre-wrap md:order-none md:mx-0 xl:w-[412px]">
          <a href="#" className="footer-link">Privacy Policy</a>
          {"  |  "}
          <a href="#" className="footer-link">Terms &amp; Conditions</a>
          {" | "}
          <a href="#" className="footer-link">Cookies Policy</a>
        </p>
      </div>
    </footer>
  );
}
