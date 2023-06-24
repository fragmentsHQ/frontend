import {
    Button,
    Dropdown,
    Input,
    Label,
    MenuItem,
    Modal,
    Radio,
} from "@heathmont/moon-core-tw";
import { ControlsCloseSmall } from "@heathmont/moon-icons-tw";
import { BigNumber, ethers } from "ethers";
import { parseUnits } from "ethers/lib/utils.js";
import React, {
    useContext,
    useEffect,
    useState,
    useImperativeHandle,
    forwardRef,
    useRef,
} from "react";
import {
    erc20ABI,
    useAccount,
    useContractRead,
    useNetwork,
    useSendTransaction,
} from "wagmi";
import * as chainList from "wagmi/chains";


import {
    CONNEXT_DOMAINS,
    AUTOPAY_CONTRACT_ADDRESSES,
    ERC20_CONTRACT,
    AUTOPAY_CONTRACT,
    TOKEN_ADDRESSES,
    ZERO_ADDRESS,
    CONDITIONAL_CONTRACT_ADDRESSES,
    CONDITIONAL_CONTRACT,
    TOKEN_ADDRESSES_PRICE_FEEDS,
} from "../../constants/constants";
import { SourceContext } from "../../hooks/context";
import { Category, Options, Tokens } from "../../types/types";

type Props = {}

const PriceFeedPanel = (
    (
        { selectedCategory, showThisSection, setShowThisSection, dataRows }
    ) => {
        const { chain } = useNetwork();
        const { address } = useAccount();
        const provider = ethers.getDefaultProvider();

        const { sourceData, setSourceData } = useContext(SourceContext);
        const [isOpen, setIsOpen] = useState(false);
        const [intervalType, setIntervalType] = useState < Options | null > ({
            value: "days",
            label: "days",
        });
        const [token1, setToken1] = useState("MATIC");
        const [token2, setToken2] = useState("USDC");
        const [token1Price, setToken1Price] = useState("");
        const [token2Price, setToken2Price] = useState("");
        const [ratio, setRatio] = useState(0);
        const [startTime, setStartTime] = useState < string | null > ("");
        const [cycles, setCycles] = useState < string | null > ("");
        const [intervalCount, setIntervalCount] = useState("1");
        const [callDataApproval, setCallDataApproval] =
            useState < `0x${string}` > ("0x");
        const [callDataPriceFeedTxn, setCallDataPriceFeedTxn] =
            useState < `0x${string}` > ("0x");
        const interval = useRef < NodeJS.Timer > ();

        const closeModal = () => setIsOpen(false);
        const openModal = () => setIsOpen(true);

        const {
            data: allowance,
            isError,
            isLoading,
        } = useContractRead({
            address:
                chain && sourceData.sourceToken
                    ? TOKEN_ADDRESSES[chain?.id][sourceData.sourceToken].address
                    : ZERO_ADDRESS,
            abi: erc20ABI,
            functionName: "allowance",
            args: [
                address ? address : ZERO_ADDRESS,
                chain
                    ? CONDITIONAL_CONTRACT_ADDRESSES[
                    chain?.testnet ? "testnets" : "mainnets"
                    ][chain?.id]
                    : ZERO_ADDRESS,
            ],
            watch: true,
        });

        const {
            // data,
            // error,
            // isLoading,
            // isError,
            sendTransactionAsync: sendApproveTokenAsyncTxn,
        } = useSendTransaction({
            to:
                chain && sourceData.sourceToken
                    ? TOKEN_ADDRESSES[chain?.id][sourceData.sourceToken].address
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
            sendTransactionAsync: sendCreatePriceFeedAsyncTxn,
        } = useSendTransaction({
            to: chain
                ? CONDITIONAL_CONTRACT_ADDRESSES[
                chain?.testnet ? "testnets" : "mainnets"
                ][chain?.id]
                : ZERO_ADDRESS,
            data: callDataPriceFeedTxn,
            account: address,
            value: BigInt(0),
        });

        const updateCallDataApproval = () => {
            const ERC20Contract = ERC20_CONTRACT(
                chain && sourceData.sourceToken
                    ? TOKEN_ADDRESSES[chain?.id][sourceData.sourceToken].address
                    : ZERO_ADDRESS,
                provider
            );

            setCallDataApproval(
                ERC20Contract.interface.encodeFunctionData("approve", [
                    chain
                        ? CONDITIONAL_CONTRACT_ADDRESSES[
                        chain?.testnet ? "testnets" : "mainnets"
                        ][chain?.id]
                        : ZERO_ADDRESS,
                    ethers.constants.MaxUint256,
                ]) as `0x${string}`
            );
        };

        const updateCallDataPriceFeedTxn = () => {
            const ConditionalContract = CONDITIONAL_CONTRACT(chain, provider);

            try {
                // console.log("here boi: ", [
                //   [
                //     ...dataRows
                //       .slice(0, -1)
                //       .map((e) => (e.toAddress ? e.toAddress : ZERO_ADDRESS)),
                //   ],
                //   [
                //     ...dataRows
                //       .slice(0, -1)
                //       .map((e) =>
                //         e.amountOfSourceToken
                //           ? parseUnits(
                //               e.amountOfSourceToken,
                //               TOKEN_ADDRESSES[chain?.id][sourceData.sourceToken]
                //                 .decimals
                //             )
                //           : "0"
                //       ),
                //   ],
                //   ratio ? parseUnits(ratio, 18) : 0,
                //   [
                //     ...dataRows.slice(0, -1).map((e) => ({
                //       _fromToken:
                //         chain?.testnet && sourceData.sourceToken
                //           ? TOKEN_ADDRESSES[chain?.id][sourceData.sourceToken]
                //               .address
                //           : ZERO_ADDRESS,
                //       _toToken:
                //         chain?.testnet && sourceData.sourceToken && e.destinationChain
                //           ? TOKEN_ADDRESSES[e.destinationChain][sourceData.sourceToken]
                //               .address
                //           : ZERO_ADDRESS,
                //       _tokenA: token1
                //         ? TOKEN_ADDRESSES_PRICE_FEEDS[token1]
                //         : ZERO_ADDRESS,
                //       _tokenB: token2
                //         ? TOKEN_ADDRESSES_PRICE_FEEDS[token2]
                //         : ZERO_ADDRESS,
                //     })),
                //   ],
                //   [
                //     ...dataRows.slice(0, -1).map((e) => ({
                //       _toChain: e.destinationChain
                //         ? chainList[e.destinationChain].id
                //         : ZERO_ADDRESS,
                //       _destinationDomain: e.destinationChain
                //         ? CONNEXT_DOMAINS[e.destinationChain]
                //         : ZERO_ADDRESS,
                //       _destinationContract: e.destinationChain
                //         ? CONDITIONAL_CONTRACT_ADDRESSES[
                //             chain?.testnet ? "testnets" : "mainnets"
                //           ][e.destinationChain]
                //         : ZERO_ADDRESS,
                //     })),
                //   ],
                //   {
                //     _cycles: cycles ? cycles : 1,
                //     _startTime: startTime
                //       ? startTime
                //       : Math.trunc(Date.now() / 1000) + 3600,
                //     _interval:
                //       Number(intervalCount) *
                //       (intervalType.value === "days"
                //         ? 86400
                //         : intervalType.value === "months"
                //         ? 2629800
                //         : intervalType.value === "weeks"
                //         ? 604800
                //         : intervalType.value === "years"
                //         ? 31536000
                //         : 1),
                //     _web3FunctionHash: "QmSfTUv1XZmsVVRTNWtZqVC78mMPzi5hjSJTHbFHvzrc9p",
                //   },
                // ]);
                setCallDataPriceFeedTxn(
                    ConditionalContract.interface.encodeFunctionData(
                        "_createMultiplePriceFeedAutomate",
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
                                                TOKEN_ADDRESSES[chain?.id][sourceData.sourceToken]
                                                    .decimals
                                            )
                                            : "0"
                                    ),
                            ],
                            ratio ? ratio : 0,
                            [
                                ...dataRows.slice(0, -1).map((e) => ({
                                    _fromToken:
                                        chain?.testnet && sourceData.sourceToken
                                            ? TOKEN_ADDRESSES[chain?.id][sourceData.sourceToken]
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
                                    _tokenA: token1
                                        ? TOKEN_ADDRESSES_PRICE_FEEDS[token1]
                                        : ZERO_ADDRESS,
                                    _tokenB: token2
                                        ? TOKEN_ADDRESSES_PRICE_FEEDS[token2]
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
                                        ? CONDITIONAL_CONTRACT_ADDRESSES[
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
                                _web3FunctionHash:
                                    "QmaYK9kW85VsZUusYHGqzJQizu3Kifs73Np217LfLLhQDH",
                            },
                        ]
                    ) as `0x${string}`
                );
            } catch { }
        };

        useEffect(() => {
            updateCallDataApproval();
            updateCallDataPriceFeedTxn();
        }, [
            chain,
            sourceData.sourceToken,
            dataRows,
            cycles,
            intervalCount,
            intervalType,
            token1Price,
            token2Price,
            startTime,
            token1,
            token2,
            ratio,
        ]);

        useEffect(() => {
            setRatio(Number(token1Price) / Number(token2Price));
        }, [token1Price, token2Price]);

        // useImperativeHandle(ref, () => ({
        //     executeTxn() {
        //         try {
        //             if (
        //                 BigNumber.from(allowance ? allowance : 0).eq(
        //                     ethers.constants.MaxUint256
        //                 )
        //             )
        //                 sendCreatePriceFeedAsyncTxn?.();
        //             else sendApproveTokenAsyncTxn?.();
        //         } catch { }
        //     },

        //     hasEnoughAllowance() {
        //         return BigNumber.from(allowance ? allowance : 0).eq(
        //             ethers.constants.MaxUint256
        //         );
        //     },
        // }));

        return (
            <>
                <div className="w-full flex-col">
                    <div className="grid w-full grid-cols-3 gap-3">
                        <div>
                            <Label htmlFor="c-1" className="text-piccolo">
                                First Token
                            </Label>
                            <div className="relative">
                                <Input
                                    type="text"
                                    // placeholder="E.g. 9234324712"
                                    value={token1Price}
                                    id="c-1"
                                    className="rounded bg-[#262229] text-white"
                                    onChange={(e) => {
                                        setToken1Price(e.target.value);
                                        setShowThisSection({
                                            ...showThisSection,
                                            2: true,
                                        });
                                    }}
                                />
                                <Dropdown
                                    value={token1}
                                    onChange={setToken1}
                                    size="xl"
                                    className="w-22 absolute right-[5px] top-1/2 z-10 col-span-2 -translate-y-1/2 rounded-[10px] bg-[#464646]"
                                >
                                    {({ open }) => (
                                        <>
                                            <Dropdown.Select
                                                open={open}
                                                data-test="data-test"
                                                className=" h-[1.8rem]  rounded-[10px] bg-[#464646]"
                                            >
                                                {token1}
                                            </Dropdown.Select>

                                            <Dropdown.Options className="z-[10] w-full min-w-full rounded-md bg-[#464646]">
                                                {Object.keys(TOKEN_ADDRESSES_PRICE_FEEDS).map(
                                                    (token, index) => (
                                                        <Dropdown.Option value={token} key={index}>
                                                            {({ selected, active }) => (
                                                                <MenuItem
                                                                    isActive={active}
                                                                    isSelected={selected}
                                                                >
                                                                    {token}
                                                                </MenuItem>
                                                            )}
                                                        </Dropdown.Option>
                                                    )
                                                )}
                                            </Dropdown.Options>
                                        </>
                                    )}
                                </Dropdown>
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="c-1" className="text-piccolo">
                                Second Token
                            </Label>
                            <div className="relative">
                                <Input
                                    type="text"
                                    // placeholder="E.g. 9234324712"
                                    value={token2Price}
                                    id="c-1"
                                    className="rounded bg-[#262229] text-white"
                                    onChange={(e) => setToken2Price(e.target.value)}
                                />
                                <Dropdown
                                    value={token2}
                                    onChange={setToken2}
                                    size="xl"
                                    className="w-22 absolute right-0 top-1/2 z-10 col-span-2 -translate-y-1/2 rounded-[10px] bg-[#464646]"
                                >
                                    {({ open }) => (
                                        <>
                                            <Dropdown.Select
                                                open={open}
                                                data-test="data-test"
                                                className=" h-[1.8rem] rounded-[10px] bg-[#464646]"
                                            >
                                                {token2}
                                            </Dropdown.Select>

                                            <Dropdown.Options className="z-[10] w-full min-w-full rounded-md bg-[#464646]">
                                                {Object.keys(TOKEN_ADDRESSES_PRICE_FEEDS).map(
                                                    (token, index) => (
                                                        <Dropdown.Option value={token} key={index}>
                                                            {({ selected, active }) => (
                                                                <MenuItem
                                                                    isActive={active}
                                                                    isSelected={selected}
                                                                >
                                                                    {token}
                                                                </MenuItem>
                                                            )}
                                                        </Dropdown.Option>
                                                    )
                                                )}
                                            </Dropdown.Options>
                                        </>
                                    )}
                                </Dropdown>
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="c-1" className="text-piccolo">
                                Ratio
                            </Label>
                            <Input
                                type="number"
                                placeholder="1"
                                value={ratio}
                                disabled
                                id="c-1"
                                className="rounded bg-[#262229] text-white"
                                onChange={(e) => setRatio(Number(e.target.value))}
                            />
                        </div>
                        <div>
                            <Label htmlFor="c-1" className="text-piccolo">
                                Start Time
                            </Label>
                            <Input
                                type="number"
                                placeholder="E.g. 9234324712"
                                id="c-1"
                                className="rounded bg-[#262229] text-white"
                                value={startTime}
                                onChange={(e) => {
                                    setStartTime(e.target.value);
                                    setShowThisSection({
                                        ...showThisSection,
                                        2: true,
                                    });
                                }}
                            />
                        </div>
                        {selectedCategory === "Recurring" && (
                            <div className="col-span-2 grid grid-cols-2 gap-x-2">
                                <div>
                                    <Label htmlFor="c-1" className="text-piccolo">
                                        No. of Cycles
                                    </Label>
                                    <Input
                                        type="number"
                                        placeholder="1"
                                        id="c-1"
                                        className="rounded bg-[#262229] text-white"
                                        onChange={(e) => setCycles(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="c-1" className="text-piccolo">
                                        Interval
                                    </Label>
                                    <Button
                                        onClick={openModal}
                                        className="rounded-md bg-[#262229] font-normal"
                                    >
                                        Select Interval
                                    </Button>
                                    <Modal open={isOpen} onClose={closeModal}>
                                        <Modal.Backdrop className="bg-black opacity-60" />
                                        <Modal.Panel className="bg-[#282828] p-3">
                                            <div className="border-beerus relative px-6 pb-4 pt-5">
                                                <h3 className="text-moon-18 text-bulma font-medium">
                                                    Select Frequency
                                                </h3>
                                                <span
                                                    className="absolute right-5 top-4 inline-block h-8 w-8 cursor-pointer"
                                                    onClick={closeModal}
                                                >
                                                    <ControlsCloseSmall className="block h-full w-full" />
                                                </span>
                                            </div>
                                            <div className="grid grid-cols-5 items-center gap-3 px-6 py-4">
                                                <span className="col-span-2 block text-[#AFAEAE]">
                                                    Repeat Every
                                                </span>
                                                <Input
                                                    type="text"
                                                    placeholder="1"
                                                    id="c-1"
                                                    className="col-span-1 rounded bg-[#262229] text-white"
                                                    value={intervalCount}
                                                    onChange={(e) => setIntervalCount(e.target.value)}
                                                />
                                                <Dropdown
                                                    value={intervalType}
                                                    onChange={setIntervalType}
                                                    size="xl"
                                                    className="col-span-2"
                                                >
                                                    {({ open }) => (
                                                        <>
                                                            <Dropdown.Select
                                                                open={open}
                                                                data-test="data-test"
                                                                className="bg-[#262229]"
                                                            >
                                                                {intervalType?.label}
                                                            </Dropdown.Select>

                                                            <Dropdown.Options className="z-[10] w-full min-w-full bg-[#262229]">
                                                                {intervalTypes.map((size, index) => (
                                                                    <Dropdown.Option value={size} key={index}>
                                                                        {({ selected, active }) => (
                                                                            <MenuItem
                                                                                isActive={active}
                                                                                isSelected={selected}
                                                                            >
                                                                                {size.label}
                                                                            </MenuItem>
                                                                        )}
                                                                    </Dropdown.Option>
                                                                ))}
                                                            </Dropdown.Options>
                                                        </>
                                                    )}
                                                </Dropdown>
                                            </div>

                                            <div className="flex justify-end gap-2 p-4 pt-2">
                                                <Button
                                                    className="rounded-md bg-[#262229]"
                                                    onClick={closeModal}
                                                >
                                                    Ok
                                                </Button>
                                            </div>
                                        </Modal.Panel>
                                    </Modal>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {/* <Button
          size="md"
          className="mt-7 min-w-[93px] rounded-lg bg-[#1ae77a] text-black"
          onClick={() => {
            try {
              if (relayerFee === "") {
                return;
              }
              if (
                BigNumber.from(allowance ? allowance : 0).eq(
                  ethers.constants.MaxUint256
                )
              )
                sendCreateTimeAsyncTxn?.();
              else sendApproveTokenAsyncTxn?.();
            } catch {}
          }}
        >
          {relayerFee === "" ? (
            <div role="status">
              <svg
                aria-hidden="true"
                className="mr-2 h-6 w-6 animate-spin fill-black text-gray-200 dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : BigNumber.from(allowance ? allowance : 0).eq(
              ethers.constants.MaxUint256
            ) ? (
            "Confirm"
          ) : (
            "Approve"
          )}
        </Button> */}
            </>
        );
    }
);

export default PriceFeedPanel