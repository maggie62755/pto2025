import React from 'react';
import PropTypes from 'prop-types';
import './Modal.css';

const Modal = ({ show, onClose, title, children }) => {
  if (!show) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        {title && <h2 className="modal-title-cell">{title}</h2>}
        <div>{children}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node,
  titleClassName: PropTypes.string,
};

export default Modal;
