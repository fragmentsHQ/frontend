import { useRouter } from 'next/router';
import React from 'react';

import Layout from '@/components/layout/Layout';
import Tabs from '@/components/tabs';

const Jobs = () => {
  return (
    <Layout>
      <div className='mx-auto  my-10 max-w-5xl'>
        <GoBackLink />
        <h3 className='mb-6 mt-8 text-[1.45rem] font-bold tracking-[0.5px]'>
          All Jobs
        </h3>
        <Tabs />
      </div>
    </Layout>
  );
};

export default Jobs;

export const GoBackLink = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        router.back();
      }}
    >
      <div className='flex cursor-pointer items-center gap-2 text-sm text-white'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-6 w-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18'
          />
        </svg>
        <p>Go back</p>
      </div>
    </button>
  );
};
