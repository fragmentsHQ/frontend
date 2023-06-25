import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import { useNetwork } from 'wagmi';

import {
  Chain,
  ISPRODUCTION,
  NETWORKS,
  TEST_NETWORKS,
  TOKEN_ADDRESSES,
} from '@/constants/constants';

export default function ChainMenu({
  onChainChange,
}: {
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
          selectedChain.chainName
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
        {Object.values(ISPRODUCTION ? NETWORKS : TEST_NETWORKS).map(
          (chain, index) => (
            <MenuItem
              onClick={() => {
                onChainChange(chain);
                setSelectedChain(chain);
                handleClose();
              }}
              key={index}
            >
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
  onTokenChange,
}: {
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
          selectedToken.name
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
            {token.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
