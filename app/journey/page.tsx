import { JourneyPosts } from "app/components/posts";
import { getPosts } from "app/journey/utils";

export const metadata = {
  title: "Journey",
  description: "Read about the latest developments in my programming journey.",
};

export default async function Page() {
  let posts = await getPosts();

  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        My journey
      </h1>
      <JourneyPosts posts={posts} />
    </section>
  );
}
