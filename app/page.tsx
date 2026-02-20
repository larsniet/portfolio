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
  "@type": "Person",
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
};

export default async function Page() {
  let posts = await getPosts();

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Hi, I am Lars
        <span role="img" aria-label="Wave" className="ml-2">
          👋
        </span>
      </h1>
      <p className="mb-4">
        I'm a full stack developer and a tech enthusiast with a passion for
        anything new in tech, working at{" "}
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
                alt="Adswag company logo"
                width={16}
                height={16}
                className="w-4 h-4"
              />
            }
          />
        </Link>
        . I lead projects, guiding them in specific directions to align with
        strategic goals and technical standards.
      </p>

      <div className="grid grid-cols-2 grid-rows-4 sm:grid-rows-3 sm:grid-cols-3 gap-4 my-8">
        <div className="relative h-40">
          <Image
            src={meeting}
            alt="Meeting at the office"
            className="rounded-lg object-cover"
            sizes="(max-width: 640px) 50vw, 33vw"
            quality={100}
            priority
            fill
          />
        </div>
        <div className="relative sm:row-span-2 row-span-1">
          <Image
            src={balcony}
            alt="Portrait of Lars on a balcony"
            className="rounded-lg object-cover"
            sizes="(max-width: 640px) 50vw, 33vw"
            quality={100}
            priority
            fill
          />
        </div>
        <div className="relative">
          <Image
            src={bikes}
            alt="Lars on a motorcycle"
            className="rounded-lg object-cover"
            sizes="(max-width: 640px) 50vw, 33vw"
            quality={100}
            priority
            fill
          />
        </div>
        <div className="relative row-span-2">
          <Image
            src={laugh}
            alt="Lars laughing"
            className="rounded-lg object-cover"
            sizes="(max-width: 640px) 50vw, 33vw"
            quality={100}
            priority
            fill
          />
        </div>
        <div className="relative row-span-2">
          <Image
            src={workdiscussion}
            alt="Lars discussing work with a colleague"
            className="rounded-lg object-cover"
            sizes="(max-width: 640px) 50vw, 33vw"
            quality={100}
            fill
          />
        </div>
        <div className="relative h-40">
          <Image
            src={workstation}
            alt="Lars working at his desk"
            className="rounded-lg object-cover"
            sizes="(max-width: 640px) 50vw, 33vw"
            quality={100}
            fill
          />
        </div>
      </div>

      <p className="mb-4">
        Whether it's the latest security camera, cutting-edge frontend
        frameworks, innovative motorcycles with advanced tech, or home
        automation systems, I deeply enjoy exploring and integrating new
        technologies. Currently, I work full-time for Adswag, a digital
        advertising company based in Amsterdam. At Adswag, I immerse myself in
        various technical challenges and projects, utilizing tools like {` `}
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
                alt="Docker logo"
                width={20}
                height={16}
                className="w-5 h-4"
              />
            }
          />
        </Link>
        {` and `}
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
                alt="Kubernetes logo"
                width={16}
                height={16}
                className="w-4 h-4"
              />
            }
          />
        </Link>
        , working with{` `}
        <Link
          href="https://nextjs.org"
          target="_blank"
          className="inline-flex align-middle"
        >
          <Badge
            text="NextJS"
            icon={
              <Image
                src={nextjs}
                alt="NextJS logo"
                width={16}
                height={16}
                className="w-4 h-4"
              />
            }
          />
        </Link>
        , setting up automated Ubuntu servers with{` `}
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
                alt="Ansible logo"
                width={16}
                height={16}
                className="w-4 h-4"
              />
            }
          />
        </Link>
        , and creating advanced analytics dashboards using{` `}
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
                alt="Ag-Grid logo"
                width={16}
                height={16}
                className="w-4 h-4"
              />
            }
          />
        </Link>
        . This blend of hands-on development and project leadership allows me to
        combine my love for technology with practical, real-world applications,
        while constantly testing the possibilities of new tech.
      </p>

      <div className="my-8">
        <JourneyPosts posts={posts} />
      </div>
    </section>
  );
}
