import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including components from
// other libraries.

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => (
      <h1 className="font-bold text-3xl tracking-tighter mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-bold text-2xl tracking-tighter mt-8 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-bold text-xl tracking-tighter mt-8 mb-4">
        {children}
      </h3>
    ),
    p: ({ children }) => <p className="leading-7 mb-4">{children}</p>,
    a: ({ href = "", children }) => {
      const isInternal = href.startsWith("/");
      if (isInternal) {
        return <Link href={href}>{children}</Link>;
      }
      return (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    },
    img: ({ src, alt, ...props }) =>
      src ? (
        <Image
          src={src}
          alt={alt || ""}
          className="rounded-lg"
          width={720}
          height={480}
          style={{ width: "100%", height: "auto" }}
          {...props}
        />
      ) : null,
    ...components,
  };
}
