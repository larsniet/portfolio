# Lars van der Niet Portfolio

Personal site built with Next.js App Router, MDX-based writing, and a small JSON feed.

## Stack

- Next.js `16`
- React `19`
- TypeScript (strict mode)
- Tailwind CSS `4`
- MDX via `@next/mdx` + `next-mdx-remote`
- `shiki` + `rehype-pretty-code` — syntax highlighting with language-aware grammars
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

## Environment Variables

Create a `.env` file at the project root (never commit it — it's in `.gitignore`):

```env
# Canonical base URL used in sitemap, robots.txt, structured data, and OG images.
# Defaults to https://larsniet.com when unset.
NEXT_PUBLIC_BASE_URL=https://your-domain.com

# DEV.to API key for cross-posting. Generate at dev.to/settings/extensions.
DEVTO_API_KEY=your_api_key_here
```

## Project Structure

- `app/page.tsx` — homepage
- `app/journey/page.tsx` — list of journey posts
- `app/journey/[slug]/page.tsx` — individual MDX post route (static params + revalidate)
- `app/journey/posts/*.mdx` — post content
- `app/journey/utils.ts` — post loading, MDX compile, date formatting
- `app/components/mdx-remote-components.tsx` — MDX render components
- `app/sitemap.ts`, `app/robots.ts`, `app/og/route.tsx` — SEO/metadata routes
- `app/manifest.ts` + `ServiceWorkerRegister` — PWA basics
- `scripts/` — automation scripts (see below)
- `.github/workflows/` — GitHub Actions

## Writing Posts

Add a new file in `app/journey/posts/` with `.mdx` extension and frontmatter:

```mdx
---
title: Your Post Title
publishedAt: 2026-02-19
summary: Short summary for list view and meta description.
image: /images/your-image.jpg  # optional OG image
featured: true                 # optional
---
```

Posts are read from the filesystem, compiled to React, sorted by `publishedAt`, and rendered at `/journey/[slug]`.

**When you push a new `.mdx` file to `main`**, the GitHub Actions workflow (`.github/workflows/crosspost-devto.yml`) automatically cross-posts it to DEV.to with `canonical_url` pointing back to this site, so all SEO value stays here.

## Cross-posting Scripts

### Backfill existing posts

Publishes every post in `app/journey/posts/` to DEV.to. Safe to re-run — posts that already exist on DEV.to (matched by canonical URL) are skipped automatically.

```bash
DEVTO_API_KEY=your_key node scripts/crosspost-all.js
```

### Publish a single post

```bash
DEVTO_API_KEY=your_key BASE_URL=https://larsniet.com node scripts/crosspost-devto.js app/journey/posts/my-post.mdx
```

## SEO

- XML sitemap at `/sitemap.xml` (all pages + posts)
- `robots.txt` at `/robots.txt`
- Per-page `title`, `description`, and `canonical` metadata
- Open Graph + Twitter card metadata on post pages
- Structured data (`WebSite` + `Person`) on homepage, `BreadcrumbList` on all subpages, `BlogPosting` on posts

## License

MIT. See `LICENSE`.
