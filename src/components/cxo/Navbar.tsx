import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import  logoImg  from "@/assets/cxo-media-color-scaled.webp"

const links = [
  { href: "#about", label: "About" },
  { href: "#conferences", label: "Conferences" },
  { href: "#glimpses", label: "Glimpses" },
  { href: "#partners", label: "Partners" },
  { href: "#team", label: "Team" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "glass-panel border-x-0 border-t-0 py-3" : "border-transparent py-5",
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-3 logo-width">
          <img src={logoImg} alt="Logo" className=" w-auto" />
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="bg-gradient-brand hidden rounded-full px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-elegant transition-transform hover:scale-[1.03] sm:inline-flex"
          >
            Partner with us
          </a>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="rounded-lg border border-border p-2 lg:hidden"
          >
            <span className="block h-0.5 w-5 bg-foreground" />
            <span className="mt-1 block h-0.5 w-5 bg-foreground" />
          </button>
        </div>
      </nav>

      {open && (
        <ul className="glass-panel mx-6 mt-3 space-y-1 rounded-2xl p-4 lg:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
