import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import Header from './components/layout/header';

const outfit = Outfit({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Bookmarks',
  description: 'Store your bookmarks',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${outfit.className} leading-[1.5] antialiased dark:bg-stone-950 text-stone-800 dark:text-stone-300`}
      >
        <div className='max-w-2xl mx-auto'>
          <Header />
          <main className='p-4 md:px-8 md:py-6'>{children}</main>
        </div>
      </body>
    </html>
  );
}
