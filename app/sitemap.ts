import { getPosts } from "app/journey/utils";

export const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://larsniet.nl";

export default async function sitemap() {
  const journeys = (await getPosts()).map((post) => ({
    url: `${baseUrl}/journey/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/journey`,
      lastModified: new Date(),
    },
    ...journeys,
  ];
}
