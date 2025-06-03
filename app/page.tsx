import { JourneyPosts } from "app/components/posts";
import Badge from "app/components/badge";
import Link from "next/link";
import Image from "next/image";
import { getPosts } from "./journey/utils";

export const metadata = {
  description:
    "Leading tech projects at Adswag Amsterdam. Expertise in Docker, Kubernetes, NextJS, and Ubuntu servers. Passionate about new technologies and innovative solutions.",
};

export default async function Page() {
  let posts = await getPosts();

  return (
    <section>
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
                src="/images/adswag.png"
                alt="Adswag company logo"
                width={16}
                height={16}
                className="w-4 h-4"
                priority
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
            src="/images/meeting.jpg"
            alt="Meeting at the office"
            className="rounded-lg object-cover"
            sizes="(max-width: 768px) 213px, 33vw"
            fetchPriority="high"
            priority
            fill
          />
        </div>
        <div className="relative sm:row-span-2 row-span-1">
          <Image
            src="/images/balcony.jpg"
            alt="Portrait of Lars on a balcony"
            className="rounded-lg object-cover"
            sizes="(max-width: 768px) 213px, 33vw"
            fetchPriority="high"
            priority
            fill
          />
        </div>
        <div className="relative">
          <Image
            src="/images/bikes.jpg"
            alt="Lars on a motorcycle"
            className="rounded-lg object-cover"
            sizes="(max-width: 768px) 213px, 33vw"
            fetchPriority="high"
            priority
            fill
          />
        </div>
        <div className="relative row-span-2">
          <Image
            src="/images/laugh.jpg"
            alt="Lars laughing"
            className="rounded-lg object-cover"
            sizes="(max-width: 768px) 213px, 33vw"
            fetchPriority="high"
            priority
            fill
          />
        </div>
        <div className="relative row-span-2">
          <Image
            src="/images/workdiscussion.jpg"
            alt="Lars discussing work with a colleague"
            className="rounded-lg object-cover"
            sizes="(max-width: 768px) 213px, 33vw"
            fetchPriority="high"
            fill
          />
        </div>
        <div className="relative h-40">
          <Image
            src="/images/workstation.jpg"
            alt="Lars working at his desk"
            className="rounded-lg object-cover"
            sizes="(max-width: 768px) 213px, 33vw"
            fetchPriority="high"
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
                src="/images/docker.png"
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
                src="/images/kubernetes.png"
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
                src="/images/nextjs.png"
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
                src="/images/ansible.png"
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
                src="/images/ag-grid.png"
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
