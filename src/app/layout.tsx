'use client';
import './globals.css';
import { Toaster } from '../components/ui/sonner';
import { DataProvider } from './contexts/DataContext';
import { TimeProvider } from './contexts/TimeContext';
import { THEME_BOOT_SCRIPT } from '../lib/timeTheme';
import { SeasonPicker } from '../components/SeasonPicker';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // The boot script sets class/data-season before hydration, so React
    // must not warn about those attributes differing from the server HTML.
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }} />
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
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=VT323&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'Poppins', system-ui, -apple-system, sans-serif" }}>
        <TimeProvider>
          <DataProvider>
            {children}
            <Toaster position="bottom-right" />
          </DataProvider>
          <SeasonPicker />
        </TimeProvider>
      </body>
    </html>
  );
}
