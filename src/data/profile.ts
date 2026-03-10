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
  available: boolean;
  intro: string[];
  socials: SocialLink[];
  techStack: string[];
};

export const profile: Profile = {
  name: "Anton Koulikov",
  role: "Software Engineer",
  roles: ["Software Engineer", "Backend Engineer", "Full-Stack Builder", "System Designer"],
  location: "Calgary, Alberta, Canada",
  timezone: "America/Edmonton",
  portraitUrl: "/portrait.jpg",
  available: true,
  intro: [
    "I am a software engineer with production experience building backend systems for fintech operations in regulated environments.",
    "My core stack includes Python (Django), Go, JavaScript, and PostgreSQL. I am now refreshing my frontend skills with modern React and Next.js.",
  ],
  techStack: [
    "Next.js",
    "React",
    "TypeScript",
    "JavaScript",
    "Python",
    "Django",
    "Go",
    "PostgreSQL",
    "Tailwind CSS",
    "shadcn/ui",
  ],
  socials: [
    { href: "https://github.com/Koulant", label: "GitHub" },
    { href: "https://www.linkedin.com/in/antonkoulikov/", label: "LinkedIn" },
    { href: "mailto:antonk1337@gmail.com", label: "Email" },
    { href: "/resume.pdf", label: "Resume" },
  ],
};
