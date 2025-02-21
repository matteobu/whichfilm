'use client';
import './globals.css';
import MainHeader from '../components/headers/MainHeader';
import SecondMainHeader from '../components/headers/SecondMainHeader';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const isHomePage = pathname === '/';

  return (
    <html lang="en">
      <body>
        <MainHeader />
        {isHomePage && <SecondMainHeader />}
        {children}
      </body>
    </html>
  );
}
