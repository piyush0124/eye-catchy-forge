// import heroImg from "@/assets/hero-conference.jpg";
import heroVideo from "@/assets/hero-conference-video-112.mp4";

const stats = [
  { value: "10+", label: "Engagement formats" },
  { value: "11", label: "Sectors covered" },
  { value: "C-Suite", label: "Audience focus" },
  // { value: "APAC", label: "Media initiative" },
];

export function Hero() {
  return (
    <section id="top" className="relative isolate min-h-screen overflow-hidden">
      <video
        className="absolute inset-0 -z-20 h-full w-full object-cover motion-reduce:hidden"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        // poster={heroImg}
        aria-hidden="true"
      >
        <source src={heroVideo} type="video/mp4"/>
      </video>
      {/* <img
        src={heroImg}
        alt="Keynote speaker on stage at a CXO Media enterprise technology conference"
        width={1920}
        height={1088}
        className="absolute inset-0 -z-20 hidden h-full w-full object-cover motion-reduce:block"
      /> */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,oklch(0.14_0.03_285/0.96),oklch(0.14_0.03_285/0.72)_55%,oklch(0.14_0.03_285/0.35))]" />
      <div className="grid-lines absolute inset-0 -z-10 opacity-40" />

      <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pt-32 pb-16">
        <span className="eyebrow">
          <span className="bg-gradient-brand h-1.5 w-1.5 rounded-full" />
          An initiative by APAC Media
        </span>

        <h1 className="mt-6 max-w-4xl font-display where leading-[0.98] font-semibold">
          Where Enterprise Leaders Meet{" "}
          <span className="text-gradient">Technology and Innovation</span>.
        </h1>

        <p className="mt-7 max-w-2xl where-p leading-relaxed text-muted-foreground">
          CXO Media builds high-impact conferences, executive roundtables and leadership forums for the C-suite, technology leaders and senior IT decision-makers across Asia Pacific
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
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

        <dl className="mt-16 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="glass-panel border-0 px-6 py-6">
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
    </section>
  );
}
