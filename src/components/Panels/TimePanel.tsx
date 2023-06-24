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
import React, { useContext, useEffect, useState } from 'react';
import {
  erc20ABI,
  useAccount,
  useContractRead,
  useNetwork,
  useSendTransaction,
} from 'wagmi';

import { AuthContext } from '../../components/AuthProvider';
import {
  AUTOPAY_CONTRACT,
  AUTOPAY_CONTRACT_ADDRESSES,
  CONNEXT_DOMAINS,
  ERC20_CONTRACT,
  TOKEN_ADDRESSES,
  ZERO_ADDRESS,
} from '../../constants/constants';
import { Category, Options } from '../../types/types';

type Props = {
  selectedCategory: Category | null;
  showThisSection: boolean;
  setShowThisSection: React.Dispatch<React.SetStateAction<boolean>>;
  dataRows: any[];
};

const TimePanel = ({
  selectedCategory,
  showThisSection,
  setShowThisSection,
  dataRows,
}: Props) => {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const provider = ethers.getDefaultProvider();

  const { sourceChain, sourceToken, setSourceToken, appMode, setAppMode } =
    useContext(AuthContext);
  const [startTime, setStartTime] = useState<string | null>('');
  const [cycles, setCycles] = useState<string | null>('');
  const [isOpen, setIsOpen] = useState(false);
  const [intervalCount, setIntervalCount] = useState('1');
  const [intervalType, setIntervalType] = useState<Options | null>({
    value: 'days',
    label: 'days',
  });
  const [callDataApproval, setCallDataApproval] = useState<`0x${string}`>('0x');
  const [callDataCreateTimeTxn, setCallDataCreateTimeTxn] =
    useState<`0x${string}`>('0x');

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  startTime && console.log('startTime: ', startTime);

  const {
    data: allowance,
    isError,
    isLoading,
  } = useContractRead({
    address:
      chain && sourceToken
        ? TOKEN_ADDRESSES[chain?.id][sourceToken].address
        : ZERO_ADDRESS,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [
      address ? address : ZERO_ADDRESS,
      chain
        ? AUTOPAY_CONTRACT_ADDRESSES[chain?.testnet ? 'testnets' : 'mainnets'][
            chain?.id
          ]
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
      ? AUTOPAY_CONTRACT_ADDRESSES[chain?.testnet ? 'testnets' : 'mainnets'][
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

    // setCallDataApproval(
    //     ERC20Contract.interface.encodeFunctionData("approve", [
    //         chain
    //             ? AUTOPAY_CONTRACT_ADDRESSES[
    //             chain?.testnet ? "testnets" : "mainnets"
    //             ][chain?.id]
    //             : ZERO_ADDRESS,
    //         ethers.constants.MaxUint256,
    //     ]) as `0x${string}`
    // );
  };

  const updateCallDataCreateTimeTxn = () => {
    const AutoPayContract = AUTOPAY_CONTRACT(chain, provider);

    console.log('settin calldata: ', [
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
              : '0'
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
              ? TOKEN_ADDRESSES[e.destinationChain][sourceToken].address
              : ZERO_ADDRESS
          ),
      ],
      [
        ...dataRows
          .slice(0, -1)
          .map((e) => (e.destinationChain ? e.destinationChain : ZERO_ADDRESS)),
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
                  chain?.testnet ? 'testnets' : 'mainnets'
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
              (intervalType.value === 'days'
                ? 86400
                : intervalType.value === 'months'
                ? 2629800
                : intervalType.value === 'weeks'
                ? 604800
                : intervalType.value === 'years'
                ? 31536000
                : 1)
          ),
      ],
      'QmRdcGs5h8UP8ETFdS7Yj7iahDTjfQNHMsJp3dYRec5Gf2',
    ]);
    try {
      setCallDataCreateTimeTxn(
        AutoPayContract.interface.encodeFunctionData(
          '_createMultipleTimeAutomate',
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
                        TOKEN_ADDRESSES[chain?.id][sourceToken].decimals
                      )
                    : '0'
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
                    ? TOKEN_ADDRESSES[e.destinationChain][sourceToken].address
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
                        chain?.testnet ? 'testnets' : 'mainnets'
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
                    (intervalType.value === 'days'
                      ? 86400
                      : intervalType.value === 'months'
                      ? 2629800
                      : intervalType.value === 'weeks'
                      ? 604800
                      : intervalType.value === 'years'
                      ? 31536000
                      : 1)
                ),
            ],
            'QmRdcGs5h8UP8ETFdS7Yj7iahDTjfQNHMsJp3dYRec5Gf2',
          ]
        ) as `0x${string}`
      );
    } catch {}
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

  return (
    <>
      <div className='w-full flex-col'>
        <div className='grid w-full grid-cols-3 gap-3'>
          <div>
            <Label htmlFor='c-1' className='text-piccolo'>
              Start Time
            </Label>
            <p
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

            {/* <DatePicker
                                selected={startTime}
                                setSelected={setStartTime}
                                setShowThisSection={setShowThisSection}
                                showThisSection={showThisSection}
                            /> */}
          </div>

          {selectedCategory === 'Recurring' && (
            <>
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
              <div className=' grid grid-cols-2 gap-x-2'>
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
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default TimePanel;
