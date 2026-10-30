import { Contact, contactMetadata } from "@/app/views/contact";

export const metadata = contactMetadata("en");
export default function Page() {
  return <Contact locale="en" />;
}
