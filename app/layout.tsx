import './globals.css';
import MainHeader from '../components/main-header';

export const metadata = {
  title: 'Which Film Web App',
  description: 'An app to help you choose an independent film to watch.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
