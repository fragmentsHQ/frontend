"use client"; // This is a client component 👈🏽

import { ethers } from "ethers";
import { useState, useEffect, useContext } from "react";

import { parseEther } from 'viem'
import {
    fetchBalance, getNetwork, prepareSendTransaction, sendTransaction, readContract,
} from "@wagmi/core"
import { useAccount, useNetwork, usePublicClient, erc20ABI } from "wagmi";
import { parseUnits } from "ethers/lib/utils";
import * as chainList from "wagmi/chains";

import toast from 'react-hot-toast';

import { AuthContext } from "../app/providers/AuthProvider";
import {
    CONNEXT_DOMAINS,
    AUTOPAY_CONTRACT_ADDRESSES,
    AUTOPAY_CONTRACT,
    TOKEN_ADDRESSES,
    ZERO_ADDRESS,
    Web3FunctionHash,
    ERC20_CONTRACT
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
    const { chain } = useNetwork();
    const { address } = useAccount();

    const { sourceChain, sourceToken, setSourceToken, appMode, setAppMode, dataRows, setDataRows } = useContext(AuthContext);

    const [startTime, setStartTime] = useState<string | null>("");
    const [cycles, setCycles] = useState<string | null>("");
    const [intervalCount, setIntervalCount] = useState("1");
    const [intervalType, setIntervalType] = useState<Options | null>({
        value: "days",
        label: "days",
    });

    startTime && console.log("startTime: ", startTime);

    const fetchAllowance = async () => {
        try {

            const allowance = readContract({
                address: chain && sourceToken
                    ? TOKEN_ADDRESSES[chain?.id][sourceToken].address
                    : ZERO_ADDRESS,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [
                    address ? address : ZERO_ADDRESS,
                    chain
                        ? AUTOPAY_CONTRACT_ADDRESSES[
                        chain?.testnet ? "testnets" : "mainnets"
                        ][chain?.id]
                        : ZERO_ADDRESS,
                ],
            })

            toast.promise(allowance, {
                loading: 'Loading',
                success: (data) => `Successfully saved ${data}`,
                error: (err) => `This just happened: ${err.toString()}`,
            },);

        } catch (error) {
            console.error(error);
        }
    }

    const handleApprove = async () => {
        try {
            const ERC20Contract = ERC20_CONTRACT(
                chain && sourceToken
                    ? TOKEN_ADDRESSES[chain?.id][sourceToken].address
                    : ZERO_ADDRESS,
            );

            console.log(ERC20Contract);

            const callDataApproval = ERC20Contract.interface.encodeFunctionData("approve", [
                chain
                    ? AUTOPAY_CONTRACT_ADDRESSES[
                    chain?.testnet ? "testnets" : "mainnets"
                    ][chain?.id]
                    : ZERO_ADDRESS,
                ethers.constants.MaxUint256,
            ]) as `0x${string}`

            const request = await prepareSendTransaction({
                to:
                    chain && sourceToken
                        ? TOKEN_ADDRESSES[chain?.id][sourceToken].address
                        : ZERO_ADDRESS,
                data: callDataApproval,
                account: address,
                value: BigInt(0),
            })
            const { hash } = await sendTransaction(request)
            console.log(hash);

        } catch (error) {
            console.error(error)
        }
    }

    const createTimeAutomateTxn = async () => {
        try {
            const AutoPayContract = AUTOPAY_CONTRACT(chain);

            const callDataCreateTimeTxn = AutoPayContract.interface.encodeFunctionData(
                "_createMultipleTimeAutomate",
                [
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
                                        TOKEN_ADDRESSES[chain?.id][sourceToken]
                                            .decimals
                                    )
                                    : "0"
                            ),
                    ],
                    [
                        ...dataRows
                            .slice(0, -1)
                            .map((e) =>
                                chain?.testnet && sourceToken
                                    ? TOKEN_ADDRESSES[chain?.id][sourceToken]
                                        .address
                                    : ZERO_ADDRESS
                            ),
                    ],
                    [
                        ...dataRows
                            .slice(0, -1)
                            .map((e) =>
                                chain?.testnet &&
                                    sourceToken &&
                                    e.destinationChain
                                    ? TOKEN_ADDRESSES[e.destinationChain][
                                        sourceToken
                                    ].address
                                    : ZERO_ADDRESS
                            ),
                    ],
                    [
                        ...dataRows
                            .slice(0, -1)
                            .map((e) =>
                                e.destinationChain ? e.destinationChain : ZERO_ADDRESS
                            ),
                    ],
                    [
                        ...dataRows
                            .slice(0, -1)
                            .map((e) =>
                                e.destinationChain
                                    ? CONNEXT_DOMAINS[e.destinationChain]
                                    : ZERO_ADDRESS
                            ),
                    ],
                    [
                        ...dataRows
                            .slice(0, -1)
                            .map((e) =>
                                e.destinationChain
                                    ? AUTOPAY_CONTRACT_ADDRESSES[
                                    chain?.testnet ? "testnets" : "mainnets"
                                    ][e.destinationChain]
                                    : ZERO_ADDRESS
                            ),
                    ],
                    [...dataRows.slice(0, -1).map((_) => (cycles ? cycles : 1))],
                    [
                        ...dataRows
                            .slice(0, -1)
                            .map((_) =>
                                startTime ? startTime : Math.trunc(Date.now() / 1000) + 3600
                            ),
                    ],
                    [
                        ...dataRows
                            .slice(0, -1)
                            .map(
                                (_) =>
                                    Number(intervalCount) *
                                    (intervalType.value === "days"
                                        ? 86400
                                        : intervalType.value === "months"
                                            ? 2629800
                                            : intervalType.value === "weeks"
                                                ? 604800
                                                : intervalType.value === "years"
                                                    ? 31536000
                                                    : 1)
                            ),
                    ],
                    "QmRdcGs5h8UP8ETFdS7Yj7iahDTjfQNHMsJp3dYRec5Gf2",
                ]
            ) as `0x${string}`

            console.log(callDataCreateTimeTxn);

            const request = await prepareSendTransaction({
                to: chain
                    ? AUTOPAY_CONTRACT_ADDRESSES[chain?.testnet ? "testnets" : "mainnets"][
                    chain?.id
                    ]
                    : ZERO_ADDRESS,
                data: callDataCreateTimeTxn,
                account: address,
                value: BigInt(0),
            })
            const { hash } = await sendTransaction(request)
            console.log(hash);




        } catch (error) {
            console.error(error);
        }
    }


    const handleTimeExecution = async () => {
        try {
            const allowance = await fetchAllowance();
            if (
                BigNumber.from(allowance ? allowance : 0).eq(
                    ethers.constants.MaxUint256
                )
            )
                createTimeAutomateTxn?.();
            else handleApprove?.();
        } catch (e) {
            console.error(e);
        }

    }

    return {
        tokens,
        intervalTypes,
        intervalCount,
        setIntervalCount,
        intervalType,
        setIntervalType,
        cycles,
        setCycles,
        startTime,
        setStartTime,
        fetchAllowance,
        handleApprove,
        handleTimeExecution
    };
}


export default useAutoPayContract;