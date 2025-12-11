import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import './CurrentCellCard.css';

const CurrentCellCard = ({ position, cellInfo, currentCellData }) => {
  const [showModal, setShowModal] = useState(false);

  const getTruncatedDesc = (text, maxLength = 150) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <>
      <div 
        className="game-info-card current-cell-card" 
        onClick={() => currentCellData && setShowModal(true)}
        style={{ cursor: currentCellData ? 'pointer' : 'default' }}
      >
        <div className="label cell-label">Current Location</div>
        {currentCellData && (
          <>
            {currentCellData.location && (
              <div className="cell-location-preview">
                <span className="location-label">Location:</span> {currentCellData.location}
              </div>
            )}
            {currentCellData.activity && (
              <div className="cell-activity-preview">
                <span className="activity-label">Activity:</span> {currentCellData.activity}
              </div>
            )}
            {currentCellData.description && (
              <div className="cell-desc-preview">
                {getTruncatedDesc(currentCellData.description)}
              </div>
            )}
            <div className="click-hint">Click to view full details</div>
          </>
        )}
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)} title={cellInfo(position)}>
        {currentCellData && (
          <div className="cell-modal-content">
            {currentCellData.image && (
              <div className="cell-modal-image-wrap">
                <img
                  src={`/resources/${currentCellData.image}`}
                  alt={currentCellData.name}
                  className="cell-modal-image"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}
            {currentCellData.activity && (
              <div className="cell-modal-section">
                <div className="modal-section-label">Activity</div>
                <div className="modal-section-value">{currentCellData.activity}</div>
              </div>
            )}
            {currentCellData.location && (
              <div className="cell-modal-section">
                <div className="modal-section-label">Location</div>
                <div className="modal-section-value">{currentCellData.location}</div>
              </div>
            )}
            {currentCellData.description && (
              <div className="cell-modal-section">
                <div className="modal-section-label">Description</div>
                <div className="modal-section-value description-text">{currentCellData.description}</div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </>
  );
};

CurrentCellCard.propTypes = {
  position: PropTypes.number.isRequired,
  cellInfo: PropTypes.func.isRequired,
  currentCellData: PropTypes.object,
};

export default CurrentCellCard;
