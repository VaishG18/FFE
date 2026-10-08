"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import chevronLeft from "@/assets/programme/m-chevron-left.svg";
import chevronRight from "@/assets/programme/m-chevron-right.svg";
import close from "@/assets/programme/icon-close.svg";
import calendar from "@/assets/contact/icon-calendar.svg";
import pin from "@/assets/programme/m-pin.svg";
import heart from "@/assets/programme/m-heart.svg";
import heartOn from "@/assets/programme/m-heart-on.svg";
import image from "@/assets/programme/m-image.svg";
import tag from "@/assets/programme/m-tag.svg";
import users from "@/assets/programme/m-users.svg";
import share from "@/assets/programme/icon-share.svg";
import linkedin from "@/assets/programme/icon-linkedin.svg";
import { SPEAKERS, type Session, typeColor } from "./data";

/** Native <dialog>: Esc, focus trapping and the top layer come for free; clicking the backdrop closes. */
function Dialog({
  open,
  onClose,
  label,
  className,
  children,
}: {
  open: boolean;
  onClose: () => void;
  label: string;
  className: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);
  return (
    <dialog
      ref={ref}
      aria-label={label}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className={`modal m-auto max-h-[calc(100dvh-32px)] w-[calc(100%-24px)] overflow-y-auto rounded-[20px] bg-white text-left shadow-[0_16px_20px_rgb(0_0_0/0.12)] ${className}`}
    >
      {children}
    </dialog>
  );
}

const CloseButton = ({ onClose, className }: { onClose: () => void; className: string }) => (
  <button
    type="button"
    onClick={onClose}
    aria-label="Close"
    className={`absolute grid size-[44px] place-items-center rounded-full transition-colors hover:bg-mint ${className}`}
  >
    <Image src={close} alt="" className="size-[20px]" />
  </button>
);

type SessionModalProps = {
  session: Session | null;
  prev?: Session;
  next?: Session;
  saved: boolean;
  onSave: () => void;
  onGo: (id: string) => void;
  onSpeaker: (id: string) => void;
  onClose: () => void;
};

/** Figma 736:3846 — 760px session details. */
export function SessionModal({ session: s, prev, next, saved, onSave, onGo, onSpeaker, onClose }: SessionModalProps) {
  const [copied, setCopied] = useState(false);

  const onShare = async () => {
    if (!s) return;
    const url = `${location.origin}${location.pathname}#session-${s.id}`;
    try {
      if (navigator.share) await navigator.share({ title: s.title, url });
      else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {} // Share sheet dismissed.
  };

  const speakers = (s?.speakers ?? []).map((id) => SPEAKERS[id]);

  return (
    <Dialog open={!!s} onClose={onClose} label={s?.title ?? "Session details"} className="max-w-[760px]">
      {s && (
        // key: replay the entrance when stepping Previous / Next.
        <div key={s.id} className="modal-body relative flex flex-col items-start gap-[18px] px-[20px] pt-[24px] pb-[28px] md:px-[28px]">
          <CloseButton onClose={onClose} className="top-[6px] right-[8px]" />

          <nav aria-label="Other sessions" className="flex w-full items-center justify-between gap-[12px] pr-[30px]">
            {prev ? (
              <button type="button" onClick={() => onGo(prev.id)} className="group flex max-w-[calc(50%-6px)] min-w-0 items-center gap-[8px] text-left">
                <Image src={chevronLeft} alt="" className="size-[18px] shrink-0 transition-transform group-hover:-translate-x-[2px]" />
                <span className="flex min-w-0 flex-col gap-px">
                  <span className="text-[13px] leading-[16px] font-semibold text-black">Previous</span>
                  <span className="max-w-full truncate text-[11px] leading-[14px] font-medium text-body">{prev.short}</span>
                </span>
              </button>
            ) : (
              <span />
            )}
            {next && (
              <button type="button" onClick={() => onGo(next.id)} className="group flex max-w-[calc(50%-6px)] min-w-0 items-center gap-[8px] text-right">
                <span className="flex min-w-0 flex-col items-end gap-px">
                  <span className="text-[13px] leading-[16px] font-semibold text-black">Next</span>
                  <span className="max-w-full truncate text-[11px] leading-[14px] font-medium text-body">{next.short}</span>
                </span>
                <Image src={chevronRight} alt="" className="size-[18px] shrink-0 transition-transform group-hover:translate-x-[2px]" />
              </button>
            )}
          </nav>

          <div className="flex w-full flex-wrap items-center gap-x-[20px] gap-y-[12px]">
            <p className="flex items-center gap-[12px] border-[#e0e0e0] pr-[20px] text-[13px] leading-[17px] font-medium text-black sm:border-r">
              <Image src={calendar} alt="" className="size-[26px] shrink-0" />
              <span className="flex flex-col gap-[2px]">
                <span>{s.date}</span>
                <span>{s.time} (UTC+8)</span>
              </span>
            </p>
            <p className="flex items-center gap-[12px] pr-[20px] text-[13px] leading-[17px] font-medium text-black">
              <Image src={pin} alt="" className="size-[26px] shrink-0" />
              <span className="flex flex-col gap-[2px]">
                {s.place.filter(Boolean).map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </span>
            </p>
            <button
              type="button"
              onClick={onSave}
              aria-pressed={saved}
              aria-label={saved ? "Remove from saved sessions" : "Save session"}
              className="-m-[10px] ml-auto grid size-[44px] place-items-center rounded-full transition-transform duration-(--dur-ui) ease-(--ease-out) hover:scale-110 active:scale-95"
            >
              <Image src={saved ? heartOn : heart} alt="" className="size-[24px]" />
            </button>
          </div>

          <span className={`rounded-full px-[10px] py-[4px] text-[11px] leading-[14px] font-semibold tracking-[0.04em] uppercase ${typeColor(s.type)}`}>
            {s.type}
          </span>
          <h2 className="max-w-[520px] text-[22px] leading-[28px] font-semibold text-black md:text-[24px] md:leading-[30px]">{s.title}</h2>
          <p className="text-[15px] leading-[23px] font-medium text-body">{s.body ?? s.desc}</p>

          <h3 className="text-[17px] leading-[22px] font-semibold text-black">Speakers</h3>
          {speakers.length ? (
            <ul className="grid w-full gap-[16px] sm:grid-cols-3 sm:gap-[20px]">
              {speakers.map((sp) => (
                <li key={sp.id}>
                  <button
                    type="button"
                    onClick={() => onSpeaker(sp.id)}
                    aria-haspopup="dialog"
                    className="group flex w-full items-start gap-[12px] text-left"
                  >
                    <span className="flex size-[80px] shrink-0 items-center justify-center rounded-[12px] border-2 border-transparent bg-linear-to-b from-mint to-[#c2e3c3] transition-colors duration-(--dur-ui) group-hover:border-accent group-focus-visible:border-accent">
                      <Image src={image} alt="" className="size-[24px]" />
                    </span>
                    <span className="flex min-w-0 flex-col gap-[3px]">
                      <span className="text-[14px] leading-[18px] font-semibold text-black group-hover:text-forest">{sp.name}</span>
                      <span className="text-[12px] leading-[16px] font-medium text-body">
                        {sp.role[0]}
                        <br />
                        {sp.role[1]}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[14px] leading-[21px] font-medium text-body">Speakers will be announced as the programme develops.</p>
          )}

          <span className="h-px w-full bg-[#e0e0e0]" aria-hidden />

          <div className="flex w-full flex-col gap-[20px] sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-[12px]">
              <h3 className="text-[17px] leading-[22px] font-semibold text-black">Session Details</h3>
              <Detail icon={tag} label="Track" value={s.track} />
              {s.audience && <Detail icon={users} label="Audience" value={s.audience} />}
            </div>
            <button
              type="button"
              onClick={onShare}
              className="flex items-center gap-[8px] self-start rounded-full border-[1.5px] border-accent bg-page py-[12px] pr-[24px] pl-[22px] text-[14px] leading-[18px] font-semibold text-accent transition-colors duration-(--dur-ui) hover:bg-mint sm:self-auto"
            >
              <Image src={share} alt="" className="size-[18px]" />
              <span aria-live="polite">{copied ? "Link copied" : "Share Session"}</span>
            </button>
          </div>
        </div>
      )}
    </Dialog>
  );
}

const Detail = ({ icon, label, value }: { icon: typeof tag; label: string; value: string }) => (
  <p className="flex items-center gap-[12px]">
    <Image src={icon} alt="" className="size-[20px] shrink-0" />
    <span className="flex flex-col gap-px">
      <span className="text-[13px] leading-[17px] font-semibold text-black">{label}</span>
      <span className="text-[12px] leading-[16px] font-medium text-body">{value}</span>
    </span>
  </p>
);

/** Figma 736:3949 — 520px speaker bio, opens on top of the session modal. */
export function SpeakerModal({ speakerId, onClose }: { speakerId: string | null; onClose: () => void }) {
  const sp = speakerId ? SPEAKERS[speakerId] : null;
  return (
    <Dialog open={!!sp} onClose={onClose} label={sp?.name ?? "Speaker"} className="max-w-[520px]">
      {sp && (
        <div className="modal-body relative flex flex-col items-start gap-[14px] px-[24px] pt-[44px] pb-[36px] md:px-[36px]">
          <CloseButton onClose={onClose} className="top-[12px] right-[12px]" />
          <span className="flex size-[120px] items-center justify-center rounded-full bg-linear-to-b from-mint to-[#c2e3c3]" aria-hidden>
            <Image src={image} alt="" className="size-[24px]" />
          </span>
          <div className="flex flex-col gap-[2px] text-black">
            <h2 className="text-[20px] leading-[26px] font-semibold">{sp.name}</h2>
            <p className="text-[15px] leading-[20px] font-medium">
              {sp.role[0]}
              <br />
              {sp.role[1]}
            </p>
          </div>
          <div className="flex flex-col gap-[12px] text-[15px] leading-[22px] font-medium text-body">
            {(sp.bio ?? ["A full biography will be published soon."]).map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          {sp.linkedin && (
            <a
              href={sp.linkedin}
              aria-label={`${sp.name} on LinkedIn`}
              className="grid size-[36px] place-items-center rounded-[6px] bg-accent transition-transform duration-(--dur-ui) ease-(--ease-out) hover:-translate-y-[2px]"
            >
              <Image src={linkedin} alt="" className="size-[22px]" />
            </a>
          )}
        </div>
      )}
    </Dialog>
  );
}
