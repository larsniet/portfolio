import { NextResponse } from "next/server";
import { getPosts } from "@/app/journey/utils";
import { baseUrl } from "@/app/sitemap";

export async function GET() {
  const posts = await getPosts();

  const structuredPosts = posts.map((post) => ({
    title: post.metadata.title,
    url: `${baseUrl}/journey/${post.slug}`,
    description: post.metadata.summary,
    featured: post.metadata.featured || false
  }));

  return NextResponse.json(structuredPosts);
}
