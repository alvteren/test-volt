import Home from '@views/Home';
import Customers from '@views/Customers';

import customers from '@api/customers';

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
  }
];
