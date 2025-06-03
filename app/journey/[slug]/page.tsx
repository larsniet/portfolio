import { notFound } from "next/navigation";
import { formatDate } from "app/journey/utils";
import { baseUrl } from "app/sitemap";
import { getPost, getPosts } from "app/journey/utils";

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

export async function generateMetadata({ params }: Props) {
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
      <section>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
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
                name: "Lars van der Niet",
              },
            }),
          }}
        />
        <h1 className="title font-semibold tracking-tighter">
          {post.metadata.title}
        </h1>
        <div className="flex justify-between items-center mt-2 mb-8 text-sm">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {formatDate(post.metadata.publishedAt)}
          </p>
        </div>
        <article className="prose prose-quoteless prose-neutral dark:prose-invert">
          {post.content}
        </article>
      </section>
    );
  } catch (error) {
    console.error("[Journey] Error rendering post:", error);
    throw error;
  }
}
