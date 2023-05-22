import React from "react";
import { useState } from "react";
import { Tab } from "@headlessui/react";
import {
  Input,
  Label,
  Hint,
  Dropdown,
  MenuItem,
  Button,
  Modal,
} from "@heathmont/moon-core-tw";
import { ControlsCloseSmall } from "@heathmont/moon-icons-tw";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

type Tokens = {
  name: string;
};

const tokens = [{ name: "USDC" }, { name: "USDT" }, { name: "DAI" }];

type Options = {
  value: string;
  label: string;
};

const sizes = [
  { value: "Small", label: "Small" },
  { value: "Medium", label: "Medium" },
  { value: "Large", label: "Large" },
];

const colors = [
  { value: "Red", label: "Red" },
  { value: "Blue", label: "Blue" },
  { value: "Green", label: "Green" },
];

const materials = [
  { value: "Leather", label: "Leather" },
  { value: "Silk", label: "Silk" },
  { value: "Cotton", label: "Cotton" },
  { value: "Wool", label: "Wool" },
];

const Main = () => {
  let [categories] = useState({
    Conditional: [
      {
        id: 1,
        title: "Does drinking coffee make you smarter?",
        date: "5h ago",
        commentCount: 5,
        shareCount: 2,
      },
      {
        id: 2,
        title: "So you've bought coffee... now what?",
        date: "2h ago",
        commentCount: 3,
        shareCount: 2,
      },
    ],
    Recurring: [
      {
        id: 1,
        title: "Is tech making coffee better or worse?",
        date: "Jan 7",
        commentCount: 29,
        shareCount: 16,
      },
      {
        id: 2,
        title: "The most innovative things happening in coffee",
        date: "Mar 19",
        commentCount: 24,
        shareCount: 12,
      },
    ],
  });
  let [types] = useState({
    Time: {
      id: 1,
      element: () => {
        const [fromToken, setFromToken] = useState<Tokens | null>(null);
        const [isOpen, setIsOpen] = useState(false);
        const [size, setSize] = useState<Options | null>(null);
        const [color, setColor] = useState<Options | null>(null);
        const [material, setMaterial] = useState<Options | null>(null);

        const closeModal = () => setIsOpen(false);
        const openModal = () => setIsOpen(true);

        return (
          <div className="flex w-full flex-col items-end justify-around gap-2 lg:flex-row">
            <div className="w-full">
              <Label htmlFor="c-1" className="text-piccolo">
                To Address
              </Label>
              <Input
                type="text"
                placeholder="Eg 0x16C85b054619b743c1dCb5B091c2b26B30E037eF"
                id="c-1"
                className="rounded bg-[#262229] text-white"
              />
              <div className="mt-4 grid grid-cols-2 gap-x-2">
                <div>
                  <Label htmlFor="c-1" className="text-piccolo">
                    Interval
                  </Label>
                  <Button
                    onClick={openModal}
                    className="bg-[#262229] font-normal"
                  >
                    Select Interval
                  </Button>
                  <Modal open={isOpen} onClose={closeModal}>
                    <Modal.Backdrop className="bg-black opacity-60" />
                    <Modal.Panel className="bg-[#282828] p-3">
                      <div className="border-beerus relative px-6 pb-4 pt-5">
                        <h3 className="text-moon-18 text-bulma font-medium">
                          Recurring Schedule
                        </h3>
                        <span
                          className="absolute right-5 top-4 inline-block h-8 w-8 cursor-pointer"
                          onClick={closeModal}
                        >
                          <ControlsCloseSmall className="block h-full w-full" />
                        </span>
                      </div>
                      <div className="flex flex-col gap-3 px-6 py-4">
                        <Dropdown value={size} onChange={setSize} size="xl">
                          {({ open }) => (
                            <>
                              <Dropdown.Select
                                open={open}
                                label="xLarge"
                                placeholder="Choose size..."
                                data-test="data-test"
                              >
                                {size?.label}
                              </Dropdown.Select>

                              <Dropdown.Options>
                                {sizes.map((size, index) => (
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
                        <Dropdown value={color} onChange={setColor} size="xl">
                          {({ open }) => (
                            <>
                              <Dropdown.Select
                                open={open}
                                label="xLarge"
                                placeholder="Choose color..."
                                data-test="data-test"
                              >
                                {color?.value}
                              </Dropdown.Select>

                              <Dropdown.Options>
                                {colors.map((color, index) => (
                                  <Dropdown.Option value={color} key={index}>
                                    {({ selected, active }) => (
                                      <MenuItem
                                        isActive={active}
                                        isSelected={selected}
                                      >
                                        {color.value}
                                      </MenuItem>
                                    )}
                                  </Dropdown.Option>
                                ))}
                              </Dropdown.Options>
                            </>
                          )}
                        </Dropdown>
                        <Dropdown
                          value={material}
                          onChange={setMaterial}
                          size="xl"
                        >
                          {({ open }) => (
                            <>
                              <Dropdown.Select
                                open={open}
                                label="xLarge"
                                placeholder="Choose material..."
                                data-test="data-test"
                              >
                                {material?.value}
                              </Dropdown.Select>

                              <Dropdown.Options>
                                {materials.map((material, index) => (
                                  <Dropdown.Option value={material} key={index}>
                                    {({ selected, active }) => (
                                      <MenuItem
                                        isActive={active}
                                        isSelected={selected}
                                      >
                                        {material.value}
                                      </MenuItem>
                                    )}
                                  </Dropdown.Option>
                                ))}
                              </Dropdown.Options>
                            </>
                          )}
                        </Dropdown>
                      </div>
                      <div className="flex justify-end gap-2 p-4 pt-2">
                        <Button variant="secondary" onClick={closeModal}>
                          Cancel
                        </Button>
                        <Button onClick={closeModal}>Create</Button>
                      </div>
                    </Modal.Panel>
                  </Modal>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-x-2">
                <Dropdown value={fromToken} onChange={setFromToken}>
                  {({ open }) => (
                    <>
                      <Dropdown.Select
                        open={open}
                        label="From Token"
                        placeholder="Choose a token"
                        className="bg-[#262229]"
                      >
                        {fromToken?.name}
                      </Dropdown.Select>
                      <Dropdown.Options className="z-[10] bg-[#262229]">
                        {tokens.map((token, index) => (
                          <Dropdown.Option value={token} key={index}>
                            {({ selected, active }) => {
                              return (
                                <MenuItem
                                  isActive={active}
                                  isSelected={selected}
                                >
                                  <MenuItem.Title>{token.name}</MenuItem.Title>
                                  <MenuItem.Radio isSelected={selected} />
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
                  <Label htmlFor="c-1" className="text-piccolo">
                    Amount
                  </Label>
                  <Input
                    type="numeric"
                    placeholder="69"
                    id="c-1"
                    className="rounded bg-[#262229] text-white"
                  />
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-x-2">
                <Dropdown value={fromToken} onChange={setFromToken}>
                  {({ open }) => (
                    <>
                      <Dropdown.Select
                        open={open}
                        label="To Chain"
                        placeholder="Choose a Chain"
                        className="bg-[#262229]"
                      >
                        {fromToken?.name}
                      </Dropdown.Select>
                      <Dropdown.Options className="z-10 bg-[#262229]">
                        {tokens.map((token, index) => (
                          <Dropdown.Option value={token} key={index}>
                            {({ selected, active }) => {
                              return (
                                <MenuItem
                                  isActive={active}
                                  isSelected={selected}
                                >
                                  <MenuItem.Title>{token.name}</MenuItem.Title>
                                  <MenuItem.Radio isSelected={selected} />
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
                        label="To Token"
                        placeholder="Choose a token"
                        className="bg-[#262229]"
                      >
                        {fromToken?.name}
                      </Dropdown.Select>
                      <Dropdown.Options className="z-[10] bg-[#262229]">
                        {tokens.map((token, index) => (
                          <Dropdown.Option value={token} key={index}>
                            {({ selected, active }) => {
                              return (
                                <MenuItem
                                  isActive={active}
                                  isSelected={selected}
                                >
                                  <MenuItem.Title>{token.name}</MenuItem.Title>
                                  <MenuItem.Radio isSelected={selected} />
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
      },
    },
    "Token Pair Price": {
      id: 1,
      element: () => {
        const [fromToken, setFromToken] = useState<Tokens | null>(null);
        const [isOpen, setIsOpen] = useState(false);
        const [size, setSize] = useState<Options | null>(null);
        const [color, setColor] = useState<Options | null>(null);
        const [material, setMaterial] = useState<Options | null>(null);

        const closeModal = () => setIsOpen(false);
        const openModal = () => setIsOpen(true);

        return (
          <div className="flex w-full flex-col items-end justify-around gap-2 lg:flex-row">
            <div className="w-full">
              <Label htmlFor="c-1" className="text-piccolo">
                To Address
              </Label>
              <Input
                type="text"
                placeholder="Eg 0x16C85b054619b743c1dCb5B091c2b26B30E037eF"
                id="c-1"
                className="rounded bg-[#262229] text-white"
              />
              <div className="mt-4 grid grid-cols-2 gap-x-2">
                <div>
                  <Label htmlFor="c-1" className="text-piccolo">
                    Interval
                  </Label>
                  <Button
                    onClick={openModal}
                    className="bg-[#262229] font-normal"
                  >
                    Select Interval
                  </Button>
                  <Modal open={isOpen} onClose={closeModal}>
                    <Modal.Backdrop className="bg-black opacity-60" />
                    <Modal.Panel className="bg-[#282828] p-3">
                      <div className="border-beerus relative px-6 pb-4 pt-5">
                        <h3 className="text-moon-18 text-bulma font-medium">
                          Recurring Schedule
                        </h3>
                        <span
                          className="absolute right-5 top-4 inline-block h-8 w-8 cursor-pointer"
                          onClick={closeModal}
                        >
                          <ControlsCloseSmall className="block h-full w-full" />
                        </span>
                      </div>
                      <div className="flex flex-col gap-3 px-6 py-4">
                        <Dropdown value={size} onChange={setSize} size="xl">
                          {({ open }) => (
                            <>
                              <Dropdown.Select
                                open={open}
                                label="xLarge"
                                placeholder="Choose size..."
                                data-test="data-test"
                              >
                                {size?.label}
                              </Dropdown.Select>

                              <Dropdown.Options>
                                {sizes.map((size, index) => (
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
                        <Dropdown value={color} onChange={setColor} size="xl">
                          {({ open }) => (
                            <>
                              <Dropdown.Select
                                open={open}
                                label="xLarge"
                                placeholder="Choose color..."
                                data-test="data-test"
                              >
                                {color?.value}
                              </Dropdown.Select>

                              <Dropdown.Options>
                                {colors.map((color, index) => (
                                  <Dropdown.Option value={color} key={index}>
                                    {({ selected, active }) => (
                                      <MenuItem
                                        isActive={active}
                                        isSelected={selected}
                                      >
                                        {color.value}
                                      </MenuItem>
                                    )}
                                  </Dropdown.Option>
                                ))}
                              </Dropdown.Options>
                            </>
                          )}
                        </Dropdown>
                        <Dropdown
                          value={material}
                          onChange={setMaterial}
                          size="xl"
                        >
                          {({ open }) => (
                            <>
                              <Dropdown.Select
                                open={open}
                                label="xLarge"
                                placeholder="Choose material..."
                                data-test="data-test"
                              >
                                {material?.value}
                              </Dropdown.Select>

                              <Dropdown.Options>
                                {materials.map((material, index) => (
                                  <Dropdown.Option value={material} key={index}>
                                    {({ selected, active }) => (
                                      <MenuItem
                                        isActive={active}
                                        isSelected={selected}
                                      >
                                        {material.value}
                                      </MenuItem>
                                    )}
                                  </Dropdown.Option>
                                ))}
                              </Dropdown.Options>
                            </>
                          )}
                        </Dropdown>
                      </div>
                      <div className="flex justify-end gap-2 p-4 pt-2">
                        <Button variant="secondary" onClick={closeModal}>
                          Cancel
                        </Button>
                        <Button onClick={closeModal}>Create</Button>
                      </div>
                    </Modal.Panel>
                  </Modal>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-x-2">
                <Dropdown value={fromToken} onChange={setFromToken}>
                  {({ open }) => (
                    <>
                      <Dropdown.Select
                        open={open}
                        label="From Token"
                        placeholder="Choose a token"
                        className="bg-[#262229]"
                      >
                        {fromToken?.name}
                      </Dropdown.Select>
                      <Dropdown.Options className="z-[10] bg-[#262229]">
                        {tokens.map((token, index) => (
                          <Dropdown.Option value={token} key={index}>
                            {({ selected, active }) => {
                              return (
                                <MenuItem
                                  isActive={active}
                                  isSelected={selected}
                                >
                                  <MenuItem.Title>{token.name}</MenuItem.Title>
                                  <MenuItem.Radio isSelected={selected} />
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
                  <Label htmlFor="c-1" className="text-piccolo">
                    Amount
                  </Label>
                  <Input
                    type="numeric"
                    placeholder="69"
                    id="c-1"
                    className="rounded bg-[#262229] text-white"
                  />
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-x-2">
                <Dropdown value={fromToken} onChange={setFromToken}>
                  {({ open }) => (
                    <>
                      <Dropdown.Select
                        open={open}
                        label="To Chain"
                        placeholder="Choose a Chain"
                        className="bg-[#262229]"
                      >
                        {fromToken?.name}
                      </Dropdown.Select>
                      <Dropdown.Options className="z-10 bg-[#262229]">
                        {tokens.map((token, index) => (
                          <Dropdown.Option value={token} key={index}>
                            {({ selected, active }) => {
                              return (
                                <MenuItem
                                  isActive={active}
                                  isSelected={selected}
                                >
                                  <MenuItem.Title>{token.name}</MenuItem.Title>
                                  <MenuItem.Radio isSelected={selected} />
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
                        label="To Token"
                        placeholder="Choose a token"
                        className="bg-[#262229]"
                      >
                        {fromToken?.name}
                      </Dropdown.Select>
                      <Dropdown.Options className="z-[10] bg-[#262229]">
                        {tokens.map((token, index) => (
                          <Dropdown.Option value={token} key={index}>
                            {({ selected, active }) => {
                              return (
                                <MenuItem
                                  isActive={active}
                                  isSelected={selected}
                                >
                                  <MenuItem.Title>{token.name}</MenuItem.Title>
                                  <MenuItem.Radio isSelected={selected} />
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
      },
    },
    "Gas Price Estimate": {
      element: () => {
        const [fromToken, setFromToken] = useState<Tokens | null>(null);
        const [isOpen, setIsOpen] = useState(false);
        const [size, setSize] = useState<Options | null>(null);
        const [color, setColor] = useState<Options | null>(null);
        const [material, setMaterial] = useState<Options | null>(null);

        const closeModal = () => setIsOpen(false);
        const openModal = () => setIsOpen(true);

        return (
          <div className="flex w-full flex-col items-end justify-around gap-2 lg:flex-row">
            <div className="w-full">
              <Label htmlFor="c-1" className="text-piccolo">
                To Address
              </Label>
              <Input
                type="text"
                placeholder="Eg 0x16C85b054619b743c1dCb5B091c2b26B30E037eF"
                id="c-1"
                className="rounded bg-[#262229] text-white"
              />
              <div className="mt-4 grid grid-cols-2 gap-x-2">
                <div>
                  <Label htmlFor="c-1" className="text-piccolo">
                    Interval
                  </Label>
                  <Button
                    onClick={openModal}
                    className="bg-[#262229] font-normal"
                  >
                    Select Interval
                  </Button>
                  <Modal open={isOpen} onClose={closeModal}>
                    <Modal.Backdrop className="bg-black opacity-60" />
                    <Modal.Panel className="bg-[#282828] p-3">
                      <div className="border-beerus relative px-6 pb-4 pt-5">
                        <h3 className="text-moon-18 text-bulma font-medium">
                          Recurring Schedule
                        </h3>
                        <span
                          className="absolute right-5 top-4 inline-block h-8 w-8 cursor-pointer"
                          onClick={closeModal}
                        >
                          <ControlsCloseSmall className="block h-full w-full" />
                        </span>
                      </div>
                      <div className="flex flex-col gap-3 px-6 py-4">
                        <Dropdown value={size} onChange={setSize} size="xl">
                          {({ open }) => (
                            <>
                              <Dropdown.Select
                                open={open}
                                label="xLarge"
                                placeholder="Choose size..."
                                data-test="data-test"
                              >
                                {size?.label}
                              </Dropdown.Select>

                              <Dropdown.Options>
                                {sizes.map((size, index) => (
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
                        <Dropdown value={color} onChange={setColor} size="xl">
                          {({ open }) => (
                            <>
                              <Dropdown.Select
                                open={open}
                                label="xLarge"
                                placeholder="Choose color..."
                                data-test="data-test"
                              >
                                {color?.value}
                              </Dropdown.Select>

                              <Dropdown.Options>
                                {colors.map((color, index) => (
                                  <Dropdown.Option value={color} key={index}>
                                    {({ selected, active }) => (
                                      <MenuItem
                                        isActive={active}
                                        isSelected={selected}
                                      >
                                        {color.value}
                                      </MenuItem>
                                    )}
                                  </Dropdown.Option>
                                ))}
                              </Dropdown.Options>
                            </>
                          )}
                        </Dropdown>
                        <Dropdown
                          value={material}
                          onChange={setMaterial}
                          size="xl"
                        >
                          {({ open }) => (
                            <>
                              <Dropdown.Select
                                open={open}
                                label="xLarge"
                                placeholder="Choose material..."
                                data-test="data-test"
                              >
                                {material?.value}
                              </Dropdown.Select>

                              <Dropdown.Options>
                                {materials.map((material, index) => (
                                  <Dropdown.Option value={material} key={index}>
                                    {({ selected, active }) => (
                                      <MenuItem
                                        isActive={active}
                                        isSelected={selected}
                                      >
                                        {material.value}
                                      </MenuItem>
                                    )}
                                  </Dropdown.Option>
                                ))}
                              </Dropdown.Options>
                            </>
                          )}
                        </Dropdown>
                      </div>
                      <div className="flex justify-end gap-2 p-4 pt-2">
                        <Button variant="secondary" onClick={closeModal}>
                          Cancel
                        </Button>
                        <Button onClick={closeModal}>Create</Button>
                      </div>
                    </Modal.Panel>
                  </Modal>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-x-2">
                <Dropdown value={fromToken} onChange={setFromToken}>
                  {({ open }) => (
                    <>
                      <Dropdown.Select
                        open={open}
                        label="From Token"
                        placeholder="Choose a token"
                        className="bg-[#262229]"
                      >
                        {fromToken?.name}
                      </Dropdown.Select>
                      <Dropdown.Options className="z-[10] bg-[#262229]">
                        {tokens.map((token, index) => (
                          <Dropdown.Option value={token} key={index}>
                            {({ selected, active }) => {
                              return (
                                <MenuItem
                                  isActive={active}
                                  isSelected={selected}
                                >
                                  <MenuItem.Title>{token.name}</MenuItem.Title>
                                  <MenuItem.Radio isSelected={selected} />
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
                  <Label htmlFor="c-1" className="text-piccolo">
                    Amount
                  </Label>
                  <Input
                    type="numeric"
                    placeholder="69"
                    id="c-1"
                    className="rounded bg-[#262229] text-white"
                  />
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-x-2">
                <Dropdown value={fromToken} onChange={setFromToken}>
                  {({ open }) => (
                    <>
                      <Dropdown.Select
                        open={open}
                        label="To Chain"
                        placeholder="Choose a Chain"
                        className="bg-[#262229]"
                      >
                        {fromToken?.name}
                      </Dropdown.Select>
                      <Dropdown.Options className="z-10 bg-[#262229]">
                        {tokens.map((token, index) => (
                          <Dropdown.Option value={token} key={index}>
                            {({ selected, active }) => {
                              return (
                                <MenuItem
                                  isActive={active}
                                  isSelected={selected}
                                >
                                  <MenuItem.Title>{token.name}</MenuItem.Title>
                                  <MenuItem.Radio isSelected={selected} />
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
                        label="To Token"
                        placeholder="Choose a token"
                        className="bg-[#262229]"
                      >
                        {fromToken?.name}
                      </Dropdown.Select>
                      <Dropdown.Options className="z-[10] bg-[#262229]">
                        {tokens.map((token, index) => (
                          <Dropdown.Option value={token} key={index}>
                            {({ selected, active }) => {
                              return (
                                <MenuItem
                                  isActive={active}
                                  isSelected={selected}
                                >
                                  <MenuItem.Title>{token.name}</MenuItem.Title>
                                  <MenuItem.Radio isSelected={selected} />
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
      },
    },
    "ABI Functions": {
      id: 1,
      element: () => {
        const [fromToken, setFromToken] = useState<Tokens | null>(null);
        const [isOpen, setIsOpen] = useState(false);
        const [size, setSize] = useState<Options | null>(null);
        const [color, setColor] = useState<Options | null>(null);
        const [material, setMaterial] = useState<Options | null>(null);

        const closeModal = () => setIsOpen(false);
        const openModal = () => setIsOpen(true);

        return (
          <div className="flex w-full flex-col items-end justify-around gap-2 lg:flex-row">
            <div className="w-full">
              <Label htmlFor="c-1" className="text-piccolo">
                To Address
              </Label>
              <Input
                type="text"
                placeholder="Eg 0x16C85b054619b743c1dCb5B091c2b26B30E037eF"
                id="c-1"
                className="rounded bg-[#262229] text-white"
              />
              <div className="mt-4 grid grid-cols-2 gap-x-2">
                <div>
                  <Label htmlFor="c-1" className="text-piccolo">
                    Interval
                  </Label>
                  <Button
                    onClick={openModal}
                    className="bg-[#262229] font-normal"
                  >
                    Select Interval
                  </Button>
                  <Modal open={isOpen} onClose={closeModal}>
                    <Modal.Backdrop className="bg-black opacity-60" />
                    <Modal.Panel className="bg-[#282828] p-3">
                      <div className="border-beerus relative px-6 pb-4 pt-5">
                        <h3 className="text-moon-18 text-bulma font-medium">
                          Recurring Schedule
                        </h3>
                        <span
                          className="absolute right-5 top-4 inline-block h-8 w-8 cursor-pointer"
                          onClick={closeModal}
                        >
                          <ControlsCloseSmall className="block h-full w-full" />
                        </span>
                      </div>
                      <div className="flex flex-col gap-3 px-6 py-4">
                        <Dropdown value={size} onChange={setSize} size="xl">
                          {({ open }) => (
                            <>
                              <Dropdown.Select
                                open={open}
                                label="xLarge"
                                placeholder="Choose size..."
                                data-test="data-test"
                              >
                                {size?.label}
                              </Dropdown.Select>

                              <Dropdown.Options>
                                {sizes.map((size, index) => (
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
                        <Dropdown value={color} onChange={setColor} size="xl">
                          {({ open }) => (
                            <>
                              <Dropdown.Select
                                open={open}
                                label="xLarge"
                                placeholder="Choose color..."
                                data-test="data-test"
                              >
                                {color?.value}
                              </Dropdown.Select>

                              <Dropdown.Options>
                                {colors.map((color, index) => (
                                  <Dropdown.Option value={color} key={index}>
                                    {({ selected, active }) => (
                                      <MenuItem
                                        isActive={active}
                                        isSelected={selected}
                                      >
                                        {color.value}
                                      </MenuItem>
                                    )}
                                  </Dropdown.Option>
                                ))}
                              </Dropdown.Options>
                            </>
                          )}
                        </Dropdown>
                        <Dropdown
                          value={material}
                          onChange={setMaterial}
                          size="xl"
                        >
                          {({ open }) => (
                            <>
                              <Dropdown.Select
                                open={open}
                                label="xLarge"
                                placeholder="Choose material..."
                                data-test="data-test"
                              >
                                {material?.value}
                              </Dropdown.Select>

                              <Dropdown.Options>
                                {materials.map((material, index) => (
                                  <Dropdown.Option value={material} key={index}>
                                    {({ selected, active }) => (
                                      <MenuItem
                                        isActive={active}
                                        isSelected={selected}
                                      >
                                        {material.value}
                                      </MenuItem>
                                    )}
                                  </Dropdown.Option>
                                ))}
                              </Dropdown.Options>
                            </>
                          )}
                        </Dropdown>
                      </div>
                      <div className="flex justify-end gap-2 p-4 pt-2">
                        <Button variant="secondary" onClick={closeModal}>
                          Cancel
                        </Button>
                        <Button onClick={closeModal}>Create</Button>
                      </div>
                    </Modal.Panel>
                  </Modal>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-x-2">
                <Dropdown value={fromToken} onChange={setFromToken}>
                  {({ open }) => (
                    <>
                      <Dropdown.Select
                        open={open}
                        label="From Token"
                        placeholder="Choose a token"
                        className="bg-[#262229]"
                      >
                        {fromToken?.name}
                      </Dropdown.Select>
                      <Dropdown.Options className="z-[10] bg-[#262229]">
                        {tokens.map((token, index) => (
                          <Dropdown.Option value={token} key={index}>
                            {({ selected, active }) => {
                              return (
                                <MenuItem
                                  isActive={active}
                                  isSelected={selected}
                                >
                                  <MenuItem.Title>{token.name}</MenuItem.Title>
                                  <MenuItem.Radio isSelected={selected} />
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
                  <Label htmlFor="c-1" className="text-piccolo">
                    Amount
                  </Label>
                  <Input
                    type="numeric"
                    placeholder="69"
                    id="c-1"
                    className="rounded bg-[#262229] text-white"
                  />
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-x-2">
                <Dropdown value={fromToken} onChange={setFromToken}>
                  {({ open }) => (
                    <>
                      <Dropdown.Select
                        open={open}
                        label="To Chain"
                        placeholder="Choose a Chain"
                        className="bg-[#262229]"
                      >
                        {fromToken?.name}
                      </Dropdown.Select>
                      <Dropdown.Options className="z-10 bg-[#262229]">
                        {tokens.map((token, index) => (
                          <Dropdown.Option value={token} key={index}>
                            {({ selected, active }) => {
                              return (
                                <MenuItem
                                  isActive={active}
                                  isSelected={selected}
                                >
                                  <MenuItem.Title>{token.name}</MenuItem.Title>
                                  <MenuItem.Radio isSelected={selected} />
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
                        label="To Token"
                        placeholder="Choose a token"
                        className="bg-[#262229]"
                      >
                        {fromToken?.name}
                      </Dropdown.Select>
                      <Dropdown.Options className="z-[10] bg-[#262229]">
                        {tokens.map((token, index) => (
                          <Dropdown.Option value={token} key={index}>
                            {({ selected, active }) => {
                              return (
                                <MenuItem
                                  isActive={active}
                                  isSelected={selected}
                                >
                                  <MenuItem.Title>{token.name}</MenuItem.Title>
                                  <MenuItem.Radio isSelected={selected} />
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
      },
    },
  });
  return (
    <div className="m-auto max-w-[67rem] px-10 py-8">
      <h3 className="text-[1.45rem] font-bold tracking-[0.5px]">
        The Fragments way of automating smart contracts
      </h3>

      <div className="w-full max-w-[16rem] px-2 py-8 sm:px-0">
        <Tab.Group>
          <Tab.List className="flex gap-[1px] space-x-1 rounded-xl bg-[#464646] p-[5px]">
            {Object.keys(categories).map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  classNames(
                    "w-full rounded-xl py-2.5 text-sm font-medium leading-5 text-white",
                    selected
                      ? "bg-[#11954F] shadow"
                      : "bg-[#2E2E2E] hover:bg-white/[0.12] hover:text-white"
                  )
                }
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
        </Tab.Group>
      </div>

      <div className="w-11/12 rounded-md bg-[#282828] p-5">
        <div className="w-full px-2 sm:px-0">
          <Tab.Group>
            <Tab.List className="flex max-w-[40rem] gap-[1px] space-x-1 rounded-xl bg-[#464646] p-[5px]">
              {Object.keys(types).map((category) => (
                <Tab
                  key={category}
                  className={({ selected }) =>
                    classNames(
                      "w-auto rounded-xl px-8 py-[0.5rem] text-sm font-medium leading-5 text-white",
                      selected
                        ? "bg-[#9101D4] shadow"
                        : "bg-[#2E2E2E] hover:bg-white/[0.12] hover:text-white"
                    )
                  }
                >
                  {category}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mt-6 bg-[#282828]">
              {Object.values(types).map((type, idx) => (
                <Tab.Panel
                  key={idx}
                  className={classNames("rounded-xl  bg-[#282828] p-3")}
                >
                  <ul>{type.element()}</ul>
                  <Button
                    size="md"
                    className=" mt-7 rounded-lg bg-[#1ae77a] text-black"
                  >
                    Confirm
                  </Button>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
};

export default Main;
