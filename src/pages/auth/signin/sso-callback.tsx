import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import MainLayout from "~/components/layout/main-layout";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const { redirect_url } = router.query;

    void router.replace(redirect_url?.toString() ?? "/");
  }, [router]);

  return (
    <>
      <Head>
        <title>Redirecting...</title>
        <meta
          name="description"
          content="An Decentralised Passport powered by Polygon"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainLayout>
        <></>
      </MainLayout>
    </>
  );
}
