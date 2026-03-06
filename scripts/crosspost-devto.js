#!/usr/bin/env node
// Reads a single MDX file and publishes it to DEV.to.
// Usage: node scripts/crosspost-devto.js app/journey/posts/my-post.mdx
//
// Required env vars:
//   DEVTO_API_KEY  — from dev.to/settings/extensions
//   BASE_URL       — e.g. https://larsniet.com

const fs = require("fs");
const path = require("path");

const file = process.argv[2];
if (!file) {
  console.error("Usage: node scripts/crosspost-devto.js <path-to-mdx>");
  process.exit(1);
}

const { DEVTO_API_KEY, BASE_URL = "https://larsniet.com" } = process.env;
if (!DEVTO_API_KEY) {
  console.error("Missing DEVTO_API_KEY environment variable");
  process.exit(1);
}

const raw = fs.readFileSync(file, "utf8");

// Parse YAML frontmatter
const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
if (!fmMatch) {
  console.error(`Could not parse frontmatter in ${file}`);
  process.exit(1);
}

const [, fm, body] = fmMatch;

function fmField(key) {
  const m = fm.match(new RegExp(`^${key}:\\s*["']?(.+?)["']?\\s*$`, "m"));
  return m ? m[1] : "";
}

const title = fmField("title");
const summary = fmField("summary");
const image = fmField("image");
const slug = path.basename(file, ".mdx");
const canonicalUrl = `${BASE_URL}/journey/${slug}`;

if (!title) {
  console.error(`No title found in frontmatter of ${file}`);
  process.exit(1);
}

const payload = {
  article: {
    title,
    body_markdown: body.trim(),
    published: true,
    canonical_url: canonicalUrl,
    description: summary,
    ...(image && { main_image: `${BASE_URL}${image}` }),
  },
};

console.log(`Publishing "${title}" → ${canonicalUrl}`);

fetch("https://dev.to/api/articles", {
  method: "POST",
  headers: {
    "api-key": DEVTO_API_KEY,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(payload),
})
  .then((r) => r.json())
  .then((data) => {
    if (data.url) {
      console.log(`✓ Published: ${data.url}`);
    } else {
      console.error("✗ Failed:", JSON.stringify(data, null, 2));
      process.exit(1);
    }
  })
  .catch((err) => {
    console.error("✗ Request error:", err.message);
    process.exit(1);
  });
