export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  summary: string;
  highlights: string[];
};

export const experience: ExperienceItem[] = [
  {
    company: "Newton.co",
    role: "Software Engineer L1",
    period: "Sep 2024 - Jan 2026",
    summary:
      "Built and maintained production backend systems for fintech operations in a regulated environment.",
    highlights: [
      "Developed high-throughput services using Python (Django), Go, and PostgreSQL.",
      "Improved reliability and audit readiness across business-critical transaction systems.",
      "Diagnosed and resolved production issues to improve operational stability.",
      "Collaborated with product, finance, and engineering teams on compliance-sensitive features.",
    ],
  },
  {
    company: "Newton.co",
    role: "Software Engineer Intern",
    period: "May 2024 - Aug 2024",
    summary:
      "Supported backend feature delivery and service reliability improvements in fintech workflows.",
    highlights: [
      "Contributed to backend services using Python (Django), Go, and PostgreSQL.",
      "Implemented tested improvements to internal systems and development workflows.",
      "Worked closely with senior engineers to ship production-ready changes.",
    ],
  },
];
