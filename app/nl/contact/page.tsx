import { Contact, contactMetadata } from "@/app/views/contact";

export const metadata = contactMetadata("nl");
export default function Page() {
  return <Contact locale="nl" />;
}
