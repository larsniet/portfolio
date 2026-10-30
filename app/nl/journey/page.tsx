import { Journey, journeyMetadata } from "@/app/views/journey";

export const metadata = journeyMetadata("nl");
export default function Page() {
  return <Journey locale="nl" />;
}
