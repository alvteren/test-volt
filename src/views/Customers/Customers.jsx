import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { routeNode } from 'react-router5';

import Headline from '@UI/Headline';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import Table from './components/Table';
import FormView from './components/Form';

import compose from '@utils/compose';

import customers from '@api/customers';

class Customers extends PureComponent {
  static propTypes = {
    route: PropTypes.object.isRequired
  };

  static defaultProps = {};

  state = { showForm: false, data: this.props.route.data, editData: undefined };

  openForm = () => {
    this.setState({ showForm: true });
  };

  closeForm = () => {
    this.setState({ showForm: false, editData: undefined });
  };

  showEditForm = id => async () => {
    const customer = await customers.getOne(id);
    this.setState({ showForm: true, editData: customer });
  };

  saveCustomer = async data => {
    const isUpdating = data.id > 0;

    const customer = await (isUpdating ? customers.update(data.id, data) : customers.create(data));

    if (isUpdating) {
      this.setState(prevState => ({
        data: prevState.data.map(data => (data.id === customer.id ? customer : data))
      }));
    } else {
      this.setState(prevState => ({ data: [...prevState.data, customer] }));
    }

    this.closeForm();
  };

  render() {
    const { showForm, data, editData } = this.state;

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
        <Table data={data} onShowEdit={this.showEditForm} />
        {showForm && (
          <FormView values={editData} onClose={this.closeForm} onSave={this.saveCustomer} />
        )}
      </Container>
    );
  }
}

export default compose([routeNode('customers')])(Customers);
