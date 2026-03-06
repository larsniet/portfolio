#!/usr/bin/env node
// Publishes ALL posts in app/journey/posts/ to DEV.to.
// Run once to backfill existing articles:
//
//   DEVTO_API_KEY=your_key node scripts/crosspost-all.js
//
// Posts that already exist on DEV.to with the same canonical_url will be
// skipped automatically (DEV.to returns a 422 with "canonical_url has already been taken").

const fs = require("fs");
const path = require("path");

const { DEVTO_API_KEY, BASE_URL = "https://larsniet.com" } = process.env;
if (!DEVTO_API_KEY) {
  console.error("Missing DEVTO_API_KEY environment variable");
  process.exit(1);
}

const postsDir = path.join(__dirname, "../app/journey/posts");
const files = fs
  .readdirSync(postsDir)
  .filter((f) => f.endsWith(".mdx"))
  .map((f) => path.join(postsDir, f));

console.log(`Found ${files.length} posts to process.\n`);

function fmField(fm, key) {
  const m = fm.match(new RegExp(`^${key}:\\s*["']?(.+?)["']?\\s*$`, "m"));
  return m ? m[1] : "";
}

async function publishPost(file, retries = 5) {
  const raw = fs.readFileSync(file, "utf8");
  const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!fmMatch) {
    console.warn(`  ⚠ Could not parse frontmatter — skipping`);
    return;
  }

  const [, fm, body] = fmMatch;
  const title = fmField(fm, "title");
  const summary = fmField(fm, "summary");
  const slug = path.basename(file, ".mdx");
  const canonicalUrl = `${BASE_URL}/journey/${slug}`;

  if (!title) {
    console.warn(`  ⚠ No title found — skipping`);
    return;
  }

  const res = await fetch("https://dev.to/api/articles", {
    method: "POST",
    headers: {
      "api-key": DEVTO_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      article: {
        title,
        body_markdown: body.trim(),
        published: true,
        canonical_url: canonicalUrl,
        description: summary,
      },
    }),
  });

  const data = await res.json();

  if (data.url) {
    console.log(`  ✓ Published: ${data.url}`);
  } else if (res.status === 429 && retries > 0) {
    const wait = 35000;
    console.log(`  ⏳ Rate limited — waiting ${wait / 1000}s then retrying...`);
    await new Promise((r) => setTimeout(r, wait));
    return publishPost(file, retries - 1);
  } else if (
    data.error?.includes("canonical_url") ||
    data.errors?.canonical_url
  ) {
    console.log(`  ↩ Already exists on DEV.to — skipped`);
  } else {
    console.warn(`  ✗ Failed: ${JSON.stringify(data)}`);
  }
}

async function main() {
  for (const file of files) {
    const name = path.basename(file);
    console.log(`→ ${name}`);
    await publishPost(file);
    // DEV.to rate limit: wait 35s between posts to stay safe
    await new Promise((r) => setTimeout(r, 35000));
  }
  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
