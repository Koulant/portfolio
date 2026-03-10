import { Clock3, FileText, Github, Linkedin, Mail, MapPin } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CurrentTime } from "@/components/current_time";
import { RoleScroller } from "@/components/role_scroller";
import { TechIcon } from "@/components/tech_icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "About",
};

const SOCIAL_BUTTON_CLASS = "gap-2 px-3 h-11";
const SOCIAL_ICON_CLASS =
  "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md transition-colors";
const SOCIAL_IMAGE_CLASS = "h-7 w-7 object-contain";
const TECHNOLOGY_ICON_CLASS =
  "inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full transition-colors";
const TECHNOLOGY_IMAGE_CLASS = "h-8 w-8 object-contain";
const METADATA_ITEM_CLASS =
  "inline-flex h-6 shrink-0 items-center gap-1.5 rounded-full border border-border/60 px-2.5";
const METADATA_ICON_CLASS = "inline-flex h-5 w-5 items-center justify-center";

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

  if (normalized.includes("aws")) {
    return {
      light: "https://cdn.simpleicons.org/amazonwebservices",
      dark: "https://cdn.simpleicons.org/amazonwebservices/FF9900",
      fallbackSrc: "/aws_logo.svg",
    };
  }

  if (normalized.includes("docker")) {
    return {
      light: "https://cdn.simpleicons.org/docker",
      dark: "https://cdn.simpleicons.org/docker/2496ED",
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
    <section className="space-y-6 text-left">
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
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
                <div className="text-muted-foreground text-lg">
                  <RoleScroller roles={profile.roles} />
                </div>
                <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-sm leading-none">
                  <span className={METADATA_ITEM_CLASS}>
                    <span className={METADATA_ICON_CLASS}>
                      <MapPin className="text-muted-foreground size-3.5" />
                    </span>
                    <span className="leading-none">{profile.location}</span>
                  </span>
                  <span className={METADATA_ITEM_CLASS}>
                    <span className={METADATA_ICON_CLASS}>
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
              const linkLabel = link.label;

              return (
                <Button
                  asChild
                  key={linkLabel}
                  size="lg"
                  variant="outline"
                  className={SOCIAL_BUTTON_CLASS}
                  aria-label={linkLabel}
                >
                  {isExternalHref(link.href) ? (
                    <a
                      href={link.href}
                      target={isHttpHref(link.href) ? "_blank" : undefined}
                      rel={isHttpHref(link.href) ? "noopener noreferrer" : undefined}
                    >
                      <span className={SOCIAL_ICON_CLASS}>
                        {IconComponent ? (
                          <IconComponent className="text-muted-foreground size-6" />
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
                      <span>{link.label}</span>
                    </a>
                  ) : (
                    <Link href={link.href}>
                      <span className={SOCIAL_ICON_CLASS}>
                        {IconComponent ? (
                          <IconComponent className="text-muted-foreground size-6" />
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
                      <span>{link.label}</span>
                    </Link>
                  )}
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>About</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-foreground/90 space-y-3 text-lg leading-8">
            {profile.intro.map((paragraph, index) => (
              <p key={`${paragraph}-${index}`}>{paragraph}</p>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Stack</CardTitle>
        </CardHeader>
        <CardContent>
          <TooltipProvider>
            <div className="flex flex-wrap items-center gap-2">
              {stack.map((tech) => {
                const iconSources = getTechIconUrl(tech);

                return (
                  <Tooltip key={tech}>
                    <TooltipTrigger asChild>
                      <span aria-label={tech} className={TECHNOLOGY_ICON_CLASS}>
                        <TechIcon
                          alt={tech}
                          lightSrc={iconSources.light}
                          darkSrc={iconSources.dark}
                          fallbackSrc={iconSources.fallbackSrc}
                          width={24}
                          height={24}
                          className={TECHNOLOGY_IMAGE_CLASS}
                        />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p className="font-medium">{tech}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          </TooltipProvider>
        </CardContent>
      </Card>
    </section>
  );
}

