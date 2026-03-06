"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = {
  "/": { name: "home" },
  "/journey": { name: "journey" },
  "/contact": { name: "contact" },
};

export function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {Object.entries(navItems).map(([path, { name }]) => {
        const isActive =
          path === "/" ? pathname === "/" : pathname.startsWith(path);

        return (
          <Link
            key={path}
            href={path}
            className={`px-2 py-1 text-sm transition-colors duration-200 rounded cursor-pointer ${
              isActive
                ? "text-black dark:text-white font-medium"
                : "text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white"
            }`}
          >
            {name}
          </Link>
        );
      })}
    </>
  );
}
