"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { navLinks } from "@/config/navigation";
import { cn } from "@/lib/utils";

import { ThemeToggle } from "./theme_toggle";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="border-border bg-background/95 sticky top-0 z-50 border-b backdrop-blur">
      <nav className="mx-auto flex w-full max-w-4xl items-center justify-between px-4 py-4 sm:px-6">
        <NavigationMenu>
          <NavigationMenuList className="gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={link.href}
                      className={cn(
                        "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      {link.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>
        <ThemeToggle />
      </nav>
    </header>
  );
}
