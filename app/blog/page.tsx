import { BlogPosts } from "app/components/posts";

export const metadata = {
  title: "Blog",
  description: "Read about the latest developments in my programming journey.",
};

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">My blog</h1>
      <BlogPosts />
    </section>
  );
}
