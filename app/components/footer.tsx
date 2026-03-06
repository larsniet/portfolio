import Link from "next/link";

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="mt-16 mb-10 border-t border-neutral-200 dark:border-neutral-800 pt-8">
      <ul className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-6 mb-6">
        <li>
          <Link
            className="group flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors duration-200"
            rel="noopener noreferrer"
            target="_blank"
            href="/rss"
          >
            <ArrowIcon className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <span>rss feed</span>
          </Link>
        </li>
        <li>
          <a
            className="group flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors duration-200"
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/larsniet/portfolio"
          >
            <ArrowIcon className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <span>view source</span>
          </a>
        </li>
      </ul>
      <p className="text-xs text-neutral-400 dark:text-neutral-600 font-(family-name:--font-geist-mono)">
        © {new Date().getFullYear()} Lars van der Niet — MIT Licensed
      </p>
    </footer>
  );
}
