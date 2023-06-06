import { ethers } from "ethers";
import { parseEther } from "ethers/lib/utils.js";
import { useState, useEffect, useContext } from "react";

import { fetchBalance, getNetwork } from "@wagmi/core"
import { useAccount, useNetwork, usePublicClient } from "wagmi";
import { SourceContext } from "./context";
import { parseUnits } from "ethers/lib/utils";
import * as chainList from "wagmi/chains";

import {
    CONNEXT_DOMAINS,
    AUTOPAY_CONTRACT_ADDRESSES,
    AUTOPAY_CONTRACT,
    TOKEN_ADDRESSES,
    ZERO_ADDRESS,
    Web3FunctionHash
} from "../constants/constants";
import { Category, Options, Tokens } from "../types/types";

const intervalTypes = [
    { value: "days", label: "days" },
    { value: "weeks", label: "weeks" },
    { value: "months", label: "months" },
    { value: "years", label: "years" },
];

const tokens = [{ name: "USDC" }, { name: "USDT" }, { name: "DAI" }];


const useAutoPayContract = () => {
    const { address } = useAccount();
    const { chain } = useNetwork();
    const provider = usePublicClient();

    const { sourceData, setSourceData } = useContext(SourceContext);
    const [balance, setBalance] = useState<number | string>(0);
    const [dataRows, setDataRows] = useState([
        {
            id: "0",
            toAddress: "",
            destinationToken: "",
            destinationChain: "",
            amountOfSourceToken: "",
        },
    ]);
    const [token, setToken] = useState<string>("")
    const [startTime, setStartTime] = useState<string | null>("");
    const [cycles, setCycles] = useState<string | null>("");
    const [intervalCount, setIntervalCount] = useState("1");
    const [intervalType, setIntervalType] = useState<Options | null>({
        value: "days",
        label: "days",
    });

    const getBalance = async (tokenAddress) => {
        try {
            // @ts-ignore
            const { ethereum } = window;
            if (ethereum) {
                const tokenBalance = await fetchBalance({
                    address: address,
                    token: tokenAddress,
                });
                console.log("the current selected tokenbalance is ", tokenBalance);
                setBalance(tokenBalance.formatted);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (token?.address) {
            console.log("Getting token balance of ", token.address);
            getBalance(token?.address);
        }
    }, [token?.address, chain?.id]);

    const createTimeAutomate = async () => {
        try {
            const AutoPayContract = AUTOPAY_CONTRACT(chain, provider);

            const data = [
                [
                    ...dataRows
                        .slice(0, -1)
                        .map((e) => (e.toAddress ? e.toAddress : ZERO_ADDRESS)),
                ],
                [
                    ...dataRows
                        .slice(0, -1)
                        .map((e) =>
                            e.amountOfSourceToken
                                ? parseUnits(
                                    e.amountOfSourceToken,
                                    TOKEN_ADDRESSES[chain?.network][
                                        sourceData.sourceToken
                                    ].decimals
                                )
                                : "0"
                        ),
                ],
                [
                    ...dataRows.slice(0, -1).map((e) => ({
                        _fromToken:
                            chain?.testnet && sourceData.sourceToken
                                ? TOKEN_ADDRESSES[chain?.network][sourceData.sourceToken]
                                    .address
                                : ZERO_ADDRESS,
                        _toToken:
                            chain?.testnet &&
                                sourceData.sourceToken &&
                                e.destinationChain
                                ? TOKEN_ADDRESSES[e.destinationChain][
                                    sourceData.sourceToken
                                ].address
                                : ZERO_ADDRESS,
                    })),
                ],
                [
                    ...dataRows.slice(0, -1).map((e) => ({
                        _toChain: e.destinationChain
                            ? chainList[e.destinationChain].id
                            : ZERO_ADDRESS,
                        _destinationDomain: e.destinationChain
                            ? CONNEXT_DOMAINS[e.destinationChain]
                            : ZERO_ADDRESS,
                        _destinationContract: e.destinationChain
                            ? AUTOPAY_CONTRACT_ADDRESSES[
                            chain?.testnet ? "testnets" : "mainnets"
                            ][e.destinationChain]
                            : ZERO_ADDRESS,
                    })),
                ],
                {
                    _cycles: cycles ? cycles : 1,
                    _startTime: startTime
                        ? startTime
                        : Math.trunc(Date.now() / 1000) + 3600,
                    _interval:
                        Number(intervalCount) *
                        (intervalType.value === "days"
                            ? 86400
                            : intervalType.value === "months"
                                ? 2629800
                                : intervalType.value === "weeks"
                                    ? 604800
                                    : intervalType.value === "years"
                                        ? 31536000
                                        : 1),
                    _web3FunctionHash: Web3FunctionHash.autopay
                    ,
                },
            ]

            console.log("Data submitted", data);

            const tx = await AutoPayContract._createMultipleTimeAutomate(data);

            console.log("tx", tx);
            tx.wait().then((receipt) => {
                console.log("receipt", receipt);
            });

        } catch (error) {
            console.error(error);
        }
    }

    return {
        dataRows,
        setDataRows,
        tokens,
        balance,
        sourceData,
        setSourceData,
        getBalance,
        intervalTypes,
        intervalCount,
        setIntervalCount,
        intervalType,
        setIntervalType,
        cycles,
        setCycles,
        startTime,
        setStartTime,
        createTimeAutomate,
    };
}


export default useAutoPayContract;