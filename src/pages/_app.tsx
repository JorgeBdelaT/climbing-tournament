// src/pages/_app.tsx
import { withTRPC } from "@trpc/next";
import type { AppType } from "next/dist/shared/lib/utils";
import superjson from "superjson";
import { SessionProvider } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import { getCookie } from "cookies-next";
import "dayjs/locale/es";

import type { AppRouter } from "@/server/router";
import ThemeProvider from "@/providers/ThemeProvider";
import Layout from "@/components/Layout/Layout";

// @ts-ignore
const MyApp: AppType = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider defaultColorScheme={pageProps.colorScheme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </SessionProvider>
  );
};

// @ts-ignore
MyApp.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  pageProps: {
    colorScheme: getCookie("prefered-color-scheme", ctx) || "light",
  },
});

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return "";
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      url,
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp);
