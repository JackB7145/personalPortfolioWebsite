'use client';
import './globals.css';
import { Toaster } from '../components/ui/sonner';
import { DataProvider } from './contexts/DataContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/*
          Load Poppins via a standard stylesheet link instead of
          next/font/google. The next/font loader fetches/parses fonts at
          build time and crashes under Vercel's Node 24
          ("next/font: Cannot read properties of null (reading '1')"),
          so we avoid that code path entirely.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'Poppins', system-ui, -apple-system, sans-serif" }}>
        <DataProvider>
          {children}
          <Toaster position="bottom-right" />
        </DataProvider>
      </body>
    </html>
  );
}
