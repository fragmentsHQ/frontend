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
import { getProvider, getAccount } from "@wagmi/core";
import { BigNumber, ethers } from "ethers";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  erc20ABI,
  useNetwork,
  usePrepareSendTransaction,
  useSendTransaction,
} from "wagmi";
import * as chainList from "wagmi/chains";
import {
  CONNEXT_DOMAINS,
  CONTRACT_ADDRESSES,
  ERC20_CONTRACT,
  FRAGMENTS_CONTRACT,
  TOKEN_ADDRESSES,
  ZERO_ADDRESS,
} from "../constants/constants";
import { SourceContext } from "../hooks/context";
import { Category, Options, Tokens } from "../types/types";

const intervalTypes = [
  { value: "days", label: "days" },
  { value: "weeks", label: "weeks" },
  { value: "months", label: "months" },
  { value: "years", label: "years" },
];

const tokens = [{ name: "USDC" }, { name: "USDT" }, { name: "DAI" }];

const panels = {
  Time: {
    id: 0,
    category: ["Recurring", "One Time"],
    element: (selectedCategory: Category) => {
      const { chain } = useNetwork();
      const { address } = getAccount();
      const provider = getProvider();

      const { sourceData, setSourceData } = useContext(SourceContext);
      const [toChain, setToChain] = useState<string | null>(null);
      const [toToken, setToToken] = useState<string | null>(null);
      const [isOpen, setIsOpen] = useState(false);
      const [value, setValue] = useState("");
      const [intervalType, setIntervalType] = useState<Options | null>({
        value: "days",
        label: "days",
      });
      const [timesValue, setTimesValue] = useState("");
      const [amount, setAmount] = useState("");
      const [toAddress, setToAddress] = useState("");
      const [allowance, setAllowance] = useState("");
      const [callDataApproval, setCallDataApproval] = useState("");
      const [callDataCreateTimeTxn, setCallDataCreateTimeTxn] = useState("");
      const [relayerFee, setRelayerFee] = useState("");
      const timer = useRef<NodeJS.Timeout>();

      const handleChange = (e) => {
        const inputValue = e.target.value;

        if (!isNaN(inputValue) && inputValue !== "") {
          setTimesValue(inputValue + " times");
        } else {
          setTimesValue("");
        }
      };

      const closeModal = () => setIsOpen(false);
      const openModal = () => setIsOpen(true);

      const { config: configApprove } = usePrepareSendTransaction({
        request: {
          to: chain
            ? CONTRACT_ADDRESSES[chain?.testnet ? "testnets" : "mainnets"][
                chain?.network
              ]
            : ZERO_ADDRESS,
          data: callDataApproval,
        },
      });

      const { sendTransactionAsync: sendApproveTokenAsyncTxn } =
        useSendTransaction(configApprove);

      const { config: configCreateTimeTxn } = usePrepareSendTransaction({
        request: {
          to: chain
            ? CONTRACT_ADDRESSES[chain?.testnet ? "testnets" : "mainnets"][
                chain?.network
              ]
            : ZERO_ADDRESS,
          data: callDataCreateTimeTxn,
        },
      });

      const { sendTransactionAsync: sendCreateTimeAsyncTxn } =
        useSendTransaction(configCreateTimeTxn);

      const fetchAllowance = async () => {
        let contract;

        try {
          contract = new ethers.Contract(
            chain?.testnet && sourceData.sourceToken
              ? TOKEN_ADDRESSES[chain?.network][sourceData.sourceToken]
              : ZERO_ADDRESS,
            erc20ABI,
            provider
          );

          let checkAllowance = await contract.allowance(
            address ? address : ZERO_ADDRESS,
            chain
              ? CONTRACT_ADDRESSES[chain?.testnet ? "testnets" : "mainnets"][
                  chain?.network
                ]
              : ZERO_ADDRESS
          );
          let allowance = checkAllowance.toString();

          setAllowance(allowance);
        } catch {}
      };

      const updateCallDataApproval = () => {
        const ERC20Contract = ERC20_CONTRACT(
          chain ? TOKEN_ADDRESSES[chain?.network]["TEST"] : ZERO_ADDRESS,
          provider
        );

        setCallDataApproval(
          ERC20Contract.interface.encodeFunctionData("approve", [
            chain
              ? CONTRACT_ADDRESSES[chain?.testnet ? "testnets" : "mainnets"][
                  chain?.network
                ]
              : ZERO_ADDRESS,
            ethers.constants.MaxUint256,
          ])
        );
      };

      const updateCallDataCreateTimeTxn = () => {
        const FragContract = FRAGMENTS_CONTRACT(chain, provider);

        try {
          setCallDataCreateTimeTxn(
            FragContract.interface.encodeFunctionData("_createTimeAutomate", [
              toAddress ? toAddress : ZERO_ADDRESS,
              amount ? amount : 0,
              60,
              chain?.testnet && sourceData.sourceToken
                ? TOKEN_ADDRESSES[chain?.network][sourceData.sourceToken]
                : ZERO_ADDRESS,
              chain?.testnet && toChain && toToken
                ? TOKEN_ADDRESSES[toChain][toToken]
                : ZERO_ADDRESS,
              toChain ? chainList[toChain].id : chain?.id ? chain?.id : 0,
              toChain
                ? CONTRACT_ADDRESSES[chain?.testnet ? "testnets" : "mainnets"][
                    chain?.network
                  ]
                : ZERO_ADDRESS,
              toChain ? CONNEXT_DOMAINS[chain?.network] : ZERO_ADDRESS,
              relayerFee ? relayerFee : 0,
            ])
          );
        } catch {}
      };

      useEffect(() => {
        fetchAllowance();
        updateCallDataApproval();
        updateCallDataCreateTimeTxn();
      }, [
        chain,
        toAddress,
        amount,
        sourceData.sourceToken,
        toChain,
        toToken,
        relayerFee,
      ]);

      useEffect(() => {
        timer.current = setTimeout(async () => {
          const response = await fetch(
            "https://connext-relayer-fee.vercel.app/6648936/1886350457"
          );
          const jsonData = await response.json();
          setRelayerFee(jsonData?.FEE_USD);
        }, 10000);

        return () => {
          clearTimeout(timer.current);
        };
      });

      return (
        <>
          <div className="flex w-full flex-col items-end justify-around gap-2 lg:flex-row">
            <div className="w-full">
              <Label htmlFor="c-1" className="text-piccolo">
                To Address
              </Label>
              <Input
                type="text"
                placeholder="Eg 0x16C85b054619b743c1dCb5B091c2b26B30E037eF"
                id="c-1"
                className="rounded bg-[#262229] text-white"
                onChange={(e) => setToAddress(e.target.value)}
              />
              {selectedCategory === "Recurring" && (
                <div className="mt-4 grid grid-cols-2 gap-x-2">
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
                            Recurring Schedule
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
                            type="numeric"
                            placeholder="1"
                            id="c-1"
                            className="col-span-1 rounded bg-[#262229] text-white"
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

                                <Dropdown.Options className="z-[10] w-full bg-[#262229]">
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
                        <div className="px-6 py-4">
                          <span className="col-span-2 block text-[#AFAEAE]">
                            Ends
                          </span>
                          <Radio
                            value={value}
                            onChange={setValue}
                            name="Form Item"
                            className="mt-4 space-y-6"
                          >
                            <Radio.Option value="option1">
                              <Radio.Indicator />
                              Never
                            </Radio.Option>
                            <Radio.Option
                              value="option2"
                              className="grid grid-cols-3 items-center"
                            >
                              <div className="col-span-1 flex gap-2">
                                <Radio.Indicator />
                                <span>On</span>
                              </div>
                              <div className="relative col-span-2 ml-5 max-w-sm">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                  <svg
                                    aria-hidden="true"
                                    className="h-5 w-5 text-gray-500 dark:text-gray-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                      clip-rule="evenodd"
                                    ></path>
                                  </svg>
                                </div>
                                <input
                                  type="date"
                                  className="block w-full rounded-lg bg-[#262229] p-2.5 pl-10 text-sm "
                                  placeholder="Select date"
                                />
                              </div>
                            </Radio.Option>
                            <Radio.Option
                              value="option2"
                              className="grid grid-cols-3 items-center"
                            >
                              <div className="col-span-1 flex gap-2">
                                <Radio.Indicator />
                                <span>After</span>
                              </div>
                              <div className="relative col-span-2 ml-5 max-w-sm">
                                <Input
                                  type="text"
                                  value={timesValue}
                                  onChange={handleChange}
                                  pattern="[0-9]*"
                                  inputMode="numeric"
                                  className="col-span-1 rounded bg-[#262229] text-white"
                                />
                              </div>
                            </Radio.Option>
                          </Radio>
                        </div>
                        <div className="flex justify-end gap-2 p-4 pt-2">
                          <Button variant="secondary" onClick={closeModal}>
                            Cancel
                          </Button>
                          <Button onClick={closeModal}>Create</Button>
                        </div>
                      </Modal.Panel>
                    </Modal>
                  </div>
                </div>
              )}
              <div className="mt-4 grid grid-cols-2 gap-x-2">
                <div>
                  <Label htmlFor="c-1" className="text-piccolo">
                    Amount
                  </Label>
                  <Input
                    type="number"
                    placeholder="69"
                    id="c-1"
                    className="rounded bg-[#262229] text-white"
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-x-2">
                <Dropdown
                  value={toChain}
                  onChange={(e) => {
                    setToChain(e);
                    setToToken("");
                  }}
                >
                  {({ open }) => (
                    <>
                      <Dropdown.Select
                        open={open}
                        label="To Chain"
                        placeholder="Choose a Chain"
                        className="bg-[#262229]"
                      >
                        {toChain}
                      </Dropdown.Select>
                      <Dropdown.Options className="z-10 bg-[#262229]">
                        {chain
                          ? Object.keys(
                              CONTRACT_ADDRESSES[
                                chain?.testnet ? "testnets" : "mainnets"
                              ]
                            ).map((chain, index) => (
                              <Dropdown.Option value={chain} key={index}>
                                {({ selected, active }) => {
                                  return (
                                    <MenuItem
                                      isActive={active}
                                      isSelected={selected}
                                    >
                                      <MenuItem.Title>{chain}</MenuItem.Title>
                                      <MenuItem.Radio isSelected={selected} />
                                    </MenuItem>
                                  );
                                }}
                              </Dropdown.Option>
                            ))
                          : null}
                      </Dropdown.Options>
                    </>
                  )}
                </Dropdown>
                <Dropdown value={toToken} onChange={setToToken}>
                  {({ open }) => (
                    <>
                      <Dropdown.Select
                        open={open}
                        label="To Token"
                        placeholder={
                          toChain
                            ? "Choose a token"
                            : "Please set To Chain first"
                        }
                        className="bg-[#262229]"
                      >
                        {toToken}
                      </Dropdown.Select>
                      <Dropdown.Options className="z-[10] bg-[#262229]">
                        {chain?.network
                          ? toChain
                            ? Object.keys(TOKEN_ADDRESSES[toChain]).map(
                                (token, index) => (
                                  <Dropdown.Option value={token} key={index}>
                                    {({ selected, active }) => {
                                      return (
                                        <MenuItem
                                          isActive={active}
                                          isSelected={selected}
                                        >
                                          <MenuItem.Title>
                                            {token}
                                          </MenuItem.Title>
                                          <MenuItem.Radio
                                            isSelected={selected}
                                          />
                                        </MenuItem>
                                      );
                                    }}
                                  </Dropdown.Option>
                                )
                              )
                            : null
                          : null}
                      </Dropdown.Options>
                    </>
                  )}
                </Dropdown>
              </div>
            </div>
          </div>
          <Button
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
          </Button>
        </>
      );
    },
  },
  "Token Pair Price": {
    id: 1,
    category: ["One Time"],
    element: (selectedCategory: Category) => {
      const { chain } = useNetwork();
      const { address } = getAccount();
      const provider = getProvider();

      const [fromToken, setFromToken] = useState<string | null>(null);
      const [toChain, setToChain] = useState<string | null>(null);
      const [toToken, setToToken] = useState<string | null>(null);
      const [isOpen, setIsOpen] = useState(false);
      const [value, setValue] = useState("");
      const [intervalType, setIntervalType] = useState<Options | null>({
        value: "days",
        label: "days",
      });
      const [timesValue, setTimesValue] = useState("");
      const [amount, setAmount] = useState("");
      const [tokenPrice, setTokenPrice] = useState("");
      const [toAddress, setToAddress] = useState("");
      const [allowance, setAllowance] = useState("");
      const [callDataApproval, setCallDataApproval] = useState("");
      const [callDataCreatePriceFeedTxn, setCallDataCreatePriceTxn] =
        useState("");
      const [relayerFee, setRelayerFee] = useState("");
      const timer = useRef<NodeJS.Timeout>();

      const handleChange = (e) => {
        const inputValue = e.target.value;

        if (!isNaN(inputValue) && inputValue !== "") {
          setTimesValue(inputValue + " times");
        } else {
          setTimesValue("");
        }
      };

      const closeModal = () => setIsOpen(false);
      const openModal = () => setIsOpen(true);

      const { config: configApprove } = usePrepareSendTransaction({
        request: {
          to: chain
            ? CONTRACT_ADDRESSES[chain?.testnet ? "testnets" : "mainnets"][
                chain?.network
              ]
            : ZERO_ADDRESS,
          data: callDataApproval,
        },
      });

      const { sendTransactionAsync: sendApproveTokenAsyncTxn } =
        useSendTransaction(configApprove);

      const { config: configCreatePriceFeedTxn } = usePrepareSendTransaction({
        request: {
          to: chain
            ? CONTRACT_ADDRESSES[chain?.testnet ? "testnets" : "mainnets"][
                chain?.network
              ]
            : ZERO_ADDRESS,
          data: callDataCreatePriceFeedTxn,
        },
      });

      const { sendTransactionAsync: sendCreatePriceFeedTxn } =
        useSendTransaction(configCreatePriceFeedTxn);

      const fetchAllowance = async () => {
        let contract;
        try {
          contract = new ethers.Contract(
            chain?.testnet && fromToken
              ? TOKEN_ADDRESSES[chain?.network][fromToken]
              : ZERO_ADDRESS,
            erc20ABI,
            provider
          );

          let checkAllowance = await contract.allowance(
            address ? address : ZERO_ADDRESS,
            chain
              ? CONTRACT_ADDRESSES[chain?.testnet ? "testnets" : "mainnets"][
                  chain?.network
                ]
              : ZERO_ADDRESS
          );
          let allowance = checkAllowance.toString();

          setAllowance(allowance);
        } catch {}
      };

      const updateCallDataApproval = () => {
        const ERC20Contract = ERC20_CONTRACT(
          chain ? TOKEN_ADDRESSES[chain?.network]["TEST"] : ZERO_ADDRESS,
          provider
        );

        setCallDataApproval(
          ERC20Contract.interface.encodeFunctionData("approve", [
            chain
              ? CONTRACT_ADDRESSES[chain?.testnet ? "testnets" : "mainnets"][
                  chain?.network
                ]
              : ZERO_ADDRESS,
            ethers.constants.MaxUint256,
          ])
        );
      };

      const updateCallDataCreateTimeTxn = () => {
        const FragContract = FRAGMENTS_CONTRACT(chain, provider);

        try {
          setCallDataCreatePriceTxn(
            FragContract.interface.encodeFunctionData(
              "_createPriceFeedAutomate",
              [
                toAddress ? toAddress : ZERO_ADDRESS,
                amount ? amount : 0,
                tokenPrice,
                chain?.testnet && fromToken
                  ? TOKEN_ADDRESSES[chain?.network][fromToken]
                  : ZERO_ADDRESS,
                chain?.testnet && toChain && toToken
                  ? TOKEN_ADDRESSES[toChain][toToken]
                  : ZERO_ADDRESS,
                toChain ? chainList[toChain].id : chain?.id ? chain?.id : 0,
                toChain
                  ? CONTRACT_ADDRESSES[
                      chain?.testnet ? "testnets" : "mainnets"
                    ][chain?.network]
                  : ZERO_ADDRESS,
                toChain ? CONNEXT_DOMAINS[chain?.network] : ZERO_ADDRESS,
                relayerFee ? relayerFee : 0,
              ]
            )
          );
        } catch {}
      };

      useEffect(() => {
        fetchAllowance();
        updateCallDataApproval();
        updateCallDataCreateTimeTxn();
      }, [
        chain,
        toAddress,
        amount,
        fromToken,
        toChain,
        toToken,
        relayerFee,
        tokenPrice,
      ]);

      useEffect(() => {
        timer.current = setTimeout(async () => {
          const response = await fetch(
            "https://connext-relayer-fee.vercel.app/6648936/1886350457"
          );
          const jsonData = await response.json();
          setRelayerFee(jsonData?.FEE_USD);
        }, 10000);

        return () => {
          clearTimeout(timer.current);
        };
      });

      return (
        <>
          <div className="flex w-full flex-col items-end justify-around gap-2 lg:flex-row">
            <div className="w-full">
              <Label htmlFor="c-1" className="text-piccolo">
                To Address
              </Label>
              <Input
                type="text"
                placeholder="Eg 0x16C85b054619b743c1dCb5B091c2b26B30E037eF"
                id="c-1"
                className="rounded bg-[#262229] text-white"
                onChange={(e) => setToAddress(e.target.value)}
              />
              {selectedCategory === "Recurring" && (
                <div className="mt-4 grid grid-cols-2 gap-x-2">
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
                            Recurring Schedule
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
                            type="numeric"
                            placeholder="1"
                            id="c-1"
                            className="col-span-1 rounded bg-[#262229] text-white"
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

                                <Dropdown.Options className="z-[10] w-full bg-[#262229]">
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
                        <div className="px-6 py-4">
                          <span className="col-span-2 block text-[#AFAEAE]">
                            Ends
                          </span>
                          <Radio
                            value={value}
                            onChange={setValue}
                            name="Form Item"
                            className="mt-4 space-y-6"
                          >
                            <Radio.Option value="option1">
                              <Radio.Indicator />
                              Never
                            </Radio.Option>
                            <Radio.Option
                              value="option2"
                              className="grid grid-cols-3 items-center"
                            >
                              <div className="col-span-1 flex gap-2">
                                <Radio.Indicator />
                                <span>On</span>
                              </div>
                              <div className="relative col-span-2 ml-5 max-w-sm">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                  <svg
                                    aria-hidden="true"
                                    className="h-5 w-5 text-gray-500 dark:text-gray-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                      clip-rule="evenodd"
                                    ></path>
                                  </svg>
                                </div>
                                <input
                                  type="date"
                                  className="block w-full rounded-lg bg-[#262229] p-2.5 pl-10 text-sm "
                                  placeholder="Select date"
                                />
                              </div>
                            </Radio.Option>
                            <Radio.Option
                              value="option2"
                              className="grid grid-cols-3 items-center"
                            >
                              <div className="col-span-1 flex gap-2">
                                <Radio.Indicator />
                                <span>After</span>
                              </div>
                              <div className="relative col-span-2 ml-5 max-w-sm">
                                <Input
                                  type="text"
                                  value={timesValue}
                                  onChange={handleChange}
                                  pattern="[0-9]*"
                                  inputMode="numeric"
                                  className="col-span-1 rounded bg-[#262229] text-white"
                                />
                              </div>
                            </Radio.Option>
                          </Radio>
                        </div>
                        <div className="flex justify-end gap-2 p-4 pt-2">
                          <Button variant="secondary" onClick={closeModal}>
                            Cancel
                          </Button>
                          <Button onClick={closeModal}>Create</Button>
                        </div>
                      </Modal.Panel>
                    </Modal>
                  </div>
                </div>
              )}
              <div className="mt-4 grid grid-cols-2 gap-x-2">
                <Dropdown value={fromToken} onChange={setFromToken}>
                  {({ open }) => (
                    <>
                      <Dropdown.Select
                        open={open}
                        label="From Token"
                        placeholder="Choose a token"
                        className="bg-[#262229]"
                      >
                        {fromToken}
                      </Dropdown.Select>
                      <Dropdown.Options className="z-[10] bg-[#262229]">
                        {chain?.network
                          ? Object.keys(TOKEN_ADDRESSES[chain?.network]).map(
                              (token, index) => (
                                <Dropdown.Option value={token} key={index}>
                                  {({ selected, active }) => {
                                    return (
                                      <MenuItem
                                        isActive={active}
                                        isSelected={selected}
                                      >
                                        <MenuItem.Title>{token}</MenuItem.Title>
                                        <MenuItem.Radio isSelected={selected} />
                                      </MenuItem>
                                    );
                                  }}
                                </Dropdown.Option>
                              )
                            )
                          : null}
                      </Dropdown.Options>
                    </>
                  )}
                </Dropdown>
                <div>
                  <Label htmlFor="c-1" className="text-piccolo">
                    Amount
                  </Label>
                  <Input
                    type="number"
                    placeholder="69"
                    id="c-1"
                    className="rounded bg-[#262229] text-white"
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-x-2">
                <Dropdown value={fromToken} onChange={setFromToken}>
                  {({ open }) => (
                    <>
                      <Dropdown.Select
                        open={open}
                        label="Token Pair 1"
                        placeholder="Choose a token"
                        className="bg-[#262229]"
                      >
                        {fromToken?.name}
                      </Dropdown.Select>
                      <Dropdown.Options className="z-10 bg-[#262229]">
                        {tokens.map((token, index) => (
                          <Dropdown.Option value={token} key={index}>
                            {({ selected, active }) => {
                              return (
                                <MenuItem
                                  isActive={active}
                                  isSelected={selected}
                                >
                                  <MenuItem.Title>{token.name}</MenuItem.Title>
                                  <MenuItem.Radio isSelected={selected} />
                                </MenuItem>
                              );
                            }}
                          </Dropdown.Option>
                        ))}
                      </Dropdown.Options>
                    </>
                  )}
                </Dropdown>
                <Dropdown value={fromToken} onChange={setFromToken}>
                  {({ open }) => (
                    <>
                      <Dropdown.Select
                        open={open}
                        label="Token Pair 2"
                        placeholder="Choose a token"
                        className="bg-[#262229]"
                      >
                        {fromToken?.name}
                      </Dropdown.Select>
                      <Dropdown.Options className="z-[10] bg-[#262229]">
                        {tokens.map((token, index) => (
                          <Dropdown.Option value={token} key={index}>
                            {({ selected, active }) => {
                              return (
                                <MenuItem
                                  isActive={active}
                                  isSelected={selected}
                                >
                                  <MenuItem.Title>{token.name}</MenuItem.Title>
                                  <MenuItem.Radio isSelected={selected} />
                                </MenuItem>
                              );
                            }}
                          </Dropdown.Option>
                        ))}
                      </Dropdown.Options>
                    </>
                  )}
                </Dropdown>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-x-2">
                <div>
                  <Label htmlFor="c-1" className="text-piccolo">
                    Token Price
                  </Label>
                  <Input
                    type="number"
                    placeholder="69"
                    id="c-1"
                    className="rounded bg-[#262229] text-white"
                    onChange={(e) => setTokenPrice(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-x-2">
                <Dropdown
                  value={toChain}
                  onChange={(e) => {
                    setToChain(e);
                    setToToken("");
                  }}
                >
                  {({ open }) => (
                    <>
                      <Dropdown.Select
                        open={open}
                        label="To Chain"
                        placeholder="Choose a Chain"
                        className="bg-[#262229]"
                      >
                        {toChain}
                      </Dropdown.Select>
                      <Dropdown.Options className="z-10 bg-[#262229]">
                        {chain
                          ? Object.keys(
                              CONTRACT_ADDRESSES[
                                chain?.testnet ? "testnets" : "mainnets"
                              ]
                            ).map((chain, index) => (
                              <Dropdown.Option value={chain} key={index}>
                                {({ selected, active }) => {
                                  return (
                                    <MenuItem
                                      isActive={active}
                                      isSelected={selected}
                                    >
                                      <MenuItem.Title>{chain}</MenuItem.Title>
                                      <MenuItem.Radio isSelected={selected} />
                                    </MenuItem>
                                  );
                                }}
                              </Dropdown.Option>
                            ))
                          : null}
                      </Dropdown.Options>
                    </>
                  )}
                </Dropdown>
                <Dropdown value={toToken} onChange={setToToken}>
                  {({ open }) => (
                    <>
                      <Dropdown.Select
                        open={open}
                        label="To Token"
                        placeholder={
                          toChain
                            ? "Choose a token"
                            : "Please set To Chain first"
                        }
                        className="bg-[#262229]"
                      >
                        {toToken}
                      </Dropdown.Select>
                      <Dropdown.Options className="z-[10] bg-[#262229]">
                        {chain?.network
                          ? toChain
                            ? Object.keys(TOKEN_ADDRESSES[toChain]).map(
                                (token, index) => (
                                  <Dropdown.Option value={token} key={index}>
                                    {({ selected, active }) => {
                                      return (
                                        <MenuItem
                                          isActive={active}
                                          isSelected={selected}
                                        >
                                          <MenuItem.Title>
                                            {token}
                                          </MenuItem.Title>
                                          <MenuItem.Radio
                                            isSelected={selected}
                                          />
                                        </MenuItem>
                                      );
                                    }}
                                  </Dropdown.Option>
                                )
                              )
                            : null
                          : null}
                      </Dropdown.Options>
                    </>
                  )}
                </Dropdown>
              </div>
            </div>
          </div>
          <Button
            size="md"
            className=" mt-7 rounded-lg bg-[#1ae77a] text-black"
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
                  sendCreatePriceFeedTxn?.();
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
          </Button>
        </>
      );
    },
  },
  "Gas Price Estimate": {
    id: 2,
    category: ["One Time"],
    element: (selectedCategory: Category) => {
      const [fromToken, setFromToken] = useState<Tokens | null>(null);
      const [isOpen, setIsOpen] = useState(false);
      const [value, setValue] = useState("");
      const [intervalType, setIntervalType] = useState<Options | null>({
        value: "days",
        label: "days",
      });
      const [timesValue, setTimesValue] = useState("");

      const handleChange = (e) => {
        const inputValue = e.target.value;

        // Check if the input value is a valid number
        if (!isNaN(inputValue) && inputValue !== "") {
          setTimesValue(inputValue + " times");
        } else {
          setTimesValue("");
        }
      };

      const closeModal = () => setIsOpen(false);
      const openModal = () => setIsOpen(true);

      return (
        <div className="flex w-full flex-col items-end justify-around gap-2 lg:flex-row">
          <div className="w-full">
            <Label htmlFor="c-1" className="text-piccolo">
              To Address
            </Label>
            <Input
              type="text"
              placeholder="Eg 0x16C85b054619b743c1dCb5B091c2b26B30E037eF"
              id="c-1"
              className="rounded bg-[#262229] text-white"
            />
            {selectedCategory === "Recurring" && (
              <div className="mt-4 grid grid-cols-2 gap-x-2">
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
                          Recurring Schedule
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
                          type="numeric"
                          placeholder="1"
                          id="c-1"
                          className="col-span-1 rounded bg-[#262229] text-white"
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

                              <Dropdown.Options className="z-[10] w-full bg-[#262229]">
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
                      <div className="px-6 py-4">
                        <span className="col-span-2 block text-[#AFAEAE]">
                          Ends
                        </span>
                        <Radio
                          value={value}
                          onChange={setValue}
                          name="Form Item"
                          className="mt-4 space-y-6"
                        >
                          <Radio.Option value="option1">
                            <Radio.Indicator />
                            Never
                          </Radio.Option>
                          <Radio.Option
                            value="option2"
                            className="grid grid-cols-3 items-center"
                          >
                            <div className="col-span-1 flex gap-2">
                              <Radio.Indicator />
                              <span>On</span>
                            </div>
                            <div className="relative col-span-2 ml-5 max-w-sm">
                              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg
                                  aria-hidden="true"
                                  className="h-5 w-5 text-gray-500 dark:text-gray-400"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                    clip-rule="evenodd"
                                  ></path>
                                </svg>
                              </div>
                              <input
                                type="date"
                                className="block w-full rounded-lg bg-[#262229] p-2.5 pl-10 text-sm "
                                placeholder="Select date"
                              />
                            </div>
                          </Radio.Option>
                          <Radio.Option
                            value="option2"
                            className="grid grid-cols-3 items-center"
                          >
                            <div className="col-span-1 flex gap-2">
                              <Radio.Indicator />
                              <span>After</span>
                            </div>
                            <div className="relative col-span-2 ml-5 max-w-sm">
                              <Input
                                type="text"
                                value={timesValue}
                                onChange={handleChange}
                                pattern="[0-9]*"
                                inputMode="numeric"
                                className="col-span-1 rounded bg-[#262229] text-white"
                              />
                            </div>
                          </Radio.Option>
                        </Radio>
                      </div>
                      <div className="flex justify-end gap-2 p-4 pt-2">
                        <Button variant="secondary" onClick={closeModal}>
                          Cancel
                        </Button>
                        <Button onClick={closeModal}>Create</Button>
                      </div>
                    </Modal.Panel>
                  </Modal>
                </div>
              </div>
            )}
            <div className="mt-4 grid grid-cols-2 gap-x-2">
              <div>
                <Label htmlFor="c-1" className="text-piccolo">
                  Gas Price
                </Label>
                <Input
                  type="numeric"
                  placeholder="69"
                  id="c-1"
                  className="rounded bg-[#262229] text-white"
                />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-x-2">
              <Dropdown value={fromToken} onChange={setFromToken}>
                {({ open }) => (
                  <>
                    <Dropdown.Select
                      open={open}
                      label="From Token"
                      placeholder="Choose a token"
                      className="bg-[#262229]"
                    >
                      {fromToken?.name}
                    </Dropdown.Select>
                    <Dropdown.Options className="z-[10] bg-[#262229]">
                      {tokens.map((token, index) => (
                        <Dropdown.Option value={token} key={index}>
                          {({ selected, active }) => {
                            return (
                              <MenuItem isActive={active} isSelected={selected}>
                                <MenuItem.Title>{token.name}</MenuItem.Title>
                                <MenuItem.Radio isSelected={selected} />
                              </MenuItem>
                            );
                          }}
                        </Dropdown.Option>
                      ))}
                    </Dropdown.Options>
                  </>
                )}
              </Dropdown>
              <div>
                <Label htmlFor="c-1" className="text-piccolo">
                  Amount
                </Label>
                <Input
                  type="numeric"
                  placeholder="69"
                  id="c-1"
                  className="rounded bg-[#262229] text-white"
                />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-x-2">
              <Dropdown value={fromToken} onChange={setFromToken}>
                {({ open }) => (
                  <>
                    <Dropdown.Select
                      open={open}
                      label="To Chain"
                      placeholder="Choose a Chain"
                      className="bg-[#262229]"
                    >
                      {fromToken?.name}
                    </Dropdown.Select>
                    <Dropdown.Options className="z-10 bg-[#262229]">
                      {tokens.map((token, index) => (
                        <Dropdown.Option value={token} key={index}>
                          {({ selected, active }) => {
                            return (
                              <MenuItem isActive={active} isSelected={selected}>
                                <MenuItem.Title>{token.name}</MenuItem.Title>
                                <MenuItem.Radio isSelected={selected} />
                              </MenuItem>
                            );
                          }}
                        </Dropdown.Option>
                      ))}
                    </Dropdown.Options>
                  </>
                )}
              </Dropdown>
              <Dropdown value={fromToken} onChange={setFromToken}>
                {({ open }) => (
                  <>
                    <Dropdown.Select
                      open={open}
                      label="To Token"
                      placeholder="Choose a token"
                      className="bg-[#262229]"
                    >
                      {fromToken?.name}
                    </Dropdown.Select>
                    <Dropdown.Options className="z-[10] bg-[#262229]">
                      {tokens.map((token, index) => (
                        <Dropdown.Option value={token} key={index}>
                          {({ selected, active }) => {
                            return (
                              <MenuItem isActive={active} isSelected={selected}>
                                <MenuItem.Title>{token.name}</MenuItem.Title>
                                <MenuItem.Radio isSelected={selected} />
                              </MenuItem>
                            );
                          }}
                        </Dropdown.Option>
                      ))}
                    </Dropdown.Options>
                  </>
                )}
              </Dropdown>
            </div>
          </div>
        </div>
      );
    },
  },
  "ABI Functions": {
    id: 3,
    category: ["One Time"],
    element: (selectedCategory: Category) => {
      const [fromToken, setFromToken] = useState<Tokens | null>(null);
      const [isOpen, setIsOpen] = useState(false);
      const [timesValue, setTimesValue] = useState("");
      const [intervalType, setIntervalType] = useState<Options | null>({
        value: "days",
        label: "days",
      });
      const [value, setValue] = useState("");

      const handleChange = (e) => {
        const inputValue = e.target.value;

        // Check if the input value is a valid number
        if (!isNaN(inputValue) && inputValue !== "") {
          setTimesValue(inputValue + " times");
        } else {
          setTimesValue("");
        }
      };

      const closeModal = () => setIsOpen(false);
      const openModal = () => setIsOpen(true);

      return (
        <div className="flex w-full flex-col items-end justify-around gap-2 lg:flex-row">
          <div className="w-full">
            <Label htmlFor="c-1" className="text-piccolo">
              To Address
            </Label>
            <Input
              type="text"
              placeholder="Eg 0x16C85b054619b743c1dCb5B091c2b26B30E037eF"
              id="c-1"
              className="rounded bg-[#262229] text-white"
            />
            {selectedCategory === "Recurring" && (
              <div className="mt-4 grid grid-cols-2 gap-x-2">
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
                          Recurring Schedule
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
                          type="numeric"
                          placeholder="1"
                          id="c-1"
                          className="col-span-1 rounded bg-[#262229] text-white"
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

                              <Dropdown.Options className="z-[10] w-full bg-[#262229]">
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
                      <div className="px-6 py-4">
                        <span className="col-span-2 block text-[#AFAEAE]">
                          Ends
                        </span>
                        <Radio
                          value={value}
                          onChange={setValue}
                          name="Form Item"
                          className="mt-4 space-y-6"
                        >
                          <Radio.Option value="option1">
                            <Radio.Indicator />
                            Never
                          </Radio.Option>
                          <Radio.Option
                            value="option2"
                            className="grid grid-cols-3 items-center"
                          >
                            <div className="col-span-1 flex gap-2">
                              <Radio.Indicator />
                              <span>On</span>
                            </div>
                            <div className="relative col-span-2 ml-5 max-w-sm">
                              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg
                                  aria-hidden="true"
                                  className="h-5 w-5 text-gray-500 dark:text-gray-400"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                    clip-rule="evenodd"
                                  ></path>
                                </svg>
                              </div>
                              <input
                                type="date"
                                className="block w-full rounded-lg bg-[#262229] p-2.5 pl-10 text-sm "
                                placeholder="Select date"
                              />
                            </div>
                          </Radio.Option>
                          <Radio.Option
                            value="option2"
                            className="grid grid-cols-3 items-center"
                          >
                            <div className="col-span-1 flex gap-2">
                              <Radio.Indicator />
                              <span>After</span>
                            </div>
                            <div className="relative col-span-2 ml-5 max-w-sm">
                              <Input
                                type="text"
                                value={timesValue}
                                onChange={handleChange}
                                pattern="[0-9]*"
                                inputMode="numeric"
                                className="col-span-1 rounded bg-[#262229] text-white"
                              />
                            </div>
                          </Radio.Option>
                        </Radio>
                      </div>
                      <div className="flex justify-end gap-2 p-4 pt-2">
                        <Button variant="secondary" onClick={closeModal}>
                          Cancel
                        </Button>
                        <Button onClick={closeModal}>Create</Button>
                      </div>
                    </Modal.Panel>
                  </Modal>
                </div>
              </div>
            )}
            <div className="mt-4">
              <Label htmlFor="c-1" className="text-piccolo">
                Contract Address
              </Label>
              <Input
                type="text"
                placeholder="Eg 0x332dE499eF93F6dc3674896aA4Ee934067917257"
                id="c-1"
                className="rounded bg-[#262229] text-white"
              />
            </div>
            <div className="mt-4">
              <Dropdown value={fromToken} onChange={setFromToken}>
                {({ open }) => (
                  <>
                    <Dropdown.Select
                      open={open}
                      label="Functions"
                      placeholder="Choose a function"
                      className="bg-[#262229]"
                    >
                      {fromToken?.name}
                    </Dropdown.Select>
                    <Dropdown.Options className="z-[10] bg-[#262229]">
                      {tokens.map((token, index) => (
                        <Dropdown.Option value={token} key={index}>
                          {({ selected, active }) => {
                            return (
                              <MenuItem isActive={active} isSelected={selected}>
                                <MenuItem.Title>{token.name}</MenuItem.Title>
                                <MenuItem.Radio isSelected={selected} />
                              </MenuItem>
                            );
                          }}
                        </Dropdown.Option>
                      ))}
                    </Dropdown.Options>
                  </>
                )}
              </Dropdown>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-x-2">
              <Dropdown value={fromToken} onChange={setFromToken}>
                {({ open }) => (
                  <>
                    <Dropdown.Select
                      open={open}
                      label="From Token"
                      placeholder="Choose a token"
                      className="bg-[#262229]"
                    >
                      {fromToken?.name}
                    </Dropdown.Select>
                    <Dropdown.Options className="z-[10] bg-[#262229]">
                      {tokens.map((token, index) => (
                        <Dropdown.Option value={token} key={index}>
                          {({ selected, active }) => {
                            return (
                              <MenuItem isActive={active} isSelected={selected}>
                                <MenuItem.Title>{token.name}</MenuItem.Title>
                                <MenuItem.Radio isSelected={selected} />
                              </MenuItem>
                            );
                          }}
                        </Dropdown.Option>
                      ))}
                    </Dropdown.Options>
                  </>
                )}
              </Dropdown>
              <div>
                <Label htmlFor="c-1" className="text-piccolo">
                  Amount
                </Label>
                <Input
                  type="numeric"
                  placeholder="69"
                  id="c-1"
                  className="rounded bg-[#262229] text-white"
                />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-x-2">
              <Dropdown value={fromToken} onChange={setFromToken}>
                {({ open }) => (
                  <>
                    <Dropdown.Select
                      open={open}
                      label="To Chain"
                      placeholder="Choose a Chain"
                      className="bg-[#262229]"
                    >
                      {fromToken?.name}
                    </Dropdown.Select>
                    <Dropdown.Options className="z-10 bg-[#262229]">
                      {tokens.map((token, index) => (
                        <Dropdown.Option value={token} key={index}>
                          {({ selected, active }) => {
                            return (
                              <MenuItem isActive={active} isSelected={selected}>
                                <MenuItem.Title>{token.name}</MenuItem.Title>
                                <MenuItem.Radio isSelected={selected} />
                              </MenuItem>
                            );
                          }}
                        </Dropdown.Option>
                      ))}
                    </Dropdown.Options>
                  </>
                )}
              </Dropdown>
              <Dropdown value={fromToken} onChange={setFromToken}>
                {({ open }) => (
                  <>
                    <Dropdown.Select
                      open={open}
                      label="To Token"
                      placeholder="Choose a token"
                      className="bg-[#262229]"
                    >
                      {fromToken?.name}
                    </Dropdown.Select>
                    <Dropdown.Options className="z-[10] bg-[#262229]">
                      {tokens.map((token, index) => (
                        <Dropdown.Option value={token} key={index}>
                          {({ selected, active }) => {
                            return (
                              <MenuItem isActive={active} isSelected={selected}>
                                <MenuItem.Title>{token.name}</MenuItem.Title>
                                <MenuItem.Radio isSelected={selected} />
                              </MenuItem>
                            );
                          }}
                        </Dropdown.Option>
                      ))}
                    </Dropdown.Options>
                  </>
                )}
              </Dropdown>
            </div>
          </div>
        </div>
      );
    },
  },
};

export default panels;
