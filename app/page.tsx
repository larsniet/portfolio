import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import type { Metadata } from "next";

import { JourneyPosts } from "@/app/components/posts";
import Badge from "@/app/components/badge";
import { getPosts } from "@/app/journey/utils";

import meeting from "@/assets/images/meeting.jpg";
import balcony from "@/assets/images/balcony.webp";
import bikes from "@/assets/images/bikes.jpg";
import headshot from "@/assets/images/headshot.webp";
import workdiscussion from "@/assets/images/workdiscussion.jpg";
import workstation from "@/assets/images/workstation.jpg";

import docker from "@/assets/images/docker.png";
import adswag from "@/assets/images/adswag.png";
import kubernetes from "@/assets/images/kubernetes.png";
import ansible from "@/assets/images/ansible.png";
import react from "@/assets/images/react.png";
import nestjs from "@/assets/images/nestjs.png";
import go from "@/assets/images/go.png";

export const metadata: Metadata = {
  description:
    "Senior full-stack developer at Adswag Amsterdam, building a Digital Out-of-Home ad network and AdTech platforms in TypeScript, Go, React and NestJS on Kubernetes.",
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
      jobTitle: "Senior Full Stack Developer",
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

function TechBadge({
  href,
  src,
  text,
}: {
  href: string;
  src: StaticImageData;
  text: string;
}) {
  return (
    <Link href={href} target="_blank" className="inline-flex align-middle">
      <Badge
        text={text}
        icon={
          <Image
            src={src}
            alt={`${text} logo`}
            width={14}
            height={14}
            className="w-3.5 h-3.5 object-contain"
          />
        }
      />
    </Link>
  );
}

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
          Senior full-stack developer at{" "}
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
                  alt="Adswag logo"
                  width={14}
                  height={14}
                  className="w-3.5 h-3.5"
                />
              }
            />
          </Link>
          , a digital advertising company in Amsterdam. I lead technical
          projects end to end, from the first architecture sketch to the last
          deploy, and I like the problems best where hardware, data and
          software meet.
        </p>
      </div>

      {/* ── Photo Grid ───────────────────────────────────────── */}
      <div className="fade-up fade-up-2 grid grid-cols-2 grid-rows-4 sm:grid-rows-3 sm:grid-cols-3 gap-3 mb-12">
        <div className="relative h-40 overflow-hidden rounded-lg group cursor-pointer">
          <Image
            src={meeting}
            alt="Meeting at the office"
            className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-90"
            sizes="(max-width: 640px) 50vw, 205px"
            quality={70}
            priority
            fill
          />
        </div>
        <div className="relative sm:row-span-2 row-span-1 overflow-hidden rounded-lg group cursor-pointer">
          <Image
            src={balcony}
            alt="Portrait on a balcony"
            className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-90"
            sizes="(max-width: 640px) 50vw, 205px"
            quality={70}
            priority
            fill
          />
        </div>
        <div className="relative overflow-hidden rounded-lg group cursor-pointer">
          <Image
            src={bikes}
            alt="On a motorcycle"
            className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-90"
            sizes="(max-width: 640px) 50vw, 205px"
            quality={70}
            priority
            fill
          />
        </div>
        <div className="relative row-span-2 overflow-hidden rounded-lg group cursor-pointer">
          <Image
            src={headshot}
            alt="Portrait of Lars van der Niet"
            className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-90"
            sizes="(max-width: 640px) 50vw, 205px"
            quality={70}
            priority
            fill
          />
        </div>
        <div className="relative row-span-2 overflow-hidden rounded-lg group cursor-pointer">
          <Image
            src={workdiscussion}
            alt="Discussing work with a colleague"
            className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-90"
            sizes="(max-width: 640px) 50vw, 205px"
            quality={70}
            priority
            fill
          />
        </div>
        <div className="relative h-40 overflow-hidden rounded-lg group cursor-pointer">
          <Image
            src={workstation}
            alt="Working at desk"
            className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-90"
            sizes="(max-width: 640px) 50vw, 205px"
            quality={70}
            priority
            fill
          />
        </div>
      </div>

      {/* ── About ────────────────────────────────────────────── */}
      <div className="fade-up fade-up-3 mb-12">
        <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Outside work you&apos;ll find me on a motorcycle, on a kitesurf
          board, or at home wiring up ESP32 boards and printing parts for
          whatever automation idea I had that week. At Adswag I build in
          TypeScript and Go, with{" "}
          <TechBadge href="https://react.dev" src={react} text="React" />
          {" on the front and "}
          <TechBadge href="https://nestjs.com" src={nestjs} text="NestJS" />
          {" and "}
          <TechBadge href="https://go.dev" src={go} text="Go" />
          {" services on the back. It all runs on "}
          <TechBadge href="https://www.docker.com/" src={docker} text="Docker" />
          {" and "}
          <TechBadge
            href="https://kubernetes.io/"
            src={kubernetes}
            text="Kubernetes"
          />
          {", is automated with "}
          <TechBadge
            href="https://www.ansible.com/"
            src={ansible}
            text="Ansible"
          />
          {", and AI agents have become a normal part of how I work."}
        </p>
      </div>

      {/* ── Writing ──────────────────────────────────────────── */}
      <div className="fade-up fade-up-4">
        <div className="flex items-center gap-3 mb-5">
          <p className="text-xs font-medium tracking-widest uppercase text-neutral-500 dark:text-neutral-400 font-(family-name:--font-geist-mono)">
            writing
          </p>
          <div className="flex-1 h-px bg-neutral-100 dark:bg-neutral-900" />
        </div>
        <JourneyPosts posts={posts} />
      </div>
    </section>
  );
}
