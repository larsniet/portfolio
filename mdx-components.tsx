"use client";

import Link from "next/link";
import Image from "next/image";
import { MDXProvider } from "@mdx-js/react";
import { highlight } from "sugar-high";
import React from "react";

type TableData = {
  headers: React.ReactNode[];
  rows: React.ReactNode[][];
};

type TableProps = {
  data: TableData;
};

function Table({ data }: TableProps) {
  let headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ));
  let rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

type CustomLinkProps = React.ComponentProps<"a"> & {
  href: string;
};

function CustomLink({ href, ...props }: CustomLinkProps) {
  const children = props.children;

  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

function RoundedImage(props: React.ComponentProps<typeof Image>) {
  return <Image className="rounded-lg" {...props} />;
}

type CodeProps = React.ComponentProps<"code"> & {
  children: React.ReactNode;
};

function Code({ children, ...props }: CodeProps) {
  const text =
    typeof children === "string"
      ? children
      : Array.isArray(children)
      ? children.join("")
      : String(children ?? "");
  let codeHTML = highlight(text);
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

function Details({ children }: { children: React.ReactNode }) {
  return (
    <details className="my-4 rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 [&_summary]:cursor-pointer [&_summary]:font-medium">
      {children}
    </details>
  );
}

function Summary({ children }: { children: React.ReactNode }) {
  return <summary className="text-lg font-semibold">{children}</summary>;
}

function extractText(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(extractText).join("");
  }
  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    return extractText(node.props.children);
  }
  return "";
}

function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  const Heading = ({ children }: { children: React.ReactNode }) => {
    const slug = slugify(extractText(children));
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        }),
      ],
      children
    );
  };

  Heading.displayName = `Heading${level}`;

  return Heading;
}

const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
  Table,
  details: Details,
  summary: Summary,
  hr: () => (
    <div className="my-16">
      <hr className="border-t border-neutral-200 dark:border-neutral-800" />
    </div>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="my-4 ml-6 list-disc">{children}</ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="my-4 ml-6 list-decimal">{children}</ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="my-2">{children}</li>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="my-4 leading-7">{children}</p>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="my-4 border-l-4 border-neutral-200 dark:border-neutral-800 pl-4 italic">
      {children}
    </blockquote>
  ),
};

export interface CustomMDXProps {
  children: React.ReactNode;
  components?: Record<string, React.ComponentType<any>>;
}

export function CustomMDX({
  children,
  components: additionalComponents,
}: CustomMDXProps) {
  return (
    <MDXProvider
      components={{ ...components, ...(additionalComponents || {}) }}
    >
      {children}
    </MDXProvider>
  );
}
