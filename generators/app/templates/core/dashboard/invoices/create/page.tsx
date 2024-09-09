import Form from '@/<%= srcPath %>/ui/invoices/create-form';
import Breadcrumbs from '@/<%= srcPath %>/ui/invoices/breadcrumbs';
import { fetchCustomers } from '@/<%= srcPath %>/lib/data';

export default async function Page() {
  const customers = await fetchCustomers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Create Invoice',
            href: '/dashboard/invoices/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}
