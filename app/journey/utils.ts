import matter from "gray-matter";
import path from "path";
import fs from "fs/promises";
import { compileMDX } from "next-mdx-remote/rsc";

export type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
};

export async function getPosts() {
  const postsDirectory = path.join(process.cwd(), "app/journey/posts");
  const files = await fs.readdir(postsDirectory);

  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith(".mdx"))
      .map(async (file) => {
        const slug = file.replace(/\.mdx$/, "");
        const post = await getPost(slug);
        return post;
      })
  );

  return posts.filter(
    (post): post is NonNullable<typeof post> => post !== null
  );
}

export async function getPost(slug: string) {
  const postsDirectory = path.join(process.cwd(), "app/journey/posts");
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);

  try {
    const fileContents = await fs.readFile(fullPath, "utf8");
    const { data: metadata, content: rawContent } = matter(fileContents);

    const { content } = await compileMDX({
      source: rawContent,
      options: { parseFrontmatter: true },
    });

    return { metadata, content, slug };
  } catch (error) {
    console.error(`Error reading MDX file: ${fullPath}`, error);
    return null;
  }
}

export function formatDate(date: string, includeRelative = false) {
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

  let fullDate = targetDate.toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (!includeRelative) {
    return fullDate;
  }

  return `${fullDate} (${formattedDate})`;
}
