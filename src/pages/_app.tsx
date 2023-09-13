import { NextPage } from "next";
import { FC, ReactElement, ReactNode } from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider, MantineThemeOverride } from "@mantine/core";
import theme from "../utils/theme";
import { Global } from "@emotion/react";
import { trpc } from "../utils/trpc";
import { SessionProvider } from "next-auth/react";
import { NotificationsProvider } from "@mantine/notifications";
import { MetaMaskProvider } from "metamask-react";
import { emotionCache } from "../../emotion-cache";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface AppPropsExtended extends AppProps<{ session: any }> {
  Component: NextPageWithLayout & FC;
}

function App(props: AppPropsExtended) {
  const { Component, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <title>ArtBeat</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="shortcut icon" href="/Logo.png" type="image/x-icon" />
      </Head>

      <div>
        <SessionProvider session={pageProps.session}>
          <MetaMaskProvider>
            <MantineProvider
              withGlobalStyles
              withNormalizeCSS
              theme={{
                ...theme,
              }}
              emotionCache={emotionCache}
            >
              <NotificationsProvider>
                <Global
                  styles={[
                    `@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');`,
                  ]}
                />
                <Global
                  styles={(theme: MantineThemeOverride) => ({
                    body: {
                      backgroundColor: theme.colors["ocean-blue"][3],
                    },
                  })}
                />
                {getLayout(<Component {...pageProps.session} {...pageProps} />)}
              </NotificationsProvider>
            </MantineProvider>
          </MetaMaskProvider>
        </SessionProvider>
      </div>
    </>
  );
}

export default trpc.withTRPC(App);
