import './Table.css';

import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router5';

import TableBootstrap from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Link from '@UI/Link';

class Table extends React.PureComponent {
  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        customer: PropTypes.shape({
          name: PropTypes.string.isRequired
        }).isRequired,
        discount: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired
      })
    ).isRequired,
    router: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired
  };

  onRowClick = id => () => {
    const { router } = this.props;
    router.navigate('invoices.edit', { id });
  };

  deleteInvoice = id => event => {
    event.preventDefault();
    event.stopPropagation();

    const { onDelete } = this.props;
    onDelete(id);
  };

  render() {
    const { data } = this.props;

    return (
      <TableBootstrap className="invoices-table" responsive hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Customer Name</th>
            <th>Discount, %</th>
            <th>Total</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {data.length ? (
            data.map(row => (
              <tr key={row.id} onClick={this.onRowClick(row.id)}>
                <td>{row.id}</td>
                <td>{row.customer.name}</td>
                <td>{row.discount}</td>
                <td>{row.total}</td>
                <td className="text-right">
                  <Link routeName="invoices.edit" routeParams={{ id: row.id }}>
                    <Button variant="outline-info">edit</Button>
                  </Link>
                  <Button
                    onClick={this.deleteInvoice(row.id)}
                    className="invoices-table-row__delete"
                    variant="outline-danger"
                  >
                    delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="text-center" colSpan="5">
                Not found
              </td>
            </tr>
          )}
        </tbody>
      </TableBootstrap>
    );
  }
}

export default withRouter(Table);
