import { Shell, layoutMetadata, viewport } from "@/app/components/shell";

export { viewport };
export const metadata = layoutMetadata("en");

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <Shell locale="en">{children}</Shell>;
}
