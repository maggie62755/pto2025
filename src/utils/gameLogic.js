import { MAX_CELL, ANIMATION_TIMINGS, GAME_RESULT } from '../constants/gameConstants';

/**
 * Check if a position has a special effect (wormhole/asteroid) using travel data
 * @param {number} position - Current position
 * @param {Array} travelData - Travel data array with special effects
 * @returns {{hasEffect: boolean, targetPosition: number, tip: string}}
 */
export function checkSpecialPosition(position, travelData) {
  const cellData = travelData.find(cell => cell.num === position);
  
  if (cellData && cellData.specialEffect && cellData.targetCell) {
    const effect = cellData.specialEffect.toLowerCase();
    let tip = '';
    
    if (effect === 'wormhole') {
      tip = `WORMHOLE! Fast travel to ${cellData.targetCell}`;
    } else if (effect === 'asteroid') {
      tip = `ASTEROID HIT! Pushed back to ${cellData.targetCell}`;
    } else {
      tip = `${cellData.specialEffect.toUpperCase()}! Go to ${cellData.targetCell}`;
    }
    
    return {
      hasEffect: true,
      targetPosition: cellData.targetCell,
      tip: tip
    };
  }
  
  return { hasEffect: false, targetPosition: position, tip: null };
}

/**
 * Calculate animation duration based on steps
 * @param {number} steps - Number of steps to animate
 * @returns {number} Duration in milliseconds
 */
export function calculateAnimationDuration(steps) {
  return (Math.abs(steps) + 1) * ANIMATION_TIMINGS.STEP_DURATION;
}

/**
 * Handle dice roll logic and return movement instructions
 * @param {Object} params - Parameters object
 * @returns {Object} Movement instructions
 */
export function handleDiceRollLogic({
  diceValue,
  currentPosition,
  currentBudget,
}) {
  const targetCell = currentPosition + diceValue;
  let needBounceBack = false;
  let finalPosition = targetCell;
  
  // Check if exceeds final cell
  if (targetCell > MAX_CELL) {
    needBounceBack = true;
    const overflow = targetCell - MAX_CELL;
    finalPosition = MAX_CELL - overflow;
    if (finalPosition < 1) finalPosition = 1;
  }
  
  // Check if reaches exactly the final cell
  if (targetCell === MAX_CELL || finalPosition === MAX_CELL) {
    const moveTo = targetCell > MAX_CELL ? MAX_CELL : targetCell;
    const stepsToMove = Math.abs(moveTo - currentPosition);
    const budgetNeeded = stepsToMove;
    const finalBudget = Math.max(0, currentBudget - budgetNeeded);
    
    return {
      type: 'WIN',
      moveTo,
      finalBudget,
      gameResult: GAME_RESULT.WIN,
    };
  }
  
  // Check if bounce back is needed
  if (needBounceBack) {
    const totalSteps = Math.abs(MAX_CELL - currentPosition) + Math.abs(finalPosition - MAX_CELL);
    const newBudget = currentBudget - totalSteps;
    
    if (newBudget < 0) {
      return {
        type: 'LOSE',
        gameResult: GAME_RESULT.LOSE,
      };
    }
    
    return {
      type: 'BOUNCE_BACK',
      firstMove: { from: currentPosition, to: MAX_CELL },
      secondMove: { from: MAX_CELL, to: finalPosition },
      totalSteps,
      newBudget,
    };
  }
  
  // Normal movement
  const normalTo = targetCell;
  const firstSteps = Math.abs(normalTo - currentPosition);
  const newBudgetAfterFirst = currentBudget - firstSteps;
  
  if (newBudgetAfterFirst < 0) {
    return {
      type: 'LOSE',
      gameResult: GAME_RESULT.LOSE,
    };
  }
  
  return {
    type: 'NORMAL',
    moveTo: normalTo,
    newBudget: newBudgetAfterFirst,
    firstSteps,
  };
}
