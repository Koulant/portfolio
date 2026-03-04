export type ContactMethod = {
  label: string;
  value: string;
  href: string;
};

export const contactMethods: ContactMethod[] = [
  {
    label: "Email",
    value: "antonk1337@gmail.com",
    href: "mailto:antonk1337@gmail.com",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/antonkoulikov",
    href: "https://www.linkedin.com/in/antonkoulikov/",
  },
  {
    label: "GitHub",
    value: "github.com/Koulant",
    href: "https://github.com/Koulant",
  },
];
