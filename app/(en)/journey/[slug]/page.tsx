import { Post, postMetadata, postParams } from "@/app/views/post";

export const dynamic = "force-static";
export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = postParams;
export async function generateMetadata({ params }: Props) {
  return postMetadata((await params).slug, "en");
}
export default async function Page({ params }: Props) {
  return <Post slug={(await params).slug} locale="en" />;
}
