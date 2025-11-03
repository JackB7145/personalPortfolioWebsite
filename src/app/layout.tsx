import type { Metadata } from 'next';
import { Orbitron } from 'next/font/google';
import '../styles/globals.css';
import { Toaster } from '../components/ui/sonner';

const orbitron = Orbitron({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Jack Branston - Portfolio',
  description: 'Software Developer Portfolio - Dark Side Star Wars Theme',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={orbitron.className}>
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
