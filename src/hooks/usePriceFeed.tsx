import {
  Chain,
  erc20ABI,
  getAccount,
  getNetwork,
  prepareSendTransaction,
  readContract,
  sendTransaction,
  waitForTransaction,
} from '@wagmi/core';
import { BigNumber, ethers } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { encodeFunctionData } from 'viem';

import { AuthContext } from '@/components/AuthProvider';

import useGlobalStore from '@/store';

import {
  AUTOPAY_CONTRACT_ADDRESSES,
  CONNEXT_DOMAINS,
  TOKEN_ADDRESSES,
  ZERO_ADDRESS,
} from '../constants/constants';
import { Options } from '../types/types';
import AutoPayAbi from '../../AutoPay.json';

const intervalTypes = [
  { value: 'days', label: 'days' },
  { value: 'weeks', label: 'weeks' },
  { value: 'months', label: 'months' },
  { value: 'years', label: 'years' },
];

const tokens = [{ name: 'USDC' }, { name: 'USDT' }, { name: 'DAI' }];

const usePriceFeed = () => {
  const { chain } = getNetwork();
  const { address } = getAccount();
  const { enteredRows, setEnteredRows } = useGlobalStore();
  const {
    sourceChain,
    sourceToken,
    isLoading,
    setIsLoading,
    dataRows,
    setDataRows,
  } = useContext(AuthContext);

  const [startTime, setStartTime] = useState<string | null>('');
  const [cycles, setCycles] = useState<string | null>('');
  const [intervalCount, setIntervalCount] = useState('1');
  const [intervalType, setIntervalType] = useState<Options | null>({
    value: 'days',
    label: 'days',
  });
  const [isApproved, setIsApproved] = useState(false);
  const [token1Price, setToken1Price] = useState('');
  const [token2Price, setToken2Price] = useState('');

  const fetchAllowance = async (chain: Chain) => {
    try {
      setIsLoading({
        loading: true,
        message:
          'Gas fees for all transactions will be forward paid in this token when their trigger conditions are met.',
        instructions:
          'click use default and confirm allowance to setup your automation',
      });

      const allowance = await readContract({
        address:
          chain && sourceToken
            ? TOKEN_ADDRESSES[chain?.id][sourceToken.name].address
            : ZERO_ADDRESS,
        abi: erc20ABI,
        functionName: 'allowance',
        args: [
          address ? address : ZERO_ADDRESS,
          chain
            ? AUTOPAY_CONTRACT_ADDRESSES[
                chain?.testnet ? 'testnets' : 'mainnets'
              ][chain?.id]
            : ZERO_ADDRESS,
        ],
      });
      if (BigNumber.from(allowance).isZero()) {
        setIsApproved(false);
      } else {
        setIsApproved(true);
      }

      return allowance;
    } catch (error) {
      toast.error(`ERROR ${error}`);
      setIsLoading({
        loading: false,
        message: `ERROR  ${error}`,
        instructions: 'Approve the token',
      });
      console.error(error);
    } finally {
      setIsLoading({
        loading: false,
      });
    }
  };

  const handleApprove = async () => {
    try {
      setIsLoading({
        loading: true,
        message: 'Approving token',
        instructions:
          'click use default and confirm allowance to setup your automation',
      });
      if (!sourceToken) {
        toast.error('Please select a token');
        return;
      }
      console.log(enteredRows);

      const callDataApproval = encodeFunctionData({
        abi: erc20ABI,
        functionName: 'approve',
        args: [
          chain
            ? AUTOPAY_CONTRACT_ADDRESSES[
                chain?.testnet ? 'testnets' : 'mainnets'
              ][chain?.id]
            : ZERO_ADDRESS,
          ethers.constants.MaxUint256,
        ],
      });

      console.log(callDataApproval);

      const request = await prepareSendTransaction({
        to:
          chain && sourceToken
            ? TOKEN_ADDRESSES[chain?.id][sourceToken.name].address
            : ZERO_ADDRESS,
        data: callDataApproval,
        account: address,
        value: BigInt(0),
      });
      const { hash } = await sendTransaction(request);

      const data = await waitForTransaction({
        hash,
      });

      console.log(data);

      await fetchAllowance(chain);
    } catch (error) {
      setIsLoading({
        loading: false,
        message: `ERROR  ${error}`,
        instructions: 'Approve the token',
      });
      console.error(error);
    } finally {
      setIsLoading({
        loading: false,
        message: `Approved`,
        instructions:
          'click use default and confirm allowance to setup your automation',
      });
    }
  };

  const CreateConditionalAutomateTxn = async ({
    ratio,
    token1,
    token2,
  }: {
    ratio: string;
    token1: string;
    token2: string;
  }) => {
    try {
      setIsLoading({
        loading: true,
        message: 'Creating Time Automate',
        instructions:
          'click use default and confirm allowance to setup your automation',
      });

      console.log(TOKEN_ADDRESSES);
      console.log([
        ...enteredRows.map((e) =>
          chain?.testnet && sourceToken && e.destination_chain
            ? TOKEN_ADDRESSES[e.destination_chain === 'goerli' ? 5 : 80001][
                sourceToken.name
              ]
            : ZERO_ADDRESS
        ),
      ]);
      const args = [
        [
          ...enteredRows.map((e) =>
            e.to_address ? e.to_address : ZERO_ADDRESS
          ),
        ],
        [
          ...enteredRows.map((e) =>
            e.amount_of_source_token
              ? parseUnits(
                  e.amount_of_source_token,
                  TOKEN_ADDRESSES[chain?.id][sourceToken?.name].decimals
                )
              : '0'
          ),
        ],
        [ratio],
        [
          ...enteredRows.map((e) =>
            chain?.testnet && sourceToken
              ? TOKEN_ADDRESSES[chain?.id][sourceToken.name].address
              : ZERO_ADDRESS
          ),
        ],
        [
          ...enteredRows.map((e) =>
            chain?.testnet && sourceToken && e.destination_chain
              ? TOKEN_ADDRESSES[e.destination_chain === 'goerli' ? 5 : 80001][
                  sourceToken.name
                ].address
              : ZERO_ADDRESS
          ),
        ],
        [token1],
        [token2],
        [
          ...enteredRows.map((e) =>
            e.destination_chain
              ? e.destination_chain === 'goerli'
                ? 5
                : 80001
              : ZERO_ADDRESS
          ),
        ],
        [
          ...enteredRows.map((e) =>
            e.destination_chain
              ? CONNEXT_DOMAINS[e.destination_chain]
              : ZERO_ADDRESS
          ),
        ],
        [
          ...enteredRows.map((e) =>
            e.destination_chain
              ? AUTOPAY_CONTRACT_ADDRESSES[
                  chain?.testnet ? 'testnets' : 'mainnets'
                ][e.destination_chain === 'goerli' ? 5 : 80001]
              : ZERO_ADDRESS
          ),
        ],
        [...enteredRows.map((_) => (cycles ? cycles : 1))],
        [
          ...enteredRows.map((_) =>
            startTime ? startTime : Math.trunc(Date.now() / 1000) + 3600
          ),
        ],
        [
          ...enteredRows.map(
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
        'QmTUmSKwiGgALG3eAeXzicgNZaDbqmYT5rRykqk4gVd5dF',
      ];

      const callDataCreateConditionalTxn = encodeFunctionData({
        abi: AutoPayAbi.abi,
        functionName: '_createMultipleConditionalAutomate',
        args: args,
      });

      console.log(callDataCreateConditionalTxn);
      const request = await prepareSendTransaction({
        to: chain
          ? AUTOPAY_CONTRACT_ADDRESSES[
              chain?.testnet ? 'testnets' : 'mainnets'
            ][chain?.id]
          : ZERO_ADDRESS,
        data: callDataCreateConditionalTxn,
        account: address,
        value: BigInt(0),
      });
      const { hash } = await sendTransaction(request);
      console.log(hash);

      toast.success('Transaction created successfully');
    } catch (error) {
      setIsLoading({ loading: false, message: `ERROR  ${error}` });
      console.error(error);
    } finally {
      setIsLoading({
        loading: false,
        message: `Time Automate created`,
        instructions:
          'click use default and confirm allowance to setup your automation',
      });
    }
  };

  const handleConditionalExecution = async ({
    ratio,
    token1,
    token2,
  }: {
    ratio: string;
    token1: string;
    token2: string;
  }) => {
    try {
      const allowance = await fetchAllowance(chain);

      // console.log(
      //   BigNumber.from(allowance ? allowance : 0).eq(
      //     ethers.constants.MaxUint256
      //   )
      // );
      // if (
      //   BigNumber.from(allowance ? allowance : 0).eq(
      //     ethers.constants.MaxUint256
      //   )
      // )
      CreateConditionalAutomateTxn?.({
        ratio: parseInt(ratio),
        token1: token1,
        token2: token2,
      });
      // else throw new Error('Please approve the token');
    } catch (e) {
      toast.error('Please approve the token');
    }
  };

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
    handleConditionalExecution,
    isApproved,
    setIsApproved,
  };
};

export default usePriceFeed;
