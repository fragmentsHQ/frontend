import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useRouter } from 'next/router';
import * as React from 'react';

import clsxm from '@/lib/clsxm';

import UnstyledLink from '@/components/links/UnstyledLink';
import { LinkIcon } from '@/components/tables/AllJobsTable';

interface Column {
  id: 'transaction_hash' | 'transaction' | 'destination_transaction' | 'status';
  label: string;
  minWidth?: number;
  align?: 'right';
}

const columns: readonly Column[] = [
  { id: 'transaction_hash', label: 'Source Transaction Hash', minWidth: 170 },
  { id: 'transaction', label: 'Source Transaction', minWidth: 100 },
  {
    id: 'destination_transaction',
    label: 'Destination Transaction',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 170,
    align: 'right',
  },
];

interface Data {
  id: string;
  transaction_hash: {
    address: string;
    date: string;
  };
  transaction: { token: string; chain: string };
  destination_transaction: { token: string; chain: string };
  status: 'ongoing' | 'success' | 'failed';
}

const rows: Data[] = [
  {
    id: '1',
    transaction_hash: {
      address: '0xf8c929db...04f21d9b',
      date: 'May 27, 2023, 24:12',
    },
    transaction: {
      token: '0.245 ETH',
      chain: 'Goerli',
    },
    destination_transaction: {
      token: '0.245 ETH',
      chain: 'Optimism',
    },
    status: 'success',
  },
];

export default function TransactionTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const router = useRouter();

  return (
    <Paper
      sx={{
        width: '100%',
        overflow: 'hidden',
        backgroundColor: '#282828',
        color: '#fff',
        fontFamily: 'Inter',
        boxShadow: 'none',
      }}
    >
      <TableContainer className='bg-transparent' sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    color: '#ffff',
                    borderColor: '#393939',
                    backgroundColor: '#464646',
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role='checkbox' tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          onClick={() => {
                            const path = '/job/' + row.id;
                            router.push(path);
                          }}
                          style={{
                            cursor: 'pointer',
                            color: '#fff',
                            backgroundColor: '#282828',
                            borderColor: '#393939',
                          }}
                        >
                          {column.id === 'transaction_hash' && (
                            <div>
                              <span className='block text-[#AFAEAE]'>
                                <span className='text-white'>
                                  {(value as Data['transaction_hash']).address}
                                </span>
                              </span>
                              <span
                                className='mt-1 block
                             text-[#AFAEAE]'
                              >
                                {(value as Data['transaction_hash']).date}
                              </span>
                            </div>
                          )}
                          {column.id === 'transaction' && (
                            <div>
                              <span className='block text-[#AFAEAE]'>
                                Token :{' '}
                                <span className='text-white'>
                                  {(value as Data['transaction']).token}
                                </span>
                              </span>
                              <span
                                className='mt-1 block
                             text-[#AFAEAE]'
                              >
                                Chain :{' '}
                                <span className='text-white'>
                                  {(value as Data['transaction']).chain}
                                </span>
                              </span>
                            </div>
                          )}
                          {column.id === 'destination_transaction' && (
                            <div>
                              <span className='block text-[#AFAEAE]'>
                                Token :{' '}
                                <span className='text-white'>
                                  {
                                    (value as Data['destination_transaction'])
                                      .token
                                  }
                                </span>
                              </span>
                              <span
                                className='mt-1 block
                              text-[#AFAEAE]'
                              >
                                Chain :{' '}
                                <span className='text-white'>
                                  {
                                    (value as Data['destination_transaction'])
                                      .chain
                                  }
                                </span>
                              </span>
                            </div>
                          )}
                          {column.id === 'status' && (
                            <UnstyledLink
                              href='https://etherscan.io'
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              className={clsxm(
                                'block flex items-center justify-end',
                                'capitalize',
                                value === 'ongoing' && 'text-[#1867FD]',
                                value === 'success' && 'text-[#00C1A3]'
                              )}
                            >
                              {value as string}
                              <LinkIcon />
                            </UnstyledLink>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[2, 5, 10]}
        component='div'
        style={{
          backgroundColor: '#282828',
        }}
        className='text-white'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
