import { CalendarDays, MapPin, Users } from "lucide-react";
import { Reveal } from "./Reveal";
import heroImg from "@/assets/hero-conference.jpg";
import roundtableImg from "@/assets/about-roundtable.jpg";
import networkingImg from "@/assets/event-networking.jpg";
import panelImg from "@/assets/event-panel.jpg";
import dinnerImg from "@/assets/event-dinner.jpg";
import speakerImg from "@/assets/event-speaker.jpg";
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
  },
  {
    name: "CISO Security Forum",
    date: "Dec 09, 2026",
    place: "Mumbai, India",
    desc: "A closed-door forum for cybersecurity leaders on zero-trust, AI-driven threats and board-level risk.",
    seats: "120+ CISOs",
  },
  {
    name: "Enterprise AI & Data Conclave",
    date: "Feb 18, 2027",
    place: "Bengaluru, India",
    desc: "Data, analytics and AI leaders decode real-world enterprise AI adoption, governance and ROI.",
    seats: "200+ Leaders",
  },
];

const past = [
  {
    name: "Digital Transformation Summit",
    date: "Mar 2026",
    place: "Hyderabad",
    img: speakerImg,
  },
  {
    name: "CXO Power Roundtable",
    date: "Jan 2026",
    place: "Gurugram",
    img: roundtableImg,
  },
  {
    name: "Enterprise Tech Leadership Night",
    date: "Nov 2025",
    place: "Mumbai",
    img: dinnerImg,
  },
];

export function Conferences() {
  return (
    <section id="conferences" className="section-pad relative overflow-hidden">
      <div className="bg-gradient-soft pointer-events-none absolute -top-40 right-0 h-[480px] w-[480px] rounded-full blur-3xl" />
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">Conferences</span>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.05] font-semibold">
            Where enterprise technology leadership{" "}
            <span className="text-gradient">converges</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {upcoming.map((c, i) => (
            <Reveal key={c.name} delay={i * 80}>
              <article className="group glass-panel flex h-full flex-col rounded-3xl p-7 transition-all hover:-translate-y-1 hover:border-primary/50">
                <span className="bg-gradient-brand inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 font-mono text-[10px] tracking-[0.18em] text-primary-foreground uppercase">
                  Upcoming
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold">{c.name}</h3>
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
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16">
          <h3 className="font-mono text-xs tracking-[0.22em] text-muted-foreground uppercase">
            Past editions
          </h3>
        </Reveal>
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {past.map((c, i) => (
            <Reveal key={c.name} delay={i * 80}>
              <figure className="group relative h-64 overflow-hidden rounded-3xl border border-border">
                <img
                  src={c.img}
                  alt={`${c.name} conference in ${c.place}`}
                  loading="lazy"
                  width={1200}
                  height={912}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent p-5 pt-16">
                  <p className="font-display text-base font-semibold">{c.name}</p>
                  <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                    {c.date} · {c.place}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Gallery ---------------- */

const glimpses = [
  { img: heroImg, alt: "Keynote address at a CXO Media summit", label: "Keynotes", span: "sm:col-span-2" },
  { img: panelImg, alt: "Executive panel discussion on stage", label: "Panels", span: "" },
  { img: networkingImg, alt: "CXOs networking at an evening reception", label: "Networking", span: "" },
  { img: roundtableImg, alt: "Closed-door CXO roundtable", label: "Roundtables", span: "" },
  { img: dinnerImg, alt: "Executive leadership dinner", label: "Gala Dinners", span: "sm:col-span-2" },
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
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {glimpses.map((g, i) => (
            <Reveal key={g.label} delay={i * 60} className={g.span}>
              <figure className="group relative h-64 overflow-hidden rounded-3xl border border-border sm:h-72">
                <img
                  src={g.img}
                  alt={g.alt}
                  loading="lazy"
                  width={1200}
                  height={912}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="glass-panel absolute bottom-4 left-4 rounded-full px-4 py-1.5 font-mono text-[11px] tracking-[0.14em] uppercase">
                  {g.label}
                </span>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Partner logos ---------------- */

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
    <section id="partner-logos" className="relative overflow-hidden py-16">
      <Reveal className="mx-auto max-w-2xl px-6 text-center">
        <span className="eyebrow justify-center">Trusted By</span>
        <p className="mt-4 text-sm text-muted-foreground">
          Technology brands that partner with CXO Media platforms
        </p>
      </Reveal>
      <div className="relative mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="animate-marquee flex w-max items-center gap-14 px-6">
          {[...partners, ...partners].map((p, i) => (
            <span
              key={`${p}-${i}`}
              className="flex items-center gap-3 whitespace-nowrap opacity-60 transition-opacity hover:opacity-100"
            >
              <span className="bg-gradient-brand flex h-8 w-8 items-center justify-center rounded-lg font-display text-xs font-bold text-primary-foreground">
                {p[0]}
              </span>
              <span className="font-display text-lg font-semibold tracking-tight">{p}</span>
            </span>
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
    bio: "25+ years shaping enterprise media, technology summits and C-suite communities across Asia-Pacific.",
  },
  {
    img: director2,
    name: "Ananya Iyer",
    role: "Director — Content & Research",
    bio: "Leads editorial vision, industry research and agenda design for CXO Media's conference platforms.",
  },
  {
    img: director3,
    name: "Arjun Kapoor",
    role: "Director — Partnerships & Growth",
    bio: "Drives strategic alliances with technology brands and enterprise innovation ecosystems.",
  },
];

export function Team() {
  return (
    <section id="team" className="section-pad relative overflow-hidden">
      <div className="bg-gradient-soft pointer-events-none absolute top-20 -left-32 h-[420px] w-[420px] rounded-full blur-3xl" />
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">Our Team</span>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.05] font-semibold">
            Led by <span className="text-gradient">seasoned visionaries</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            The directors behind CXO Media bring decades of experience across enterprise
            media, technology and executive engagement.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 90}>
              <article className="group text-center">
                <div className="relative mx-auto overflow-hidden rounded-3xl border border-border shadow-card">
                  <img
                    src={m.img}
                    alt={`${m.name}, ${m.role} at CXO Media`}
                    loading="lazy"
                    width={768}
                    height={960}
                    className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-background/80 p-4 backdrop-blur-md">
                    <h3 className="font-display text-lg font-semibold">{m.name}</h3>
                    <p className="text-gradient font-mono text-[11px] tracking-[0.14em] uppercase">
                      {m.role}
                    </p>
                  </div>
                </div>
                <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
                  {m.bio}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
