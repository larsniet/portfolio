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
  "@type": "Person",
  name: "Lars van der Niet",
  jobTitle: "Full Stack Developer",
  url: "https://larsniet.com",
  email: "lvdnbusiness@gmail.com",
  worksFor: {
    "@type": "Organization",
    name: "Adswag",
    url: "https://adswag.nl",
  },
  sameAs: [
    "http://linkedin.com/in/larsvanderniet",
    "https://github.com/larsniet",
  ],
};

export default function Page() {
  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        Get in touch
      </h1>
      <p className="mb-8 text-neutral-600 dark:text-neutral-400">
        Feel free to reach out — whether it's about a project, an opportunity,
        or just to say hi.
      </p>
      <ul className="font-sm flex flex-col space-y-4 text-neutral-600 dark:text-neutral-300">
        <li>
          <Link
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="mailto:lvdnbusiness@gmail.com"
          >
            <ArrowIcon />
            <p className="ml-2">lvdnbusiness@gmail.com</p>
          </Link>
        </li>
        <li>
          <Link
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="http://linkedin.com/in/larsvanderniet"
          >
            <ArrowIcon />
            <p className="ml-2">linkedin.com/in/larsvanderniet</p>
          </Link>
        </li>
        <li>
          <Link
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/larsniet"
          >
            <ArrowIcon />
            <p className="ml-2">github.com/larsniet</p>
          </Link>
        </li>
      </ul>
    </section>
  );
}
