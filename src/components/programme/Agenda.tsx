"use client";

import Image from "next/image";
import { useMemo, useState, useSyncExternalStore } from "react";
import clock from "@/assets/programme/icon-clock.svg";
import dot from "@/assets/programme/dot.svg";
import image from "@/assets/programme/icon-image.svg";
import tag from "@/assets/programme/icon-tag.svg";
import pin from "@/assets/programme/icon-pin.svg";
import heart from "@/assets/programme/icon-heart.svg";
import heartOn from "@/assets/programme/icon-heart-on.svg";
import search from "@/assets/news/icon-search.svg";
import chevronDown from "@/assets/programme/icon-chevron-down-16.svg";
import { DAYS, SESSIONS, SPEAKERS, TRACKS, type Session, typeColor } from "./data";
import { SessionModal, SpeakerModal } from "./Modals";

const SAVED_KEY = "ffe-saved-sessions";

// Saved sessions: a per-browser convenience in localStorage (may be unavailable).
const readSaved = () => {
  try {
    return localStorage.getItem(SAVED_KEY) ?? "[]";
  } catch {
    return "[]";
  }
};
const subscribeSaved = (cb: () => void) => {
  addEventListener("storage", cb);
  addEventListener(SAVED_KEY, cb);
  return () => {
    removeEventListener("storage", cb);
    removeEventListener(SAVED_KEY, cb);
  };
};
const toggleSaved = (id: string) => {
  const prev: string[] = JSON.parse(readSaved());
  try {
    localStorage.setItem(SAVED_KEY, JSON.stringify(prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  } catch {}
  dispatchEvent(new Event(SAVED_KEY));
};

// The open session lives in the URL (#session-<id>): shareable, and Back closes it.
const subscribeHash = (cb: () => void) => {
  addEventListener("hashchange", cb);
  return () => removeEventListener("hashchange", cb);
};
const openSession = (id: string | null, replace = false) => {
  if (id) {
    if (replace) location.replace(`#session-${id}`);
    else location.hash = `session-${id}`;
  } else {
    history.replaceState(null, "", location.pathname + location.search);
    dispatchEvent(new HashChangeEvent("hashchange"));
  }
};

/** Figma 736:3554: filters, session list, click-through modals (736:3845). Filtering is client-side. */
export default function Agenda() {
  const [day, setDay] = useState<string>("All");
  const [track, setTrack] = useState("");
  const [q, setQ] = useState("");
  const savedRaw = useSyncExternalStore(subscribeSaved, readSaved, () => "[]");
  const saved = useMemo<string[]>(() => JSON.parse(savedRaw), [savedRaw]);
  const hash = useSyncExternalStore(
    subscribeHash,
    () => location.hash,
    () => "",
  );
  const openId = hash.startsWith("#session-") ? hash.slice(9) : null;
  const [speakerId, setSpeakerId] = useState<string | null>(null);

  const query = q.trim().toLowerCase();
  const list = SESSIONS.filter(
    (s) =>
      (day === "All" || s.day === day) &&
      (!track || s.track === track) &&
      (!query || [s.title, s.desc, s.track, s.type, ...(s.speakers ?? []).map((id) => SPEAKERS[id].name)].join(" ").toLowerCase().includes(query)),
  );

  const session = SESSIONS.find((s) => s.id === openId) ?? null;
  const nav = list.some((s) => s.id === openId) ? list : SESSIONS;
  const idx = session ? nav.indexOf(session) : -1;

  return (
    <section className="untrim container-narrow pt-[32px] pb-[40px] lg:pt-[36px] lg:pb-[58px]">
      <div className="flex flex-col gap-[14px] xl:flex-row xl:items-center xl:gap-[10px]">
        <ul className="flex flex-wrap gap-[10px]" aria-label="Filter by day">
          {[{ value: "All", label: "All" }, ...DAYS].map((d) => (
            <li key={d.value}>
              <button
                type="button"
                aria-pressed={day === d.value}
                onClick={() => setDay(d.value)}
                className={`tap min-h-[42px] rounded-full px-[20px] text-[14px] leading-[18px] font-medium transition-colors duration-(--dur-ui) ${
                  day === d.value ? "bg-accent text-white" : "border border-[#d9e6db] bg-white text-black hover:border-accent hover:bg-mint"
                }`}
              >
                {d.label}
              </button>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-[10px] sm:flex-row xl:ml-auto">
          <label className="input h-[46px] gap-[10px] border-[#d9e6db] sm:flex-1 xl:w-[400px] xl:flex-none">
            <span className="sr-only">Search sessions</span>
            <Image src={search} alt="" className="size-[20px] shrink-0" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search sessions, speakers or topics…"
              className="h-full min-w-0 flex-1 bg-transparent leading-[18px] outline-none placeholder:text-field"
            />
          </label>
          <label className="relative block sm:w-[170px] sm:shrink-0">
            <span className="sr-only">Filter by track</span>
            <select
              value={track}
              onChange={(e) => setTrack(e.target.value)}
              className="input h-[46px] cursor-pointer appearance-none border-[#d9e6db] pr-[40px] pl-[16px]"
            >
              <option value="">All Tracks</option>
              {TRACKS.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
            <Image src={chevronDown} alt="" className="pointer-events-none absolute top-[15px] right-[14px] size-[16px]" />
          </label>
        </div>
      </div>

      {/* Revealed as one block: cards re-mount when filters change, after the observer has run. */}
      <div className="mt-[20px]" data-reveal>
        {list.length ? (
          <ul className="flex flex-col gap-[14px]">
            {list.map((s) => (
              <li key={s.id}>
                <SessionCard s={s} saved={saved.includes(s.id)} onSave={() => toggleSaved(s.id)} onOpen={() => openSession(s.id)} />
              </li>
            ))}
          </ul>
        ) : (
          <p role="status" className="rounded-[18px] bg-white px-6 py-16 text-center text-[17px] leading-[24px] font-medium text-body">
            No sessions match your filters yet. More sessions will be announced as the programme develops.
          </p>
        )}
      </div>

      <SessionModal
        session={session}
        prev={idx > 0 ? nav[idx - 1] : undefined}
        next={idx >= 0 && idx < nav.length - 1 ? nav[idx + 1] : undefined}
        saved={!!session && saved.includes(session.id)}
        onSave={() => session && toggleSaved(session.id)}
        onGo={(id) => openSession(id, true)}
        onSpeaker={setSpeakerId}
        onClose={() => openSession(null)}
      />
      <SpeakerModal speakerId={speakerId} onClose={() => setSpeakerId(null)} />
    </section>
  );
}

function SessionCard({ s, saved, onSave, onOpen }: { s: Session; saved: boolean; onSave: () => void; onOpen: () => void }) {
  return (
    <article className="lift group relative flex flex-col gap-[14px] rounded-[18px] bg-white px-[20px] py-[20px] drop-shadow-[0_12px_16px_rgb(3_41_26/0.1)] lg:flex-row lg:items-stretch lg:gap-0 lg:py-[22px] lg:pr-[28px] lg:pl-[24px]">
      <div className="flex items-start gap-[10px] pr-[36px] lg:w-[170px] lg:shrink-0 lg:pr-0">
        <Image src={clock} alt="" className="size-[18px] shrink-0" />
        <p className="flex flex-col gap-[2px] whitespace-nowrap">
          <span className="text-[14px] leading-[18px] font-semibold text-black">{s.time}</span>
          <span className="text-[12px] leading-[16px] font-medium text-body">{s.date}</span>
        </p>
      </div>
      <div className="hidden w-[24px] shrink-0 flex-col items-center pt-[6px] lg:flex" aria-hidden>
        <Image src={dot} alt="" className="size-[9px]" />
        <span className="w-[1.5px] flex-1 bg-[#c2e3c3]" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col items-start gap-[8px] lg:pr-[24px] lg:pl-[20px]">
        <span className={`rounded-full px-[10px] py-[4px] text-[11px] leading-[14px] font-semibold tracking-[0.04em] uppercase ${typeColor(s.type)}`}>
          {s.type}
        </span>
        <h3 className="text-[18px] leading-[24px] font-semibold text-black">
          {/* Stretched button: the whole card opens the session details. */}
          <button
            type="button"
            onClick={onOpen}
            aria-haspopup="dialog"
            className="text-left transition-colors duration-(--dur-ui) group-hover:text-forest after:absolute after:inset-0 after:rounded-[18px] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-forest"
          >
            {s.title}
          </button>
        </h3>
        <p className="text-[14px] leading-[21px] font-medium text-body">{s.desc}</p>
        <div className="flex flex-wrap items-center gap-[8px] pt-[6px]">
          {Array.from({ length: s.avatars }, (_, i) => (
            <span
              key={i}
              className="flex size-[34px] items-center justify-center rounded-full border-2 border-white bg-linear-to-b from-mint to-[#c2e3c3]"
              aria-hidden
            >
              <Image src={image} alt="" className="size-[14.4px]" />
            </span>
          ))}
          <span className="flex items-center gap-[6px] rounded-full bg-[#f2f2f2] py-[6px] pr-[12px] pl-[10px] text-[12px] leading-[16px] font-medium text-body">
            <Image src={tag} alt="" className="size-[14px]" />
            {s.track}
          </span>
        </div>
      </div>
      <div className="flex flex-col justify-between gap-[12px] lg:w-[230px] lg:shrink-0">
        <p className="flex items-start gap-[8px] text-[13px] leading-[18px] font-medium text-body">
          <Image src={pin} alt="" className="size-[16px] shrink-0" />
          <span>{s.cardPlace ?? s.place.filter(Boolean).join(" ")}</span>
        </p>
        <button
          type="button"
          onClick={onSave}
          aria-pressed={saved}
          aria-label={saved ? `Remove “${s.title}” from saved sessions` : `Save “${s.title}”`}
          className="absolute top-[12px] right-[12px] z-10 grid size-[44px] place-items-center rounded-full transition-transform duration-(--dur-ui) ease-(--ease-out) hover:scale-110 active:scale-95 lg:relative lg:top-auto lg:right-auto lg:-mr-[11px] lg:-mb-[11px] lg:self-end"
        >
          <Image src={saved ? heartOn : heart} alt="" className="size-[22px]" />
        </button>
      </div>
    </article>
  );
}
