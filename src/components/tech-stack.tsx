"use client";

import Image from "next/image";
import type { SimpleIcon } from "simple-icons";
import {
  siAuth0,
  siCelery,
  siDatadog,
  siDjango,
  siDocker,
  siFirebase,
  siGit,
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

import { TechIcon } from "@/components/tech-icon";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type TechIconConfig = {
  icon?: SimpleIcon;
  src?: string;
};

type Technology = {
  label: string;
  aliases: string[];
};

type StackSection = {
  title: string;
  technologies: Technology[];
};

const TECHNOLOGY_ICON_CLASS =
  "inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full opacity-80 transition-opacity hover:opacity-100";
const TECHNOLOGY_ICON_CLASSNAME = "h-8 w-8 fill-current";
const TECHNOLOGY_IMAGE_CLASS = "h-8 w-8 object-contain";

function getTechIconUrl(tech: string): TechIconConfig {
  const normalized = tech.toLowerCase();

  if (normalized.includes("python")) return { icon: siPython };
  if (normalized.includes("c#") || normalized.includes("csharp"))
    return { src: "/icons/c_sharp.svg" };
  if (normalized.includes("next.js") || normalized.includes("nextjs")) return { icon: siNextdotjs };
  if (normalized.includes("react native")) return { icon: siReact };
  if (normalized.includes("react")) return { icon: siReact };
  if (normalized.includes("typescript")) return { icon: siTypescript };
  if (normalized.includes("javascript")) return { icon: siJavascript };
  if (normalized.includes("java")) return { src: "/icons/java.svg" };
  if (normalized.includes("django")) return { icon: siDjango };
  if (normalized.includes("celery")) return { icon: siCelery };
  if (normalized.includes("go")) return { icon: siGo };
  if (normalized.includes("postgresql") || normalized.includes("postgres"))
    return { icon: siPostgresql };
  if (normalized.includes("tailwind")) return { icon: siTailwindcss };
  if (normalized.includes("shadcn")) return { icon: siShadcnui };
  if (normalized.includes("docker")) return { icon: siDocker };
  if (normalized.includes("aws") || normalized.includes("amazon web services"))
    return { src: "/icons/aws.svg" };
  if (normalized.includes("pulumi")) return { icon: siPulumi };
  if (normalized.includes("datadog")) return { icon: siDatadog };
  if (normalized.includes("git")) return { icon: siGit };
  if (normalized.includes("linux")) return { icon: siLinux };
  if (normalized.includes("firebase")) return { icon: siFirebase };
  if (normalized.includes("firestore")) return { icon: siFirebase };
  if (normalized.includes("auth0")) return { icon: siAuth0 };

  return { icon: undefined };
}

export function TechStack({ sections }: { sections: StackSection[] }) {
  return (
    <TooltipProvider delayDuration={150}>
      <div className="space-y-4">
        {sections.map((section) => (
          <div key={section.title} className="space-y-2">
            <h3 className="text-muted-foreground text-sm font-medium">{section.title}</h3>
            <div className="flex flex-wrap items-center gap-2">
              {section.technologies.map((tech) => {
                const iconSources = getTechIconUrl(tech.label);
                if (!iconSources.icon && !iconSources.src) return null;

                const tooltipLabel = tech.aliases.length > 1 ? tech.aliases.join(", ") : tech.label;

                return (
                  <Tooltip key={tech.label}>
                    <TooltipTrigger asChild>
                      <span aria-label={tooltipLabel} className={TECHNOLOGY_ICON_CLASS}>
                        {iconSources.icon ? (
                          <TechIcon
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
  );
}
