import { useCallback, useRef } from 'react';
import { ANIMATION_TIMINGS, GAME_RESULT } from '../constants/gameConstants';
import { handleDiceRollLogic, checkSpecialPosition, calculateAnimationDuration } from '../utils/gameLogic';

/**
 * Custom hook for handling dice roll logic with animations and state updates
 * @param {Object} params - Hook parameters
 * @returns {Function} handleDiceRoll - Function to handle dice roll
 */
export function useDiceRoll({
  position,
  budget,
  isRolling,
  gameOver,
  travelData,
  setIsRolling,
  setDice,
  setPosition,
  setBudget,
  setGameOver,
  setGameResult,
  setShowGameOverModal,
  setMoveTip,
  animateMove,
}) {
  const handleDiceRoll = useCallback((value) => {
    // Step 1: Check Budget
    if (isRolling || gameOver) return;
    
    if (budget <= 0) {
      setGameOver(true);
      setGameResult(GAME_RESULT.LOSE);
      setShowGameOverModal(true);
      return;
    }

    // Step 2: Rolling
    setIsRolling(true);
    setDice(value);
    const from = position;

    // Step 3: Async Logic - Calculate move result
    const moveResult = handleDiceRollLogic({
      diceValue: value,
      currentPosition: position,
      currentBudget: budget,
    });

    // Step 4: Animation & State Update based on move type
    
    // Handle WIN scenario
    if (moveResult.type === 'WIN') {
      animateMove(from, moveResult.moveTo);
      const animDuration = calculateAnimationDuration(moveResult.moveTo - from);
      
      setTimeout(() => {
        setPosition(moveResult.moveTo);
        setBudget(moveResult.finalBudget);
        setIsRolling(false);
        setGameOver(true);
        setGameResult(moveResult.gameResult);
        
        setTimeout(() => {
          setShowGameOverModal(true);
        }, ANIMATION_TIMINGS.GAME_OVER_DELAY);
      }, animDuration);
      return;
    }

    // Handle LOSE scenario
    if (moveResult.type === 'LOSE') {
      setGameOver(true);
      setGameResult(moveResult.gameResult);
      setIsRolling(false);
      setShowGameOverModal(true);
      return;
    }

    // Handle BOUNCE_BACK scenario
    if (moveResult.type === 'BOUNCE_BACK') {
      handleBounceBack(moveResult);
      return;
    }

    // Handle NORMAL movement
    if (moveResult.type === 'NORMAL') {
      handleNormalMove(moveResult);
    }
  }, [
    position,
    budget,
    isRolling,
    gameOver,
    travelData,
    setIsRolling,
    setDice,
    setPosition,
    setBudget,
    setGameOver,
    setGameResult,
    setShowGameOverModal,
    setMoveTip,
    animateMove,
  ]);

  // Helper: Handle bounce back scenario
  const handleBounceBack = useCallback((moveResult) => {
    // Stage 1: Move to max cell
    animateMove(moveResult.firstMove.from, moveResult.firstMove.to);
    const firstAnimDuration = calculateAnimationDuration(
      moveResult.firstMove.to - moveResult.firstMove.from
    );

    setTimeout(() => {
      setPosition(moveResult.firstMove.to);
      setBudget(budget - Math.abs(moveResult.firstMove.to - moveResult.firstMove.from));
      setMoveTip('Bounce back!');
      
      setTimeout(() => setMoveTip(null), ANIMATION_TIMINGS.TIP_BOUNCE_DURATION);

      // Stage 2: Bounce back from max cell
      setTimeout(() => {
        animateMove(moveResult.secondMove.from, moveResult.secondMove.to);
        const secondAnimDuration = calculateAnimationDuration(
          moveResult.secondMove.to - moveResult.secondMove.from
        );

        setTimeout(() => {
          setPosition(moveResult.secondMove.to);
          setBudget(prev => prev - Math.abs(moveResult.secondMove.to - moveResult.secondMove.from));

          // Stage 3: Check special effects
          const specialResult = checkSpecialPosition(moveResult.secondMove.to, travelData);

          if (specialResult.hasEffect) {
            applySpecialEffect(moveResult.secondMove.to, specialResult);
          } else {
            setIsRolling(false);
          }
        }, secondAnimDuration);
      }, ANIMATION_TIMINGS.TRANSITION_DELAY);
    }, firstAnimDuration);
  }, [budget, travelData, animateMove, setPosition, setBudget, setMoveTip, setIsRolling]);

  // Helper: Handle normal movement
  const handleNormalMove = useCallback((moveResult) => {
    animateMove(position, moveResult.moveTo);
    const firstAnimDuration = calculateAnimationDuration(moveResult.moveTo - position);

    setTimeout(() => {
      setPosition(moveResult.moveTo);
      setBudget(moveResult.newBudget);

      // Check if budget is zero
      if (moveResult.newBudget === 0) {
        setGameOver(true);
        setGameResult(GAME_RESULT.LOSE);
        setIsRolling(false);
        setShowGameOverModal(true);
        return;
      }

      // Check for special effects
      const specialResult = checkSpecialPosition(moveResult.moveTo, travelData);

      if (specialResult.hasEffect) {
        applySpecialEffect(moveResult.moveTo, specialResult);
      } else {
        setIsRolling(false);
      }
    }, firstAnimDuration);
  }, [position, travelData, animateMove, setPosition, setBudget, setGameOver, setGameResult, setIsRolling, setShowGameOverModal]);

  // Helper: Apply special effect (wormhole/asteroid)
  const applySpecialEffect = useCallback((currentPos, specialResult) => {
    setMoveTip(specialResult.tip);
    setTimeout(() => setMoveTip(null), ANIMATION_TIMINGS.TIP_DISPLAY_DURATION);

    setTimeout(() => {
      animateMove(currentPos, specialResult.targetPosition);
      const animDuration = calculateAnimationDuration(
        specialResult.targetPosition - currentPos
      );
      
      setTimeout(() => {
        setPosition(specialResult.targetPosition);
        setIsRolling(false);
      }, animDuration);
    }, ANIMATION_TIMINGS.TRANSITION_DELAY);
  }, [animateMove, setMoveTip, setPosition, setIsRolling]);

  return handleDiceRoll;
}
