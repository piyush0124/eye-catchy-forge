import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";

/** Thin brand-gradient reading progress bar + floating back-to-top button. */
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      setShowTop((prev) => {
        const next = window.scrollY > 900;
        return prev === next ? prev : next;
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]" aria-hidden="true">
        <div ref={bar} className="bg-gradient-brand h-full origin-left" style={{ transform: "scaleX(0)" }} />
      </div>
      <a
        href="#top"
        aria-label="Back to top"
        className={`bg-gradient-brand shadow-elegant fixed right-5 bottom-5 z-50 flex h-11 w-11 items-center justify-center rounded-full text-primary-foreground transition-[opacity,transform] duration-300 hover:scale-110 ${
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <ArrowUp className="h-5 w-5" />
      </a>
    </>
  );
}
