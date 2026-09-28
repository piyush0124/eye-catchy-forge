import { createServerFn } from "@tanstack/react-start";

export type NetworkGroup = { heading: string; events: { name: string; url: string }[] };

const SOURCE_URL = "https://apacnewsnetwork.com/events/";

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

export function parseNetworkPast(raw: string): NetworkGroup[] {
  const html = raw.replace(/<!--[\s\S]*?-->/g, "");
  const start = html.indexOf('id="past-conferences"');
  if (start === -1) return [];
  const end = html.indexOf("Head Office", start);
  const section = html.slice(start, end === -1 ? start + 200000 : end);
  const re =
    /<h[24][^>]*>([\s\S]*?)<\/h[24]>|<a href="(https:\/\/apacnewsnetwork\.com\/[^"]+)"[^>]*>([\s\S]*?)<\/a>/g;
  const groups: NetworkGroup[] = [];
  const seen = new Set<string>();
  let current: NetworkGroup | null = null;
  let skip = false;
  let m: RegExpExecArray | null;
  while ((m = re.exec(section)) !== null) {
    if (m[1] !== undefined) {
      const heading = decode(m[1]);
      if (!heading) continue;
      skip = /upcoming|our platforms/i.test(heading);
      if (!skip) {
        current = { heading: /^customize$/i.test(heading) ? "Custom Series" : heading, events: [] };
        groups.push(current);
      }
      continue;
    }
    if (skip) continue;
    const name = decode(m[3] ?? "").replace(/^[\s|]+|[\s|]+$/g, "");
    if (!name) continue;
    const url = m[2] ?? "";
    if (seen.has(url + name)) continue;
    seen.add(url + name);
    if (!current) {
      current = { heading: "Past Conferences", events: [] };
      groups.push(current);
    }
    current.events.push({ name, url });
  }
  return groups.filter((g) => g.events.length > 0);
}

export const getNetworkPast = createServerFn({ method: "GET" }).handler(async () => {
  const res = await fetch(SOURCE_URL, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36",
      Accept: "text/html",
    },
  });
  if (!res.ok) throw new Error(`Source responded with ${res.status}`);
  return parseNetworkPast(await res.text());
});
