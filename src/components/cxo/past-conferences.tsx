import { useMemo, useState } from "react";
import { useSuspenseQuery, useQuery, queryOptions } from "@tanstack/react-query";

import { Reveal } from "./Reveal";
import { CATEGORIES, getPastConferences } from "@/hooks/past-conferences.functions";
import { getNetworkPast } from "@/hooks/apac-network-past.functions";

export const pastConferencesQuery = queryOptions({
  queryKey: ["past-conferences", "apacmedia"],
  queryFn: () => getPastConferences(),
  staleTime: 1000 * 60 * 5,
  refetchInterval: 1000 * 60 * 15,
  refetchOnWindowFocus: true,
  refetchOnMount: "always" as const,
});

const networkPastQuery = queryOptions({
  queryKey: ["past-conferences", "apacnewsnetwork"],
  queryFn: () => getNetworkPast(),
  staleTime: 1000 * 60 * 5,
  refetchInterval: 1000 * 60 * 15,
});

const NETWORK = "APAC News Network";
const NETWORK_URL = "https://apacnewsnetwork.com/events/#past-conferences";
const FILTERS = ["All", ...CATEGORIES] as const;

export function PastConferencesPage() {
  const { data } = useSuspenseQuery(pastConferencesQuery);
  const [category, setCategory] = useState<string>("All");
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(
    () => (category === "All" ? data : data.filter((c) => c.category === category)),
    [data, category],
  );
  const visible = showAll ? filtered : filtered.slice(0, 12);

  return (
    <main className="mx-auto max-w-6xl px-6 pb-28">
      <div className="mt-20 border-t border-border pt-12">
        <Reveal className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-xl">
            <span className="eyebrow">Event Archive</span>
            <h2 className="mt-4 font-display head-1 leading-none font-semibold">
              Past <span className="text-gradient">editions</span>
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
              Live from apacmedia.in — past conferences across government, health, water and
              education technology.
            </p>
          </div>

          <div className="flex flex-wrap gap-2" aria-label="Filter past events by category">
            {FILTERS.map((c) => (
              <button
                key={c}
                onClick={() => {
                  setCategory(c);
                  setShowAll(false);
                }}
                aria-pressed={category === c}
                className={`rounded-full border px-4 py-2 font-mono text-[11px] uppercase transition-all duration-300 ${
                  category === c
                    ? "border-primary bg-primary text-primary-foreground shadow-elegant"
                    : "border-border text-muted-foreground hover:border-primary/60 hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
            <button
              onClick={() => setCategory(NETWORK)}
              aria-pressed={category === NETWORK}
              className={`rounded-full border-2 px-4 py-2 font-mono text-[11px] uppercase transition-all duration-300 ${
                category === NETWORK
                  ? "border-accent bg-accent text-accent-foreground shadow-elegant"
                  : "border-accent text-accent hover:bg-accent/15"
              }`}
            >
              ★ {NETWORK}
            </button>
          </div>
        </Reveal>

        {category === NETWORK ? (
          <NetworkPanel />
        ) : (
          <>
        {filtered.length === 0 ? (
          <p className="mt-14 text-sm text-muted-foreground">No past conferences in this category yet.</p>
        ) : (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((c, i) => (
              <Reveal key={c.url + c.name + c.date} delay={(i % 3) * 60}>
                <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/50">
                  <div className="aspect-[2/1] overflow-hidden bg-secondary">
                    <img
                      src={c.image}
                      alt={c.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-mono text-[10px] uppercase text-muted-foreground">{c.date}</p>
                      <span className="font-mono text-[10px] uppercase text-primary">{c.category}</span>
                    </div>
                    <h3 className="mt-3 font-display text-lg leading-snug font-medium">{c.name}</h3>
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-auto inline-flex w-fit items-center gap-1 pt-5 text-sm font-medium text-primary hover:underline"
                    >
                      Visit website ↗
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}

        {filtered.length > 12 && (
          <div className="mt-9 flex justify-center">
            <button
              onClick={() => setShowAll((s) => !s)}
              className="rounded-full border border-border px-6 py-2.5 text-sm font-medium transition-all hover:border-primary/60 hover:bg-secondary"
            >
              {showAll ? "Show fewer editions" : "Explore all editions"}
            </button>
          </div>
        )}
          </>
        )}
      </div>
    </main>
  );
}

function NetworkPanel() {
  const { data, isLoading, isError } = useQuery(networkPastQuery);
  return (
    <section className="mt-14 overflow-hidden rounded-xl border border-primary/50 bg-card shadow-elegant">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-3">
        <span className="font-mono text-[11px] uppercase text-primary">
          apacnewsnetwork.com · Past conferences
        </span>
        <a
          href={NETWORK_URL}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-medium text-primary hover:underline"
        >
          Open on site ↗
        </a>
      </div>
      <div className="max-h-[70vh] overflow-y-auto p-5">
        {isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}
        {isError && (
          <p className="text-sm text-muted-foreground">
            Couldn't load this view right now. Use "Open on site" above.
          </p>
        )}
        {data?.map((g) => (
          <div key={g.heading} className="mb-8 last:mb-0">
            <h3 className="eyebrow">{g.heading}</h3>
            <ul className="mt-3 border-t border-border">
              {g.events.map((e) => (
                <li key={e.url + e.name}>
                  <a
                    href={e.url}
                    target="_blank"
                    rel="noreferrer"
                    className="archive-row flex items-center justify-between gap-4 border-b border-border py-3 text-sm"
                  >
                    <span>{e.name}</span>
                    <span className="text-primary">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PastConferencesPage;
