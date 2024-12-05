import './globals.css';
import { Providers } from './providers';

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="w-screen h-screen bg-transparent">
      <body className={`antialiased dark text-foreground `}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
