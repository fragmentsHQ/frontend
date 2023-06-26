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
import { Toaster } from 'react-hot-toast';

import SourceContextWrapper from '@/hooks/context';

import Loader from '@/components/Loader';

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
          <SourceContextWrapper>
            <Navbar />
            <Seo />
            <BgImages />
            <Loader />
            <Toaster
              position='top-center'
              reverseOrder={false}
              gutter={8}
              containerClassName=''
              containerStyle={{}}
              toastOptions={{
                // Define default options
                className: '',
                duration: 5000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },

                // Default options for specific types
                success: {
                  duration: 3000,
                  // @ts-ignore
                  theme: {
                    primary: 'green',
                    secondary: 'black',
                  },
                },
              }}
            />
            {children}
          </SourceContextWrapper>
        </Providers>
      </ThemeProvider>
    </ApolloProvider>
  );
}
