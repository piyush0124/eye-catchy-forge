import aboutImg from "@/assets/about-roundtable.jpg";
import panelImg from "@/assets/event-panel.jpg";
import dinnerImg from "@/assets/event-dinner.jpg";
import networkingImg from "@/assets/event-networking.jpg";
import speakerImg from "@/assets/event-speaker.jpg";
import { Reveal } from "./Reveal";

export function About() {
  const cards = [
    {
      title: "Enterprise Leadership",
      desc: "Serving senior technology and business decision-makers.",
    },
    {
      title: "Knowledge Platforms",
      desc: "Research-driven insights and executive engagement.",
    },
    {
      title: "Strategic Networking",
      desc: "Connecting enterprise buyers with technology providers.",
    },
    {
      title: "Innovation Ecosystem",
      desc: "Driving digital transformation through collaboration.",
    },
  ];

  return (
    <section id="about" className="section-pad relative overflow-hidden">
      <div className="bg-gradient-soft pointer-events-none absolute -top-40 right-0 h-[520px] w-[520px] rounded-full blur-3xl" />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative">
          <div className="relative overflow-hidden rounded-3xl border border-border shadow-card">
            <img
              src={aboutImg}
              alt="Senior technology executives at a CIO roundtable hosted by CXO Media"
              loading="lazy"
              width={1200}
              height={1408}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,oklch(0.14_0.03_285/0.75),transparent_55%)]" />
          </div>
          <div className="glass-panel animate-float absolute -right-4 bottom-10 rounded-2xl px-5 py-4 shadow-elegant">
            <p className="font-display text-sm font-semibold">Executive Roundtables</p>
            <p className="text-xs text-muted-foreground">Invite-only, peer-led</p>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <span className="eyebrow">About CXO Media</span>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.05] font-semibold">
              Connecting enterprise leaders with{" "}
              <span className="text-gradient">technology innovation</span>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>
                <strong className="text-foreground">CXO Media Pvt. Ltd.</strong>, an
                initiative by APAC Media, is an enterprise-focused media, knowledge and
                engagement platform serving the C-suite, technology leadership and senior
                IT decision-makers.
              </p>
              <p>
                We enable meaningful connections between enterprise leaders and technology
                solution providers through high-impact conferences, executive roundtables,
                leadership forums, research-led content and customised engagement
                programs.
              </p>
              <p>
                Our platforms facilitate informed conversations around digital
                transformation, cybersecurity, cloud, AI, infrastructure, data, innovation
                and business resilience.
              </p>
            </div>
          </Reveal>
          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            {cards.map((c, i) => (
              <Reveal key={c.title} delay={100 + i * 70}>
                <div className="h-full rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/50">
                  <span className="bg-gradient-brand mb-3 block h-1 w-8 rounded-full" />
                  <h3 className="font-display text-base font-semibold">{c.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Purpose() {
  const pillars = [
    "Curated News",
    "Market Analysis",
    "Expert Perspectives",
    "Research",
    "Executive-Led Discussions",
  ];

  return (
    <section
      id="purpose"
      className="section-pad relative overflow-hidden border-y border-border"
    >
      <img
        src={speakerImg}
        alt="Speaker addressing delegates at a technology leadership forum"
        loading="lazy"
        width={1200}
        height={1504}
        className="absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,oklch(0.16_0.035_285/0.94),oklch(0.16_0.035_285/0.99))]" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <span className="eyebrow">Our Purpose</span>
          <h2 className="mt-6 font-display text-[clamp(1.9rem,4.2vw,3.4rem)] leading-[1.1] font-semibold">
            To create credible, high-value platforms that help enterprise technology
            leaders stay{" "}
            <span className="text-gradient">informed, connected and prepared</span> for
            the future.
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="mx-auto mt-7 max-w-2xl text-muted-foreground">
            Through curated news, market analysis, expert perspectives, research and
            executive-led discussions, CXO Media delivers relevant intelligence for the
            C-suite and technology decision-makers navigating a rapidly evolving business
            environment.
          </p>
        </Reveal>
        <Reveal delay={140}>
          <ul className="mt-10 flex flex-wrap justify-center gap-3">
            {pillars.map((p) => (
              <li
                key={p}
                className="glass-panel rounded-full px-5 py-2.5 text-sm text-foreground"
              >
                {p}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export function Mission() {
  const enablers = ["Insights", "Access", "Engagement Opportunities"];
  const outcomes = [
    "Accelerate Innovation",
    "Strengthen Cyber Resilience",
    "Achieve Sustainable Business Growth",
  ];

  return (
    <section id="mission" className="section-pad relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="max-w-3xl">
          <span className="eyebrow">Our Mission</span>
          <p className="mt-5 font-display text-[clamp(1.5rem,3vw,2.4rem)] leading-[1.2] font-medium">
            To empower enterprises, technology leaders and solution providers with the
            insights, access and engagement opportunities required to{" "}
            <span className="text-gradient">
              accelerate innovation, strengthen cyber resilience and achieve sustainable
              business growth
            </span>
            .
          </p>
        </Reveal>

        <div className="mt-14 grid items-center gap-6 md:grid-cols-[1fr_auto_1fr]">
          <ul className="space-y-4">
            {enablers.map((e, i) => (
              <Reveal key={e} delay={i * 80}>
                <li className="rounded-2xl border border-border bg-card px-6 py-5 font-display text-lg">
                  {e}
                </li>
              </Reveal>
            ))}
          </ul>
          <div className="bg-gradient-brand mx-auto h-1 w-24 rounded-full md:h-56 md:w-1" />
          <ul className="space-y-4">
            {outcomes.map((o, i) => (
              <Reveal key={o} delay={i * 80}>
                <li className="bg-gradient-soft rounded-2xl border border-primary/40 px-6 py-5 font-display text-lg">
                  {o}
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Capabilities() {
  const items = [
    "Enterprise Technology Conferences and Industry Summits",
    "CIO, CISO, CTO and C-suite Leadership Forums",
    "Invite-Only Executive Roundtables and Leadership Dinners",
    "Cybersecurity, Cloud, AI, Data and Digital Transformation Platforms",
    "Sector-Specific Enterprise Engagement Programs",
    "Customised Demand Generation and Account-Based Outreach Campaigns",
    "Thought Leadership and Brand Positioning Initiatives",
    "Research Reports, Whitepapers and Market Intelligence",
    "Executive Interviews, Digital Content and Knowledge Series",
    "Strategic Partner Engagement and Enterprise Networking",
  ];

  const gallery = [
    { src: panelImg, alt: "Panel discussion at an enterprise cybersecurity summit" },
    { src: dinnerImg, alt: "Invite-only executive leadership dinner" },
    { src: networkingImg, alt: "Delegates networking at a CXO Media evening reception" },
  ];

  return (
    <section
      id="capabilities"
      className="section-pad relative overflow-hidden border-y border-border bg-surface/40"
    >
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="max-w-3xl">
          <span className="eyebrow">Our Capabilities</span>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.05] font-semibold">
            End-to-end enterprise engagement and{" "}
            <span className="text-gradient">thought leadership</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            Tailored to the objectives of technology companies and industry partners.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <ol className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2">
            {items.map((item, i) => (
              <li
                key={item}
                className="group flex gap-4 bg-card p-6 transition-colors hover:bg-secondary"
              >
                <span className="font-mono text-xs text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm leading-relaxed">{item}</p>
              </li>
            ))}
          </ol>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            {gallery.map((g, i) => (
              <Reveal key={g.alt} delay={i * 90}>
                <figure className="relative overflow-hidden rounded-3xl border border-border shadow-card">
                  <img
                    src={g.src}
                    alt={g.alt}
                    loading="lazy"
                    width={1200}
                    height={912}
                    className="h-56 w-full object-cover transition-transform duration-700 hover:scale-105 lg:h-64"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,oklch(0.14_0.03_285/0.9),transparent)] p-5 text-sm">
                    {g.alt}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
