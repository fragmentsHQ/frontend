import { Tab } from "@headlessui/react";
import { Dropdown, MenuItem } from "@heathmont/moon-core-tw";
import React, { useContext, useState } from "react";
import { useNetwork } from "wagmi";
import { TOKEN_ADDRESSES } from "../constants/constants";
import { SourceContext } from "../hooks/context";
import { AppModes, Category } from "../types/types";

import panels from "./Panels";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const categories: Array<Category> = ["One Time", "Recurring"];
const appModes: Array<AppModes> = ["Auto Pay", "xStream"];

const Main = () => {
  const { chain } = useNetwork();
  const [selectedCategory, setSelectedCategory] =
    useState<Category>("One Time");
  const { sourceData, setSourceData } = useContext(SourceContext);

  return (
    <div className="m-auto max-w-[67rem] px-10 py-8">
      <h3 className="text-[1.45rem] font-bold tracking-[0.5px]">
        The Fragments way of automating smart contracts
      </h3>
      <div className="w-full  px-2 pt-8 sm:px-0">
        <div className="rounded-md bg-[#282828] p-5">
          <div className="grid grid-cols-2 gap-x-2">
            <Dropdown
              disabled={true}
              value={sourceData.sourceChain}
              onChange={(e) => {
                setSourceData({ ...sourceData, sourceChain: e });
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
                    {chain?.name}
                  </Dropdown.Select>
                  <Dropdown.Options className="z-[10] rounded-lg bg-[#262229]">
                    {chain?.network
                      ? Object.keys(TOKEN_ADDRESSES[chain?.network]).map(
                          (token, index) => (
                            <Dropdown.Option value={token} key={index}>
                              {({ selected, active }) => {
                                return (
                                  <MenuItem
                                    isActive={active}
                                    isSelected={selected}
                                  >
                                    <MenuItem.Title>{token}</MenuItem.Title>
                                    <MenuItem.Radio isSelected={selected} />
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
              value={sourceData.sourceToken}
              onChange={(e) => {
                setSourceData({ ...sourceData, sourceToken: e });
              }}
            >
              {({ open }) => (
                <>
                  <Dropdown.Select
                    open={open}
                    label="From Token"
                    placeholder="Choose a token"
                    className="bg-[#262229]"
                  >
                    {sourceData.sourceToken}
                  </Dropdown.Select>
                  <Dropdown.Options className="z-[10] rounded-lg bg-[#262229]">
                    {chain?.network
                      ? Object.keys(TOKEN_ADDRESSES[chain?.network]).map(
                          (token, index) => (
                            <Dropdown.Option value={token} key={index}>
                              {({ selected, active }) => {
                                return (
                                  <MenuItem
                                    isActive={active}
                                    isSelected={selected}
                                  >
                                    <MenuItem.Title>{token}</MenuItem.Title>
                                    <MenuItem.Radio isSelected={selected} />
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
                setSourceData({ ...sourceData, appMode: appModes[idx] });
              }}
            >
              <Tab.List className="flex gap-[1px] space-x-1 rounded-xl bg-[#464646] p-[5px]">
                {appModes.map((mode) => (
                  <Tab
                    key={mode}
                    className={({ selected }) =>
                      classNames(
                        "w-full rounded-xl py-2.5 text-sm font-medium leading-5",
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
      <div className="py-5">
        <div className="w-fit rounded-xl bg-[#282828] px-5">
          <div className="w-full px-2 py-5 sm:px-0">
            <Tab.Group
              onChange={(idx) => {
                setSelectedCategory(categories[idx]);
              }}
            >
              <Tab.List className="flex w-[18rem] gap-[1px] space-x-1 rounded-xl bg-[#464646] p-[5px]">
                {categories.map((category) => (
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
        </div>
      </div>
      <div className="w-11/12 rounded-md">
        <div className="w-full px-2 sm:px-0">
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
                  <ul>{type.element(selectedCategory)}</ul>
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
