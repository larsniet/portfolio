import Link from "next/link";
import { getPosts } from "@/app/journey/utils";
import { SearchBar } from "./search-bar";

const navItems = {
  "/": {
    name: "home",
  },
  "/journey": {
    name: "journey",
  },
  "/contact": {
    name: "contact",
  },
};

export async function Navbar() {
  const posts = await getPosts();
  const searchData = posts.map((p) => ({
    title: p.metadata.title,
    slug: p.slug,
  }));

  return (
    <aside className="-ml-[8px] mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20 relative z-10">
        <nav
          className="flex flex-row items-center justify-between relative px-0 pb-0 fade md:relative"
          id="nav"
        >
          <div className="flex flex-row space-x-0">
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <Link
                  key={path}
                  href={path}
                  className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1"
                >
                  {name}
                </Link>
              );
            })}
          </div>
          <SearchBar posts={searchData} />
        </nav>
      </div>
    </aside>
  );
}
