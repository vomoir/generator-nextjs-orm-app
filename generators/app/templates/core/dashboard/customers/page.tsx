import { lusitana } from '@/<%= srcPath %>/ui/fonts';
import { Suspense } from 'react';
import { fetchFilteredCustomers } from '@/<%= srcPath %>/lib/data';
import { Metadata } from 'next';
import CustomersTable from '@/<%= srcPath %>/ui/customers/table';
import { InvoicesTableSkeleton } from '@/<%= srcPath %>/ui/skeletons';
import Search from '@/<%= srcPath %>/ui/search';
import Pagination from '@/<%= srcPath %>/ui/invoices/pagination';

// Check out the Metadata object on layout.tsx
export const metadata: Metadata = {
  title: 'Customers',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Customers</h1>
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <CustomersTable query={query} currentPage={currentPage} />
      </Suspense>
    </div>
  );
}
