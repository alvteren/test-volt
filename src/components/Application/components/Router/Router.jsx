import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { RouterProvider } from 'react-router5';
import { createRouter } from './router';
import routes from '@views/routes';
const router = createRouter(routes);

export default class Router extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  render() {
    const { children } = this.props;
    return <RouterProvider router={router}>{children}</RouterProvider>;
  }
}
