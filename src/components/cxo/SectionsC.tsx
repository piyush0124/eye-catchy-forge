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
  const visible = showAll ? filtered : filtered.slice(0, 12);

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
        <Reveal className="mt-20 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="eyebrow">Past Editions</span>
            <h3 className="mt-4 font-display text-[clamp(1.6rem,3vw,2.4rem)] font-semibold">
              {past.length}+ editions <span className="text-gradient">delivered</span>
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {years.map((y) => (
              <button
                key={y}
                onClick={() => {
                  setYear(y);
                  setShowAll(false);
                }}
                className={`rounded-full border px-4 py-1.5 font-mono text-[11px] tracking-[0.14em] uppercase transition-colors ${
                  year === y
                    ? "border-transparent bg-gradient-brand text-primary-foreground"
                    : "border-border text-muted-foreground hover:bg-secondary"
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((c, i) => (
            <Reveal key={c.name} delay={(i % 6) * 50}>
              <article className="group glass-panel flex items-center gap-4 rounded-2xl p-3 transition-colors hover:border-primary/50">
                <img
                  src={pastImages[i % pastImages.length]}
                  alt={`${c.name} in ${c.place}`}
                  loading="lazy"
                  width={200}
                  height={200}
                  className="h-20 w-24 shrink-0 rounded-xl object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate font-display text-[0.95rem] font-semibold">{c.name}</p>
                  <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                    {c.month} {c.year} · {c.place}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {filtered.length > 12 && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowAll((s) => !s)}
              className="rounded-full border border-border px-6 py-2.5 text-sm font-medium transition-colors hover:border-primary/60 hover:bg-secondary"
            >
              {showAll ? "Show less" : `View all ${filtered.length} editions`}
            </button>
          </div>
        )}
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
  return (
    <section
      id="glimpses"
      className="section-pad relative overflow-hidden border-y border-border bg-surface/40"
    >
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">Event Glimpses</span>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.05] font-semibold">
            Moments from <span className="text-gradient">our stages</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            Twenty frames from keynotes, panels, roundtables, expos and gala nights across
            our conference calendar.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {glimpses.map((g, i) => (
            <Reveal key={`${g.label}-${i}`} delay={(i % 5) * 60}>
              <figure className="group relative aspect-square overflow-hidden rounded-2xl border border-border">
                <img
                  src={g.img}
                  alt={g.alt}
                  loading="lazy"
                  width={900}
                  height={900}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-70 transition-opacity group-hover:opacity-100" />
                <figcaption className="absolute bottom-3 left-3 font-mono text-[10px] tracking-[0.16em] uppercase">
                  {g.label}
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
  "TechNova",
  "CloudAxis",
  "SecureGrid",
  "DataForge",
  "NexaSoft",
  "VertexAI",
  "InfraCore",
  "Quantiva",
  "CyberShield",
  "OptiCloud",
];

export function PartnerLogos() {
  return (
    <section id="partner-logos" className="relative overflow-hidden py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">Trusted By</span>
          <p className="mt-4 text-sm text-muted-foreground">
            Technology brands that partner with CXO Media platforms
          </p>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-3 lg:grid-cols-5">
          {partners.map((p, i) => (
            <Reveal key={p} delay={(i % 5) * 50}>
              <div className="flex h-full items-center justify-center gap-3 bg-background px-4 py-8 transition-colors hover:bg-surface">
                <span className="bg-gradient-brand flex h-8 w-8 items-center justify-center rounded-lg font-display text-xs font-bold text-primary-foreground">
                  {p[0]}
                </span>
                <span className="font-display text-base font-semibold tracking-tight">{p}</span>
              </div>
            </Reveal>
          ))}
        </div>
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
