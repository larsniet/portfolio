import { Home, homeMetadata } from "@/app/views/home";

export const metadata = homeMetadata("en");
export default function Page() {
  return <Home locale="en" />;
}
