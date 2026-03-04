export type SocialLink = {
  href: string;
  label: string;
};

export type Profile = {
  name: string;
  role: string;
  location: string;
  available: boolean;
  intro: string[];
  socials: SocialLink[];
};

export const profile: Profile = {
  name: "Anton Koulikov",
  role: "Software Engineer",
  location: "Calgary, Alberta, Canada",
  available: true,
  intro: [
    "I am a software engineer with production experience building backend systems for fintech operations in regulated environments.",
    "My core stack includes Python (Django), Go, JavaScript, and PostgreSQL. I am now refreshing my frontend skills with modern React and Next.js.",
  ],
  socials: [
    { href: "https://github.com/Koulant", label: "GitHub" },
    { href: "https://www.linkedin.com/in/antonkoulikov/", label: "LinkedIn" },
    { href: "/resume.pdf", label: "Resume" },
    { href: "mailto:antonk1337@gmail.com", label: "Email" },
  ],
};
