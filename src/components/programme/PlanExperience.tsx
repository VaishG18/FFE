import Image, { type StaticImageData } from "next/image";
import type { CSSProperties } from "react";
import calendar from "@/assets/programme/s-calendar.svg";
import users from "@/assets/programme/s-users.svg";
import bulb from "@/assets/programme/s-bulb.svg";
import globe from "@/assets/programme/s-globe.svg";

const STATS: { label: [string, string]; icon: StaticImageData }[] = [
  { label: ["3", "Days of Insights"], icon: calendar },
  { label: ["Industry", "Experts"], icon: users },
  { label: ["Key Trends", "& Innovations"], icon: bulb },
  { label: ["Global", "Perspectives"], icon: globe },
];

/** Figma 736:3523: 1360px mint panel — copy (flex-1) + four 140×124 stat tiles. */
export default function PlanExperience() {
  return (
    <section className="untrim mx-auto mt-[24px] w-[min(1360px,100%-2*var(--gutter))] lg:mt-[36.3px]">
      <div className="flex flex-col gap-[28px] rounded-[24px] bg-linear-to-r from-mint to-[#eef6ef] px-[22px] py-[32px] md:px-[36px] lg:rounded-[30px] xl:flex-row xl:items-center xl:gap-[40px] xl:py-[36px] xl:pr-[36px] xl:pl-[52px]">
        <div className="flex min-w-0 flex-1 flex-col gap-[12px]" data-reveal>
          <h2 className="font-display text-[30px] leading-[36px] font-semibold text-forest md:text-[38px] md:leading-[44px]">
            Plan Your <span className="text-accent">Conference</span> Experience
          </h2>
          <div className="flex flex-col gap-[10px] text-[15px] leading-[23px] font-medium text-body">
            <p>Explore the sessions most relevant to your business and make the most of your time at Fresh Food Expo APAC 2027.</p>
            <p>The conference agenda is subject to change. Additional sessions and speakers will be announced as the programme develops.</p>
          </div>
        </div>
        <ul className="grid grid-cols-2 gap-[12px] sm:grid-cols-4 xl:flex xl:shrink-0">
          {STATS.map((s, idx) => (
            <li
              key={s.label.join(" ")}
              className="lift flex h-[124px] flex-col items-center gap-[12px] rounded-[18px] bg-white px-[12px] py-[20px] text-center xl:w-[140px]"
              data-reveal
              style={{ "--i": idx } as CSSProperties}
            >
              <Image src={s.icon} alt="" className="size-[36px]" />
              <span className="text-[14px] leading-[18px] font-medium text-forest">
                {s.label[0]}
                <br />
                {s.label[1]}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
