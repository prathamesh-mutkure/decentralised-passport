import Head from "next/head";
import Link from "next/link";

import RotatingText from "~/components/landing/rotating-text";
import MainLayout from "~/components/layout/main-layout";
import { Button } from "~/components/ui/button";
import { siteConfig } from "~/config/site";

export default function Home() {
  return (
    <>
      <Head>
        <title>dPass: Decentralized Passport</title>
        <meta
          name="description"
          content="An Decentralised Passport powered by Polygon"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainLayout>
        <section className="relative overflow-hidden bg-[radial-gradient(39.13%_66.21%_at_69.97%_53.55%,_#444DD4_0%,_#333AA0_100%)]">
          <div>
            <span>
              <img
                decoding="async"
                src="/images/landing/corner-1.svg"
                alt="Transpact"
                className="absolute left-0 top-0 block"
              />
            </span>
            <span>
              <img
                decoding="async"
                src="/images/landing/corner-2.svg"
                alt="Transpact"
                className="absolute bottom-0 left-[228px] block"
              />
            </span>
            <span>
              <img
                decoding="async"
                src="/images/landing/corner-3.svg"
                alt="Transpact"
                className="absolute left-[44%] top-0 block"
              />
            </span>
            <span>
              <img
                decoding="async"
                src="/images/landing/corner-4.svg"
                alt="Transpact"
                className="absolute bottom-0 left-[calc(100%_-_170px)] block"
              />
            </span>
          </div>

          <div className="relative mx-auto flex max-w-screen-xl flex-row pt-[10%]">
            <div className="container flex flex-col items-start gap-4 text-center">
              <Link
                href={siteConfig.links.twitter}
                className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
                target="_blank"
              >
                Like our project on Devfolio
              </Link>

              <h1 className="item-start font-heading text-3xl text-white sm:text-5xl md:text-6xl lg:text-7xl">
                <RotatingText
                  texts={[
                    "One Person",
                    "One Life",
                    "One Passport",
                    "Zero Hassel",
                  ]}
                  period={1000}
                />
              </h1>

              <p className="max-w-[42rem] text-left leading-normal text-white sm:text-xl sm:leading-8">
                A Decentralised Passport based on Polygon and Ethereum. <br />
                Say good bye to carrying multiple passports.
              </p>
              <div className="space-x-4">
                <Link href="/dashboard/user">
                  <Button size="lg" variant="default">
                    Passport Holder
                  </Button>
                </Link>

                <Link href="/dashboard/admin">
                  <Button variant="outline" size="lg">
                    Embassy/Consulate
                  </Button>
                </Link>
              </div>
            </div>

            <div className="max-w-lg rounded-full bg-[linear-gradient(180deg,_#5A63E9_0%,_#3B42A8_100%)] px-8 pt-8">
              <img
                decoding="async"
                src="/images/landing/hero-img.png"
                alt="Hero"
                className="z-5 -mt-8 w-full"
              />
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
}
