import type { Metadata } from "next";

export type Locale = "en" | "nl";

export const prefix = (locale: Locale) => (locale === "nl" ? "/nl" : "");

/** Canonical + hreflang (en, nl, x-default) for a path like "/" or "/contact". */
export function alternates(
  path: string,
  locale: Locale,
): NonNullable<Metadata["alternates"]> {
  const en = path;
  const nl = `/nl${path === "/" ? "" : path}`;
  return {
    canonical: locale === "nl" ? nl : en,
    languages: { en, nl, "x-default": en },
  };
}

// ponytail: UI strings only; page copy lives next to the page markup
export const t = {
  en: {
    home: "home",
    journey: "journey",
    contact: "contact",
    search: "Search...",
    rss: "rss feed",
    source: "view source",
    license: "MIT Licensed",
    readMore: "Read more",
    siteDescription:
      "Lars van der Niet (Lars Niet), senior full-stack developer at Adswag Amsterdam. Expertise in Docker, Kubernetes, NextJS, Go and TypeScript.",
    ogAlt: "Lars van der Niet — Full-stack developer",
  },
  nl: {
    home: "home",
    journey: "journey",
    contact: "contact",
    search: "Zoeken...",
    rss: "rss-feed",
    source: "broncode",
    license: "MIT-licentie",
    readMore: "Meer lezen",
    siteDescription:
      "Lars van der Niet (Lars Niet), senior full-stack developer bij Adswag in Amsterdam. Gespecialiseerd in Docker, Kubernetes, Next.js, Go en TypeScript.",
    ogAlt: "Lars van der Niet, full-stack developer",
  },
} as const;

export const dateLocale = (locale: Locale) =>
  locale === "nl" ? "nl-NL" : "en-US";
