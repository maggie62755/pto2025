import React from 'react';
import PropTypes from 'prop-types';
import './GameOverModal.css';
import { FaLocationDot } from "react-icons/fa6";
import { TbMoneybag, TbFaceIdError } from "react-icons/tb";
import { GiAsteroid, GiWormMouth } from "react-icons/gi";
import { FaCrown } from "react-icons/fa";

const GameOverModal = ({ 
  show, 
  gameResult, 
  playerName, 
  position, 
  budget, 
  visitedLocations, 
  onRestart, 
  onBackToLogin 
}) => {
  if (!show) return null;
  
  const asteroidHits = visitedLocations.filter(loc => loc.activity === 'Asteroid').length;
  const wormholeEntries = visitedLocations.filter(loc => loc.activity === 'Wormhole').length;
  const regularLocations = visitedLocations.filter(loc => 
    loc.activity !== 'Asteroid' && loc.activity !== 'Wormhole'
  );
  
  return (
    <div className="modal-overlay" onClick={(e) => e.stopPropagation()}>
      <div className="modal-content game-over-modal" onClick={(e) => e.stopPropagation()}>
        <div className="game-over-content">
          {gameResult === 'win' ? (
            <>
              <h2 className="game-over-title win"><FaCrown /> Congratulations!</h2>
              <p className="game-over-message">{playerName}, you've completed the journey!</p>
            </>
          ) : (
            <>
              <h2 className="game-over-title lose"><TbFaceIdError /> Game Over</h2>
              <p className="game-over-message">{playerName}, you've run out of budget!</p>
            </>
          )}
          
          <div className="stats-container">
            <div className="stats-grid">
              <div className="stat-card primary">
                <div className="stat-icon"><FaLocationDot /></div>
                <div className="stat-content">
                  <div className="stat-label">Final Position</div>
                  <div className="stat-value">Cell {position}</div>
                </div>
              </div>
              <div className="stat-card primary">
                <div className="stat-icon"><TbMoneybag /></div>
                <div className="stat-content">
                  <div className="stat-label">Budget Left</div>
                  <div className="stat-value">${budget}</div>
                </div>
              </div>
            </div>
            
            <div className="stats-grid">
              <div className="stat-card special asteroid">
                <div className="stat-icon"><GiAsteroid /></div>
                <div className="stat-content">
                  <div className="stat-label">Asteroid Hits</div>
                  <div className="stat-value">{asteroidHits}</div>
                </div>
              </div>
              <div className="stat-card special wormhole">
                <div className="stat-icon"><GiWormMouth /></div>
                <div className="stat-content">
                  <div className="stat-label">Wormhole Entries</div>
                  <div className="stat-value">{wormholeEntries}</div>
                </div>
              </div>
            </div>
          </div>

          {regularLocations.length > 0 && (
            <div className="visited-locations">
              <h3 className="visited-title">
                Journey Timeline ({regularLocations.length} locations)
              </h3>
              <div className="locations-list">
                {regularLocations.map((loc, index) => (
                  <div key={`${loc.num}-${index}`} className="location-item">
                    <span className="location-number">{index + 1}</span>
                    <div className="location-info">
                      <div className="location-name">{loc.activity}</div>
                      {loc.location && <div className="location-place">{loc.location}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="game-over-buttons">
            <button className="btn restart-btn" onClick={onRestart}>Restart Game</button>
            <button className="btn back-btn" onClick={onBackToLogin}>Back to Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

GameOverModal.propTypes = {
  show: PropTypes.bool.isRequired,
  gameResult: PropTypes.oneOf(['win', 'lose']),
  playerName: PropTypes.string.isRequired,
  position: PropTypes.number.isRequired,
  budget: PropTypes.number.isRequired,
  visitedLocations: PropTypes.arrayOf(
    PropTypes.shape({
      num: PropTypes.number,
      name: PropTypes.string,
      activity: PropTypes.string,
      location: PropTypes.string,
    })
  ).isRequired,
  onRestart: PropTypes.func.isRequired,
  onBackToLogin: PropTypes.func.isRequired,
};

export default GameOverModal;
