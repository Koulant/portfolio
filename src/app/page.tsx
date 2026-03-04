import type { Metadata } from "next";
import Link from "next/link";

import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "About | Anton Koulikov",
};

export default function HomePage() {
  const isExternalHref = (href: string) => href.startsWith("http") || href.startsWith("mailto:");
  const isHttpHref = (href: string) => href.startsWith("http");

  return (
    <section className="space-y-10">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{profile.name}</h1>
          {profile.available ? (
            <span className="inline-flex items-center rounded-full border border-border px-3 py-1 text-sm font-medium text-muted-foreground">
              Available
            </span>
          ) : null}
        </div>
        <p className="text-xl text-muted-foreground">{profile.role}</p>
        <p className="text-sm text-muted-foreground">{profile.location}</p>
      </div>

      <div className="max-w-3xl space-y-5 text-lg leading-8 text-foreground/90">
        {profile.intro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        {profile.socials.map((link) => (
          isExternalHref(link.href) ? (
            <a
              key={link.label}
              href={link.href}
              target={isHttpHref(link.href) ? "_blank" : undefined}
              rel={isHttpHref(link.href) ? "noopener noreferrer" : undefined}
              className="inline-flex items-center rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
              {link.label}
            </a>
          ) : (
            <Link
              key={link.label}
              href={link.href}
              className="inline-flex items-center rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
              {link.label}
            </Link>
          )
        ))}
      </div>
    </section>
  );
}
