"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navLinks } from "@/config/navigation";
import { cn } from "@/lib/utils";

import { ThemeToggle } from "./theme_toggle";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="border-border border-b">
      <nav className="mx-auto flex w-full max-w-4xl items-center gap-2 px-4 py-4 sm:px-6">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "hover:bg-muted hover:text-foreground rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive ? "bg-muted text-foreground" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          );
        })}
        <ThemeToggle />
      </nav>
    </header>
  );
}
