"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/app/i18n";

const locales: { code: Locale; label: string }[] = [
  { code: "en", label: "English" },
  { code: "nl", label: "Nederlands" },
];

export function LocaleSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // ponytail: the other locale's URL is the same path with /nl added or removed
  const bare = pathname.replace(/^\/nl(?=\/|$)/, "") || "/";
  const hrefFor = (code: Locale) =>
    code === "nl" ? `/nl${bare === "/" ? "" : bare}` : bare;

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Language"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 h-[26px] px-2 text-xs uppercase rounded-sm border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:border-neutral-300 dark:hover:border-neutral-700 focus:outline-none focus-visible:border-black dark:focus-visible:border-white transition-colors duration-200 font-(family-name:--font-geist-mono)"
      >
        <svg
          className="size-3.5 text-neutral-400 dark:text-neutral-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        {locale}
        <svg
          className={`size-3 text-neutral-400 dark:text-neutral-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <ul
          role="menu"
          className="absolute right-0 mt-1 w-36 z-50 py-1 rounded-sm border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black shadow-lg shadow-black/5 dark:shadow-black/50"
        >
          {locales.map(({ code, label }) => {
            const active = code === locale;
            return (
              <li key={code} role="none">
                <Link
                  role="menuitem"
                  href={hrefFor(code)}
                  hrefLang={code}
                  lang={code}
                  aria-current={active ? "true" : undefined}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between px-3 py-1.5 text-xs transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900 ${
                    active
                      ? "text-black dark:text-white font-medium"
                      : "text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white"
                  }`}
                >
                  {label}
                  {active && (
                    <svg
                      className="size-3"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
