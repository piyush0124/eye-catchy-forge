import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/* One shared observer for every <Reveal /> instead of one per element. */
type Cb = () => void;
const callbacks = new WeakMap<Element, Cb>();
let sharedObserver: IntersectionObserver | null = null;

function observe(el: Element, cb: Cb) {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          callbacks.get(entry.target)?.();
          callbacks.delete(entry.target);
          sharedObserver?.unobserve(entry.target);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
    );
  }
  callbacks.set(el, cb);
  sharedObserver.observe(el);
  return () => {
    callbacks.delete(el);
    sharedObserver?.unobserve(el);
  };
}

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      setSettled(true);
      return;
    }
    return observe(el, () => setShown(true));
  }, []);

  // Drop the animation layer once the reveal is finished so it stops costing memory while scrolling.
  useEffect(() => {
    if (!shown) return;
    const t = window.setTimeout(() => setSettled(true), 800 + delay);
    return () => window.clearTimeout(t);
  }, [shown, delay]);

  return (
    <div
      ref={ref}
      style={settled ? undefined : { transitionDelay: `${delay}ms` }}
      className={cn(
        !settled && "transition-[opacity,transform] duration-700 ease-out",
        !settled && !shown && "will-change-[opacity,transform]",
        shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
