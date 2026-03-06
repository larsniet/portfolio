import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

import { JourneyPosts } from "@/app/components/posts";
import Badge from "@/app/components/badge";
import { getPosts } from "@/app/journey/utils";

import meeting from "@/assets/images/meeting.jpg";
import balcony from "@/assets/images/balcony.webp";
import bikes from "@/assets/images/bikes.jpg";
import laugh from "@/assets/images/laugh.webp";
import workdiscussion from "@/assets/images/workdiscussion.jpg";
import workstation from "@/assets/images/workstation.jpg";

import docker from "@/assets/images/docker.png";
import adswag from "@/assets/images/adswag.png";
import kubernetes from "@/assets/images/kubernetes.png";
import nextjs from "@/assets/images/nextjs.png";
import ansible from "@/assets/images/ansible.png";
import agGrid from "@/assets/images/ag-grid.png";

export const metadata: Metadata = {
  description:
    "Leading tech projects at Adswag Amsterdam. Expertise in Docker, Kubernetes, NextJS, and Ubuntu servers. Passionate about new technologies and innovative solutions.",
  alternates: {
    canonical: "/",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://larsniet.com/#website",
      name: "Lars van der Niet",
      url: "https://larsniet.com",
      description:
        "Full-stack developer and tech enthusiast based in Amsterdam.",
      author: { "@id": "https://larsniet.com/#person" },
    },
    {
      "@type": "Person",
      "@id": "https://larsniet.com/#person",
      name: "Lars van der Niet",
      jobTitle: "Full Stack Developer",
      url: "https://larsniet.com",
      email: "lvdnbusiness@gmail.com",
      worksFor: {
        "@type": "Organization",
        name: "Adswag",
        url: "https://adswag.nl",
      },
      sameAs: [
        "http://linkedin.com/in/larsvanderniet",
        "https://github.com/larsniet",
      ],
    },
  ],
};

export default async function Page() {
  let posts = await getPosts();

  return (
    <section className="pt-2 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <div className="fade-up fade-up-1 mb-10">
        <h1 className="mb-4 text-4xl font-semibold tracking-tighter leading-tight text-black dark:text-white">
          Hi, I am Lars
        </h1>
        <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Full-stack developer and tech enthusiast working at{" "}
          <Link
            href="https://adswag.nl"
            target="_blank"
            className="inline-flex align-middle"
          >
            <Badge
              text="Adswag"
              icon={
                <Image
                  src={adswag}
                  alt="Adswag"
                  width={14}
                  height={14}
                  className="w-3.5 h-3.5"
                />
              }
            />
          </Link>
          , a digital advertising company in Amsterdam. I lead projects, align
          them with strategic goals, and push the boundaries of what&apos;s
          technically possible.
        </p>
      </div>

      {/* ── Photo Grid ───────────────────────────────────────── */}
      <div className="fade-up fade-up-2 grid grid-cols-2 grid-rows-4 sm:grid-rows-3 sm:grid-cols-3 gap-3 mb-12">
        <div className="relative h-40 overflow-hidden rounded-lg group cursor-pointer">
          <Image
            src={meeting}
            alt="Meeting at the office"
            className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-90"
            sizes="(max-width: 640px) 50vw, 33vw"
            quality={100}
            priority
            fill
          />
        </div>
        <div className="relative sm:row-span-2 row-span-1 overflow-hidden rounded-lg group cursor-pointer">
          <Image
            src={balcony}
            alt="Portrait on a balcony"
            className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-90"
            sizes="(max-width: 640px) 50vw, 33vw"
            quality={100}
            priority
            fill
          />
        </div>
        <div className="relative overflow-hidden rounded-lg group cursor-pointer">
          <Image
            src={bikes}
            alt="On a motorcycle"
            className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-90"
            sizes="(max-width: 640px) 50vw, 33vw"
            quality={100}
            priority
            fill
          />
        </div>
        <div className="relative row-span-2 overflow-hidden rounded-lg group cursor-pointer">
          <Image
            src={laugh}
            alt="Laughing"
            className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-90"
            sizes="(max-width: 640px) 50vw, 33vw"
            quality={100}
            priority
            fill
          />
        </div>
        <div className="relative row-span-2 overflow-hidden rounded-lg group cursor-pointer">
          <Image
            src={workdiscussion}
            alt="Discussing work with a colleague"
            className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-90"
            sizes="(max-width: 640px) 50vw, 33vw"
            quality={100}
            fill
          />
        </div>
        <div className="relative h-40 overflow-hidden rounded-lg group cursor-pointer">
          <Image
            src={workstation}
            alt="Working at desk"
            className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-90"
            sizes="(max-width: 640px) 50vw, 33vw"
            quality={100}
            fill
          />
        </div>
      </div>

      {/* ── About ────────────────────────────────────────────── */}
      <div className="fade-up fade-up-3 mb-12">
        <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Whether it&apos;s the latest security camera, cutting-edge frontend
          frameworks, or home automation systems — I deeply enjoy exploring and
          integrating new technologies. At Adswag, I work with{" "}
          <Link
            href="https://www.docker.com/"
            target="_blank"
            className="inline-flex align-middle"
          >
            <Badge
              text="Docker"
              icon={
                <Image
                  src={docker}
                  alt="Docker"
                  width={18}
                  height={14}
                  className="w-[18px] h-3.5"
                />
              }
            />
          </Link>
          {" and "}
          <Link
            href="https://kubernetes.io/"
            target="_blank"
            className="inline-flex align-middle"
          >
            <Badge
              text="Kubernetes"
              icon={
                <Image
                  src={kubernetes}
                  alt="Kubernetes"
                  width={14}
                  height={14}
                  className="w-3.5 h-3.5"
                />
              }
            />
          </Link>
          {", build with "}
          <Link
            href="https://nextjs.org"
            target="_blank"
            className="inline-flex align-middle"
          >
            <Badge
              text="Next.js"
              icon={
                <Image
                  src={nextjs}
                  alt="Next.js"
                  width={14}
                  height={14}
                  className="w-3.5 h-3.5"
                />
              }
            />
          </Link>
          {", automate with "}
          <Link
            href="https://www.ansible.com/"
            target="_blank"
            className="inline-flex align-middle"
          >
            <Badge
              text="Ansible"
              icon={
                <Image
                  src={ansible}
                  alt="Ansible"
                  width={14}
                  height={14}
                  className="w-3.5 h-3.5"
                />
              }
            />
          </Link>
          {", and build dashboards with "}
          <Link
            href="https://www.ag-grid.com/"
            target="_blank"
            className="inline-flex align-middle"
          >
            <Badge
              text="Ag Grid"
              icon={
                <Image
                  src={agGrid}
                  alt="Ag-Grid"
                  width={14}
                  height={14}
                  className="w-3.5 h-3.5"
                />
              }
            />
          </Link>
          .
        </p>
      </div>

      {/* ── Writing ──────────────────────────────────────────── */}
      <div className="fade-up fade-up-4">
        <div className="flex items-center gap-3 mb-5">
          <p className="text-xs font-medium tracking-widest uppercase text-neutral-400 dark:text-neutral-500 font-[family-name:var(--font-geist-mono)]">
            writing
          </p>
          <div className="flex-1 h-px bg-neutral-100 dark:bg-neutral-900" />
        </div>
        <JourneyPosts posts={posts} />
      </div>
    </section>
  );
}
