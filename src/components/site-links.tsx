import Link from "next/link";

import {
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import type { NavLink } from "@/config/navigation";
import { cn } from "@/lib/utils";

type SiteLinksProps = {
  links: NavLink[];
  activePath?: string;
  variant: "header" | "footer";
};

export function SiteLinks({ links, activePath, variant }: SiteLinksProps) {
  const isHeader = variant === "header";

  if (isHeader) {
    return (
      <NavigationMenuList className="gap-1">
        {links.map((link) => {
          const isActive = activePath === link.href;

          return (
            <NavigationMenuItem key={link.href}>
              <NavigationMenuLink asChild>
                <Link
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "text-foreground dark:text-foreground bg-zinc-100 font-semibold dark:bg-zinc-800/70"
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
    );
  }

  return (
    <div className="flex items-center gap-4">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
