import * as React from "react";
import * as ReactDOM from "react-dom/client";

import { Toaster } from 'react-hot-toast';
import "react-csv-importer/dist/index.css";

import SourceContextWrapper from "../hooks/context";
import { ISPRODUCTION } from "../constants/constants";
import Navbar from "./Navbar";
import BgImages from "./BgImages";

import { getDefaultWallets, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'

import { WagmiConfig, createConfig, configureChains, mainnet } from 'wagmi'

import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [alchemyProvider({ apiKey: 'gyDMWPExy6buiSYXupWffZ5fnn5fSp' }), publicProvider()],
)


// Set up wagmi config
const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: '...',
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
})


const Layout = ({ children }) => {
  return (
    <>
      <WagmiConfig config={config}>
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
            <Toaster
              position="top-center"
              reverseOrder={false}
              gutter={8}
              containerClassName=""
              containerStyle={{}}
              toastOptions={{
                // Define default options
                className: '',
                duration: 5000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },

                // Default options for specific types
                success: {
                  duration: 3000,
                  // @ts-ignore
                  theme: {
                    primary: 'green',
                    secondary: 'black',
                  },
                },
              }}
            />
          </SourceContextWrapper>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
};

export default Layout;
