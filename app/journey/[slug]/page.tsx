import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { formatDate, getPost, getPosts } from "@/app/journey/utils";
import { baseUrl } from "@/app/sitemap";

export const dynamic = "force-static";
export const revalidate = 3600;

type Props = {
  params: Promise<any>;
  searchParams: Promise<any>;
};

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested post could not be found.",
    };
  }

  const ogImage = post.metadata.image
    ? post.metadata.image
    : `${baseUrl}/og?title=${encodeURIComponent(post.metadata.title)}`;

  return {
    title: post.metadata.title,
    description: post.metadata.summary,
    alternates: {
      canonical: `/journey/${slug}`,
    },
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.summary,
      type: "article",
      publishedTime: post.metadata.publishedAt,
      url: `${baseUrl}/journey/${slug}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metadata.title,
      description: post.metadata.summary,
      images: [ogImage],
    },
  };
}

export default async function Journey({ params }: Props) {
  try {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
      notFound();
    }

    // ponytail: 3 newest other posts, no tag/similarity matching
    const readMore = (await getPosts())
      .filter((p) => p.slug !== slug)
      .sort(
        (a, b) =>
          new Date(b.metadata.publishedAt).getTime() -
          new Date(a.metadata.publishedAt).getTime(),
      )
      .slice(0, 3);

    return (
      <section className="pt-2 pb-16">
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "BreadcrumbList",
                  itemListElement: [
                    {
                      "@type": "ListItem",
                      position: 1,
                      name: "Home",
                      item: baseUrl,
                    },
                    {
                      "@type": "ListItem",
                      position: 2,
                      name: "Journey",
                      item: `${baseUrl}/journey`,
                    },
                    {
                      "@type": "ListItem",
                      position: 3,
                      name: post.metadata.title,
                      item: `${baseUrl}/journey/${slug}`,
                    },
                  ],
                },
                {
                  "@type": "BlogPosting",
                  headline: post.metadata.title,
                  datePublished: post.metadata.publishedAt,
                  dateModified: post.metadata.publishedAt,
                  description: post.metadata.summary,
                  image: post.metadata.image
                    ? `${baseUrl}${post.metadata.image}`
                    : `${baseUrl}/og?title=${encodeURIComponent(
                        post.metadata.title,
                      )}`,
                  url: `${baseUrl}/journey/${slug}`,
                  author: {
                    "@type": "Person",
                    "@id": "https://larsniet.com/#person",
                    name: "Lars van der Niet",
                    url: baseUrl,
                  },
                },
              ],
            }),
          }}
        />
        <div className="fade-up fade-up-1 mb-6">
          <p className="text-xs text-neutral-500 dark:text-neutral-400 font-(family-name:--font-geist-mono) tabular-nums">
            {formatDate(post.metadata.publishedAt)}
          </p>
        </div>
        <article className="prose prose-quoteless prose-neutral dark:prose-invert fade-up fade-up-2">
          {post.metadata.image && (
            <img
              src={post.metadata.image}
              alt={post.metadata.title}
              className="w-full rounded-lg mb-8 not-prose"
            />
          )}
          {post.content}
        </article>
        <aside className="mt-16 pt-8 border-t border-neutral-100 dark:border-neutral-900 fade-up fade-up-3">
          <p className="text-xs font-medium text-neutral-500 tabular-nums font-(family-name:--font-geist-mono) mb-1 select-none">
            Read more
          </p>
          {readMore.map((p) => (
            <Link
              key={p.slug}
              href={`/journey/${p.slug}`}
              className="post-row group flex items-baseline gap-4 py-2.5 border-b border-neutral-100 dark:border-neutral-900"
            >
              <span className="shrink-0 w-16 text-xs text-neutral-500 dark:text-neutral-400 tabular-nums font-(family-name:--font-geist-mono) whitespace-nowrap">
                {new Date(`${p.metadata.publishedAt}T00:00:00`).toLocaleString(
                  "en-us",
                  { month: "short", year: "numeric" },
                )}
              </span>
              <span className="text-sm text-neutral-700 dark:text-neutral-300 tracking-tight group-hover:text-black dark:group-hover:text-white transition-colors duration-200 min-w-0">
                {p.metadata.title}
              </span>
            </Link>
          ))}
        </aside>
      </section>
    );
  } catch (error) {
    console.error("[Journey] Error rendering post:", error);
    throw error;
  }
}
