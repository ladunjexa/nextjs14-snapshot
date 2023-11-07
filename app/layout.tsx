import React from 'react';
import {Inter} from 'next/font/google';
import './globals.css';

import AuthProvider from '@/context/AuthContext';

import {Toaster} from '@/components/ui/toaster';

import Provider from '@/lib/react-query/Provider';

import type {Metadata} from 'next';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'SnapShot',
  description: 'SnapShot is a social media app for sharing photos',
  icons: {
    icon: '/assets/images/site-logo.png',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex h-screen">
          <Provider>
            <AuthProvider>{children}</AuthProvider>
          </Provider>
          <Toaster />
        </main>
      </body>
    </html>
  );
}
