import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { routeNode } from 'react-router5';

import Headline from '@UI/Headline';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import Table from './components/Table';
import FormView from './components/Form';

import compose from '@utils/compose';

class Customers extends PureComponent {
  static propTypes = {
    data: PropTypes.array.isRequired
  };
  static defaultProps = {};

  state = { showForm: false };

  openForm = () => {
    this.setState({ showForm: true });
  };

  closeForm = () => {
    this.setState({ showForm: false });
  };

  render() {
    const { showForm } = this.state;

    return (
      <Container>
        <Headline
          title="Customer list"
          actionComponent={props => (
            <Button variant="outline-dark" onClick={this.openForm} {...props}>
              Create
            </Button>
          )}
        />
        <Table />
        {showForm && <FormView onClose={this.closeForm} onSave={this.closeForm} />}
      </Container>
    );
  }
}

export default compose([routeNode('customers')])(Customers);
