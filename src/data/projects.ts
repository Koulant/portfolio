export type ProjectItem = {
  title: string;
  period?: string;
  teamType?: "Solo" | "Team";
  type?: string;
  compact?: boolean;
  description: string;
  summary: string;
  stack: string[];
  details: string[];
  highlights: string[];
  role?: string;
  engineeringChallenge?: string;
  images?: {
    src: string;
    alt: string;
  }[];
  repoUrl: string;
  liveUrl?: string;
  demoVideoUrl?: string;
};

export const projects: ProjectItem[] = [
  {
    title: "Portfolio Website",
    period: "2026 - ∞",
    compact: true,
    teamType: "Solo",
    type: "Full-stack portfolio platform",
    summary:
      "A developer portfolio built with Next.js, React, and TypeScript to present engineering experience and projects in a clean, structured format.",
    description:
      "This site was designed to highlight backend systems work while remaining fast, readable, and easy to scan.",
    details: [
      "Built with Next.js App Router and reusable React components for a maintainable architecture.",
      "Implemented responsive layouts and accessible UI using Tailwind and shadcn/ui.",
      "Designed a clear content hierarchy to present experience, projects, and technical stack.",
      "Added TypeScript, linting, and formatting checks to keep the codebase consistent and reliable.",
    ],
    highlights: [],
    images: [],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    repoUrl: "https://github.com/Koulant/portfolio",
  },
  {
    title: "Crypto Paper Trading Platform",
    period: "2023 - 2024",
    teamType: "Team",
    type: "Team product build",
    summary:
      "A full stack cryptocurrency paper trading platform where users can simulate trades, track portfolio performance, and explore market data.",
    description:
      "Built as a university capstone project with a small team and an external stakeholder.",
    role: "Worked across the stack including backend services, frontend features, authentication, and database design.",
    stack: ["React", "Next.js", "Go", "PostgreSQL", "Auth0"],
    details: [
      "Implemented backend services in Go with PostgreSQL to manage trades, balances, and portfolio state.",
      "Integrated external APIs to fetch live market pricing for more than 50 assets.",
      "Implemented authentication and user account flows using Auth0.",
      "Developed frontend components and trading workflows including portfolio creation, trade execution, and transaction history.",
      "Collaborated with teammates to deliver a complete paper trading platform for cryptocurrency.",
    ],
    engineeringChallenge:
      "Simulating a trading platform required keeping portfolio balances consistent while prices updated in real time. The backend API computes portfolio value dynamically from stored trades combined with live market pricing.",
    highlights: [],
    demoVideoUrl: "https://youtu.be/-x5gJhCSRYw?si=ImNBsNUMxvEj9EtW&t=684",
    images: [],
    repoUrl: "https://github.com/Koulant",
  },
];
