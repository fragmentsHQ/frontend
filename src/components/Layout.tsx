import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { mainnet, goerli, polygon, polygonMumbai } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { SafeConnector } from "wagmi/connectors/safe";
import { Buffer } from "buffer";

import SourceContextWrapper from "../hooks/context";
import { publicProvider } from "wagmi/providers/public";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { ISPRODUCTION } from "../constants/constants";
import "react-csv-importer/dist/index.css";
import Navbar from "./Navbar";
import BgImages from "./BgImages";

import {
  connectorsForWallets,
  darkTheme,
  lightTheme,
  RainbowKitProvider,
  getDefaultWallets
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

// polyfill Buffer for client
if (!window.Buffer) {
  window.Buffer = Buffer;
}

const { chains, publicClient, webSocketPublicClient } = configureChains(
  // @ts-ignore
  ISPRODUCTION ? [mainnet, polygon] : [polygonMumbai, goerli],
  [
    alchemyProvider({
      apiKey: "q-gyDMWPExy6buiSYXupWffZ5fnn5fSp",
    }),
    publicProvider(),
  ]
)

const { connectors } = getDefaultWallets({
  appName: 'Fragments',
  projectId: 'YOUR_PROJECT_ID',
  chains
});


// Set up wagmi config
const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

const Layout = ({ children }) => {
  return (
    <>
      <WagmiConfig config={config}>
        <RainbowKitProvider chains={chains} theme={darkTheme()}>
          <SourceContextWrapper>
            <Navbar />
            {children}
            <BgImages />
          </SourceContextWrapper>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
};

export default Layout;
