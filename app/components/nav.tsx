import Link from "next/link";
import { getPosts } from "@/app/journey/utils";
import { SearchBar } from "./search-bar";
import { NavLinks } from "./nav-links";
import { prefix, type Locale } from "@/app/i18n";

export async function Navbar({ locale }: { locale: Locale }) {
  const posts = await getPosts(locale);
  const home = prefix(locale) || "/";
  const searchData = posts.map((p) => ({
    title: p.metadata.title,
    slug: p.slug,
  }));

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="max-w-2xl w-full mx-auto px-4 h-12 flex items-center justify-between tracking-tight">
        {/* Identity — hidden on xs, visible from sm */}
        <Link
          href={home}
          className="hidden sm:block text-xs font-medium text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors duration-200 cursor-pointer font-(family-name:--font-geist-mono)"
        >
          larsniet
        </Link>

        {/* On mobile: show logo initial */}
        <Link
          href={home}
          className="sm:hidden text-xs font-semibold text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors duration-200 cursor-pointer font-(family-name:--font-geist-mono)"
          aria-label="Home"
        >
          ln/
        </Link>

        {/* Nav links + Search */}
        <nav className="flex items-center gap-0.5">
          <NavLinks locale={locale} />
          {/* Search: hidden on mobile, shown on md+ */}
          <div className="hidden md:block ml-2">
            <SearchBar posts={searchData} locale={locale} />
          </div>
        </nav>
      </div>
    </header>
  );
}
