"use client";

import Image from "next/image";
import { useState } from "react";
import chevronDownSm from "@/assets/contact/icon-chevron-down-sm.svg";

const DIAL = [
  { code: "+65", country: "Singapore" },
  { code: "+60", country: "Malaysia" },
  { code: "+62", country: "Indonesia" },
  { code: "+66", country: "Thailand" },
  { code: "+84", country: "Vietnam" },
  { code: "+63", country: "Philippines" },
  { code: "+91", country: "India" },
  { code: "+86", country: "China" },
  { code: "+852", country: "Hong Kong" },
  { code: "+81", country: "Japan" },
  { code: "+82", country: "South Korea" },
  { code: "+61", country: "Australia" },
  { code: "+64", country: "New Zealand" },
];

/** Phone Input (Figma 736:2787 / 736:3395): SG flag, dial code, divider, number. */
export default function PhoneInput() {
  const [dial, setDial] = useState("+65");
  return (
    <span className="input gap-[10px] pr-[16px] pl-[14px]">
      {dial === "+65" && (
        <span className="flex h-[15px] w-[22px] shrink-0 flex-col overflow-hidden rounded-[2px] border border-[#e0e0e0]" aria-hidden>
          <span className="h-1/2 bg-[#ef3340]" />
          <span className="h-1/2 bg-white" />
        </span>
      )}
      {/* Shows just the code, as in Figma; the transparent native select on top lists the countries. */}
      <span className="relative flex shrink-0 items-center gap-[10px] text-[14px] leading-[19px] text-black">
        {dial}
        <Image src={chevronDownSm} alt="" className="size-[14px]" />
        <select
          name="dialCode"
          value={dial}
          onChange={(e) => setDial(e.target.value)}
          aria-label="Country calling code"
          className="absolute inset-0 cursor-pointer opacity-0"
        >
          {DIAL.map((d) => (
            <option key={d.code} value={d.code}>
              {d.country} ({d.code})
            </option>
          ))}
        </select>
      </span>
      <span className="h-[22px] w-px shrink-0 bg-[#e0e0e0]" aria-hidden />
      <input
        name="phone"
        type="tel"
        required
        autoComplete="tel-national"
        placeholder="8123 4567"
        className="h-full min-w-0 flex-1 bg-transparent leading-[19px] outline-none placeholder:text-field"
      />
    </span>
  );
}
