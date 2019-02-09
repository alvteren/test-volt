import React from 'react';
import PropTypes from 'prop-types';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const DialogModal = props => {
  const { onConfirm, onDecline, message, ...rest } = props;
  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      show
      centered
      onHide={onDecline}
      size="sm"
      {...rest}
    >
      <Modal.Body>
        <div className="text-center">{message}</div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onDecline} variant="outline-secondary">
          Cancel
        </Button>
        <Button onClick={onConfirm} autoFocus>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

DialogModal.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onDecline: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired
};
DialogModal.defaultProps = {};

export default DialogModal;
