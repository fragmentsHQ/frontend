"use client"; // This is a client component 👈🏽

import { ethers } from "ethers";
import { useState, useEffect, useContext } from "react";

import { parseEther } from 'viem'
import {
    fetchBalance, getNetwork, sendTransaction, readContract, writeContract, prepareWriteContract,
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
    const { chain } = useNetwork();
    const { address } = useAccount();
    const provider = ethers.getDefaultProvider();

    const { sourceChain, sourceToken, setSourceToken, appMode, setAppMode } = useContext(AuthContext);

    const [startTime, setStartTime] = useState<string | null>("");
    const [cycles, setCycles] = useState<string | null>("");
    const [isOpen, setIsOpen] = useState(false);
    const [intervalCount, setIntervalCount] = useState("1");
    const [intervalType, setIntervalType] = useState<Options | null>({
        value: "days",
        label: "days",
    });
    const [callDataApproval, setCallDataApproval] =
        useState<`0x${string}`>("0x");
    const [callDataCreateTimeTxn, setCallDataCreateTimeTxn] =
        useState<`0x${string}`>("0x");

    const closeModal = () => setIsOpen(false);
    const openModal = () => setIsOpen(true);

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
            const config = await prepareWriteContract({
                address: chain && sourceToken
                    ? TOKEN_ADDRESSES[chain?.id][sourceToken].address
                    : ZERO_ADDRESS,
                abi: erc20ABI,
                functionName: 'claim',
                args: [69],
            })


            const { hash } = await writeContract(config)

        } catch (error) {
            console.error(error)
        }
    }

    const {
        // data,
        // error,
        // isLoading,
        // isError,
        sendTransactionAsync: sendApproveTokenAsyncTxn,
    } = useSendTransaction({
        to:
            chain && sourceToken
                ? TOKEN_ADDRESSES[chain?.id][sourceToken].address
                : ZERO_ADDRESS,
        data: callDataApproval,
        account: address,
        value: BigInt(0),
    });

    const {
        // data,
        // error,
        // isLoading,
        // isError,
        sendTransactionAsync: sendCreateTimeAsyncTxn,
    } = useSendTransaction({
        to: chain
            ? AUTOPAY_CONTRACT_ADDRESSES[chain?.testnet ? "testnets" : "mainnets"][
            chain?.id
            ]
            : ZERO_ADDRESS,
        data: callDataCreateTimeTxn,
        account: address,
        value: BigInt(0),
    });

    const updateCallDataApproval = () => {
        const ERC20Contract = ERC20_CONTRACT(
            chain && sourceToken
                ? TOKEN_ADDRESSES[chain?.id][sourceToken].address
                : ZERO_ADDRESS,
            provider
        );

        setCallDataApproval(
            ERC20Contract.interface.encodeFunctionData("approve", [
                chain
                    ? AUTOPAY_CONTRACT_ADDRESSES[
                    chain?.testnet ? "testnets" : "mainnets"
                    ][chain?.id]
                    : ZERO_ADDRESS,
                ethers.constants.MaxUint256,
            ]) as `0x${string}`
        );
    };

    const updateCallDataCreateTimeTxn = () => {
        const AutoPayContract = AUTOPAY_CONTRACT(chain, provider);

        console.log("settin calldata: ", [
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
                                TOKEN_ADDRESSES[chain?.id][sourceToken].decimals
                            )
                            : "0"
                    ),
            ],
            [
                ...dataRows
                    .slice(0, -1)
                    .map((e) =>
                        chain?.testnet && sourceToken
                            ? TOKEN_ADDRESSES[chain?.id][sourceToken].address
                            : ZERO_ADDRESS
                    ),
            ],
            [
                ...dataRows
                    .slice(0, -1)
                    .map((e) =>
                        chain?.testnet && sourceToken && e.destinationChain
                            ? TOKEN_ADDRESSES[e.destinationChain][sourceToken]
                                .address
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
        ]);
        try {
            setCallDataCreateTimeTxn(
                AutoPayContract.interface.encodeFunctionData(
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
            );
        } catch { }
    };

    useEffect(() => {
        updateCallDataApproval();
        updateCallDataCreateTimeTxn();
    }, [
        chain,
        sourceToken,
        dataRows,
        cycles,
        intervalCount,
        intervalType,
        startTime,
    ]);

    // useImperativeHandle(ref, () => ({
    //     executeTxn() {
    //         try {
    //             if (
    //                 BigNumber.from(allowance ? allowance : 0).eq(
    //                     ethers.constants.MaxUint256
    //                 )
    //             )
    //                 sendCreateTimeAsyncTxn?.();
    //             else sendApproveTokenAsyncTxn?.();
    //         } catch { }
    //     },

    //     hasEnoughAllowance() {
    //         return BigNumber.from(allowance ? allowance : 0).eq(
    //             ethers.constants.MaxUint256
    //         );
    //     },
    // }));

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