import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Image from 'next/image';
import * as React from 'react';
import { useNetwork } from 'wagmi';

import {
  Chain,
  ISPRODUCTION,
  NETWORKS,
  TEST_NETWORKS,
  TOKEN_ADDRESSES,
} from '@/constants/constants';

const getTokenFromName = (name: string, chain: string) => {
  if (!chain || !name) {
    return null;
  }
  let _chain = null;
  if (chain === 'polygonMumbai') {
    _chain = TEST_NETWORKS[80001];
  }
  if (chain === 'goerli') {
    _chain = TEST_NETWORKS[5];
  }
  if (_chain === null) {
    return null;
  }
  const token = Object.values(TOKEN_ADDRESSES[_chain.chainId]).filter(
    (d) => d.name.toLowerCase() === name.toLowerCase()
  )[0];
  return {
    chain: _chain,
    token: token,
  };
};

export default function ChainMenu({
  initialChain,
  onChainChange,
}: {
  initialChain: string;
  onChainChange: (chain: Chain) => void;
}) {
  const [selectedChain, setSelectedChain] = React.useState<Chain | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    if (initialChain) {
      if (initialChain.toLowerCase() === 'goerli') {
        onChainChange(TEST_NETWORKS[5]);
        setSelectedChain(TEST_NETWORKS[5]);
      }
      if (initialChain.toLowerCase() === 'polygonmumbai') {
        onChainChange(TEST_NETWORKS[80001]);
        setSelectedChain(TEST_NETWORKS[80001]);
      }
    }
  }, [initialChain]);

  return (
    <div>
      <Button
        id='chains-positioned-button'
        aria-controls={open ? 'chains-positioned-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        style={{
          color: '#fff',
        }}
      >
        {selectedChain ? (
          <div className='flex items-center justify-start'>
            <div className='relative mr-2 h-[1.5rem] w-[1.5rem] overflow-hidden rounded-full py-2'>
              <Image src={selectedChain.logo} fill alt='Logo' />
            </div>
            {selectedChain.chainName}
          </div>
        ) : (
          <span className='text-white text-opacity-20'>Select a chain</span>
        )}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='ml-2 h-4 w-4'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M19.5 8.25l-7.5 7.5-7.5-7.5'
          />
        </svg>
      </Button>
      <Menu
        id='demo-positioned-menu'
        aria-labelledby='demo-positioned-button'
        anchorEl={anchorEl}
        open={open}
        onClose={() => {
          setSelectedChain(selectedChain);
          handleClose();
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {Object.values(ISPRODUCTION ? NETWORKS : TEST_NETWORKS).map(
          (chain, index) => (
            <MenuItem
              onClick={() => {
                setSelectedChain(chain);
                onChainChange(chain);
                handleClose();
              }}
              key={index}
            >
              <div className='relative mr-2 h-[1.5rem] w-[1.5rem] overflow-hidden rounded-full py-2'>
                <Image src={chain.logo} fill alt='Logo' />
              </div>
              {chain.chainName}
            </MenuItem>
          )
        )}
      </Menu>
    </div>
  );
}

export type Token = {
  name: string;
  address: string;
  decimals: number;
  logo: string;
};
export function TokenMenu({
  initialToken,
  onTokenChange,
}: {
  initialToken: string;
  onTokenChange: (token: Token) => void;
}) {
  const { chain } = useNetwork();
  const [selectedToken, setSelectedToken] = React.useState<Token | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  React.useEffect(() => {
    if (initialToken && chain) {
      const token = Object.values(TOKEN_ADDRESSES[chain.id]).filter(
        (d) => d.name.toLowerCase() === initialToken.toLowerCase()
      )[0];
      setSelectedToken(token);
    }
  }, [initialToken, chain]);

  if (!chain?.id) {
    return null;
  }

  return (
    <div>
      <Button
        id='chains-positioned-button'
        aria-controls={open ? 'chains-positioned-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        style={{
          color: '#fff',
        }}
      >
        {selectedToken ? (
          <div className='flex items-center justify-start'>
            <div className='relative mr-2 h-[1.5rem] w-[1.5rem] py-2'>
              <Image src={selectedToken.logo} fill alt='Logo' />
            </div>
            {selectedToken.name}
          </div>
        ) : (
          <span className='text-white text-opacity-20'>Select a token</span>
        )}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='ml-2 h-4 w-4'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M19.5 8.25l-7.5 7.5-7.5-7.5'
          />
        </svg>
      </Button>
      <Menu
        id='demo-positioned-menu'
        aria-labelledby='demo-positioned-button'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {Object.values(TOKEN_ADDRESSES[chain?.id]).map((token, index) => (
          <MenuItem
            onClick={() => {
              onTokenChange(token);
              setSelectedToken(token);
              handleClose();
            }}
            key={index}
          >
            <div className='relative mr-2 h-[1.5rem] w-[1.5rem] py-2'>
              <Image src={token.logo} fill alt='Logo' />
            </div>
            {token.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
