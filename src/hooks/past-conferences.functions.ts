import { createServerFn } from "@tanstack/react-start";

export const CATEGORIES = ["Gov Tech", "Health Tech", "Water Tech", "Education & Skill"] as const;
export type Category = (typeof CATEGORIES)[number];

export type PastConference = {
  name: string;
  date: string;
  year: string;
  image: string;
  url: string;
  category: Category;
};

const SOURCE_URL = "https://apacmedia.in/";

function decode(input: string) {
  return input
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#8211;|&ndash;/g, "–")
    .replace(/&#8217;|&rsquo;/g, "’")
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, c: string) => String.fromCharCode(Number(c)))
    .replace(/\s+/g, " ")
    .trim();
}

export function categorize(name: string, url: string): Category {
  const t = `${name} ${url}`.toLowerCase();
  if (/water|swmc|rain|groundwater/.test(t)) return "Water Tech";
  if (/health|pharma|medic|hospital/.test(t)) return "Health Tech";
  if (/skill|education|edu|school|university|coursera|nswic|\bhr\b|nextgen-hr/.test(t))
    return "Education & Skill";
  return "Gov Tech";
}

export function parsePastConferences(raw: string): PastConference[] {
  // Commented-out <img> tags on the source caused images to shift between events.
  const html = raw.replace(/<!--[\s\S]*?-->/g, "");
  const start = html.indexOf('id="past-conferences"');
  if (start === -1) return [];
  const end = html.indexOf("</section>", start);
  const section = html.slice(start, end === -1 ? undefined : end);

  // Parse each event card on its own so image, date and title always stay together.
  const blocks = section.split(/<div class="col-lg-3/).slice(1);
  const out: PastConference[] = [];
  const seen = new Set<string>();
  for (const b of blocks) {
    const link = b.match(/<h5[^>]*>\s*<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/);
    const name = decode(link?.[2] ?? "");
    if (!name) continue;
    const url = link?.[1] ?? "";
    const image = b.match(/<img[^>]*\ssrc="([^"]+)"/)?.[1] ?? "";
    const date = decode(b.match(/class="date[^"]*"[^>]*>([\s\S]*?)<\/span>/)?.[1] ?? "").replace(
      /\s+,/g,
      ",",
    );
    const key = `${name}|${date}|${url}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const year = date.match(/20\d{2}/)?.[0] ?? "";
    out.push({ name, date, year, image, url, category: categorize(name, url) });
  }
  return out;
}

export const getPastConferences = createServerFn({ method: "GET" }).handler(async () => {
  const res = await fetch(SOURCE_URL, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36",
      Accept: "text/html",
    },
  });
  if (!res.ok) throw new Error(`Source responded with ${res.status}`);
  return parsePastConferences(await res.text());
});
