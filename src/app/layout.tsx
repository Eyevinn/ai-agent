import './globals.css';
import { Providers } from './providers';

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-transparent">
      <body className="">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
