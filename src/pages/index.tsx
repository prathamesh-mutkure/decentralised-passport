import Head from "next/head";

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
    </>
  );
}
