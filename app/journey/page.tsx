import { JourneyPosts } from "app/components/posts";

export const metadata = {
  title: "Journey",
  description: "Read about the latest developments in my programming journey.",
};

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        My journey
      </h1>
      <JourneyPosts />
    </section>
  );
}
