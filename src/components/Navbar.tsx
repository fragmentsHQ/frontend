'use client';
import { Button } from '@heathmont/moon-core-tw';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

import FragmentsLogo from '../assets/FragmentsLogo.png';

const Navbar = () => {
  const router = useRouter();
  return (
    <div className='flex justify-between p-10'>
      <Link href='/' title='Home'>
        <Image
          className='my-auto aspect-[183/24] h-fit w-[12rem]'
          src={FragmentsLogo}
          alt='Fragments'
        />
      </Link>
      <div className='flex items-center gap-8'>
        <Link href='/jobs' title='All Jobs'>
          All Jobs
        </Link>
        <ConnectButton.Custom>
          {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            authenticationStatus,
            mounted,
          }) => {
            // Note: If your app doesn't use authentication, you
            // can remove all 'authenticationStatus' checks
            const ready = mounted && authenticationStatus !== 'loading';
            const connected =
              ready &&
              account &&
              chain &&
              (!authenticationStatus ||
                authenticationStatus === 'authenticated');

            return (
              <div
                {...(!ready && {
                  'aria-hidden': true,
                })}
              >
                {(() => {
                  if (!connected) {
                    return (
                      <Button
                        size='sm'
                        onClick={openConnectModal}
                        className='rounded-lg bg-[#2BFFB1] text-sm text-black'
                      >
                        Connect Wallet
                      </Button>
                    );
                  }

                  if (connected) {
                    return (
                      <div className='flex items-center gap-3'>
                        <div
                          onClick={() => router.push('/profile')}
                          className='flex cursor-pointer items-center rounded-md border-2 border-solid border-[#464646] px-3 py-2 text-sm'
                        >
                          {'Balance: ' +
                            Number(account.balanceFormatted).toFixed(2) +
                            `  ${account.balanceSymbol}`}
                        </div>
                        <Button
                          size='sm'
                          onClick={openAccountModal}
                          className='rounded-lg bg-[#464646] text-sm text-white'
                        >
                          {account.address
                            .slice(0, 5)
                            .concat('.....' + account.address.slice(-4))}
                        </Button>
                        <Button
                          size='sm'
                          onClick={openChainModal}
                          className='flex gap-2 rounded-lg bg-[#464646] text-sm text-white'
                        >
                          <img
                            className='h-[1.2rem] w-[1.2rem] rounded-full'
                            // @ts-ignore
                            src={chain?.iconUrl}
                            alt='chain logo'
                            width={19.2}
                          />
                          {chain?.name}
                        </Button>
                      </div>
                    );
                  }
                })()}
              </div>
            );
          }}
        </ConnectButton.Custom>
      </div>
    </div>
  );
};

export default Navbar;
