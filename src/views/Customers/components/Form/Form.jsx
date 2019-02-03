import './Form.css';

import React from 'react';
import PropTypes from 'prop-types';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class FormView extends React.PureComponent {
  state = {
    validated: false,
    values: this.props.values
  };

  handleSubmit = event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
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
    const { name, address, phone } = values;

    return (
      <Modal show={true} onHide={onClose}>
        <Form noValidate validated={validated} onSubmit={e => this.handleSubmit(e)}>
          <Modal.Header closeButton>
            <Modal.Title>Create Customer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formBasicText">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter customer name"
                name="name"
                value={name}
                onChange={this.handleChangeInput}
              />
              <Form.Control.Feedback type="invalid">Field has to be filled</Form.Control.Feedback>
              <Form.Control.Feedback type="valid">{"It's correct"}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicText">
              <Form.Label>Address</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter customer address"
                name="address"
                value={address}
                onChange={this.handleChangeInput}
              />
              <Form.Control.Feedback type="invalid">Field has to be filled</Form.Control.Feedback>
              <Form.Control.Feedback type="valid">{"It's correct"}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicTel">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                required
                type="tel"
                placeholder="Enter customer phone"
                name="phone"
                value={phone}
                onChange={this.handleChangeInput}
              />
              <Form.Control.Feedback type="invalid">Field has to be filled</Form.Control.Feedback>
              <Form.Control.Feedback type="valid">{"It's correct"}</Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

FormView.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  values: PropTypes.object
};
FormView.defaultProps = {
  values: {
    name: '',
    address: '',
    phone: ''
  }
};

export default FormView;