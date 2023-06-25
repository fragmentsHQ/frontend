'use client'; // This is a client component 👈🏽

import {
  erc20ABI,
  getAccount,
  getNetwork,
  prepareSendTransaction,
  readContract,
  sendTransaction,
} from '@wagmi/core';
import { ethers } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { encodeFunctionData } from 'viem';

import { AuthContext } from '@/components/AuthProvider';

import {
  AUTOPAY_CONTRACT,
  AUTOPAY_CONTRACT_ADDRESSES,
  CONNEXT_DOMAINS,
  TOKEN_ADDRESSES,
  ZERO_ADDRESS,
} from '../constants/constants';
import { Options } from '../types/types';

const intervalTypes = [
  { value: 'days', label: 'days' },
  { value: 'weeks', label: 'weeks' },
  { value: 'months', label: 'months' },
  { value: 'years', label: 'years' },
];

const tokens = [{ name: 'USDC' }, { name: 'USDT' }, { name: 'DAI' }];

const useAutoPayContract = () => {
  const { chain } = getNetwork();
  const { address } = getAccount();

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

  const fetchAllowance = async () => {
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
            ? TOKEN_ADDRESSES[chain?.id][sourceToken].address
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

      setIsApproved(true);
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
        message: `Allowance Fetched ${allowance}`,
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
            ? TOKEN_ADDRESSES[chain?.id][sourceToken].address
            : ZERO_ADDRESS,
        data: callDataApproval,
        account: address,
        value: BigInt(0),
      });
      const { hash } = await sendTransaction(request);
      console.log(hash);

      await fetchAllowance();
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

  const createTimeAutomateTxn = async () => {
    try {
      setIsLoading({
        loading: true,
        message: 'Creating Time Automate',
        instructions:
          'click use default and confirm allowance to setup your automation',
      });
      const AutoPayContract = AUTOPAY_CONTRACT(chain);

      const callDataCreateTimeTxn = encodeFunctionData({
        abi: AutoPayContract.abi,
        functionName: '_createMultipleTimeAutomate',
        args: [
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
        ],
      });

      console.log(callDataCreateTimeTxn);

      const request = await prepareSendTransaction({
        to: chain
          ? AUTOPAY_CONTRACT_ADDRESSES[
              chain?.testnet ? 'testnets' : 'mainnets'
            ][chain?.id]
          : ZERO_ADDRESS,
        data: callDataCreateTimeTxn,
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
    handleTimeExecution,
    isApproved,
    setIsApproved,
  };
};

export default useAutoPayContract;
