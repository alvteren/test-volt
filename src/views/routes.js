import Home from '@views/Home';
import Customers from '@views/Customers';
import Products from '@views/Products';

import customers from '@api/customers';
import products from '@api/products';

export default [
  {
    name: 'home',
    path: '/',
    component: () => Home,
    title: 'Home page'
  },
  {
    name: 'customers',
    path: '/customers',
    component: () => Customers,
    title: 'Customer list',
    onActivate: customers.getAll
  },
  {
    name: 'products',
    path: '/products',
    component: () => Products,
    title: 'Product list',
    onActivate: products.getAll
  }
];
