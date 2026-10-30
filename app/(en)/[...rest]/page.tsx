import { notFound } from "next/navigation";

// ponytail: two root layouts means no shared root not-found; this routes
// unmatched URLs to this locale's not-found.tsx instead of Next's bare 404
export default function Page() {
  notFound();
}
