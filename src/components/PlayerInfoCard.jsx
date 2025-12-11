import React from 'react';
import PropTypes from 'prop-types';
import './PlayerInfoCard.css';

const PlayerInfoCard = ({ playerName, budget }) => {
  return (
    <div className="game-info-card">
      <div className="label player-label">Player</div>
      <div className="value">{playerName}</div>
      <div className="label budget-label">Budget</div>
      <div className="value">{budget}</div>
    </div>
  );
};

PlayerInfoCard.propTypes = {
  playerName: PropTypes.string.isRequired,
  budget: PropTypes.number.isRequired,
};

export default PlayerInfoCard;
