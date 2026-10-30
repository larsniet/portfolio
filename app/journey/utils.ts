import matter from "gray-matter";
import path from "path";
import fs from "fs/promises";
import { existsSync } from "fs";
import { dateLocale, type Locale } from "@/app/i18n";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { mdxComponents } from "@/app/components/mdx-remote-components";

export type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  featured?: boolean;
};

// English is the source of truth; Dutch siblings live in posts/nl/<slug>.mdx
const postsDir = (locale: Locale) =>
  path.join(process.cwd(), "app/journey/posts", locale === "nl" ? "nl" : "");

export async function getPosts(locale: Locale = "en") {
  const files = await fs.readdir(postsDir("en"));

  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith(".mdx"))
      .map(async (file) => {
        const slug = file.replace(/\.mdx$/, "");
        const post = await getPost(slug, locale);
        return post;
      })
  );

  return posts.filter(
    (post): post is NonNullable<typeof post> => post !== null
  );
}

export async function getPost(
  slug: string,
  locale: Locale = "en",
): Promise<{ metadata: Metadata; content: React.ReactNode; slug: string } | null> {
  const fullPath = path.join(postsDir(locale), `${slug}.mdx`);
  if (locale !== "en" && !existsSync(fullPath)) return getPost(slug, "en");

  try {
    const fileContents = await fs.readFile(fullPath, "utf8");
    const { data: frontMatter, content: rawContent } = matter(fileContents);

    const { content } = await compileMDX({
      source: rawContent,
      components: mdxComponents,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [],
          rehypePlugins: [
            [
              rehypePrettyCode,
              {
                theme: {
                  light: "github-light",
                  dark: "github-dark",
                },
                keepBackground: false,
              },
            ],
          ],
          format: "mdx",
        },
      },
    });

    return {
      metadata: frontMatter as Metadata,
      content,
      slug,
    };
  } catch (error) {
    console.error(`Error reading MDX file: ${fullPath}`, error);
    return null;
  }
}

export function formatDate(
  date: string,
  includeRelative = false,
  locale: Locale = "en",
) {
  let currentDate = new Date();
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  let targetDate = new Date(date);

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  let daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = "";

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`;
  } else {
    formattedDate = "Today";
  }

  let fullDate = targetDate.toLocaleString(dateLocale(locale), {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (!includeRelative) {
    return fullDate;
  }

  return `${fullDate} (${formattedDate})`;
}
