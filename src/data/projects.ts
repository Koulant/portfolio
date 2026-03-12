export type ProjectItem = {
  title: string;
  company?: string;
  period?: string;
  status?: string;
  type?: string;
  compact?: boolean;
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
    compact: true,
    status: "In production",
    type: "Full-stack portfolio platform",
    summary: "A recruiter focused portfolio built with Next.js, React, TypeScript, and Tailwind.",
    description:
      "This site was built to present my experience and projects in a clear and structured way. The focus was on clean design, strong readability, and a layout that lets visitors quickly understand the type of systems I enjoy building.",
    details: [
      "A reusable component structure built with modern React patterns.",
      "Responsive layouts and accessible UI elements.",
      "A clear content hierarchy designed for technical storytelling.",
      "A production deployment workflow with maintainable project structure.",
    ],
    highlights: [
      "Designed and built a recruiter-facing portfolio to communicate engineering experience with structure and readability.",
      "Implemented a maintainable content model with reusable page sections, shared components, and scalable styling patterns.",
      "Strengthened frontend quality and reliability through TypeScript, linting, and formatting checks integrated into CI.",
    ],
    images: [],
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
      "A full stack paper trading platform for simulated cryptocurrency trading and portfolio tracking.",
    description:
      "This capstone project was built with a small team and an external stakeholder. The platform allows users to simulate buying and selling cryptocurrency, track portfolio performance, and view historical transactions using real time market data.",
    stack: ["React", "Next.js", "Go", "PostgreSQL", "Auth0"],
    details: [
      "Implemented multi page workflows for portfolio creation, trade execution, and transaction history.",
      "Built API driven integrations to fetch live market pricing.",
      "Developed backend services in Go with PostgreSQL to track trades and holdings.",
      "Implemented authentication and account flows using Auth0.",
      "Designed the system to make trading simulation simple and educational for users.",
    ],
    highlights: [
      "Built a scalable end-to-end flow for simulated trading with clear product UX and technical boundaries.",
      "Integrated live data and transaction workflows to keep portfolio state and market context synchronized.",
    ],
    images: [
      { src: "/file.svg", alt: "Capstone project screenshot placeholder" },
      { src: "/vercel.svg", alt: "Capstone project screenshot placeholder" },
    ],
    repoUrl: "https://github.com/Koulant",
  },
];
