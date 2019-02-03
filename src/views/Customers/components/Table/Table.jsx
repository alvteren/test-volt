import './Table.css';

import React from 'react';

import TableBootstrap from 'react-bootstrap/Table';

const Table = () => {
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
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>123123 d dasd ada dsd</td>
          <td>5555-555-555</td>
        </tr>
      </tbody>
    </TableBootstrap>
  );
};

Table.propTypes = {};
Table.defaultProps = {};

export default Table;
