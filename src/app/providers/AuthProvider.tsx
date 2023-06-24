"use client"
import React, { ReactNode } from 'react'
import { Chain, useAccount } from "wagmi";
import { getNetwork } from "@wagmi/core";
import { createContext, useState } from "react";

import { AppModes, Category, GasModes } from "../../types/types";

type Props = {
    children: ReactNode;
};

interface token {
    address: string;
    decimals: string;
    logo: string;
}

interface AuthData {
    userAddress: `0x${string}` | undefined;
    isConnected: boolean | null;
    viewChain: { name: string, id: number } | null;
    setViewChain: (chain: { name: string, id: number }) => void;
    sourceChain: (Chain & { unsupported?: boolean | undefined; }) | undefined;
    sourceToken: token | null;
    appMode: "Auto Pay" | "xStream";
    setSourceToken: (token: token) => void;
    setAppMode: (mode: "Auto Pay" | "xStream") => void;
    selectedCategory: Category | null;
    setSelectedCategory: React.Dispatch<React.SetStateAction<Category | null>>;
    dataRows: {
        id: string;
        toAddress: string;
        destinationToken: string;   
        destinationChain: string;
        amountOfSourceToken: string;
    }[];
    setDataRows: React.Dispatch<React.SetStateAction<{
        id: string;
        toAddress: string;
        destinationToken: string;
        destinationChain: string;
        amountOfSourceToken: string;
    }[]>>;
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
    selectedCategory: null,
    setSelectedCategory: () => { },
    dataRows: [{
        id: "0",
        toAddress: "",
        destinationToken: "",
        destinationChain: "",
        amountOfSourceToken: "",
    }],
    setDataRows: () => { },
    // gasMode: "Forward",
})

const AuthProvider = ({ children }: Props) => {
    const { address, isConnected } = useAccount();
    const { chain } = getNetwork();
    const [viewChain, setViewChain] = useState({
        name: "goerli",
        id: 5
    });
    const [sourceToken, setSourceToken] = useState<token | null>(null);
    const [appMode, setAppMode] = useState<"Auto Pay" | "xStream">("Auto Pay");
    const [selectedCategory, setSelectedCategory] = useState<Category | null>();
    const [dataRows, setDataRows] = useState([
        {
            id: "0",
            toAddress: "",
            destinationToken: "",
            destinationChain: "",
            amountOfSourceToken: "",
        },
    ]);

    console.log("AuthProvider", { address, isConnected, chain, viewChain, sourceToken, appMode });

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
                setAppMode: setAppMode,
                selectedCategory: selectedCategory,
                setSelectedCategory: setSelectedCategory,
                dataRows: dataRows,
                setDataRows: setDataRows,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;