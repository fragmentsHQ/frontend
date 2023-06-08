import {
  WagmiConfig,
  configureChains,
  createClient,
  createConfig,
} from "wagmi";
import { mainnet, goerli } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { SafeConnector } from "wagmi/connectors/safe";
import { Buffer } from "buffer";

import SourceContextWrapper from "../hooks/context";
import * as React from "react";
import * as ReactDOM from "react-dom/client";

import "react-csv-importer/dist/index.css";
import Navbar from "./Navbar";
import BgImages from "./BgImages";

// polyfill Buffer for client
if (!window.Buffer) {
  window.Buffer = Buffer;
}

const defaultChains = [mainnet, goerli];
const alchemyId =
  process.env.REACT_APP_ALCHEMY_ID || "UuUIg4H93f-Bz5qs91SuBrro7TW3UShO";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  defaultChains,
  [alchemyProvider({ apiKey: alchemyId })]
);

const config = createConfig({
  autoConnect: false,
  publicClient,
  webSocketPublicClient,
  connectors: [
    new SafeConnector({
      chains,
      options: {
        allowedDomains: [/gnosis-safe.io$/, /app.safe.global$/],
        debug: true,
      },
    }),
  ],
});

const Layout = ({ children }) => {
  return (
    <>
      <WagmiConfig config={config}>
        <SourceContextWrapper>
          <Navbar />
          {children}
          <BgImages />
        </SourceContextWrapper>
      </WagmiConfig>
    </>
  );
};

export default Layout;
