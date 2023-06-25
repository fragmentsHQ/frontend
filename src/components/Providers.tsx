'use client';

import {
  connectorsForWallets,
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  argentWallet,
  ledgerWallet,
  safeWallet,
  trustWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { SafeConnector } from '@wagmi/connectors/safe';
import * as React from 'react';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  arbitrum,
  goerli,
  mainnet,
  optimism,
  polygon,
  polygonMumbai,
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

import { ISPRODUCTION } from '../constants/constants';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    ...(ISPRODUCTION === false
      ? [goerli, polygonMumbai]
      : [mainnet, polygon, optimism, arbitrum]),
  ],
  [publicProvider()]
);

const projectId = 'e79ce4839d51253e75286ac813159501';

const { wallets } = getDefaultWallets({
  appName: 'Fragments',
  projectId,
  chains,
});

const demoAppInfo = {
  appName: 'Fragments',
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Safe',
    wallets: [
      safeWallet({
        chains,
      }),
    ],
  },
  {
    groupName: 'Other',
    wallets: [
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);

const safeConnector = new SafeConnector({
  chains,
  options: {
    allowedDomains: [/gnosis-safe.io$/, /app.safe.global$/],
    debug: false,
  },
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        theme={darkTheme()}
        chains={chains}
        appInfo={demoAppInfo}
      >
        {mounted && children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
