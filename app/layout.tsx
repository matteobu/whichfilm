import { Analytics } from '@vercel/analytics/react';
import './globals.css';
import MainHeader from '../components/headers/MainHeader';
import Footer from '../components/Footer';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <MainHeader />
        {children}
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
