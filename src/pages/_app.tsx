import { type AppType } from "next/app";
import { Toaster } from "~/components/ui/toaster";

import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Component {...pageProps} />
      <Toaster />
    </>
  );
};

export default api.withTRPC(MyApp);
