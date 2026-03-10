import { Clock3, FileText, Github, Linkedin, Mail, MapPin } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CurrentTime } from "@/components/current_time";
import { RoleScroller } from "@/components/role_scroller";
import { TechIcon } from "@/components/tech_icon";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "About | Anton Koulikov",
};

const SOCIAL_BUTTON_CLASS =
  "inline-flex h-11 items-center gap-2 rounded-md border border-border/40 px-2.5 text-sm font-medium transition-all duration-150 hover:text-foreground hover:bg-muted/40 hover:border-foreground/20";
const SOCIAL_ICON_CLASS =
  "inline-flex h-12 w-12 items-center justify-center rounded-md transition-colors";
const SOCIAL_IMAGE_CLASS = "h-6 w-6 object-contain";
const TECHNOLOGY_ICON_CLASS =
  "inline-flex h-12 w-12 items-center justify-center rounded-full transition-colors";
const TECHNOLOGY_IMAGE_CLASS = "h-6 w-6 object-contain";
const TECH_PLACEHOLDER = undefined;

type SocialIconConfig =
  | { kind: "brand"; lightSrc: string; darkSrc: string }
  | { kind: "icon"; Icon: typeof Mail | typeof FileText | typeof Linkedin };

function getSocialIcon(label: string): SocialIconConfig {
  const normalized = label.toLowerCase();

  if (normalized.includes("github")) {
    return {
      kind: "brand" as const,
      lightSrc: "https://cdn.simpleicons.org/github",
      darkSrc: "https://cdn.simpleicons.org/github/ffffff",
    };
  }

  if (normalized.includes("linkedin")) {
    return {
      kind: "icon",
      Icon: Linkedin,
    };
  }

  if (normalized.includes("email")) {
    return {
      kind: "icon",
      Icon: Mail,
    };
  }

  if (normalized.includes("resume")) {
    return {
      kind: "icon",
      Icon: FileText,
    };
  }

  return {
    kind: "icon",
    Icon: Github,
  };
}

function getTechIconUrl(tech: string) {
  const normalized = tech.toLowerCase();

  if (normalized.includes("next.js") || normalized.includes("nextjs")) {
    return {
      light: "https://cdn.simpleicons.org/nextdotjs",
      dark: "https://cdn.simpleicons.org/nextdotjs/ffffff",
    };
  }

  if (normalized.includes("react")) {
    return {
      light: "https://cdn.simpleicons.org/react",
      dark: "https://cdn.simpleicons.org/react/61DAFB",
    };
  }

  if (normalized.includes("typescript")) {
    return {
      light: "https://cdn.simpleicons.org/typescript",
      dark: "https://cdn.simpleicons.org/typescript/3178C6",
    };
  }

  if (normalized.includes("javascript")) {
    return {
      light: "https://cdn.simpleicons.org/javascript",
      dark: "https://cdn.simpleicons.org/javascript/F7DF1E",
    };
  }

  if (normalized.includes("python")) {
    return {
      light: "https://cdn.simpleicons.org/python",
      dark: "https://cdn.simpleicons.org/python/3776AB",
    };
  }

  if (normalized.includes("django")) {
    return {
      light: "https://cdn.simpleicons.org/django",
      dark: "https://cdn.simpleicons.org/django/092E20",
    };
  }

  if (normalized.includes("go")) {
    return {
      light: "https://cdn.simpleicons.org/go",
      dark: "https://cdn.simpleicons.org/go/00ADD8",
    };
  }

  if (normalized.includes("postgresql") || normalized.includes("postgres")) {
    return {
      light: "https://cdn.simpleicons.org/postgresql",
      dark: "https://cdn.simpleicons.org/postgresql/4169E1",
    };
  }

  if (normalized.includes("tailwind")) {
    return {
      light: "https://cdn.simpleicons.org/tailwindcss",
      dark: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
    };
  }

  if (normalized.includes("shadcn")) {
    return {
      light: "https://cdn.simpleicons.org/shadcnui",
      dark: "https://cdn.simpleicons.org/shadcnui/4f46e5",
    };
  }

  return {
    light: "https://cdn.simpleicons.org/circle",
    dark: "https://cdn.simpleicons.org/circle/ffffff",
  };
}

export default function HomePage() {
  const isExternalHref = (href: string) => href.startsWith("http") || href.startsWith("mailto:");
  const isHttpHref = (href: string) => href.startsWith("http");
  const orderedSocials = [...profile.socials].sort((a, b) => {
    const priority = (label: string) => {
      const normalized = label.toLowerCase();

      if (normalized.includes("linkedin")) return 1;
      if (normalized.includes("github")) return 2;
      if (normalized.includes("email")) return 3;
      if (normalized.includes("resume")) return 4;
      return 4;
    };

    return priority(a.label) - priority(b.label);
  });
  const stack = [...new Set(profile.techStack)].filter(Boolean).sort((a, b) => a.localeCompare(b));

  return (
    <section className="space-y-8 text-left">
      <div className="space-y-2">
        <div className="flex flex-wrap items-end gap-4">
          <div className="border-border relative h-28 w-28 shrink-0 overflow-hidden rounded-full border md:h-36 md:w-36">
            <Image
              src={profile.portraitUrl}
              alt={`${profile.name} portrait`}
              fill
              sizes="(max-width: 768px) 112px, 144px"
              className="object-cover"
              priority
            />
          </div>
          <div className="space-y-1">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{profile.name}</h1>
            <RoleScroller roles={profile.roles} />
            <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-sm">
              <span className="inline-flex items-center gap-1.5">
                <span className="border-border inline-flex h-6 w-6 items-center justify-center rounded-full border">
                  <MapPin className="text-muted-foreground size-3.5" />
                </span>
                <span className="leading-tight">{profile.location}</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="border-border inline-flex h-6 w-6 items-center justify-center rounded-full border">
                  <Clock3 className="text-muted-foreground size-3.5" />
                </span>
                <CurrentTime timezone={profile.timezone} />
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {orderedSocials.map((link) => {
          const socialIcon = getSocialIcon(link.label);
          const IconComponent = socialIcon.kind === "icon" ? socialIcon.Icon : null;
          return isExternalHref(link.href) ? (
            <a
              key={link.label}
              href={link.href}
              target={isHttpHref(link.href) ? "_blank" : undefined}
              rel={isHttpHref(link.href) ? "noopener noreferrer" : undefined}
              aria-label={link.label}
              className={SOCIAL_BUTTON_CLASS}
            >
              <span className={SOCIAL_ICON_CLASS}>
                {IconComponent ? (
                  <IconComponent className="text-muted-foreground size-5" />
                ) : (
                  <TechIcon
                    alt={link.label}
                    lightSrc={socialIcon.kind === "brand" ? socialIcon.lightSrc : ""}
                    darkSrc={socialIcon.kind === "brand" ? socialIcon.darkSrc : ""}
                    width={24}
                    height={24}
                    className={SOCIAL_IMAGE_CLASS}
                  />
                )}
              </span>
              {link.label}
            </a>
          ) : (
            <Link
              key={link.label}
              href={link.href}
              className={SOCIAL_BUTTON_CLASS}
              aria-label={link.label}
            >
              <span className={SOCIAL_ICON_CLASS}>
                {IconComponent ? (
                  <IconComponent className="text-muted-foreground size-5" />
                ) : (
                  <TechIcon
                    alt={link.label}
                    lightSrc={socialIcon.kind === "brand" ? socialIcon.lightSrc : ""}
                    darkSrc={socialIcon.kind === "brand" ? socialIcon.darkSrc : ""}
                    width={24}
                    height={24}
                    className={SOCIAL_IMAGE_CLASS}
                  />
                )}
              </span>
              {link.label}
            </Link>
          );
        })}
      </div>

      <div className="text-foreground/90 space-y-3 text-lg leading-8">
        {profile.intro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Tech Stack</h2>
        <TooltipProvider>
          <div className="flex flex-wrap items-center gap-2">
            {stack.map((tech) => {
              const iconSources = getTechIconUrl(tech);
              const href = TECH_PLACEHOLDER;

              return (
                <Tooltip key={tech}>
                  <TooltipTrigger asChild>
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={tech}
                        className={TECHNOLOGY_ICON_CLASS}
                      >
                        <TechIcon
                          alt={tech}
                          lightSrc={iconSources.light}
                          darkSrc={iconSources.dark}
                          width={24}
                          height={24}
                          className={TECHNOLOGY_IMAGE_CLASS}
                        />
                      </a>
                    ) : (
                      <span aria-label={tech} className={TECHNOLOGY_ICON_CLASS}>
                        <TechIcon
                          alt={tech}
                          lightSrc={iconSources.light}
                          darkSrc={iconSources.dark}
                          width={24}
                          height={24}
                          className={TECHNOLOGY_IMAGE_CLASS}
                        />
                      </span>
                    )}
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p className="font-medium">{tech}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </TooltipProvider>
      </div>
    </section>
  );
}
