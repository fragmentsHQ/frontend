import React, { useContext, useEffect, useRef, useState } from "react";

import { Tab } from "@headlessui/react";
import { Button, Dropdown, MenuItem } from "@heathmont/moon-core-tw";
import { useNetwork } from "wagmi";
import { switchNetwork } from '@wagmi/core'

import TimePanel from "./TimePanel";
import ABIPanel from "./ABIPanel";
import GasPricePanel from "./GasPricePanel";
import PriceFeedPanel from "./PriceFeedPanel";

import { Category, Tokens } from "../../types/types";

const intervalTypes = [
    { value: "days", label: "days" },
    { value: "weeks", label: "weeks" },
    { value: "months", label: "months" },
    { value: "years", label: "years" },
];

const tokens = [{ name: "USDC" }, { name: "USDT" }, { name: "DAI" }];

interface ShowThisSection {
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
    dataRows: DataRows[];
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

const Panels = ({ selectedCategory, showThisSection, setShowThisSection, dataRows, }: Props) => {

    return (
        <Tab.Group>
            <div className="rounded-xl bg-[#282828] p-5">
                <Tab.List className="grid grid-cols-4 gap-[1px] space-x-1 rounded-xl bg-[#464646] p-[5px]">
                    {Object.keys(OPTIONS).map((panel) => {
                        if (OPTIONS[panel].category.includes(selectedCategory ?? "One Time"))
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
                {Object.values(OPTIONS).map((type, idx) => (
                    <Tab.Panel
                        key={idx}
                        className={classNames("rounded-xl  bg-[#282828] p-5")}
                    >
                        <ul>
                            {type.element(
                                selectedCategory ?? "One Time",
                                showThisSection,
                                setShowThisSection,
                                dataRows
                            )}
                        </ul>
                    </Tab.Panel>
                ))}
            </Tab.Panels>
        </Tab.Group>
    )
}

const OPTIONS: Options = {
    "Time": {
        id: 0,
        category: ["Recurring", "One Time"],
        element: (
            selectedCategory: Category | null,
            showThisSection: ShowThisSection,
            setShowThisSection: React.Dispatch<React.SetStateAction<ShowThisSection>>,
            dataRows: DataRows[],

        ) => {
            return (
                <TimePanel
                    selectedCategory={selectedCategory}
                    showThisSection={showThisSection}
                    setShowThisSection={setShowThisSection}
                    dataRows={dataRows}

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
    //         dataRows: DataRows[],

    //     ) => {
    //         return (
    //             <PriceFeedPanel
    //                 selectedCategory={selectedCategory}
    //                 showThisSection={showThisSection}
    //                 setShowThisSection={setShowThisSection}
    //                 dataRows={dataRows}

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
    //         dataRows: DataRows[],

    //     ) => {
    //         return (
    //             <GasPricePanel
    //                 selectedCategory={selectedCategory}
    //                 showThisSection={showThisSection}
    //                 setShowThisSection={setShowThisSection}
    //                 dataRows={dataRows}

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
    //         dataRows: DataRows[],

    //     ) => {
    //         return (
    //             <ABIPanel
    //                 selectedCategory={selectedCategory}
    //                 showThisSection={showThisSection}
    //                 setShowThisSection={setShowThisSection}
    //                 dataRows={dataRows}

    //             />
    //         );
    //     },
    // },
};

export default Panels


interface Options {
    [key: string]: {
        id: number;
        category: string[];
        element: (
            selectedCategory: Category,
            showThisSection: ShowThisSection,
            setShowThisSection: React.Dispatch<React.SetStateAction<ShowThisSection>>,
            dataRows: DataRows[]
        ) => JSX.Element;
    };
}