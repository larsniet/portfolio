import "./global.css";
import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Navbar } from "./components/nav";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "./components/footer";
import ServiceWorkerRegister from "./components/service-worker-register";
import { baseUrl } from "./sitemap";

export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Lars van der Niet",
  },
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": `${baseUrl}/rss`,
    },
  },
  title: {
    default: "Lars van der Niet",
    template: "%s | Lars van der Niet",
  },
  description:
    "Lars van der Niet (Lars Niet), senior full-stack developer at Adswag Amsterdam. Expertise in Docker, Kubernetes, NextJS, Go and TypeScript.",
  openGraph: {
    title: "Lars van der Niet",
    description:
      "Lars van der Niet (Lars Niet), senior full-stack developer at Adswag Amsterdam. Expertise in Docker, Kubernetes, NextJS, Go and TypeScript.",
    url: baseUrl,
    siteName: "Lars van der Niet",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${baseUrl}/og?title=Lars+van+der+Niet`,
        width: 1200,
        height: 630,
        alt: "Lars van der Niet — Full-stack developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lars van der Niet",
    description:
      "Lars van der Niet (Lars Niet), senior full-stack developer at Adswag Amsterdam.",
    images: [`${baseUrl}/og?title=Lars+van+der+Niet`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      name: "Lars van der Niet",
      alternateName: ["Lars Niet", "larsniet.com"],
      url: baseUrl,
      description: "Personal site of Lars van der Niet, full-stack developer in Amsterdam.",
      publisher: { "@id": `${baseUrl}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${baseUrl}/#person`,
      name: "Lars van der Niet",
      // ponytail: spellings people actually type; Google reads these for entity matching
      alternateName: ["Lars Niet", "Lars vd Niet", "Lars v.d. Niet", "larsniet"],
      givenName: "Lars",
      familyName: "van der Niet",
      jobTitle: "Senior Full Stack Developer",
      description:
        "Lars van der Niet is a senior full-stack developer at Adswag in Amsterdam, working in TypeScript, Go, React and NestJS on Kubernetes.",
      url: baseUrl,
      image: `${baseUrl}/images/lars-van-der-niet.webp`,
      email: "lvdnbusiness@gmail.com",
      nationality: "Dutch",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Amsterdam",
        addressCountry: "NL",
      },
      worksFor: {
        "@type": "Organization",
        name: "Adswag",
        url: "https://adswag.nl",
      },
      knowsAbout: ["TypeScript", "Go", "React", "NestJS", "Kubernetes", "Docker", "AdTech", "Digital Out-of-Home"],
      sameAs: [
        "https://www.linkedin.com/in/larsvanderniet",
        "https://github.com/larsniet",
      ],
    },
  ],
};

const cx = (...classes: string[]) => classes.filter(Boolean).join(" ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cx(
        "text-black bg-white dark:text-white dark:bg-black",
        GeistSans.variable,
        GeistMono.variable,
      )}
    >
      <body className="antialiased noise bg-white dark:bg-black">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ServiceWorkerRegister />
        {/* Full-width sticky navbar */}
        <Navbar />
        {/* Centered reading column */}
        <main className="max-w-2xl w-full mx-auto px-4 mt-12 mb-0 flex flex-col flex-auto min-w-0">
          {children}
          <Footer />
        </main>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
