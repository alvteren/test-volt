import './Content.css';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';

import Loading from '@UI/Loading';

@inject('layoutStore')
class Content extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
    layoutStore: PropTypes.object.isRequired
  };

  render() {
    const { children, layoutStore } = this.props;

    if (layoutStore.isLoading) {
      <main className="content">
        <Loading />
      </main>;
    }

    return <main className="content">{children}</main>;
  }
}

export default Content;
