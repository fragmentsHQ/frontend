"use client"
import React, { ReactNode } from 'react'
import { Chain, useAccount } from "wagmi";
import { getNetwork } from "@wagmi/core";
import { createContext, useState } from "react";

type Props = {
    children: ReactNode;
};

interface AuthData {
    userAddress: `0x${string}` | undefined;
    isConnected: boolean | null;
    viewChain: { name: string, id: number } | null;
    setViewChain: (chain: { name: string, id: number }) => void;
    sourceChain: (Chain & { unsupported?: boolean | undefined; }) | undefined;
    sourceToken: string | null;
    appMode: "Auto Pay" | "xStream";
    setSourceToken: (token: string) => void;
    setAppMode: (mode: "Auto Pay" | "xStream") => void;
}

export const AuthContext = createContext<AuthData>({
    userAddress: undefined,
    isConnected: false,
    viewChain: null,
    setViewChain: () => { },
    sourceChain: undefined,
    sourceToken: null,
    appMode: "Auto Pay",
    setSourceToken: () => { },
    setAppMode: () => { },
    // gasMode: "Forward",
})

const AuthProvider = ({ children }: Props) => {
    const { address, isConnected } = useAccount();
    const { chain } = getNetwork();
    const [viewChain, setViewChain] = useState({
        name: "goerli",
        id: 5
    });
    const [sourceToken, setSourceToken] = useState("");
    const [appMode, setAppMode] = useState<"Auto Pay" | "xStream">("Auto Pay");

    return (
        <AuthContext.Provider
            value={{
                userAddress: address,
                isConnected: isConnected,
                viewChain: viewChain,
                setViewChain: setViewChain,
                sourceChain: chain,
                sourceToken: sourceToken,
                appMode: appMode,
                setSourceToken: setSourceToken,
                setAppMode: setAppMode
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;