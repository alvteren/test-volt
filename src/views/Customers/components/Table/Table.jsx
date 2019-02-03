import './Table.css';

import React from 'react';
import PropTypes from 'prop-types';

import TableBootstrap from 'react-bootstrap/Table';

const Table = props => {
  const { data, onShowEdit } = props;

  return (
    <TableBootstrap className="customers__table" responsive hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Address</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        {data.length ? (
          data.map(row => (
            <tr key={row.id} onClick={onShowEdit(row.id)}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.address}</td>
              <td>{row.phone}</td>
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
  onShowEdit: PropTypes.func.isRequired
};

Table.defaultProps = {};

export default Table;
