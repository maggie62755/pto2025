import React from 'react';
import PropTypes from 'prop-types';
import './GameBoard.css';
import { BOARD_SIZE } from '../constants/gameConstants';

function getCellNumber(row, col) {
  return row * BOARD_SIZE + col + 1;
}

const GameBoard = ({ position, path, hoverCell, setHoverCell, travelData, getCellData }) => {
  return (
    <div className="game-board">
      <table className="game-board-table">
        <tbody>
          {[...Array(BOARD_SIZE)].map((_, row) => (
            <tr key={row}>
              {[...Array(BOARD_SIZE)].map((_, col) => {
                const displayCol = row % 2 === 0 ? col : BOARD_SIZE - 1 - col;
                const cellNum = getCellNumber(row, displayCol);
                const isCurrent = cellNum === position;
                const inPath = path.includes(cellNum);
                const cellData = getCellData(cellNum);
                return (
                  <td
                    key={col}
                    className={isCurrent ? 'current' : inPath ? 'path' : ''}
                    onMouseEnter={() => setHoverCell(cellNum)}
                    onMouseLeave={() => setHoverCell(null)}
                  >
                    <div className="cell-content">
                      {cellData && cellData.image ? (
                        <img
                          src={`/resources/${cellData.image}`}
                          alt={cellData.name}
                          className="cell-img-full"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      ) : null}
                      <div className="cell-num-overlay">{cellNum}</div>
                      {hoverCell === cellNum && cellData && cellData.image && (
                        <div className="cell-img-popup">
                          {cellData.location && (
                            <div className="cell-popup-location">{cellData.location}</div>
                          )}
                          <img
                            src={`/resources/${cellData.image}`}
                            alt={cellData.name}
                            className="cell-img-large"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

GameBoard.propTypes = {
  position: PropTypes.number.isRequired,
  path: PropTypes.arrayOf(PropTypes.number).isRequired,
  hoverCell: PropTypes.number,
  setHoverCell: PropTypes.func.isRequired,
  travelData: PropTypes.arrayOf(PropTypes.object).isRequired,
  getCellData: PropTypes.func.isRequired,
};

GameBoard.propTypes = {
  position: PropTypes.number.isRequired,
  path: PropTypes.arrayOf(PropTypes.number).isRequired,
  hoverCell: PropTypes.number,
  setHoverCell: PropTypes.func.isRequired,
  travelData: PropTypes.arrayOf(PropTypes.object).isRequired,
  getCellData: PropTypes.func.isRequired,
};

export default GameBoard;
