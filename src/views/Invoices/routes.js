import invoices from '@api/invoices';
import customers from '@api/customers';

import List from './views/List';
import Form from './views/Form';

export default [
  {
    name: 'invoices',
    path: '/invoices',
    component: () => List,
    title: 'Invoice list',
    onActivate: async () => {
      const data = await invoices.getAll();

      if (data.length) {
        const customerIds = data.map(invoice => invoice.customer_id);
        const uniqueCustomerIds = [...new Set(customerIds)];
        const promises = uniqueCustomerIds.map(customerId => customers.getOne(customerId));

        return Promise.all(promises).then(customersData => {
          const customersAccum = customersData.reduce(
            (res, customer) => ({ ...res, [customer.id]: customer }),
            {}
          );

          return data.map(invoice => ({
            ...invoice,
            customer: customersAccum[invoice.customer_id]
          }));
        });
      } else {
        return [];
      }
    }
  },
  {
    name: 'invoices.edit',
    path: '/:id',
    component: () => Form,
    title: 'Invoice edit',
    onActivate: id => invoices.getOne(id)
  },
  {
    name: 'invoices.new',
    path: '/new',
    component: () => Form,
    title: 'New invoice'
  }
];
