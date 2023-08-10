import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import theme from '@/utils/theme';
import { ThemeProvider } from '@mui/material/styles';

import AppHeader from "@/components/AppHeader";

import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { avalanche, avalancheFuji } from "wagmi/chains";

const chains = [avalanche, avalancheFuji];
const projectId = process.env.WALLETCONNECT_PROJECT_ID || "470864dcd758f43b35fb76f0d0edadf2";

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Caviar App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>{" "}
      <WagmiConfig config={wagmiConfig}>
      <ThemeProvider theme={theme}>
        <AppHeader />
        <Component {...pageProps} />
        </ThemeProvider>
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
}