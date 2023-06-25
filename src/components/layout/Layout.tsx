import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as React from 'react';

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
    uri: 'https://api.studio.thegraph.com/proxy/18071/fragments/version/latest',
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={darkTheme}>
        <Providers>
          <Navbar />
          <Seo />
          <BgImages />
          {children}
        </Providers>
      </ThemeProvider>
    </ApolloProvider>
  );
}
