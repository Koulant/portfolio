export type ExperienceItem = {
  company: string;
  companyUrl?: string;
  role: string;
  period: string;
  location: string;
  workMode?: "Remote" | "Hybrid" | "On-site";
  employmentType?: string;
  technologies: string[];
  summary: string;
  highlights: string[];
  featured?: boolean;
};

export const experience: ExperienceItem[] = [
  {
    company: "Newton Crypto",
    companyUrl: "https://www.newton.co",
    role: "Junior Software Engineer",
    period: "Sep 2024 - Jan 2026",
    location: "Toronto, Ontario",
    workMode: "Remote",
    technologies: ["Python", "Django", "Go", "PostgreSQL", "AWS", "Pulumi", "Datadog"],
    employmentType: "Full-time",
    summary:
      "Built and maintained backend systems for a production cryptocurrency exchange operating in a regulated environment. Work focused on financial correctness, reliability, and operational efficiency.",
    highlights: [
      "These systems supported core trading and financial operations where correctness and auditability were critical.",
      "Designed and shipped backend services in Python and Go backed by PostgreSQL to support high throughput financial workflows.",
      "Helped build auditable financial infrastructure with balance tracking, reconciliation, and strong data integrity guarantees.",
      "Improved production reliability through monitoring, alerting, and structured debugging workflows.",
      "Worked closely with product, finance, and engineering teams to deliver compliant features in a financially sensitive system.",
      "Contributed to cloud infrastructure and deployment workflows using AWS and Pulumi.",
    ],
    featured: true,
  },
  {
    company: "Newton Crypto",
    companyUrl: "https://www.newton.co",
    role: "Software Engineer Intern",
    period: "May 2024 - Aug 2024",
    location: "Toronto, Ontario",
    workMode: "Remote",
    technologies: ["Python", "Django", "Go", "PostgreSQL", "REST APIs"],
    employmentType: "Full-time",
    summary:
      "Contributed to backend platform improvements and reliability work while learning production grade financial systems.",
    highlights: [
      "Built backend features using Django and PostgreSQL with careful attention to correctness and testing.",
      "Investigated and resolved production issues affecting reliability and user experience.",
      "Collaborated with senior engineers through code reviews, debugging, and design discussions.",
    ],
  },
  {
    company: "YMCA Calgary",
    companyUrl: "https://www.ymcacalgary.org/",
    role: "IT Help Desk Analyst",
    period: "May 2023 - Sep 2023",
    location: "Calgary, Alberta",
    workMode: "On-site",
    technologies: [
      "Active Directory",
      "Windows Support",
      "Hardware Troubleshooting",
      "Network Support",
    ],
    employmentType: "Part-time",
    summary:
      "Provided technical support across a large community organization, helping staff and volunteers resolve hardware, software, and access issues quickly and reliably.",
    highlights: [
      "Supported more than 1,100 staff and volunteers with day to day technical troubleshooting.",
      "Managed user onboarding and access changes through Active Directory.",
      "Assisted with hardware rollouts, workstation setup, and device support across multiple locations.",
      "Developed strong troubleshooting and systems thinking skills through hands on IT support work.",
    ],
  },
];
