import { useEffect, useState } from "react";

export interface WpPost {
  id: number;
  date: string;
  link: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  cleanTitle: string;
  cleanExcerpt: string;
  featuredImage?: string;
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url?: string;
      alt_text?: string;
    }>;
  };
}

const API_BASE =
  import.meta.env["VITE_WP_API_BASE"] ??
  "https://apacnewsnetwork.com/wp-json/wp/v2";

/**
 * Decodes WordPress HTML entities and strips unwanted enclosing HTML tags.
 */
function cleanWpHtml(raw?: string): string {
  if (!raw) return "";
  return raw
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#8211;|&ndash;/g, "–")
    .replace(/&#8212;|&mdash;/g, "—")
    .replace(/&#8216;|&lsquo;/g, "‘")
    .replace(/&#8217;|&rsquo;/g, "’")
    .replace(/&#8220;|&ldquo;/g, "“")
    .replace(/&#8221;|&rdquo;/g, "”")
    .replace(/&quot;/g, '"')
    .replace(/&#038;/g, "&")
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCharCode(Number(code)))
    .replace(/\s+/g, " ")
    .trim();
}

export function useLatestNews(categorySlug?: string, count = 5) {
  const [posts, setPosts] = useState<WpPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({
          per_page: String(count),
          _embed: "1",
          // Only fetch necessary fields to keep network payload light and fast
          _fields: "id,date,link,title,excerpt,_links,_embedded",
        });

        // Resolve category slug if provided
        if (categorySlug && categorySlug.trim() !== "" && categorySlug !== "all") {
          const catRes = await fetch(
            `${API_BASE}/categories?slug=${encodeURIComponent(categorySlug.trim())}&_fields=id,slug`
          );
          if (!catRes.ok) {
            throw new Error(`Failed to resolve category (${catRes.status})`);
          }
          const categories: { id: number }[] = await catRes.json();
          if (categories.length > 0) {
            params.set("categories", String(categories[0].id));
          }
        }

        const res = await fetch(`${API_BASE}/posts?${params.toString()}`);
        if (!res.ok) {
          throw new Error(`Failed to load news posts (${res.status})`);
        }

        const rawData: WpPost[] = await res.json();

        // Format clean titles, excerpts, and direct image links
        const formattedPosts: WpPost[] = rawData.map((post) => ({
          ...post,
          cleanTitle: cleanWpHtml(post.title?.rendered),
          cleanExcerpt: cleanWpHtml(post.excerpt?.rendered),
          featuredImage:
            post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || undefined,
        }));

        if (!cancelled) {
          setPosts(formattedPosts);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load posts");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [categorySlug, count]);

  return { posts, loading, error };
}
