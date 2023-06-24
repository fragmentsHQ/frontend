import * as Types from './types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AllRoyalties = {
  __typename?: 'AllRoyalties';
  onchain?: Maybe<Array<Maybe<Onchain>>>;
  opensea?: Maybe<Array<Maybe<Opensea>>>;
};

export type Amount = {
  __typename?: 'Amount';
  decimal?: Maybe<Scalars['Float']['output']>;
  native?: Maybe<Scalars['Float']['output']>;
  raw?: Maybe<Scalars['String']['output']>;
  usd?: Maybe<Scalars['Float']['output']>;
};

export type AsksInput = {
  /** Filter to a particular user. Example: 0xF296178d553C8Ec21A2fBD2c5dDa8CA9ac905A00 */
  maker?: InputMaybe<Scalars['String']['input']>;
  /** Filter to a particular token. Example: 0x8d04a8c79ceb0889bdd12acdf3fa9d207ed3ff63:123 */
  token: Scalars['String']['input'];
};

export type Attribute = {
  __typename?: 'Attribute';
  createdAt?: Maybe<Scalars['String']['output']>;
  floorAskPrice?: Maybe<Scalars['Int']['output']>;
  key?: Maybe<Scalars['String']['output']>;
  kind?: Maybe<Scalars['String']['output']>;
  onSaleCount?: Maybe<Scalars['Int']['output']>;
  tokenCount?: Maybe<Scalars['Int']['output']>;
  topBidValue?: Maybe<Scalars['Int']['output']>;
  value: Scalars['String']['output'];
};

export type AttributeInput = {
  /** Attribute name */
  name: Scalars['String']['input'];
  /** Attribute values */
  values: Array<Scalars['String']['input']>;
};

export type Breakdown = {
  __typename?: 'Breakdown';
  bps: Scalars['Int']['output'];
  recipient?: Maybe<Scalars['String']['output']>;
};

export type Collection = {
  __typename?: 'Collection';
  allRoyalties: AllRoyalties;
  banner?: Maybe<Scalars['String']['output']>;
  collectionBidSupported: Scalars['Boolean']['output'];
  contractKind?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  discordUrl?: Maybe<Scalars['String']['output']>;
  externalUrl?: Maybe<Scalars['String']['output']>;
  floorAsk: FloorAsk;
  floorSale: FloorSale;
  floorSaleChange: FloorSaleChange;
  id?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  lastBuy: LastBuy;
  links?: Maybe<Links>;
  mintedTimestamp?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  onSaleCount?: Maybe<Scalars['String']['output']>;
  openseaVerificationStatus?: Maybe<Scalars['String']['output']>;
  ownerCount?: Maybe<Scalars['Int']['output']>;
  primaryContract?: Maybe<Scalars['String']['output']>;
  rank: Rank;
  royalties: Royalties;
  salesCount?: Maybe<SalesCount>;
  sampleImages: Array<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  tokenCount?: Maybe<Scalars['String']['output']>;
  tokenSetId?: Maybe<Scalars['String']['output']>;
  topBid: TopBid;
  twitterUsername?: Maybe<Scalars['String']['output']>;
  volume: Volume;
  volumeChange: VolumeChange;
};

export type CollectionOutput = {
  __typename?: 'CollectionOutput';
  collections?: Maybe<Array<Maybe<Collections>>>;
  continuation?: Maybe<Scalars['String']['output']>;
};

export enum CollectionSortType {
  Day1Volume = 'Day1Volume',
  Day7Volume = 'Day7Volume',
  Day30Volume = 'Day30Volume',
  AllTimeVolume = 'allTimeVolume',
  CreatedAt = 'createdAt',
  FloorAskPrice = 'floorAskPrice'
}

export type Collections = {
  __typename?: 'Collections';
  allRoyalties?: Maybe<AllRoyalties>;
  banner?: Maybe<Scalars['String']['output']>;
  collectionBidSupported: Scalars['Boolean']['output'];
  contractKind?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  discordUrl?: Maybe<Scalars['String']['output']>;
  externalUrl?: Maybe<Scalars['String']['output']>;
  floorAsk: FloorAsk;
  floorSale: FloorSale;
  floorSaleChange: FloorSaleChange;
  id?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  lastBuy: LastBuy;
  links?: Maybe<Links>;
  mintedTimestamp?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  onSaleCount?: Maybe<Scalars['String']['output']>;
  openseaVerificationStatus?: Maybe<Scalars['String']['output']>;
  primaryContract?: Maybe<Scalars['String']['output']>;
  rank: Rank;
  royalties: Royalties;
  sampleImages: Array<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  tokenCount?: Maybe<Scalars['String']['output']>;
  tokenSetId?: Maybe<Scalars['String']['output']>;
  topBid: TopBid;
  twitterUsername?: Maybe<Scalars['String']['output']>;
  volume: Volume;
  volumeChange: VolumeChange;
};

export type Criteria = {
  __typename?: 'Criteria';
  data: CriteriaData;
  kind: Scalars['String']['output'];
};

export type CriteriaData = {
  __typename?: 'CriteriaData';
  collection: CriteriaDataCollection;
  token: CriteriaDataToken;
};

export type CriteriaDataCollection = {
  __typename?: 'CriteriaDataCollection';
  id: Scalars['String']['output'];
  image: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type CriteriaDataToken = {
  __typename?: 'CriteriaDataToken';
  image: Scalars['String']['output'];
  name: Scalars['String']['output'];
  tokenId: Scalars['String']['output'];
};

export type Currency = {
  __typename?: 'Currency';
  contract?: Maybe<Scalars['String']['output']>;
  decimals?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  symbol?: Maybe<Scalars['String']['output']>;
};

export type DailyCollection = {
  __typename?: 'DailyCollection';
  floor_sell_value?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  rank?: Maybe<Scalars['Int']['output']>;
  sales_count?: Maybe<Scalars['Int']['output']>;
  timestamp?: Maybe<Scalars['Int']['output']>;
  volume?: Maybe<Scalars['Float']['output']>;
};

export type DailyCollections = {
  __typename?: 'DailyCollections';
  collections?: Maybe<Array<DailyCollection>>;
};

export type DailyCollectionsInput = {
  /** The end timestamp you want to filter on (UTC) */
  endTimestamp?: InputMaybe<Scalars['Int']['input']>;
  /** Filter to a particular collection with collection-id. */
  id: Scalars['String']['input'];
  /** Amount of items returned in response. defaults to 60 */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /** The end timestamp you want to filter on (UTC) */
  startTimestamp?: InputMaybe<Scalars['Int']['input']>;
};

export enum DepthSide {
  Buy = 'buy',
  Sell = 'sell'
}

export type DynamicPricing = {
  __typename?: 'DynamicPricing';
  data: DynamicPricingData;
  kind: Scalars['String']['output'];
};

export type DynamicPricingData = {
  __typename?: 'DynamicPricingData';
  price?: Maybe<DynamicPricingPrice>;
  time: DynamicPricingTime;
};

export type DynamicPricingPrice = {
  __typename?: 'DynamicPricingPrice';
  end: OrdersPrice;
  start: OrdersPrice;
};

export type DynamicPricingTime = {
  __typename?: 'DynamicPricingTime';
  end: Scalars['Int']['output'];
  start: Scalars['Int']['output'];
};

export type FeeBreakdown = {
  __typename?: 'FeeBreakdown';
  bps?: Maybe<Scalars['Float']['output']>;
  /** Can be marketplace or royalty */
  kind?: Maybe<Scalars['String']['output']>;
  recipient?: Maybe<Scalars['String']['output']>;
};

export type FilteredTokens = {
  __typename?: 'FilteredTokens';
  /** Example field (placeholder) */
  continuation: Scalars['String']['output'];
  /** Example field (placeholder) */
  market: TokensMarket;
  token: FilteredTokensToken;
};

export type FilteredTokensToken = {
  __typename?: 'FilteredTokensToken';
  attributes?: Maybe<Array<TokenAttribute>>;
  collection?: Maybe<TokenCollection>;
  contract?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  isFlagged?: Maybe<Scalars['Boolean']['output']>;
  kind?: Maybe<Scalars['String']['output']>;
  lastFlagChange?: Maybe<Scalars['String']['output']>;
  lastFlagUpdate?: Maybe<Scalars['String']['output']>;
  lastSale?: Maybe<TokenLastSale>;
  media?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  owner?: Maybe<Scalars['String']['output']>;
  rarity?: Maybe<Scalars['Float']['output']>;
  rarityRank?: Maybe<Scalars['Int']['output']>;
  remainingSupply?: Maybe<Scalars['Int']['output']>;
  supply?: Maybe<Scalars['Int']['output']>;
  tokenId?: Maybe<Scalars['String']['output']>;
};

export type FloorAsk = {
  __typename?: 'FloorAsk';
  id?: Maybe<Scalars['String']['output']>;
  maker?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Price>;
  sourceDomain?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Token>;
  validFrom?: Maybe<Scalars['Int']['output']>;
  validUntil?: Maybe<Scalars['Int']['output']>;
};

export type FloorSale = {
  __typename?: 'FloorSale';
  day1?: Maybe<Scalars['Float']['output']>;
  day7?: Maybe<Scalars['Float']['output']>;
  day30?: Maybe<Scalars['String']['output']>;
};

export type FloorSaleChange = {
  __typename?: 'FloorSaleChange';
  day1?: Maybe<Scalars['Float']['output']>;
  day7?: Maybe<Scalars['Float']['output']>;
  day30?: Maybe<Scalars['String']['output']>;
};

export type LastBuy = {
  __typename?: 'LastBuy';
  timestamp?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type Links = {
  __typename?: 'Links';
  blur?: Maybe<Scalars['String']['output']>;
  etherscan?: Maybe<Scalars['String']['output']>;
  looksRare?: Maybe<Scalars['String']['output']>;
  opensea?: Maybe<Scalars['String']['output']>;
  x2y2?: Maybe<Scalars['String']['output']>;
};

export type NestedCollection = {
  __typename?: 'NestedCollection';
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type NestedToken = {
  __typename?: 'NestedToken';
  collection?: Maybe<NestedCollection>;
  contract?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  tokenId?: Maybe<Scalars['String']['output']>;
};

export type NetAmount = {
  __typename?: 'NetAmount';
  decimal?: Maybe<Scalars['Float']['output']>;
  native?: Maybe<Scalars['Float']['output']>;
  raw?: Maybe<Scalars['String']['output']>;
  usd?: Maybe<Scalars['Float']['output']>;
};

export type Onchain = {
  __typename?: 'Onchain';
  bps?: Maybe<Scalars['Int']['output']>;
  recipient?: Maybe<Scalars['String']['output']>;
};

export type Opensea = {
  __typename?: 'Opensea';
  bps?: Maybe<Scalars['Int']['output']>;
  recipient?: Maybe<Scalars['String']['output']>;
};

export type Order = {
  __typename?: 'Order';
  contract: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  criteria: Criteria;
  depth?: Maybe<Array<OrderDepth>>;
  dynamicPricing: DynamicPricing;
  expiration: Scalars['Int']['output'];
  feeBps: Scalars['Float']['output'];
  feeBreakdown: Array<FeeBreakdown>;
  id: Scalars['String']['output'];
  isDynamic: Scalars['Boolean']['output'];
  isNativeOffChainCancellable: Scalars['Boolean']['output'];
  isReservoir: Scalars['Boolean']['output'];
  kind: Scalars['String']['output'];
  maker: Scalars['String']['output'];
  price: OrdersPrice;
  quantityFilled: Scalars['Float']['output'];
  quantityRemaining: Scalars['Float']['output'];
  side: Scalars['String']['output'];
  status: Scalars['String']['output'];
  taker: Scalars['String']['output'];
  tokenSetId: Scalars['String']['output'];
  tokenSetSchemaHash: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  validFrom: Scalars['Int']['output'];
  validUntil: Scalars['Int']['output'];
};

export type OrderDepth = {
  __typename?: 'OrderDepth';
  price: Scalars['Float']['output'];
  quantity: Scalars['Float']['output'];
};

export type OrderDepths = {
  __typename?: 'OrderDepths';
  depth: Array<OrderDepth>;
};

export type Orders = {
  __typename?: 'Orders';
  continuation?: Maybe<Scalars['String']['output']>;
  orders?: Maybe<Array<Maybe<Order>>>;
};

export type OrdersAmount = {
  __typename?: 'OrdersAmount';
  decimal: Scalars['Float']['output'];
  native: Scalars['Float']['output'];
  raw: Scalars['String']['output'];
  usd: Scalars['Float']['output'];
};

export type OrdersDepthInput = {
  /** Contract Address of Collection */
  collection?: InputMaybe<Scalars['String']['input']>;
  /** Return all prices in this currency. */
  displayCurrency?: InputMaybe<Scalars['String']['input']>;
  /** Side of the order book */
  side: DepthSide;
  /** Filter to a particular token. */
  token: Scalars['String']['input'];
};

export type OrdersPrice = {
  __typename?: 'OrdersPrice';
  amount: OrdersAmount;
  currency: Currency;
  netAmount: OrdersAmount;
};

export type Price = {
  __typename?: 'Price';
  amount?: Maybe<Amount>;
  currency?: Maybe<Currency>;
  netAmount?: Maybe<NetAmount>;
};

export type Query = {
  __typename?: 'Query';
  DailyCollections?: Maybe<DailyCollections>;
  /** Get a collection details by contract address */
  collection?: Maybe<Collection>;
  /** Get all collections based on search criteria */
  collections: CollectionOutput;
  getAsks?: Maybe<Orders>;
  getOrdersDepth?: Maybe<OrderDepths>;
  sales: Sales;
  /** Get tokens of a specific collection with filter */
  tokens?: Maybe<Array<Maybe<FilteredTokens>>>;
  /** Get tokens of a specific wallet */
  userTokens?: Maybe<UserTokens>;
};


export type QueryDailyCollectionsArgs = {
  dailyCollectionsInput: DailyCollectionsInput;
};


export type QueryCollectionArgs = {
  searchCollectionInput: SearchCollectionInput;
};


export type QueryCollectionsArgs = {
  searchCollectionsInput: SearchCollectionsInput;
};


export type QueryGetAsksArgs = {
  AsksInput: AsksInput;
};


export type QueryGetOrdersDepthArgs = {
  OrdersDepthInput: OrdersDepthInput;
};


export type QuerySalesArgs = {
  findSalesInput: SalesInput;
};


export type QueryTokensArgs = {
  tokensInput: TokensInput;
};


export type QueryUserTokensArgs = {
  userTokensInput: UserTokensInput;
};

export type Rank = {
  __typename?: 'Rank';
  allTime?: Maybe<Scalars['Int']['output']>;
  day1?: Maybe<Scalars['Int']['output']>;
  day7?: Maybe<Scalars['Int']['output']>;
  day30?: Maybe<Scalars['String']['output']>;
};

export type Royalties = {
  __typename?: 'Royalties';
  bps: Scalars['Int']['output'];
  breakdown?: Maybe<Array<Maybe<Breakdown>>>;
  recipient?: Maybe<Scalars['String']['output']>;
};

export type Sale = {
  __typename?: 'Sale';
  amount: Scalars['String']['output'];
  batchIndex: Scalars['Int']['output'];
  block: Scalars['Int']['output'];
  createdAt: Scalars['String']['output'];
  feeBreakdown: Array<FeeBreakdown>;
  fillSource: Scalars['String']['output'];
  from: Scalars['String']['output'];
  /** Deprecated. Use saleId instead. */
  id: Scalars['String']['output'];
  isDeleted: Scalars['Boolean']['output'];
  logIndex: Scalars['Int']['output'];
  marketplaceFeeBps: Scalars['Float']['output'];
  orderId: Scalars['String']['output'];
  orderKind: Scalars['String']['output'];
  /** Can be ask or bid. */
  orderSide: Scalars['String']['output'];
  orderSource: Scalars['String']['output'];
  paidFullRoyalty: Scalars['Boolean']['output'];
  price: Price;
  royaltyFeeBps: Scalars['Float']['output'];
  /** Unique identifier made from txn hash, price, etc. */
  saleId: Scalars['String']['output'];
  timestamp: Scalars['Int']['output'];
  to: Scalars['String']['output'];
  token: SalesToken;
  txHash: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  washTradingScore: Scalars['Float']['output'];
};

export type Sales = {
  __typename?: 'Sales';
  continuation?: Maybe<Scalars['String']['output']>;
  sales?: Maybe<Array<Maybe<Sale>>>;
};

export type SalesCount = {
  __typename?: 'SalesCount';
  allTime?: Maybe<Scalars['String']['output']>;
  day1?: Maybe<Scalars['Int']['output']>;
  day7?: Maybe<Scalars['String']['output']>;
  day30?: Maybe<Scalars['String']['output']>;
};

export type SalesInput = {
  /** Filter to a particular collection with collection-id. Example: 0x8d04a8c79ceb0889bdd12acdf3fa9d207ed3ff63 */
  collection?: InputMaybe<Scalars['String']['input']>;
  /** Use continuation token to request next offset of items. */
  continuation?: InputMaybe<Scalars['String']['input']>;
  contract?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** If enabled, include sales that have been deleted. In some cases the backfilling process deletes sales that are no longer relevant or have been reverted. defaults to false */
  includeDeleted?: InputMaybe<Scalars['Boolean']['input']>;
  /** If enabled, also include token metadata in the response. Default is false. */
  includeTokenMetadata?: InputMaybe<Scalars['Boolean']['input']>;
  /** Amount of items returned in response. Max limit is 1000. defaults to 100 */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /** Order the items are returned in the response. Options are price, time, and updated_at. Default is time. */
  orderBy?: InputMaybe<TokensOrderBy>;
  /** sales that have occurred in the last 5, 15, or 60 minutes */
  salesSortBy: SalesSortBy;
  /** Order the items are returned in the response. defaults to desc */
  sortDirection?: InputMaybe<TokenSortDirection>;
  /** Array of tokens. Max limit is 20. Example: tokens[0]: 0x8d04a8c79ceb0889bdd12acdf3fa9d207ed3ff63:704tokens[1]: 0x8d04a8c79ceb0889bdd12acdf3fa9d207ed3ff63:979 */
  token?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Filter to a particular transaction. Example: 0x04654cc4c81882ed4d20b958e0eeb107915d75730110cce65333221439de6afc */
  txHash?: InputMaybe<Scalars['String']['input']>;
};

export enum SalesSortBy {
  Last_5Min = 'last_5_min',
  Last_15Min = 'last_15_min',
  Last_60Min = 'last_60_min'
}

export type SalesToken = {
  __typename?: 'SalesToken';
  collection?: Maybe<SalesTokenCollection>;
  contract?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  tokenId?: Maybe<Scalars['String']['output']>;
};

export type SalesTokenCollection = {
  __typename?: 'SalesTokenCollection';
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type SearchCollectionInput = {
  /** Collection contract address */
  contractAddress: Scalars['ID']['input'];
  /** Sort by */
  sortBy?: InputMaybe<CollectionSortType>;
};

export type SearchCollectionsInput = {
  /** Continuation token for pagination */
  continuation?: InputMaybe<Scalars['String']['input']>;
  /** Filter to a particular collection with collection id */
  id?: InputMaybe<Scalars['String']['input']>;
  /** If true, attributes will be included in the response. Must filter by id or slug to a particular collection. */
  includeAttributes?: InputMaybe<Scalars['Boolean']['input']>;
  /** If true, top bid will be returned in the response. defaults to false */
  includeTopBid?: InputMaybe<Scalars['Boolean']['input']>;
  /** min 1, max 20 default 20 */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /** Sort by */
  sortBy?: InputMaybe<CollectionSortType>;
};

export type Token = {
  __typename?: 'Token';
  contract?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  tokenId?: Maybe<Scalars['String']['output']>;
};

export type TokenAttribute = {
  __typename?: 'TokenAttribute';
  createdAt?: Maybe<Scalars['String']['output']>;
  floorAskPrice?: Maybe<Scalars['Int']['output']>;
  key?: Maybe<Scalars['String']['output']>;
  kind?: Maybe<Scalars['String']['output']>;
  onSaleCount?: Maybe<Scalars['Int']['output']>;
  tokenCount?: Maybe<Scalars['Int']['output']>;
  topBidValue?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type TokenCollection = {
  __typename?: 'TokenCollection';
  id?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
};

export type TokenFloorAsk = {
  __typename?: 'TokenFloorAsk';
  id?: Maybe<Scalars['String']['output']>;
  maker?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Price>;
  quantityFilled?: Maybe<Scalars['Int']['output']>;
  quantityRemaining?: Maybe<Scalars['Int']['output']>;
  validFrom?: Maybe<Scalars['Float']['output']>;
  validUntil?: Maybe<Scalars['Float']['output']>;
};

export type TokenLastSale = {
  __typename?: 'TokenLastSale';
  amount?: Maybe<Scalars['String']['output']>;
  batchIndex?: Maybe<Scalars['Int']['output']>;
  block?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  feeBreakdown?: Maybe<Array<FeeBreakdown>>;
  fillSource?: Maybe<Scalars['String']['output']>;
  from?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  logIndex?: Maybe<Scalars['Int']['output']>;
  marketplaceFeeBps?: Maybe<Scalars['Float']['output']>;
  orderId?: Maybe<Scalars['String']['output']>;
  orderKind?: Maybe<Scalars['String']['output']>;
  orderSide?: Maybe<Scalars['String']['output']>;
  orderSource?: Maybe<Scalars['String']['output']>;
  paidFullRoyalty?: Maybe<Scalars['Boolean']['output']>;
  price?: Maybe<Price>;
  royaltyFeeBps?: Maybe<Scalars['Float']['output']>;
  saleId?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['Int']['output']>;
  to?: Maybe<Scalars['String']['output']>;
  token?: Maybe<NestedToken>;
  txHash?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  washTradingScore?: Maybe<Scalars['Float']['output']>;
};

export enum TokenSortBy {
  AcquiredAt = 'acquiredAt',
  LastAppraisalValue = 'lastAppraisalValue'
}

export enum TokenSortDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type TokenTopBid = {
  __typename?: 'TokenTopBid';
  feeBreakdown?: Maybe<Array<FeeBreakdown>>;
  id?: Maybe<Scalars['String']['output']>;
  maker?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Price>;
  validFrom?: Maybe<Scalars['Float']['output']>;
  validUntil?: Maybe<Scalars['Float']['output']>;
};

export type Tokens = {
  __typename?: 'Tokens';
  token: UserToken;
};

export type TokensInput = {
  /** Filter by attributes */
  attributes?: InputMaybe<Array<AttributeInput>>;
  /** Collection contract address */
  collection: Scalars['ID']['input'];
  /** Continuation token for pagination */
  continuation?: InputMaybe<Scalars['String']['input']>;
  /** If true, attributes will be returned in the response. defaults to false */
  includeAttributes?: Scalars['Boolean']['input'];
  /** If true, last sale data including royalties paid will be returned in the response. defaults to false */
  includeLastSale: Scalars['Boolean']['input'];
  /** max 100 default 20 */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /** Sort by */
  sortBy?: TokensSortBy;
};

export type TokensMarket = {
  __typename?: 'TokensMarket';
  floorAsk?: Maybe<TokenFloorAsk>;
  topBid?: Maybe<TokenTopBid>;
};

export enum TokensOrderBy {
  Price = 'price',
  Time = 'time',
  UpdatedAt = 'updated_at'
}

export enum TokensSortBy {
  FloorAskPrice = 'floorAskPrice',
  Rarity = 'rarity',
  TokenId = 'tokenId'
}

export type TopBid = {
  __typename?: 'TopBid';
  id?: Maybe<Scalars['String']['output']>;
  maker?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Price>;
  sourceDomain?: Maybe<Scalars['String']['output']>;
  validFrom?: Maybe<Scalars['Int']['output']>;
  validUntil?: Maybe<Scalars['Int']['output']>;
};

export type UserTokens = {
  __typename?: 'UserTokens';
  continuation?: Maybe<Scalars['String']['output']>;
  tokens: Array<Tokens>;
};

export type UserTokensInput = {
  /** Continuation token for pagination */
  continuation?: InputMaybe<Scalars['String']['input']>;
  /** min 1, max 200 default 20 */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /** Sort by */
  sortBy?: InputMaybe<TokenSortBy>;
  /** Sort direction */
  sortDirection?: InputMaybe<TokenSortDirection>;
  /** User wallet address */
  userAddress: Scalars['String']['input'];
};

export type Volume = {
  __typename?: 'Volume';
  day1?: Maybe<Scalars['Float']['output']>;
  day7?: Maybe<Scalars['Float']['output']>;
  day30?: Maybe<Scalars['Float']['output']>;
};

export type VolumeChange = {
  __typename?: 'VolumeChange';
  day1?: Maybe<Scalars['Float']['output']>;
  day7?: Maybe<Scalars['Float']['output']>;
  day30?: Maybe<Scalars['String']['output']>;
};

export type LastSale = {
  __typename?: 'lastSale';
  amount?: Maybe<Scalars['String']['output']>;
  batchIndex?: Maybe<Scalars['Int']['output']>;
  block?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  fillSource?: Maybe<Scalars['String']['output']>;
  from?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  logIndex?: Maybe<Scalars['Int']['output']>;
  marketplaceFeeBps?: Maybe<Scalars['Int']['output']>;
  orderId?: Maybe<Scalars['String']['output']>;
  orderKind?: Maybe<Scalars['String']['output']>;
  orderSide?: Maybe<Scalars['String']['output']>;
  orderSource?: Maybe<Scalars['String']['output']>;
  paidFullRoyalty?: Maybe<Scalars['Boolean']['output']>;
  price?: Maybe<Price>;
  royaltyFeeBps?: Maybe<Scalars['Int']['output']>;
  saleId?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['Int']['output']>;
  to?: Maybe<Scalars['String']['output']>;
  txHash?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  washTradingScore?: Maybe<Scalars['Int']['output']>;
};

export type TokenCollection = {
  __typename?: 'tokenCollection';
  floorAskPrice?: Maybe<Price>;
  id?: Maybe<Scalars['String']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  openseaVerificationStatus?: Maybe<Scalars['String']['output']>;
};

export type UserCurrency = {
  __typename?: 'userCurrency';
  contract?: Maybe<Scalars['String']['output']>;
  decimals?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  symbol?: Maybe<Scalars['String']['output']>;
};

export type UserToken = {
  __typename?: 'userToken';
  attributes: Array<Attribute>;
  collection: TokenCollection;
  contract?: Maybe<Scalars['String']['output']>;
  kind?: Maybe<Scalars['String']['output']>;
  lastSale: LastSale;
  rarityRank?: Maybe<Scalars['String']['output']>;
  rarityScore?: Maybe<Scalars['String']['output']>;
  tokenId?: Maybe<Scalars['String']['output']>;
  topBid: TopBid;
};

export type GetCollectionQueryVariables = Types.Exact<{
  searchCollectionInput: Types.SearchCollectionInput;
}>;


export type GetCollectionQuery = { __typename?: 'Query', collection?: { __typename?: 'Collection', name?: string | null, image?: string | null, banner?: string | null, volume: { __typename?: 'Volume', day1?: number | null }, floorAsk: { __typename?: 'FloorAsk', price?: { __typename?: 'Price', amount?: { __typename?: 'Amount', usd?: number | null } | null } | null } } | null };


export const GetCollectionDocument = gql`
    query getCollection($searchCollectionInput: SearchCollectionInput!) {
  collection(searchCollectionInput: $searchCollectionInput) {
    name
    image
    banner
    volume {
      day1
    }
    floorAsk {
      price {
        amount {
          usd
        }
      }
    }
  }
}
    `;

/**
 * __useGetCollectionQuery__
 *
 * To run a query within a React component, call `useGetCollectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCollectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCollectionQuery({
 *   variables: {
 *      searchCollectionInput: // value for 'searchCollectionInput'
 *   },
 * });
 */
export function useGetCollectionQuery(baseOptions: Apollo.QueryHookOptions<GetCollectionQuery, GetCollectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCollectionQuery, GetCollectionQueryVariables>(GetCollectionDocument, options);
      }
export function useGetCollectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCollectionQuery, GetCollectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCollectionQuery, GetCollectionQueryVariables>(GetCollectionDocument, options);
        }
export type GetCollectionQueryHookResult = ReturnType<typeof useGetCollectionQuery>;
export type GetCollectionLazyQueryHookResult = ReturnType<typeof useGetCollectionLazyQuery>;
export type GetCollectionQueryResult = Apollo.QueryResult<GetCollectionQuery, GetCollectionQueryVariables>;