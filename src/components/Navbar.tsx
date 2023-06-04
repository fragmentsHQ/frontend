import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Button } from "@heathmont/moon-core-tw";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between p-10">
      <img
        className="aspect-[183/24] h-fit w-[12rem] my-auto"
        src="/logo/FragmentsLogo.png"
        alt="Fragments Logo"
      />
      <div className="flex gap-8">

        <Button
          size="lg"
          onClick={() => navigate("/balance")}
          className="inline-flex w-full justify-center rounded-md bg-[#464646] bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Balance
        </Button>

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
            const ready = mounted && authenticationStatus !== "loading";
            const connected =
              ready &&
              account &&
              chain &&
              (!authenticationStatus ||
                authenticationStatus === "authenticated");

            return (
              <div
                {...(!ready && {
                  "aria-hidden": true,
                })}
              >
                {(() => {
                  if (!connected) {
                    return (
                      <Button
                        size="sm"
                        onClick={openConnectModal}
                        className="rounded-lg bg-[#2BFFB1] text-sm text-black"
                      >
                        Connect Wallet
                      </Button>
                    );
                  }

                  if (connected) {
                    return (
                      <div className="flex items-center gap-3">
                        <div className="flex items-center rounded-md border-2 border-solid border-[#464646] px-3 py-1 text-sm">
                          {"Balance: " +
                            Number(account.balanceFormatted).toFixed(2) +
                            `  ${account.balanceSymbol}`}
                        </div>
                        <Button
                          size="sm"
                          onClick={openAccountModal}
                          className="rounded-lg bg-[#464646] text-sm text-white"
                        >
                          {account.address
                            .slice(0, 5)
                            .concat("....." + account.address.slice(-4))}
                        </Button>
                        <Button
                          size="sm"
                          onClick={openChainModal}
                          className="flex gap-2 rounded-lg bg-[#464646] text-sm text-white"
                        >
                          <img
                            className="h-[1.2rem] w-[1.2rem] rounded-full"
                            src={chain?.iconUrl}
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
