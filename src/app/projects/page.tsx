import type { Metadata } from "next";
import Link from "next/link";

import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  const isExternalHref = (href: string) => href.startsWith("http");

  return (
    <section className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Projects</h1>
        <p className="text-muted-foreground">Focused builds with measurable outcomes.</p>
      </div>

      <div className="space-y-6">
        {projects.map((project) => (
          <article key={project.title} className="space-y-4 rounded-lg border border-border p-5">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">{project.title}</h2>
              <p className="text-sm leading-7 text-foreground/90">{project.description}</p>
              <p className="text-sm text-muted-foreground">{project.impact}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span
                  key={`${project.title}-${item}`}
                  className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 text-sm">
              {isExternalHref(project.repoUrl) ? (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium underline underline-offset-4"
                >
                  Repository
                </a>
              ) : (
                <Link href={project.repoUrl} className="font-medium underline underline-offset-4">
                  Repository
                </Link>
              )}
              {project.liveUrl ? (
                isExternalHref(project.liveUrl) ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline underline-offset-4"
                  >
                    Live Site
                  </a>
                ) : (
                  <Link href={project.liveUrl} className="font-medium underline underline-offset-4">
                    Live Site
                  </Link>
                )
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
