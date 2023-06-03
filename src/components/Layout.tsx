import { WagmiConfig, configureChains, createClient } from "wagmi";
import { mainnet, goerli, polygon, polygonMumbai } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
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
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import SourceContextWrapper from "../hooks/context";
import { publicProvider } from "wagmi/providers/public";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { ISPRODUCTION } from "../constants/constants";
import "react-csv-importer/dist/index.css";
import Navbar from "./Navbar";
import BgImages from "./BgImages";

// polyfill Buffer for client
const { chains, provider } = configureChains(
  [ISPRODUCTION ? polygon : polygonMumbai, goerli],
  [
    alchemyProvider({
      apiKey: ISPRODUCTION
        ? process.env.NEXT_PUBLIC_ALCHEMY_KEY
        : process.env.NEXT_PUBLIC_ALCHEMY_KEY_TESTING,
    }),
    publicProvider(),
  ]
);

const otherWallets = [
  walletConnectWallet({ chains }),
  trustWallet({ chains }),
  coinbaseWallet({ chains, appName: "fragments" }),
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

const wagmiClient = createClient({ autoConnect: true, connectors, provider });

const Layout = ({ children }) => {
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          appInfo={{
            appName: "framents",
            learnMoreUrl: "",
          }}
          chains={chains}
          // initialChain={ISPRODUCTION ? polygon : goerli} // Optional, initialChain={1}, initialChain={chain.mainnet}, initialChain={gnosisChain}
          showRecentTransactions={true}
          // coolMode
          theme={darkTheme()}
        >
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
