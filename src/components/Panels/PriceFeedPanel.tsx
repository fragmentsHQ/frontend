import { Tab } from '@headlessui/react';
import { Dropdown, Input, Label, MenuItem } from '@heathmont/moon-core-tw';
import { Button } from '@heathmont/moon-core-tw';
import { ethers } from 'ethers';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useAccount, useNetwork } from 'wagmi';

import usePriceFeed from '@/hooks/usePriceFeed';

import { classNames, gasModes } from '@/components/Panels';
import TokenTable from '@/components/tables/TokenTable';

import useGlobalStore from '@/store';

import {
  CONDITIONAL_CONTRACT_ADDRESSES,
  ERC20_CONTRACT,
  TOKEN_ADDRESSES,
  ZERO_ADDRESS,
} from '../../constants/constants';
import { SourceContext } from '../../hooks/context';
import { Options } from '../../types/types';

const PriceFeedPanel = ({
  selectedCategory,
  showThisSection,
  setShowThisSection,
  dataRows,
}) => {
  const [showTransaction, setShowTransaction] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const { chain } = useNetwork();
  const { address } = useAccount();
  const provider = ethers.getDefaultProvider();
  const priceFeed = usePriceFeed();
  const { sourceData, setSourceData } = useContext(SourceContext);
  const [isOpen, setIsOpen] = useState(false);
  const [intervalType, setIntervalType] = useState<Options | null>({
    value: 'days',
    label: 'days',
  });
  const [token1, setToken1] = useState(
    Object.values(TOKEN_ADDRESSES[chain.id])[0]
  );
  const [token2, setToken2] = useState(
    Object.values(TOKEN_ADDRESSES[chain.id])[1]
  );
  const [token1Price, setToken1Price] = useState('');
  const [token2Price, setToken2Price] = useState('');
  const [ratio, setRatio] = useState(0);
  const [startTime, setStartTime] = useState<string | null>('');
  const [cycles, setCycles] = useState<string | null>('');
  const [intervalCount, setIntervalCount] = useState('1');
  const [callDataApproval, setCallDataApproval] = useState<`0x${string}`>('0x');
  const [callDataPriceFeedTxn, setCallDataPriceFeedTxn] =
    useState<`0x${string}`>('0x');
  const interval = useRef<NodeJS.Timer>();

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  // const {
  //   data: allowance,
  //   isError,
  //   isLoading,
  // } = useContractRead({
  //   address:
  //     chain && sourceData.sourceToken
  //       ? TOKEN_ADDRESSES[chain?.id][sourceData.sourceToken].address
  //       : ZERO_ADDRESS,
  //   abi: erc20ABI,
  //   functionName: 'allowance',
  //   args: [
  //     address ? address : ZERO_ADDRESS,
  //     chain
  //       ? CONDITIONAL_CONTRACT_ADDRESSES[
  //           chain?.testnet ? 'testnets' : 'mainnets'
  //         ][chain?.id]
  //       : ZERO_ADDRESS,
  //   ],
  //   watch: true,
  // });

  // const {
  //   // data,
  //   // error,
  //   // isLoading,
  //   // isError,
  //   sendTransactionAsync: sendApproveTokenAsyncTxn,
  // } = useSendTransaction({
  //   to:
  //     chain && sourceData.sourceToken
  //       ? TOKEN_ADDRESSES[chain?.id][sourceData.sourceToken].address
  //       : ZERO_ADDRESS,
  //   data: callDataApproval,
  //   account: address,
  //   value: BigInt(0),
  // });

  // const {
  //   // data,
  //   // error,
  //   // isLoading,
  //   // isError,
  //   sendTransactionAsync: sendCreatePriceFeedAsyncTxn,
  // } = useSendTransaction({
  //   to: chain
  //     ? CONDITIONAL_CONTRACT_ADDRESSES[
  //         chain?.testnet ? 'testnets' : 'mainnets'
  //       ][chain?.id]
  //     : ZERO_ADDRESS,
  //   data: callDataPriceFeedTxn,
  //   account: address,
  //   value: BigInt(0),
  // });

  const updateCallDataApproval = () => {
    const ERC20Contract = ERC20_CONTRACT(
      chain && sourceData.sourceToken
        ? TOKEN_ADDRESSES[chain?.id][sourceData.sourceToken].address
        : ZERO_ADDRESS,
      provider
    );

    setCallDataApproval(
      ERC20Contract.interface.encodeFunctionData('approve', [
        chain
          ? CONDITIONAL_CONTRACT_ADDRESSES[
              chain?.testnet ? 'testnets' : 'mainnets'
            ][chain?.id]
          : ZERO_ADDRESS,
        ethers.constants.MaxUint256,
      ]) as `0x${string}`
    );
  };

  // const updateCallDataPriceFeedTxn = () => {
  //   const ConditionalContract = CONDITIONAL_CONTRACT(chain, provider);

  //   try {
  //     // console.log("here boi: ", [
  //     //   [
  //     //     ...dataRows
  //     //       .slice(0, -1)
  //     //       .map((e) => (e.toAddress ? e.toAddress : ZERO_ADDRESS)),
  //     //   ],
  //     //   [
  //     //     ...dataRows
  //     //       .slice(0, -1)
  //     //       .map((e) =>
  //     //         e.amountOfSourceToken
  //     //           ? parseUnits(
  //     //               e.amountOfSourceToken,
  //     //               TOKEN_ADDRESSES[chain?.id][sourceData.sourceToken]
  //     //                 .decimals
  //     //             )
  //     //           : "0"
  //     //       ),
  //     //   ],
  //     //   ratio ? parseUnits(ratio, 18) : 0,
  //     //   [
  //     //     ...dataRows.slice(0, -1).map((e) => ({
  //     //       _fromToken:
  //     //         chain?.testnet && sourceData.sourceToken
  //     //           ? TOKEN_ADDRESSES[chain?.id][sourceData.sourceToken]
  //     //               .address
  //     //           : ZERO_ADDRESS,
  //     //       _toToken:
  //     //         chain?.testnet && sourceData.sourceToken && e.destinationChain
  //     //           ? TOKEN_ADDRESSES[e.destinationChain][sourceData.sourceToken]
  //     //               .address
  //     //           : ZERO_ADDRESS,
  //     //       _tokenA: token1
  //     //         ? TOKEN_ADDRESSES_PRICE_FEEDS[token1]
  //     //         : ZERO_ADDRESS,
  //     //       _tokenB: token2
  //     //         ? TOKEN_ADDRESSES_PRICE_FEEDS[token2]
  //     //         : ZERO_ADDRESS,
  //     //     })),
  //     //   ],
  //     //   [
  //     //     ...dataRows.slice(0, -1).map((e) => ({
  //     //       _toChain: e.destinationChain
  //     //         ? chainList[e.destinationChain].id
  //     //         : ZERO_ADDRESS,
  //     //       _destinationDomain: e.destinationChain
  //     //         ? CONNEXT_DOMAINS[e.destinationChain]
  //     //         : ZERO_ADDRESS,
  //     //       _destinationContract: e.destinationChain
  //     //         ? CONDITIONAL_CONTRACT_ADDRESSES[
  //     //             chain?.testnet ? "testnets" : "mainnets"
  //     //           ][e.destinationChain]
  //     //         : ZERO_ADDRESS,
  //     //     })),
  //     //   ],
  //     //   {
  //     //     _cycles: cycles ? cycles : 1,
  //     //     _startTime: startTime
  //     //       ? startTime
  //     //       : Math.trunc(Date.now() / 1000) + 3600,
  //     //     _interval:
  //     //       Number(intervalCount) *
  //     //       (intervalType.value === "days"
  //     //         ? 86400
  //     //         : intervalType.value === "months"
  //     //         ? 2629800
  //     //         : intervalType.value === "weeks"
  //     //         ? 604800
  //     //         : intervalType.value === "years"
  //     //         ? 31536000
  //     //         : 1),
  //     //     _web3FunctionHash: "QmSfTUv1XZmsVVRTNWtZqVC78mMPzi5hjSJTHbFHvzrc9p",
  //     //   },
  //     // ]);
  //     setCallDataPriceFeedTxn(
  //       ConditionalContract.interface.encodeFunctionData(
  //         '_createMultiplePriceFeedAutomate',
  //         [
  //           [
  //             ...dataRows
  //               .slice(0, -1)
  //               .map((e) => (e.toAddress ? e.toAddress : ZERO_ADDRESS)),
  //           ],
  //           [
  //             ...dataRows
  //               .slice(0, -1)
  //               .map((e) =>
  //                 e.amountOfSourceToken
  //                   ? parseUnits(
  //                       e.amountOfSourceToken,
  //                       TOKEN_ADDRESSES[chain?.id][sourceData.sourceToken]
  //                         .decimals
  //                     )
  //                   : '0'
  //               ),
  //           ],
  //           ratio ? ratio : 0,
  //           [
  //             ...dataRows.slice(0, -1).map((e) => ({
  //               _fromToken:
  //                 chain?.testnet && sourceData.sourceToken
  //                   ? TOKEN_ADDRESSES[chain?.id][sourceData.sourceToken].address
  //                   : ZERO_ADDRESS,
  //               _toToken:
  //                 chain?.testnet && sourceData.sourceToken && e.destinationChain
  //                   ? TOKEN_ADDRESSES[e.destinationChain][
  //                       sourceData.sourceToken
  //                     ].address
  //                   : ZERO_ADDRESS,
  //               _tokenA: token1
  //                 ? TOKEN_ADDRESSES_PRICE_FEEDS[token1]
  //                 : ZERO_ADDRESS,
  //               _tokenB: token2
  //                 ? TOKEN_ADDRESSES_PRICE_FEEDS[token2]
  //                 : ZERO_ADDRESS,
  //             })),
  //           ],
  //           [
  //             ...dataRows.slice(0, -1).map((e) => ({
  //               _toChain: e.destinationChain
  //                 ? chainList[e.destinationChain].id
  //                 : ZERO_ADDRESS,
  //               _destinationDomain: e.destinationChain
  //                 ? CONNEXT_DOMAINS[e.destinationChain]
  //                 : ZERO_ADDRESS,
  //               _destinationContract: e.destinationChain
  //                 ? CONDITIONAL_CONTRACT_ADDRESSES[
  //                     chain?.testnet ? 'testnets' : 'mainnets'
  //                   ][e.destinationChain]
  //                 : ZERO_ADDRESS,
  //             })),
  //           ],
  //           {
  //             _cycles: cycles ? cycles : 1,
  //             _startTime: startTime
  //               ? startTime
  //               : Math.trunc(Date.now() / 1000) + 3600,
  //             _interval:
  //               Number(intervalCount) *
  //               (intervalType.value === 'days'
  //                 ? 86400
  //                 : intervalType.value === 'months'
  //                 ? 2629800
  //                 : intervalType.value === 'weeks'
  //                 ? 604800
  //                 : intervalType.value === 'years'
  //                 ? 31536000
  //                 : 1),
  //             _web3FunctionHash:
  //               'QmaYK9kW85VsZUusYHGqzJQizu3Kifs73Np217LfLLhQDH',
  //           },
  //         ]
  //       ) as `0x${string}`
  //     );
  //   } catch {}
  // };

  // useEffect(() => {
  //   updateCallDataApproval();
  //   updateCallDataPriceFeedTxn();
  // }, [
  //   chain,
  //   sourceData.sourceToken,
  //   dataRows,
  //   cycles,
  //   intervalCount,
  //   intervalType,
  //   token1Price,
  //   token2Price,
  //   startTime,
  //   token1,
  //   token2,
  //   ratio,
  // ]);

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
  React.useEffect(() => {
    if (chain) {
      priceFeed.fetchAllowance(chain);
    }
  }, []);

  const { enteredRows } = useGlobalStore();
  const isValid = enteredRows.every(
    (item) =>
      item.amount_of_source_token !== '' &&
      item.destination_chain !== '' &&
      item.destination_token !== '' &&
      item.to_address
  );

  console.log('====================================');
  console.log(token1, Object.values(TOKEN_ADDRESSES[chain.id])[1]);
  console.log('====================================');
  return (
    <>
      <div className='w-full flex-col'>
        <div className='grid w-full grid-cols-3 gap-3'>
          <div>
            <Label htmlFor='c-1' className='text-piccolo'>
              First Token
            </Label>
            <div className='relative'>
              <Input
                type='text'
                // placeholder="E.g. 9234324712"
                value={token1Price}
                id='c-1'
                className='rounded bg-[#262229] text-white'
                onChange={(e) => {
                  setToken1Price(e.target.value);
                }}
              />
              <Dropdown
                value={token1}
                onChange={setToken1}
                size='xl'
                className='w-22 absolute right-[5px] top-1/2 z-10 col-span-2 -translate-y-1/2 rounded-[10px] bg-[#464646]'
              >
                {({ open }) => (
                  <>
                    <Dropdown.Select
                      open={open}
                      data-test='data-test'
                      className=' h-[1.8rem]  rounded-[10px] bg-[#464646]'
                    >
                      {token1.name}
                    </Dropdown.Select>

                    <Dropdown.Options className='z-[10] w-full min-w-full rounded-md bg-[#464646]'>
                      {Object.values(TOKEN_ADDRESSES[chain?.id]).map(
                        (token, index) => (
                          <Dropdown.Option value={token} key={index}>
                            {({ selected, active }) => (
                              <MenuItem isActive={active} isSelected={selected}>
                                {token.name}
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
            <Label htmlFor='c-1' className='text-piccolo'>
              Second Token
            </Label>
            <div className='relative'>
              <Input
                type='text'
                // placeholder="E.g. 9234324712"
                value={token2Price}
                id='c-1'
                className='rounded bg-[#262229] text-white'
                onChange={(e) => {
                  setToken2Price(e.target.value);
                  setShowTable(true);
                }}
              />
              <Dropdown
                value={token2}
                onChange={setToken2}
                size='xl'
                className='w-22 absolute right-0 top-1/2 z-10 col-span-2 -translate-y-1/2 rounded-[10px] bg-[#464646]'
              >
                {({ open }) => (
                  <>
                    <Dropdown.Select
                      open={open}
                      data-test='data-test'
                      className=' h-[1.8rem] rounded-[10px] bg-[#464646]'
                    >
                      {token2.name}
                    </Dropdown.Select>

                    <Dropdown.Options className='z-[10] w-full min-w-full rounded-md bg-[#464646]'>
                      {Object.values(TOKEN_ADDRESSES[chain?.id]).map(
                        (token, index) => (
                          <Dropdown.Option value={token} key={index}>
                            {({ selected, active }) => (
                              <MenuItem isActive={active} isSelected={selected}>
                                {token.name}
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
            <Label htmlFor='c-1' className='text-piccolo'>
              Ratio
            </Label>
            <Input
              type='number'
              placeholder='1'
              value={ratio}
              disabled
              id='c-1'
              className='rounded bg-[#262229] text-white'
              onChange={(e) => {
                setRatio(Number(e.target.value));
              }}
            />
          </div>
        </div>
      </div>
      {showTable && (
        <TokenTable
          setShowThisSection={() => {
            setShowTransaction(true);
          }}
        />
      )}
      {showTable && isValid && (
        <div className={classNames('w-11/12  px-2 transition-opacity sm:px-0')}>
          <div className='rounded-md bg-[#282828] p-5'>
            <div className='m-auto pt-3 text-center'>
              Choose how the task should be paid for. The cost of each execution
              equals the network fee.
            </div>
            <div className='grid grid-cols-1 gap-x-2 pt-8'>
              <Tab.Group
              // onChange={(idx) => {
              //   setSourceData({ ...sourceData, gasMode: gasModes[idx] });
              // }}
              >
                <Tab.List className='flex gap-[1px] space-x-1 rounded-xl bg-[#464646] p-[5px]'>
                  {gasModes.map((mode) => (
                    <Tab
                      key={mode}
                      className={({ selected }) =>
                        classNames(
                          'w-full rounded-xl py-2.5 text-sm font-bold leading-5',
                          selected
                            ? 'bg-[#00FFA9] text-black shadow'
                            : 'bg-[#464646] text-[#6B6B6B]'
                        )
                      }
                      disabled={mode === 'Forward'}
                    >
                      {mode === 'Forward'
                        ? 'Forward Paying Gas'
                        : 'Pay from Gas Account'}
                    </Tab>
                  ))}
                </Tab.List>
              </Tab.Group>
            </div>
            <Button
              size='sm'
              className='m-auto mt-16 h-12 w-[14rem] rounded-lg bg-[#2BFFB1] text-lg font-bold text-black disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-200'
              onClick={() => {
                priceFeed.handleApprove();
              }}
              disabled={priceFeed.isApproved}
            >
              Approve Tokens
            </Button>
            <Button
              size='sm'
              className='m-auto mt-8 h-12 w-[14rem] rounded-lg bg-[#2BFFB1] text-lg font-bold  text-black disabled:cursor-not-allowed'
              onClick={() => {
                priceFeed.handleConditionalExecution({
                  ratio: ratio,
                  token1: token1.address,
                  token2: token2.address,
                });
              }}
              disabled={!priceFeed.isApproved}
            >
              Confirm
            </Button>
          </div>
        </div>
      )}

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
};

export default PriceFeedPanel;
