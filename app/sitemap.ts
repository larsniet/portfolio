import { getJourneyPosts } from "app/journey/utils";

export const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://larsniet.nl";

export default async function sitemap() {
  let journeys = getJourneyPosts().map((post) => ({
    url: `${baseUrl}/journey/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  let routes = ["", "/journey"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...journeys];
}
