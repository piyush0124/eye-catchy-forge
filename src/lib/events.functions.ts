import { createServerFn } from "@tanstack/react-start";

export interface UpcomingConference {
  title: string;
  description: string;
  image: string | null;
  link: string | null;
}

const PAGE_URL =
  "https://apacnewsnetwork.com/wp-json/wp/v2/pages?slug=events&_fields=content";

function decodeBlock(raw: string): string {
  const base64 = raw.trim();
  const decoded =
    typeof atob === "function"
      ? atob(base64)
      : Buffer.from(base64, "base64").toString("binary");
  // The theme stores URI-encoded HTML inside base64.
  try {
    return decodeURIComponent(decoded);
  } catch {
    return decoded;
  }
}

function pick(html: string, className: string): string | null {
  const match = new RegExp(
    `class="${className}"[^>]*>([\\s\\S]*?)<\\/div>`,
    "i"
  ).exec(html);
  return match?.[1]?.replace(/<[^>]*>/g, "").trim() ?? null;
}

export const getUpcomingConferences = createServerFn({ method: "GET" }).handler(
  async (): Promise<UpcomingConference[]> => {
    const res = await fetch(PAGE_URL, {
      headers: { accept: "application/json" },
    });
    if (!res.ok) throw new Error(`Failed to load events page (${res.status})`);
    const pages = (await res.json()) as { content?: { rendered?: string } }[];
    const content = pages[0]?.content?.rendered ?? "";

    const blocks = [...content.matchAll(/\[vc_raw_html\]([\s\S]*?)\[\/vc_raw_html\]/g)]
      .map((m) => decodeBlock(m[1] ?? ""));

    // Blocks between the "Upcoming Conferences" heading and the next heading
    // are the upcoming conference cards.
    const start = blocks.findIndex((b) => /upcoming conferences/i.test(b));
    const cards: UpcomingConference[] = [];
    for (let i = start + 1; i < blocks.length; i++) {
      const html = blocks[i] ?? "";
      if (/<h2/i.test(html)) break;
      const title = pick(html, "my-title");
      if (!title) continue;
      cards.push({
        title,
        description: pick(html, "my-desc") ?? "",
        image: /<img[^>]+src="([^"]+)"/i.exec(html)?.[1] ?? null,
        link: /<a[^>]+href="([^"]+)"/i.exec(html)?.[1] ?? null,
      });
    }
    return cards;
  }
);
