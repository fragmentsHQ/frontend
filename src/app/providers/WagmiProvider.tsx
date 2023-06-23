'use client';

import * as React from 'react';
import {
    RainbowKitProvider,
    getDefaultWallets,
    connectorsForWallets,
    darkTheme
} from '@rainbow-me/rainbowkit';
import { ISPRODUCTION } from "../../constants/constants";
import {
    argentWallet,
    trustWallet,
    ledgerWallet,
    safeWallet
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, goerli, polygonMumbai } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { SafeConnector } from '@wagmi/connectors/safe'


const { chains, publicClient, webSocketPublicClient } = configureChains(
    [
        ...(ISPRODUCTION === false ? [goerli, polygonMumbai] : [mainnet, polygon, optimism, arbitrum,]),
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
                chains
            })
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
})

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
            <RainbowKitProvider theme={darkTheme()} chains={chains} appInfo={demoAppInfo}>
                {mounted && children}
            </RainbowKitProvider>
        </WagmiConfig>
    );
}
