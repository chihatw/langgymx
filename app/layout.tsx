import Header from '@/components/header';
import { SessionProvider } from 'next-auth/react';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='grid min-h-screen grid-rows-[48px,1fr] bg-slate-200 font-sans text-gray-700 mb-20'>
        <SessionProvider>
          <Header />
          <div>{children}</div>
        </SessionProvider>
      </body>
    </html>
  );
}
