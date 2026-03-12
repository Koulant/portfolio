import type { Metadata } from "next";

import {
  SectionBody,
  SectionHeader,
  SectionItemCard,
  SectionLeadPanel,
} from "@/components/page-section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { CardTitle } from "@/components/ui/card";
import { experience, type ExperienceItem } from "@/data/experience";

export const metadata: Metadata = {
  title: "Career",
};

type CompanyTimeline = {
  company: string;
  roles: { role: ExperienceItem; originalIndex: number }[];
};

type ParsedDate = {
  year: number;
  monthIndex: number;
};

const MONTH_INDEX: Record<string, number> = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};

function parsePeriodStart(period: string): ParsedDate | null {
  const normalizedPeriod = period.replace(/\s*-\s*/g, " - ").trim();
  const start = normalizedPeriod.split(" - ")[0]?.trim();
  if (!start) return null;

  const splitParts = start.split(" ").filter(Boolean);
  if (splitParts.length === 1) {
    const yearOnly = Number.parseInt(splitParts[0], 10);
    if (!Number.isFinite(yearOnly)) return null;

    return { year: yearOnly, monthIndex: 0 };
  }

  const [monthRaw, yearRaw] = splitParts;
  if (!monthRaw || !yearRaw) return null;

  const month = monthRaw.charAt(0).toUpperCase() + monthRaw.slice(1).toLowerCase();

  const monthIndex = MONTH_INDEX[month as keyof typeof MONTH_INDEX];
  const parsedYear = Number.parseInt(yearRaw, 10);

  if (!Number.isFinite(parsedYear) || monthIndex === undefined) return null;

  return { year: parsedYear, monthIndex };
}

function startsAfter(a: ParsedDate, b: ParsedDate): boolean {
  if (a.year !== b.year) return a.year > b.year;
  return a.monthIndex > b.monthIndex;
}

function isMostRecentPeriod(indexA: number, indexB: number): boolean {
  const parsedA = parsePeriodStart(experience[indexA]?.period ?? "");
  const parsedB = parsePeriodStart(experience[indexB]?.period ?? "");

  if (!parsedA) return false;
  if (!parsedB) return true;

  return startsAfter(parsedA, parsedB);
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
        description="Product focused software engineering experience across fintech, backend systems, and operational reliability."
      />

      {companies.map((companyData, companyIndex) => {
        const defaultOpenRoleIndex = companyData.roles.findIndex(
          (roleWithIndex) => roleWithIndex.originalIndex === mostRecentRoleIndex
        );
        const defaultValue =
          defaultOpenRoleIndex >= 0 ? `company-${companyIndex}-${defaultOpenRoleIndex}` : undefined;

        return (
          <SectionItemCard key={`${companyData.company}-${companyIndex}`}>
            <SectionHeader>
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
                    className="relative flex min-h-12 items-stretch pl-5"
                  >
                    <span className="bg-background border-border absolute top-2 left-0 h-3 w-3 rounded-full border" />
                    {roleIndex < companyData.roles.length - 1 ? (
                      <span className="bg-border absolute top-5 left-[5px] h-full w-px" />
                    ) : null}
                    <AccordionItem
                      value={`company-${companyIndex}-${roleIndex}`}
                      className="w-full border-none"
                    >
                      <AccordionTrigger className="group w-full justify-start gap-3 px-0 py-0 hover:no-underline">
                        <div className="w-full space-y-2 text-left">
                          <div>
                            <CardTitle className="text-lg leading-tight">
                              {role.role.role}
                            </CardTitle>
                            <p className="text-muted-foreground mt-0.5 text-sm">
                              {role.role.period}
                              {role.role.location ? ` ${"\u2022"} ${role.role.location}` : ""}
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {role.role.technologies.map((technology) => (
                              <Badge key={technology} variant="outline">
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
