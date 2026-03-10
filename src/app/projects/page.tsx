import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  const isExternalHref = (href: string) => href.startsWith("http");

  return (
    <section className="space-y-6 text-left">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Projects</CardTitle>
          <p className="text-muted-foreground text-sm">Focused builds with measurable outcomes.</p>
        </CardHeader>
      </Card>

      <div className="space-y-4">
        {projects.map((project) => (
          <Card key={project.title}>
            <CardHeader className="pb-3">
              <CardTitle>{project.title}</CardTitle>
              <p className="text-foreground/90 text-sm leading-7">{project.description}</p>
              <p className="text-muted-foreground text-sm">{project.impact}</p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    key={`${project.title}-${item}`}
                    className="border-border text-muted-foreground rounded-full border px-2.5 py-1 text-xs"
                  >
                    {item}
                  </span>
                ))}
              </div>
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
                        Live Site
                      </a>
                    </Button>
                  ) : (
                    <Button asChild variant="outline" size="sm">
                      <Link href={project.liveUrl}>Live Site</Link>
                    </Button>
                  )
                ) : null}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
