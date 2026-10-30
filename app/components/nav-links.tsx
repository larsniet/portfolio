"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { prefix, t, type Locale } from "@/app/i18n";

const navItems = ["home", "journey", "contact"] as const;
const paths = { home: "/", journey: "/journey", contact: "/contact" };

export function NavLinks({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const p = prefix(locale);
  return (
    <>
      {navItems.map((item) => {
        const path = paths[item];
        const href = `${p}${path}` || "/";
        const isActive =
          path === "/" ? pathname === href : pathname.startsWith(href);

        return (
          <Link
            key={item}
            href={href}
            className={`px-2 py-1 text-sm transition-colors duration-200 rounded cursor-pointer ${
              isActive
                ? "text-black dark:text-white font-medium"
                : "text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white"
            }`}
          >
            {t[locale][item]}
          </Link>
        );
      })}
    </>
  );
}
