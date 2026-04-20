import type { Metadata } from "next";

import {
  SectionBody,
  SectionHeader,
  SectionItemCard,
  SectionLeadPanel,
} from "@/components/page-section";
import { TimelineMarker } from "@/components/timeline-marker";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { CardTitle } from "@/components/ui/card";
import { experience, type ExperienceItem } from "@/data/experience";
import { isAfter, parsePeriodStart } from "@/lib/date";

export const metadata: Metadata = {
  title: {
    absolute: "Career | Anton Koulikov",
  },
  openGraph: {
    title: "Career | Anton Koulikov",
    description: "Professional experience and career history of Anton Koulikov, software engineer.",
    url: "https://koulant.com/career",
  },
};

type CompanyTimeline = {
  company: string;
  roles: { role: ExperienceItem; originalIndex: number }[];
};

function isMostRecentPeriod(indexA: number, indexB: number): boolean {
  const parsedA = parsePeriodStart(experience[indexA]?.period ?? "");
  const parsedB = parsePeriodStart(experience[indexB]?.period ?? "");

  if (!parsedA) return false;
  if (!parsedB) return true;

  return isAfter(parsedA, parsedB);
}

export default function CareerPage() {
  const mostRecentRoleIndex = experience.reduce(
    (mostRecent, _, currentIndex) =>
      isMostRecentPeriod(currentIndex, mostRecent) ? currentIndex : mostRecent,
    0
  );

  const companies = experience.reduce<CompanyTimeline[]>((acc, currentRole, index) => {
    const existingCompany = acc.find((entry) => entry.company === currentRole.company);

    if (existingCompany) {
      existingCompany.roles.push({ role: currentRole, originalIndex: index });
      return acc;
    }

    acc.push({
      company: currentRole.company,
      roles: [{ role: currentRole, originalIndex: index }],
    });
    return acc;
  }, []);

  return (
    <section className="space-y-6 text-left">
      <SectionLeadPanel
        title="Career"
        description="Experience building reliable backend systems and fintech infrastructure."
      />

      {companies.map((companyData, companyIndex) => {
        const defaultOpenRoleIndex = companyData.roles.findIndex(
          (roleWithIndex) => roleWithIndex.originalIndex === mostRecentRoleIndex
        );
        const defaultValue =
          defaultOpenRoleIndex >= 0 ? `company-${companyIndex}-${defaultOpenRoleIndex}` : undefined;
        const companyWorkMode =
          companyData.roles.find((roleWithIndex) => roleWithIndex.role.workMode)?.role.workMode ??
          null;

        return (
          <SectionItemCard key={`${companyData.company}-${companyIndex}`}>
            <SectionHeader>
              <div className="flex items-start justify-between gap-2">
                <CardTitle>
                  {companyData.roles.length > 0 && companyData.roles[0].role.companyUrl ? (
                    <a
                      href={companyData.roles[0].role.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {companyData.company}
                    </a>
                  ) : (
                    companyData.company
                  )}
                </CardTitle>
                {companyWorkMode ? <Badge>{companyWorkMode}</Badge> : null}
              </div>
            </SectionHeader>

            <SectionBody>
              <Accordion
                type="multiple"
                defaultValue={defaultValue ? [defaultValue] : undefined}
                className="space-y-4"
              >
                {companyData.roles.map((role, roleIndex) => (
                  <div
                    key={`${role.role.company}-${role.role.role}-${role.role.period}-${role.originalIndex}`}
                    className="flex items-stretch gap-4"
                  >
                    <TimelineMarker isLast={roleIndex >= companyData.roles.length - 1} />
                    <AccordionItem
                      value={`company-${companyIndex}-${roleIndex}`}
                      className="w-full border-none"
                    >
                      <AccordionTrigger className="group w-full justify-start gap-3 px-0 py-0 hover:no-underline">
                        <div className="w-full space-y-2 text-left">
                          <div className="flex flex-col gap-2">
                            <div className="flex items-start justify-between gap-2">
                              <CardTitle className="text-lg leading-tight">
                                {role.role.role}
                              </CardTitle>
                            </div>
                            <p className="text-muted-foreground mt-0.5 text-sm">
                              {role.role.period}
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {role.role.technologies.map((technology) => (
                              <Badge key={technology} variant="secondary">
                                {technology}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="pt-2">
                          <p className="text-foreground/90 text-sm leading-7">
                            {role.role.summary}
                          </p>
                          <ul className="text-foreground/90 mt-4 list-disc space-y-2 pl-5 text-sm">
                            {role.role.highlights.map((highlight) => (
                              <li key={highlight}>{highlight}</li>
                            ))}
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </div>
                ))}
              </Accordion>
            </SectionBody>
          </SectionItemCard>
        );
      })}
    </section>
  );
}
