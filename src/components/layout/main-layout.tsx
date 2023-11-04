import React from "react";
import { Button } from "@/components/ui/button";
import { marketingConfig } from "@/config/marketing";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { MainNav } from "@/components/main-nav";
import { SiteFooter } from "@/components/site-footer";

import { useRouter } from "next/router";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useAuth,
} from "@clerk/nextjs";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const router = useRouter();
  const [color, setcolor] = useState(false);

  const changeNavBg = () => {
    window.scrollY >= 90 ? setcolor(true) : setcolor(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNavBg);

    return () => {
      window.removeEventListener("scroll", changeNavBg);
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <header
        style={color ? { backgroundColor: "rgba(0,0,0,0.4)" } : {}}
        className="fixed left-0 top-0 z-10 w-full backdrop-blur duration-300  ease-in"
      >
        <div className="m-auto flex  h-20 items-center justify-between p-5 py-6">
          <MainNav items={marketingConfig.mainNav} />

          <nav>
            <SignedIn>
              <UserButton afterSignOutUrl="/login" />
            </SignedIn>

            <SignedOut>
              <SignInButton>
                <Button
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "sm" }),
                  )}
                >
                  Sign In
                </Button>
              </SignInButton>

              <SignUpButton>
                <Button
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "sm" }),
                    "ml-4",
                  )}
                >
                  Sign Up
                </Button>
              </SignUpButton>
            </SignedOut>
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <SiteFooter />
    </div>
  );
};

export default MainLayout;
