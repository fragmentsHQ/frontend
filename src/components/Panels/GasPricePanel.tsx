import {
  Button,
  Dropdown,
  Input,
  Label,
  MenuItem,
  Modal,
} from '@heathmont/moon-core-tw';
import { ControlsCloseSmall } from '@heathmont/moon-icons-tw';
import { ethers } from 'ethers';
import { parseUnits } from 'ethers/lib/utils.js';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  erc20ABI,
  useAccount,
  useContractRead,
  useNetwork,
  useSendTransaction,
} from 'wagmi';
import * as chainList from 'wagmi/chains';

import {
  CONDITIONAL_CONTRACT,
  CONDITIONAL_CONTRACT_ADDRESSES,
  CONNEXT_DOMAINS,
  ERC20_CONTRACT,
  TOKEN_ADDRESSES,
  ZERO_ADDRESS,
} from '../../constants/constants';
import { SourceContext } from '../../hooks/context';
import { Options } from '../../types/types';

const GasPricePanel = ({
  selectedCategory,
  showThisSection,
  setShowThisSection,
  dataRows,
}) => {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const provider = ethers.getDefaultProvider();

  const { sourceData, setSourceData } = useContext(SourceContext);
  const [isOpen, setIsOpen] = useState(false);
  const [intervalType, setIntervalType] = useState<Options | null>({
    value: 'days',
    label: 'days',
  });
  const [gasPrice, setGasPrice] = useState(0);
  const [startTime, setStartTime] = useState<string | null>('');
  const [cycles, setCycles] = useState<string | null>('');
  const [intervalCount, setIntervalCount] = useState('1');
  const [callDataApproval, setCallDataApproval] = useState<`0x${string}`>('0x');
  const [callDataPriceFeedTxn, setCallDataPriceFeedTxn] =
    useState<`0x${string}`>('0x');
  const interval = useRef<NodeJS.Timer>();

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
    functionName: 'allowance',
    args: [
      address ? address : ZERO_ADDRESS,
      chain
        ? CONDITIONAL_CONTRACT_ADDRESSES[
            chain?.testnet ? 'testnets' : 'mainnets'
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
    sendTransactionAsync: sendCreateGasPriceAsyncTxn,
  } = useSendTransaction({
    to: chain
      ? CONDITIONAL_CONTRACT_ADDRESSES[
          chain?.testnet ? 'testnets' : 'mainnets'
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

  const updateCallDataGasPriceTxn = () => {
    const ConditionalContract = CONDITIONAL_CONTRACT(chain, provider);

    try {
      console.log('here boi: ', [
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
                    TOKEN_ADDRESSES[chain?.id][sourceData.sourceToken].decimals
                  )
                : '0'
            ),
        ],
        gasPrice ? gasPrice : 0,
        [
          ...dataRows.slice(0, -1).map((e) => ({
            _fromToken:
              chain?.testnet && sourceData.sourceToken
                ? TOKEN_ADDRESSES[chain?.id][sourceData.sourceToken].address
                : ZERO_ADDRESS,
            _toToken:
              chain?.testnet && sourceData.sourceToken && e.destinationChain
                ? TOKEN_ADDRESSES[e.destinationChain][sourceData.sourceToken]
                    .address
                : ZERO_ADDRESS,
            _tokenA: ZERO_ADDRESS,
            _tokenB: ZERO_ADDRESS,
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
                  chain?.testnet ? 'testnets' : 'mainnets'
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
            (intervalType.value === 'days'
              ? 86400
              : intervalType.value === 'months'
              ? 2629800
              : intervalType.value === 'weeks'
              ? 604800
              : intervalType.value === 'years'
              ? 31536000
              : 1),
          _web3FunctionHash: 'QmaR3iZVSzJJ43uWRbrbUvs2CUheHVXCTiU6hJ85asD2RW',
        },
      ]);

      setCallDataPriceFeedTxn(
        ConditionalContract.interface.encodeFunctionData(
          '_createMultiplePriceFeedAutomate',
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
                    : '0'
                ),
            ],
            gasPrice ? gasPrice : 0,
            [
              ...dataRows.slice(0, -1).map((e) => ({
                _fromToken:
                  chain?.testnet && sourceData.sourceToken
                    ? TOKEN_ADDRESSES[chain?.id][sourceData.sourceToken].address
                    : ZERO_ADDRESS,
                _toToken:
                  chain?.testnet && sourceData.sourceToken && e.destinationChain
                    ? TOKEN_ADDRESSES[e.destinationChain][
                        sourceData.sourceToken
                      ].address
                    : ZERO_ADDRESS,
                _tokenA: ZERO_ADDRESS,
                _tokenB: ZERO_ADDRESS,
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
                      chain?.testnet ? 'testnets' : 'mainnets'
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
                (intervalType.value === 'days'
                  ? 86400
                  : intervalType.value === 'months'
                  ? 2629800
                  : intervalType.value === 'weeks'
                  ? 604800
                  : intervalType.value === 'years'
                  ? 31536000
                  : 1),
              _web3FunctionHash:
                'QmaR3iZVSzJJ43uWRbrbUvs2CUheHVXCTiU6hJ85asD2RW',
            },
          ]
        ) as `0x${string}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    updateCallDataApproval();
    updateCallDataGasPriceTxn();
  }, [
    chain,
    sourceData.sourceToken,
    dataRows,
    cycles,
    intervalCount,
    intervalType,
    startTime,
    gasPrice,
  ]);

  // useImperativeHandle(ref, () => ({
  //     executeTxn() {
  //         try {
  //             if (
  //                 BigNumber.from(allowance ? allowance : 0).eq(
  //                     ethers.constants.MaxUint256
  //                 )
  //             )
  //                 sendCreateGasPriceAsyncTxn?.();
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
      <div className='w-full flex-col'>
        <div className='grid w-full grid-cols-2 gap-3'>
          <div>
            <Label htmlFor='c-1' className='text-piccolo'>
              Gas Value
            </Label>
            <div className='relative'>
              <Input
                type='text'
                placeholder='E.g. 21'
                id='c-1'
                className='rounded bg-[#262229] text-white'
                onChange={(e) => {
                  setGasPrice(Number(e.target.value));
                  setShowThisSection({
                    ...showThisSection,
                    2: true,
                  });
                }}
              />
              <div className='absolute right-[5px] top-1/2 z-10 col-span-2 w-20 -translate-y-1/2 rounded-[10px] bg-[#464646] text-center'>
                gwei
              </div>
            </div>
          </div>
          <div>
            <Label htmlFor='c-1' className='text-piccolo'>
              Start Time
            </Label>
            <Input
              type='number'
              placeholder='E.g. 9234324712'
              id='c-1'
              className='rounded bg-[#262229] text-white'
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
          {/* <div>
              <Label htmlFor="c-1" className="text-piccolo">
                Chain
              </Label>
              <Dropdown
                value={toChain}
                onChange={setToChain}
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
                      {toChain}
                    </Dropdown.Select>

                    <Dropdown.Options className="z-[10] w-full bg-[#262229]">
                      {Object.keys(AUTOPAY_CONTRACT_ADDRESSES["testnets"]).map(
                        (chain, index) => (
                          <Dropdown.Option value={chain} key={index}>
                            {({ selected, active }) => (
                              <MenuItem isActive={active} isSelected={selected}>
                                {chain}
                              </MenuItem>
                            )}
                          </Dropdown.Option>
                        )
                      )}
                    </Dropdown.Options>
                  </>
                )}
              </Dropdown>
            </div> */}
          {selectedCategory === 'Recurring' && (
            <div className='col-span-2 grid grid-cols-2 gap-x-2'>
              <div>
                <Label htmlFor='c-1' className='text-piccolo'>
                  No. of Cycles
                </Label>
                <Input
                  type='number'
                  placeholder='1'
                  id='c-1'
                  className='rounded bg-[#262229] text-white'
                  onChange={(e) => setCycles(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor='c-1' className='text-piccolo'>
                  Interval
                </Label>
                <Button
                  onClick={openModal}
                  className='rounded-md bg-[#262229] font-normal'
                >
                  Select Interval
                </Button>
                <Modal open={isOpen} onClose={closeModal}>
                  <Modal.Backdrop className='bg-black opacity-60' />
                  <Modal.Panel className='bg-[#282828] p-3'>
                    <div className='border-beerus relative px-6 pb-4 pt-5'>
                      <h3 className='text-moon-18 text-bulma font-medium'>
                        Select Frequency
                      </h3>
                      <span
                        className='absolute right-5 top-4 inline-block h-8 w-8 cursor-pointer'
                        onClick={closeModal}
                      >
                        <ControlsCloseSmall className='block h-full w-full' />
                      </span>
                    </div>
                    <div className='grid grid-cols-5 items-center gap-3 px-6 py-4'>
                      <span className='col-span-2 block text-[#AFAEAE]'>
                        Repeat Every
                      </span>
                      <Input
                        type='text'
                        placeholder='1'
                        id='c-1'
                        className='col-span-1 rounded bg-[#262229] text-white'
                        value={intervalCount}
                        onChange={(e) => setIntervalCount(e.target.value)}
                      />
                      <Dropdown
                        value={intervalType}
                        onChange={setIntervalType}
                        size='xl'
                        className='col-span-2'
                      >
                        {({ open }) => (
                          <>
                            <Dropdown.Select
                              open={open}
                              data-test='data-test'
                              className='bg-[#262229]'
                            >
                              {intervalType?.label}
                            </Dropdown.Select>

                            <Dropdown.Options className='z-[10] w-full min-w-full bg-[#262229]'>
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

                    <div className='flex justify-end gap-2 p-4 pt-2'>
                      <Button
                        className='rounded-md bg-[#262229]'
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
    </>
  );
};

export default GasPricePanel;
