import React, { Component } from 'react';
import { routeNode } from 'react-router5';

import compose from '@utils/compose';
import Container from 'react-bootstrap/Container';
import Headline from '@UI/Headline';

class Home extends Component {
  render() {
    return (
      <Container>
        <Headline title="Home page" />
      </Container>
    );
  }
}

export default compose([routeNode('home')])(Home);
