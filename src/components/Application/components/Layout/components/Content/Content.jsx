import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';

import compose from '@utils/compose';
import Loading from '@UI/Loading';

class Content extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
    layoutStore: PropTypes.object.isRequired
  };

  render() {
    const { children, layoutStore } = this.props;

    if (layoutStore.isLoading) {
      <main>
        <Loading />
      </main>;
    }

    return <main>{children}</main>;
  }
}

export default compose([inject('layoutStore')])(Content);
