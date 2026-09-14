import { useMemo, useState } from "react";
import { CalendarDays, MapPin, Users, Linkedin, ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import heroImg from "@/assets/hero-conference.jpg";
import roundtableImg from "@/assets/about-roundtable.jpg";
import networkingImg from "@/assets/event-networking.jpg";
import panelImg from "@/assets/event-panel.jpg";
import dinnerImg from "@/assets/event-dinner.jpg";
import speakerImg from "@/assets/event-speaker.jpg";
import bannerCio from "@/assets/banner-cio.jpg";
import bannerCiso from "@/assets/banner-ciso.jpg";
import bannerAi from "@/assets/banner-ai.jpg";
import g1 from "@/assets/g1.jpg";
import g2 from "@/assets/g2.jpg";
import g3 from "@/assets/g3.jpg";
import g4 from "@/assets/g4.jpg";
import g5 from "@/assets/g5.jpg";
import g6 from "@/assets/g6.jpg";
import g7 from "@/assets/g7.jpg";
import g8 from "@/assets/g8.jpg";
import g9 from "@/assets/g9.jpg";
import g10 from "@/assets/g10.jpg";
import g11 from "@/assets/g11.jpg";
import g12 from "@/assets/g12.jpg";
import g13 from "@/assets/g13.jpg";
import g14 from "@/assets/g14.jpg";
import director1 from "@/assets/director-1.jpg";
import director2 from "@/assets/director-2.jpg";
import director3 from "@/assets/director-3.jpg";

/* ---------------- Conferences ---------------- */

const upcoming = [
  {
    name: "CIO Leadership Summit 2026",
    date: "Nov 12–13, 2026",
    place: "New Delhi, India",
    desc: "India's premier gathering of CIOs and IT decision-makers on enterprise AI, cloud and digital resilience.",
    seats: "250+ CXOs",
    banner: bannerCio,
  },
  {
    name: "CISO Security Forum",
    date: "Dec 09, 2026",
    place: "Mumbai, India",
    desc: "A closed-door forum for cybersecurity leaders on zero-trust, AI-driven threats and board-level risk.",
    seats: "120+ CISOs",
    banner: bannerCiso,
  },
  {
    name: "Enterprise AI & Data Conclave",
    date: "Feb 18, 2027",
    place: "Bengaluru, India",
    desc: "Data, analytics and AI leaders decode real-world enterprise AI adoption, governance and ROI.",
    seats: "200+ Leaders",
    banner: bannerAi,
  },
];

type PastEvent = { name: string; month: string; year: string; place: string };

const past: PastEvent[] = [
  { name: "Digital Transformation Summit", month: "Mar", year: "2026", place: "Hyderabad" },
  { name: "CXO Power Roundtable", month: "Feb", year: "2026", place: "Gurugram" },
  { name: "Cloud Modernisation Forum", month: "Feb", year: "2026", place: "Pune" },
  { name: "Data Leaders Conclave", month: "Jan", year: "2026", place: "Bengaluru" },
  { name: "CISO Trust Summit", month: "Jan", year: "2026", place: "Mumbai" },
  { name: "AI in BFSI Symposium", month: "Jan", year: "2026", place: "Mumbai" },
  { name: "Enterprise Tech Leadership Night", month: "Dec", year: "2025", place: "Mumbai" },
  { name: "CIO Innovation Awards", month: "Dec", year: "2025", place: "New Delhi" },
  { name: "Future of Work Roundtable", month: "Nov", year: "2025", place: "Chennai" },
  { name: "Zero Trust Security Forum", month: "Nov", year: "2025", place: "Bengaluru" },
  { name: "Manufacturing 4.0 Summit", month: "Oct", year: "2025", place: "Ahmedabad" },
  { name: "Healthcare Digital Conclave", month: "Oct", year: "2025", place: "Hyderabad" },
  { name: "Retail Tech Leadership Forum", month: "Sep", year: "2025", place: "Mumbai" },
  { name: "SaaS & Platform Engineering Meet", month: "Sep", year: "2025", place: "Bengaluru" },
  { name: "CXO Networking Gala", month: "Aug", year: "2025", place: "Goa" },
  { name: "Digital Banking Summit", month: "Aug", year: "2025", place: "Mumbai" },
  { name: "Observability & DevOps Forum", month: "Jul", year: "2025", place: "Pune" },
  { name: "GenAI Adoption Roundtable", month: "Jul", year: "2025", place: "Gurugram" },
  { name: "Public Sector Tech Dialogue", month: "Jun", year: "2025", place: "New Delhi" },
  { name: "Cyber Resilience Masterclass", month: "Jun", year: "2025", place: "Kolkata" },
  { name: "Supply Chain Digitisation Forum", month: "May", year: "2025", place: "Chennai" },
  { name: "Enterprise Networking Summit", month: "May", year: "2025", place: "Bengaluru" },
  { name: "CIO Breakfast Briefing", month: "Apr", year: "2025", place: "Mumbai" },
  { name: "Insurance Tech Conclave", month: "Apr", year: "2025", place: "Hyderabad" },
  { name: "Data Privacy & DPDP Forum", month: "Mar", year: "2025", place: "New Delhi" },
  { name: "Edge & IoT Leadership Meet", month: "Mar", year: "2025", place: "Pune" },
  { name: "Customer Experience Summit", month: "Feb", year: "2025", place: "Mumbai" },
  { name: "Women in Tech Leadership Forum", month: "Feb", year: "2025", place: "Bengaluru" },
  { name: "Sustainable IT Roundtable", month: "Jan", year: "2025", place: "Gurugram" },
  { name: "Annual CXO Excellence Awards", month: "Jan", year: "2025", place: "New Delhi" },
  { name: "Hybrid Cloud Strategy Forum", month: "Dec", year: "2024", place: "Mumbai" },
  { name: "Digital India Tech Dialogue", month: "Nov", year: "2024", place: "New Delhi" },
];

const pastImages = [speakerImg, roundtableImg, dinnerImg, panelImg, networkingImg, heroImg];

export function Conferences() {
  const years = useMemo(
    () => ["All", ...Array.from(new Set(past.map((p) => p.year)))],
    [],
  );
  const [year, setYear] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const filtered = year === "All" ? past : past.filter((p) => p.year === year);
  const featured = filtered.slice(0, 3);
  const archive = filtered.slice(3);
  const visibleArchive = showAll ? archive : archive.slice(0, 9);

  return (
    <section id="conferences" className="section-pad relative overflow-hidden">
      <div className="bg-gradient-soft pointer-events-none absolute -top-40 right-0 h-[480px] w-[480px] rounded-full blur-3xl" />
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">Upcoming Conferences</span>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.05] font-semibold">
            Where enterprise technology leadership{" "}
            <span className="text-gradient">converges</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {upcoming.map((c, i) => (
            <Reveal key={c.name} delay={i * 80}>
              <article className="group glass-panel flex h-full flex-col overflow-hidden rounded-3xl transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-elegant">
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
                  <h3 className="font-display text-xl font-semibold">{c.name}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {c.desc}
                  </p>
                  <div className="mt-6 space-y-2 border-t border-border pt-5 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-primary" /> {c.date}
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" /> {c.place}
                    </p>
                    <p className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" /> {c.seats}
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

        {/* Past editions */}
        <div className="mt-24 border-t border-border pt-12">
          <Reveal className="flex flex-wrap items-end justify-between gap-8">
            <div className="max-w-xl">
              <span className="eyebrow">Event Archive</span>
              <h3 className="mt-4 font-display text-[clamp(2rem,4vw,3.3rem)] leading-none font-semibold">
                Past <span className="text-gradient">editions</span>
              </h3>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
                A growing record of conversations, connections and ideas shaping enterprise
                technology across India.
              </p>
            </div>
            <div className="flex flex-wrap gap-2" aria-label="Filter past events by year">
            {years.map((y) => (
              <button
                key={y}
                onClick={() => {
                  setYear(y);
                  setShowAll(false);
                }}
                aria-pressed={year === y}
                className={`rounded-full border px-4 py-2 font-mono text-[11px] uppercase transition-all duration-300 ${
                  year === y
                    ? "border-primary bg-primary text-primary-foreground shadow-elegant"
                    : "border-border text-muted-foreground hover:border-primary/60 hover:text-foreground"
                }`}
              >
                {y}
              </button>
            ))}
            </div>
          </Reveal>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {featured.map((c, i) => (
              <Reveal key={c.name} delay={i * 90}>
                <article className="archive-feature group">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted shadow-card">
                    <img
                      src={pastImages[i % pastImages.length]}
                      alt={`${c.name} in ${c.place}`}
                      loading="lazy"
                      width={900}
                      height={675}
                      className="h-full w-full object-cover saturate-[0.8] transition-all duration-700 group-hover:scale-105 group-hover:saturate-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                    <span className="absolute right-4 bottom-3 font-display text-5xl font-semibold text-foreground/20">
                      {c.year.slice(2)}
                    </span>
                  </div>
                  <p className="mt-5 font-mono text-[10px] uppercase text-primary">
                    {c.month} {c.year} · {c.place}
                  </p>
                  <h4 className="mt-2 font-display text-xl font-semibold transition-colors group-hover:text-primary">
                    {c.name}
                  </h4>
                </article>
              </Reveal>
            ))}
          </div>

          {visibleArchive.length > 0 && (
            <div className="relative mt-14 border-t border-border">
              {visibleArchive.map((c, i) => (
                <Reveal key={c.name} delay={(i % 5) * 45}>
                  <article className="archive-row group grid grid-cols-[3.5rem_1fr_auto] items-center gap-4 border-b border-border py-5 sm:grid-cols-[5rem_1fr_8rem_auto]">
                    <span className="font-mono text-xs text-muted-foreground">
                      {String(i + 4).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <h4 className="font-display text-base font-medium transition-transform duration-300 group-hover:translate-x-1 sm:text-lg">
                        {c.name}
                      </h4>
                      <p className="mt-1 text-xs text-muted-foreground sm:hidden">{c.place}</p>
                    </div>
                    <p className="hidden text-sm text-muted-foreground sm:block">{c.place}</p>
                    <p className="font-mono text-[10px] uppercase text-muted-foreground">
                      {c.month} {c.year}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          )}

          {filtered.length > 12 && (
            <div className="mt-9 flex justify-center">
              <button
                onClick={() => setShowAll((s) => !s)}
                className="rounded-full border border-border px-6 py-2.5 text-sm font-medium transition-all hover:border-primary/60 hover:bg-secondary"
              >
                {showAll ? "Show fewer editions" : `Explore all ${filtered.length} editions`}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Gallery (20 images) ---------------- */

const glimpses = [
  { img: heroImg, alt: "Keynote address at a CXO Media summit", label: "Keynote" },
  { img: g1, alt: "Audience applauding in a packed auditorium", label: "Audience" },
  { img: g13, alt: "Panelists on stage at a CIO forum", label: "CIO Forum" },
  { img: panelImg, alt: "Executive panel discussion on stage", label: "Panel" },
  { img: g4, alt: "Executive speaking at a podium", label: "Keynote" },
  { img: g5, alt: "Fireside chat between two executives", label: "Fireside" },
  { img: g12, alt: "Delegate asking a question during Q&A", label: "Q&A" },
  { img: speakerImg, alt: "Speaker addressing the summit", label: "Speaker" },
  { img: roundtableImg, alt: "Closed-door CXO roundtable", label: "Roundtable" },
  { img: g10, alt: "Executive strategy workshop", label: "Workshop" },
  { img: networkingImg, alt: "CXOs networking at an evening reception", label: "Networking" },
  { img: g8, alt: "Delegates networking over coffee", label: "Coffee Break" },
  { img: g9, alt: "Business cards exchanged at a summit", label: "Connections" },
  { img: g3, alt: "Registration desk at a technology summit", label: "Registration" },
  { img: g6, alt: "Technology expo booths at a summit", label: "Expo" },
  { img: g2, alt: "Award handover at a leadership awards night", label: "Awards" },
  { img: g7, alt: "Group photo of award winners on stage", label: "Winners" },
  { img: dinnerImg, alt: "Executive leadership dinner", label: "Gala Dinner" },
  { img: g11, alt: "Gala dinner ballroom with violet lighting", label: "Ballroom" },
  { img: g14, alt: "Rooftop cocktail reception with skyline view", label: "Reception" },
];

export function Gallery() {
  const mosaicSpans = [
    "sm:col-span-2 sm:row-span-2",
    "sm:col-span-1 sm:row-span-1",
    "sm:col-span-1 sm:row-span-1",
    "sm:col-span-2 sm:row-span-1",
    "sm:col-span-1 sm:row-span-2",
    "sm:col-span-1 sm:row-span-1",
    "sm:col-span-2 sm:row-span-1",
    "sm:col-span-1 sm:row-span-1",
    "sm:col-span-1 sm:row-span-1",
    "sm:col-span-2 sm:row-span-2",
  ];

  return (
    <section
      id="glimpses"
      className="section-pad relative overflow-hidden border-y border-border bg-surface/40"
    >
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
          <span className="eyebrow justify-center">Event Glimpses</span>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.05] font-semibold">
              The energy behind <span className="text-gradient">every gathering</span>
          </h2>
            <p className="mt-5 max-w-xl text-muted-foreground">
              Twenty frames from keynotes, candid exchanges, roundtables and evenings that
              move enterprise conversations forward.
            </p>
          </div>
          <p className="font-mono text-xs text-muted-foreground">01 — 20 / CXO MEDIA</p>
        </Reveal>

        <div className="gallery-mosaic mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:auto-rows-[180px] lg:auto-rows-[220px]">
          {glimpses.map((g, i) => (
            <Reveal key={`${g.label}-${i}`} delay={(i % 5) * 60}>
              <figure className={`group relative h-full min-h-44 overflow-hidden rounded-lg border border-border ${mosaicSpans[i % mosaicSpans.length]}`}>
                <img
                  src={g.img}
                  alt={g.alt}
                  loading="lazy"
                  width={900}
                  height={900}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
                <figcaption className="absolute inset-x-4 bottom-3 flex items-end justify-between gap-3 font-mono text-[10px] uppercase">
                  <span className="transition-transform duration-300 group-hover:-translate-y-1">{g.label}</span>
                  <span className="text-foreground/50">{String(i + 1).padStart(2, "0")}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Partner logos (static grid) ---------------- */

const partners = [
  { name: "TechNova", mark: "TN", style: "font-display font-semibold" },
  { name: "CloudAxis", mark: "CA", style: "font-sans font-light" },
  { name: "SecureGrid", mark: "SG", style: "font-mono font-medium" },
  { name: "DataForge", mark: "DF", style: "font-display font-semibold italic" },
  { name: "NexaSoft", mark: "NX", style: "font-sans font-bold" },
  { name: "VertexAI", mark: "VX", style: "font-mono font-medium" },
  { name: "InfraCore", mark: "IC", style: "font-display font-semibold" },
  { name: "Quantiva", mark: "Q", style: "font-sans font-light" },
  { name: "CyberShield", mark: "CS", style: "font-display font-bold" },
  { name: "OptiCloud", mark: "OC", style: "font-mono font-medium" },
];

export function PartnerLogos() {
  return (
    <section id="partner-logos" className="relative overflow-hidden border-y border-border py-24">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="text-center">
          <span className="eyebrow justify-center">Strategic Partners & Sponsors</span>
          <h2 className="mt-5 font-display text-[clamp(1.8rem,3vw,2.7rem)] font-semibold">
            Trusted by technology <span className="text-gradient">leaders</span>
          </h2>
        </Reveal>
        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 border-y border-border py-8 sm:gap-x-14 sm:gap-y-8 sm:py-12">
          {partners.map((partner, i) => (
            <Reveal key={partner.name} delay={(i % 5) * 55}>
              <div className="partner-mark group relative flex min-w-36 items-center justify-center gap-3 overflow-hidden px-3 py-5 text-muted-foreground transition-colors duration-500 hover:text-foreground">
                <span className="font-mono text-[9px] text-primary/70">{partner.mark}</span>
                <span className={`text-lg sm:text-xl ${partner.style}`}>{partner.name}</span>
              </div>
            </Reveal>
          ))}
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
    name: "Rajesh Menon",
    role: "Managing Director",
    linkedin: "https://www.linkedin.com/company/cxomedia/",
    bio: "Rajesh has spent over 25 years building enterprise media platforms and C-suite communities across Asia-Pacific. He founded CXO Media with a simple conviction: technology leaders learn fastest from one another, not from vendor decks. Under his leadership the business has grown from a single annual roundtable into a year-round calendar of summits, forums and closed-door briefings spanning eight Indian cities.",
    focus: ["Vision & Strategy", "CXO Community", "APAC Expansion"],
  },
  {
    img: director2,
    name: "Ananya Iyer",
    role: "Director — Content & Research",
    linkedin: "https://www.linkedin.com/company/cxomedia/",
    bio: "Ananya leads editorial vision, primary research and agenda design across every CXO Media platform. A former enterprise technology journalist, she built the research practice that shapes each summit agenda from real practitioner interviews rather than trend reports. Her team publishes the annual CIO Priorities study and curates the speaker faculty that makes every stage worth the seat.",
    focus: ["Agenda Design", "Industry Research", "Speaker Faculty"],
  },
  {
    img: director3,
    name: "Arjun Kapoor",
    role: "Director — Partnerships & Growth",
    linkedin: "https://www.linkedin.com/company/cxomedia/",
    bio: "Arjun drives strategic alliances with global technology brands and India's enterprise innovation ecosystem. He designs partnership programmes that put sponsors in genuine conversation with decision-makers instead of broadcasting at them, and has delivered multi-year engagements for cloud, security and data platform leaders. He also oversees delegate acquisition and regional growth.",
    focus: ["Brand Alliances", "Sponsorships", "Delegate Growth"],
  },
];

export function Team() {
  return (
    <section id="team" className="section-pad relative overflow-hidden">
      <div className="bg-gradient-soft pointer-events-none absolute top-20 -left-32 h-[420px] w-[420px] rounded-full blur-3xl" />
      <div className="mx-auto max-w-5xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">Our Team</span>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.05] font-semibold">
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
                  <div className="mt-5 flex flex-wrap gap-2">
                    {m.focus.map((f) => (
                      <span
                        key={f}
                        className="rounded-full border border-border px-3 py-1 font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
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
