import './Table.css';

import React from 'react';
import PropTypes from 'prop-types';

import TableBootstrap from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router5';

const Table = props => {
  const { data, onDelete } = props;

  const handleDelete = id => event => {
    event.preventDefault();
    event.stopPropagation();

    onDelete(id);
  };

  const onRowClick = id => () => {
    const { router } = props;
    router.navigate('invoice.edit', { id });
  };

  return (
    <TableBootstrap className="invoices__table" responsive hover>
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
            <tr key={row.id} onClick={onRowClick(row.id)}>
              <td>{row.id}</td>
              <td>{row.customer.name}</td>
              <td>{row.discount}</td>
              <td>{row.total}</td>
              <td className="text-right">
                <Button onClick={handleDelete(row.id)} variant="outline-danger">
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
};

Table.propTypes = {
  data: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired
};

Table.defaultProps = {};

export default withRouter(Table);
