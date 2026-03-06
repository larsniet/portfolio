import Link from "next/link";

export default function NotFound() {
  return (
    <section className="pt-2 pb-16">
      <div className="fade-up fade-up-1">
        <p className="text-xs font-medium tracking-widest uppercase text-neutral-400 dark:text-neutral-500 font-[family-name:var(--font-geist-mono)] mb-3">
          404
        </p>
        <h1 className="text-4xl font-semibold tracking-tighter text-black dark:text-white mb-4">
          Page not found
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
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
          Back home
        </Link>
      </div>
    </section>
  );
}
