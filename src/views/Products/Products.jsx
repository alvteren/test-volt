import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { routeNode } from 'react-router5';

import Headline from '@UI/Headline';
import DialogModal from '@UI/DialogModal';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import Table from './components/Table';
import FormView from './components/Form';

import products from '@api/products';

class Products extends PureComponent {
  static propTypes = {
    route: PropTypes.object.isRequired
  };

  static defaultProps = {};

  state = {
    isShownForm: false,
    deletingId: null,
    data: this.props.route.data,
    editData: undefined
  };

  openForm = () => {
    this.setState({ isShownForm: true });
  };

  closeForm = () => {
    this.setState({ isShownForm: false, editData: undefined });
  };

  showEditForm = id => async () => {
    const customer = await products.getOne(id);
    this.setState({ isShownForm: true, editData: customer });
  };

  openDeleteDialog = id => {
    this.setState({ deletingId: id });
  };

  closeDeleteDialog = () => {
    this.setState({ deletingId: null });
  };

  saveCustomer = async data => {
    const isUpdating = data.id > 0;

    try {
      const customer = await (isUpdating ? products.update(data.id, data) : products.create(data));

      if (isUpdating) {
        this.setState(prevState => ({
          data: prevState.data.map(data => (data.id === customer.id ? customer : data))
        }));
      } else {
        this.setState(prevState => ({ data: [...prevState.data, customer] }));
      }
    } catch (error) {
      console.error(error);
    }

    this.closeForm();
  };

  deleteCustomer = async () => {
    const id = this.state.deletingId;

    try {
      await products.delete(id);
      this.setState(prevState => ({
        deletingId: null,
        data: prevState.data.filter(_ => _.id !== id)
      }));
    } catch (error) {
      this.closeDeleteDialog();
      console.error(error);
    }
  };

  render() {
    const { isShownForm, data, editData, deletingId } = this.state;

    return (
      <Container>
        <Headline
          title="Product list"
          actionComponent={props => (
            <Button variant="outline-dark" onClick={this.openForm} {...props}>
              Create
            </Button>
          )}
        />
        <Table data={data} onEdit={this.showEditForm} onDelete={this.openDeleteDialog} />
        {isShownForm && (
          <FormView values={editData} onClose={this.closeForm} onSave={this.saveCustomer} />
        )}
        {deletingId && (
          <DialogModal
            message="Are you sure?"
            onDecline={this.closeDeleteDialog}
            onConfirm={this.deleteCustomer}
          />
        )}
      </Container>
    );
  }
}

export default routeNode('products')(Products);
