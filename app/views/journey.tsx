import type { Metadata } from "next";
import { JourneyPosts } from "@/app/components/posts";
import { getPosts } from "@/app/journey/utils";
import { baseUrl } from "@/app/sitemap";
import { alternates, prefix, type Locale } from "@/app/i18n";

const copy = {
  en: {
    description:
      "Posts by Lars van der Niet on full-stack development, AdTech, Kubernetes, hardware projects and the tools behind them.",
    h1: "My journey",
    intro: "A log of my thoughts, projects, experiments, and discoveries.",
    all: "all posts",
  },
  nl: {
    description:
      "Posts van Lars van der Niet over full-stack development, AdTech, Kubernetes, hardwareprojecten en de tools erachter.",
    h1: "Mijn journey",
    intro: "Een logboek van gedachten, projecten, experimenten en ontdekkingen.",
    all: "alle posts",
  },
};

export const journeyMetadata = (locale: Locale): Metadata => ({
  title: "Journey",
  description: copy[locale].description,
  alternates: alternates("/journey", locale),
});

export async function Journey({ locale }: { locale: Locale }) {
  let posts = await getPosts(locale);
  const c = copy[locale];
  const p = prefix(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}${p}` },
          {
            "@type": "ListItem",
            position: 2,
            name: "Journey",
            item: `${baseUrl}${p}/journey`,
          },
        ],
      },
      {
        "@type": "Blog",
        name: "Lars van der Niet — Journey",
        description: c.description,
        url: `${baseUrl}${p}/journey`,
        inLanguage: locale,
        author: {
          "@type": "Person",
          "@id": `${baseUrl}/#person`,
          name: "Lars van der Niet",
          url: baseUrl,
        },
        blogPost: posts.map((post) => ({
          "@type": "BlogPosting",
          headline: post.metadata.title,
          datePublished: post.metadata.publishedAt,
          url: `${baseUrl}${p}/journey/${post.slug}`,
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
          {c.h1}
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 font-(family-name:--font-geist-mono)">
          {c.intro}
        </p>
      </div>

      <div className="fade-up fade-up-2">
        <div className="flex items-center gap-3 mb-5">
          <p className="text-xs font-medium tracking-widest uppercase text-neutral-500 dark:text-neutral-400 font-(family-name:--font-geist-mono)">
            {c.all}
          </p>
          <div className="flex-1 h-px bg-neutral-100 dark:bg-neutral-900" />
        </div>
        <JourneyPosts posts={posts} locale={locale} />
      </div>
    </section>
  );
}
