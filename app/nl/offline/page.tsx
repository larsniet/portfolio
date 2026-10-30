import { Offline, offlineMetadata } from "@/app/views/offline";

export const metadata = offlineMetadata;

export default function Page() {
  return <Offline locale="nl" />;
}
