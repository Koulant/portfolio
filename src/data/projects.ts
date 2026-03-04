export type ProjectItem = {
  title: string;
  description: string;
  stack: string[];
  impact: string;
  repoUrl: string;
  liveUrl?: string;
};

export const projects: ProjectItem[] = [
  {
    title: "Portfolio (This Site)",
    description: "A recruiter-focused portfolio built with Next.js App Router and shadcn/ui.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    impact: "Clean personal brand site with fast iteration and strong quality gates.",
    repoUrl: "https://github.com/Koulant/portfolio",
  },
  {
    title: "Project Placeholder",
    description: "Replace with your next project and measurable outcomes.",
    stack: ["React", "TypeScript"],
    impact: "Example: improved completion rate by 15% across target workflow.",
    repoUrl: "https://github.com/Koulant",
  },
];
