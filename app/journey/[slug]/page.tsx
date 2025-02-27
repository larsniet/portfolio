import { notFound } from "next/navigation";
import { CustomMDX } from "app/components/mdx";
import { formatDate, getJourneyPosts } from "app/journey/utils";
import { baseUrl } from "app/sitemap";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateStaticParams() {
  try {
    const posts = await getJourneyPosts();
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export async function generateMetadata({ params }: Props) {
  try {
    const posts = await getJourneyPosts();
    const { slug } = await params;
    const post = posts.find((post) => post.slug === slug);

    if (!post) {
      return {
        title: "Post Not Found",
        description: "The requested post could not be found.",
      };
    }

    const {
      title,
      publishedAt: publishedTime,
      summary: description,
      image,
    } = post.metadata;

    const ogImage = image
      ? image
      : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "article",
        publishedTime,
        url: `${baseUrl}/journey/${post.slug}`,
        images: [
          {
            url: ogImage,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [ogImage],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Error",
      description: "An error occurred while loading the post.",
    };
  }
}

export default async function Journey({ params }: Props) {
  try {
    const posts = await getJourneyPosts();
    const { slug } = await params;
    const post = posts.find((post) => post.slug === slug);

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
                : `/og?title=${encodeURIComponent(post.metadata.title)}`,
              url: `${baseUrl}/journey/${post.slug}`,
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
        <article className="prose">
          <CustomMDX source={post.content} />
        </article>
      </section>
    );
  } catch (error) {
    console.error("Error rendering post:", error);
    notFound();
  }
}
