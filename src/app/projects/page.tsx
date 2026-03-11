import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
};

function isExternalHref(href: string) {
  return href.startsWith("http");
}

function ProjectImages({ images }: { images: { src: string; alt: string }[] }) {
  if (images.length === 0) return null;

  if (images.length === 1) {
    return (
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md border">
        <Image
          src={images[0].src}
          alt={images[0].alt}
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
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Projects</CardTitle>
          <p className="text-muted-foreground text-sm">
            Focused builds with measurable outcomes, reusable patterns, and practical UX polish.
          </p>
        </CardHeader>
      </Card>

      <Accordion type="single" collapsible className="space-y-4">
        {projects.map((project, projectIndex) => (
          <Card key={project.title} className="overflow-hidden">
            <AccordionItem value={`project-${projectIndex}`} className="border-none">
              <CardHeader className="pb-3">
                <AccordionTrigger className="w-full justify-start gap-3 px-0 py-0 hover:no-underline">
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
              </CardHeader>
              <AccordionContent>
                <CardContent className="pt-0">
                  {project.images && project.images.length > 0 ? (
                    <div className="space-y-4">
                      <ProjectImages images={project.images} />
                    </div>
                  ) : null}

                  <p className="text-foreground/90 mt-4 text-sm leading-7">{project.description}</p>
                  <ul className="text-foreground/90 mt-4 list-disc space-y-2 pl-5 text-sm">
                    {project.details.map((detail) => (
                      <li key={`${project.title}-${detail}`}>{detail}</li>
                    ))}
                  </ul>
                  <ul className="text-foreground/90 mt-4 list-disc space-y-2 pl-5 text-sm">
                    {project.highlights.map((highlight) => (
                      <li key={`${project.title}-${highlight}`}>{highlight}</li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap items-center gap-3">
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
                </CardContent>
              </AccordionContent>
            </AccordionItem>
          </Card>
        ))}
      </Accordion>
    </section>
  );
}
