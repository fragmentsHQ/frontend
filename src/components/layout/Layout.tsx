import * as React from 'react';

import AuthProvider from '@/components/AuthProvider';
import BgImages from '@/components/BgImages';
import Navbar from '@/components/Navbar';
import { Providers } from '@/components/Providers';

import Seo from '../Seo';
export default function Layout({ children }: { children: React.ReactNode }) {
  // Put Header or Footer Here
  return (
    <Providers>
      <AuthProvider>
        <Navbar />
        <Seo />
        <BgImages />
        {children}
      </AuthProvider>
    </Providers>
  );
}
