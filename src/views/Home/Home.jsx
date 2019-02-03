import React, { Component } from 'react';
import { routeNode } from 'react-router5';

import compose from '@utils/compose';

class Home extends Component {
  render() {
    return <div>Home page</div>;
  }
}

export default compose([routeNode('home')])(Home);
