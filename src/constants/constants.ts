import { ethers } from "ethers";
import { Chain, erc20ABI } from "wagmi";
import Autopay from "./autoPay_abi.json";
import Conditional from "./conditional_abi.json";
import Treasury from "./treasury_abi.json";

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

const ETH = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"

const AUTOPAY_CONTRACT_ADDRESSES = {
  mainnets: {
    polygon: "0x",
    ethereum: "0x",
    optimism: "0x",
    arbitrum: "0x",
    bsc: "0x",
  },
  testnets: {
    polygonMumbai: "0x7f464d4f3D46552F936cb68c21a0A2dB3E32919F",
    goerli: "0xa8e3315ce15caddb4616aefd073e4cbf002c5d73",
  },
};

const CONDITIONAL_CONTRACT_ADDRESSES = {
  mainnets: {
    polygon: "0x",
    ethereum: "0x",
    optimism: "0x",
    arbitrum: "0x",
    bsc: "0x",
  },
  testnets: {
    polygonMumbai: "0x927CFeBA7c83f2626ca09A815Bce899190Cb5800",
    goerli: "0xDc7EcF12CFf43ea2d40Ad475b6BB0C5Fe6dD368A",
  },
};

const TREASURY_CONTRACT_ADDRESSES = {
  mainnets: {
    polygon: "0x",
    ethereum: "0x",
    optimism: "0x",
    arbitrum: "0x",
    bsc: "0x",
  },
  testnets: {
    polygonMumbai: "0x1Ff5C1D4713772C5AA17d551039d9599Bc65C31C",
    goerli: "0x6e2b6959c81183dCe1EB5819E573092bee28511b",
  },
};

const TOKEN_ADDRESSES = {
  polygon: {
    USDC: "0x",
    USDT: "0x",
    DAI: "0x",
  },
  goerli: {
    TEST: "0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1",
  },
  optimismGoerli: {
    TEST: "0x68Db1c8d85C09d546097C65ec7DCBFF4D6497CbF",
  },
  polygonMumbai: {
    TEST: "0xeDb95D8037f769B72AAab41deeC92903A98C9E16",
  },
  arbitrum: {
    TEST: "0xDC805eAaaBd6F68904cA706C221c72F8a8a68F9f",
  },
  "polygon-zkevm": {
    TEST: "0x5f921E4DE609472632CEFc72a3846eCcfbed4ed8",
  },
};

const TOKEN_ADDRESSES_PRICE_FEEDS = {
  WETH: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  MATIC: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
  USDC: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  AAVE: "0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9",
  USDT: "0xdac17f958d2ee523a2206206994597c13d831ec7",
  DAI: "0x6b175474e89094c44da98b954eedeac495271d0f",
  SHIB: "0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce",
  WBTC: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
};

const CONNEXT_DOMAINS = {
  goerli: "1735353714",
  optimismGoerli: "1735356532",
  polygonMumbai: "9991",
  arbitrumGoerli: "1734439522",
  polygonZkevmTestnet: "1887071092",
};

const AUTOPAY_CONTRACT = (chain: Chain, provider) =>
  new ethers.Contract(
    chain
      ? AUTOPAY_CONTRACT_ADDRESSES[chain?.testnet ? "testnets" : "mainnets"][
      chain?.network
      ]
      : AUTOPAY_CONTRACT_ADDRESSES["testnets"]["goerli"],
    Autopay.abi,
    provider
  );

const CONDITIONAL_CONTRACT = (chain: Chain, provider) =>
  new ethers.Contract(
    chain
      ? CONDITIONAL_CONTRACT_ADDRESSES[
      chain?.testnet ? "testnets" : "mainnets"
      ][chain?.network]
      : CONDITIONAL_CONTRACT_ADDRESSES["testnets"]["goerli"],
    Conditional.abi,
    provider
  );

const TREASURY_CONTRACT = (chain: Chain, provider) =>
  new ethers.Contract(
    chain
      ? TREASURY_CONTRACT_ADDRESSES[
      chain?.testnet ? "testnets" : "mainnets"
      ][chain?.network]
      : TREASURY_CONTRACT_ADDRESSES["testnets"]["goerli"],
    Treasury.abi,
    provider
  );

const ERC20_CONTRACT = (tokenAddress, provider) =>
  new ethers.Contract(tokenAddress, erc20ABI, provider);

export {
  CONDITIONAL_CONTRACT_ADDRESSES,
  AUTOPAY_CONTRACT_ADDRESSES,
  CONDITIONAL_CONTRACT,
  TOKEN_ADDRESSES,
  AUTOPAY_CONTRACT,
  TREASURY_CONTRACT,
  TREASURY_CONTRACT_ADDRESSES,
  ERC20_CONTRACT,
  ZERO_ADDRESS,
  CONNEXT_DOMAINS,
  TOKEN_ADDRESSES_PRICE_FEEDS,
  ETH
};
