
import heroImg from "@/assets/hero-conference.jpg";
import { LazyVideo } from "./LazyVideo";
import { CountUp } from "./CountUp";

// Load video directly from the public folder
const heroVideo = "/video-1.mp4";

const stats = [
  { value: <CountUp to={10} suffix="+" />, label: "Engagement formats" },
  { value: <CountUp to={11} />, label: "Sectors covered" },
  { value: "C-Suite", label: "Audience focus" },
];

export function Hero() {
  return (
    <section id="top" className="relative isolate min-h-screen overflow-hidden">
      <LazyVideo
        className="absolute inset-0 -z-20 h-full w-full object-cover motion-reduce:hidden"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={heroImg}
        disablePictureInPicture
        aria-hidden="true"
      >
        <source src={heroVideo} type="video/mp4" />
      </LazyVideo>

      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,oklch(0.14_0.03_285/0.96),oklch(0.14_0.03_285/0.72)_55%,oklch(0.14_0.03_285/0.35))]" />

      <div className="grid-lines absolute inset-0 -z-10 opacity-40" />

      <div
        className="hero-orb hero-orb-a pointer-events-none absolute -z-10"
        aria-hidden="true"
      />

      <div
        className="hero-orb hero-orb-b pointer-events-none absolute -z-10"
        aria-hidden="true"
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-background to-transparent" />

      <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pt-32 pb-16">
        <span className="eyebrow hero-in w-fit rounded-full border border-border bg-background/30 px-4 py-2">
          <span className="bg-gradient-brand h-1.5 w-1.5 animate-pulse rounded-full" />
          An initiative by APAC Media
        </span>

        <h1 className="hero-in hero-in-2 mt-6 max-w-4xl font-display where leading-[0.98] font-semibold">
          Where Enterprise Leaders Meet{" "}
          <span className="text-gradient">
            Technology and Innovation
          </span>.
        </h1>

        <p className="hero-in hero-in-3 mt-7 max-w-2xl where-p leading-relaxed text-muted-foreground">
          CXO Media builds high-impact conferences, executive roundtables and
          leadership forums for the C-suite, technology leaders and senior IT
          decision-makers across Asia Pacific
        </p>

        <div className="hero-in hero-in-4 mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#capabilities"
            className="bg-gradient-brand rounded-full px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-elegant transition-transform hover:scale-[1.03]"
          >
            Explore our platforms
          </a>

          <a
            href="#contact"
            className="rounded-full border border-border px-7 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Talk to our team
          </a>
        </div>

        <dl className="hero-in hero-in-5 mt-16 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="glass-panel glass-blur border-0 px-6 py-6"
            >
              <dt className="font-display text-3xl font-semibold text-gradient">
                {s.value}
              </dt>
              <dd className="mt-1 text-xs tracking-wide text-muted-foreground uppercase">
                {s.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <a
        href="#about"
        aria-label="Scroll to content"
        className="scroll-cue absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block"
      >
        <span />
      </a>
    </section>
  );
}
