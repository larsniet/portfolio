import { Home, homeMetadata } from "@/app/views/home";

export const metadata = homeMetadata("nl");
export default function Page() {
  return <Home locale="nl" />;
}
