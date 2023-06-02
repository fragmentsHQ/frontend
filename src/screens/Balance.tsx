import { Tab } from "@headlessui/react";
import { Button, Dropdown, MenuItem, Input } from "@heathmont/moon-core-tw";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";
import { useNetwork } from "wagmi";
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from "@carbon/react";
import { Pagination } from "carbon-components-react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const headers = [
  {
    key: "date",
    header: "Date",
  },
  {
    key: "txnHash",
    header: "Txn Hash",
  },
  {
    key: "status",
    header: "Status",
  },
  {
    key: "txnAmount",
    header: "Txn Amount",
  },
  {
    key: "gasPaid",
    header: "Gas Paid",
  },
];

const Balance = () => {
  const { chain } = useNetwork();
  const [selectedCategory, setSelectedCategory] = useState("Deposit");
  const [selectedTableCategory, setSelectedTableCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [dataRows, setDataRows] = useState([
    {
      id: "0",
      date: "May 27, 2023, 24:12",
      txnHash: "0x0F5D2........68908cC942",
      status: "Success",
      txnAmount: "0.00055 ETH",
      gasPaid: "0.00005 ETH ",
    },
  ]);

  const panels = {
    Deposit: (
      <div className="W-full grid grid-cols-4 gap-6">
        <Input
          placeholder="0.0"
          type="number"
          className="col-span-3 h-12 rounded-xl bg-[#464646]"
        />
        <Button className="col-span-1 h-12 rounded-xl bg-[#00A16B] font-semibold text-black">
          Deposit
        </Button>
      </div>
    ),
    Withdraw: (
      <div className="W-full grid grid-cols-4 gap-6">
        <div className="col-span-3 flex h-12 items-center justify-center rounded-xl bg-[#464646]">
          Your Balance to Withdraw is: $69.420
        </div>
        <Button className="col-span-1 h-12 rounded-xl bg-[#00A16B] font-semibold text-black">
          Withdraw
        </Button>
      </div>
    ),
  };

  return (
    <div className="m-auto max-w-[67rem] px-10 py-8">
      <button className="flex items-center gap-2 text-sm text-[#AFAEAE]">
        <ArrowLeftIcon className="w-4" />
        Back
      </button>
      <div className="mt-8 flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-end gap-6">
            <span className="text-3xl font-bold">$ 364.26</span>
            <span className="text-lg font-medium">0.20 ETH</span>
          </div>
          <div>
            <div className="text-[#AFAEAE]">Your account balance</div>
            <div className="text-[#AFAEAE]">
              Set low balance alerts (coming soon)
            </div>
          </div>
        </div>
        <div className="inline-flex items-center justify-center gap-2 rounded-xl border border-solid border-[#464646] px-4 py-2 font-medium">
          <img
            className="w-5 rounded-full"
            src={`/logo/chains/${chain?.network}.png`}
          />
          Ethereum
        </div>
      </div>
      <div className="mt-9">
        <Tab.Group>
          <Tab.List className="flex w-[13rem] gap-[1px] space-x-1 rounded-xl bg-[#464646] p-[5px]">
            {Object.keys(panels).map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  classNames(
                    "w-full rounded-xl py-2.5 text-sm font-medium leading-5 text-white",
                    selectedCategory === category
                      ? "bg-[#2E2E2E] shadow"
                      : " hover:bg-white/[0.12] hover:text-white"
                  )
                }
                onClick={() => {
                  setSelectedCategory(category);
                }}
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-6 ">
            {Object.values(panels).map((panel, idx) => (
              <Tab.Panel
                key={idx}
                // className={classNames("rounded-xl  bg-[#282828] p-5")}
              >
                {panel}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
      <div className="mt-[7rem]">
        <div className="flex items-center justify-between">
          <div className="text-3xl font-bold">History</div>
          <Tab.Group>
            <Tab.List className="flex w-[17rem] gap-[1px] space-x-1 rounded-xl bg-[#464646] p-[5px]">
              {["All", "Deposits", "Withdrawals"].map((category) => (
                <Tab
                  key={category}
                  className={({ selected }) =>
                    classNames(
                      "w-full rounded-xl px-4 py-2.5 text-sm font-medium leading-5 text-white",
                      selectedTableCategory === category
                        ? "bg-[#2E2E2E] shadow"
                        : " hover:bg-white/[0.12] hover:text-white"
                    )
                  }
                  onClick={() => {
                    setSelectedTableCategory(category);
                  }}
                >
                  {category}
                </Tab>
              ))}
            </Tab.List>
          </Tab.Group>
        </div>
        <div className="mt-4 bg-[#282828] p-5">
          <DataTable
            rows={dataRows.slice(
              (currentPage - 1) * pageSize,
              (currentPage - 1) * pageSize + pageSize
            )}
            headers={headers}
          >
            {({
              rows,
              headers,
              getTableProps,
              getHeaderProps,
              getRowProps,
            }) => (
              <Table className="overflow-visible" {...getTableProps()}>
                <TableHead align="center">
                  <TableRow>
                    {headers.map((header) => (
                      <TableHeader {...getHeaderProps({ header })}>
                        {header.header}
                      </TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, rowIdx) => (
                    <TableRow {...getRowProps({ row })} key={rowIdx}>
                      {(() => {
                        return row.cells.map((cell) => {
                          return (
                            <TableCell>
                              {cell.id.includes("date") ? (
                                <div className="text-[#AFAEAE]">
                                  {cell.value}
                                </div>
                              ) : cell.id.includes("txnHash") ? (
                                <div>{cell.value}</div>
                              ) : cell.id.includes("status") ? (
                                <div className="text-[#00FFA9]">
                                  {cell.value}
                                </div>
                              ) : cell.id.includes("txnAmount") ? (
                                <div>{cell.value}</div>
                              ) : cell.id.includes("gasPaid") ? (
                                <div>{cell.value}</div>
                              ) : null}
                            </TableCell>
                          );
                        });
                      })()}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </DataTable>
          <Pagination
            backwardText="Previous page"
            forwardText="Next page"
            itemsPerPageText="Items per page:"
            onChange={(e) => {
              setPageSize(e.pageSize);
              setCurrentPage(e.page);
            }}
            page={currentPage}
            pageSize={pageSize}
            pageSizes={[10, 20, 30, 40, 50]}
            totalItems={dataRows.length}
            // className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Balance;
