import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Linkedin, ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { getLinkedInPosts, COMPANY_URL } from "@/lib/linkedin.functions";

function formatDate(ts: number | null) {
  if (!ts) return "Latest update";
  return new Date(ts).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function LinkedInFeed() {
  const fetchPosts = useServerFn(getLinkedInPosts);
  const { data, isLoading } = useQuery({
    queryKey: ["linkedin-posts"],
    queryFn: () => fetchPosts(),
    staleTime: 1000 * 60 * 30,
  });

  const posts = data?.posts ?? [];

  return (
    <section
      id="linkedin"
      className="section-pad relative overflow-hidden border-y border-border bg-surface/40"
    >
      <div className="bg-gradient-soft pointer-events-none absolute -bottom-40 -right-24 h-[420px] w-[420px] rounded-full blur-3xl" />
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="eyebrow">
              <Linkedin className="h-3.5 w-3.5" /> LinkedIn
            </span>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.05] font-semibold">
              Latest from <span className="text-gradient">our feed</span>
            </h2>
          </div>
          <a
            href={COMPANY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-primary/60 hover:bg-secondary"
          >
            Follow CXO Media <ArrowUpRight className="h-4 w-4" />
          </a>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="glass-panel h-52 animate-pulse rounded-3xl"
                  aria-hidden
                />
              ))
            : posts.map((p, i) => (
                <Reveal key={p.id} delay={(i % 3) * 70}>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-panel group flex h-full flex-col rounded-3xl p-6 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-elegant"
                  >
                    <div className="flex items-center gap-3">
                      <span className="bg-gradient-brand flex h-9 w-9 items-center justify-center rounded-xl">
                        <Linkedin className="h-4 w-4 text-primary-foreground" />
                      </span>
                      <div>
                        <p className="font-display text-sm font-semibold">CXO Media</p>
                        <p className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
                          {formatDate(p.publishedAt)}
                        </p>
                      </div>
                    </div>
                    <p className="mt-5 line-clamp-6 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {p.text}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                      Read on LinkedIn <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </a>
                </Reveal>
              ))}
        </div>
      </div>
    </section>
  );
}
