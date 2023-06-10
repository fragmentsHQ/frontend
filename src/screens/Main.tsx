import { Tab } from "@headlessui/react";
import { Button, Dropdown, MenuItem } from "@heathmont/moon-core-tw";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNetwork } from "wagmi";
import {
  AUTOPAY_CONTRACT_ADDRESSES,
  TOKEN_ADDRESSES,
} from "../constants/constants";
import { SourceContext } from "../hooks/context";
import { AppModes, Category, GasModes } from "../types/types";
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
import { useCSVReader } from "react-papaparse";
import panels from "../components/Panels";
import { ArrowUpCircleIcon, CheckIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const headers = [
  {
    key: "toAddress",
    header: "To Address",
  },
  {
    key: "destinationChain",
    header: "Destination Chain",
  },
  {
    key: "destinationToken",
    header: "Destination Token",
  },
  {
    key: "amountOfSourceToken",
    header: "Amount of Source Token",
  },
];

const categories: Array<Category> = ["One Time", "Recurring"];
const appModes: Array<AppModes> = ["Auto Pay", "xStream"];
const gasModes: Array<GasModes> = ["Forward", "Gas Account"];

const Main = () => {
  const { chain } = useNetwork();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>();
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { sourceData, setSourceData } = useContext(SourceContext);
  const { CSVReader } = useCSVReader();
  const panelRef = useRef(null);
  const [dataRows, setDataRows] = useState<
    {
      id: string;
      toAddress: string;
      destinationToken: string;
      destinationChain: string;
      amountOfSourceToken: string;
    }[]
  >([
    {
      id: "0",
      toAddress: "",
      destinationToken: "",
      destinationChain: "",
      amountOfSourceToken: "",
    },
  ]);
  const [showThisSection, setShowThisSection] = useState<{
    0: boolean;
    1: boolean;
    2: boolean;
    3: boolean;
  }>({
    0: false,
    1: false,
    2: false,
    3: false,
  });

  useEffect(() => {
    if (
      dataRows[dataRows.length - 1]?.toAddress &&
      dataRows[dataRows.length - 1]?.destinationChain &&
      dataRows[dataRows.length - 1]?.destinationToken &&
      dataRows[dataRows.length - 1]?.amountOfSourceToken
    ) {
      setDataRows([
        ...dataRows,
        {
          id: String(dataRows.length),
          toAddress: "",
          destinationChain: "",
          destinationToken: "",
          amountOfSourceToken: "",
        },
      ]);
      setShowThisSection({
        ...showThisSection,
        3: true,
      });
    }
  }, [dataRows]);

  console.log("here: ", chain);
  return (
    <div className="m-auto max-w-[67rem] px-10 py-8">
      <h3 className="text-[1.45rem] font-bold tracking-[0.5px]">
        The Fragments way of automating smart contracts
      </h3>
      <div className="w-11/12  px-2 pt-8 sm:px-0">
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
                    {chain?.name && (
                      <div className="flex items-center gap-2">
                        <img
                          className="h-[1.2rem] w-[1.2rem] rounded-full"
                          src={`/logo/chains/${chain?.name}.png`}
                        />
                        {chain?.name}
                      </div>
                    )}
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
                setShowThisSection({
                  ...showThisSection,
                  0: true,
                });
                setSourceData({ ...sourceData, sourceToken: e });
              }}
            >
              {({ open }) => (
                <>
                  <Dropdown.Select
                    open={open}
                    label="From Token"
                    placeholder="Choose a token"
                    className=" bg-[#262229]"
                  >
                    {sourceData.sourceToken && (
                      <div className="flex items-center gap-2">
                        <img
                          className="h-[1.2rem] w-[1.2rem] rounded-full"
                          src={`/logo/tokens/${sourceData.sourceToken}.png`}
                        />
                        {sourceData.sourceToken}
                      </div>
                    )}
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
                                    <img
                                      className="h-[1.2rem] w-[1.2rem]"
                                      src={`/logo/tokens/${token}.png`}
                                    />
                                    <MenuItem.Title>{token}</MenuItem.Title>
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
                        "w-full rounded-xl py-2.5 text-sm font-bold leading-5",
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
      <div
        className={classNames(
          "py-5 transition-opacity",
          showThisSection[0] ? "opacity-100" : " opacity-0"
        )}
      >
        <div className="w-fit rounded-xl bg-[#282828] px-5">
          <div className="w-full px-2 py-5 sm:px-0">
            <Tab.Group>
              <Tab.List className="flex w-[18rem] gap-[1px] space-x-1 rounded-xl bg-[#464646] p-[5px]">
                {categories.map((category) => (
                  <Tab
                    key={category}
                    className={({ selected }) =>
                      classNames(
                        "w-full rounded-xl py-2.5 text-sm font-medium leading-5 text-white",
                        selectedCategory === category
                          ? "bg-[#11954F] shadow"
                          : "bg-[#2E2E2E] hover:bg-white/[0.12] hover:text-white"
                      )
                    }
                    onClick={() => {
                      setSelectedCategory(category);
                      setShowThisSection({
                        ...showThisSection,
                        1: true,
                      });
                    }}
                  >
                    {category}
                  </Tab>
                ))}
              </Tab.List>
            </Tab.Group>
          </div>
        </div>
      </div>
      <div
        className={classNames(
          "w-11/12 rounded-md transition-opacity",
          showThisSection[1] ? "opacity-100" : " opacity-0"
        )}
      >
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
                <ul>
                  {type.element(
                    selectedCategory,
                    showThisSection,
                    setShowThisSection,
                    dataRows,
                    panelRef
                  )}
                </ul>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
      <div
        className={classNames(
          "w-11/12 rounded-md  py-5 transition-opacity",
          showThisSection[2] ? "opacity-100" : " opacity-0"
        )}
      >
        <div className="rounded-xl bg-[#282828] p-5">
          <CSVReader
            onUploadAccepted={(results: any) => {
              setDataRows(
                results.data.slice(1).map((elem, idx) => {
                  return {
                    id: String(idx),
                    toAddress: elem[0],
                    destinationChain: elem[1],
                    destinationToken: elem[2],
                    amountOfSourceToken: elem[3],
                  };
                })
              );
            }}
          >
            {({ getRootProps, acceptedFile }: any) => (
              <>
                <div className="mb-4 flex items-center justify-end gap-4">
                  <div className="flex items-center gap-2 text-[#00FFA9]">
                    {(() => {
                      if (acceptedFile)
                        return (
                          <>
                            <CheckIcon width={"1.2rem"} color="#00FFA9" />
                            {acceptedFile?.name?.length > 10
                              ? acceptedFile.name
                                  .slice(0, 10)
                                  .concat("....")
                                  .concat(acceptedFile.name.slice(-7))
                              : acceptedFile.name}
                          </>
                        );
                    })()}
                  </div>
                  <Button
                    type="button"
                    {...getRootProps()}
                    className="rounded-md bg-[#464646] font-normal"
                    size="sm"
                  >
                    <span>.csv upload</span>
                    <ArrowUpCircleIcon width={"1.2rem"} />
                  </Button>
                  {/* <button {...getRemoveFileProps()} style={styles.remove}>
                    Remove
                  </button> */}
                </div>
                {/* <ProgressBar style={styles.progressBarBackgroundColor} /> */}
              </>
            )}
          </CSVReader>
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
                    {headers.map((header, idx) => (
                      <TableHeader {...getHeaderProps({ header })} key={idx}>
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
                            <TableCell key={cell.id}>
                              {cell.id.includes("toAddress") ? (
                                <input
                                  id={`input-${cell.id}`}
                                  type="text"
                                  value={cell.value}
                                  placeholder="0x0000.."
                                  className="h-8 w-full border-b border-solid border-gray-500 bg-transparent text-white outline-none"
                                  onChange={(e) => {
                                    setDataRows(
                                      dataRows.map((_, index) => {
                                        if (index === Number(row.id)) {
                                          return {
                                            ...dataRows[row.id],
                                            toAddress: e.target.value,
                                          };
                                        }
                                        return _;
                                      })
                                    );
                                  }}
                                />
                              ) : cell.id.includes("destinationToken") ? (
                                <Dropdown
                                  value={cell.value}
                                  onChange={(e) => {
                                    setDataRows(
                                      //@ts-ignore
                                      dataRows.map((_, index) => {
                                        if (index === Number(row.id)) {
                                          return {
                                            ...dataRows[row.id],
                                            destinationToken: e,
                                          };
                                        }
                                        return _;
                                      })
                                    );
                                  }}
                                >
                                  {({ open }) => (
                                    <>
                                      <Dropdown.Select
                                        open={open}
                                        placeholder={
                                          chain?.network
                                            ? dataRows[rowIdx].destinationChain
                                              ? "Choose a token"
                                              : "Select Chain first"
                                            : null
                                        }
                                        className="bg-transparent"
                                      >
                                        {cell.value && (
                                          <div className="flex items-center gap-2">
                                            <img
                                              className="h-[1.2rem] w-[1.2rem] rounded-full"
                                              src={`/logo/tokens/${cell.value}.png`}
                                            />
                                            {cell.value}
                                          </div>
                                        )}
                                      </Dropdown.Select>
                                      <Dropdown.Options className="z-[10] min-w-[106%] bg-[#262229]">
                                        {chain?.network
                                          ? dataRows[rowIdx].destinationChain
                                            ? TOKEN_ADDRESSES[
                                                dataRows[rowIdx]
                                                  .destinationChain
                                              ]
                                              ? Object.keys(
                                                  TOKEN_ADDRESSES[
                                                    dataRows[rowIdx]
                                                      .destinationChain
                                                  ]
                                                ).map((token, index) => (
                                                  <Dropdown.Option
                                                    value={token}
                                                    key={index}
                                                  >
                                                    {({ selected, active }) => {
                                                      return (
                                                        <MenuItem
                                                          isActive={active}
                                                          isSelected={selected}
                                                        >
                                                          <img
                                                            className="h-[1.2rem] w-[1.2rem] rounded-full"
                                                            src={`/logo/tokens/${token}.png`}
                                                          />
                                                          <MenuItem.Title>
                                                            {token}
                                                          </MenuItem.Title>
                                                        </MenuItem>
                                                      );
                                                    }}
                                                  </Dropdown.Option>
                                                ))
                                              : null
                                            : null
                                          : null}
                                      </Dropdown.Options>
                                    </>
                                  )}
                                </Dropdown>
                              ) : cell.id.includes("destinationChain") ? (
                                <Dropdown
                                  value={cell.value}
                                  className=" bg-transparent"
                                  onChange={(e) => {
                                    setDataRows(
                                      //@ts-ignore
                                      dataRows.map((_, index) => {
                                        if (index === Number(row.id)) {
                                          return {
                                            ...dataRows[row.id],
                                            destinationChain: e,
                                          };
                                        }
                                        return _;
                                      })
                                    );
                                  }}
                                >
                                  {({ open }) => (
                                    <>
                                      <Dropdown.Select
                                        open={open}
                                        // label="Start Time"
                                        placeholder="Select Chain"
                                        className=" bg-transparent"
                                      >
                                        {cell.value && (
                                          <div className="flex items-center gap-2">
                                            <img
                                              className="h-[1.2rem] w-[1.2rem] rounded-full"
                                              src={`/logo/chains/${cell.value}.png`}
                                            />
                                            {cell.value}
                                          </div>
                                        )}
                                      </Dropdown.Select>
                                      <Dropdown.Options className="z-10 min-w-[106%] bg-[#262229]">
                                        {chain
                                          ? Object.keys(
                                              AUTOPAY_CONTRACT_ADDRESSES[
                                                chain?.testnet
                                                  ? "testnets"
                                                  : "mainnets"
                                              ]
                                            ).map((chain, index) => (
                                              <Dropdown.Option
                                                value={chain}
                                                key={index}
                                              >
                                                {({ selected, active }) => {
                                                  return (
                                                    <MenuItem
                                                      isActive={active}
                                                      isSelected={selected}
                                                    >
                                                      <img
                                                        className="h-[1.2rem] w-[1.2rem] rounded-full"
                                                        src={`/logo/chains/${chain}.png`}
                                                      />
                                                      <MenuItem.Title>
                                                        {chain}
                                                      </MenuItem.Title>
                                                    </MenuItem>
                                                  );
                                                }}
                                              </Dropdown.Option>
                                            ))
                                          : null}
                                      </Dropdown.Options>
                                    </>
                                  )}
                                </Dropdown>
                              ) : cell.id.includes("amountOfSourceToken") ? (
                                <input
                                  id={`input-${cell.id}`}
                                  type="number"
                                  placeholder="0"
                                  value={cell.value}
                                  className="h-8 w-full bg-transparent text-white outline-none"
                                  onChange={(e) => {
                                    setDataRows(
                                      dataRows.map((_, index) => {
                                        if (index === Number(row.id)) {
                                          return {
                                            ...dataRows[row.id],
                                            amountOfSourceToken: e.target.value,
                                          };
                                        }
                                        return _;
                                      })
                                    );
                                  }}
                                />
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
      <div
        className={classNames(
          "w-11/12  px-2 transition-opacity sm:px-0",
          showThisSection[3] ? "opacity-100" : " opacity-0"
        )}
      >
        <div className="rounded-md bg-[#282828] p-5">
          <div className="m-auto pt-3 text-center">
            Choose how the task should be paid for. The cost of each execution
            equals the network fee.
          </div>
          <div className="grid grid-cols-1 gap-x-2 pt-8">
            <Tab.Group
              onChange={(idx) => {
                setSourceData({ ...sourceData, gasMode: gasModes[idx] });
              }}
            >
              <Tab.List className="flex gap-[1px] space-x-1 rounded-xl bg-[#464646] p-[5px]">
                {gasModes.map((mode) => (
                  <Tab
                    key={mode}
                    className={({ selected }) =>
                      classNames(
                        "w-full rounded-xl py-2.5 text-sm font-bold leading-5",
                        selected
                          ? "bg-[#00FFA9] text-black shadow"
                          : "bg-[#464646] text-[#6B6B6B]"
                      )
                    }
                    disabled={mode === "xStream"}
                  >
                    {mode === "Forward"
                      ? "Forward Paying Gas"
                      : "Pay from Gas Account"}
                  </Tab>
                ))}
              </Tab.List>
            </Tab.Group>
          </div>
          <Button
            size="sm"
            className="m-auto mt-16 h-12 w-[10rem] rounded-lg bg-[#2BFFB1] text-lg font-bold text-black"
            onClick={() => {
              panelRef.current.executeTxn();
            }}
          >
            {panelRef?.current?.hasEnoughAllowance() ? "Confirm" : "Approve"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Main;
