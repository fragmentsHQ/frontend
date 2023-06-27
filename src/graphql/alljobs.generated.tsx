import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import * as Types from './types.generated';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  BigDecimal: { input: any; output: any };
  BigInt: { input: any; output: any };
  Bytes: { input: any; output: any };
  Int8: { input: any; output: any };
};

export type AdminChanged = {
  __typename?: 'AdminChanged';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  newAdmin: Scalars['Bytes']['output'];
  previousAdmin: Scalars['Bytes']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type AdminChanged_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<AdminChanged_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  newAdmin?: InputMaybe<Scalars['Bytes']['input']>;
  newAdmin_contains?: InputMaybe<Scalars['Bytes']['input']>;
  newAdmin_gt?: InputMaybe<Scalars['Bytes']['input']>;
  newAdmin_gte?: InputMaybe<Scalars['Bytes']['input']>;
  newAdmin_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  newAdmin_lt?: InputMaybe<Scalars['Bytes']['input']>;
  newAdmin_lte?: InputMaybe<Scalars['Bytes']['input']>;
  newAdmin_not?: InputMaybe<Scalars['Bytes']['input']>;
  newAdmin_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  newAdmin_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<AdminChanged_Filter>>>;
  previousAdmin?: InputMaybe<Scalars['Bytes']['input']>;
  previousAdmin_contains?: InputMaybe<Scalars['Bytes']['input']>;
  previousAdmin_gt?: InputMaybe<Scalars['Bytes']['input']>;
  previousAdmin_gte?: InputMaybe<Scalars['Bytes']['input']>;
  previousAdmin_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  previousAdmin_lt?: InputMaybe<Scalars['Bytes']['input']>;
  previousAdmin_lte?: InputMaybe<Scalars['Bytes']['input']>;
  previousAdmin_not?: InputMaybe<Scalars['Bytes']['input']>;
  previousAdmin_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  previousAdmin_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum AdminChanged_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  NewAdmin = 'newAdmin',
  PreviousAdmin = 'previousAdmin',
  TransactionHash = 'transactionHash',
}

export type BeaconUpgraded = {
  __typename?: 'BeaconUpgraded';
  beacon: Scalars['Bytes']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type BeaconUpgraded_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<BeaconUpgraded_Filter>>>;
  beacon?: InputMaybe<Scalars['Bytes']['input']>;
  beacon_contains?: InputMaybe<Scalars['Bytes']['input']>;
  beacon_gt?: InputMaybe<Scalars['Bytes']['input']>;
  beacon_gte?: InputMaybe<Scalars['Bytes']['input']>;
  beacon_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  beacon_lt?: InputMaybe<Scalars['Bytes']['input']>;
  beacon_lte?: InputMaybe<Scalars['Bytes']['input']>;
  beacon_not?: InputMaybe<Scalars['Bytes']['input']>;
  beacon_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  beacon_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<BeaconUpgraded_Filter>>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum BeaconUpgraded_OrderBy {
  Beacon = 'beacon',
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  TransactionHash = 'transactionHash',
}

export type BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
};

export type FundsDeposited = {
  __typename?: 'FundsDeposited';
  amount: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  sender: Scalars['Bytes']['output'];
  token: Scalars['Bytes']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type FundsDeposited_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<FundsDeposited_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<FundsDeposited_Filter>>>;
  sender?: InputMaybe<Scalars['Bytes']['input']>;
  sender_contains?: InputMaybe<Scalars['Bytes']['input']>;
  sender_gt?: InputMaybe<Scalars['Bytes']['input']>;
  sender_gte?: InputMaybe<Scalars['Bytes']['input']>;
  sender_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  sender_lt?: InputMaybe<Scalars['Bytes']['input']>;
  sender_lte?: InputMaybe<Scalars['Bytes']['input']>;
  sender_not?: InputMaybe<Scalars['Bytes']['input']>;
  sender_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  sender_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  token?: InputMaybe<Scalars['Bytes']['input']>;
  token_contains?: InputMaybe<Scalars['Bytes']['input']>;
  token_gt?: InputMaybe<Scalars['Bytes']['input']>;
  token_gte?: InputMaybe<Scalars['Bytes']['input']>;
  token_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  token_lt?: InputMaybe<Scalars['Bytes']['input']>;
  token_lte?: InputMaybe<Scalars['Bytes']['input']>;
  token_not?: InputMaybe<Scalars['Bytes']['input']>;
  token_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  token_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum FundsDeposited_OrderBy {
  Amount = 'amount',
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  Sender = 'sender',
  Token = 'token',
  TransactionHash = 'transactionHash',
}

export type FundsWithdrawn = {
  __typename?: 'FundsWithdrawn';
  amount: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  initiator: Scalars['Bytes']['output'];
  receiver: Scalars['Bytes']['output'];
  token: Scalars['Bytes']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type FundsWithdrawn_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<FundsWithdrawn_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  initiator?: InputMaybe<Scalars['Bytes']['input']>;
  initiator_contains?: InputMaybe<Scalars['Bytes']['input']>;
  initiator_gt?: InputMaybe<Scalars['Bytes']['input']>;
  initiator_gte?: InputMaybe<Scalars['Bytes']['input']>;
  initiator_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  initiator_lt?: InputMaybe<Scalars['Bytes']['input']>;
  initiator_lte?: InputMaybe<Scalars['Bytes']['input']>;
  initiator_not?: InputMaybe<Scalars['Bytes']['input']>;
  initiator_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  initiator_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<FundsWithdrawn_Filter>>>;
  receiver?: InputMaybe<Scalars['Bytes']['input']>;
  receiver_contains?: InputMaybe<Scalars['Bytes']['input']>;
  receiver_gt?: InputMaybe<Scalars['Bytes']['input']>;
  receiver_gte?: InputMaybe<Scalars['Bytes']['input']>;
  receiver_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  receiver_lt?: InputMaybe<Scalars['Bytes']['input']>;
  receiver_lte?: InputMaybe<Scalars['Bytes']['input']>;
  receiver_not?: InputMaybe<Scalars['Bytes']['input']>;
  receiver_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  receiver_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  token?: InputMaybe<Scalars['Bytes']['input']>;
  token_contains?: InputMaybe<Scalars['Bytes']['input']>;
  token_gt?: InputMaybe<Scalars['Bytes']['input']>;
  token_gte?: InputMaybe<Scalars['Bytes']['input']>;
  token_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  token_lt?: InputMaybe<Scalars['Bytes']['input']>;
  token_lte?: InputMaybe<Scalars['Bytes']['input']>;
  token_not?: InputMaybe<Scalars['Bytes']['input']>;
  token_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  token_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum FundsWithdrawn_OrderBy {
  Amount = 'amount',
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  Initiator = 'initiator',
  Receiver = 'receiver',
  Token = 'token',
  TransactionHash = 'transactionHash',
}

export type Initialized = {
  __typename?: 'Initialized';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  transactionHash: Scalars['Bytes']['output'];
  version: Scalars['Int']['output'];
};

export type Initialized_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Initialized_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<Initialized_Filter>>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  version?: InputMaybe<Scalars['Int']['input']>;
  version_gt?: InputMaybe<Scalars['Int']['input']>;
  version_gte?: InputMaybe<Scalars['Int']['input']>;
  version_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  version_lt?: InputMaybe<Scalars['Int']['input']>;
  version_lte?: InputMaybe<Scalars['Int']['input']>;
  version_not?: InputMaybe<Scalars['Int']['input']>;
  version_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export enum Initialized_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  TransactionHash = 'transactionHash',
  Version = 'version',
}

export type JobCreated = {
  __typename?: 'JobCreated';
  _amount: Scalars['BigInt']['output'];
  _cycles: Scalars['BigInt']['output'];
  _destinationContract: Scalars['Bytes']['output'];
  _destinationDomain: Scalars['BigInt']['output'];
  _fromToken: Scalars['Bytes']['output'];
  _gelatoTaskId: Scalars['Bytes']['output'];
  _interval: Scalars['BigInt']['output'];
  _jobId: Scalars['Bytes']['output'];
  _startTime: Scalars['BigInt']['output'];
  _taskCreator: Scalars['Bytes']['output'];
  _to: Scalars['Bytes']['output'];
  _toChain: Scalars['BigInt']['output'];
  _toToken: Scalars['Bytes']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  option: Scalars['Int']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type JobCreated1 = {
  __typename?: 'JobCreated1';
  _amount: Scalars['BigInt']['output'];
  _cycles: Scalars['BigInt']['output'];
  _destinationContract: Scalars['Bytes']['output'];
  _destinationDomain: Scalars['BigInt']['output'];
  _fromToken: Scalars['Bytes']['output'];
  _gelatoTaskId: Scalars['Bytes']['output'];
  _interval: Scalars['BigInt']['output'];
  _jobId: Scalars['Bytes']['output'];
  _price: Scalars['BigInt']['output'];
  _startTime: Scalars['BigInt']['output'];
  _taskCreator: Scalars['Bytes']['output'];
  _to: Scalars['Bytes']['output'];
  _toChain: Scalars['BigInt']['output'];
  _toToken: Scalars['Bytes']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  option: Scalars['Int']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type JobCreated1_Filter = {
  _amount?: InputMaybe<Scalars['BigInt']['input']>;
  _amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  _amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  _amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  _amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  _amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  _amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  _amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  _cycles?: InputMaybe<Scalars['BigInt']['input']>;
  _cycles_gt?: InputMaybe<Scalars['BigInt']['input']>;
  _cycles_gte?: InputMaybe<Scalars['BigInt']['input']>;
  _cycles_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  _cycles_lt?: InputMaybe<Scalars['BigInt']['input']>;
  _cycles_lte?: InputMaybe<Scalars['BigInt']['input']>;
  _cycles_not?: InputMaybe<Scalars['BigInt']['input']>;
  _cycles_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  _destinationContract?: InputMaybe<Scalars['Bytes']['input']>;
  _destinationContract_contains?: InputMaybe<Scalars['Bytes']['input']>;
  _destinationContract_gt?: InputMaybe<Scalars['Bytes']['input']>;
  _destinationContract_gte?: InputMaybe<Scalars['Bytes']['input']>;
  _destinationContract_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  _destinationContract_lt?: InputMaybe<Scalars['Bytes']['input']>;
  _destinationContract_lte?: InputMaybe<Scalars['Bytes']['input']>;
  _destinationContract_not?: InputMaybe<Scalars['Bytes']['input']>;
  _destinationContract_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  _destinationContract_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  _destinationDomain?: InputMaybe<Scalars['BigInt']['input']>;
  _destinationDomain_gt?: InputMaybe<Scalars['BigInt']['input']>;
  _destinationDomain_gte?: InputMaybe<Scalars['BigInt']['input']>;
  _destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  _destinationDomain_lt?: InputMaybe<Scalars['BigInt']['input']>;
  _destinationDomain_lte?: InputMaybe<Scalars['BigInt']['input']>;
  _destinationDomain_not?: InputMaybe<Scalars['BigInt']['input']>;
  _destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  _fromToken?: InputMaybe<Scalars['Bytes']['input']>;
  _fromToken_contains?: InputMaybe<Scalars['Bytes']['input']>;
  _fromToken_gt?: InputMaybe<Scalars['Bytes']['input']>;
  _fromToken_gte?: InputMaybe<Scalars['Bytes']['input']>;
  _fromToken_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  _fromToken_lt?: InputMaybe<Scalars['Bytes']['input']>;
  _fromToken_lte?: InputMaybe<Scalars['Bytes']['input']>;
  _fromToken_not?: InputMaybe<Scalars['Bytes']['input']>;
  _fromToken_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  _fromToken_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  _gelatoTaskId?: InputMaybe<Scalars['Bytes']['input']>;
  _gelatoTaskId_contains?: InputMaybe<Scalars['Bytes']['input']>;
  _gelatoTaskId_gt?: InputMaybe<Scalars['Bytes']['input']>;
  _gelatoTaskId_gte?: InputMaybe<Scalars['Bytes']['input']>;
  _gelatoTaskId_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  _gelatoTaskId_lt?: InputMaybe<Scalars['Bytes']['input']>;
  _gelatoTaskId_lte?: InputMaybe<Scalars['Bytes']['input']>;
  _gelatoTaskId_not?: InputMaybe<Scalars['Bytes']['input']>;
  _gelatoTaskId_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  _gelatoTaskId_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  _interval?: InputMaybe<Scalars['BigInt']['input']>;
  _interval_gt?: InputMaybe<Scalars['BigInt']['input']>;
  _interval_gte?: InputMaybe<Scalars['BigInt']['input']>;
  _interval_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  _interval_lt?: InputMaybe<Scalars['BigInt']['input']>;
  _interval_lte?: InputMaybe<Scalars['BigInt']['input']>;
  _interval_not?: InputMaybe<Scalars['BigInt']['input']>;
  _interval_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  _jobId?: InputMaybe<Scalars['Bytes']['input']>;
  _jobId_contains?: InputMaybe<Scalars['Bytes']['input']>;
  _jobId_gt?: InputMaybe<Scalars['Bytes']['input']>;
  _jobId_gte?: InputMaybe<Scalars['Bytes']['input']>;
  _jobId_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  _jobId_lt?: InputMaybe<Scalars['Bytes']['input']>;
  _jobId_lte?: InputMaybe<Scalars['Bytes']['input']>;
  _jobId_not?: InputMaybe<Scalars['Bytes']['input']>;
  _jobId_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  _jobId_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  _price?: InputMaybe<Scalars['BigInt']['input']>;
  _price_gt?: InputMaybe<Scalars['BigInt']['input']>;
  _price_gte?: InputMaybe<Scalars['BigInt']['input']>;
  _price_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  _price_lt?: InputMaybe<Scalars['BigInt']['input']>;
  _price_lte?: InputMaybe<Scalars['BigInt']['input']>;
  _price_not?: InputMaybe<Scalars['BigInt']['input']>;
  _price_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  _startTime?: InputMaybe<Scalars['BigInt']['input']>;
  _startTime_gt?: InputMaybe<Scalars['BigInt']['input']>;
  _startTime_gte?: InputMaybe<Scalars['BigInt']['input']>;
  _startTime_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  _startTime_lt?: InputMaybe<Scalars['BigInt']['input']>;
  _startTime_lte?: InputMaybe<Scalars['BigInt']['input']>;
  _startTime_not?: InputMaybe<Scalars['BigInt']['input']>;
  _startTime_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  _taskCreator?: InputMaybe<Scalars['Bytes']['input']>;
  _taskCreator_contains?: InputMaybe<Scalars['Bytes']['input']>;
  _taskCreator_gt?: InputMaybe<Scalars['Bytes']['input']>;
  _taskCreator_gte?: InputMaybe<Scalars['Bytes']['input']>;
  _taskCreator_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  _taskCreator_lt?: InputMaybe<Scalars['Bytes']['input']>;
  _taskCreator_lte?: InputMaybe<Scalars['Bytes']['input']>;
  _taskCreator_not?: InputMaybe<Scalars['Bytes']['input']>;
  _taskCreator_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  _taskCreator_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  _to?: InputMaybe<Scalars['Bytes']['input']>;
  _toChain?: InputMaybe<Scalars['BigInt']['input']>;
  _toChain_gt?: InputMaybe<Scalars['BigInt']['input']>;
  _toChain_gte?: InputMaybe<Scalars['BigInt']['input']>;
  _toChain_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  _toChain_lt?: InputMaybe<Scalars['BigInt']['input']>;
  _toChain_lte?: InputMaybe<Scalars['BigInt']['input']>;
  _toChain_not?: InputMaybe<Scalars['BigInt']['input']>;
  _toChain_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  _toToken?: InputMaybe<Scalars['Bytes']['input']>;
  _toToken_contains?: InputMaybe<Scalars['Bytes']['input']>;
  _toToken_gt?: InputMaybe<Scalars['Bytes']['input']>;
  _toToken_gte?: InputMaybe<Scalars['Bytes']['input']>;
  _toToken_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  _toToken_lt?: InputMaybe<Scalars['Bytes']['input']>;
  _toToken_lte?: InputMaybe<Scalars['Bytes']['input']>;
  _toToken_not?: InputMaybe<Scalars['Bytes']['input']>;
  _toToken_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  _toToken_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  _to_contains?: InputMaybe<Scalars['Bytes']['input']>;
  _to_gt?: InputMaybe<Scalars['Bytes']['input']>;
  _to_gte?: InputMaybe<Scalars['Bytes']['input']>;
  _to_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  _to_lt?: InputMaybe<Scalars['Bytes']['input']>;
  _to_lte?: InputMaybe<Scalars['Bytes']['input']>;
  _to_not?: InputMaybe<Scalars['Bytes']['input']>;
  _to_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  _to_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  and?: InputMaybe<Array<InputMaybe<JobCreated1_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  option?: InputMaybe<Scalars['Int']['input']>;
  option_gt?: InputMaybe<Scalars['Int']['input']>;
  option_gte?: InputMaybe<Scalars['Int']['input']>;
  option_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  option_lt?: InputMaybe<Scalars['Int']['input']>;
  option_lte?: InputMaybe<Scalars['Int']['input']>;
  option_not?: InputMaybe<Scalars['Int']['input']>;
  option_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  or?: InputMaybe<Array<InputMaybe<JobCreated1_Filter>>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum JobCreated1_OrderBy {
  Amount = '_amount',
  Cycles = '_cycles',
  DestinationContract = '_destinationContract',
  DestinationDomain = '_destinationDomain',
  FromToken = '_fromToken',
  GelatoTaskId = '_gelatoTaskId',
  Interval = '_interval',
  JobId = '_jobId',
  Price = '_price',
  StartTime = '_startTime',
  TaskCreator = '_taskCreator',
  To = '_to',
  ToChain = '_toChain',
  ToToken = '_toToken',
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  Option = 'option',
  TransactionHash = 'transactionHash',
}

export type JobCreated_Filter = {
  _amount?: InputMaybe<Scalars['BigInt']['input']>;
  _amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  _amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  _amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  _amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  _amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  _amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  _amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  _cycles?: InputMaybe<Scalars['BigInt']['input']>;
  _cycles_gt?: InputMaybe<Scalars['BigInt']['input']>;
  _cycles_gte?: InputMaybe<Scalars['BigInt']['input']>;
  _cycles_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  _cycles_lt?: InputMaybe<Scalars['BigInt']['input']>;
  _cycles_lte?: InputMaybe<Scalars['BigInt']['input']>;
  _cycles_not?: InputMaybe<Scalars['BigInt']['input']>;
  _cycles_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  _destinationContract?: InputMaybe<Scalars['Bytes']['input']>;
  _destinationContract_contains?: InputMaybe<Scalars['Bytes']['input']>;
  _destinationContract_gt?: InputMaybe<Scalars['Bytes']['input']>;
  _destinationContract_gte?: InputMaybe<Scalars['Bytes']['input']>;
  _destinationContract_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  _destinationContract_lt?: InputMaybe<Scalars['Bytes']['input']>;
  _destinationContract_lte?: InputMaybe<Scalars['Bytes']['input']>;
  _destinationContract_not?: InputMaybe<Scalars['Bytes']['input']>;
  _destinationContract_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  _destinationContract_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  _destinationDomain?: InputMaybe<Scalars['BigInt']['input']>;
  _destinationDomain_gt?: InputMaybe<Scalars['BigInt']['input']>;
  _destinationDomain_gte?: InputMaybe<Scalars['BigInt']['input']>;
  _destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  _destinationDomain_lt?: InputMaybe<Scalars['BigInt']['input']>;
  _destinationDomain_lte?: InputMaybe<Scalars['BigInt']['input']>;
  _destinationDomain_not?: InputMaybe<Scalars['BigInt']['input']>;
  _destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  _fromToken?: InputMaybe<Scalars['Bytes']['input']>;
  _fromToken_contains?: InputMaybe<Scalars['Bytes']['input']>;
  _fromToken_gt?: InputMaybe<Scalars['Bytes']['input']>;
  _fromToken_gte?: InputMaybe<Scalars['Bytes']['input']>;
  _fromToken_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  _fromToken_lt?: InputMaybe<Scalars['Bytes']['input']>;
  _fromToken_lte?: InputMaybe<Scalars['Bytes']['input']>;
  _fromToken_not?: InputMaybe<Scalars['Bytes']['input']>;
  _fromToken_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  _fromToken_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  _gelatoTaskId?: InputMaybe<Scalars['Bytes']['input']>;
  _gelatoTaskId_contains?: InputMaybe<Scalars['Bytes']['input']>;
  _gelatoTaskId_gt?: InputMaybe<Scalars['Bytes']['input']>;
  _gelatoTaskId_gte?: InputMaybe<Scalars['Bytes']['input']>;
  _gelatoTaskId_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  _gelatoTaskId_lt?: InputMaybe<Scalars['Bytes']['input']>;
  _gelatoTaskId_lte?: InputMaybe<Scalars['Bytes']['input']>;
  _gelatoTaskId_not?: InputMaybe<Scalars['Bytes']['input']>;
  _gelatoTaskId_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  _gelatoTaskId_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  _interval?: InputMaybe<Scalars['BigInt']['input']>;
  _interval_gt?: InputMaybe<Scalars['BigInt']['input']>;
  _interval_gte?: InputMaybe<Scalars['BigInt']['input']>;
  _interval_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  _interval_lt?: InputMaybe<Scalars['BigInt']['input']>;
  _interval_lte?: InputMaybe<Scalars['BigInt']['input']>;
  _interval_not?: InputMaybe<Scalars['BigInt']['input']>;
  _interval_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  _jobId?: InputMaybe<Scalars['Bytes']['input']>;
  _jobId_contains?: InputMaybe<Scalars['Bytes']['input']>;
  _jobId_gt?: InputMaybe<Scalars['Bytes']['input']>;
  _jobId_gte?: InputMaybe<Scalars['Bytes']['input']>;
  _jobId_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  _jobId_lt?: InputMaybe<Scalars['Bytes']['input']>;
  _jobId_lte?: InputMaybe<Scalars['Bytes']['input']>;
  _jobId_not?: InputMaybe<Scalars['Bytes']['input']>;
  _jobId_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  _jobId_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  _startTime?: InputMaybe<Scalars['BigInt']['input']>;
  _startTime_gt?: InputMaybe<Scalars['BigInt']['input']>;
  _startTime_gte?: InputMaybe<Scalars['BigInt']['input']>;
  _startTime_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  _startTime_lt?: InputMaybe<Scalars['BigInt']['input']>;
  _startTime_lte?: InputMaybe<Scalars['BigInt']['input']>;
  _startTime_not?: InputMaybe<Scalars['BigInt']['input']>;
  _startTime_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  _taskCreator?: InputMaybe<Scalars['Bytes']['input']>;
  _taskCreator_contains?: InputMaybe<Scalars['Bytes']['input']>;
  _taskCreator_gt?: InputMaybe<Scalars['Bytes']['input']>;
  _taskCreator_gte?: InputMaybe<Scalars['Bytes']['input']>;
  _taskCreator_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  _taskCreator_lt?: InputMaybe<Scalars['Bytes']['input']>;
  _taskCreator_lte?: InputMaybe<Scalars['Bytes']['input']>;
  _taskCreator_not?: InputMaybe<Scalars['Bytes']['input']>;
  _taskCreator_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  _taskCreator_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  _to?: InputMaybe<Scalars['Bytes']['input']>;
  _toChain?: InputMaybe<Scalars['BigInt']['input']>;
  _toChain_gt?: InputMaybe<Scalars['BigInt']['input']>;
  _toChain_gte?: InputMaybe<Scalars['BigInt']['input']>;
  _toChain_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  _toChain_lt?: InputMaybe<Scalars['BigInt']['input']>;
  _toChain_lte?: InputMaybe<Scalars['BigInt']['input']>;
  _toChain_not?: InputMaybe<Scalars['BigInt']['input']>;
  _toChain_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  _toToken?: InputMaybe<Scalars['Bytes']['input']>;
  _toToken_contains?: InputMaybe<Scalars['Bytes']['input']>;
  _toToken_gt?: InputMaybe<Scalars['Bytes']['input']>;
  _toToken_gte?: InputMaybe<Scalars['Bytes']['input']>;
  _toToken_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  _toToken_lt?: InputMaybe<Scalars['Bytes']['input']>;
  _toToken_lte?: InputMaybe<Scalars['Bytes']['input']>;
  _toToken_not?: InputMaybe<Scalars['Bytes']['input']>;
  _toToken_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  _toToken_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  _to_contains?: InputMaybe<Scalars['Bytes']['input']>;
  _to_gt?: InputMaybe<Scalars['Bytes']['input']>;
  _to_gte?: InputMaybe<Scalars['Bytes']['input']>;
  _to_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  _to_lt?: InputMaybe<Scalars['Bytes']['input']>;
  _to_lte?: InputMaybe<Scalars['Bytes']['input']>;
  _to_not?: InputMaybe<Scalars['Bytes']['input']>;
  _to_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  _to_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  and?: InputMaybe<Array<InputMaybe<JobCreated_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  option?: InputMaybe<Scalars['Int']['input']>;
  option_gt?: InputMaybe<Scalars['Int']['input']>;
  option_gte?: InputMaybe<Scalars['Int']['input']>;
  option_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  option_lt?: InputMaybe<Scalars['Int']['input']>;
  option_lte?: InputMaybe<Scalars['Int']['input']>;
  option_not?: InputMaybe<Scalars['Int']['input']>;
  option_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  or?: InputMaybe<Array<InputMaybe<JobCreated_Filter>>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum JobCreated_OrderBy {
  Amount = '_amount',
  Cycles = '_cycles',
  DestinationContract = '_destinationContract',
  DestinationDomain = '_destinationDomain',
  FromToken = '_fromToken',
  GelatoTaskId = '_gelatoTaskId',
  Interval = '_interval',
  JobId = '_jobId',
  StartTime = '_startTime',
  TaskCreator = '_taskCreator',
  To = '_to',
  ToChain = '_toChain',
  ToToken = '_toToken',
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  Option = 'option',
  TransactionHash = 'transactionHash',
}

export type JobSuccess = {
  __typename?: 'JobSuccess';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  callSuccess: Scalars['Boolean']['output'];
  execAddress: Scalars['Bytes']['output'];
  execData: Scalars['Bytes']['output'];
  feeToken: Scalars['Bytes']['output'];
  id: Scalars['String']['output'];
  taskId: Scalars['Bytes']['output'];
  transactionHash: Scalars['Bytes']['output'];
  txFee: Scalars['BigInt']['output'];
};

export type JobSuccess_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<JobSuccess_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  callSuccess?: InputMaybe<Scalars['Boolean']['input']>;
  callSuccess_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  callSuccess_not?: InputMaybe<Scalars['Boolean']['input']>;
  callSuccess_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  execAddress?: InputMaybe<Scalars['Bytes']['input']>;
  execAddress_contains?: InputMaybe<Scalars['Bytes']['input']>;
  execAddress_gt?: InputMaybe<Scalars['Bytes']['input']>;
  execAddress_gte?: InputMaybe<Scalars['Bytes']['input']>;
  execAddress_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  execAddress_lt?: InputMaybe<Scalars['Bytes']['input']>;
  execAddress_lte?: InputMaybe<Scalars['Bytes']['input']>;
  execAddress_not?: InputMaybe<Scalars['Bytes']['input']>;
  execAddress_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  execAddress_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  execData?: InputMaybe<Scalars['Bytes']['input']>;
  execData_contains?: InputMaybe<Scalars['Bytes']['input']>;
  execData_gt?: InputMaybe<Scalars['Bytes']['input']>;
  execData_gte?: InputMaybe<Scalars['Bytes']['input']>;
  execData_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  execData_lt?: InputMaybe<Scalars['Bytes']['input']>;
  execData_lte?: InputMaybe<Scalars['Bytes']['input']>;
  execData_not?: InputMaybe<Scalars['Bytes']['input']>;
  execData_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  execData_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  feeToken?: InputMaybe<Scalars['Bytes']['input']>;
  feeToken_contains?: InputMaybe<Scalars['Bytes']['input']>;
  feeToken_gt?: InputMaybe<Scalars['Bytes']['input']>;
  feeToken_gte?: InputMaybe<Scalars['Bytes']['input']>;
  feeToken_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  feeToken_lt?: InputMaybe<Scalars['Bytes']['input']>;
  feeToken_lte?: InputMaybe<Scalars['Bytes']['input']>;
  feeToken_not?: InputMaybe<Scalars['Bytes']['input']>;
  feeToken_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  feeToken_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<JobSuccess_Filter>>>;
  taskId?: InputMaybe<Scalars['Bytes']['input']>;
  taskId_contains?: InputMaybe<Scalars['Bytes']['input']>;
  taskId_gt?: InputMaybe<Scalars['Bytes']['input']>;
  taskId_gte?: InputMaybe<Scalars['Bytes']['input']>;
  taskId_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  taskId_lt?: InputMaybe<Scalars['Bytes']['input']>;
  taskId_lte?: InputMaybe<Scalars['Bytes']['input']>;
  taskId_not?: InputMaybe<Scalars['Bytes']['input']>;
  taskId_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  taskId_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  txFee?: InputMaybe<Scalars['BigInt']['input']>;
  txFee_gt?: InputMaybe<Scalars['BigInt']['input']>;
  txFee_gte?: InputMaybe<Scalars['BigInt']['input']>;
  txFee_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  txFee_lt?: InputMaybe<Scalars['BigInt']['input']>;
  txFee_lte?: InputMaybe<Scalars['BigInt']['input']>;
  txFee_not?: InputMaybe<Scalars['BigInt']['input']>;
  txFee_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum JobSuccess_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  CallSuccess = 'callSuccess',
  ExecAddress = 'execAddress',
  ExecData = 'execData',
  FeeToken = 'feeToken',
  Id = 'id',
  TaskId = 'taskId',
  TransactionHash = 'transactionHash',
  TxFee = 'txFee',
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export type OwnershipTransferred = {
  __typename?: 'OwnershipTransferred';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  newOwner: Scalars['Bytes']['output'];
  previousOwner: Scalars['Bytes']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type OwnershipTransferred_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<OwnershipTransferred_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  newOwner?: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_contains?: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_gt?: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_gte?: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  newOwner_lt?: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_lte?: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_not?: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<OwnershipTransferred_Filter>>>;
  previousOwner?: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_contains?: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_gt?: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_gte?: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  previousOwner_lt?: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_lte?: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_not?: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum OwnershipTransferred_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  NewOwner = 'newOwner',
  PreviousOwner = 'previousOwner',
  TransactionHash = 'transactionHash',
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  adminChanged?: Maybe<AdminChanged>;
  adminChangeds: Array<AdminChanged>;
  beaconUpgraded?: Maybe<BeaconUpgraded>;
  beaconUpgradeds: Array<BeaconUpgraded>;
  fundsDeposited?: Maybe<FundsDeposited>;
  fundsDepositeds: Array<FundsDeposited>;
  fundsWithdrawn?: Maybe<FundsWithdrawn>;
  fundsWithdrawns: Array<FundsWithdrawn>;
  initialized?: Maybe<Initialized>;
  initializeds: Array<Initialized>;
  jobCreated?: Maybe<JobCreated>;
  jobCreated1?: Maybe<JobCreated1>;
  jobCreated1S: Array<JobCreated1>;
  jobCreateds: Array<JobCreated>;
  jobSuccess?: Maybe<JobSuccess>;
  jobSuccesses: Array<JobSuccess>;
  ownershipTransferred?: Maybe<OwnershipTransferred>;
  ownershipTransferreds: Array<OwnershipTransferred>;
  treasuryAdminChanged?: Maybe<TreasuryAdminChanged>;
  treasuryAdminChangeds: Array<TreasuryAdminChanged>;
  treasuryBeaconUpgraded?: Maybe<TreasuryBeaconUpgraded>;
  treasuryBeaconUpgradeds: Array<TreasuryBeaconUpgraded>;
  treasuryFundsDeposited?: Maybe<TreasuryFundsDeposited>;
  treasuryFundsDepositeds: Array<TreasuryFundsDeposited>;
  treasuryFundsWithdrawn?: Maybe<TreasuryFundsWithdrawn>;
  treasuryFundsWithdrawns: Array<TreasuryFundsWithdrawn>;
  treasuryInitialized?: Maybe<TreasuryInitialized>;
  treasuryInitializeds: Array<TreasuryInitialized>;
  treasuryOwnershipTransferred?: Maybe<TreasuryOwnershipTransferred>;
  treasuryOwnershipTransferreds: Array<TreasuryOwnershipTransferred>;
  treasuryUpgraded?: Maybe<TreasuryUpgraded>;
  treasuryUpgradeds: Array<TreasuryUpgraded>;
  upgraded?: Maybe<Upgraded>;
  upgradeds: Array<Upgraded>;
  xreceiveData?: Maybe<XReceiveData>;
  xreceiveDatas: Array<XReceiveData>;
  xtransferData?: Maybe<XTransferData>;
  xtransferDatas: Array<XTransferData>;
};

export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};

export type QueryAdminChangedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryAdminChangedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AdminChanged_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AdminChanged_Filter>;
};

export type QueryBeaconUpgradedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryBeaconUpgradedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BeaconUpgraded_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<BeaconUpgraded_Filter>;
};

export type QueryFundsDepositedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryFundsDepositedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<FundsDeposited_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FundsDeposited_Filter>;
};

export type QueryFundsWithdrawnArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryFundsWithdrawnsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<FundsWithdrawn_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FundsWithdrawn_Filter>;
};

export type QueryInitializedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryInitializedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Initialized_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Initialized_Filter>;
};

export type QueryJobCreatedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryJobCreated1Args = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryJobCreated1SArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<JobCreated1_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<JobCreated1_Filter>;
};

export type QueryJobCreatedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<JobCreated_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<JobCreated_Filter>;
};

export type QueryJobSuccessArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryJobSuccessesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<JobSuccess_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<JobSuccess_Filter>;
};

export type QueryOwnershipTransferredArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryOwnershipTransferredsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<OwnershipTransferred_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<OwnershipTransferred_Filter>;
};

export type QueryTreasuryAdminChangedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryTreasuryAdminChangedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TreasuryAdminChanged_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TreasuryAdminChanged_Filter>;
};

export type QueryTreasuryBeaconUpgradedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryTreasuryBeaconUpgradedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TreasuryBeaconUpgraded_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TreasuryBeaconUpgraded_Filter>;
};

export type QueryTreasuryFundsDepositedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryTreasuryFundsDepositedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TreasuryFundsDeposited_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TreasuryFundsDeposited_Filter>;
};

export type QueryTreasuryFundsWithdrawnArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryTreasuryFundsWithdrawnsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TreasuryFundsWithdrawn_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TreasuryFundsWithdrawn_Filter>;
};

export type QueryTreasuryInitializedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryTreasuryInitializedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TreasuryInitialized_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TreasuryInitialized_Filter>;
};

export type QueryTreasuryOwnershipTransferredArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryTreasuryOwnershipTransferredsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TreasuryOwnershipTransferred_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TreasuryOwnershipTransferred_Filter>;
};

export type QueryTreasuryUpgradedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryTreasuryUpgradedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TreasuryUpgraded_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TreasuryUpgraded_Filter>;
};

export type QueryUpgradedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryUpgradedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Upgraded_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Upgraded_Filter>;
};

export type QueryXreceiveDataArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryXreceiveDatasArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<XReceiveData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<XReceiveData_Filter>;
};

export type QueryXtransferDataArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryXtransferDatasArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<XTransferData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<XTransferData_Filter>;
};

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  adminChanged?: Maybe<AdminChanged>;
  adminChangeds: Array<AdminChanged>;
  beaconUpgraded?: Maybe<BeaconUpgraded>;
  beaconUpgradeds: Array<BeaconUpgraded>;
  fundsDeposited?: Maybe<FundsDeposited>;
  fundsDepositeds: Array<FundsDeposited>;
  fundsWithdrawn?: Maybe<FundsWithdrawn>;
  fundsWithdrawns: Array<FundsWithdrawn>;
  initialized?: Maybe<Initialized>;
  initializeds: Array<Initialized>;
  jobCreated?: Maybe<JobCreated>;
  jobCreated1?: Maybe<JobCreated1>;
  jobCreated1S: Array<JobCreated1>;
  jobCreateds: Array<JobCreated>;
  jobSuccess?: Maybe<JobSuccess>;
  jobSuccesses: Array<JobSuccess>;
  ownershipTransferred?: Maybe<OwnershipTransferred>;
  ownershipTransferreds: Array<OwnershipTransferred>;
  treasuryAdminChanged?: Maybe<TreasuryAdminChanged>;
  treasuryAdminChangeds: Array<TreasuryAdminChanged>;
  treasuryBeaconUpgraded?: Maybe<TreasuryBeaconUpgraded>;
  treasuryBeaconUpgradeds: Array<TreasuryBeaconUpgraded>;
  treasuryFundsDeposited?: Maybe<TreasuryFundsDeposited>;
  treasuryFundsDepositeds: Array<TreasuryFundsDeposited>;
  treasuryFundsWithdrawn?: Maybe<TreasuryFundsWithdrawn>;
  treasuryFundsWithdrawns: Array<TreasuryFundsWithdrawn>;
  treasuryInitialized?: Maybe<TreasuryInitialized>;
  treasuryInitializeds: Array<TreasuryInitialized>;
  treasuryOwnershipTransferred?: Maybe<TreasuryOwnershipTransferred>;
  treasuryOwnershipTransferreds: Array<TreasuryOwnershipTransferred>;
  treasuryUpgraded?: Maybe<TreasuryUpgraded>;
  treasuryUpgradeds: Array<TreasuryUpgraded>;
  upgraded?: Maybe<Upgraded>;
  upgradeds: Array<Upgraded>;
  xreceiveData?: Maybe<XReceiveData>;
  xreceiveDatas: Array<XReceiveData>;
  xtransferData?: Maybe<XTransferData>;
  xtransferDatas: Array<XTransferData>;
};

export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};

export type SubscriptionAdminChangedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionAdminChangedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AdminChanged_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AdminChanged_Filter>;
};

export type SubscriptionBeaconUpgradedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionBeaconUpgradedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BeaconUpgraded_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<BeaconUpgraded_Filter>;
};

export type SubscriptionFundsDepositedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionFundsDepositedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<FundsDeposited_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FundsDeposited_Filter>;
};

export type SubscriptionFundsWithdrawnArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionFundsWithdrawnsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<FundsWithdrawn_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FundsWithdrawn_Filter>;
};

export type SubscriptionInitializedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionInitializedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Initialized_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Initialized_Filter>;
};

export type SubscriptionJobCreatedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionJobCreated1Args = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionJobCreated1SArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<JobCreated1_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<JobCreated1_Filter>;
};

export type SubscriptionJobCreatedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<JobCreated_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<JobCreated_Filter>;
};

export type SubscriptionJobSuccessArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionJobSuccessesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<JobSuccess_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<JobSuccess_Filter>;
};

export type SubscriptionOwnershipTransferredArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionOwnershipTransferredsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<OwnershipTransferred_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<OwnershipTransferred_Filter>;
};

export type SubscriptionTreasuryAdminChangedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionTreasuryAdminChangedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TreasuryAdminChanged_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TreasuryAdminChanged_Filter>;
};

export type SubscriptionTreasuryBeaconUpgradedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionTreasuryBeaconUpgradedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TreasuryBeaconUpgraded_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TreasuryBeaconUpgraded_Filter>;
};

export type SubscriptionTreasuryFundsDepositedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionTreasuryFundsDepositedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TreasuryFundsDeposited_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TreasuryFundsDeposited_Filter>;
};

export type SubscriptionTreasuryFundsWithdrawnArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionTreasuryFundsWithdrawnsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TreasuryFundsWithdrawn_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TreasuryFundsWithdrawn_Filter>;
};

export type SubscriptionTreasuryInitializedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionTreasuryInitializedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TreasuryInitialized_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TreasuryInitialized_Filter>;
};

export type SubscriptionTreasuryOwnershipTransferredArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionTreasuryOwnershipTransferredsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TreasuryOwnershipTransferred_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TreasuryOwnershipTransferred_Filter>;
};

export type SubscriptionTreasuryUpgradedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionTreasuryUpgradedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TreasuryUpgraded_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TreasuryUpgraded_Filter>;
};

export type SubscriptionUpgradedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionUpgradedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Upgraded_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Upgraded_Filter>;
};

export type SubscriptionXreceiveDataArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionXreceiveDatasArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<XReceiveData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<XReceiveData_Filter>;
};

export type SubscriptionXtransferDataArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionXtransferDatasArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<XTransferData_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<XTransferData_Filter>;
};

export type TreasuryAdminChanged = {
  __typename?: 'TreasuryAdminChanged';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  newAdmin: Scalars['Bytes']['output'];
  previousAdmin: Scalars['Bytes']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type TreasuryAdminChanged_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<TreasuryAdminChanged_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  newAdmin?: InputMaybe<Scalars['Bytes']['input']>;
  newAdmin_contains?: InputMaybe<Scalars['Bytes']['input']>;
  newAdmin_gt?: InputMaybe<Scalars['Bytes']['input']>;
  newAdmin_gte?: InputMaybe<Scalars['Bytes']['input']>;
  newAdmin_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  newAdmin_lt?: InputMaybe<Scalars['Bytes']['input']>;
  newAdmin_lte?: InputMaybe<Scalars['Bytes']['input']>;
  newAdmin_not?: InputMaybe<Scalars['Bytes']['input']>;
  newAdmin_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  newAdmin_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<TreasuryAdminChanged_Filter>>>;
  previousAdmin?: InputMaybe<Scalars['Bytes']['input']>;
  previousAdmin_contains?: InputMaybe<Scalars['Bytes']['input']>;
  previousAdmin_gt?: InputMaybe<Scalars['Bytes']['input']>;
  previousAdmin_gte?: InputMaybe<Scalars['Bytes']['input']>;
  previousAdmin_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  previousAdmin_lt?: InputMaybe<Scalars['Bytes']['input']>;
  previousAdmin_lte?: InputMaybe<Scalars['Bytes']['input']>;
  previousAdmin_not?: InputMaybe<Scalars['Bytes']['input']>;
  previousAdmin_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  previousAdmin_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum TreasuryAdminChanged_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  NewAdmin = 'newAdmin',
  PreviousAdmin = 'previousAdmin',
  TransactionHash = 'transactionHash',
}

export type TreasuryBeaconUpgraded = {
  __typename?: 'TreasuryBeaconUpgraded';
  beacon: Scalars['Bytes']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type TreasuryBeaconUpgraded_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<TreasuryBeaconUpgraded_Filter>>>;
  beacon?: InputMaybe<Scalars['Bytes']['input']>;
  beacon_contains?: InputMaybe<Scalars['Bytes']['input']>;
  beacon_gt?: InputMaybe<Scalars['Bytes']['input']>;
  beacon_gte?: InputMaybe<Scalars['Bytes']['input']>;
  beacon_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  beacon_lt?: InputMaybe<Scalars['Bytes']['input']>;
  beacon_lte?: InputMaybe<Scalars['Bytes']['input']>;
  beacon_not?: InputMaybe<Scalars['Bytes']['input']>;
  beacon_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  beacon_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<TreasuryBeaconUpgraded_Filter>>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum TreasuryBeaconUpgraded_OrderBy {
  Beacon = 'beacon',
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  TransactionHash = 'transactionHash',
}

export type TreasuryFundsDeposited = {
  __typename?: 'TreasuryFundsDeposited';
  amount: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  sender: Scalars['Bytes']['output'];
  token: Scalars['Bytes']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type TreasuryFundsDeposited_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<TreasuryFundsDeposited_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<TreasuryFundsDeposited_Filter>>>;
  sender?: InputMaybe<Scalars['Bytes']['input']>;
  sender_contains?: InputMaybe<Scalars['Bytes']['input']>;
  sender_gt?: InputMaybe<Scalars['Bytes']['input']>;
  sender_gte?: InputMaybe<Scalars['Bytes']['input']>;
  sender_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  sender_lt?: InputMaybe<Scalars['Bytes']['input']>;
  sender_lte?: InputMaybe<Scalars['Bytes']['input']>;
  sender_not?: InputMaybe<Scalars['Bytes']['input']>;
  sender_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  sender_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  token?: InputMaybe<Scalars['Bytes']['input']>;
  token_contains?: InputMaybe<Scalars['Bytes']['input']>;
  token_gt?: InputMaybe<Scalars['Bytes']['input']>;
  token_gte?: InputMaybe<Scalars['Bytes']['input']>;
  token_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  token_lt?: InputMaybe<Scalars['Bytes']['input']>;
  token_lte?: InputMaybe<Scalars['Bytes']['input']>;
  token_not?: InputMaybe<Scalars['Bytes']['input']>;
  token_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  token_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum TreasuryFundsDeposited_OrderBy {
  Amount = 'amount',
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  Sender = 'sender',
  Token = 'token',
  TransactionHash = 'transactionHash',
}

export type TreasuryFundsWithdrawn = {
  __typename?: 'TreasuryFundsWithdrawn';
  amount: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  initiator: Scalars['Bytes']['output'];
  receiver: Scalars['Bytes']['output'];
  token: Scalars['Bytes']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type TreasuryFundsWithdrawn_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<TreasuryFundsWithdrawn_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  initiator?: InputMaybe<Scalars['Bytes']['input']>;
  initiator_contains?: InputMaybe<Scalars['Bytes']['input']>;
  initiator_gt?: InputMaybe<Scalars['Bytes']['input']>;
  initiator_gte?: InputMaybe<Scalars['Bytes']['input']>;
  initiator_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  initiator_lt?: InputMaybe<Scalars['Bytes']['input']>;
  initiator_lte?: InputMaybe<Scalars['Bytes']['input']>;
  initiator_not?: InputMaybe<Scalars['Bytes']['input']>;
  initiator_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  initiator_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<TreasuryFundsWithdrawn_Filter>>>;
  receiver?: InputMaybe<Scalars['Bytes']['input']>;
  receiver_contains?: InputMaybe<Scalars['Bytes']['input']>;
  receiver_gt?: InputMaybe<Scalars['Bytes']['input']>;
  receiver_gte?: InputMaybe<Scalars['Bytes']['input']>;
  receiver_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  receiver_lt?: InputMaybe<Scalars['Bytes']['input']>;
  receiver_lte?: InputMaybe<Scalars['Bytes']['input']>;
  receiver_not?: InputMaybe<Scalars['Bytes']['input']>;
  receiver_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  receiver_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  token?: InputMaybe<Scalars['Bytes']['input']>;
  token_contains?: InputMaybe<Scalars['Bytes']['input']>;
  token_gt?: InputMaybe<Scalars['Bytes']['input']>;
  token_gte?: InputMaybe<Scalars['Bytes']['input']>;
  token_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  token_lt?: InputMaybe<Scalars['Bytes']['input']>;
  token_lte?: InputMaybe<Scalars['Bytes']['input']>;
  token_not?: InputMaybe<Scalars['Bytes']['input']>;
  token_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  token_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum TreasuryFundsWithdrawn_OrderBy {
  Amount = 'amount',
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  Initiator = 'initiator',
  Receiver = 'receiver',
  Token = 'token',
  TransactionHash = 'transactionHash',
}

export type TreasuryInitialized = {
  __typename?: 'TreasuryInitialized';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  transactionHash: Scalars['Bytes']['output'];
  version: Scalars['Int']['output'];
};

export type TreasuryInitialized_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<TreasuryInitialized_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<TreasuryInitialized_Filter>>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  version?: InputMaybe<Scalars['Int']['input']>;
  version_gt?: InputMaybe<Scalars['Int']['input']>;
  version_gte?: InputMaybe<Scalars['Int']['input']>;
  version_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  version_lt?: InputMaybe<Scalars['Int']['input']>;
  version_lte?: InputMaybe<Scalars['Int']['input']>;
  version_not?: InputMaybe<Scalars['Int']['input']>;
  version_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export enum TreasuryInitialized_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  TransactionHash = 'transactionHash',
  Version = 'version',
}

export type TreasuryOwnershipTransferred = {
  __typename?: 'TreasuryOwnershipTransferred';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  newOwner: Scalars['Bytes']['output'];
  previousOwner: Scalars['Bytes']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type TreasuryOwnershipTransferred_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<TreasuryOwnershipTransferred_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  newOwner?: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_contains?: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_gt?: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_gte?: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  newOwner_lt?: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_lte?: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_not?: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  newOwner_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<TreasuryOwnershipTransferred_Filter>>>;
  previousOwner?: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_contains?: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_gt?: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_gte?: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  previousOwner_lt?: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_lte?: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_not?: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  previousOwner_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum TreasuryOwnershipTransferred_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  NewOwner = 'newOwner',
  PreviousOwner = 'previousOwner',
  TransactionHash = 'transactionHash',
}

export type TreasuryUpgraded = {
  __typename?: 'TreasuryUpgraded';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  implementation: Scalars['Bytes']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type TreasuryUpgraded_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<TreasuryUpgraded_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  implementation?: InputMaybe<Scalars['Bytes']['input']>;
  implementation_contains?: InputMaybe<Scalars['Bytes']['input']>;
  implementation_gt?: InputMaybe<Scalars['Bytes']['input']>;
  implementation_gte?: InputMaybe<Scalars['Bytes']['input']>;
  implementation_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  implementation_lt?: InputMaybe<Scalars['Bytes']['input']>;
  implementation_lte?: InputMaybe<Scalars['Bytes']['input']>;
  implementation_not?: InputMaybe<Scalars['Bytes']['input']>;
  implementation_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  implementation_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<TreasuryUpgraded_Filter>>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum TreasuryUpgraded_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  Implementation = 'implementation',
  TransactionHash = 'transactionHash',
}

export type Upgraded = {
  __typename?: 'Upgraded';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  implementation: Scalars['Bytes']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type Upgraded_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Upgraded_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  implementation?: InputMaybe<Scalars['Bytes']['input']>;
  implementation_contains?: InputMaybe<Scalars['Bytes']['input']>;
  implementation_gt?: InputMaybe<Scalars['Bytes']['input']>;
  implementation_gte?: InputMaybe<Scalars['Bytes']['input']>;
  implementation_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  implementation_lt?: InputMaybe<Scalars['Bytes']['input']>;
  implementation_lte?: InputMaybe<Scalars['Bytes']['input']>;
  implementation_not?: InputMaybe<Scalars['Bytes']['input']>;
  implementation_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  implementation_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Upgraded_Filter>>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum Upgraded_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  Implementation = 'implementation',
  TransactionHash = 'transactionHash',
}

export type XReceiveData = {
  __typename?: 'XReceiveData';
  amount: Scalars['BigInt']['output'];
  asset: Scalars['Bytes']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  origin: Scalars['BigInt']['output'];
  originSender: Scalars['Bytes']['output'];
  receiveTimestamp: Scalars['BigInt']['output'];
  receiverAccount: Scalars['Bytes']['output'];
  senderAccount: Scalars['Bytes']['output'];
  transactionHash: Scalars['Bytes']['output'];
  transferId: Scalars['Bytes']['output'];
};

export type XReceiveData_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<XReceiveData_Filter>>>;
  asset?: InputMaybe<Scalars['Bytes']['input']>;
  asset_contains?: InputMaybe<Scalars['Bytes']['input']>;
  asset_gt?: InputMaybe<Scalars['Bytes']['input']>;
  asset_gte?: InputMaybe<Scalars['Bytes']['input']>;
  asset_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  asset_lt?: InputMaybe<Scalars['Bytes']['input']>;
  asset_lte?: InputMaybe<Scalars['Bytes']['input']>;
  asset_not?: InputMaybe<Scalars['Bytes']['input']>;
  asset_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  asset_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<XReceiveData_Filter>>>;
  origin?: InputMaybe<Scalars['BigInt']['input']>;
  originSender?: InputMaybe<Scalars['Bytes']['input']>;
  originSender_contains?: InputMaybe<Scalars['Bytes']['input']>;
  originSender_gt?: InputMaybe<Scalars['Bytes']['input']>;
  originSender_gte?: InputMaybe<Scalars['Bytes']['input']>;
  originSender_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  originSender_lt?: InputMaybe<Scalars['Bytes']['input']>;
  originSender_lte?: InputMaybe<Scalars['Bytes']['input']>;
  originSender_not?: InputMaybe<Scalars['Bytes']['input']>;
  originSender_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  originSender_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  origin_gt?: InputMaybe<Scalars['BigInt']['input']>;
  origin_gte?: InputMaybe<Scalars['BigInt']['input']>;
  origin_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  origin_lt?: InputMaybe<Scalars['BigInt']['input']>;
  origin_lte?: InputMaybe<Scalars['BigInt']['input']>;
  origin_not?: InputMaybe<Scalars['BigInt']['input']>;
  origin_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  receiveTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  receiveTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  receiveTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  receiveTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  receiveTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  receiveTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  receiveTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  receiveTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  receiverAccount?: InputMaybe<Scalars['Bytes']['input']>;
  receiverAccount_contains?: InputMaybe<Scalars['Bytes']['input']>;
  receiverAccount_gt?: InputMaybe<Scalars['Bytes']['input']>;
  receiverAccount_gte?: InputMaybe<Scalars['Bytes']['input']>;
  receiverAccount_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  receiverAccount_lt?: InputMaybe<Scalars['Bytes']['input']>;
  receiverAccount_lte?: InputMaybe<Scalars['Bytes']['input']>;
  receiverAccount_not?: InputMaybe<Scalars['Bytes']['input']>;
  receiverAccount_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  receiverAccount_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  senderAccount?: InputMaybe<Scalars['Bytes']['input']>;
  senderAccount_contains?: InputMaybe<Scalars['Bytes']['input']>;
  senderAccount_gt?: InputMaybe<Scalars['Bytes']['input']>;
  senderAccount_gte?: InputMaybe<Scalars['Bytes']['input']>;
  senderAccount_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  senderAccount_lt?: InputMaybe<Scalars['Bytes']['input']>;
  senderAccount_lte?: InputMaybe<Scalars['Bytes']['input']>;
  senderAccount_not?: InputMaybe<Scalars['Bytes']['input']>;
  senderAccount_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  senderAccount_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transferId?: InputMaybe<Scalars['Bytes']['input']>;
  transferId_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transferId_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transferId_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transferId_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transferId_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transferId_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transferId_not?: InputMaybe<Scalars['Bytes']['input']>;
  transferId_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transferId_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum XReceiveData_OrderBy {
  Amount = 'amount',
  Asset = 'asset',
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  Origin = 'origin',
  OriginSender = 'originSender',
  ReceiveTimestamp = 'receiveTimestamp',
  ReceiverAccount = 'receiverAccount',
  SenderAccount = 'senderAccount',
  TransactionHash = 'transactionHash',
  TransferId = 'transferId',
}

export type XTransferData = {
  __typename?: 'XTransferData';
  amount: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  destinationContract: Scalars['Bytes']['output'];
  destinationDomain: Scalars['BigInt']['output'];
  fromToken: Scalars['Bytes']['output'];
  id: Scalars['String']['output'];
  receiver: Scalars['Bytes']['output'];
  relayerFeeInTransactingAsset: Scalars['BigInt']['output'];
  sender: Scalars['Bytes']['output'];
  startTime: Scalars['BigInt']['output'];
  toToken: Scalars['Bytes']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type XTransferData_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<XTransferData_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  destinationContract?: InputMaybe<Scalars['Bytes']['input']>;
  destinationContract_contains?: InputMaybe<Scalars['Bytes']['input']>;
  destinationContract_gt?: InputMaybe<Scalars['Bytes']['input']>;
  destinationContract_gte?: InputMaybe<Scalars['Bytes']['input']>;
  destinationContract_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  destinationContract_lt?: InputMaybe<Scalars['Bytes']['input']>;
  destinationContract_lte?: InputMaybe<Scalars['Bytes']['input']>;
  destinationContract_not?: InputMaybe<Scalars['Bytes']['input']>;
  destinationContract_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  destinationContract_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  destinationDomain?: InputMaybe<Scalars['BigInt']['input']>;
  destinationDomain_gt?: InputMaybe<Scalars['BigInt']['input']>;
  destinationDomain_gte?: InputMaybe<Scalars['BigInt']['input']>;
  destinationDomain_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  destinationDomain_lt?: InputMaybe<Scalars['BigInt']['input']>;
  destinationDomain_lte?: InputMaybe<Scalars['BigInt']['input']>;
  destinationDomain_not?: InputMaybe<Scalars['BigInt']['input']>;
  destinationDomain_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  fromToken?: InputMaybe<Scalars['Bytes']['input']>;
  fromToken_contains?: InputMaybe<Scalars['Bytes']['input']>;
  fromToken_gt?: InputMaybe<Scalars['Bytes']['input']>;
  fromToken_gte?: InputMaybe<Scalars['Bytes']['input']>;
  fromToken_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  fromToken_lt?: InputMaybe<Scalars['Bytes']['input']>;
  fromToken_lte?: InputMaybe<Scalars['Bytes']['input']>;
  fromToken_not?: InputMaybe<Scalars['Bytes']['input']>;
  fromToken_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  fromToken_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id_starts_with?: InputMaybe<Scalars['String']['input']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<XTransferData_Filter>>>;
  receiver?: InputMaybe<Scalars['Bytes']['input']>;
  receiver_contains?: InputMaybe<Scalars['Bytes']['input']>;
  receiver_gt?: InputMaybe<Scalars['Bytes']['input']>;
  receiver_gte?: InputMaybe<Scalars['Bytes']['input']>;
  receiver_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  receiver_lt?: InputMaybe<Scalars['Bytes']['input']>;
  receiver_lte?: InputMaybe<Scalars['Bytes']['input']>;
  receiver_not?: InputMaybe<Scalars['Bytes']['input']>;
  receiver_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  receiver_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  relayerFeeInTransactingAsset?: InputMaybe<Scalars['BigInt']['input']>;
  relayerFeeInTransactingAsset_gt?: InputMaybe<Scalars['BigInt']['input']>;
  relayerFeeInTransactingAsset_gte?: InputMaybe<Scalars['BigInt']['input']>;
  relayerFeeInTransactingAsset_in?: InputMaybe<
    Array<Scalars['BigInt']['input']>
  >;
  relayerFeeInTransactingAsset_lt?: InputMaybe<Scalars['BigInt']['input']>;
  relayerFeeInTransactingAsset_lte?: InputMaybe<Scalars['BigInt']['input']>;
  relayerFeeInTransactingAsset_not?: InputMaybe<Scalars['BigInt']['input']>;
  relayerFeeInTransactingAsset_not_in?: InputMaybe<
    Array<Scalars['BigInt']['input']>
  >;
  sender?: InputMaybe<Scalars['Bytes']['input']>;
  sender_contains?: InputMaybe<Scalars['Bytes']['input']>;
  sender_gt?: InputMaybe<Scalars['Bytes']['input']>;
  sender_gte?: InputMaybe<Scalars['Bytes']['input']>;
  sender_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  sender_lt?: InputMaybe<Scalars['Bytes']['input']>;
  sender_lte?: InputMaybe<Scalars['Bytes']['input']>;
  sender_not?: InputMaybe<Scalars['Bytes']['input']>;
  sender_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  sender_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  startTime?: InputMaybe<Scalars['BigInt']['input']>;
  startTime_gt?: InputMaybe<Scalars['BigInt']['input']>;
  startTime_gte?: InputMaybe<Scalars['BigInt']['input']>;
  startTime_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  startTime_lt?: InputMaybe<Scalars['BigInt']['input']>;
  startTime_lte?: InputMaybe<Scalars['BigInt']['input']>;
  startTime_not?: InputMaybe<Scalars['BigInt']['input']>;
  startTime_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  toToken?: InputMaybe<Scalars['Bytes']['input']>;
  toToken_contains?: InputMaybe<Scalars['Bytes']['input']>;
  toToken_gt?: InputMaybe<Scalars['Bytes']['input']>;
  toToken_gte?: InputMaybe<Scalars['Bytes']['input']>;
  toToken_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  toToken_lt?: InputMaybe<Scalars['Bytes']['input']>;
  toToken_lte?: InputMaybe<Scalars['Bytes']['input']>;
  toToken_not?: InputMaybe<Scalars['Bytes']['input']>;
  toToken_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  toToken_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum XTransferData_OrderBy {
  Amount = 'amount',
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  DestinationContract = 'destinationContract',
  DestinationDomain = 'destinationDomain',
  FromToken = 'fromToken',
  Id = 'id',
  Receiver = 'receiver',
  RelayerFeeInTransactingAsset = 'relayerFeeInTransactingAsset',
  Sender = 'sender',
  StartTime = 'startTime',
  ToToken = 'toToken',
  TransactionHash = 'transactionHash',
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']['output']>;
  /** The block number */
  number: Scalars['Int']['output'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']['output']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String']['output'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']['output'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny',
}

export type GetAllJobsQueryVariables = Types.Exact<{
  block?: Types.InputMaybe<Types.Block_Height>;
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  orderBy?: Types.InputMaybe<Types.JobCreated_OrderBy>;
  orderDirection?: Types.InputMaybe<Types.OrderDirection>;
  skip?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  subgraphError?: Types._SubgraphErrorPolicy_;
  where?: Types.InputMaybe<Types.JobCreated_Filter>;
}>;

export type GetAllJobsQuery = {
  __typename?: 'Query';
  jobCreateds: Array<{
    __typename?: 'JobCreated';
    id: string;
    transactionHash: any;
    option: number;
    blockNumber: any;
    blockTimestamp: any;
    _toToken: any;
    _toChain: any;
    _to: any;
    _taskCreator: any;
    _startTime: any;
    _jobId: any;
    _interval: any;
    _gelatoTaskId: any;
    _destinationDomain: any;
    _fromToken: any;
    _destinationContract: any;
    _cycles: any;
    _amount: any;
  }>;
};

export const GetAllJobsDocument = gql`
  query getAllJobs(
    $block: Block_height
    $first: Int = 100
    $orderBy: JobCreated_orderBy
    $orderDirection: OrderDirection
    $skip: Int = 0
    $subgraphError: _SubgraphErrorPolicy_! = deny
    $where: JobCreated_filter
  ) {
    jobCreateds(
      block: $block
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      skip: $skip
      subgraphError: $subgraphError
      where: $where
    ) {
      id
      transactionHash
      option
      blockNumber
      blockTimestamp
      _toToken
      _toChain
      _to
      _taskCreator
      _startTime
      _jobId
      _interval
      _gelatoTaskId
      _destinationDomain
      _fromToken
      _destinationContract
      _cycles
      _amount
    }
  }
`;

/**
 * __useGetAllJobsQuery__
 *
 * To run a query within a React component, call `useGetAllJobsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllJobsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllJobsQuery({
 *   variables: {
 *      block: // value for 'block'
 *      first: // value for 'first'
 *      orderBy: // value for 'orderBy'
 *      orderDirection: // value for 'orderDirection'
 *      skip: // value for 'skip'
 *      subgraphError: // value for 'subgraphError'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetAllJobsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetAllJobsQuery,
    GetAllJobsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAllJobsQuery, GetAllJobsQueryVariables>(
    GetAllJobsDocument,
    options
  );
}
export function useGetAllJobsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllJobsQuery,
    GetAllJobsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAllJobsQuery, GetAllJobsQueryVariables>(
    GetAllJobsDocument,
    options
  );
}
export type GetAllJobsQueryHookResult = ReturnType<typeof useGetAllJobsQuery>;
export type GetAllJobsLazyQueryHookResult = ReturnType<
  typeof useGetAllJobsLazyQuery
>;
export type GetAllJobsQueryResult = Apollo.QueryResult<
  GetAllJobsQuery,
  GetAllJobsQueryVariables
>;
