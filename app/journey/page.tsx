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
    "@type": "Blog",
    name: "Lars van der Niet — Journey",
    description: "Read about the latest developments in my programming journey.",
    url: `${baseUrl}/journey`,
    author: {
      "@type": "Person",
      name: "Lars van der Niet",
      url: baseUrl,
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.metadata.title,
      datePublished: post.metadata.publishedAt,
      url: `${baseUrl}/journey/${post.slug}`,
    })),
  };

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        My journey
      </h1>
      <JourneyPosts posts={posts} />
    </section>
  );
}
