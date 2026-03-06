import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Lars van der Niet",
  description:
    "Get in touch with Lars van der Niet — full stack developer based in Amsterdam.",
  alternates: {
    canonical: "/contact",
  },
};

function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  );
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://larsniet.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Contact",
          item: "https://larsniet.com/contact",
        },
      ],
    },
    {
      "@type": "ContactPage",
      name: "Contact Lars van der Niet",
      url: "https://larsniet.com/contact",
      author: {
        "@type": "Person",
        "@id": "https://larsniet.com/#person",
        name: "Lars van der Niet",
      },
    },
  ],
};

const contacts = [
  {
    label: "Email",
    value: "lvdnbusiness@gmail.com",
    href: "mailto:lvdnbusiness@gmail.com",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/larsvanderniet",
    href: "http://linkedin.com/in/larsvanderniet",
  },
  {
    label: "GitHub",
    value: "github.com/larsniet",
    href: "https://github.com/larsniet",
  },
];

export default function Page() {
  return (
    <section className="pt-2 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Header ───────────────────────────────────────────── */}
      <div className="fade-up fade-up-1 mb-10">
        <h1 className="text-4xl font-semibold tracking-tighter text-black dark:text-white mb-3">
          Get in touch
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-xs">
          Feel free to reach out — whether it&apos;s about a project, an
          opportunity, or just to say hi.
        </p>
      </div>

      {/* ── Location note ────────────────────────────────────── */}
      <div className="fade-up fade-up-2 mb-8">
        <div className="flex items-center gap-2">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-neutral-400 dark:text-neutral-500"
          >
            <path
              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
              fill="currentColor"
            />
          </svg>
          <span className="text-xs text-neutral-400 dark:text-neutral-500 font-(family-name:--font-geist-mono)">
            Based in Amsterdam, Netherlands
          </span>
        </div>
      </div>

      {/* ── Contact rows ─────────────────────────────────────── */}
      <div className="flex flex-col border-t border-neutral-100 dark:border-neutral-900">
        {contacts.map((contact, i) => (
          <Link
            key={contact.href}
            href={contact.href}
            rel="noopener noreferrer"
            target="_blank"
            className={`group flex items-center justify-between py-5 border-b border-neutral-100 dark:border-neutral-900 cursor-pointer fade-up fade-up-${i + 3}`}
          >
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-neutral-400 dark:text-neutral-500 font-(family-name:--font-geist-mono) mb-0.5">
                {contact.label}
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 group-hover:text-black dark:group-hover:text-white transition-colors duration-200">
                {contact.value}
              </p>
            </div>
            <ArrowIcon />
          </Link>
        ))}
      </div>
    </section>
  );
}
