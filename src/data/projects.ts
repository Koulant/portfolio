export type ProjectItem = {
  title: string;
  company?: string;
  period?: string;
  status?: string;
  type?: string;
  description: string;
  summary: string;
  stack: string[];
  details: string[];
  highlights: string[];
  images?: {
    src: string;
    alt: string;
  }[];
  repoUrl: string;
  liveUrl?: string;
};

export const projects: ProjectItem[] = [
  {
    title: "Portfolio Website",
    company: "Personal Project",
    period: "2026",
    status: "In production",
    type: "Full-stack portfolio platform",
    summary:
      "Built a recruiter-focused portfolio with Next.js App Router, shadcn/ui, quality gates, and deployment workflows.",
    description:
      "Built this portfolio to combine engineering precision with a clean presentation for recruiters.",
    details: [
      "Set up ESLint, Prettier, and import sorting with strict TypeScript checks.",
      "Implemented CI checks and protected deployment workflow for production stability.",
      "Created reusable shared components for consistent sections across pages and states.",
    ],
    highlights: [
      "Clean componentized structure aligned with modern Next.js practices.",
      "Dark mode and responsive layouts with clear accessibility-friendly interactions.",
    ],
    images: [
      { src: "/next.svg", alt: "Portfolio landing screenshot placeholder (Next.js)" },
      { src: "/globe.svg", alt: "Portfolio theme preview placeholder" },
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    repoUrl: "https://github.com/Koulant/portfolio",
  },
  {
    title: "Capstone Paper Trading Platform",
    company: "University Capstone",
    period: "2023 - 2024",
    status: "Completed",
    type: "Team product build",
    summary:
      "Paper trading platform for simulated crypto portfolio management with authentication and live pricing integration.",
    description:
      "Collaborated with stakeholders to deliver a role-based trading simulation web app with tracking dashboards and education value.",
    stack: ["React", "Next.js", "Go", "PostgreSQL", "Auth0"],
    details: [
      "Implemented multi-page workflows for portfolio creation, trade execution, and transaction history.",
      "Built API-first architecture to fetch live market feeds for market data views.",
      "Handled user onboarding and account flows across team-authored feature boundaries.",
    ],
    highlights: [
      "Enabled safe user experimentation with realistic crypto trade flows.",
      "Improved visibility into portfolio performance across user holdings and time windows.",
    ],
    images: [
      { src: "/file.svg", alt: "Capstone project screenshot placeholder" },
      { src: "/vercel.svg", alt: "Capstone project screenshot placeholder" },
    ],
    repoUrl: "https://github.com/Koulant",
  },
];
