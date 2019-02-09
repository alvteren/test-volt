import './ProductTable.css';

import React from 'react';
import PropTypes from 'prop-types';

import Table from 'react-bootstrap/Table';
import FormControl from 'react-bootstrap/FormControl';

class ProductTable extends React.PureComponent {
  onChange = index => event => {
    const { value } = event.target;
    this.props.onChangeQty(index, +value);
  };

  render() {
    const { data, discount } = this.props;

    return (
      <Table className="invoice-products-table" responsive hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Qty</th>
          </tr>
        </thead>
        <tbody>
          {data.length ? (
            data
              .filter(row => row.quantity > 0)
              .map((row, index) => {
                const { name, price, quantity, id } = row;
                const discountPrice = ((price * (100 - discount)) / 100).toFixed(2);

                return (
                  <tr key={id || index}>
                    <td>{name}</td>
                    <td>
                      {discount > 0 ? (
                        <span className="invoice-products-table__discount-price">
                          <s>{price}</s> {discountPrice}
                        </span>
                      ) : (
                        price
                      )}
                    </td>
                    <td>
                      <FormControl
                        className="invoice-products__qty"
                        type="number"
                        value={quantity}
                        onChange={this.onChange(index)}
                      />
                    </td>
                  </tr>
                );
              })
          ) : (
            <tr>
              <td className="text-center" colSpan="3">
                Not found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    );
  }
}

ProductTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      product_id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired
    })
  ),
  discount: PropTypes.number,
  onChangeQty: PropTypes.func.isRequired
};
ProductTable.defaultProps = {
  discount: 0
};

export default ProductTable;
