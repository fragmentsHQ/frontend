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
import { ImSpinner2 } from 'react-icons/im';
import { useAccount } from 'wagmi';

import clsxm from '@/lib/clsxm';

import UnstyledLink from '@/components/links/UnstyledLink';

import { useGetAllJobsQuery } from '@/graphql/alljobs.generated';

import {
  JobCreated_OrderBy,
  OrderDirection,
} from '../../graphql/alljobs.generated';

interface Column {
  id: 'job_id' | 'owner' | 'total_fee_execution' | 'status';
  label: string;
  minWidth?: number;
  maxWidth?: number;
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

export default function AllJobsTable() {
  const { address } = useAccount();
  const { data, loading } = useGetAllJobsQuery({
    variables: {
      where: {
        _taskCreator: address,
      },
      orderBy: JobCreated_OrderBy.BlockTimestamp,
      orderDirection: OrderDirection.Desc,
    },
  });
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
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

  const filteredData: Data[] = React.useMemo(() => {
    if (loading || !data) {
      return [];
    }
    const sortedData: Data[] = data.jobCreateds.map((job) => {
      return {
        id: job.id,
        job_id: { address: job._jobId, date: job._startTime },
        owner: job._taskCreator,
        status: 'ongoing',
        total_fee_execution: { execution: job._amount, total_fee: job._amount },
      };
    });
    return sortedData;
  }, [loading, data]);
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
                    maxWidth: 240,
                    overflow: 'hidden',
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
            {loading && (
              <TableRow>
                <TableCell colSpan={12}>
                  <div className='flex h-[300px] w-full w-full flex-col items-center justify-center'>
                    <ImSpinner2 className='animate-spin' size={20} />
                    <p className='mt-2'>Fetching Jobs.....</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
            {filteredData &&
              filteredData
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
                            {column.id === 'owner' && (
                              <div className='w-[200px] truncate'>
                                {value as string}
                              </div>
                            )}
                            {column.id === 'job_id' && (
                              <div className=''>
                                <span className='block w-[200px] truncate'>
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
                              <UnstyledLink
                                href='https://etherscan.io'
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                                className={clsxm(
                                  'block flex items-center justify-end',
                                  'capitalize',
                                  value === 'ongoing' && 'text-[#1867FD]',
                                  value === 'completed' && 'text-[#00C1A3]'
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
        rowsPerPageOptions={[2, 5]}
        component='div'
        style={{
          backgroundColor: '#282828',
        }}
        className='text-white'
        count={data?.jobCreateds.length || 30}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export const LinkIcon = () => {
  return (
    <svg
      width='18'
      height='18'
      viewBox='0 0 18 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M5.25 12.75L12.75 5.25'
        stroke='#AFAEAE'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M5.25 5.25H12.75V12.75'
        stroke='#AFAEAE'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  );
};
