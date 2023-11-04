import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Icons } from "~/components/icons";
import RotatingText from "~/components/landing/rotating-text";
import MainLayout from "~/components/layout/main-layout";
import { Button } from "~/components/ui/button";
import { siteConfig } from "~/config/site";
import { cn } from "~/lib/utils";

import { api } from "~/utils/api";

export default function Home() {
  const hello = api.post.hello.useQuery({ text: "from tRPC" });

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
                Like our project on Devpost
              </Link>

              <h1 className="item-start font-heading text-3xl text-white sm:text-5xl md:text-6xl lg:text-7xl">
                <RotatingText
                  texts={[
                    "Seize Control",
                    "Contracts Unfold",
                    "Funds Tracked",
                    "Corruption Controlled",
                  ]}
                  period={1000}
                />
              </h1>

              <p className="max-w-[42rem] leading-normal text-white sm:text-xl sm:leading-8">
                A Decentralised App based on React and NEAR Protocol. <br />
                Transparent and trustless contract creation and tracking.
              </p>
              <div className="space-x-4">
                <Button onClick={() => {}} size="lg" variant="default">
                  Request a Bidder
                </Button>

                <Button variant="outline" size="lg">
                  Perform a Bid
                </Button>
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

        <section className="my-24">
          <div className="relative mx-auto max-w-screen-md p-8 md:p-0">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/nyjtkoS1tZA?si=57L6yy-HZ05duyOX"
              title="Transpact Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="aspect-[16/9]"
            />
          </div>
        </section>

        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container text-center">
            <h1 className="mb-6 text-center text-xl font-bold sm:text-2xl md:text-3xl lg:text-5xl">
              Everything your business needs
            </h1>

            <h3 className="mb-16 text-muted-foreground">
              Now all contract management tools in one place.
            </h3>

            <div className="grid grid-cols-3 justify-items-center">
              {[
                { text: "Reduce your costs", col: "#DCFAE7" },
                { text: "Save valuable time", col: "#DCEDF9" },
                {
                  text: "Minimize the risk of incorrect contract fulfillment",
                  col: "#F9DBE2",
                },
              ].map((item, i) => {
                return (
                  <div
                    className={cn(
                      "flex h-64 w-64 flex-col justify-center rounded-xl border border-white/80 p-12",
                      `bg-[${item.col}]`,
                    )}
                    key={i}
                    style={{
                      backgroundColor: item.col,
                    }}
                  >
                    <p className="text-xl font-bold">{item.text}</p>
                  </div>
                );
              })}
            </div>

            {/* <Image
              src="/images/landing/cm-transformed.jpeg"
              height={500}
              width={1250}
              alt="Features"
              className="mx-auto"
            /> */}
          </div>
        </section>

        <section className="space-y-6 pb-8 pt-6 md:pb-12">
          <div className="container">
            <h1 className="mb-16 text-center text-xl sm:text-2xl md:text-3xl lg:text-5xl">
              World&apos;s First Decentralised,{" "}
              <span className="font-bold">Tender Platform</span>
            </h1>

            <div className="flex w-full flex-row items-center">
              <div className="flex flex-1 flex-col gap-y-8 text-left">
                <h2 className="w-4/5 text-2xl font-bold">
                  The Tender-Bidder Chain
                </h2>

                <p className="w-4/5 text-lg text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Maecenas ut metus dui. Sed id faucibus nunc. Nullam volutpat
                </p>

                <Link
                  href="#"
                  className="flex w-4/5 flex-row items-center gap-x-2"
                >
                  <Button variant="secondary" className="gap-1">
                    Learn More <Icons.arrowRight size={20} />
                  </Button>
                </Link>
              </div>

              <div className="flex-1">
                <video
                  src="/images/landing/video.webm"
                  className="h-auto w-full object-right p-4"
                  autoPlay
                  playsInline
                />
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container text-center">
            <h1 className="mb-16 text-center text-xl sm:text-2xl md:text-3xl lg:text-5xl">
              One Stop Solution to,{" "}
              <span className="font-bold">Tender Management</span>
            </h1>

            <Image
              src="/images/landing/features.png"
              height={500}
              width={1250}
              alt="Features"
              className="mx-auto"
            />
          </div>
        </section>

        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-24">
          <div className="container ">
            <h1 className="mb-32 text-center text-xl sm:text-2xl md:text-3xl lg:text-5xl">
              Hassel Free, <span className="font-bold">Tendering Process</span>
            </h1>

            <div className="relative mx-auto space-y-10">
              <div className="left- top-0 max-w-sm space-y-7 lg:absolute">
                <h2 className="w-4/5 text-2xl font-bold">
                  Swift. Reliant. Secure
                </h2>

                <p className="w-4/5 text-lg text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Maecenas ut metus dui.
                </p>

                <Link
                  href="#"
                  className="flex w-4/5 flex-row items-center gap-x-2"
                >
                  <Button variant="secondary" className="gap-1">
                    Learn More <Icons.arrowRight size={20} />
                  </Button>
                </Link>
              </div>

              <Image
                src="/images/landing/process.png"
                height={500}
                width={1100}
                alt="Process"
                className="mx-auto h-auto w-full"
              />
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
}
