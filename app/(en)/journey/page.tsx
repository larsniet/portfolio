import { Journey, journeyMetadata } from "@/app/views/journey";

export const metadata = journeyMetadata("en");
export default function Page() {
  return <Journey locale="en" />;
}
