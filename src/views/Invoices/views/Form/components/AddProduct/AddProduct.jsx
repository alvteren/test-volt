import './AddProduct.css';

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import FormGroup from 'react-bootstrap/FormGroup';
import FormLabel from 'react-bootstrap/FormLabel';

import SelectFromApi from '@UI/SelectFromApi';

import productsApi from '@api/products';

const AddProduct = props => {
  const { onChange, onAddProduct, product, error } = props;
  return (
    <Fragment>
      <FormGroup className="add-product__select" controlId="customer">
        <FormLabel>Add product</FormLabel>
        <SelectFromApi
          api={productsApi.getOptions}
          mapApiData={({ name, id, price }) => ({
            value: { name, product_id: id, price },
            label: name
          })}
          name="product"
          value={product}
          onChange={onChange}
          isValid={!error}
        />
        {error && <div className="feedback_invalid">{error}</div>}
      </FormGroup>
      <Button
        className="add-product__button"
        variant="outline-dark"
        type="button"
        onClick={onAddProduct}
        disabled={product === null}
      >
        Add
      </Button>
    </Fragment>
  );
};

AddProduct.propTypes = {
  onChange: PropTypes.func.isRequired,
  onAddProduct: PropTypes.func.isRequired,
  product: PropTypes.object,
  error: PropTypes.string
};
AddProduct.defaultProps = {
  error: null
};

export default AddProduct;
