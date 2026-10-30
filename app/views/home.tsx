import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import type { Metadata } from "next";

import { JourneyPosts } from "@/app/components/posts";
import Badge from "@/app/components/badge";
import { getPosts } from "@/app/journey/utils";
import { alternates, type Locale } from "@/app/i18n";

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

export const homeMetadata = (locale: Locale): Metadata => ({
  description:
    locale === "nl"
      ? "Lars van der Niet, senior full-stack developer bij Adswag in Amsterdam. Bouwt een Digital Out-of-Home advertentienetwerk en AdTech-platformen in TypeScript, Go, React en NestJS op Kubernetes."
      : "Lars van der Niet, senior full-stack developer at Adswag Amsterdam, building a Digital Out-of-Home ad network and AdTech platforms in TypeScript, Go, React and NestJS on Kubernetes.",
  alternates: alternates("/", locale),
});

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

const adswagBadge = (
  <Link href="https://adswag.nl" target="_blank" className="inline-flex align-middle">
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
);
const reactBadge = <TechBadge href="https://react.dev" src={react} text="React" />;
const nestBadge = <TechBadge href="https://nestjs.com" src={nestjs} text="NestJS" />;
const goBadge = <TechBadge href="https://go.dev" src={go} text="Go" />;
const dockerBadge = <TechBadge href="https://www.docker.com/" src={docker} text="Docker" />;
const k8sBadge = <TechBadge href="https://kubernetes.io/" src={kubernetes} text="Kubernetes" />;
const ansibleBadge = <TechBadge href="https://www.ansible.com/" src={ansible} text="Ansible" />;

const copy = {
  en: {
    h1: "Hi, I am Lars van der Niet",
    hero: (
      <>
        Senior full-stack developer at {adswagBadge}, a digital advertising
        company in Amsterdam. I lead technical projects end to end, from the
        first architecture sketch to the last deploy, and I like the problems
        best where hardware, data and software meet.
      </>
    ),
    about: (
      <>
        Outside work you&apos;ll find me on a motorcycle, on a kitesurf board,
        or at home wiring up ESP32 boards and printing parts for whatever
        automation idea I had that week. At Adswag I build in TypeScript and
        Go, with {reactBadge} on the front and {nestBadge} and {goBadge}{" "}
        services on the back. It all runs on {dockerBadge} and {k8sBadge}, is
        automated with {ansibleBadge}, and AI agents have become a normal part
        of how I work.
      </>
    ),
    writing: "writing",
    alts: [
      "Meeting at the office",
      "Portrait on a balcony",
      "On a motorcycle",
      "Portrait of Lars van der Niet",
      "Discussing work with a colleague",
      "Working at desk",
    ],
  },
  nl: {
    h1: "Hi, ik ben Lars van der Niet",
    hero: (
      <>
        Senior full-stack developer bij {adswagBadge}, een digitaal
        advertentiebedrijf in Amsterdam. Ik leid technische projecten van
        begin tot eind, van de eerste architectuurschets tot de laatste deploy,
        en de leukste problemen vind ik daar waar hardware, data en software
        samenkomen.
      </>
    ),
    about: (
      <>
        Buiten werk vind je me op de motor, op een kitesurfboard, of thuis
        waar ik ESP32-bordjes aan het bedraden ben en onderdelen print voor het
        automatiseringsidee van die week. Bij Adswag bouw ik in TypeScript en
        Go, met {reactBadge} aan de voorkant en {nestBadge} en {goBadge}
        -services aan de achterkant. Alles draait op {dockerBadge} en{" "}
        {k8sBadge}, wordt geautomatiseerd met {ansibleBadge}, en AI-agents zijn
        inmiddels een normaal onderdeel van hoe ik werk.
      </>
    ),
    writing: "artikelen",
    alts: [
      "Overleg op kantoor",
      "Portret op een balkon",
      "Op de motor",
      "Portret van Lars van der Niet",
      "Werkoverleg met een collega",
      "Aan het werk achter mijn bureau",
    ],
  },
};

export async function Home({ locale }: { locale: Locale }) {
  let posts = await getPosts(locale);
  const c = copy[locale];

  return (
    <section className="pt-2 pb-16">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <div className="fade-up fade-up-1 mb-10">
        <h1 className="mb-4 text-4xl font-semibold tracking-tighter leading-tight text-black dark:text-white">
          {c.h1}
        </h1>
        <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
          {c.hero}
        </p>
      </div>

      {/* ── Photo Grid ───────────────────────────────────────── */}
      <div className="fade-up fade-up-2 grid grid-cols-2 grid-rows-4 sm:grid-rows-3 sm:grid-cols-3 gap-3 mb-12">
        <div className="relative h-40 overflow-hidden rounded-lg group cursor-pointer">
          <Image
            src={meeting}
            alt={c.alts[0]}
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
            alt={c.alts[1]}
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
            alt={c.alts[2]}
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
            alt={c.alts[3]}
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
            alt={c.alts[4]}
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
            alt={c.alts[5]}
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
          {c.about}
        </p>
      </div>

      {/* ── Writing ──────────────────────────────────────────── */}
      <div className="fade-up fade-up-4">
        <div className="flex items-center gap-3 mb-5">
          <p className="text-xs font-medium tracking-widest uppercase text-neutral-500 dark:text-neutral-400 font-(family-name:--font-geist-mono)">
            {c.writing}
          </p>
          <div className="flex-1 h-px bg-neutral-100 dark:bg-neutral-900" />
        </div>
        <JourneyPosts posts={posts} locale={locale} />
      </div>
    </section>
  );
}
