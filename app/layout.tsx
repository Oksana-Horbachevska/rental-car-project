import type { Metadata } from 'next';
import { manrope } from './fonts';
import 'modern-normalize';
import './globals.css';
import Header from '@/components/Header/Header';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

export const metadata: Metadata = {
  title: 'RentalCar',
  description: 'A platform for searching and booking rental cars',
  icons: {
    icon: '/Vector.svg',
  },
  openGraph: {
    title: 'RentalCar',
    description: 'A platform for searching and booking rental cars',
    url: 'https://localhost:3000',
    images: [
      {
        url: '', // placeholder
        width: 1200,
        height: 630,
        alt: 'RentalCar - A platform for searching and booking rental cars',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={manrope.variable}>
        <TanStackProvider>
          <Header />
          <main>{children}</main>
        </TanStackProvider>
      </body>
    </html>
  );
}
