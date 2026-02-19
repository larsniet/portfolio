# Lars van der Niet Portfolio

Personal site built with Next.js App Router, MDX-based writing, and a small JSON feed.

## Stack

- Next.js `16`
- React `19`
- TypeScript (strict mode)
- Tailwind CSS `4`
- MDX via `@next/mdx` + `next-mdx-remote`
- `pnpm` (locked via `packageManager` in `package.json`)

## Getting Started

```bash
pnpm install
pnpm dev
```

App runs on `http://localhost:3000`.

Production:

```bash
pnpm build
pnpm start
```

## Scripts

- `pnpm dev` - run local dev server with Turbopack
- `pnpm build` - production build
- `pnpm start` - run production server

## Environment Variables

- `NEXT_PUBLIC_BASE_URL`
  - Used for canonical URLs in sitemap, robots, and social metadata.
  - Defaults to `https://larsniet.com` when unset.

Example `.env.local`:

```env
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

## Project Structure

- `app/page.tsx` - homepage
- `app/journey/page.tsx` - list of journey posts
- `app/journey/[slug]/page.tsx` - individual MDX post route (static params + revalidate)
- `app/journey/posts/*.mdx` - post content
- `app/journey/utils.ts` - post loading, MDX compile, date formatting
- `app/components/mdx-remote-components.tsx` - MDX render components
- `app/api/projects/route.ts` - JSON feed endpoint used in footer (`/api/projects`)
- `app/sitemap.ts`, `app/robots.ts`, `app/og/route.tsx` - SEO/metadata routes
- `app/manifest.ts` + `ServiceWorkerRegister` - PWA basics

## Writing Posts

Add a new file in `app/journey/posts/` with `.mdx` extension and frontmatter:

```mdx
---
title: Your Post Title
publishedAt: 2026-02-19
summary: Short summary for list and metadata.
image: /images/your-image.jpg
featured: true
---
```

Posts are read from the filesystem, compiled to React, sorted by `publishedAt`, and rendered at `/journey/[slug]`.

## Current Behavior

- Generates metadata per post, including Open Graph and Twitter cards
- Generates structured data (`BlogPosting`) on post pages
- Exposes post feed JSON at `/api/projects`
- Registers a service worker (`/sw.js`) on the client
- Serves sitemap and robots from app routes

## License

MIT. See `LICENSE`.
