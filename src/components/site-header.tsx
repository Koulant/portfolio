"use client";

import { usePathname } from "next/navigation";

import { NavigationMenu } from "@/components/ui/navigation-menu";
import { navLinks } from "@/config/navigation";

import { SiteLinks } from "./site-links";
import { ThemeToggle } from "./theme_toggle";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="border-border bg-background/95 sticky top-0 z-50 border-b backdrop-blur">
      <nav className="mx-auto flex w-full max-w-4xl items-center justify-between px-4 py-4 sm:px-6">
        <NavigationMenu>
          <SiteLinks links={navLinks} activePath={pathname} variant="header" />
        </NavigationMenu>
        <ThemeToggle />
      </nav>
    </header>
  );
}
