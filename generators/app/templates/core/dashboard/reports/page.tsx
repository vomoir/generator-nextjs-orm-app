'use client';
import dynamic from 'next/dynamic';

const PDFViewer = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => <p>Prognosticating...</p>,
  },
);
// import { PDFViewer } from '@react-pdf/renderer';
import { lusitana } from '@/<%= srcPath %>/ui/fonts';
import MyDocument from '@/<%= srcPath %>/ui/reports/report';

// Check out the Metadata object on layout.tsx
//  NOTE: You are attempting to export "metadata" from a component marked with "use client", which is disallowed
// export const metadata: Metadata = {
//   title: 'Reports',
// };

export default function Page() {
  return (
    <div className="h-full w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Reports</h1>
      </div>
      {/* await renderToFile(
      <MyDocument />, `./my-doc.pdf`); */}
      <PDFViewer width="80%" height="80%" showToolbar>
        <MyDocument />
      </PDFViewer>
    </div>
  );
}
