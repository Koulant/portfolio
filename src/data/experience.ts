export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location: string;
  employmentType?: string;
  technologies: string[];
  summary: string;
  highlights: string[];
  featured?: boolean;
};

export const experience: ExperienceItem[] = [
  {
    company: "Newton Crypto",
    role: "Junior Software Engineer",
    period: "Sep 2024 - Jan 2026",
    location: "Toronto, Ontario, Canada (Remote)",
    technologies: ["Python", "Django", "Go", "PostgreSQL", "AWS", "Pulumi", "Datadog"],
    employmentType: "Full-time",
    summary:
      "Built and maintained production fintech systems in a regulated environment, focusing on financial correctness and reliability.",
    highlights: [
      "Designed and shipped Python (Django), Go, and PostgreSQL services that supported high-throughput financial workflows.",
      "Implemented audit-ready data handling, balance tracking, and reconciliation patterns for critical transaction paths.",
      "Built monitoring and observability into production services to reduce incident response time and improve stability.",
      "Collaborated across product, finance, and engineering teams to deliver compliant, business-impacting features.",
      "Contributed to cloud infrastructure and releases using AWS and Pulumi.",
    ],
    featured: true,
  },
  {
    company: "Newton Crypto",
    role: "Software Engineer Intern",
    period: "May 2024 - Aug 2024",
    location: "Toronto, Ontario, Canada (Remote)",
    technologies: ["Python", "Django", "Go", "PostgreSQL", "REST APIs"],
    employmentType: "Full-time",
    summary:
      "Contributed to platform enhancements and service reliability work while ramping on production-grade backend systems.",
    highlights: [
      "Enhanced core staking and rewards systems to support additional assets and reliability improvements.",
      "Built and refined transaction-related features using Django, Go, and PostgreSQL with review and test discipline.",
      "Reduced operational risk by addressing production issues in a structured triage and patch flow.",
      "Supported team delivery by improving code quality and onboarding collaboration workflows.",
    ],
  },
  {
    company: "YMCA Calgary",
    role: "IT Help Desk Analyst",
    period: "May 2023 - Sep 2023",
    location: "Calgary, Alberta",
    technologies: [
      "Active Directory",
      "Windows Support",
      "Hardware Troubleshooting",
      "Network Support",
    ],
    employmentType: "Part-time",
    summary:
      "Provided desktop and account support across hundreds of users while improving day-to-day IT service quality.",
    highlights: [
      "Supported 1,100+ staff and volunteers with hands-on software, hardware, and network troubleshooting.",
      "Provisioned and managed access in Active Directory for secure onboarding and offboarding.",
      "Deployed and configured workplace hardware including printers, mobile devices, and workstations.",
      "Escalated effectively when needed and maintained strong service continuity during high-volume support periods.",
    ],
  },
];
