import React from 'react';
import PropTypes from 'prop-types';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Modal from 'react-bootstrap/lib/Modal';

const LoadingModal = props => {
  return (
    <div>
      <Modal show={props.show}>
        <Modal.Body>
          <h1 className="text-center">
            <Glyphicon glyph="refresh" />
          </h1>
          <h5 className="text-center">Loading...</h5>
        </Modal.Body>
      </Modal>
    </div>
  );
};

LoadingModal.propTypes = {
  show: PropTypes.bool
};

LoadingModal.defaultProps = {
  show: false
};

export default LoadingModal;
