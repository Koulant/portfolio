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
            <span className="border-border text-muted-foreground inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium">
              Available
            </span>
          ) : null}
        </div>
        <p className="text-muted-foreground text-xl">{profile.role}</p>
        <p className="text-muted-foreground text-sm">{profile.location}</p>
      </div>

      <div className="text-foreground/90 max-w-3xl space-y-5 text-lg leading-8">
        {profile.intro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        {profile.socials.map((link) =>
          isExternalHref(link.href) ? (
            <a
              key={link.label}
              href={link.href}
              target={isHttpHref(link.href) ? "_blank" : undefined}
              rel={isHttpHref(link.href) ? "noopener noreferrer" : undefined}
              className="border-border hover:bg-muted inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium transition-colors"
            >
              {link.label}
            </a>
          ) : (
            <Link
              key={link.label}
              href={link.href}
              className="border-border hover:bg-muted inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium transition-colors"
            >
              {link.label}
            </Link>
          )
        )}
      </div>
    </section>
  );
}
