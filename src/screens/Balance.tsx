import { Tab } from "@headlessui/react";
import { Button, Dropdown, MenuItem, Input } from "@heathmont/moon-core-tw";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
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
import { ethers } from "ethers";
import { parseEther } from "ethers/lib/utils";

import {
  erc20ABI,
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

const getEclipsedText = (text) => {
  return text.slice(0, 6) + "....." + text.slice(text.length-6, text.length);
}

const Balance = () => {

  const navigate = useNavigate();

  const { chain } = useNetwork();
  const { address } = getAccount();
  const provider = getProvider();
  const [selectedCategory, setSelectedCategory] = useState("Deposit");
  const [selectedTableCategory, setSelectedTableCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [inputAmount, setInputAmount] = useState(0);
  const [balanceEth, setBalanceEth] = useState(0);
  const [balanceDollar, setBalanceDollar] = useState(0)


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

  const [callDataDeposit, setCallDataDeposit] = useState("");
  const [callDataWithdraw, setCallDataWithdraw] = useState("");

  const fetchPrevTransactions = async () => {
    try {
      const contract = TREASURY_CONTRACT(chain, provider);

      const filter = contract.filters.FundsDeposited(address, null, null);

      const events = await contract.queryFilter(filter);

      console.log("*** DEBUG",events);

      const rows = events.map((event) => {
        const { token, amount } = event.args;

        return {
          id: event.transactionHash,
          date: token.toLocaleString(),
          txnHash: event.transactionHash,
          status: "Success",
          txnAmount: `${amount.toString()} ETH`,
          gasPaid: "0.00005 ETH "
        };
      })

      setDataRows(rows)
    }
    catch (err) {
      console.error(err);
    }
  }

  const convertDollar = async (priceInETH: number) => {
    try {

      const amount = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd");
      const amountJson = await amount.json();
      const amountInDollar = amountJson.ethereum.usd;

      console.log(convertDollar);

      setBalanceDollar(priceInETH * amountInDollar);


    } catch (error) {
      console.error(error);
    }
  }

  const fetchBalance = async () => {
    try {
      const contract = TREASURY_CONTRACT(chain, provider);

      let checkBalance = await contract.userTokenBalance(address, ETH);

      let allowance = checkBalance.toString();
      console.log("***", allowance);

      setBalanceEth(allowance);
    } catch (err) {
      console.error(err);
    }
  };

  const { config: configWithdraw } = usePrepareSendTransaction({
    request: {
      to: chain
        ? TREASURY_CONTRACT_ADDRESSES[
        chain?.testnet ? "testnets" : "mainnets"
        ][chain?.network]
        : ZERO_ADDRESS,
      data: callDataDeposit,
    },
  });

  const { sendTransactionAsync: sendWithdrawTokenAsyncTxn } = useSendTransaction(configWithdraw);

  const { config: configDeposit } = usePrepareSendTransaction({
    request: {
      to: chain
        ? TREASURY_CONTRACT_ADDRESSES[
        chain?.testnet ? "testnets" : "mainnets"
        ][chain?.network]
        : ZERO_ADDRESS,
      data: callDataDeposit,
    },
  });

  const { sendTransactionAsync: sendDepositTokenAsyncTxn } = useSendTransaction(configDeposit);

  const handleUpdateDeposit = async () => {

    const TreasuryContract = TREASURY_CONTRACT(chain, provider);

    setCallDataDeposit(
      TreasuryContract.interface.encodeFunctionData("depositFunds", [
        address,
        ETH,
        parseEther(inputAmount.toString())
      ])
    );

  }

  const handleUpdateWithdraw = async () => {
    const TreasuryContract = TREASURY_CONTRACT(chain, provider);

    setCallDataWithdraw(
      TreasuryContract.interface.encodeFunctionData("withdrawFunds", [
        address,
        ETH,
        parseEther(inputAmount.toString())
      ])
    );
  }

  useEffect(() => {
    if (address) {
      handleUpdateDeposit();
      handleUpdateWithdraw();
    }
  }, [inputAmount])
  useEffect(() => {
    if (address) {
      fetchBalance();
      fetchPrevTransactions();
    }
  }, [address])

  const panels = {
    Deposit: (
      <div className="W-full grid grid-cols-4 gap-6">
        <Input
          placeholder="0.0"
          type="number"
          className="col-span-3 h-12 rounded-xl bg-[#464646]"
          onChange={(e) => {
            setInputAmount(Number(e.target.value));
          }}
          value={inputAmount}
        />
        <Button onClick={() => sendDepositTokenAsyncTxn?.()} className="col-span-1 h-12 rounded-xl bg-[#00A16B] font-semibold text-black">
          Deposit
        </Button>
      </div>
    ),
    Withdraw: (
      <div className="W-full grid grid-cols-4 gap-6">
        <div className="col-span-3 flex h-12 items-center justify-center rounded-xl bg-[#464646]">
          Your Balance to Withdraw is: $69.420
        </div>
        <Button onClick={() => sendWithdrawTokenAsyncTxn?.()} className="col-span-1 h-12 rounded-xl bg-[#00A16B] font-semibold text-black">
          Withdraw
        </Button>
      </div>
    ),
  };

  return (
    <div className="m-auto max-w-[67rem] px-10 py-8">
      <button onClick={() => navigate("/")} className="flex items-center gap-2 text-sm text-[#AFAEAE]">
        <ArrowLeftIcon className="w-4" />
        Back
      </button>
      <div className="mt-8 flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-end gap-6">
            <span className="text-3xl font-bold">$ {balanceDollar}</span>
            <span className="text-lg font-medium">{balanceEth} ETH</span>
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
                                  {getEclipsedText(cell.value)}
                                </div>
                              ) : cell.id.includes("txnHash") ? (
                                  <div>{getEclipsedText(cell.value)}</div>
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
