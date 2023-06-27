import {
  Button,
  Dropdown,
  Input,
  Label,
  MenuItem,
  Modal,
  Radio,
} from '@heathmont/moon-core-tw';
import { ControlsCloseSmall } from '@heathmont/moon-icons-tw';
import React, { useState } from 'react';

import { Category, Options, Tokens } from '../../types/types';

type Props = {
  selectedCategory: Category | null;
  showThisSection: boolean;
  setShowThisSection: React.Dispatch<React.SetStateAction<boolean>>;
  dataRows: any[];
};

const ABIPanel = ({
  selectedCategory,
  showThisSection,
  setShowThisSection,
  dataRows,
}: Props) => {
  const [fromToken, setFromToken] = useState<Tokens | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [intervalType, setIntervalType] = useState<Options | null>({
    value: 'days',
    label: 'days',
  });
  const [value, setValue] = useState('');

  // const handleChange = (e) => {
  //   const inputValue = e.target.value;

  //   if (!isNaN(inputValue) && inputValue !== "") {
  //     setTimesValue(inputValue + " times");
  //   } else {
  //     setTimesValue("");
  //   }
  // };

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  return (
    <div className='flex w-full flex-col items-end justify-around gap-2 lg:flex-row'>
      <div className='w-full'>
        <Label htmlFor='c-1' className='text-piccolo'>
          To Address
        </Label>
        <Input
          type='text'
          placeholder='Eg 0x16C85b054619b743c1dCb5B091c2b26B30E037eF'
          id='c-1'
          className='rounded bg-[#262229] text-white'
        />
        {selectedCategory === 'Recurring' && (
          <div className='mt-4 grid grid-cols-2 gap-x-2'>
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
              <Modal open={isOpen} onClose={closeModal}>
                <Modal.Backdrop className='bg-black opacity-60' />
                <Modal.Panel className='bg-[#282828] p-3'>
                  <div className='border-beerus relative px-6 pb-4 pt-5'>
                    <h3 className='text-moon-18 text-bulma font-medium'>
                      Recurring Schedule
                    </h3>
                    <span
                      className='absolute right-5 top-4 inline-block h-8 w-8 cursor-pointer'
                      onClick={closeModal}
                    >
                      <ControlsCloseSmall className='block h-full w-full' />
                    </span>
                  </div>
                  <div className='grid grid-cols-5 items-center gap-3 px-6 py-4'>
                    <span className='col-span-2 block text-[#AFAEAE]'>
                      Repeat Every
                    </span>
                    <Input
                      type='numeric'
                      placeholder='1'
                      id='c-1'
                      className='col-span-1 rounded bg-[#262229] text-white'
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

                          <Dropdown.Options className='z-[10] w-full bg-[#262229]'>
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
                  <div className='px-6 py-4'>
                    <span className='col-span-2 block text-[#AFAEAE]'>
                      Ends
                    </span>
                    <Radio
                      value={value}
                      onChange={setValue}
                      name='Form Item'
                      className='mt-4 space-y-6'
                    >
                      <Radio.Option value='option1'>
                        <Radio.Indicator />
                        Never
                      </Radio.Option>
                      <Radio.Option
                        value='option2'
                        className='grid grid-cols-3 items-center'
                      >
                        <div className='col-span-1 flex gap-2'>
                          <Radio.Indicator />
                          <span>On</span>
                        </div>
                        <div className='relative col-span-2 ml-5 max-w-sm'>
                          <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                            <svg
                              aria-hidden='true'
                              className='h-5 w-5 text-gray-500 dark:text-gray-400'
                              fill='currentColor'
                              viewBox='0 0 20 20'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                fill-rule='evenodd'
                                d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z'
                                clip-rule='evenodd'
                              ></path>
                            </svg>
                          </div>
                          <input
                            type='date'
                            className='block w-full rounded-lg bg-[#262229] p-2.5 pl-10 text-sm '
                            placeholder='Select date'
                          />
                        </div>
                      </Radio.Option>
                      <Radio.Option
                        value='option2'
                        className='grid grid-cols-3 items-center'
                      >
                        <div className='col-span-1 flex gap-2'>
                          <Radio.Indicator />
                          <span>After</span>
                        </div>
                        <div className='relative col-span-2 ml-5 max-w-sm'>
                          <Input
                            type='text'
                            // value={timesValue}
                            // onChange={handleChange}
                            pattern='[0-9]*'
                            inputMode='numeric'
                            className='col-span-1 rounded bg-[#262229] text-white'
                          />
                        </div>
                      </Radio.Option>
                    </Radio>
                  </div>
                  <div className='flex justify-end gap-2 p-4 pt-2'>
                    <Button variant='secondary' onClick={closeModal}>
                      Cancel
                    </Button>
                    <Button onClick={closeModal}>Create</Button>
                  </div>
                </Modal.Panel>
              </Modal>
            </div>
          </div>
        )}
        <div className='mt-4'>
          <Label htmlFor='c-1' className='text-piccolo'>
            Contract Address
          </Label>
          <Input
            type='text'
            placeholder='Eg 0x332dE499eF93F6dc3674896aA4Ee934067917257'
            id='c-1'
            className='rounded bg-[#262229] text-white'
          />
        </div>
        <div className='mt-4'>
          <Dropdown value={fromToken} onChange={setFromToken}>
            {({ open }) => (
              <>
                <Dropdown.Select
                  open={open}
                  label='Functions'
                  placeholder='Choose a function'
                  className='bg-[#262229]'
                >
                  {fromToken?.name}
                </Dropdown.Select>
                <Dropdown.Options className='z-[10] bg-[#262229]'>
                  {tokens.map((token, index) => (
                    <Dropdown.Option value={token} key={index}>
                      {({ selected, active }) => {
                        return (
                          <MenuItem isActive={active} isSelected={selected}>
                            <MenuItem.Title>{token.name}</MenuItem.Title>
                          </MenuItem>
                        );
                      }}
                    </Dropdown.Option>
                  ))}
                </Dropdown.Options>
              </>
            )}
          </Dropdown>
        </div>
        <div className='mt-4 grid grid-cols-2 gap-x-2'>
          <Dropdown value={fromToken} onChange={setFromToken}>
            {({ open }) => (
              <>
                <Dropdown.Select
                  open={open}
                  label='From Token'
                  placeholder='Choose a token'
                  className='bg-[#262229]'
                >
                  {fromToken?.name}
                </Dropdown.Select>
                <Dropdown.Options className='z-[10] bg-[#262229]'>
                  {tokens.map((token, index) => (
                    <Dropdown.Option value={token} key={index}>
                      {({ selected, active }) => {
                        return (
                          <MenuItem isActive={active} isSelected={selected}>
                            <MenuItem.Title>{token.name}</MenuItem.Title>
                          </MenuItem>
                        );
                      }}
                    </Dropdown.Option>
                  ))}
                </Dropdown.Options>
              </>
            )}
          </Dropdown>
          <div>
            <Label htmlFor='c-1' className='text-piccolo'>
              Amount
            </Label>
            <Input
              type='numeric'
              placeholder='69'
              id='c-1'
              className='rounded bg-[#262229] text-white'
            />
          </div>
        </div>
        <div className='mt-4 grid grid-cols-2 gap-x-2'>
          <Dropdown value={fromToken} onChange={setFromToken}>
            {({ open }) => (
              <>
                <Dropdown.Select
                  open={open}
                  label='To Chain'
                  placeholder='Choose a Chain'
                  className='bg-[#262229]'
                >
                  {fromToken?.name}
                </Dropdown.Select>
                <Dropdown.Options className='z-10 bg-[#262229]'>
                  {tokens.map((token, index) => (
                    <Dropdown.Option value={token} key={index}>
                      {({ selected, active }) => {
                        return (
                          <MenuItem isActive={active} isSelected={selected}>
                            <MenuItem.Title>{token.name}</MenuItem.Title>
                          </MenuItem>
                        );
                      }}
                    </Dropdown.Option>
                  ))}
                </Dropdown.Options>
              </>
            )}
          </Dropdown>
          <Dropdown value={fromToken} onChange={setFromToken}>
            {({ open }) => (
              <>
                <Dropdown.Select
                  open={open}
                  label='To Token'
                  placeholder='Choose a token'
                  className='bg-[#262229]'
                >
                  {fromToken?.name}
                </Dropdown.Select>
                <Dropdown.Options className='z-[10] bg-[#262229]'>
                  {tokens.map((token, index) => (
                    <Dropdown.Option value={token} key={index}>
                      {({ selected, active }) => {
                        return (
                          <MenuItem isActive={active} isSelected={selected}>
                            <MenuItem.Title>{token.name}</MenuItem.Title>
                          </MenuItem>
                        );
                      }}
                    </Dropdown.Option>
                  ))}
                </Dropdown.Options>
              </>
            )}
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default ABIPanel;
