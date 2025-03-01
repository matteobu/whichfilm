import './globals.css';
import MainHeader from '../components/headers/MainHeader';
import Footer from '../components/Footer';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <MainHeader />
        {children}
        <Footer />
      </body>
    </html>
  );
}
