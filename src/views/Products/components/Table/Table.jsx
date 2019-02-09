import './Table.css';

import React from 'react';
import PropTypes from 'prop-types';

import TableBootstrap from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

class Table extends React.PureComponent {
  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired
      })
    ).isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
  };

  handleDelete = id => event => {
    const { onDelete } = this.props;
    event.preventDefault();
    event.stopPropagation();

    onDelete(id);
  };

  render() {
    const { data, onEdit } = this.props;

    return (
      <TableBootstrap className="products-table" responsive hover>
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
                  <Button onClick={this.handleDelete(row.id)} variant="outline-danger">
                    delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="text-center" colSpan="4">
                Not found
              </td>
            </tr>
          )}
        </tbody>
      </TableBootstrap>
    );
  }
}

Table.defaultProps = {};

export default Table;
