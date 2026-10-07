import Image from "next/image";
import tma from "@/assets/logo-travel-meet-asia.png";

// Design uses "Travel Meet Asia" as a placeholder for every partner logo.
const logo = { src: tma, alt: "Travel Meet Asia" };

const GROUPS = [
  // before: previous row → label pill; gapTop: pill → logo row.
  // Mobile values from Figma 318:2853–318:2882, desktop from 359:445–359:476.
  // count/mCount: logos shown on desktop / in the mobile frame (placeholders — replace with the real partner lists).
  { title: "SUPPORTED BY", count: 4, mCount: 4, before: "mt-[23px] md:mt-12 lg:mt-[37px]", gapTop: "mt-[12px] md:mt-8 lg:mt-[22px]" },
  { title: "SUPPORTING ORGANISATION", count: 10, mCount: 8, before: "mt-[25px] md:mt-12 lg:mt-[48px]", gapTop: "mt-[12px] md:mt-8 lg:mt-[28px]" },
  { title: "media partners", count: 5, mCount: 4, before: "mt-[22px] md:mt-12 lg:mt-[40px]", gapTop: "mt-[13px] md:mt-8 lg:mt-[28px]" },
];

function Logo({ className = "" }: { className?: string }) {
  return <Image src={logo.src} alt={logo.alt} sizes="132px" className={`object-cover md:h-[79px] md:w-[132px] ${className}`} />;
}

export default function Partners() {
  return (
    <section className="container-page mt-[58px] md:mt-16 lg:mt-[74px]" aria-label="Partners">
      <div className="flex flex-wrap justify-between gap-y-10 pl-[24px] md:justify-center md:gap-x-[313px] md:pl-0" data-reveal>
        {[
          ["Held In", "Held In"],
          // Copy differs: mobile frame 318:2850 vs desktop 359:443.
          ["In CONJUNCTION WITH", "Partner Event"],
        ].map(([mobile, desktop]) => (
          <div key={desktop} className="flex flex-col items-center">
            <p className="eyebrow text-accent">
              <span className="md:hidden">{mobile}</span>
              <span className="hidden md:inline">{desktop}</span>
            </p>
            <Logo className="mt-[23px] h-[54px] w-[90px] md:mt-[30px]" />
          </div>
        ))}
      </div>

      {GROUPS.map((g) => (
        <div key={g.title} className={g.before} data-reveal>
          <div className="relative mx-auto flex h-[28px] w-[min(755px,100%)] items-center justify-center">
            <span className="absolute inset-x-0 top-1/2 h-px bg-accent/47" aria-hidden />
            <h2 className="eyebrow relative bg-page pr-[7px] pl-[8px] text-accent">{g.title}</h2>
          </div>
          {/* Mobile: 4-up grid of 86×52 logos; desktop: centred rows of 132×79. */}
          <ul
            className={`mx-auto grid max-w-[900px] grid-cols-[repeat(4,minmax(0,86px))] justify-between gap-x-[6px] gap-y-[16px] pl-[3px] md:flex md:flex-wrap md:justify-center md:gap-x-[60px] md:gap-y-[28px] md:pl-0 ${g.gapTop}`}
          >
            {Array.from({ length: g.count }, (_, i) => (
              <li key={i} className={i >= g.mCount ? "max-md:hidden" : ""}>
                {/* Columns shrink below 86px on narrow phones; the logo keeps its 86:52 box. */}
                <Logo className="aspect-[86/52] h-auto w-full max-w-[86px]" />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
