import Home from '@views/Home';
import Customers from '@views/Customers';

export default [
  {
    name: 'home',
    path: '/',
    component: () => Home,
    title: 'Home page'
    //onActivate: () => promise
  },
  {
    name: 'customers',
    path: '/customers',
    component: () => Customers,
    title: 'Customer list'
    //onActivate: () => promise
  }
];
