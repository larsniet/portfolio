import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";
import { highlight } from "sugar-high";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => (
      <h1 className="title font-semibold tracking-tighter">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-semibold tracking-tighter">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-bold text-xl tracking-tighter mt-8 mb-4">
        {children}
      </h3>
    ),
    p: ({ children }) => <p className="leading-7 mb-4">{children}</p>,
    a: ({ href, children, ...props }) => {
      if (href?.startsWith("/")) {
        return (
          <Link href={href} {...props}>
            {children}
          </Link>
        );
      }
      if (href?.startsWith("#")) {
        return <a {...props}>{children}</a>;
      }
      return (
        <a target="_blank" rel="noopener noreferrer" {...props}>
          {children}
        </a>
      );
    },
    img: (props) => (
      <Image
        alt={props.alt || ""}
        className="rounded-lg"
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        {...props}
      />
    ),
    code: ({ children, ...props }) => {
      const codeHTML = highlight(children as string);
      return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
    },
    ...components,
  };
}
