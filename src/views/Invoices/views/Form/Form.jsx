import './Form.css';

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { routeNode } from 'react-router5';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Headline from '@UI/Headline';
import SelectFromApi from '@UI/SelectFromApi';

import ProductTable from './components/ProductTable';
import AddProduct from './components/AddProduct';

import customersApi from '@api/customers';
import invoicesApi from '@api/invoices';
import invoiceItemsApi from '@api/invoice-items';

import { sum } from '@utils/float';

@routeNode('invoices.new')
@routeNode('invoices.edit')
class FormView extends PureComponent {
  static propTypes = {
    route: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
  };
  static defaultProps = {};

  state = {
    discount: 0,
    customer: null,
    product: null,
    products: [],
    errors: {},
    validated: false
  };

  constructor(props) {
    super(props);

    const {
      route: {
        params: { id },
        data
      },
      router
    } = props;

    if (id > 0 && !data) {
      // Invoice not found
      router.navigate('invoices');
      return;
    }

    const discount = (data && data.discount) || 0;
    const customerData = (data && data.customer) || null;
    const products = (data && data.products) || [];

    const customer = customerData
      ? {
          label: customerData.name,
          value: { id: customerData.id, name: customerData.name }
        }
      : null;

    this.state = {
      discount,
      customer,
      product: null,
      products,
      errors: {}
    };
  }

  onSubmit = event => {
    event.preventDefault();
    const { customer } = this.state;

    if (customer === null) {
      this.addError('customer', 'Choose customer');
    } else {
      this.saveInvoice();
    }
  };

  saveInvoice = async () => {
    const { discount, customer } = this.state;
    const { id } = this.props.route.params;
    const { router } = this.props;

    const body = {
      customer_id: customer.value.id,
      discount: discount,
      total: this.getTotalDiscount()
    };

    if (id > 0) {
      const promises = [invoicesApi.update(id, body), this.saveProducts(id)];
      await Promise.all(promises);
    } else {
      const data = await invoicesApi.create(body);
      await this.saveProducts(data.id);
    }

    router.navigate('invoices');
  };

  saveProducts = invoiceId => {
    const { products } = this.state;
    const promises = [];

    products.forEach(product => {
      const { product_id, id, quantity } = product;
      const body = {
        product_id,
        quantity
      };

      const invoiceItem = invoiceItemsApi(invoiceId);

      if (quantity > 0) {
        promises.push(id ? invoiceItem.update(id, body) : invoiceItem.create(body));
      } else if (id) {
        promises.push(invoiceItem.delete(id));
      }
    });

    return Promise.all(promises);
  };

  onChange = event => {
    const { name, value } = event.target;

    if (value !== null) {
      this.removeError(name);
    }
    this.setState({ [name]: value });
  };

  onChangeDiscount = event => {
    const { name, value } = event.target;
    let newValue = +value;
    if (newValue > 100) {
      newValue = 100;
    } else if (newValue < 0) {
      newValue = 0;
    }

    this.onChange({ target: { name, value: newValue } });
  };

  onChangeQty = (index, quantity) => {
    this.setState(({ products }) => ({
      products: products.map((product, i) => (i === index ? { ...product, quantity } : product))
    }));
  };

  addProduct = () => {
    const { product } = this.state;
    if (product === null) {
      this.addError('product', 'Choose product');
    } else {
      this.setState(prevState => ({
        products: [...prevState.products, { ...product.value, quantity: 1 }],
        product: null
      }));
    }
  };

  addError = (name, message) => {
    this.setState(prevState => ({ errors: { ...prevState.errors, [name]: message } }));
  };

  removeError = name => {
    if (this.state.errors != null) {
      this.setState(prevState => ({ errors: { ...prevState.errors, [name]: null } }));
    }
  };

  getTotal = () => {
    const { products } = this.state;
    /* toFixed(2) не трогаем, если не хотим увидеть чудес арифметики js */
    return products
      .reduce((acc, product) => sum(acc)(product.price * product.quantity)(), 0)
      .toFixed(2);
  };

  getTotalDiscount = () => {
    const { discount } = this.state;
    return ((this.getTotal() * (100 - discount)) / 100).toFixed(2);
  };

  render() {
    const { discount, customer, product, products, errors } = this.state;
    const { id } = this.props.route.params;
    const total = this.getTotal();
    const totalDiscount = this.getTotalDiscount();
    const cannotSubmit = customer === null || products.length === 0;
    const canChangeCustomer = !(id > 0);

    return (
      <Container>
        <Headline title={id ? 'Edit Invoice' : 'Create Invoice'} />
        <Form onSubmit={this.onSubmit}>
          <Row>
            <Col xs={12} sm={6}>
              <Form.Group controlId="discount">
                <Form.Label>Discount (%)</Form.Label>
                <Form.Control
                  type="number"
                  name="discount"
                  value={discount}
                  onChange={this.onChangeDiscount}
                  placeholder="Enter discount"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={6}>
              <Form.Group controlId="customer">
                <Form.Label>Customer</Form.Label>
                <SelectFromApi
                  api={customersApi.getOptions}
                  mapApiData={({ name, id }) => ({ value: { name, id }, label: name })}
                  name="customer"
                  value={customer}
                  onChange={this.onChange}
                  isValid={!errors.customer}
                  isDisabled={!canChangeCustomer}
                />
                {errors.customer && <div className="feedback_invalid">{errors.customer}</div>}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className="edit-invoice-add-product" xs={12} sm={6}>
              <AddProduct
                onChange={this.onChange}
                onAddProduct={this.addProduct}
                product={product}
                error={errors.product}
              />
            </Col>
          </Row>
          <ProductTable data={products} discount={discount} onChangeQty={this.onChangeQty} />
          <Row>
            <Col>
              <div className="edit-invoice__total">
                Total:{' '}
                {discount > 0 ? (
                  <span className="edit-invoice__total-discount">
                    <s>{total}</s> {totalDiscount}
                  </span>
                ) : (
                  total
                )}
              </div>
            </Col>
            <Col className="text-right">
              <Button variant="primary" type="submit" disabled={cannotSubmit}>
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    );
  }
}

export default FormView;
