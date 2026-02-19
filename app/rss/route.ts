import { getPosts } from "@/app/journey/utils";
import { baseUrl } from "@/app/sitemap";

export const revalidate = 3600;

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = await getPosts();

  const items = posts
    .sort((a, b) =>
      new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
        ? -1
        : 1
    )
    .map((post) => {
      const link = `${baseUrl}/journey/${post.slug}`;
      const title = escapeXml(post.metadata.title);
      const description = escapeXml(post.metadata.summary);
      const pubDate = new Date(post.metadata.publishedAt).toUTCString();
      const guid = escapeXml(link);

      return `
    <item>
      <title>${title}</title>
      <link>${link}</link>
      <guid>${guid}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${description}</description>
    </item>`;
    })
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Lars van der Niet - Journey</title>
    <link>${baseUrl}/journey</link>
    <description>Latest posts from my programming journey.</description>
    <language>en-us</language>${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
