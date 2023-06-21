"use client"

import './globals.scss'
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import "react-csv-importer/dist/index.css";

import SourceContextWrapper from "../hooks/context";
import Navbar from "../components/Navbar";
import BgImages from "../components/BgImages";

import { Providers } from './providers/WagmiProvider';
import AuthProvider from "../app/providers/AuthProvider";

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>

          <AuthProvider>
            <Navbar />
            {children}
            <BgImages />
            <Toaster
              position="top-center"
              reverseOrder={false}
              gutter={8}
              containerClassName=""
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
          </AuthProvider>

        </Providers>
      </body>
    </html>
  )
}
