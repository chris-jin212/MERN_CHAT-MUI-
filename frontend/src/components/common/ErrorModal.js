import React from 'react';
import PropTypes from 'prop-types';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Modal from 'react-bootstrap/lib/Modal';

const ErrorModal = props => {
  return (
    <Modal show={props.show}>
      <Modal.Header>
        <Modal.Title>Error</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <h1 className="text-center">
          <Glyphicon glyph="alert" />
        </h1>
        <h5 className="text-center">{props.errorMessage}</h5>
      </Modal.Body>
    </Modal>
  );
};

ErrorModal.propTypes = {
  show: PropTypes.bool,
  errorMessage: PropTypes.string
};

ErrorModal.defaultProps = {
  show: false,
  errorMessage: ''
};

export default ErrorModal;
