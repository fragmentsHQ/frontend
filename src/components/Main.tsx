import { Tab } from "@headlessui/react";
import { Button } from "@heathmont/moon-core-tw";
import React, { useState } from "react";

import { Category } from "../types/types";

import panels from "./Panels";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const categories: Array<Category> = ["One Time", "Recurring"];

const Main = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<Category>("One Time");

  return (
    <div className="m-auto max-w-[67rem] px-10 py-8">
      <h3 className="text-[1.45rem] font-bold tracking-[0.5px]">
        The Fragments way of automating smart contracts
      </h3>

      <div className="w-full max-w-[16rem] px-2 py-8 sm:px-0">
        <Tab.Group
          onChange={(idx) => {
            setSelectedCategory(categories[idx]);
          }}
        >
          <Tab.List className="flex gap-[1px] space-x-1 rounded-xl bg-[#464646] p-[5px]">
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

      <div className="w-11/12 rounded-md bg-[#282828] p-5">
        <div className="w-full px-2 sm:px-0">
          <Tab.Group>
            <Tab.List className="flex w-fit gap-[1px] space-x-1 rounded-xl bg-[#464646] p-[5px]">
              {Object.keys(panels).map((panel) => {
                if (panels[panel].category.includes(selectedCategory))
                  return (
                    <Tab
                      key={panel}
                      className={({ selected }) =>
                        classNames(
                          "w-auto rounded-xl px-8 py-[0.5rem] text-sm font-medium leading-5 text-white",
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
            <Tab.Panels className="mt-6 bg-[#282828]">
              {Object.values(panels).map((type, idx) => (
                <Tab.Panel
                  key={idx}
                  className={classNames("rounded-xl  bg-[#282828] p-3")}
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
