import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
  compactClass,
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

function isExternalHref(href: string) {
  try {
    const url = new URL(href);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
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
  return (
    <section className="space-y-6 text-left">
      <SectionLeadPanel
        title="Projects"
        description="Selected work focused on reliable systems, practical product design, and measurable outcomes."
      />

      <Accordion type="single" collapsible className="space-y-4">
        {projects.map((project, projectIndex) => (
          <SectionItemCard key={project.title}>
            <AccordionItem value={`project-${projectIndex}`} className="border-none">
              <SectionHeader>
                <AccordionTrigger className="w-full justify-start gap-0 px-0 py-0 hover:no-underline">
                  <div className="w-full space-y-2 text-left">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <CardTitle className="text-xl leading-tight">{project.title}</CardTitle>
                      {project.status ? (
                        <Badge variant="outline" className="rounded-full">
                          {project.status}
                        </Badge>
                      ) : null}
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {project.company}
                      {project.period ? ` | ${project.period}` : ""}
                      {project.type ? ` | ${project.type}` : ""}
                    </p>
                    <p className="text-foreground/90 text-sm leading-7">{project.summary}</p>
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
                <SectionBody>
                  {project.images ? (
                    <div className="space-y-4">
                      <ProjectMedia images={project.images} demoVideoUrl={project.demoVideoUrl} />
                    </div>
                  ) : (
                    <ProjectMedia images={[]} demoVideoUrl={project.demoVideoUrl} />
                  )}

                  <p
                    className={`text-foreground/90 ${compactClass(project, "mt-4", "mt-1")} text-sm leading-7`}
                  >
                    {project.description}
                  </p>
                  <ul
                    className={`text-foreground/90 ${compactClass(project, "mt-3", "mt-2")} list-disc ${compactClass(
                      project,
                      "space-y-2",
                      "space-y-1"
                    )} pl-5 text-sm`}
                  >
                    {project.details.map((detail) => (
                      <li key={`${project.title}-${detail}`}>{detail}</li>
                    ))}
                  </ul>
                  <ul
                    className={`text-foreground/90 ${compactClass(project, "mt-3", "mt-2")} list-disc ${compactClass(
                      project,
                      "space-y-2",
                      "space-y-1"
                    )} pl-5 text-sm`}
                  >
                    {project.highlights.map((highlight) => (
                      <li key={`${project.title}-${highlight}`}>{highlight}</li>
                    ))}
                  </ul>

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
