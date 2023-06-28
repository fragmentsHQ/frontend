import { Tab } from '@headlessui/react';
import {
  Button,
  Dropdown,
  Input,
  Label,
  MenuItem,
} from '@heathmont/moon-core-tw';
import { ControlsCloseSmall } from '@heathmont/moon-icons-tw';
import React, { useState } from 'react';

import useAutoPayContract from '@/hooks/useAutopayContract';

import { gasModes, intervalTypes } from '@/components/Panels';
import TokenTable from '@/components/tables/TokenTable';

import useGlobalStore from '@/store';

import DatePicker from '../../components/DatePicker';
import Modal from '../../components/Modal';
import { Category } from '../../types/types';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

type Props = {
  selectedCategory: Category | null;
  showThisSection: boolean;
  setShowThisSection: React.Dispatch<React.SetStateAction<boolean>>;
};

const TimePanel = ({
  selectedCategory,
  showThisSection,
  setShowThisSection,
  startTime,
  setStartTime,
  cycles,
  setCycles,
  intervalCount,
  setIntervalCount,
  intervalType,
  setIntervalType,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isApproved, setIsApproved } = useGlobalStore();

  const { enteredRows } = useGlobalStore();
  const closeModal = () => {
    setShowThisSection({
      ...showThisSection,
      2: true,
    });
    setIsOpen(false);
  };
  const openModal = () => setIsOpen(true);
  const autoPayHook = useAutoPayContract();

  const isValid = enteredRows.every(
    (item) =>
      item.amount_of_source_token !== '' &&
      item.destination_chain !== '' &&
      item.destination_token !== '' &&
      item.to_address
  );
  return (
    <div>
      <div
        className={classNames(
          'w-11/12 rounded-md transition-opacity',
          showThisSection[1] ? 'block' : ' hidden'
        )}
      >
        <div className='w-full flex-col'>
          <div className='grid w-full grid-cols-3 gap-3'>
            <div>
              <Label htmlFor='c-1' className='text-piccolo'>
                Start Time
              </Label>

              <DatePicker
                selected={startTime}
                setSelected={setStartTime}
                setShowThisSection={setShowThisSection}
                showThisSection={showThisSection}
              />
            </div>

            {selectedCategory === 'Recurring' && (
              <div>
                <Label htmlFor='c-1' className='text-piccolo'>
                  No. of Cycles
                </Label>
                <Input
                  type='number'
                  placeholder='1'
                  id='c-1'
                  className='rounded bg-[#262229] px-3 py-2 text-white'
                  onChange={(e) => setCycles(e.target.value)}
                />
              </div>
            )}

            {selectedCategory === 'Recurring' && (
              <div>
                <Label htmlFor='c-1' className='text-piccolo'>
                  Interval
                </Label>
                <Button
                  onClick={openModal}
                  className='rounded-md bg-[#262229] font-normal'
                >
                  Select Frequency ({intervalCount} {intervalType.label})
                </Button>

                <Modal
                  open={isOpen}
                  onClose={closeModal}
                  title='Recurring Schedule'
                >
                  <div className='border-beerus relative px-6 pb-4 pt-5'>
                    <h3 className='text-moon-18 text-bulma font-medium'>
                      Select Frequenct
                    </h3>
                    <span
                      className='absolute right-5 top-4 inline-block h-8 w-8 cursor-pointer'
                      onClick={closeModal}
                    >
                      <ControlsCloseSmall className='block h-full w-full' />
                    </span>
                  </div>
                  <div className='grid grid-cols-5 items-center gap-3 px-6 py-4'>
                    <span className='col-span-2 flex h-full w-full items-center text-[#AFAEAE]'>
                      Repeat Every
                    </span>
                    <Input
                      type='text'
                      placeholder='1'
                      id='c-1'
                      className='col-span-1 h-full w-full rounded bg-[#262229] text-white'
                      value={intervalCount}
                      onChange={(e) => setIntervalCount(e.target.value)}
                    />
                    <Dropdown
                      value={intervalType}
                      onChange={setIntervalType}
                      size='xl'
                      className='col-span-2'
                    >
                      {({ open }) => (
                        <>
                          <Dropdown.Select
                            open={open}
                            data-test='data-test'
                            className='bg-[#262229]'
                          >
                            {intervalType?.label}
                          </Dropdown.Select>

                          <Dropdown.Options className='z-[10] w-full min-w-full bg-[#262229]'>
                            {intervalTypes.map((size, index) => (
                              <Dropdown.Option value={size} key={index}>
                                {({ selected, active }) => (
                                  <MenuItem
                                    isActive={active}
                                    isSelected={selected}
                                  >
                                    {size.label}
                                  </MenuItem>
                                )}
                              </Dropdown.Option>
                            ))}
                          </Dropdown.Options>
                        </>
                      )}
                    </Dropdown>
                  </div>

                  <div className='flex justify-end gap-2 p-4 pt-2'>
                    <Button
                      className='rounded-md bg-[#262229]'
                      onClick={closeModal}
                    >
                      Ok
                    </Button>
                  </div>
                </Modal>
              </div>
            )}
          </div>
        </div>
      </div>
      {showThisSection[2] && (
        <div
          className={classNames('w-11/12 rounded-md  py-5 transition-opacity')}
        >
          {/* <CsvReader
          dataRows={dataRows}
          setDataRows={setDataRows}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
        /> */}
          <TokenTable setShowThisSection={setShowThisSection} />
        </div>
      )}

      {/* ------------------------------------ GAS MODES ------------------------------------- */}
      {isValid && showThisSection[2] && (
        <div className={classNames('w-11/12  px-2 transition-opacity sm:px-0')}>
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
              className='m-auto mt-16 h-12 w-[14rem] rounded-lg bg-[#2BFFB1] text-lg font-bold text-black disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-200'
              onClick={() => {
                autoPayHook.handleApprove();
              }}
              disabled={isApproved}
            >
              Approve Tokens {JSON.stringify(autoPayHook.isApproved)}
            </Button>
            <Button
              size='sm'
              className='m-auto mt-8 h-12 w-[14rem] rounded-lg bg-[#2BFFB1] text-lg font-bold  text-black disabled:cursor-not-allowed disabled:bg-gray-400'
              onClick={() => {
                autoPayHook.handleTimeExecution();
              }}
              disabled={!isApproved}
            >
              Confirm
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimePanel;
