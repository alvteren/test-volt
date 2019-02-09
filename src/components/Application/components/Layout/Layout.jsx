import 'normalize.css';

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { constants } from 'router5';
import { withRoute } from 'react-router5';

import { Provider, observer } from 'mobx-react';
import layoutStore from './stores/layout';

import Content from './components/Content';
import Header from './components/Header';

import NotFound from '@views/@Errors/NotFound';

@withRoute
@observer
class Layout extends Component {
  static propTypes = {
    router: PropTypes.object.isRequired,
    route: PropTypes.object
  };

  static defaultProps = {
    route: null
  };

  render() {
    const { route } = this.props;

    if (route === null) {
      return null;
    }

    if (route.name === constants.UNKNOWN_ROUTE) {
      return <NotFound />;
    }

    const Component = route.component;
    return (
      <Provider layoutStore={layoutStore}>
        <Fragment>
          <Header />
          <Content>
            <Component />
          </Content>
        </Fragment>
      </Provider>
    );
  }
}

export default Layout;
