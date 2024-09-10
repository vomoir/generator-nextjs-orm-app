import '@/<%= srcPath %>/ui/global.css';
import { inter } from '@/<%= srcPath %>/ui/fonts';
import { Metadata } from 'next';

// This is the root layout.
// Any UI you add to the root layout will be shared across all pages in your application. 
// You can use the root layout to modify your <html> and <body> tags, and add metadata. 

export const metadata: Metadata = {
  title: { template: '%s | <%= appTitle %> Dashboard', default: 'Acme Dashboard' },
  description: 'The official Next.js Course Dashboard, built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
