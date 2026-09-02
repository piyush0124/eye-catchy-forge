import networkingImg from "@/assets/event-networking.jpg";
import panelImg from "@/assets/event-panel.jpg";
import { Reveal } from "./Reveal";

export function Audience() {
  const audience = [
    "Chief Information Officers and IT Heads",
    "Chief Technology Officers and Technology Leadership Teams",
    "Chief Information Security Officers and Cybersecurity Experts",
    "Chief Digital Officers and Digital Transformation Leaders",
    "Chief Data, Analytics and AI Leaders",
    "Enterprise Architects and Infrastructure Leaders",
    "Risk, Compliance and Business Continuity Leaders",
    "Business Heads and Senior Enterprise Decision-Makers",
    "Technology Providers, Innovators and Industry Experts",
  ];

  return (
    <section id="audience" className="section-pad relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <Reveal>
            <span className="eyebrow">Our Audience</span>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.05] font-semibold">
              The leaders who set the{" "}
              <span className="text-gradient">enterprise technology agenda</span>
            </h2>
            <p className="mt-5 text-muted-foreground">
              CXO Media engages senior leaders responsible for enterprise technology
              strategy, digital transformation, cybersecurity, innovation, infrastructure,
              data, operations and business growth.
            </p>
          </Reveal>
          <Reveal delay={120} className="mt-8">
            <figure className="overflow-hidden rounded-3xl border border-border shadow-card">
              <img
                src={panelImg}
                alt="C-suite panel discussion at a CXO Media summit"
                loading="lazy"
                width={1200}
                height={912}
                className="h-64 w-full object-cover"
              />
            </figure>
          </Reveal>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2">
          {audience.map((a, i) => (
            <Reveal key={a} delay={i * 45}>
              <li className="flex h-full items-start gap-3 rounded-2xl border border-border bg-card p-5 text-sm transition-colors hover:border-primary/50">
                <span className="bg-gradient-brand mt-1.5 h-2 w-2 shrink-0 rounded-full" />
                {a}
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Sectors() {
  const sectors = [
    "Banking, Financial Services and Insurance",
    "Manufacturing and Industry 4.0",
    "Retail, Consumer Business and E-commerce",
    "Healthcare and Life Sciences",
    "IT, ITES and Digital Services",
    "Telecom and Digital Infrastructure",
    "Energy, Utilities and Sustainability",
    "Logistics, Supply Chain and Mobility",
    "Real Estate, Smart Workspaces and Facilities",
    "Education, EdTech and Future Skills",
    "Digital Natives",
  ];

  return (
    <section
      id="sectors"
      className="section-pad relative overflow-hidden border-y border-border bg-surface/40"
    >
      <div className="mx-auto max-w-6xl px-6 text-center">
        <Reveal>
          <span className="eyebrow">Sectoral Focus</span>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.05] font-semibold">
            Where technology is central to{" "}
            <span className="text-gradient">competitiveness and resilience</span>
          </h2>
        </Reveal>
      </div>

      <div className="relative mt-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="animate-marquee flex w-max gap-4">
          {[...sectors, ...sectors].map((s, i) => (
            <span
              key={`${s}-${i}`}
              className="glass-panel rounded-full px-6 py-3 text-sm whitespace-nowrap"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-12 grid max-w-6xl gap-3 px-6 sm:grid-cols-2 lg:grid-cols-3">
        {sectors.map((s, i) => (
          <Reveal key={s} delay={i * 40}>
            <div className="flex h-full items-center gap-3 rounded-2xl border border-border bg-card px-5 py-4 text-sm">
              <span className="font-mono text-xs text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              {s}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Partners() {
  const value = [
    "Engage directly with the C-suite, technology leadership and IT decision-makers",
    "Build visibility and credibility within targeted enterprise sectors",
    "Establish thought leadership through relevant content and executive conversations",
    "Generate qualified business opportunities and strategic relationships",
    "Connect with priority accounts through customised outreach formats",
    "Demonstrate solutions in the context of real enterprise challenges",
    "Build long-term relationships with senior technology and business leaders",
    "Strengthen market positioning through high-quality media and event platforms",
  ];

  return (
    <section id="partners" className="section-pad relative overflow-hidden">
      <div className="bg-gradient-soft pointer-events-none absolute -bottom-40 -left-20 h-[520px] w-[520px] rounded-full blur-3xl" />
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <span className="eyebrow">Value for Technology Partners</span>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.05] font-semibold">
            Targeted, credible and{" "}
            <span className="text-gradient">outcome-oriented</span> platforms
          </h2>
          <p className="mt-5 text-muted-foreground">
            CXO Media helps technology companies build stronger engagement with the right
            enterprise audiences. Our programs enable partners to:
          </p>
          <figure className="mt-8 overflow-hidden rounded-3xl border border-border shadow-card">
            <img
              src={networkingImg}
              alt="Technology partners and enterprise leaders networking at a CXO Media event"
              loading="lazy"
              width={1200}
              height={912}
              className="h-64 w-full object-cover"
            />
          </figure>
        </Reveal>

        <ul className="space-y-3">
          {value.map((v, i) => (
            <Reveal key={v} delay={i * 50}>
              <li className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 text-sm transition-colors hover:border-primary/50">
                <span className="bg-gradient-brand flex h-7 w-7 shrink-0 items-center justify-center rounded-lg font-mono text-[11px] text-primary-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {v}
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function WhyAndCommitment() {
  return (
    <section
      id="why"
      className="section-pad relative overflow-hidden border-y border-border bg-surface/40"
    >
      <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-2">
        <Reveal>
          <article className="glass-panel h-full rounded-3xl p-8">
            <span className="eyebrow">Why CXO Media</span>
            <h3 className="mt-4 font-display text-2xl font-semibold">
              Trust, relevance and access to credible expertise
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Enterprise technology decisions require trust, relevance and access to
              credible expertise. CXO Media creates focused environments where technology
              leaders can engage with peers, evaluate emerging trends and discover
              solutions aligned with their business priorities.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Our approach combines the influence of media, the depth of research, the
              relevance of sector-specific content and the impact of curated executive
              engagement.
            </p>
          </article>
        </Reveal>
        <Reveal delay={100}>
          <article className="glass-panel h-full rounded-3xl p-8">
            <span className="eyebrow">Our Commitment</span>
            <h3 className="mt-4 font-display text-2xl font-semibold">
              Strengthening the enterprise technology ecosystem
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              CXO Media is committed to enabling relevant conversations, actionable
              insights and strategic collaborations.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              We believe technology leadership is central to business growth and
              resilience. Through our platforms we help the C-suite and IT decision-makers
              navigate change with clarity, while enabling technology partners to connect
              with the enterprise audiences that matter most.
            </p>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

export function ContactFooter() {
  return (
    <footer id="contact" className="relative overflow-hidden">
      <div className="section-pad relative mx-auto max-w-5xl px-6 text-center">
        <div className="bg-gradient-soft pointer-events-none absolute inset-x-10 top-10 h-64 rounded-full blur-3xl" />
        <Reveal>
          <span className="eyebrow">Get in touch</span>
          <h2 className="mt-5 font-display text-[clamp(2.1rem,4.6vw,3.6rem)] leading-[1.05] font-semibold">
            Enterprise Technology. C-suite Insights.{" "}
            <span className="text-gradient">Strategic Connections.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
            Partner with CXO Media to reach the leaders shaping enterprise technology
            across Asia-Pacific.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <a
              href="mailto:info@cxomedia.in"
              className="bg-gradient-brand rounded-full px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-elegant transition-transform hover:scale-[1.03]"
            >
              info@cxomedia.in
            </a>
            <a
              href="#capabilities"
              className="rounded-full border border-border px-7 py-3.5 text-sm font-medium transition-colors hover:bg-secondary"
            >
              View capabilities
            </a>
          </div>
        </Reveal>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-xs text-muted-foreground sm:flex-row">
          <p>
            <span className="font-display text-sm text-foreground">
              CXO Media Pvt. Ltd.
            </span>{" "}
            — an initiative by APAC Media
          </p>
          <p>© {new Date().getFullYear()} CXO Media Pvt. Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
