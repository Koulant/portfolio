import { Clock3, FileText, Mail, MapPin } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { SimpleIcon } from "simple-icons";
import {
  siAuth0,
  siCelery,
  siDatadog,
  siDjango,
  siDocker,
  siFirebase,
  siGit,
  siGithub,
  siGo,
  siJavascript,
  siLinux,
  siNextdotjs,
  siPostgresql,
  siPulumi,
  siPython,
  siReact,
  siShadcnui,
  siTailwindcss,
  siTypescript,
} from "simple-icons";

import { CurrentTime } from "@/components/current_time";
import { RoleScroller } from "@/components/role_scroller";
import { TechIcon } from "@/components/tech_icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: {
    absolute: "About | Anton Koulikov",
  },
};

const SOCIAL_BUTTON_CLASS = "gap-2 px-3 h-11";
const SOCIAL_ICON_CLASS =
  "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md transition-colors";
const SOCIAL_ICON_CLASSNAME = "size-6 text-foreground/80 transition-colors";
const SOCIAL_BRAND_ICON_CLASSNAME = "size-6 text-foreground/80 transition-colors fill-current";
const SOCIAL_ICON_SIZE = 24;
const TECHNOLOGY_ICON_CLASS =
  "inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full transition-colors group";
const TECHNOLOGY_ICON_CLASSNAME =
  "h-8 w-8 text-foreground/80 transition-colors group-hover:text-foreground fill-current";
const TECHNOLOGY_IMAGE_CLASS = "h-8 w-8 object-contain";

type BrandIcon = Omit<SimpleIcon, "license" | "guidelines" | "svg"> & { viewBox?: string };
type SocialIconConfig = { type: "simple"; icon: BrandIcon } | { type: "svg"; node: ReactNode };

const LOCAL_SOCIAL_ICONS: Record<string, BrandIcon> = {
  linkedin: {
    title: "LinkedIn",
    slug: "linkedin",
    path: "M100.28 448H7.4V148.9h92.88V448zM53.79 108.1c-29.7 0-53.79-24.09-53.79-53.79S24.09 0.52 53.79 0.52 107.58 24.61 107.58 54.3 83.49 108.1 53.79 108.1zM447.9 448h-92.08V302.4c0-34.9-0.7-79.7-48.6-79.7-48.7 0-56.2 38.1-56.2 77.5V448h-92V148.9h88v40.9h1.3c12.3-23.3 42.3-47.9 87-47.9 93 0 110.1 61.3 110.1 141V448z",
    source: "https://simpleicons.org/",
    hex: "0A66C2",
    viewBox: "0 0 448 512",
  },
};

function asBrandIcon(icon: SimpleIcon): BrandIcon {
  return { ...icon, viewBox: "0 0 24 24" };
}
type TechIconConfig = {
  icon?: SimpleIcon;
  src?: string;
};

function getSocialIcon(label: string): SocialIconConfig {
  const normalized = label.toLowerCase();

  if (normalized.includes("github")) {
    return { type: "simple", icon: asBrandIcon(siGithub) };
  }

  if (normalized.includes("linkedin")) {
    return { type: "simple", icon: LOCAL_SOCIAL_ICONS.linkedin };
  }

  if (normalized.includes("email")) {
    return {
      type: "svg",
      node: <Mail className={SOCIAL_ICON_CLASSNAME} />,
    };
  }

  if (normalized.includes("resume")) {
    return {
      type: "svg",
      node: <FileText className={SOCIAL_ICON_CLASSNAME} />,
    };
  }

  return { type: "simple", icon: asBrandIcon(siGithub) };
}

function getTechIconUrl(tech: string): TechIconConfig {
  const normalized = tech.toLowerCase();

  if (normalized.includes("python")) {
    return {
      icon: siPython,
    };
  }

  if (normalized.includes("c#") || normalized.includes("csharp")) {
    return {
      src: "/icons/c_sharp.svg",
    };
  }

  if (normalized.includes("next.js") || normalized.includes("nextjs")) {
    return {
      icon: siNextdotjs,
    };
  }

  if (normalized.includes("react native")) {
    return {
      icon: siReact,
    };
  }

  if (normalized.includes("react")) {
    return {
      icon: siReact,
    };
  }

  if (normalized.includes("typescript")) {
    return {
      icon: siTypescript,
    };
  }

  if (normalized.includes("javascript")) {
    return {
      icon: siJavascript,
    };
  }

  if (normalized.includes("java")) {
    return {
      src: "/icons/java.svg",
    };
  }

  if (normalized.includes("django")) {
    return {
      icon: siDjango,
    };
  }

  if (normalized.includes("celery")) {
    return {
      icon: siCelery,
    };
  }

  if (normalized.includes("go")) {
    return {
      icon: siGo,
    };
  }

  if (normalized.includes("postgresql") || normalized.includes("postgres")) {
    return {
      icon: siPostgresql,
    };
  }

  if (normalized.includes("tailwind")) {
    return {
      icon: siTailwindcss,
    };
  }

  if (normalized.includes("shadcn")) {
    return {
      icon: siShadcnui,
    };
  }

  if (normalized.includes("docker")) {
    return {
      icon: siDocker,
    };
  }

  if (normalized.includes("aws") || normalized.includes("amazon web services")) {
    return {
      src: "/icons/aws.svg",
    };
  }

  if (normalized.includes("pulumi")) {
    return {
      icon: siPulumi,
    };
  }

  if (normalized.includes("datadog")) {
    return {
      icon: siDatadog,
    };
  }

  if (normalized.includes("git")) {
    return {
      icon: siGit,
    };
  }

  if (normalized.includes("linux")) {
    return {
      icon: siLinux,
    };
  }

  if (normalized.includes("firebase")) {
    return {
      icon: siFirebase,
    };
  }

  if (normalized.includes("firestore")) {
    return {
      icon: siFirebase,
    };
  }

  if (normalized.includes("auth0")) {
    return {
      icon: siAuth0,
    };
  }

  return {
    icon: undefined,
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
  const stackSections = (() => {
    const sourceSections = profile.techStackSections ?? [
      { title: "Stack", technologies: profile.techStack },
    ];

    return sourceSections.map((section) => {
      const grouped = new Map<string, { label: string; aliases: string[] }>();
      const merge = (key: string, label: string, original: string) => {
        const existing = grouped.get(key);
        if (existing) {
          if (!existing.aliases.includes(original)) {
            existing.aliases.push(original);
          }
          return;
        }
        grouped.set(key, { label, aliases: [original] });
      };

      for (const tech of section.technologies) {
        if (!tech) continue;
        const normalized = tech.toLowerCase();

        if (normalized.includes("react native")) {
          merge("react", "React", tech);
          continue;
        }
        if (normalized.includes("firestore")) {
          merge("firebase", "Firebase", tech);
          continue;
        }
        merge(normalized, tech, tech);
      }

      return {
        title: section.title,
        technologies: Array.from(grouped.values()),
      };
    });
  })();

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
                  <Badge variant="secondary">
                    <span className="inline-flex h-5 w-5 items-center justify-center">
                      <MapPin className="size-3.5" />
                    </span>
                    <span className="leading-none">{profile.location}</span>
                  </Badge>
                  <Badge variant="secondary">
                    <span className="inline-flex h-5 w-5 items-center justify-center">
                      <Clock3 className="size-3.5" />
                    </span>
                    <span className="leading-none">
                      <CurrentTime timezone={profile.timezone} />
                    </span>
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {orderedSocials.map((link) => {
              const socialIcon = getSocialIcon(link.label);
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
                        {socialIcon.type === "simple" ? (
                          <TechIcon
                            alt={link.label}
                            icon={socialIcon.icon}
                            width={SOCIAL_ICON_SIZE}
                            height={SOCIAL_ICON_SIZE}
                            className={SOCIAL_BRAND_ICON_CLASSNAME}
                            monochrome
                          />
                        ) : (
                          socialIcon.node
                        )}
                      </span>
                      <span>{link.label}</span>
                    </a>
                  ) : (
                    <Link href={link.href}>
                      <span className={SOCIAL_ICON_CLASS}>
                        {socialIcon.type === "simple" ? (
                          <TechIcon
                            alt={link.label}
                            icon={socialIcon.icon}
                            width={SOCIAL_ICON_SIZE}
                            height={SOCIAL_ICON_SIZE}
                            className={SOCIAL_BRAND_ICON_CLASSNAME}
                            monochrome
                          />
                        ) : (
                          socialIcon.node
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
            <div className="space-y-4">
              {stackSections.map((section, sectionIndex) => (
                <div key={section.title} className="space-y-2">
                  <h3 className="text-muted-foreground text-sm font-medium">{section.title}</h3>
                  <div className="flex flex-wrap items-center gap-2">
                    {section.technologies.map((tech) => {
                      const iconSources = getTechIconUrl(tech.label);
                      if (!iconSources.icon && !iconSources.src) {
                        return null;
                      }

                      const tooltipLabel =
                        tech.aliases.length > 1 ? tech.aliases.join(", ") : tech.label;

                      return (
                        <Tooltip key={tech.label}>
                          <TooltipTrigger asChild>
                            <span aria-label={tooltipLabel} className={TECHNOLOGY_ICON_CLASS}>
                              {iconSources.icon ? (
                                <TechIcon
                                  alt={tech.label}
                                  icon={iconSources.icon}
                                  width={24}
                                  height={24}
                                  className={TECHNOLOGY_ICON_CLASSNAME}
                                  monochrome
                                />
                              ) : (
                                <Image
                                  src={iconSources.src ?? ""}
                                  alt={tech.label}
                                  width={24}
                                  height={24}
                                  className={`${TECHNOLOGY_IMAGE_CLASS} brightness-0 grayscale dark:brightness-100 dark:invert`}
                                />
                              )}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent side="bottom">
                            <p className="font-medium">{tooltipLabel}</p>
                          </TooltipContent>
                        </Tooltip>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </TooltipProvider>
        </CardContent>
      </Card>
    </section>
  );
}
