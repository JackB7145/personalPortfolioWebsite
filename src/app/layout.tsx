'use client';
import { Orbitron } from 'next/font/google';
import './globals.css';
import { Toaster } from '../components/ui/sonner';
import { DataProvider } from './contexts/DataContext'; 

import { Poppins } from 'next/font/google';
import { Rubik } from 'next/font/google';
import { Space_Grotesk } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-space-grotesk',
});

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-rubik',
});




export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <DataProvider>
          {children}
          <Toaster position="bottom-right" />
        </DataProvider>
      </body>
    </html>
  );
}
