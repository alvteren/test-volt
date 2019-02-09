import invoicesApi from '@api/invoices';
import customersApi from '@api/customers';
import productsApi from '@api/products';
import invoiceItemsApi from '@api/invoice-items';

import List from './views/List';
import Form from './views/Form';

export default [
  {
    name: 'invoices',
    path: '/invoices',
    component: () => List,
    title: 'Invoice list',
    onActivate: async () => {
      const data = await invoicesApi.getAll();

      if (data.length) {
        const customerIds = data.map(invoice => invoice.customer_id);
        const uniqueCustomerIds = [...new Set(customerIds)];
        const promises = uniqueCustomerIds.map(customerId => customersApi.getOne(customerId));

        // так как с апи списка счетов приходит только customer_id, а нам нужно имя клиента
        // делаем запросы к апи клиентов. Promise.all тут годится только для тестового приложения
        // так как если клиентов будет сотни будет не найс, но на реальном проекте обычно апи другое
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
    onActivate: async ({ id }) => {
      // вобще по хорошему тут нужно на сервере джоинить данные и выдавать на апи
      // но так как я на "Вы" с бэкендом, не будем рисковать править его

      // Вначале получаем счет и все его товары
      const promises = [invoicesApi.getOne(id), invoiceItemsApi(id).getAll()];
      return Promise.all(promises).then(([invoice, invoiceItems]) => {
        const productIds = invoiceItems.map(_ => _.product_id);
        const uniqProductIds = [...new Set(productIds)];
        const promises = [customersApi.getOne(invoice.customer_id)];
        uniqProductIds.forEach(id => promises.push(productsApi.getOne(id)));

        // теперь мы знаем customer_id и все product_id в счете и можем получить детальную
        // инфу о клиенте и товарах
        return Promise.all(promises)
          .then(([customer, ...products]) => [
            products.reduce((acc, product) => ({ ...acc, [product.id]: product }), {}),
            customer
          ])
          .then(([productsData, customer]) => {
            const products = invoiceItems.map(({ id, product_id, quantity }) => {
              const product = productsData[product_id];
              const { price, name } = product;

              return {
                id,
                product_id,
                quantity,
                price,
                name
              };
            });

            return {
              ...invoice,
              customer,
              products
            };
          });
      });
    }
  },
  {
    name: 'invoices.new',
    path: '/new',
    component: () => Form,
    title: 'New invoice'
  }
];
