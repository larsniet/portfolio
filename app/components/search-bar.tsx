"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

type Post = { title: string; slug: string };

export function SearchBar({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered =
    query.length > 0
      ? posts.filter((p) => p.title.toLowerCase().includes(query.toLowerCase()))
      : [];

  const isOpen = open && query.length > 0;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      navigate(filtered[activeIndex].slug);
    } else if (e.key === "Escape") {
      setOpen(false);
      setQuery("");
      inputRef.current?.blur();
    }
  }

  function navigate(slug: string) {
    setQuery("");
    setOpen(false);
    setActiveIndex(-1);
    router.push(`/journey/${slug}`);
  }

  function highlight(text: string) {
    if (!query) return text;
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <span className="font-medium text-black dark:text-white">
          {text.slice(idx, idx + query.length)}
        </span>
        {text.slice(idx + query.length)}
      </>
    );
  }

  return (
    <div ref={containerRef} className="relative w-auto">
      {/* Input */}
      <div className="relative flex items-center">
        <svg
          className="absolute left-2.5 size-3.5 text-neutral-400 dark:text-neutral-500 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search..."
          className="pl-8 pr-3 py-1 text-xs rounded-sm border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 text-black dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-black dark:focus:border-white w-full md:w-28 md:focus:w-44 transition-all duration-200 font-(family-name:--font-geist-mono)"
        />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute left-0 right-0 md:left-auto md:right-0 md:w-64 mt-1 z-50 rounded-sm border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black shadow-lg shadow-black/5 dark:shadow-black/50 overflow-hidden">
          {filtered.length > 0 ? (
            <>
              <div className="px-3 py-1.5 border-b border-neutral-100 dark:border-neutral-900">
                <p className="text-[10px] text-neutral-500 dark:text-neutral-400 font-medium uppercase tracking-widest font-(family-name:--font-geist-mono)">
                  Posts
                </p>
              </div>
              <ul className="py-1 max-h-52 overflow-y-auto">
                {filtered.map((post, i) => (
                  <li
                    key={post.slug}
                    onMouseDown={(e) => e.preventDefault()}
                    onMouseEnter={() => setActiveIndex(i)}
                    onClick={() => navigate(post.slug)}
                    className={`flex items-center gap-2 px-3 py-2 cursor-pointer transition-colors ${
                      i === activeIndex
                        ? "bg-neutral-50 dark:bg-neutral-900"
                        : ""
                    }`}
                  >
                    <svg
                      className="size-3 shrink-0 text-neutral-400 dark:text-neutral-600"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    <span className="text-xs text-neutral-600 dark:text-neutral-400 truncate font-(family-name:--font-geist-mono)">
                      {highlight(post.title)}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="px-3 py-5 text-center">
              <p className="text-xs text-neutral-500 dark:text-neutral-400 font-(family-name:--font-geist-mono)">
                No posts found.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
