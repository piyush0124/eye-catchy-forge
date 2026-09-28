import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getUpcomingConferences } from "@/lib/events.functions";
import { Reveal } from "./Reveal";

export function UpcomingConferences() {
  const fetchConferences = useServerFn(getUpcomingConferences);
  const { data, isLoading, error } = useQuery({
    queryKey: ["upcoming-conferences"],
    queryFn: () => fetchConferences(),
  });

  if (isLoading) return <p className="text-muted-foreground">Loading conferences...</p>;
  if (error)
    return (
      <p className="text-destructive">
        Error: {error instanceof Error ? error.message : "Something went wrong"}
      </p>
    );
  if (!data?.length)
    return <p className="text-muted-foreground">No upcoming conferences right now.</p>;

  return (
    <section className="section-pad relative overflow-hidden border-y border-border bg-surface/40">
      <div className="bg-gradient-soft pointer-events-none absolute -bottom-40 -right-24 h-[420px] w-[420px] rounded-full blur-3xl" />
      <div className="mx-auto max-w-7xl px-6">
        
         <div className="mx-auto max-w-7xl  py-6">
                <Reveal className="max-w-2xl">
                  <span className="eyebrow">Upcoming Conferences
</span>
                  <h2 className=" font-display head-1 font-semibold">
                    Where enterprise technology leadership {" "}
                    <span className="text-gradient">converges</span>
                  </h2>
                </Reveal>
                </div>
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 w-full mx-auto max-w-7xl ">
      
      {data.map((conf) => (
        <article
          key={conf.title}
          className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card group glass-panel up-1 flex h-full flex-col overflow-hidden rounded-3xl transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-elegant"
        >
          {conf.image && (
            <img
              src={conf.image}
              alt={conf.title}
              loading="lazy"
              className="aspect-video w-full "
            />
          )}
          <div className="flex flex-1 flex-col p-4">
            <h3 className="inte font-semibold text-foreground">{conf.title}</h3>
            <p className="mt-2 text-muted-foreground" style={{'fontSize': '13px;'}}>{conf.description}</p>
            {conf.link && (
              
              <a
                    href={conf.link}
                    className="mt-auto inline-block pt-3 text-sm font-medium text-primary underline-offset-4 hover:underline mt-6 inline-flex w-fit rounded-full border border-border px-5 py-2 text-sm font-medium transition-colors group-hover:border-primary/60 hover:bg-secondary"
                  >
                    Register interest →
                  </a>
            )}
          </div>
        </article>
      ))}
    </div>
    </div>
    </section>
  );
}
