import {
  DataTable,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@carbon/react';
import { Button, Dropdown, MenuItem } from '@heathmont/moon-core-tw';
import { ArrowUpCircleIcon, CheckIcon } from '@heroicons/react/20/solid';
import { Pagination } from 'carbon-components-react';
import React from 'react';
import { useCSVReader } from 'react-papaparse';
import { useNetwork } from 'wagmi';

import {
  AUTOPAY_CONTRACT_ADDRESSES,
  TOKEN_ADDRESSES,
} from '../constants/constants';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

type Props = {
  dataRows: any;
  setDataRows: any;
  currentPage: number;
  setCurrentPage: any;
  pageSize: number;
  setPageSize: any;
};

const headers = [
  {
    key: 'toAddress',
    header: 'To Address',
  },
  {
    key: 'destinationChain',
    header: 'Destination Chain',
  },
  {
    key: 'destinationToken',
    header: 'Destination Token',
  },
  {
    key: 'amountOfSourceToken',
    header: 'Amount of Source Token',
  },
];

const CsvReader = ({
  dataRows,
  setDataRows,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
}: Props) => {
  const { CSVReader } = useCSVReader();
  const { chain } = useNetwork();
  return (
    <div className='rounded-xl bg-[#282828] p-5'>
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
            <div className='mb-4 flex items-center justify-end gap-4'>
              <div className='flex items-center gap-2 text-[#00FFA9]'>
                {(() => {
                  if (acceptedFile)
                    return (
                      <>
                        <CheckIcon width='1.2rem' color='#00FFA9' />
                        {acceptedFile?.name?.length > 10
                          ? acceptedFile.name
                              .slice(0, 10)
                              .concat('....')
                              .concat(acceptedFile.name.slice(-7))
                          : acceptedFile.name}
                      </>
                    );
                })()}
              </div>
              <Button
                type='button'
                {...getRootProps()}
                className='rounded-md bg-[#464646] font-normal'
                size='sm'
              >
                <span>.csv upload</span>
                <ArrowUpCircleIcon width='1.2rem' />
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
        {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
          <Table className='overflow-visible' {...getTableProps()}>
            <TableHead align='center'>
              <TableRow>
                {headers.map((header: any) => (
                  <TableHeader key={header} {...getHeaderProps({ header })}>
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
                        <TableCell key={cell}>
                          {cell.id.includes('toAddress') ? (
                            <input
                              id={`input-${cell.id}`}
                              type='text'
                              value={cell.value}
                              placeholder='0x0000..'
                              className='h-8 w-full border-b border-solid border-gray-500 bg-transparent text-white outline-none'
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
                          ) : cell.id.includes('destinationToken') ? (
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
                                          ? 'Choose a token'
                                          : 'Select Chain first'
                                        : null
                                    }
                                    className='bg-transparent'
                                  >
                                    {cell.value && (
                                      <div className='flex items-center gap-2'>
                                        <img
                                          className='h-[1.2rem] w-[1.2rem] rounded-full'
                                          src={`/logo/tokens/${cell.value}.png`}
                                        />
                                        {cell.value}
                                      </div>
                                    )}
                                  </Dropdown.Select>
                                  <Dropdown.Options className='z-[10] min-w-[106%] bg-[#262229]'>
                                    {chain?.network
                                      ? dataRows[rowIdx].destinationChain
                                        ? TOKEN_ADDRESSES[
                                            dataRows[rowIdx].destinationChain
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
                                                        className='h-[1.2rem] w-[1.2rem] rounded-full'
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
                          ) : cell.id.includes('destinationChain') ? (
                            <Dropdown
                              value={cell.value}
                              className=' bg-transparent'
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
                                    placeholder='Select Chain'
                                    className=' bg-transparent'
                                  >
                                    {cell.value && (
                                      <div className='flex items-center gap-2'>
                                        <img
                                          className='h-[1.2rem] w-[1.2rem] rounded-full'
                                          src={`/logo/chains/${cell.value}.png`}
                                        />
                                        {cell.value}
                                      </div>
                                    )}
                                  </Dropdown.Select>
                                  <Dropdown.Options className='z-10 min-w-[106%] bg-[#262229]'>
                                    {chain
                                      ? Object.keys(
                                          AUTOPAY_CONTRACT_ADDRESSES[
                                            chain?.testnet
                                              ? 'testnets'
                                              : 'mainnets'
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
                                                    className='h-[1.2rem] w-[1.2rem] rounded-full'
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
                          ) : cell.id.includes('amountOfSourceToken') ? (
                            <input
                              id={`input-${cell.id}`}
                              type='number'
                              placeholder='0'
                              value={cell.value}
                              className='h-8 w-full bg-transparent text-white outline-none'
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
        backwardText='Previous page'
        forwardText='Next page'
        itemsPerPageText='Items per page:'
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
  );
};

export default CsvReader;
