import "./global.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Navbar } from "./components/nav";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "./components/footer";
import ServiceWorkerRegister from "./components/service-worker-register";
import { baseUrl } from "./sitemap";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  manifest: "/manifest.json",
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
    "Leading tech projects at Adswag Amsterdam. Expertise in Docker, Kubernetes, NextJS, and Ubuntu servers. Passionate about new technologies and innovative solutions.",
  openGraph: {
    title: "Lars van der Niet",
    description:
      "Leading tech projects at Adswag Amsterdam. Expertise in Docker, Kubernetes, NextJS, and Ubuntu servers. Passionate about new technologies and innovative solutions.",
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
      "Leading tech projects at Adswag Amsterdam. Expertise in Docker, Kubernetes, NextJS, and Ubuntu servers.",
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
      <body className="antialiased noise">
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
