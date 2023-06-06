import { Tab } from "@headlessui/react";
import { Button, Dropdown, MenuItem, Input } from "@heathmont/moon-core-tw";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
} from "@heroicons/react/20/solid";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
import { useNavigate } from "react-router-dom"
import { ethers } from "ethers";
import { parseEther } from "ethers/lib/utils";

import {
  erc20ABI,
  useAccount,
  useNetwork,
  usePrepareSendTransaction,
  useSendTransaction
} from "wagmi";
import { getProvider, getAccount } from "@wagmi/core";
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
  TREASURY_CONTRACT_ADDRESSES,
  TREASURY_CONTRACT,
  ETH
} from "../constants/constants";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const headers = [
  {
    key: "sourceTxnHash",
    header: "Source Txn Hash",
  },
  {
    key: "sourceTxn",
    header: "Source Transaction",
  },
  {
    key: "destinationTxn",
    header: "Destination Transaction",
  },
  {
    key: "status",
    header: "Status",
  },
];

const Task = () => {


  const { jobId } = useParams();

  const navigate = useNavigate();

  const { chain } = useNetwork();
  // const { address } = getAccount();
  const { address } = useAccount();
  const provider = ethers.getDefaultProvider();

  const [selectedTableCategory, setSelectedTableCategory] =
    useState("Executions");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [dataRows, setDataRows] = useState([
    {
      id: "0",
      sourceTxnHash: {
        hash: "0xf8c929db...04f21d9b",
        date: "May 27, 2023, 24:12",
      },
      sourceTxn: { token: "0.0245 ETH", chain: "Arbitrum" },
      destinationTxn: { token: "0.0241 ETH", chain: "Optimism" },
      status: "success",
    },
  ]);

  const fetchPrevTransactions = async () => {
    try {
      const conditionalContract = CONDITIONAL_CONTRACT(chain, provider);
      const autoPaycontract = AUTOPAY_CONTRACT(chain, provider);

      let filter = conditionalContract.filters.JobCreated(null, address, null, null, null, null, null, null);

      let events = await conditionalContract.queryFilter(filter);

      console.log("*** DEBUG", events);

      let data = events.map((event) => {
        // const { token, amount } = event.args;

        return {
          id: event.args.taskId.toString(),
          sourceTxnHash: {
            hash: event.transactionHash,
            date: "May 27, 2023, 24:12",
          },
          sourceTxn: { token: "0.0245 ETH", chain: "Arbitrum" },
          destinationTxn: { token: "0.0241 ETH", chain: "Optimism" },
          status: "success",
        }
      });

      setDataRows(data);

      filter = autoPaycontract.filters.JobCreated(null, address, null, null, null, null, null, null);

      events = await conditionalContract.queryFilter(filter);

      console.log("*** DEBUG", events);

      data = events.map((event) => {
        // const { token, amount } = event.args;

        return {
          id: event.args.taskId.toString(),
          sourceTxnHash: {
            hash: event.transactionHash,
            date: "May 27, 2023, 24:12",
          },
          sourceTxn: { token: "0.0245 ETH", chain: "Arbitrum" },
          destinationTxn: { token: "0.0241 ETH", chain: "Optimism" },
          status: "success",
        }
      });

      setDataRows([...dataRows, data]);


    }
    catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (address) {
      fetchPrevTransactions();
    }
  }, [address])


  return (
    <div className="m-auto max-w-[67rem] px-10 py-8">
      <button className="flex items-center gap-2 text-sm text-[#AFAEAE]">
        <ArrowLeftIcon className="w-4" />
        Back
      </button>
      <div className="mt-8 flex flex-col">
        <div className="flex gap-2">
          <span>Created by: 0x0F5D2........68908cC942</span>
          <ArrowUpRightIcon className="w-4" />
          <span className="text-[#AFAEAE]">May 26, 2023, 08:02:43</span>
        </div>
        <div className="text-[#AFAEAE]">
          Task ID:
          0x1d029e6ac4127b4544bb07a8f12ffc33c668d5ddfad479def13d548cd72c4b
        </div>
      </div>
      <div className="mt-8 flex justify-between">
        <div className="flex justify-center gap-8">
          <div className="flex flex-col justify-center">
            <span className="text-2xl font-bold">$ 364.26</span>
            <span className="text-[#AFAEAE]">Cost</span>
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-2xl font-bold">2314</span>
            <span className="text-[#AFAEAE]">Executions</span>
          </div>
        </div>
        <div className="flex flex-col gap-[0.3rem] rounded-lg bg-[#282828] p-4">
          <span className="ml-auto text-2xl font-bold">$ 364.26</span>
          <span className="ml-auto text-[#AFAEAE]">Gas Paid</span>
          <span className="ml-auto rounded-[4.5rem] bg-[#393939] p-2 px-3 text-xs">
            Forward paying gas
          </span>
        </div>
      </div>
      <div className="mt-8 flex h-[18rem] w-full rounded-lg border border-solid border-[#AFAEAE] bg-gray-700">
        <div className="flex w-[48.5%] flex-col justify-between rounded-lg bg-[#282828] p-5">
          <div className="flex flex-col">
            <span className="text-[#AFAEAE]">Spender Address</span>
            <span className="flex gap-2">
              0x999802f3376725083A1970E838f7FA90f7c2b7CE{" "}
              <ArrowUpRightIcon className="w-4" />
            </span>
          </div>
          <div className="flex justify-start gap-[10rem]">
            <div className="flex flex-col">
              <span className="text-[#AFAEAE]">Token Sent</span>
              <span>USDC</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#AFAEAE]">Chain</span>
              <span>Arbitrum</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-[#AFAEAE]">Source Tx Hash</span>
            <span className="flex gap-2">
              0x999802f3376725083A1970E838f7FA90f7c2b7CE{" "}
              <ArrowUpRightIcon className="w-4" />
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[#AFAEAE]">TimeStamp</span>
            <span>01 Jun 2023 10:46:03 UTC</span>
          </div>
        </div>
        <div className="flex w-[3%] items-center justify-center bg-[#3c3c3c]">
          <ArrowRightIcon className="w-5" />
        </div>
        <div className="flex w-[48.5%] flex-col justify-between rounded-lg bg-black p-5">
          <div className="flex flex-col">
            <span className="text-[#AFAEAE]">Receiver Address</span>
            <span className="flex gap-2">
              0x999802f3376725083A1970E838f7FA90f7c2b7CE{" "}
              <ArrowUpRightIcon className="w-4" />
            </span>
          </div>
          <div className="flex justify-start gap-[10rem]">
            <div className="flex flex-col">
              <span className="text-[#AFAEAE]">Token Sent</span>
              <span>USDC</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#AFAEAE]">Chain</span>
              <span>Arbitrum</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-[#AFAEAE]">Destination Tx Hash</span>
            <span className="flex gap-2">
              0x999802f3376725083A1970E838f7FA90f7c2b7CE{" "}
              <ArrowUpRightIcon className="w-4" />
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[#AFAEAE]">TimeStamp</span>
            <span>01 Jun 2023 10:46:03 UTC</span>
          </div>
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-4 rounded-lg bg-[#282828] p-5 px-7">
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-[#AFAEAE]">Execute</span>
          <span className="rounded-xl bg-[#9101D4] px-5 py-2">Time</span>
        </div>
        <div className="flex items-center gap-7">
          <span className="text-lg font-semibold text-[#AFAEAE]">
            Destination Contract
          </span>
          <div className="flex">
            <span className="mr-2">0x0F5D2........68908cC942</span>
            <ArrowUpRightIcon className="w-5" />
          </div>
        </div>
        <div className="flex items-center gap-7">
          <span className="text-lg font-semibold text-[#AFAEAE]">
            Automated Contract
          </span>
          <div className="flex">
            <span className="mr-2">0x0F5D2........68908cC942</span>
            <ArrowUpRightIcon className="w-5" />
          </div>
        </div>
      </div>
      <div className="mt-14">
        <div className="flex items-center justify-start">
          <Tab.Group>
            <Tab.List className="flex w-[17rem] gap-[1px] space-x-1 rounded-xl bg-[#464646] p-[5px]">
              {["Executions", "Task Logs"].map((category) => (
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
                          console.log("ceval: ", cell.value);
                          return (
                            <TableCell>
                              {cell.id.includes("sourceTxnHash") ? (
                                <div className="flex flex-col gap-2 p-1 text-[#AFAEAE]">
                                  <span className="text-white">
                                    {cell.value.hash}
                                  </span>
                                  <span>{cell.value.date}</span>
                                </div>
                              ) : cell.id.includes("sourceTxn") ? (
                                <div className="flex flex-col gap-2 p-1 text-[#AFAEAE]">
                                  <div>
                                    <span>Token: </span>{" "}
                                    <span>{cell.value.token}</span>
                                  </div>
                                  <div>
                                    <span>Chain: </span>{" "}
                                    <span>{cell.value.chain}</span>
                                  </div>
                                </div>
                              ) : cell.id.includes("destinationTxn") ? (
                                <div className="flex flex-col gap-2 p-1 text-[#AFAEAE]">
                                  <div>
                                    <span>Token: </span>{" "}
                                    <span>{cell.value.token}</span>
                                  </div>
                                  <div>
                                    <span>Chain: </span>{" "}
                                    <span>{cell.value.chain}</span>
                                  </div>
                                </div>
                              ) : cell.id.includes("status") ? (
                                <div className="flex gap-2 text-green-400">
                                  {cell.value}{" "}
                                  <ArrowUpRightIcon className="w-4" />
                                </div>
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

export default Task;
