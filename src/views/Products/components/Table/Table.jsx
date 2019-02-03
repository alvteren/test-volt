import './Table.css';

import React from 'react';
import PropTypes from 'prop-types';

import TableBootstrap from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const Table = props => {
  const { data, onEdit, onDelete } = props;

  const handleDelete = id => event => {
    event.preventDefault();
    event.stopPropagation();

    onDelete(id);
  };

  return (
    <TableBootstrap className="products__table" responsive hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Price</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {data.length ? (
          data.map(row => (
            <tr key={row.id} onClick={onEdit(row.id)}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.price}</td>
              <td className="text-right">
                <Button onClick={handleDelete(row.id)} variant="outline-danger">
                  delete
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4">Not found</td>
          </tr>
        )}
      </tbody>
    </TableBootstrap>
  );
};

Table.propTypes = {
  data: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

Table.defaultProps = {};

export default Table;
