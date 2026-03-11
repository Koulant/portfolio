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
};

export const profile: Profile = {
  name: "Anton Koulikov",
  role: "Software Engineer",
  roles: ["Software Engineer", "Building Reliable Systems", "Shipping Full-Stack Solutions"],
  location: "Calgary, Alberta, Canada",
  timezone: "America/Edmonton",
  portraitUrl: "/portrait.jpg",
  intro: [
    "Software Engineer and full-stack builder with a focus on reliable fintech systems and measurable business impact. Based in Calgary, Alberta.",
    "I care about turning complex operational problems into practical software that is accurate, auditable, and dependable.",
    "Currently sharpening my frontend skills with React and Next.js to build cleaner end-to-end product experiences.",
  ],
  techStack: [
    "Python",
    "Django",
    "Go",
    "PostgreSQL",
    "Next.js",
    "TypeScript",
    "React",
    "JavaScript",
    "Tailwind CSS",
    "AWS",
    "Docker",
    "shadcn/ui",
  ],
  socials: [
    { href: "https://github.com/Koulant", label: "GitHub" },
    { href: "https://www.linkedin.com/in/antonkoulikov/", label: "LinkedIn" },
    { href: "mailto:antonk1337@gmail.com", label: "Email" },
    { href: "/resume.pdf", label: "Resume" },
  ],
};
