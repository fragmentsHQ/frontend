import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';

import clsxm from '@/lib/clsxm';

import ChainMenu, { TokenMenu } from '@/components/menu/ChainMenu';

interface Column {
  id:
    | 'to_address'
    | 'destination_token'
    | 'destination_chain'
    | 'amount_of_source_token';
  label: string;
  minWidth?: number;
  align?: 'right';
}

const columns: readonly Column[] = [
  { id: 'to_address', label: 'To Address', minWidth: 170 },
  { id: 'destination_token', label: 'Destination Token', minWidth: 100 },
  {
    id: 'destination_chain',
    label: 'Destination chain',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'amount_of_source_token',
    label: 'Amount of source token',
    minWidth: 170,
    align: 'right',
  },
];

interface Data {
  id: string;
  to_address: string;
  destination_token: string;
  destination_chain: string;
  amount_of_source_token: string;
}

const rows: Data[] = [
  {
    id: '1',
    to_address: '0x0F5D2........68908cC942',
    destination_token: 'USDC',
    amount_of_source_token: '303',
    destination_chain: 'Polygon',
  },
  {
    id: '2',
    to_address: '0x0F5D2........68908cC942',
    destination_token: 'USDC',
    amount_of_source_token: '303',
    destination_chain: 'Polygon',
  },
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [enteredRows, setEnteredRows] = React.useState(rows);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper
      sx={{
        width: '100%',
        overflow: 'hidden',
        backgroundColor: '#282828',
        color: '#fff',
        marginTop: '40px',
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
            {enteredRows
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
                          style={{
                            color: '#fff',
                            backgroundColor: '#282828',
                            borderColor: '#393939',
                          }}
                        >
                          {column.id === 'destination_chain' && (
                            <ChainMenu title={value as string} />
                          )}
                          {column.id === 'destination_token' && (
                            <TokenMenu title={value as string} />
                          )}
                          {column.id === 'to_address' && (
                            <TokenInput
                              value={value as string}
                              onChange={(e) => {
                                const newdata = enteredRows.map((er) => {
                                  return er.id === row.id
                                    ? {
                                        ...er,
                                        to_address: e.target.value,
                                      }
                                    : er;
                                });
                                setEnteredRows(newdata);
                              }}
                            />
                          )}
                          {column.id === 'amount_of_source_token' && (
                            <TokenInput
                              value={value as string}
                              onChange={(e) => {
                                const newdata = enteredRows.map((er) => {
                                  return er.id === row.id
                                    ? {
                                        ...er,
                                        amount_of_source_token: e.target.value,
                                      }
                                    : er;
                                });
                                setEnteredRows(newdata);
                              }}
                            />
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

const TokenInput: React.FC<React.ComponentPropsWithoutRef<'input'>> = ({
  className,
  ...rest
}) => {
  return (
    <input
      className={clsxm(
        'truncate rounded-sm border border-transparent bg-transparent px-3 py-2 text-end font-medium focus:border focus:border-white focus:outline-none',
        className
      )}
      {...rest}
    />
  );
};
