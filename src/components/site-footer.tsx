import { navLinks } from "@/config/navigation";

import { SiteLinks } from "./site-links";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border border-t">
      <div className="mx-auto flex w-full max-w-4xl flex-wrap items-center justify-between gap-4 px-4 py-6 text-sm sm:px-6">
        <p className="text-muted-foreground">&copy; {year} Anton Koulikov. All rights reserved.</p>
        <SiteLinks links={navLinks} variant="footer" />
      </div>
    </footer>
  );
}
