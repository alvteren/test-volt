import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { routeNode } from 'react-router5';

import Headline from '@UI/Headline';
import DialogModal from '@UI/DialogModal';
import Link from '@UI/Link';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import Table from './components/Table';

import invoices from '@api/invoices';

class List extends PureComponent {
  static propTypes = {
    route: PropTypes.object.isRequired
  };

  static defaultProps = {};

  state = {
    deletingId: null,
    data: this.props.route.data
  };

  openDeleteDialog = id => {
    this.setState({ deletingId: id });
  };

  closeDeleteDialog = () => {
    this.setState({ deletingId: null });
  };

  deleteCustomer = async () => {
    const id = this.state.deletingId;

    try {
      await invoices.delete(id);
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
    const { data, deletingId } = this.state;

    return (
      <Container>
        <Headline
          title="Invoice list"
          actionComponent={props => (
            <Link routeName="invoices.new" {...props}>
              <Button variant="outline-dark">Create</Button>
            </Link>
          )}
        />
        <Table data={data} onDelete={this.openDeleteDialog} />
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

export default routeNode('invoices')(List);
