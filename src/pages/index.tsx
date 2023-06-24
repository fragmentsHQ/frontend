'use client'; // This is a client component 👈🏽

// import Image from "next/image";

import { Tab } from '@headlessui/react';
import { Button, Dropdown, MenuItem } from '@heathmont/moon-core-tw';
import { switchNetwork } from '@wagmi/core';
// import panels from "../components/Panels";
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useCSVReader } from 'react-papaparse';
import { useNetwork } from 'wagmi';

import { AuthContext } from '@/components/AuthProvider';
import CsvReader from '@/components/CsvReader';
import Layout from '@/components/layout/Layout';

import {
  ISPRODUCTION,
  NETWORKS,
  TEST_NETWORKS,
  TOKEN_ADDRESSES,
} from '../constants/constants';
import { AppModes, Category, GasModes } from '../types/types';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const categories: Array<Category> = ['One Time', 'Recurring'];
const appModes: Array<AppModes> = ['Auto Pay', 'xStream'];
const gasModes: Array<GasModes> = ['Forward', 'Gas Account'];

const Main = () => {
  const { chain } = useNetwork();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>();
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { sourceChain, sourceToken, setSourceToken, appMode, setAppMode } =
    useContext(AuthContext);
  const { CSVReader } = useCSVReader();
  const panelRef = useRef(null);
  const [dataRows, setDataRows] = useState([
    {
      id: '0',
      toAddress: '',
      destinationToken: '',
      destinationChain: '',
      amountOfSourceToken: '',
    },
  ]);
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
          toAddress: '',
          destinationChain: '',
          destinationToken: '',
          amountOfSourceToken: '',
        },
      ]);
      setShowThisSection({
        ...showThisSection,
        3: true,
      });
    }
  }, [dataRows]);

  console.log('here: ', chain);
  return (
    <Layout>
      <div className='m-auto max-w-[67rem] px-10 py-8'>
        <h3 className='text-[1.45rem] font-bold tracking-[0.5px]'>
          The Fragments way of automating smart contracts
        </h3>
        <div className='w-11/12  px-2 pt-8 sm:px-0'>
          <div className='rounded-md bg-[#282828] p-5'>
            <div className='grid grid-cols-2 gap-x-2'>
              <Dropdown
                value={sourceChain}
                onChange={(e: { chainId: number }) => {
                  switchNetwork({ chainId: e?.chainId });
                }}
              >
                {({ open }) => (
                  <>
                    <Dropdown.Select
                      open={open}
                      label='Source Chain'
                      placeholder='Choose a Chain'
                      className='bg-[#262229]'
                    >
                      {chain?.name && (
                        <div className='flex items-center gap-2'>
                          {chain?.id && (
                            <img
                              className='h-[1.2rem] w-[1.2rem] rounded-full'
                              src={TEST_NETWORKS[chain?.id]?.logo}
                              alt='chain logo'
                            />
                          )}
                          {chain?.name}
                        </div>
                      )}
                    </Dropdown.Select>
                    <Dropdown.Options className='z-[10] rounded-lg bg-[#262229]'>
                      {chain?.id
                        ? Object?.values(
                            ISPRODUCTION ? NETWORKS : TEST_NETWORKS
                          ).map((network, index) => (
                            <Dropdown.Option value={network} key={index}>
                              {({ selected, active }) => {
                                return (
                                  <MenuItem
                                    isActive={active}
                                    isSelected={selected}
                                  >
                                    <img
                                      className='h-[1.2rem] w-[1.2rem]'
                                      src={network?.logo}
                                      alt='token logo'
                                    />
                                    <MenuItem.Title>
                                      {network?.chainName}
                                    </MenuItem.Title>
                                  </MenuItem>
                                );
                              }}
                            </Dropdown.Option>
                          ))
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
                      label='From Token'
                      placeholder='Choose a token'
                      className=' bg-[#262229]'
                    >
                      {sourceToken && (
                        <div className='flex items-center gap-2'>
                          <img
                            className='h-[1.2rem] w-[1.2rem] rounded-full'
                            src={sourceToken?.logo}
                            alt='token logo'
                          />
                          {sourceToken.address}
                        </div>
                      )}
                    </Dropdown.Select>
                    <Dropdown.Options className='z-[10] rounded-lg bg-[#262229]'>
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
                                        className='h-[1.2rem] w-[1.2rem]'
                                        src={token?.logo}
                                        alt='token logo'
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
            <div className='grid grid-cols-1 gap-x-2 pt-8'>
              <Tab.Group
                onChange={(idx) => {
                  setAppMode(idx === 0 ? 'Auto Pay' : 'xStream');
                }}
              >
                <Tab.List className='flex gap-[1px] space-x-1 rounded-xl bg-[#464646] p-[5px]'>
                  {appModes.map((mode) => (
                    <Tab
                      key={mode}
                      className={({ selected }) =>
                        classNames(
                          'w-full rounded-xl py-2.5 text-sm font-bold leading-5',
                          selected
                            ? 'bg-[#00FFA9] text-black shadow'
                            : 'bg-[#464646] text-[#6B6B6B]'
                        )
                      }
                      disabled={mode === 'xStream'}
                    >
                      {mode}
                    </Tab>
                  ))}
                </Tab.List>
              </Tab.Group>
            </div>
          </div>
        </div>
        <div
          className={classNames(
            'py-5 transition-opacity',
            showThisSection[0] ? 'opacity-100' : ' opacity-0'
          )}
        >
          <div className='w-fit rounded-xl bg-[#282828] px-5'>
            <div className='w-full px-2 py-5 sm:px-0'>
              <Tab.Group>
                <Tab.List className='flex w-[18rem] gap-[1px] space-x-1 rounded-xl bg-[#464646] p-[5px]'>
                  {categories.map((category) => (
                    <Tab
                      key={category}
                      className={({ selected }) =>
                        classNames(
                          'w-full rounded-xl py-2.5 text-sm font-medium leading-5 text-white',
                          selectedCategory === category
                            ? 'bg-[#11954F] shadow'
                            : 'bg-[#2E2E2E] hover:bg-white/[0.12] hover:text-white'
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
        {/* <div
        className={classNames(
          "w-11/12 rounded-md transition-opacity",
          showThisSection[1] ? "opacity-100" : " opacity-0"
        )}
      >
        <Tab.Group>
          <div className="rounded-xl bg-[#282828] p-5">
            <Tab.List className="grid grid-cols-4 gap-[1px] space-x-1 rounded-xl bg-[#464646] p-[5px]">
              {Object.keys(panels).map((panel) => {
                if (panels[panel].category.includes(selectedCategory))
                  return (
                    <Tab
                      key={panel}
                      className={({ selected }) =>
                        classNames(
                          "col-span-1 w-auto rounded-xl px-8 py-[0.5rem] text-sm font-medium leading-5 text-white",
                          selected
                            ? "bg-[#9101D4] shadow"
                            : "bg-[#2E2E2E] hover:bg-white/[0.12] hover:text-white"
                        )
                      }
                    >
                      {panel}
                    </Tab>
                  );
              })}
            </Tab.List>
          </div>
          <Tab.Panels className="mt-6 ">
            {Object.values(panels).map((type, idx) => (
              <Tab.Panel
                key={idx}
                className={classNames("rounded-xl  bg-[#282828] p-5")}
              >
                <ul>
                  {type.element(
                    selectedCategory,
                    showThisSection,
                    setShowThisSection,
                    dataRows,
                    panelRef
                  )}
                </ul>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div> */}
        <div
          className={classNames(
            'w-11/12 rounded-md  py-5 transition-opacity',
            showThisSection[2] ? 'opacity-100' : ' opacity-0'
          )}
        >
          <CsvReader
            dataRows={dataRows}
            setDataRows={setDataRows}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
          />
        </div>
        <div
          className={classNames(
            'w-11/12  px-2 transition-opacity sm:px-0',
            showThisSection[3] ? 'opacity-100' : ' opacity-0'
          )}
        >
          <div className='rounded-md bg-[#282828] p-5'>
            <div className='m-auto pt-3 text-center'>
              Choose how the task should be paid for. The cost of each execution
              equals the network fee.
            </div>
            <div className='grid grid-cols-1 gap-x-2 pt-8'>
              <Tab.Group
                onChange={(idx) => {
                  setSourceData({ ...sourceData, gasMode: gasModes[idx] });
                }}
              >
                <Tab.List className='flex gap-[1px] space-x-1 rounded-xl bg-[#464646] p-[5px]'>
                  {gasModes.map((mode) => (
                    <Tab
                      key={mode}
                      className={({ selected }) =>
                        classNames(
                          'w-full rounded-xl py-2.5 text-sm font-bold leading-5',
                          selected
                            ? 'bg-[#00FFA9] text-black shadow'
                            : 'bg-[#464646] text-[#6B6B6B]'
                        )
                      }
                      disabled={mode === 'xStream'}
                    >
                      {mode === 'Forward'
                        ? 'Forward Paying Gas'
                        : 'Pay from Gas Account'}
                    </Tab>
                  ))}
                </Tab.List>
              </Tab.Group>
            </div>
            <Button
              size='sm'
              className='m-auto mt-16 h-12 w-[10rem] rounded-lg bg-[#2BFFB1] text-lg font-bold text-black'
              onClick={() => {
                panelRef.current.executeTxn();
              }}
            >
              {/* {panelRef?.current?.hasEnoughAllowance() ? "Confirm" : "Approve"} */}
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Main;
