import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as React from 'react';

import AuthProvider from '@/components/AuthProvider';
import BgImages from '@/components/BgImages';
import Navbar from '@/components/Navbar';
import { Providers } from '@/components/Providers';
const darkTheme = createTheme({
  typography: {
    fontFamily: 'Inter',
  },
  palette: {
    mode: 'dark',
  },
});
import Seo from '../Seo';
export default function Layout({ children }: { children: React.ReactNode }) {
  // Put Header or Footer Here
  return (
    <ThemeProvider theme={darkTheme}>
      <Providers>
        <AuthProvider>
          <Navbar />
          <Seo />
          <BgImages />
          {children}
        </AuthProvider>
      </Providers>
    </ThemeProvider>
  );
}
