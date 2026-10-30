import Link from "next/link";
import { dateLocale, prefix, type Locale } from "@/app/i18n";

function shortDate(dateStr: string, locale: Locale): string {
  const d = new Date(`${dateStr}T00:00:00`);
  return d.toLocaleString(dateLocale(locale), { month: "short", day: "numeric" });
}

export function JourneyPosts({
  posts,
  locale = "en",
}: {
  posts: {
    slug: string;
    metadata: { title: string; publishedAt: string };
  }[];
  locale?: Locale;
}) {
  const sorted = [...posts].sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
  );

  // Group by year, newest first
  const byYear = sorted.reduce<Record<string, typeof sorted>>((acc, post) => {
    const year = new Date(`${post.metadata.publishedAt}T00:00:00`)
      .getFullYear()
      .toString();
    if (!acc[year]) acc[year] = [];
    acc[year].push(post);
    return acc;
  }, {});

  const years = Object.keys(byYear).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="flex flex-col">
      {years.map((year, yi) => (
        <div
          key={year}
          className={`fade-up fade-up-${Math.min(yi + 2, 6)} ${yi > 0 ? "mt-6" : ""}`}
        >
          {/* Year header */}
          <p className="text-xs font-medium text-neutral-500 dark:text-neutral-500 tabular-nums font-(family-name:--font-geist-mono) mb-1 select-none">
            {year}
          </p>

          {/* Posts for this year */}
          {byYear[year].map((post) => (
            <Link
              key={post.slug}
              href={`${prefix(locale)}/journey/${post.slug}`}
              className="post-row group flex items-baseline gap-4 py-2.5 border-b border-neutral-100 dark:border-neutral-900 cursor-pointer"
            >
              {/* Compact date: "Feb 19" */}
              <span className="shrink-0 w-10 text-xs text-neutral-500 dark:text-neutral-400 tabular-nums font-(family-name:--font-geist-mono) whitespace-nowrap">
                {shortDate(post.metadata.publishedAt, locale)}
              </span>

              {/* Title */}
              <span className="text-sm text-neutral-700 dark:text-neutral-300 tracking-tight group-hover:text-black dark:group-hover:text-white transition-colors duration-200 min-w-0">
                {post.metadata.title}
              </span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}
