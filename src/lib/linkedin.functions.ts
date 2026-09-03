import { createServerFn } from "@tanstack/react-start";

export type LinkedInPost = {
  id: string;
  text: string;
  url: string;
  publishedAt: number | null;
  imageUrl: string | null;
};

export const COMPANY_URL = "https://www.linkedin.com/company/cxomedia/";

const fallbackPosts: LinkedInPost[] = [
  {
    id: "fallback-1",
    text: "Registrations are open for the CIO Leadership Summit 2026 in New Delhi — two days of candid, practitioner-led conversation on enterprise AI, cloud and digital resilience.",
    url: COMPANY_URL,
    publishedAt: null,
    imageUrl: null,
  },
  {
    id: "fallback-2",
    text: "Highlights from our CISO Security Forum: zero-trust rollouts, AI-driven threat detection and how boards are re-pricing cyber risk in 2026.",
    url: COMPANY_URL,
    publishedAt: null,
    imageUrl: null,
  },
  {
    id: "fallback-3",
    text: "Thank you to the 250+ technology leaders who joined the Digital Transformation Summit in Hyderabad. The agenda for the next edition is already taking shape.",
    url: COMPANY_URL,
    publishedAt: null,
    imageUrl: null,
  },
  {
    id: "fallback-4",
    text: "New research drop: our annual CIO Priorities study on where enterprise technology budgets are actually moving this year.",
    url: COMPANY_URL,
    publishedAt: null,
    imageUrl: null,
  },
  {
    id: "fallback-5",
    text: "Closed-door CXO roundtables remain our most requested format — small rooms, no slides, real numbers. Write to us to request a seat.",
    url: COMPANY_URL,
    publishedAt: null,
    imageUrl: null,
  },
];

type LinkedInApiPost = {
  id?: string;
  commentary?: string;
  createdAt?: number;
  publishedAt?: number;
  content?: { media?: { id?: string } };
};

/**
 * Fetches the 5 latest posts from the CXO Media LinkedIn company page.
 *
 * Requires two server secrets (LinkedIn Community Management API app with an
 * approved organization access token):
 *   LINKEDIN_ACCESS_TOKEN — OAuth token with r_organization_social
 *   LINKEDIN_ORG_ID       — numeric organization id of the company page
 *
 * When they are absent or LinkedIn rejects the call, curated fallback posts
 * are returned so the section always renders.
 */
export const getLinkedInPosts = createServerFn({ method: "GET" }).handler(
  async (): Promise<{ posts: LinkedInPost[]; live: boolean }> => {
    const token = process.env["LINKEDIN_ACCESS_TOKEN"];
    const orgId = process.env["LINKEDIN_ORG_ID"];
    if (!token || !orgId) return { posts: fallbackPosts, live: false };

    try {
      const author = encodeURIComponent(`urn:li:organization:${orgId}`);
      const res = await fetch(
        `https://api.linkedin.com/rest/posts?author=${author}&q=author&count=5&sortBy=LAST_MODIFIED`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "LinkedIn-Version": "202508",
            "X-Restli-Protocol-Version": "2.0.0",
          },
        },
      );
      if (!res.ok) {
        console.error(`LinkedIn API ${res.status}: ${await res.text().catch(() => "")}`);
        return { posts: fallbackPosts, live: false };
      }
      const json = (await res.json()) as { elements?: LinkedInApiPost[] };
      const posts = (json.elements ?? [])
        .slice(0, 5)
        .map((el, i): LinkedInPost => {
          const id = el.id ?? `post-${i}`;
          return {
            id,
            text: el.commentary?.trim() || "View this update on LinkedIn.",
            url: `https://www.linkedin.com/feed/update/${id}/`,
            publishedAt: el.publishedAt ?? el.createdAt ?? null,
            imageUrl: null,
          };
        });
      if (posts.length === 0) return { posts: fallbackPosts, live: false };
      return { posts, live: true };
    } catch (error) {
      console.error(error);
      return { posts: fallbackPosts, live: false };
    }
  },
);
