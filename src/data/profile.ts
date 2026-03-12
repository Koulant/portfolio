export type SocialLink = {
  href: string;
  label: string;
};

export type Profile = {
  name: string;
  role: string;
  roles: string[];
  location: string;
  timezone: string;
  portraitUrl: string;
  intro: string[];
  socials: SocialLink[];
  techStack: string[];
  techStackSections?: { title: string; technologies: string[] }[];
};

export const profile: Profile = {
  name: "Anton Koulikov",
  role: "Software Engineer",
  roles: [
    "Systems that stay correct",
    "Code you can trust",
    "Backend systems done right",
    "Software that keeps data honest",
    "Building software that actually ships",
    "Reliable systems, clean software",
  ],
  location: "Calgary, Alberta, Canada",
  timezone: "America/Edmonton",
  portraitUrl: "/portrait.jpg",
  intro: [
    "Software engineer focused on building reliable backend systems and practical full stack software.",
    "Previously at Newton Crypto, where I helped build production fintech infrastructure supporting high volume transactions, financial reconciliation, and audit ready financial data.",
    "My core stack includes Python with Django, Go, and PostgreSQL. I enjoy working close to the data layer and designing systems that keep complex state accurate and dependable.",
    "More recently I have been expanding my frontend skills with React and Next.js to build complete end to end product experiences.",
  ],
  techStack: [
    "Python",
    "Django",
    "Celery",
    "Go",
    "PostgreSQL",
    "Next.js",
    "TypeScript",
    "React",
    "React Native",
    "JavaScript",
    "C#",
    "Java",
    "Tailwind CSS",
    "AWS",
    "Pulumi",
    "Datadog",
    "Git",
    "Linux",
    "Firebase",
    "Firestore",
    "Auth0",
    "Docker",
    "shadcn/ui",
  ],
  techStackSections: [
    {
      title: "Backend",
      technologies: ["Python", "Django", "Go", "PostgreSQL", "Java", "C#", "Firebase / Firestore"],
    },
    {
      title: "Frontend",
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "JavaScript"],
    },
    {
      title: "Infrastructure / Tools",
      technologies: ["AWS", "Docker", "Pulumi", "Datadog", "Linux", "Git"],
    },
  ],
  socials: [
    { href: "https://github.com/Koulant", label: "GitHub" },
    { href: "https://www.linkedin.com/in/antonkoulikov/", label: "LinkedIn" },
    { href: "mailto:antonk1337@gmail.com", label: "Email" },
    { href: "/resume.pdf", label: "Resume" },
  ],
};
