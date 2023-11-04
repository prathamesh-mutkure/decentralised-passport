import "@/styles/globals.css";
import { type AppType } from "next/app";
import { Toaster } from "~/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";

import { api } from "~/utils/api";

import { Inter as FontSans } from "next/font/google";
import localFont from "next/font/local";

import { ThemeProvider } from "next-themes";
import { cn } from "~/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontHeading = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <ClerkProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main className={cn(fontHeading.variable, fontSans.variable)}>
            <Component {...pageProps} />
          </main>

          <Toaster />
        </ThemeProvider>
      </ClerkProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
