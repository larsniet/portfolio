import { getPosts } from "@/app/journey/utils";

export const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://larsniet.com";

// One entry per locale, each pointing at its sibling via hreflang
const entry = (path: string, lastModified: Date | string) => {
  const en = `${baseUrl}${path}`;
  const nl = `${baseUrl}/nl${path}`;
  const alternates = { languages: { en, nl, "x-default": en } };
  return [
    { url: en, lastModified, alternates },
    { url: nl, lastModified, alternates },
  ];
};

export default async function sitemap() {
  const posts = await getPosts();
  return [
    ...entry("", new Date()),
    ...entry("/journey", new Date()),
    ...entry("/contact", new Date()),
    ...posts.flatMap((post) =>
      entry(`/journey/${post.slug}`, post.metadata.publishedAt),
    ),
  ];
}
