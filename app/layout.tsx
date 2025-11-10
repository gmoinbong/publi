import type { Metadata } from 'next';
import { Bakbak_One, Open_Sans } from 'next/font/google';
import { QueryProvider } from './providers/query-provider';
import './app.css';

const bakbakOne = Bakbak_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bakbak-one',
  display: 'swap',
});

const openSans = Open_Sans({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'PubliPack',
  description: 'PubliPack Application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bakbakOne.variable} ${openSans.variable} font-sans`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}

