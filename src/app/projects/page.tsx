import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import {
  SectionBody,
  SectionHeader,
  SectionItemCard,
  SectionLeadPanel,
} from "@/components/page-section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: {
    absolute: "Projects | Anton Koulikov",
  },
};

function SectionText({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-foreground/90 text-sm leading-7 ${className}`.trim()}>{children}</p>;
}

function SectionLabel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-sm font-medium ${className}`.trim()}>{children}</p>;
}

function SectionList({ items, className = "" }: { items: string[]; className?: string }) {
  if (items.length === 0) return null;

  return (
    <ul className={`text-foreground/90 list-disc space-y-2 pl-5 text-sm ${className}`.trim()}>
      {items.map((detail, index) => (
        <li key={`${detail}-${index}`}>{detail}</li>
      ))}
    </ul>
  );
}

function isExternalHref(href: string) {
  try {
    const url = new URL(href);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

type ParsedDate = {
  year: number;
  monthIndex: number;
};

const MONTH_INDEX: Record<string, number> = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};

function parsePeriodStart(period: string): ParsedDate | null {
  const normalizedPeriod = period.replace(/\s*-\s*/g, " - ").trim();
  const start = normalizedPeriod.split(" - ")[0]?.trim();
  if (!start) return null;

  const splitParts = start.split(" ").filter(Boolean);
  if (splitParts.length === 1) {
    const yearOnly = Number.parseInt(splitParts[0], 10);
    if (!Number.isFinite(yearOnly)) return null;

    return { year: yearOnly, monthIndex: 0 };
  }

  const [monthRaw, yearRaw] = splitParts;
  if (!monthRaw || !yearRaw) return null;

  const month = monthRaw.charAt(0).toUpperCase() + monthRaw.slice(1).toLowerCase();
  const monthIndex = MONTH_INDEX[month as keyof typeof MONTH_INDEX];
  const parsedYear = Number.parseInt(yearRaw, 10);

  if (!Number.isFinite(parsedYear) || monthIndex === undefined) return null;

  return { year: parsedYear, monthIndex };
}

function isAfter(a: ParsedDate, b: ParsedDate): boolean {
  if (a.year !== b.year) return a.year > b.year;
  return a.monthIndex > b.monthIndex;
}

function isMostRecentPeriod(indexA: number, indexB: number, list: typeof projects): boolean {
  const parsedA = parsePeriodStart(list[indexA]?.period ?? "");
  const parsedB = parsePeriodStart(list[indexB]?.period ?? "");

  if (!parsedA) return false;
  if (!parsedB) return true;

  return isAfter(parsedA, parsedB);
}

function shouldUseCarousel(images: { src: string; alt: string }[]) {
  return images.length > 1;
}

function toYouTubeEmbedUrl(rawUrl: string) {
  try {
    const parsed = new URL(rawUrl);
    const host = parsed.hostname.replace("www.", "");

    if (host === "youtu.be") {
      const id = parsed.pathname.replace("/", "");
      const start = parsed.searchParams.get("t");

      const embedBase = `https://www.youtube.com/embed/${id}`;
      if (!start) return embedBase;

      return `${embedBase}?start=${encodeURIComponent(start)}`;
    }

    if (host.includes("youtube.com")) {
      const id = parsed.searchParams.get("v");
      if (!id) return rawUrl;

      const start = parsed.searchParams.get("t");
      const embedBase = `https://www.youtube.com/embed/${id}`;

      if (!start) return embedBase;

      return `${embedBase}?start=${encodeURIComponent(start)}`;
    }
  } catch {
    return rawUrl;
  }

  return rawUrl;
}

function ProjectMedia({
  images,
  demoVideoUrl,
}: {
  images: { src: string; alt: string }[];
  demoVideoUrl?: string;
}) {
  if (demoVideoUrl) {
    const embedUrl = toYouTubeEmbedUrl(demoVideoUrl);

    return (
      <div className="relative w-full overflow-hidden rounded-md border">
        <div className="aspect-video w-full">
          <iframe
            src={embedUrl}
            title="Project walkthrough"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            className="h-full w-full border-0"
          />
        </div>
      </div>
    );
  }

  if (images.length === 0) return null;

  if (!shouldUseCarousel(images)) {
    const featuredImage = images[0];

    return (
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md border">
        <Image
          src={featuredImage.src}
          alt={featuredImage.alt}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 768px, (min-width: 768px) 640px, 100vw"
        />
      </div>
    );
  }

  return (
    <Carousel opts={{ loop: true, align: "start" }} className="group w-full">
      <CarouselContent>
        {images.map((image) => (
          <CarouselItem key={image.src}>
            <div className="relative aspect-[16/10] overflow-hidden rounded-md border">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 768px, (min-width: 768px) 640px, 100vw"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default function ProjectsPage() {
  const mostRecentProjectIndex = projects.reduce(
    (mostRecent, _, currentIndex) =>
      isMostRecentPeriod(currentIndex, mostRecent, projects) ? currentIndex : mostRecent,
    0
  );
  const defaultOpenProject = projects.length > 0 ? `project-${mostRecentProjectIndex}` : undefined;

  return (
    <section className="space-y-6 text-left">
      <SectionLeadPanel
        title="Projects"
        description="Selected work focused on reliable systems, practical product design, and real engineering challenges."
      />

      <Accordion
        type="multiple"
        defaultValue={defaultOpenProject ? [defaultOpenProject] : []}
        className="space-y-4"
      >
        {projects.map((project, projectIndex) => (
          <SectionItemCard key={project.title}>
            <AccordionItem value={`project-${projectIndex}`} className="border-none">
              <SectionHeader>
                <AccordionTrigger className="w-full justify-start gap-0 px-0 py-0 hover:no-underline">
                  <div className="w-full space-y-2 text-left">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <CardTitle className="text-xl leading-tight">{project.title}</CardTitle>
                      {project.teamType ? <Badge>{project.teamType}</Badge> : null}
                    </div>
                    <p className="text-muted-foreground text-sm">{project.period}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((item) => (
                        <Badge key={`${project.title}-${item}`} variant="secondary">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </AccordionTrigger>
              </SectionHeader>
              <AccordionContent>
                <SectionBody className="space-y-4">
                  <SectionText>{project.summary}</SectionText>

                  {project.description.split("\n\n").map((paragraph, index) => (
                    <SectionText
                      key={`${project.title}-description-${index}`}
                      className={index === 0 ? "mt-4" : "mt-2"}
                    >
                      {paragraph}
                    </SectionText>
                  ))}

                  {project.images ? (
                    <ProjectMedia images={project.images} demoVideoUrl={project.demoVideoUrl} />
                  ) : (
                    <ProjectMedia images={[]} demoVideoUrl={project.demoVideoUrl} />
                  )}

                  {project.role ? <SectionText className="mt-3">{project.role}</SectionText> : null}

                  <SectionList items={project.details} className="mt-3" />

                  {project.engineeringChallenge ? (
                    <>
                      <SectionLabel className="mt-4">Engineering challenge</SectionLabel>
                      <SectionText className="mt-2">{project.engineeringChallenge}</SectionText>
                    </>
                  ) : null}

                  {project.highlights.length ? (
                    <SectionList items={project.highlights} className="mt-3" />
                  ) : null}

                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    {isExternalHref(project.repoUrl) ? (
                      <Button asChild variant="outline" size="sm">
                        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                          Repository
                        </a>
                      </Button>
                    ) : (
                      <Button asChild variant="outline" size="sm">
                        <Link href={project.repoUrl}>Repository</Link>
                      </Button>
                    )}
                    {project.liveUrl ? (
                      isExternalHref(project.liveUrl) ? (
                        <Button asChild variant="outline" size="sm">
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            Live Demo
                          </a>
                        </Button>
                      ) : (
                        <Button asChild variant="outline" size="sm">
                          <Link href={project.liveUrl}>Live Demo</Link>
                        </Button>
                      )
                    ) : null}
                  </div>
                </SectionBody>
              </AccordionContent>
            </AccordionItem>
          </SectionItemCard>
        ))}
      </Accordion>
    </section>
  );
}
