import {
    Button,
    Dropdown,
    Input,
    Label,
    MenuItem,
    // Modal,
    Radio,
} from "@heathmont/moon-core-tw";

import { Dialog } from '@headlessui/react'
import Modal from "../../components/Modal"

import { ControlsCloseSmall } from "@heathmont/moon-icons-tw";
import { BigNumber, ethers } from "ethers";
import { parseUnits } from "ethers/lib/utils.js";
import React, {
    useContext,
    useEffect,
    useState,
    useImperativeHandle,
    forwardRef,
    useRef,
} from "react";
import {
    erc20ABI,
    useAccount,
    useContractRead,
    useNetwork,
    useSendTransaction,
} from "wagmi";
import * as chainList from "wagmi/chains";


import {
    CONNEXT_DOMAINS,
    AUTOPAY_CONTRACT_ADDRESSES,
    ERC20_CONTRACT,
    AUTOPAY_CONTRACT,
    TOKEN_ADDRESSES,
    ZERO_ADDRESS,
    CONDITIONAL_CONTRACT_ADDRESSES,
    CONDITIONAL_CONTRACT,
    TOKEN_ADDRESSES_PRICE_FEEDS,
} from "../../constants/constants";
import { AuthContext } from "../../app/providers/AuthProvider";
import { Category, Options, Tokens } from "../../types/types";

import useAutoPayContract from "../../hooks/useAutoPayContract";

type Props = {
    selectedCategory: Category | null;
    showThisSection: boolean;
    setShowThisSection: React.Dispatch<React.SetStateAction<boolean>>;
}


const TimePanel = (
    (
        { selectedCategory, showThisSection, setShowThisSection }: Props
    ) => {

        const autoPayHook = useAutoPayContract();
        const [isOpen, setIsOpen] = useState(false);

        const closeModal = () => setIsOpen(false);
        const openModal = () => setIsOpen(true);

        return (
            <>
                <div className="w-full flex-col">
                    <div className="grid w-full grid-cols-3 gap-3">
                        <div>
                            <Label htmlFor="c-1" className="text-piccolo">
                                Start Time
                            </Label>
                            <Input
                                type="number"
                                placeholder="E.g. 9234324712"
                                id="c-1"
                                className="rounded bg-[#262229] text-white"
                                value={autoPayHook.startTime}
                                onChange={(e) => {
                                    autoPayHook.setStartTime(e.target.value);
                                    setShowThisSection({
                                        ...showThisSection,
                                        2: true,
                                    });
                                }}
                            />

                            {/* <DatePicker
                                selected={startTime}
                                setSelected={setStartTime}
                                setShowThisSection={setShowThisSection}
                                showThisSection={showThisSection}
                            /> */}
                        </div>

                        {selectedCategory === "Recurring" && (
                            <>
                                <div>
                                    <Label htmlFor="c-1" className="text-piccolo">
                                        No. of Cycles
                                    </Label>
                                    <Input
                                        type="number"
                                        placeholder="1"
                                        id="c-1"
                                        className="rounded bg-[#262229] text-white"
                                        onChange={(e) => autoPayHook.setCycles(e.target.value)}
                                    />
                                </div>
                                <div className=" grid grid-cols-2 gap-x-2">
                                    <div>
                                        <Label htmlFor="c-1" className="text-piccolo">
                                            Interval
                                        </Label>
                                        <Button
                                            onClick={openModal}
                                            className="rounded-md bg-[#262229] font-normal"
                                        >
                                            Select Interval
                                        </Button>

                                        <Dialog open={isOpen} onClose={closeModal}>

                                            <div className="fixed inset-0 opacity-60 bg-black/30" aria-hidden="true" />
                                            <Dialog.Panel className="bg-[#282828] p-3 max-w-sm">
                                                <div className="border-beerus relative px-6 pb-4 pt-5">
                                                    <h3 className="text-moon-18 text-bulma font-medium">
                                                        Select Frequency
                                                    </h3>
                                                    <span
                                                        className="absolute right-5 top-4 inline-block h-8 w-8 cursor-pointer"
                                                        onClick={closeModal}
                                                    >
                                                        <ControlsCloseSmall className="block h-full w-full" />
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-5 items-center gap-3 px-6 py-4">
                                                    <span className="col-span-2 block text-[#AFAEAE]">
                                                        Repeat Every
                                                    </span>
                                                    <Input
                                                        type="text"
                                                        placeholder="1"
                                                        id="c-1"
                                                        className="col-span-1 rounded bg-[#262229] text-white"
                                                        value={autoPayHook.intervalCount}
                                                        onChange={(e) => autoPayHook.setIntervalCount(e.target.value)}
                                                    />
                                                    <Dropdown
                                                        value={autoPayHook.intervalType}
                                                        onChange={autoPayHook.setIntervalType}
                                                        size="xl"
                                                        className="col-span-2"
                                                    >
                                                        {({ open }) => (
                                                            <>
                                                                <Dropdown.Select
                                                                    open={open}
                                                                    data-test="data-test"
                                                                    className="bg-[#262229]"
                                                                >
                                                                    {autoPayHook.intervalType?.label}
                                                                </Dropdown.Select>

                                                                <Dropdown.Options className="z-[10] w-full min-w-full bg-[#262229]">
                                                                    {autoPayHook.intervalTypes.map((size, index) => (
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

                                                <div className="flex justify-end gap-2 p-4 pt-2">
                                                    <Button
                                                        className="rounded-md bg-[#262229]"
                                                        onClick={closeModal}
                                                    >
                                                        Ok
                                                    </Button>
                                                </div>
                                            </Dialog.Panel>
                                        </Dialog>


                                        <Modal>

                                        </Modal>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </>
        );
    }
);

export default TimePanel