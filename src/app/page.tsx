"use client"; // This is a client component 👈🏽

import { Tab } from "@headlessui/react";
import { Button, Dropdown, MenuItem } from "@heathmont/moon-core-tw";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNetwork } from "wagmi";
import { switchNetwork } from '@wagmi/core'
// import Image from "next/image";


import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from "@carbon/react";
import { Pagination } from "carbon-components-react";
import { useCSVReader } from "react-papaparse";
import { ArrowUpCircleIcon, CheckIcon } from "@heroicons/react/20/solid";


import {
  AUTOPAY_CONTRACT_ADDRESSES,
  TOKEN_ADDRESSES,
  NETWORKS,
  TEST_NETWORKS,
  ISPRODUCTION
} from "../constants/constants";
import { AuthContext } from "./providers/AuthProvider";
import { AppModes, Category, GasModes } from "../types/types";
import Panels from "../components/Panels";
import Image from "next/image";
import CsvReader from "@/components/CsvReader";


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}



const categories: Array<Category> = ["One Time", "Recurring"];
const appModes: Array<AppModes> = ["Auto Pay", "xStream"];
const gasModes: Array<GasModes> = ["Forward", "Gas Account"];

const Main = () => {
  const { chain } = useNetwork();
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { sourceChain, sourceToken, setSourceToken, appMode, setAppMode, selectedCategory, setSelectedCategory, dataRows, setDataRows } = useContext(AuthContext);

  const [showThisSection, setShowThisSection] = useState<{
    0: boolean;
    1: boolean;
    2: boolean;
    3: boolean;
  }>({
    0: false,
    1: false,
    2: false,
    3: false,
  });

  useEffect(() => {
    if (
      dataRows[dataRows.length - 1]?.toAddress &&
      dataRows[dataRows.length - 1]?.destinationChain &&
      dataRows[dataRows.length - 1]?.destinationToken &&
      dataRows[dataRows.length - 1]?.amountOfSourceToken
    ) {
      setDataRows([
        ...dataRows,
        {
          id: String(dataRows.length),
          toAddress: "",
          destinationChain: "",
          destinationToken: "",
          amountOfSourceToken: "",
        },
      ]);
      setShowThisSection({
        ...showThisSection,
        3: true,
      });
    }
  }, [dataRows, showThisSection]);

  console.log("here: ", chain);
  return (
    <div className="m-auto max-w-[67rem] px-10 py-8">
      <h3 className="text-[1.45rem] font-bold tracking-[0.5px]">
        The Fragments way of automating smart contracts
      </h3>



      {/* ----------------------------------SOURCE CHAIN , TOKEN SELECTION ------------------- */}
      <div className="w-11/12  px-2 pt-8 sm:px-0">
        <div className="rounded-md bg-[#282828] p-5">
          <div className="grid grid-cols-2 gap-x-2">
            <Dropdown
              value={sourceChain}
              onChange={(e: { chainId: number }) => {
                switchNetwork({ chainId: e?.chainId })
              }}
            >
              {({ open }) => (
                <>
                  <Dropdown.Select
                    open={open}
                    label="Source Chain"
                    placeholder="Choose a Chain"
                    className="bg-[#262229]"
                  >
                    {chain?.name && (
                      <div className="flex items-center gap-2">
                        {chain?.id && <img
                          className="h-[1.2rem] w-[1.2rem] rounded-full"
                          src={TEST_NETWORKS[chain?.id]?.logo}
                          alt="chain logo"
                        />}
                        {chain?.name}
                      </div>
                    )}
                  </Dropdown.Select>
                  <Dropdown.Options className="z-[10] rounded-lg bg-[#262229]">
                    {chain?.id
                      ? Object?.values(ISPRODUCTION ? NETWORKS : TEST_NETWORKS).map(
                        (network, index) => (
                          <Dropdown.Option value={network} key={index}>
                            {({ selected, active }) => {
                              return (
                                <MenuItem
                                  isActive={active}
                                  isSelected={selected}
                                >
                                  <img
                                    className="h-[1.2rem] w-[1.2rem]"
                                    src={network?.logo}
                                    alt="token logo"
                                  />
                                  <MenuItem.Title>{network?.chainName}</MenuItem.Title>
                                </MenuItem>
                              );
                            }}
                          </Dropdown.Option>
                        )
                      )
                      : null}
                  </Dropdown.Options>
                </>
              )}
            </Dropdown>
            <Dropdown
              value={sourceToken}
              onChange={(e: any) => {
                setShowThisSection({
                  ...showThisSection,
                  0: true,
                });
                setSourceToken(e);
              }}
            >
              {({ open }) => (
                <>
                  <Dropdown.Select
                    open={open}
                    label="From Token"
                    placeholder="Choose a token"
                    className=" bg-[#262229]"
                  >
                    {sourceToken && (
                      <div className="flex items-center gap-2">
                        <img
                          className="h-[1.2rem] w-[1.2rem] rounded-full"
                          src={sourceToken?.logo}
                          alt="token logo"
                        />
                        {sourceToken.address}
                      </div>
                    )}
                  </Dropdown.Select>
                  <Dropdown.Options className="z-[10] rounded-lg bg-[#262229]">
                    {chain?.id
                      ? Object?.keys(TOKEN_ADDRESSES[chain?.id]).map(
                        (token, index) => (
                          <Dropdown.Option value={token} key={index}>
                            {({ selected, active }) => {
                              return (
                                <MenuItem
                                  isActive={active}
                                  isSelected={selected}
                                >
                                  <img
                                    className="h-[1.2rem] w-[1.2rem]"
                                    // @ts-ignore
                                    src={token?.logo}
                                    alt="token logo"
                                  />
                                  <MenuItem.Title>{token}</MenuItem.Title>
                                </MenuItem>
                              );
                            }}
                          </Dropdown.Option>
                        )
                      )
                      : null}
                  </Dropdown.Options>
                </>
              )}
            </Dropdown>
          </div>
          <div className="grid grid-cols-1 gap-x-2 pt-8">
            <Tab.Group
              onChange={(idx) => {
                setAppMode(idx === 0 ? "Auto Pay" : "xStream");
              }}
            >
              <Tab.List className="flex gap-[1px] space-x-1 rounded-xl bg-[#464646] p-[5px]">
                {appModes.map((mode) => (
                  <Tab
                    key={mode}
                    className={({ selected }) =>
                      classNames(
                        "w-full rounded-xl py-2.5 text-sm font-bold leading-5",
                        selected
                          ? "bg-[#00FFA9] text-black shadow"
                          : "bg-[#464646] text-[#6B6B6B]"
                      )
                    }
                    disabled={mode === "xStream"}
                  >
                    {mode}
                  </Tab>
                ))}
              </Tab.List>
            </Tab.Group>
          </div>
        </div>
      </div>



      {/* ------------------------------CATEGORY MAPPING ------------------------------------ */}
      <div
        className={classNames(
          "py-5 transition-opacity",
          showThisSection[0] ? "opacity-100" : " opacity-0"
        )}
      >
        <div className="w-fit rounded-xl bg-[#282828] px-5">
          <div className="w-full px-2 py-5 sm:px-0">
            <Tab.Group>
              <Tab.List className="flex w-[18rem] gap-[1px] space-x-1 rounded-xl bg-[#464646] p-[5px]">
                {categories.map((category) => (
                  <Tab
                    key={category}
                    className={({ selected }) =>
                      classNames(
                        "w-full rounded-xl py-2.5 text-sm font-medium leading-5 text-white",
                        selectedCategory === category
                          ? "bg-[#11954F] shadow"
                          : "bg-[#2E2E2E] hover:bg-white/[0.12] hover:text-white"
                      )
                    }
                    onClick={() => {
                      setSelectedCategory(category);
                      setShowThisSection({
                        ...showThisSection,
                        1: true,
                      });
                    }}
                  >
                    {category}
                  </Tab>
                ))}
              </Tab.List>
            </Tab.Group>
          </div>
        </div>
      </div>


      {/* --------------------------------PANELS --------------------------------------------- */}

 
      <Panels selectedCategory={selectedCategory} showThisSection={showThisSection} setShowThisSection={setShowThisSection} />


    </div >
  );
};

export default Main;
