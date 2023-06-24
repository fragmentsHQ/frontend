import { useState } from "react";
import { Tab } from "@headlessui/react";
import Link from "next/link";
import { Pagination } from "carbon-components-react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs() {
  const [pageSize, setPageSize] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  let [categories] = useState({
    Ongoing: [
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
    Completed: [
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

  return (
    <div className="w-full  px-2  sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-2 max-w-md rounded-xl bg-[#464646] p-2">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-white",
                  "focus:outline-none focus:ring-0",
                  selected
                    ? "bg-[#2E2E2E] shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-4">
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames("rounded-xl bg-[#282828] py-6 px-6 w-full")}
            >
              <div className="w-full overflow-x-auto">
                <table className="w-full table-auto min-w-max">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 text-start ">
                        <div>
                          <span className="block text-[14px]">
                            Sender Address
                          </span>
                          <span className="block text-[14px] text-[#2E76FF]">
                            Destination Address
                          </span>
                          <span className="block text-[14px]">Token Sent</span>
                        </div>
                      </th>
                      <th className="py-2 px-4 text-start">
                        {" "}
                        <div>
                          <span className="block text-[14px]">
                            Receiver Address
                          </span>
                          <span className="block text-[14px] text-[#2E76FF]">
                            Destination Hash
                          </span>
                          <span className="block text-[14px]">
                            Token Received
                          </span>
                        </div>
                      </th>
                      <th className="py-2 px-4 text-start">
                        <span className="block text-[14px]">
                          Cost & Executions
                        </span>
                      </th>
                      <th className="py-2 px-4 text-start">
                        <span className="block text-[14px]">Status</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-4 px-4 border-b border-[#393939]">
                        <div>
                          <span className="block text-[14px]">
                            0xf8c929db...04f21d9b
                          </span>
                          <span className="block text-[14px] text-[#2E76FF]">
                            0xaf6...bb3aed120b513
                          </span>
                          <span className="block text-[14px]">USDC</span>
                          <span className="text-[#AFAEAE]">
                            May 27, 2023, 24:12
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 border-b border-[#393939]">
                        <span className="block text-[14px]">
                          0xf8c929db...04f21d9b
                        </span>
                        <span className="block text-[14px] text-[#2E76FF]">
                          0xaf6...bb3aed120b513
                        </span>
                        <span className="block text-[14px]">USDC</span>
                        <span className="text-[#AFAEAE]">
                          May 27, 2023, 24:12
                        </span>
                      </td>
                      <td className="py-4  px-4 border-b border-[#393939]">
                        <div className="flex flex-col items-start">
                          <span className="block text-[14px] text-[#AFAEAE]">
                            Cost : <span className="text-white">$241</span>
                          </span>
                          <span className="block text-[14px] text-[#AFAEAE]">
                            Execution : <span className="text-white">$241</span>
                          </span>
                        </div>
                      </td>
                      <td className="py-2 px-4 border-b border-[#393939]">
                        <Link
                          href={"/"}
                          className="block text-[14px] text-[#2E76FF]"
                        >
                          Ongoing
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <Pagination
                  backwardText="Previous page"
                  forwardText="Next page"
                  itemsPerPageText="Items per page:"
                  page={1}
                  pageNumberText="Page Number"
                  pageSize={10}
                  pageSizes={[10, 20, 30, 40, 50]}
                  totalItems={103}
                />
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
