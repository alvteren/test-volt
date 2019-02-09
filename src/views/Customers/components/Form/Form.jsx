import './Form.css';

import React from 'react';
import PropTypes from 'prop-types';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class FormView extends React.PureComponent {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    values: PropTypes.object
  };

  static defaultProps = {
    values: {
      name: '',
      address: '',
      phone: ''
    }
  };

  state = {
    validated: false,
    values: this.props.values
  };

  handleSubmit = event => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      this.setState({ validated: true });
    } else {
      this.props.onSave(this.state.values);
    }
  };

  handleChangeInput = event => {
    const { name, value } = event.currentTarget;

    this.setState(prevState => ({ values: { ...prevState.values, [name]: value } }));
  };

  render() {
    const { onClose } = this.props;
    const { validated, values } = this.state;
    const { name, address, phone, id } = values;
    const isEdit = id > 0;

    return (
      <Modal show onHide={onClose}>
        <Form noValidate validated={validated} onSubmit={e => this.handleSubmit(e)}>
          <Modal.Header closeButton>
            <Modal.Title>{isEdit ? 'Update Customer' : 'Create Customer'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formBasicText">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter customer name"
                name="name"
                autoComplete="name"
                value={name}
                onChange={this.handleChangeInput}
              />
              <Form.Control.Feedback type="invalid">Field has to be filled</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicText">
              <Form.Label>Address</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter customer address"
                name="address"
                autoComplete="street-address"
                value={address}
                onChange={this.handleChangeInput}
              />
              <Form.Control.Feedback type="invalid">Field has to be filled</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicTel">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                required
                type="tel"
                autoComplete="tel-national"
                placeholder="Enter customer phone"
                name="phone"
                value={phone}
                onChange={this.handleChangeInput}
              />
              <Form.Control.Feedback type="invalid">Field has to be filled</Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" autoFocus>
              {isEdit ? 'Save changes' : 'Sumbit'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

export default FormView;
