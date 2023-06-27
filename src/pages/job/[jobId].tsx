import { useRouter } from 'next/router';
import React from 'react';

import Task from '@/components/JobData';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

const Job = () => {
  const router = useRouter();
  const jobId = router.query.jobId;

  if (!jobId) {
    return (
      <Layout>
        <Seo />
        <div className='text-center'>Loading...</div>
      </Layout>
    );
  }
  return (
    <Layout>
      <Seo />
      <Task jobId={jobId as string} />
    </Layout>
  );
};

export default Job;
