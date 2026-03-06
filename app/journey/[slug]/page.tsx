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
                        post.metadata.title
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
          <p className="text-xs text-neutral-400 dark:text-neutral-500 font-[family-name:var(--font-geist-mono)] tabular-nums">
            {formatDate(post.metadata.publishedAt)}
          </p>
        </div>
        <article className="prose prose-quoteless prose-neutral dark:prose-invert fade-up fade-up-2">
          {post.content}
        </article>
      </section>
    );
  } catch (error) {
    console.error("[Journey] Error rendering post:", error);
    throw error;
  }
}
