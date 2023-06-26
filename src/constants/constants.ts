import { getContract } from '@wagmi/core';
import { Chain, erc20ABI } from 'wagmi';

import Autopay from './autoPay_abi.json';
import Conditional from './conditional_abi.json';

const ISPRODUCTION = process.env.NODE_ENV === 'production';

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

const ETH = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';

const Web3FunctionHash = {
  autopay: 'QmbN96rTEy8EYxPNVqCUmZgTZzufvCbNhmsVzM2rephoLa',
  gas: '',
  conditional: '',
  contract: '',
};

const AUTOPAY_CONTRACT_ADDRESSES: ContractAddresses = {
  mainnets: {
    polygon: '0x',
    ethereum: '0x',
    optimism: '0x',
    arbitrum: '0x',
    bsc: '0x',
  },
  testnets: {
    80001: '0x7f464d4f3D46552F936cb68c21a0A2dB3E32919F',
    5: '0xa8e3315ce15caddb4616aefd073e4cbf002c5d73',
  },
};

const CONDITIONAL_CONTRACT_ADDRESSES: ContractAddresses = {
  mainnets: {
    polygon: '0x',
    ethereum: '0x',
    optimism: '0x',
    arbitrum: '0x',
    bsc: '0x',
  },
  testnets: {
    800001: '0x927CFeBA7c83f2626ca09A815Bce899190Cb5800',
    5: '0xDc7EcF12CFf43ea2d40Ad475b6BB0C5Fe6dD368A',
  },
};

const TREASURY_CONTRACT_ADDRESSES: ContractAddresses = {
  mainnets: {
    polygon: '0x',
    ethereum: '0x',
    optimism: '0x',
    arbitrum: '0x',
    bsc: '0x',
  },
  testnets: {
    800001: '0x1Ff5C1D4713772C5AA17d551039d9599Bc65C31C',
    5: '0x6e2b6959c81183dCe1EB5819E573092bee28511b',
  },
};

export type Chain = { chainId: number; chainName: string; logo: string };

const NETWORKS: {
  [key: number]: Chain;
} = {
  1: {
    chainId: 1,
    chainName: 'Ethereum Mainnet',
    logo: 'https://etherscan.io/images/brand-assets/etherscan-logo-circle.png',
  },
  10: {
    chainId: 10,
    chainName: 'Optimism',
    logo: 'https://optimism.io/images/optimism-logo.png',
  },
  56: {
    chainId: 56,
    chainName: 'Binance Smart Chain Mainnet',
    logo: 'https://bscscan.com/images/brand-assets/bscscan-logo-circle.png',
  },
  100: {
    chainId: 100,
    chainName: 'Gnosis Chain (formerly xDai)',
    logo: 'https://gnosis-safe.io/images/xdai-logo.svg',
  },
  137: {
    chainId: 137,
    chainName: 'Polygon Mainnet',
    logo: 'https://polygon.technology/images/logo.png',
  },
  42161: {
    chainId: 42161,
    chainName: 'Arbitrum One',
    logo: 'https://arbitrum.io/wp-content/uploads/2021/08/Arbitrum-Logo-Black.svg',
  },
};

const TEST_NETWORKS: {
  [key: number]: {
    chainId: number;
    chainName: string;
    slug: string;
    logo: string;
  };
} = {
  5: {
    chainId: 5,
    chainName: 'Goerli',
    slug: 'goerli',
    logo: require('../../public/logo/chains/Goerli.png'),
  },
  80001: {
    chainId: 80001,
    slug: 'polygonMumbai',
    chainName: 'Mumbai Testnet',
    logo: require('../../public/logo/chains/polygonMumbai.png'),
  },
};

const TOKEN_ADDRESSES: {
  [key: number]: {
    [key: string]: {
      name: string;
      address: string;
      decimals: number;
      logo: string;
    };
  };
} = {
  137: {
    USDC: {
      name: 'USDC',
      address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
      decimals: 6,
      logo: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=013',
    },
    USDT: {
      name: 'USDT',
      address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
      decimals: 6,
      logo: 'https://cryptologos.cc/logos/tether-usdt-logo.png?v=013',
    },
    DAI: {
      name: 'DAI',
      address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
      decimals: 18,
      logo: 'https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png?v=013',
    },
  },
  1: {
    USDC: {
      name: 'USDC',
      address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      decimals: 6,
      logo: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=013',
    },
    USDT: {
      name: 'USDT',
      address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      decimals: 6,
      logo: 'https://cryptologos.cc/logos/tether-usdt-logo.png?v=013',
    },
    DAI: {
      name: 'DAI',
      address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      decimals: 18,
      logo: 'https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png?v=013',
    },
  },
  5: {
    USDC: {
      name: 'USDC',
      address: '0x07865c6E87B9F70255377e024ace6630C1Eaa37F',
      decimals: 18,
      logo: 'https://testnet.connextscan.io/logos/logo.png',
    },
    WETH: {
      name: 'WETH',
      address: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
      decimals: 18,
      logo: 'https://testnet.connextscan.io/logos/logo.png',
    },
  },
  420: {
    TEST: {
      name: 'TEST',
      address: '0x68Db1c8d85C09d546097C65ec7DCBFF4D6497CbF',
      decimals: 18,
      logo: 'https://testnet.connextscan.io/logos/logo.png',
    },
  },
  80001: {
    USDC: {
      name: 'USDC',
      address: '0x0FA8781a83E46826621b3BC094Ea2A0212e71B23',
      decimals: 18,
      logo: 'https://testnet.connextscan.io/logos/logo.png',
    },
    WETH: {
      name: 'WETH',
      address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
      decimals: 18,
      logo: 'https://testnet.connextscan.io/logos/logo.png',
    },
  },
  421613: {
    TEST: {
      name: 'TEST',

      address: '0xDC805eAaaBd6F68904cA706C221c72F8a8a68F9f',
      decimals: 18,
      logo: 'https://testnet.connextscan.io/logos/logo.png',
    },
  },
  1442: {
    TEST: {
      name: 'TEST',

      address: '0x5f921E4DE609472632CEFc72a3846eCcfbed4ed8',
      decimals: 18,
      logo: 'https://testnet.connextscan.io/logos/logo.png',
    },
  },
  100: {
    USDC: {
      name: 'USDC',

      address: '0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83',
      decimals: 6,
      logo: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=013',
    },
    USDT: {
      name: 'USDT',

      address: '0x4ECaBa5870353805a9F068101A40E0f32ed605C6',
      decimals: 6,
      logo: 'https://cryptologos.cc/logos/tether-usdt-logo.png?v=013',
    },
    DAI: {
      name: 'DAI',
      address: '0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1',
      decimals: 18,
      logo: 'https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png?v=013',
    },
  },
};

const TOKEN_ADDRESSES_PRICE_FEEDS = {
  WETH: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  MATIC: '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0',
  USDC: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  AAVE: '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9',
  USDT: '0xdac17f958d2ee523a2206206994597c13d831ec7',
  DAI: '0x6b175474e89094c44da98b954eedeac495271d0f',
  SHIB: '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce',
  WBTC: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
};

const CONNEXT_DOMAINS = {
  goerli: '1735353714',
  optimismGoerli: '1735356532',
  polygonMumbai: '9991',
  arbitrumGoerli: '1734439522',
  polygonZkevmTestnet: '1887071092',
};

const AUTOPAY_CONTRACT = (chain: Chain) =>
  getContract({
    address: chain
      ? AUTOPAY_CONTRACT_ADDRESSES[chain?.testnet ? 'testnets' : 'mainnets'][
          chain?.network
        ]
      : AUTOPAY_CONTRACT_ADDRESSES['testnets']['goerli'],
    abi: Autopay.abi,
  });

const CONDITIONAL_CONTRACT = (chain: Chain) =>
  getContract({
    address: chain
      ? CONDITIONAL_CONTRACT_ADDRESSES[
          chain?.testnet ? 'testnets' : 'mainnets'
        ][chain?.network]
      : CONDITIONAL_CONTRACT_ADDRESSES['testnets']['goerli'],
    abi: Conditional.abi,
  });

const TREASURY_CONTRACT = (chain: Chain, provider: any) =>
  getContract({
    address: chain
      ? TREASURY_CONTRACT_ADDRESSES[chain?.testnet ? 'testnets' : 'mainnets'][
          chain?.network
        ]
      : TREASURY_CONTRACT_ADDRESSES['testnets']['goerli'],
    abi: Autopay.abi,
  });

const ERC20_CONTRACT = (tokenAddress: string) =>
  getContract({
    address: tokenAddress,
    abi: erc20ABI,
  });

export {
  AUTOPAY_CONTRACT,
  AUTOPAY_CONTRACT_ADDRESSES,
  CONDITIONAL_CONTRACT,
  CONDITIONAL_CONTRACT_ADDRESSES,
  CONNEXT_DOMAINS,
  ERC20_CONTRACT,
  ETH,
  ISPRODUCTION,
  NETWORKS,
  TEST_NETWORKS,
  TOKEN_ADDRESSES,
  TOKEN_ADDRESSES_PRICE_FEEDS,
  TREASURY_CONTRACT,
  TREASURY_CONTRACT_ADDRESSES,
  Web3FunctionHash,
  ZERO_ADDRESS,
};

interface ContractAddresses {
  [key: string]: {
    [key: string]: string;
  };
}
