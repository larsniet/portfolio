import Link from "next/link";
import { prefix, type Locale } from "@/app/i18n";

const copy = {
  en: {
    h1: "Page not found",
    text: "The page you're looking for doesn't exist or has been moved.",
    back: "Back home",
  },
  nl: {
    h1: "Pagina niet gevonden",
    text: "De pagina die je zoekt bestaat niet of is verplaatst.",
    back: "Terug naar home",
  },
};

export function NotFound({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return (
    <section className="pt-2 pb-16">
      <div className="fade-up fade-up-1">
        <p className="text-xs font-medium tracking-widest uppercase text-neutral-500 dark:text-neutral-400 font-(family-name:--font-geist-mono) mb-3">
          404
        </p>
        <h1 className="text-4xl font-semibold tracking-tighter text-black dark:text-white mb-4">
          {c.h1}
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 mb-8">
          {c.text}
        </p>
        <Link
          href={prefix(locale) || "/"}
          className="inline-flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors duration-200 cursor-pointer"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          {c.back}
        </Link>
      </div>
    </section>
  );
}
