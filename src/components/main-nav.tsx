import * as React from "react";
import type { MainNavItem } from "~/types";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { MobileNav } from "@/components/mobile-nav";
import Link from "next/link";
import { useRouter } from "next/router";

interface MainNavProps {
  items?: MainNavItem[];
  children?: React.ReactNode;
}

export function MainNav({ items, children }: MainNavProps) {
  // const segment = useSelectedLayoutSegment();
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);
  const router = useRouter();

  return (
    <div className="light flex gap-6 md:gap-10">
      <Link
        href="/"
        className={cn(
          "hidden items-center space-x-2 hover:text-foreground/80 md:flex",
          router.pathname === "/" ? "text-white hover:text-muted/80" : "",
        )}
      >
        <Icons.logo />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={
                // () =>
                cn(
                  "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                  // isActive ? "text-foreground" : "text-foreground/60",
                  // item.disabled && "cursor-not-allowed opacity-80"
                  router.pathname === "/"
                    ? "text-white hover:text-muted/80"
                    : "",
                )
              }
            >
              {item.title}
            </Link>
          ))}
        </nav>
      ) : null}
      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? <Icons.close /> : <Icons.logo />}
        <span className="font-bold">Menu</span>
      </button>
      {showMobileMenu && items && (
        <MobileNav items={items}>{children}</MobileNav>
      )}
    </div>
  );
}
