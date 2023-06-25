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

interface Column {
  id: 'job_id' | 'owner' | 'total_fee_execution' | 'status';
  label: string;
  minWidth?: number;
  align?: 'right';
}

const columns: readonly Column[] = [
  { id: 'job_id', label: 'Job Id', minWidth: 170 },
  { id: 'owner', label: 'Owner', minWidth: 100 },
  {
    id: 'total_fee_execution',
    label: 'Total Fee & Executions',
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
  job_id: { address: string; date: string };
  owner: string;
  total_fee_execution: { total_fee: string; execution: string };
  status: 'ongoing' | 'completed' | 'failed';
}

const rows: Data[] = [
  {
    id: '1',
    job_id: {
      address: 'cscsc',
      date: 'scc',
    },
    owner: 'cscso',
    total_fee_execution: {
      total_fee: 'scsc',
      execution: 'sscs',
    },
    status: 'ongoing',
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
                          {column.id === 'owner' && (value as string)}
                          {column.id === 'job_id' && (
                            <div>
                              <span className='block'>
                                {(value as Data['job_id']).address}
                              </span>
                              <span
                                className='block
                              text-[#AFAEAE]'
                              >
                                {(value as Data['job_id']).date}
                              </span>
                            </div>
                          )}
                          {column.id === 'total_fee_execution' && (
                            <div>
                              <span className='block text-[#AFAEAE]'>
                                Total Fee :{' '}
                                <span className='text-white'>
                                  {
                                    (value as Data['total_fee_execution'])
                                      .total_fee
                                  }
                                </span>
                              </span>
                              <span
                                className='mt-1 block
                              text-[#AFAEAE]'
                              >
                                Execution :{' '}
                                <span className='text-white'>
                                  {
                                    (value as Data['total_fee_execution'])
                                      .execution
                                  }
                                </span>
                              </span>
                            </div>
                          )}
                          {column.id === 'status' && (
                            <span>{value as string}</span>
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
