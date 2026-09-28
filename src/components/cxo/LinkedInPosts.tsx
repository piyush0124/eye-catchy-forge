import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "../ui/carousel";

const FEED_URL = "https://rss.app/feeds/B8BhDSW0tOlR8RVi.xml";
const SITE_ORIGIN = "https://apacnewsnetwork.com";
const FEED_CACHE_KEY = "linkedin-posts-feed-v1";
const IMAGE_CACHE_KEY = "linkedin-posts-images-v1";
const REFRESH_INTERVAL = 5 * 60 * 1000;

interface Post {
  id: string;
  title: string;
  content: string;
  date: string;
  link: string;
  image: string | null;
}
interface Feed {
  name: string;
  logo: string;
  link: string;
  followers: string;
}
interface FeedData { posts: Post[]; feed: Feed }
interface Preview { image: string; link: string }

function safeUrl(value: string | null | undefined): string {
  if (!value) return "";
  try { const url = new URL(value); return url.protocol === "https:" ? url.href : ""; } catch { return ""; }
}
function textOf(html: string): string {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}
function parseFeed(xml: string): FeedData {
  const doc = new DOMParser().parseFromString(xml, "application/xml");
  if (doc.querySelector("parsererror")) throw new Error("Invalid feed");
  const channel = doc.querySelector("channel");
  if (!channel) throw new Error("Feed unavailable");
  const read = (el: Element, tag: string) => el.querySelector(tag)?.textContent?.trim() || "";
  const description = read(channel, "description");
  const feed: Feed = {
    name: read(channel, "title").replace(/\s*\|\s*LinkedIn\s*$/i, "") || "LinkedIn",
    logo: safeUrl(read(channel, "image > url")),
    link: safeUrl(read(channel, "link")) || "https://www.linkedin.com/",
    followers: description.match(/([\d,.]+\s*[KkMm]?)\s+followers/)?.[1] || "",
  };
  const posts = [...channel.querySelectorAll("item")].slice(0, 5).map((item, index) => {
    const content = read(item, "description") || read(item, "content\\:encoded");
    const body = new DOMParser().parseFromString(content, "text/html");
    const media = [...item.children].find(el => el.localName === "content" && el.namespaceURI?.includes("mrss"));
    const image = safeUrl(media?.getAttribute("url") || body.querySelector("img")?.getAttribute("src"));
    return {
      id: read(item, "guid") || String(index),
      title: read(item, "title"),
      content,
      date: read(item, "pubDate"),
      link: safeUrl(read(item, "link")) || feed.link,
      image: image || null,
    };
  });
  if (!posts.length) throw new Error("No posts");
  return { feed, posts };
}
function headlineOf(post: Post) {
  return (textOf(post.title).normalize("NFKD").split(/read more|read the full/i)[0] || "")
    .replace(/https?:\/\/\S+/g, "").replace(/#\S+/g, "").replace(/\.{3}$/, "").trim();
}
function normalize(s: string) {
  return s.normalize("NFKD").toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, " ").trim();
}
function slugify(s: string) {
  return s.normalize("NFKD").toLowerCase().replace(/&/g, " ").replace(/['’‘"“”]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function readImageCache(): Record<string, Preview> {
  try { return JSON.parse(localStorage.getItem(IMAGE_CACHE_KEY) || "{}"); } catch { return {}; }
}
function saveImage(key: string, result: Preview) {
  try { localStorage.setItem(IMAGE_CACHE_KEY, JSON.stringify({ ...readImageCache(), [key]: result })); } catch { /* storage disabled */ }
}
async function microlinkImage(url: string): Promise<string> {
  try {
    const response = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(url)}`);
    if (!response.ok) return "";
    const json = await response.json();
    const landed = json?.data?.url;
    if (typeof landed === "string" && /linkedin\.com\/safety\/go/i.test(landed)) {
      const target = new URL(landed).searchParams.get("url");
      if (target) return microlinkImage(target);
    }
    const image = safeUrl(json?.data?.image?.url);
    return /static\.licdn\.com|linkedin\.com\/.*logo/i.test(image) ? "" : image;
  } catch { return ""; }
}
async function resolveThumbnail(post: Post): Promise<Preview | null> {
  const headline = headlineOf(post);
  const key = post.id;
  const cached = readImageCache()[key];
  if (cached) return cached;
  if (headline) {
    try {
      const search = headline.split(/\s+/).slice(0, 8).join(" ");
      const response = await fetch(`${SITE_ORIGIN}/wp-json/wp/v2/posts?search=${encodeURIComponent(search)}&per_page=5&_embed=wp:featuredmedia&_fields=title,link,jetpack_featured_media_url,_embedded`);
      if (response.ok) {
        const results = await response.json();
        const target = normalize(headline);
        const hit = Array.isArray(results) && results.find((p: { title?: { rendered?: string } }) => {
          const title = normalize(textOf(p.title?.rendered || ""));
          return title && (title === target || title.startsWith(target) || target.startsWith(title));
        });
        if (hit) {
          const image = safeUrl(hit.jetpack_featured_media_url || hit._embedded?.["wp:featuredmedia"]?.[0]?.source_url);
          const link = safeUrl(hit.link);
          if (image && link) { const result = { image, link }; saveImage(key, result); return result; }
        }
      }
    } catch { /* try link metadata instead */ }
    const date = new Date(post.date);
    if (!Number.isNaN(date.getTime())) {
      const guessed = `${SITE_ORIGIN}/${date.getUTCFullYear()}/${String(date.getUTCMonth() + 1).padStart(2, "0")}/${slugify(headline)}/`;
      const image = await microlinkImage(guessed);
      if (image) { const result = { image, link: guessed }; saveImage(key, result); return result; }
    }
  }
  const document = new DOMParser().parseFromString(post.content, "text/html");
  const shared = [...document.querySelectorAll("a[href]")].map(a => safeUrl(a.getAttribute("href")))
    .find(href => href.includes("lnkd.in")) || [...document.querySelectorAll("a[href]")]
    .map(a => safeUrl(a.getAttribute("href"))).find(href => href && !href.includes("linkedin.com"));
  if (shared) {
    const image = await microlinkImage(shared);
    if (image) { const result = { image, link: shared }; saveImage(key, result); return result; }
  }
  return null;
}
function timeAgo(date: string) {
  const seconds = (Date.now() - new Date(date).getTime()) / 1000;
  if (Number.isNaN(seconds)) return "";
  if (seconds < 3600) return `${Math.max(1, Math.floor(seconds / 60))}m`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d`;
  if (seconds < 2592000) return `${Math.floor(seconds / 604800)}w`;
  return `${Math.floor(seconds / 2592000)}mo`;
}

function LinkedInGlyph() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45z" /></svg>;
}
const actions = [
  { label: "Like", paths: <path d="M7 10v12M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" /> },
  { label: "Comment", paths: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /> },
  { label: "Repost", paths: <><path d="m2 9 3-3 3 3M13 18H7a2 2 0 0 1-2-2V6m17 9-3 3-3-3M11 6h6a2 2 0 0 1 2 2v10" /></> },
  { label: "Send", paths: <><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></> },
];
function RichText({ html, fallback }: { html: string; fallback: string }) {
  const document = new DOMParser().parseFromString(html, "text/html");
  const nodes: React.ReactNode[] = [];
  let count = 0;
  function walk(node: Node) {
    node.childNodes.forEach(child => {
      if (child.nodeType === 3) { nodes.push(child.textContent); return; }
      if (child.nodeType !== 1) return;
      const element = child as Element;
      if (element.tagName === "IMG") return;
      if (element.tagName === "BR") { nodes.push("\n"); return; }
      if (element.tagName === "A") {
        const text = element.textContent?.trim() || "";
        const style = text.startsWith("#") ? "hashtag" : /^https?:\/\//i.test(text) ? "ln-link" : "mention";
        nodes.push(<span className={style} key={count++}>{text}</span>);
        return;
      }
      walk(child);
    });
  }
  walk(document.body);
  return <>{nodes.length ? nodes : fallback}</>;
}
function Skeleton() {
  return <div className="skeleton-card"><div className="skeleton-head"><div className="sk skeleton-avatar" /><div className="skeleton-meta"><div className="sk skeleton-name" /><div className="sk skeleton-sub" /></div></div><div className="sk skeleton-line" /><div className="sk skeleton-line short" /><div className="sk skeleton-line shorter" /></div>;
}
function PostCard({ post, feed, preview }: { post: Post; feed: Feed; preview: Preview | undefined }) {
  const [expanded, setExpanded] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [avatarFailed, setAvatarFailed] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const check = () => { if (textRef.current && !expanded) setShowMore(textRef.current.scrollHeight > textRef.current.clientHeight + 2); };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [post.content, expanded]);
  const image = post.image || preview?.image;
  const mediaLink = post.image ? post.link : preview?.link;
  return <article className="li-post">
    <div className="post-head">
      <a className="avatar-link" href={feed.link} target="_blank" rel="noopener noreferrer" aria-label={`${feed.name} on LinkedIn`}>
        {feed.logo && !avatarFailed ? <img className="avatar" src={feed.logo} alt="" onError={() => setAvatarFailed(true)} /> : <span className="avatar-fallback"><LinkedInGlyph /></span>}
      </a>
      <div className="head-meta">
        <a className="author" href={feed.link} target="_blank" rel="noopener noreferrer">{feed.name}</a>
        {feed.followers && <div className="sub">{feed.followers} followers</div>}
        <div className="sub">{timeAgo(post.date)} <span aria-hidden="true">•</span> <svg viewBox="0 0 24 24" aria-label="Public post"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg></div>
      </div>
      <a className="follow" href={feed.link} target="_blank" rel="noopener noreferrer">+ Follow</a>
    </div>
    <div ref={textRef} className={`post-text${expanded ? "" : " clamped"}`}><RichText html={post.content} fallback={post.title} /></div>
    {showMore && !expanded && <button className="more-btn" type="button" onClick={() => setExpanded(true)}>…more</button>}
    {image && mediaLink && !imageFailed && <div className="post-media">
      {post.image ? <a href={mediaLink} target="_blank" rel="noopener noreferrer"><img className="media-img" src={image} alt="" loading="lazy" onError={() => setImageFailed(true)} /></a>
        : <a className="link-card" href={mediaLink} target="_blank" rel="noopener noreferrer"><img src={image} alt="" loading="lazy" onError={() => setImageFailed(true)} /><div className="link-card-body"><div className="lc-title">{headlineOf(post)}</div><div className="lc-host">{new URL(mediaLink).hostname.replace(/^www\./, "")}</div></div></a>}
    </div>}
    <div className="post-actions">{actions.map(action => <a className="action" key={action.label} href={post.link} target="_blank" rel="noopener noreferrer" aria-label={action.label} title={action.label}><svg viewBox="0 0 24 24" aria-hidden="true">{action.paths}</svg><span>{action.label}</span></a>)}</div>
  </article>;
}
export function LinkedInPosts() {
  const [data, setData] = useState<FeedData | null>(null);
  const [previews, setPreviews] = useState<Record<string, Preview>>({});
  const [checked, setChecked] = useState<Date | null>(null);
  const [fromCache, setFromCache] = useState(false);
  const [error, setError] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    let active = true;
    try {
      const cached = JSON.parse(localStorage.getItem(FEED_CACHE_KEY) || "null") as FeedData | null;
      if (cached?.posts?.length && cached.feed) { setData(cached); setFromCache(true); setChecked(new Date()); }
    } catch { /* storage disabled */ }
    async function refresh() {
      try {
        const response = await fetch(FEED_URL);
        if (!response.ok) throw new Error("Could not fetch posts");
        const next = parseFeed(await response.text());
        if (!active) return;
        setData(next); setFromCache(false); setChecked(new Date()); setError(false);
        try { localStorage.setItem(FEED_CACHE_KEY, JSON.stringify(next)); } catch { /* storage disabled */ }
      } catch { if (active) setError(true); }
    }
    refresh();
    const interval = window.setInterval(refresh, REFRESH_INTERVAL);
    return () => { active = false; window.clearInterval(interval); };
  }, []);
  useEffect(() => {
    if (!data) return;
    let active = true;
    data.posts.filter(post => !post.image).forEach(async post => {
      const preview = await resolveThumbnail(post);
      if (active && preview) setPreviews(current => ({ ...current, [post.id]: preview }));
    });
    return () => { active = false; };
  }, [data]);
  useEffect(() => {
    if (!api) return;
    const syncSlide = () => setActiveSlide(api.selectedScrollSnap());
    syncSlide();
    api.on("select", syncSlide);
    api.on("reInit", syncSlide);
    return () => { api.off("select", syncSlide); api.off("reInit", syncSlide); };
  }, [api]);
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReduceMotion(motion.matches);
    const syncVisibility = () => setVisible(!document.hidden);
    syncMotion(); syncVisibility();
    motion.addEventListener("change", syncMotion);
    document.addEventListener("visibilitychange", syncVisibility);
    return () => { motion.removeEventListener("change", syncMotion); document.removeEventListener("visibilitychange", syncVisibility); };
  }, []);
  useEffect(() => {
    if (!api || !data || data.posts.length < 2 || paused || !visible || reduceMotion) return;
    const interval = window.setInterval(() => api.scrollNext(), 5000);
    return () => window.clearInterval(interval);
  }, [api, data, paused, visible, reduceMotion]);
  return <main className="linkedin-feed">
    <div className="section-header"><span className="badge"><LinkedInGlyph /></span><h2 className=" font-display head-1 leading-none font-semibold">
              Latest <span className="text-gradient">Linkedin Posts</span>
            </h2></div>
    {data ? <div className="feed-carousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}>
      <Carousel opts={{ loop: true, align: "start", slidesToScroll: 1 }} setApi={setApi} aria-label="Latest LinkedIn posts">
        <CarouselContent className="feed-carousel-track">
          {data.posts.map((post, index) => <CarouselItem className="feed-carousel-slide" key={post.id} aria-label={`${index + 1} of ${data.posts.length}`}><PostCard post={post} feed={data.feed} preview={previews[post.id]} /></CarouselItem>)}
        </CarouselContent>
      </Carousel>
      {data.posts.length > 1 && <div className="carousel-controls">
        <Button type="button" size="icon" variant="outline" className="carousel-arrow" aria-label="Previous post" title="Previous post" onClick={() => api?.scrollPrev()}><ChevronLeft /></Button>
        <div className="carousel-dots" aria-label="Select post">{data.posts.map((post, index) => <Button key={post.id} type="button" size="icon" variant="ghost" className={`carousel-dot-button${index === activeSlide ? " is-active" : ""}`} aria-label={`Go to post ${index + 1}`} aria-current={index === activeSlide ? "true" : undefined} onClick={() => api?.scrollTo(index)}><span /></Button>)}</div>
        <Button type="button" size="icon" variant="outline" className="carousel-arrow" aria-label="Next post" title="Next post" onClick={() => api?.scrollNext()}><ChevronRight /></Button>
      </div>}
    </div> : error ? <div className="error-state">Couldn't load posts right now.</div> : <div className="post-grid"><Skeleton /><Skeleton /><Skeleton /></div>}
    {checked && <p className="refresh-note">{fromCache && error ? "Showing cached posts · " : ""}Last checked: {checked.toLocaleTimeString()}</p>}
  </main>;
}
