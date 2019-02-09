import React, { Component } from 'react';
import { routeNode } from 'react-router5';

import Container from 'react-bootstrap/Container';
import Headline from '@UI/Headline';

@routeNode('home')
class Home extends Component {
  render() {
    return (
      <Container>
        <Headline title="Welcome to your own CRM" />
        <p>Use top menu for navigate by application</p>
      </Container>
    );
  }
}

export default Home;
