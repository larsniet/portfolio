import type { Metadata } from "next";
import { JourneyPosts } from "@/app/components/posts";
import { getPosts } from "@/app/journey/utils";
import { baseUrl } from "@/app/sitemap";

export const metadata: Metadata = {
  title: "Journey",
  description: "Read about the latest developments in my programming journey.",
  alternates: {
    canonical: "/journey",
  },
};

export default async function Page() {
  let posts = await getPosts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
          {
            "@type": "ListItem",
            position: 2,
            name: "Journey",
            item: `${baseUrl}/journey`,
          },
        ],
      },
      {
        "@type": "Blog",
        name: "Lars van der Niet — Journey",
        description:
          "Read about the latest developments in my programming journey.",
        url: `${baseUrl}/journey`,
        author: {
          "@type": "Person",
          "@id": "https://larsniet.com/#person",
          name: "Lars van der Niet",
          url: baseUrl,
        },
        blogPost: posts.map((post) => ({
          "@type": "BlogPosting",
          headline: post.metadata.title,
          datePublished: post.metadata.publishedAt,
          url: `${baseUrl}/journey/${post.slug}`,
        })),
      },
    ],
  };

  return (
    <section className="pt-2 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="fade-up fade-up-1 mb-10">
        <h1 className="text-4xl font-semibold tracking-tighter text-black dark:text-white mb-3">
          My journey
        </h1>
        <p className="text-sm text-neutral-400 dark:text-neutral-500 font-(family-name:--font-geist-mono)">
          A log of projects, experiments, and discoveries.
        </p>
      </div>

      <div className="fade-up fade-up-2">
        <div className="flex items-center gap-3 mb-5">
          <p className="text-xs font-medium tracking-widest uppercase text-neutral-400 dark:text-neutral-500 font-(family-name:--font-geist-mono)">
            all posts
          </p>
          <div className="flex-1 h-px bg-neutral-100 dark:bg-neutral-900" />
        </div>
        <JourneyPosts posts={posts} />
      </div>
    </section>
  );
}
