import { CalendarDays, MapPin, Users, Linkedin, ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";

import g1 from "@/assets/g1.webp";
import g2 from "@/assets/g2.webp";
import g3 from "@/assets/g3.webp";
import g4 from "@/assets/g4.webp";
import g5 from "@/assets/g5.webp";
import g6 from "@/assets/g6.webp";
import g7 from "@/assets/g7.webp";
import g8 from "@/assets/g8.webp";
import g9 from "@/assets/g9.webp";
import g10 from "@/assets/g10.webp";
import g11 from "@/assets/g11.webp";
import g12 from "@/assets/g12.webp";
import g13 from "@/assets/g13.webp";
import g14 from "@/assets/g14.webp";
import director1 from "@/assets/mam-1-1.png";
import director2 from "@/assets/gopi-sir-1-1.png";
import director3 from "@/assets/director-3.jpg";

/* ---------------- Conferences ---------------- */

const upcoming = [
  {
    name: "Cyber Resilience Decode",
    date: "Sept 25, 2026",
    place: "Bengaluru, India",
    desc: "Cyber Resilience Decode on 25th September 2026 in Bengaluru",
    banner: "https://apacnewsnetwork.com/wp-content/uploads/2026/09/sify-bangalore.jpeg?v=1789368997",
  },
  {
    name: "The Future of Water Infrastructure",
    date: "30th September 2026",
    place: "Mumbai, India",
    desc: "The Future of Water Infrastructure on 30th September 2026 in Mumbai",
    banner: "https://apacnewsnetwork.com/wp-content/uploads/2026/09/Autodesk_KOLKATA-Mumbai-14_800X400-copyBanner.png?v=1789369018",
  },
  {
    name: "AI for Viksit Bharat@2047 Summit ",
    date: "8th October 2026",
    place: "Uttar Pradesh, India",
    desc: "AI for Viksit Bharat@2047 Summit on 8th October 2026 in Lucknow | Uttar pradesh",
    banner: "https://apacnewsnetwork.com/wp-content/uploads/2026/08/AI-Summit-Lukhnow-_800X400.png?v=1788158954",
  },
  {
    name: "Secure-In 2026",
    date: "25th - 26th November 2026",
    place: "New Delhi, India",
    desc: "Secure-In 2026 on 25th - 26th November 2026 in New Delhi",
    banner: "https://apacnewsnetwork.com/wp-content/uploads/2026/09/Secure-In-800X400@4x.png?v=1788245888",
  },
];





export function Conferences() {
 

  return (
    <section id="conferences" className="section-pad relative overflow-hidden">
      <div className="bg-gradient-soft pointer-events-none absolute -top-40 right-0 h-[480px] w-[480px] rounded-full blur-3xl" />
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">Upcoming Conferences</span>
          <h2 className="mt-5 font-display head-1 font-semibold">
            Where enterprise technology leadership{" "}
            <span className="text-gradient">converges</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-4">
          {upcoming.map((c, i) => (
            <Reveal key={c.name} delay={i * 80}>
              <article className="group glass-panel up-1 flex h-full flex-col overflow-hidden rounded-3xl transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-elegant">
                <div className="relative aspect-[2/1] overflow-hidden">
                  <img
                    src={c.banner}
                    alt={`${c.name} event banner`}
                    loading="lazy"
                    width={800}
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                  <span className="bg-gradient-brand absolute top-4 left-4 inline-flex items-center rounded-full px-3 py-1 font-mono text-[10px] tracking-[0.18em] text-primary-foreground uppercase">
                    Upcoming
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-display up-2 text-xl font-semibold" style={{'font-size':'16px;'}}>{c.name}</h3>
                  <p className="mt-3 up-3 flex-1  text-muted-foreground"style={{'font-size':'13px!important;'}}>
                    {c.desc}
                  </p>
                  <div className=" space-y-2 border-t border-border pt-5  text-muted-foreground ">
                    <p className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-primary" /> {c.date}
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" /> {c.place}
                    </p>
                    
                  </div>
                  <a
                    href="#contact"
                    className="mt-6 inline-flex w-fit rounded-full border border-border px-5 py-2 text-sm font-medium transition-colors group-hover:border-primary/60 hover:bg-secondary"
                  >
                    Register interest
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

       


        
      </div>
    </section>
  );
}

/* ---------------- Gallery (20 images) ---------------- */

const glimpses = [
  { img: g1, alt: "Audience applauding in a packed auditorium"},
  { img: g13, alt: "Panelists on stage at a CIO forum"},
  { img: g4, alt: "Executive speaking at a podium"},
  { img: g5, alt: "Fireside chat between two executives"},
  { img: g12, alt: "Delegate asking a question during Q&A"},
  { img: g10, alt: "Executive strategy workshop"},
  { img: g8, alt: "Delegates networking over coffee"},
  { img: g9, alt: "Business cards exchanged at a summit"},
  { img: g3, alt: "Registration desk at a technology summit"},
  { img: g6, alt: "Technology expo booths at a summit"},
  { img: g2, alt: "Award handover at a leadership awards night" },
  { img: g7, alt: "Group photo of award winners on stage" },
  { img: g11, alt: "Gala dinner ballroom with violet lighting" },
  { img: g14, alt: "Rooftop cocktail reception with skyline view" },
];

interface MarqueeCardProps {
  item: (typeof glimpses)[number];
  index: number;
}

function MarqueeCard({ item, index }: MarqueeCardProps) {
  return (
    <figure className="group relative h-56 w-72 shrink-0 overflow-hidden rounded-xl border border-border bg-card sm:h-64 sm:w-80 [transform:translateZ(0)]">
      <img
        src={item.img}
        alt={item.alt}
        loading="lazy"
        decoding="async" /* Browser ko background me image decode karne deta hai */
        className="h-full w-full object-cover transition-transform duration-500 will-change-transform group-hover:scale-105"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-70" />
      <figcaption className="absolute inset-x-4 bottom-3 flex items-end justify-between gap-3 font-mono text-[11px] uppercase tracking-wider">
        {/* <span className="truncate text-foreground">{item.label || item.alt}</span> */}
        {/* <span className="text-muted-foreground">{String(index + 1).padStart(2, "0")}</span> */}
      </figcaption>
    </figure>
  );
}


export function Gallery() {
  const row1 = glimpses.slice(0, Math.ceil(glimpses.length / 2));
  const row2 = glimpses.slice(Math.ceil(glimpses.length / 2));

  return (
    <section
      id="glimpses"
      className="section-pad relative overflow-hidden border-y border-border bg-surface/40 py-20"
    >
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="eyebrow justify-center">Event Glimpses</span>
            <h2 className="mt-5 font-display head-1 leading-[1.05] font-semibold">
              The energy behind <span className="text-gradient">every gathering</span>
            </h2>
            <p className="mt-5 max-w-xl text-muted-foreground">
              Frames from keynotes, candid exchanges, roundtables, and evenings that
              move enterprise conversations forward.
            </p>
          </div>
        </Reveal>
      </div>

      {/* Marquee Container with side fade masks */}
      <div className="relative mt-12 flex flex-col gap-5 overflow-hidden">
        {/* Left & Right gradient fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background via-background/70 to-transparent sm:w-36" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background via-background/70 to-transparent sm:w-36" />

        {/* Row 1: Leftward scroll */}
        <div className="flex w-fit animate-marquee-left gap-5 hover:[animation-play-state:paused]">
          {[...row1, ...row1].map((g, i) => (
            <MarqueeCard key={`row1-${i}`} item={g} index={i % row1.length} />
          ))}
        </div>

        {/* Row 2: Rightward scroll */}
        <div className="flex w-fit animate-marquee-right gap-5 hover:[animation-play-state:paused]">
          {[...row2, ...row2].map((g, i) => (
            <MarqueeCard key={`row2-${i}`} item={g} index={i % row2.length} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Partner logos (static grid) ---------------- */

interface Partner {
  name: string;
  logo: string;
  invertOnWhite?: boolean;
}

const partners: Partner[] = [
  { name: "Adobe", logo: "/logos/adobe-logo.webp" },
  { name: "Autodesk", logo: "/logos/autodesk-logo.png" },
  { name: "Coursera", logo: "/logos/coursera-logo.jpg" },
  { name: "Dell", logo: "/logos/dell_logo.png" },
  { name: "Fortinet", logo: "/logos/fortinet-logo.svg" },
  { name: "iValue InfoSolutions", logo: "/logos/ivalue-logo.jpg" },
  { name: "Microsoft", logo: "/logos/microsoft-logo.png" },
  { name: "Netskope", logo: "/logos/netskope-logo.svg" },
  { name: "NVIDIA", logo: "/logos/nvidea-logo.png" },
  { name: "OpenText", logo: "/logos/open-text.webp" },
  { name: "Palo Alto Networks", logo: "/logos/pal-alto-logo.webp" },
  { name: "RAH Infotech", logo: "/logos/rah-infotech-logo.png" },
  { name: "Red Hat", logo: "/logos/red-hat-logo.webp" },
  { name: "Sophos", logo: "/logos/saphos-logo.svg", invertOnWhite: true },
  { name: "Schneider Electric", logo: "/logos/schinider-logo.svg" },
  { name: "Siemens", logo: "/logos/siemens-logo.png" },
  { name: "Sify Technologies", logo: "/logos/sify-logo.png" },
  { name: "Thales", logo: "/logos/thals-logo.png" },
  { name: "Trellix", logo: "/logos/trellix-logo.svg" },
  { name: "Underscore", logo: "/logos/underscore-logo.jpg" },
  { name: "Utimaco", logo: "/logos/utimaco-logo-blue.svg" },
  { name: "Yotta", logo: "/logos/yotta-logo.png" },
  { name: "Zoom", logo: "/logos/zoom-logo.jpg" },
];

export function PartnerLogos() {
  return (
    <section id="partner-logos" className="relative overflow-hidden border-y border-border py-20">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-30" />

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="text-center">
          <span className="eyebrow justify-center">Strategic Partners & Sponsors</span>
          <h2 className="mt-4 font-display head-1 font-semibold">
            Trusted by technology <span className="text-gradient">leaders</span>
          </h2>
        </Reveal>

        {/* Viewport showing up to 30 logos before scroll */}
        <div className="mt-12 rounded-2xl border border-border/80 bg-card/40 p-3 sm:p-5 shadow-inner backdrop-blur-sm">
          <div className="max-h-[520px] overflow-y-auto pr-1.5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border hover:scrollbar-thumb-muted-foreground/30">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {partners.map((partner, i) => (
                <Reveal key={partner.name} delay={(i % 6) * 35}>
                  <div
                    title={partner.name}
                    className="flex h-20 w-full items-center justify-center rounded-xl bg-white px-4 py-2 shadow-sm"
                  >
                    <img
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      loading="lazy"
                      className={`h-auto max-h-11 w-full object-contain ${
                        partner.invertOnWhite ? "invert" : ""
                      }`}
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <Reveal delay={120} className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            Building meaningful connections between enterprise decision-makers and
            technology innovators.
          </p>
        </Reveal>
      </div>
    </section>
  );
}



/* ---------------- Team ---------------- */

const team = [
  {
    img: director1,
    name: "Sanghamitra Mohanty",
    role: "Co-founder & Director",
    linkedin: "https://in.linkedin.com/in/mohanty-sanghamitra-apac",
    bio: "Our vision is to make APAC Media platform a vibrant knowledge sharing platform in which communities from world over can engage, discuss and deliberate on various aspects of creating an efficient knowledge economy through innovation & technology.",
  },
  {
    img: director2,
    name: "Gopi Krishna Arora",
    role: " Co-founder & Director",
    linkedin: "https://www.linkedin.com/in/gopiarora?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    bio: "Technology and Communications- these are the two most powerful tools to disseminate information on innovation to change the world. We, at APAC Media, are trying to leverage these powerful tools to bring communities together to create an impact for future by creating awareness on theimportance of tech and innovation for various sectors.",
  },
  // {
  //   img: director3,
  //   name: "Arjun Kapoor",
  //   role: "Director — Partnerships & Growth",
  //   linkedin: "https://www.linkedin.com/company/cxomedia/",
  //   bio: "Arjun drives strategic alliances with global technology brands and India's enterprise innovation ecosystem. He designs partnership programmes that put sponsors in genuine conversation with decision-makers instead of broadcasting at them, and has delivered multi-year engagements for cloud, security and data platform leaders. He also oversees delegate acquisition and regional growth.",
  // },
];

export function Team() {
  return (
    <section id="team" className="section-pad relative overflow-hidden">
      <div className="bg-gradient-soft pointer-events-none absolute top-20 -left-32 h-[420px] w-[420px] rounded-full blur-3xl" />
      <div className="mx-auto max-w-5xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">Our Team</span>
          <h2 className="mt-5 font-display head-1 font-semibold">
            Led by <span className="text-gradient">seasoned visionaries</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            Three directors, decades of experience across enterprise media, technology and
            executive engagement.
          </p>
        </Reveal>

        <div className="mt-14 space-y-6">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 80}>
              <article className="group glass-panel grid gap-7 rounded-3xl p-6 transition-all hover:border-primary/50 hover:shadow-elegant sm:grid-cols-[220px_1fr] sm:p-8">
                <div className="relative overflow-hidden rounded-2xl border border-border shadow-card">
                  <img
                    src={m.img}
                    alt={`${m.name}, ${m.role} at CXO Media`}
                    loading="lazy"
                    width={768}
                    height={960}
                    className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-display text-2xl font-semibold">{m.name}</h3>
                  <p className="text-gradient mt-1 font-mono text-[11px] tracking-[0.16em] uppercase">
                    {m.role}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{m.bio}</p>
                 
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-border px-5 py-2 text-sm font-medium transition-colors hover:border-primary/60 hover:bg-secondary"
                  >
                    <Linkedin className="h-4 w-4 text-primary" />
                    Connect on LinkedIn
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
