import Link from "next/link";
import Image from "next/image";
import { highlight } from "sugar-high";

export const mdxComponents = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="font-bold text-3xl tracking-tighter mt-8 mb-4">
      {children}
    </h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="font-bold text-2xl tracking-tighter mt-8 mb-4">
      {children}
    </h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="font-bold text-xl tracking-tighter mt-8 mb-4">{children}</h3>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="leading-7 mb-4">{children}</p>
  ),
  a: ({ href, children }: { href?: string; children: React.ReactNode }) => {
    if (href?.startsWith("/")) {
      return (
        <Link href={href} className="underline">
          {children}
        </Link>
      );
    }
    if (href?.startsWith("#")) {
      return <a href={href}>{children}</a>;
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  },
  hr: () => (
    <div className="my-4">
      <hr className="border-t-2 border-neutral-200 dark:border-neutral-800" />
    </div>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="list-disc pl-4 mb-4">{children}</ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="list-decimal pl-4 mb-4">{children}</ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="mb-2">{children}</li>
  ),
  pre: ({ children }: { children: React.ReactNode }) => (
    <pre className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg overflow-x-auto mb-4">
      {children}
    </pre>
  ),
  code: ({ children, className }: { children: string; className?: string }) => {
    // If there's a className, it's a code block (```code```)
    if (className) {
      const language = className.replace("language-", "");
      const codeHTML = highlight(children);
      return (
        <code
          className={`${language} text-sm`}
          dangerouslySetInnerHTML={{ __html: codeHTML }}
        />
      );
    }
    // Inline code (`code`)
    return (
      <code className="font-mono text-sm bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded">
        {children}
      </code>
    );
  },
  Image: (props: any) => (
    <Image alt={props.alt || ""} className="rounded-lg" {...props} />
  ),
};
