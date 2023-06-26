import {
  Button,
  Dropdown,
  Input,
  Label,
  MenuItem,
} from '@heathmont/moon-core-tw';
import { ControlsCloseSmall } from '@heathmont/moon-icons-tw';
import React, { useState } from 'react';

import { intervalTypes } from '@/components/Panels';

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

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  return (
    <div>
      <div
        className={classNames(
          'w-11/12 rounded-md transition-opacity',
          showThisSection[1] ? 'opacity-100' : ' opacity-0'
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
                  Select Interval
                </Button>

                <Modal
                  open={isOpen}
                  onClose={closeModal}
                  title='Recurring Schedule'
                >
                  <div className='border-beerus relative px-6 pb-4 pt-5'>
                    <h3 className='text-moon-18 text-bulma font-medium'>
                      Select Frequency
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
    </div>
  );
};

export default TimePanel;
