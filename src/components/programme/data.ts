// Conference agenda content, verbatim from Figma (736:3572 sessions, 736:3846 / 736:3949 modals).
// Only "Shaping the Future" has named speakers and long copy in the design; the rest fall back to the card copy.

export type Speaker = { id: string; name: string; role: [string, string]; bio?: string[]; linkedin?: string };

export type Session = {
  id: string;
  type: string;
  title: string;
  /** Prev / Next label in the modal. */
  short: string;
  desc: string;
  /** Longer modal copy (falls back to desc). */
  body?: string;
  time: string;
  date: string;
  day: "17 Nov 2027" | "18 Nov 2027";
  place: [string, string?];
  /** Card wording when it differs from the modal. */
  cardPlace?: string;
  track: string;
  audience?: string;
  /** Avatar slots on the card (design placeholders). */
  avatars: number;
  speakers?: string[];
};

export const DAYS = [
  { value: "17 Nov 2027", label: "Wed, 17 Nov 2027" },
  { value: "18 Nov 2027", label: "Thu, 18 Nov 2027" },
] as const;

export const SPEAKERS: Record<string, Speaker> = {
  "emily-tan": {
    id: "emily-tan",
    name: "Dr. Emily Tan",
    role: ["Chief Sustainability Officer", "GreenGrow Asia"],
    bio: [
      "Dr. Emily Tan is Chief Sustainability Officer at GreenGrow Asia, leading the company’s sustainability strategy across its regional operations. With over 15 years of experience in sustainable food systems, she works closely with industry partners, governments and research institutions to advance responsible sourcing, environmental stewardship and resilient supply chains.",
      "Prior to joining GreenGrow Asia, Dr. Tan held senior roles at global agribusiness and sustainability consultancies, supporting businesses across Asia Pacific in developing and implementing sustainable growth strategies.",
      "She holds a PhD in Environmental Sciences from the National University of Singapore and is a regular speaker at international conferences on sustainable agriculture and food systems.",
    ],
    linkedin: "#",
  },
  "rajiv-mehta": { id: "rajiv-mehta", name: "Rajiv Mehta", role: ["Director, Supply Chain", "FreshLink Global"] },
  "sophie-laurent": { id: "sophie-laurent", name: "Sophie Laurent", role: ["Head of Asia Procurement", "Global Fresh Markets"] },
};

export const SESSIONS: Session[] = [
  {
    id: "opening-keynote",
    type: "Keynote",
    title: "Opening Remarks & Opening Keynote",
    short: "Opening Remarks & Keynote",
    desc: "Setting the stage for the future of fresh food in Asia Pacific, with insights from industry leaders on opportunities, challenges and the road ahead.",
    time: "08:45 – 09:45",
    date: "17 Nov 2027",
    day: "17 Nov 2027",
    place: ["Level 3, Begonia Main Ballroom,", "Sands Expo"],
    track: "Key Activities",
    avatars: 2,
  },
  {
    id: "shaping-the-future",
    type: "Panel Discussion",
    title: "Shaping the Future: Key Drivers of Growth in the Fresh Food Economy",
    short: "Shaping the Future",
    desc: "Industry experts discuss how technology, changing consumer demand and regional trade are shaping the next phase of growth.",
    body: "Asia Pacific’s fresh food economy is entering a new phase of growth, driven by rising affluence, stronger connectivity and rapidly evolving consumer expectations. This session brings together industry leaders to discuss the key trends, opportunities and challenges shaping the future of fresh food across the region.",
    time: "10:30 – 11:00",
    date: "17 Nov 2027",
    day: "17 Nov 2027",
    place: ["Knowledge Theatre,", "Hall D, Sands Expo"],
    cardPlace: "Knowledge Theatre, Hall D",
    track: "Fresh Technology",
    audience: "Industry Professionals, Buyers, Exhibitors",
    avatars: 3,
    speakers: ["emily-tan", "rajiv-mehta", "sophie-laurent"],
  },
  {
    id: "sustainable-cold-chain",
    type: "Presentation",
    title: "Sustainable Cold Chain Solutions for a Resilient Fresh Food Supply Chain",
    short: "Sustainable Cold Chain Solutions",
    desc: "Exploring innovative cold chain technologies and infrastructure to reduce losses and ensure food safety across regional markets.",
    time: "11:30 – 12:15",
    date: "17 Nov 2027",
    day: "17 Nov 2027",
    place: ["MICE Show Asia Theatre,", "Hall D"],
    track: "Logistics & Distribution",
    avatars: 2,
  },
  {
    id: "retail-foodservice-demand",
    type: "Panel",
    title: "Meeting Evolving Retail and Foodservice Demand in Asia Pacific",
    short: "Meeting Evolving Retail Demand",
    desc: "How suppliers, retailers and foodservice operators are responding to new consumer trends and market opportunities.",
    time: "14:00 – 14:45",
    date: "17 Nov 2027",
    day: "17 Nov 2027",
    place: ["Level 3, Orchid Room"],
    track: "Market Access",
    avatars: 3,
  },
];

/** Session-type pill colours (Figma 736:3585 / 3626 / 3672 / 3713); mint is the default. */
const TYPE_COLORS: Record<string, string> = {
  Presentation: "bg-[#fff4cc] text-[#8a6100]",
  Panel: "bg-[#e6e6fa] text-[#3b3b98]",
};
export const typeColor = (type: string) => TYPE_COLORS[type] ?? "bg-mint text-forest";

export const TRACKS = [...new Set(SESSIONS.map((s) => s.track))];
