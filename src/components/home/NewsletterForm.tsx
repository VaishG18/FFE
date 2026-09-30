"use client";

import Image from "next/image";
import { useEffect, useState, type CSSProperties, type FormEvent } from "react";
import mail from "@/assets/icon-mail.png";
import { Chevron } from "../ui";
import chevronWhite from "@/assets/chevron-white.svg";

/** UI-only newsletter form: native validation + a success state, no submission.
    Phones (Figma 318:2889): email only, with Subscribe overlapping the field's right end. */
export default function NewsletterForm() {
  const [done, setDone] = useState(false);
  const [phone, setPhone] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767.98px)");
    const sync = () => setPhone(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // TODO: wire to the newsletter provider.
    setDone(true);
  };

  if (done) {
    return (
      <p role="status" className="fade-in text-lead mt-[22px] flex min-h-[56px] items-center gap-3 rounded-[999px] bg-mint px-6 text-forest md:mt-[25px]">
        Thanks for subscribing — we’ll keep you posted on Fresh Food Expo APAC.
      </p>
    );
  }

  const subscribeVars = {
    "--w": "181px",
    "--h": "56px",
    "--pl": "41px",
    "--gap": "18.66px",
    "--fs": "18px",
    "--mw": "121.6px",
    "--mh": "43.7px",
    "--mpl": "27.5px",
    "--mgap": "6.9px",
    "--mfs": "12.09px",
    "--mcs": 0.67,
  } as CSSProperties;

  return (
    <form onSubmit={onSubmit} className="mt-[22px] md:mt-[25px]">
      <div className="relative flex md:flex-row md:gap-[8px]">
        {/* Name 215→195 / email 250→270 vs Figma so the longer email placeholder fits; row width unchanged. */}
        <label className="field hidden w-[195px] shrink-0 pl-[23px] md:flex">
          <span className="sr-only">Your name</span>
          <Image src={mail} alt="" sizes="24px" className="size-[24px] shrink-0" />
          <input
            name="name"
            required={!phone}
            autoComplete="name"
            placeholder="your name"
            className="h-full w-full min-w-0 rounded-r-[999px] bg-transparent pr-4 pl-[12px] text-[18px] font-medium text-body outline-none"
          />
        </label>
        <label className="field h-[43.7px] w-[359.5px] max-w-[calc(100%-27.5px)] border-[rgb(205_205_205/0.67)] pl-[18px] md:h-[56px] md:w-[270px] md:max-w-none md:shrink-0 md:border-field md:pl-[18.86px]">
          <span className="sr-only">Your email address</span>
          <Image src={mail} alt="" sizes="23px" className="size-[15.2px] shrink-0 md:size-[22.28px]" />
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Enter your email address"
            className="h-full w-full min-w-0 rounded-r-[999px] bg-transparent pr-[100px] pl-[7.8px] text-[13px] font-medium text-body outline-none md:pr-3 md:pl-[11.86px] md:text-[18px]"
          />
        </label>
        <button type="submit" data-m="" className="btn absolute top-0 right-0 bg-brand text-white md:static" style={subscribeVars}>
          <span className="trim">Subscribe</span>
          <Chevron src={chevronWhite} />
        </button>
      </div>

      <label className="mt-[22px] ml-[2px] flex max-w-[385px] cursor-pointer md:ml-0 items-start gap-[8px] md:mt-[29px] md:max-w-[559px]">
        <input type="checkbox" required className="checkbox" />
        <span className="trim mt-px block text-[12px] leading-[normal] font-medium text-body">
          By submitting this form, I consent to the organisers of Fresh Food Expo Asia Pacific collecting, using, processing and/or disclosing my
          personal information for communications and activities relating to its affiliates, partners and related events, including event updates,
          industry news, products and services, promotions, and other marketing communications.
        </span>
      </label>
    </form>
  );
}
