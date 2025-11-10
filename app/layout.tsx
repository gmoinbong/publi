import type { Metadata } from 'next';
import { QueryProvider } from './providers/query-provider';
import './app.css';

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
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}

