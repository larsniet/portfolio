import Link from "next/link";
import { getPosts } from "@/app/journey/utils";
import { SearchBar } from "./search-bar";

const navItems = {
  "/": { name: "home" },
  "/journey": { name: "journey" },
  "/contact": { name: "contact" },
};

export async function Navbar() {
  const posts = await getPosts();
  const searchData = posts.map((p) => ({
    title: p.metadata.title,
    slug: p.slug,
  }));

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-black/90 backdrop-blur-md">
      <div className="max-w-2xl w-full mx-auto px-4 h-12 flex items-center justify-between tracking-tight">
        {/* Identity — hidden on xs, visible from sm */}
        <Link
          href="/"
          className="hidden sm:block text-xs font-medium text-neutral-400 dark:text-neutral-500 hover:text-black dark:hover:text-white transition-colors duration-200 cursor-pointer font-(family-name:--font-geist-mono)"
        >
          larsniet
        </Link>

        {/* On mobile: show logo initial */}
        <Link
          href="/"
          className="sm:hidden text-xs font-semibold text-neutral-400 dark:text-neutral-500 hover:text-black dark:hover:text-white transition-colors duration-200 cursor-pointer font-(family-name:--font-geist-mono)"
          aria-label="Home"
        >
          ln/
        </Link>

        {/* Nav links + Search */}
        <nav className="flex items-center gap-0.5">
          {Object.entries(navItems).map(([path, { name }]) => (
            <Link
              key={path}
              href={path}
              className="px-2 py-1 text-sm text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors duration-200 rounded cursor-pointer"
            >
              {name}
            </Link>
          ))}
          {/* Search: hidden on mobile, shown on md+ */}
          <div className="hidden md:block ml-2">
            <SearchBar posts={searchData} />
          </div>
        </nav>
      </div>
    </header>
  );
}
