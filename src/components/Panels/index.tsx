import { Tab } from '@headlessui/react';
import { Button } from '@heathmont/moon-core-tw';
import React, { useContext, useState } from 'react';

import { AuthContext } from '@/components/AuthProvider';

import TimePanel from './TimePanel';
import useAutoPayContract from '../../hooks/useAutopayContract';
import { AppModes, Category, GasModes } from '../../types/types';

const categories: Array<Category> = ['One Time', 'Recurring'];
const appModes: Array<AppModes> = ['Auto Pay', 'xStream'];
const gasModes: Array<GasModes> = ['Forward', 'Gas Account'];
import TokenTable from '@/components/tables/TokenTable';
const intervalTypes = [
  { value: 'days', label: 'days' },
  { value: 'weeks', label: 'weeks' },
  { value: 'months', label: 'months' },
  { value: 'years', label: 'years' },
];

const tokens = [{ name: 'USDC' }, { name: 'USDT' }, { name: 'DAI' }];

interface xaShowThisSection {
  0: boolean;
  1: boolean;
  2: boolean;
  3: boolean;
}

interface DataRows {
  id: string;
  toAddress: string;
  destinationToken: string;
  destinationChain: string;
  amountOfSourceToken: string;
}

type Props = {
  selectedCategory: Category | null;
  showThisSection: ShowThisSection;
  setShowThisSection: React.Dispatch<React.SetStateAction<ShowThisSection>>;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Panels = ({
  selectedCategory,
  showThisSection,
  setShowThisSection,
}: Props) => {
  const { dataRows, setDataRows } = useContext(AuthContext);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const autoPayHook = useAutoPayContract();

  return (
    <div>
      <div
        className={classNames(
          'w-11/12 rounded-md transition-opacity',
          showThisSection[1] ? 'opacity-100' : ' opacity-0'
        )}
      >
        <Tab.Group>
          <div className='rounded-xl bg-[#282828] p-5'>
            <Tab.List className='grid grid-cols-4 gap-[1px] space-x-1 rounded-xl bg-[#464646] p-[5px]'>
              {Object.keys(OPTIONS).map((panel) => {
                if (
                  OPTIONS[panel].category.includes(
                    selectedCategory ?? 'One Time'
                  )
                )
                  return (
                    <Tab
                      key={panel}
                      className={({ selected }) =>
                        classNames(
                          'col-span-1 w-auto rounded-xl px-8 py-[0.5rem] text-sm font-medium leading-5 text-white',
                          selected
                            ? 'bg-[#9101D4] shadow'
                            : 'bg-[#2E2E2E] hover:bg-white/[0.12] hover:text-white'
                        )
                      }
                    >
                      {panel}
                    </Tab>
                  );
              })}
            </Tab.List>
          </div>
          <Tab.Panels className='mt-6 '>
            {Object.values(OPTIONS).map((type, idx) => (
              <Tab.Panel
                key={idx}
                className={classNames('rounded-xl  bg-[#282828] p-5')}
              >
                <ul>
                  {type.element(
                    selectedCategory ?? 'One Time',
                    showThisSection,
                    setShowThisSection,
                    autoPayHook.startTime,
                    autoPayHook.setStartTime,
                    autoPayHook.cycles,
                    autoPayHook.setCycles,
                    autoPayHook.intervalCount,
                    autoPayHook.setIntervalCount,
                    autoPayHook.intervalType,
                    autoPayHook.setIntervalType
                  )}
                </ul>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>

      {/* ------------------------------------------CSV READER ------------------------------- */}
      <div
        className={classNames(
          'w-11/12 rounded-md  py-5 transition-opacity',
          showThisSection[2] ? 'opacity-100' : ' opacity-0'
        )}
      >
        {/* <CsvReader
          dataRows={dataRows}
          setDataRows={setDataRows}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
        /> */}
        <TokenTable />
      </div>

      {/* ------------------------------------ GAS MODES ------------------------------------- */}
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
            // onChange={(idx) => {
            //   setSourceData({ ...sourceData, gasMode: gasModes[idx] });
            // }}
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
                    disabled={mode === 'Forward'}
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
            className='m-auto mt-16 h-12 w-[14rem] rounded-lg bg-[#2BFFB1] text-lg font-bold text-black'
            onClick={() => {
              autoPayHook.handleApprove();
            }}
          >
            Approve Tokens
          </Button>
          <Button
            size='sm'
            className='m-auto mt-8 h-12 w-[14rem] rounded-lg bg-[#2BFFB1] text-lg font-bold text-black'
            onClick={() => {
              autoPayHook.handleTimeExecution();
            }}
            disabled={!autoPayHook.isApproved}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

const OPTIONS: Options = {
  Time: {
    id: 0,
    category: ['Recurring', 'One Time'],
    element: (
      selectedCategory: Category | null,
      showThisSection: ShowThisSection,
      setShowThisSection: React.Dispatch<React.SetStateAction<ShowThisSection>>,
      startTime,
      setStartTime,
      cycles,
      setCycles,
      intervalCount,
      setIntervalCount,
      intervalType,
      setIntervalType
    ) => {
      return (
        <TimePanel
          selectedCategory={selectedCategory}
          showThisSection={showThisSection}
          setShowThisSection={setShowThisSection}
          startTime={startTime}
          setStartTime={setStartTime}
          cycles={cycles}
          setCycles={setCycles}
          intervalCount={intervalCount}
          setIntervalCount={setIntervalCount}
          intervalType={intervalType}
          setIntervalType={setIntervalType}
        />
      );
    },
  },
  // "Token Pair Price": {
  //     id: 1,
  //     category: ["One Time", "Recurring"],
  //     element: (
  //         selectedCategory: Category | null,
  //         showThisSection: ShowThisSection,
  //         setShowThisSection: React.Dispatch<React.SetStateAction<ShowThisSection>>,

  //     ) => {
  //         return (
  //             <PriceFeedPanel
  //                 selectedCategory={selectedCategory}
  //                 showThisSection={showThisSection}
  //                 setShowThisSection={setShowThisSection}

  //             />
  //         );
  //     },
  // },
  // "Gas Price Estimate": {
  //     id: 2,
  //     category: ["One Time", "Recurring"],
  //     element: (
  //         selectedCategory: Category,
  //         showThisSection: ShowThisSection,
  //         setShowThisSection: React.Dispatch<React.SetStateAction<ShowThisSection>>,

  //     ) => {
  //         return (
  //             <GasPricePanel
  //                 selectedCategory={selectedCategory}
  //                 showThisSection={showThisSection}
  //                 setShowThisSection={setShowThisSection}

  //             />
  //         );
  //     },
  // },
  // "ABI Functions": {
  //     id: 3,
  //     category: ["One Time", "Recurring"],
  //     element: (
  //         selectedCategory: Category,
  //         showThisSection: ShowThisSection,
  //         setShowThisSection: React.Dispatch<React.SetStateAction<ShowThisSection>>,
  //     ) => {
  //         return (
  //             <ABIPanel
  //                 selectedCategory={selectedCategory}
  //                 showThisSection={showThisSection}
  //                 setShowThisSection={setShowThisSection}

  //             />
  //         );
  //     },
  // },
};

export default Panels;

interface Options {
  [key: string]: {
    id: number;
    category: string[];
    element: (
      selectedCategory: Category,
      showThisSection: ShowThisSection,
      setShowThisSection: React.Dispatch<React.SetStateAction<ShowThisSection>>,
      autoPayHook: any
    ) => JSX.Element;
  };
}
