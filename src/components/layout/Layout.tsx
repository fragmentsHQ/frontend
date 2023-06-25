import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as React from 'react';

import AuthProvider from '@/components/AuthProvider';
import BgImages from '@/components/BgImages';
import Navbar from '@/components/Navbar';
import { Providers } from '@/components/Providers';
const darkTheme = createTheme({
  typography: {
    fontFamily: 'Inter, Roboto, sans-serif',
  },
  palette: {
    mode: 'dark',
  },
});
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import Seo from '../Seo';
export default function Layout({ children }: { children: React.ReactNode }) {
  // Put Header or Footer Here

  const apolloClient = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPH_URI,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={apolloClient}>
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
    </ApolloProvider>
  );
}
