import { useEffect, useState } from "react";
import { useLatestNews } from "@/hooks/use-latest-news";
import { Reveal } from "./Reveal";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

interface LatestNewsProps {
  categorySlug?: string;
  count?: number;
}

const AUTOPLAY_INTERVAL = 4000;

export function LatestNews({ categorySlug = "interviews", count = 8 }: LatestNewsProps) {
  const { posts, loading, error } = useLatestNews(categorySlug, count);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [paused, setPaused] = useState(false);

  // Advance one card at a time, looping back to the start automatically.
  useEffect(() => {
    if (!api || paused || posts.length < 2) return;
    const id = window.setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, AUTOPLAY_INTERVAL);
    return () => window.clearInterval(id);
  }, [api, paused, posts.length]);

  if (loading) return <p className="text-muted-foreground">Loading news...</p>;
  if (error) return <p className="text-destructive">Error: {error}</p>;
  if (!posts.length) return <p className="text-muted-foreground">No news found in this category.</p>;

  return (
    <Carousel
      opts={{ loop: true, align: "start", slidesToScroll: 1 }}
      setApi={setApi}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="w-full mx-auto max-w-7xl px-6 section-pad"
    >
         <div className="mx-auto max-w-7xl  py-6">
                <Reveal className="max-w-2xl">
                  <span className="eyebrow">Interviews</span>
                  <h2 className="mt-5 font-display head-1 font-semibold">
                    Exclusive{" "}
                    <span className="text-gradient">Interviews</span>
                  </h2>
                </Reveal>
                </div>
      <CarouselContent>
        {posts.map((post) => {
          const image = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
          return (
            <CarouselItem
              key={post.id}
              className="basis-full sm:basis-1/2 lg:basis-1/4"
            >
              <article className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card">
                {image && (
                  <img
                    src={image}
                    alt={post.title.rendered}
                    loading="lazy"
                    className="aspect-video w-full object-cover"
                  />
                )}
                <div className="flex flex-1 flex-col p-4">
                  <h3
                    className="inte font-semibold text-foreground"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                  <div
                    className="mt-2 minti text-sm text-muted-foreground line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                  />
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-block pt-3 text-sm font-medium text-primary underline-offset-4 hover:underline"
                  >
                    Read more →
                  </a>
                </div>
              </article>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="-left-3 sm:-left-12" />
      <CarouselNext className="-right-3 sm:-right-12" />
    </Carousel>
  );
}
