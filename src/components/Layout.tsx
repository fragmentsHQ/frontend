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
  braveWallet,
  coinbaseWallet,
  injectedWallet,
  metaMaskWallet,
  trustWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import {
  connectorsForWallets,
  darkTheme,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

// polyfill Buffer for client
if (!window.Buffer) {
  window.Buffer = Buffer;
}

const defaultChains = ISPRODUCTION
  ? [mainnet, polygon]
  : [goerli, polygonMumbai];
const alchemyId =
  process.env.REACT_APP_ALCHEMY_ID || "UuUIg4H93f-Bz5qs91SuBrro7TW3UShO";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  defaultChains,
  [alchemyProvider({ apiKey: alchemyId })]
);

const otherWallets = [
  walletConnectWallet({ chains }),
  trustWallet({ chains }),
  coinbaseWallet({ chains, appName: "Fragments" }),
  braveWallet({ chains }),
];

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [injectedWallet({ chains }), metaMaskWallet({ chains })],
  },
  {
    groupName: "Other Wallets",
    wallets: otherWallets,
  },
]);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
  connectors,
});

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
