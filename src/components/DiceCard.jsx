import React from 'react';
import PropTypes from 'prop-types';
import Dice from 'react-dice-roll';
import './DiceCard.css';

const DiceCard = ({ isRolling, onRoll }) => {
  return (
    <div className="game-info-card">
      <div className="label dice-label">Dice</div>
      <div className={`dice-value ${isRolling ? 'disabled' : ''}`}>
        <Dice
          size={48}
          faceBgColor="#fff"
          faceColor="#222"
          dotColor="#2196f3"
          rollTime={0.7}
          disabled={isRolling}
          onRoll={onRoll}
          rolling={isRolling}
          trigger={isRolling ? Math.random() : undefined}
        />
      </div>
      <div className="dice-hint">Click the dice to roll!</div>
    </div>
  );
};

DiceCard.propTypes = {
  isRolling: PropTypes.bool.isRequired,
  onRoll: PropTypes.func.isRequired,
};

export default DiceCard;
