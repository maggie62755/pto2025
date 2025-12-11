import React, { useState, useRef, useMemo, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Game.css";
import { getTravelData } from "./travelData";
import GameBoard from "./components/GameBoard";
import PlayerInfoCard from "./components/PlayerInfoCard";
import DiceCard from "./components/DiceCard";
import CurrentCellCard from "./components/CurrentCellCard";
import GameOverModal from "./components/GameOverModal";
import {
  ANIMATION_TIMINGS,
  GAME_RESULT,
  EXCLUDED_ACTIVITIES,
} from "./constants/gameConstants";
import { useDiceRoll } from "./hooks/useDiceRoll";

const Game = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const playerName = location.state?.playerName || "";
  const initialBudget = Number(location.state?.budget) || 100;
  const [budget, setBudget] = useState(initialBudget);
  const [position, setPosition] = useState(1); // 1~36
  const [dice, setDice] = useState(null);
  const [isRolling, setIsRolling] = useState(false);
  const [travelData, setTravelData] = useState([]);
  const [path, setPath] = useState([]); // 新增: 儲存移動路徑
  const [hoverCell, setHoverCell] = useState(null);
  const [moveTip, setMoveTip] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [visitedLocations, setVisitedLocations] = useState([]);
  const [gameResult, setGameResult] = useState(null); // 'win' or 'lose'
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const animTimeout = useRef(null);

  React.useEffect(() => {
    getTravelData().then(setTravelData);
  }, []);

  // 追蹤訪問過的景點
  React.useEffect(() => {
    if (position > 1) {
      const cellData = getCellData(position);
      if (cellData && cellData.activity) {
        setVisitedLocations((prev) => [
          ...prev,
          {
            num: cellData.num,
            name: cellData.name,
            activity: cellData.activity,
            location: cellData.location,
          },
        ]);
      }
    }
  }, [position, travelData]);

  const getCellData = useCallback(
    (cellNum) => {
      return travelData.find((d) => d.num === cellNum);
    },
    [travelData]
  );

  const cellInfo = (cell) => {
    const data = getCellData(cell);
    if (!data) return `You are on cell #${cell}.`;
    // return `${data.name} - ${data.activity}`;
    return `${data.activity}`;
  };

  // 動畫移動路徑
  const animateMove = useCallback((from, to) => {
    if (from === to) return;
    const step = from < to ? 1 : -1;
    let cur = from;
    setPath([from]);
    function nextStep() {
      cur += step;
      setPath((prev) => [...prev, cur]);
      if (cur !== to) {
        animTimeout.current = setTimeout(
          nextStep,
          ANIMATION_TIMINGS.STEP_DURATION
        );
      } else {
        setTimeout(() => setPath([]), ANIMATION_TIMINGS.PATH_CLEAR_DELAY);
      }
    }
    animTimeout.current = setTimeout(nextStep, ANIMATION_TIMINGS.STEP_DURATION);
  }, []);

  React.useEffect(() => {
    return () => {
      if (animTimeout.current) clearTimeout(animTimeout.current);
    };
  }, []);

  const currentCellData = getCellData(position);

  // restart 遊戲
  const handleRestart = useCallback(() => {
    setPosition(1);
    setDice(null);
    setPath([]);
    setMoveTip(null);
    setBudget(initialBudget);
    setGameOver(false);
    setVisitedLocations([]);
    setGameResult(null);
    setShowGameOverModal(false);
  }, [initialBudget]);

  // 回到登入
  const handleBackToLogin = useCallback(() => {
    navigate("/");
  }, [navigate]);

  // Use custom hook for dice roll logic
  const handleDiceRoll = useDiceRoll({
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
  });

  return (
    <div className="game-root">
      <GameOverModal
        show={showGameOverModal}
        gameResult={gameResult}
        playerName={playerName}
        position={position}
        budget={budget}
        visitedLocations={visitedLocations}
        onRestart={handleRestart}
        onBackToLogin={handleBackToLogin}
      />
      {moveTip && <div className="move-tip-anim">{moveTip}</div>}
      <h1 id="heading">Welcome Aboard! </h1>
      <div className="game-main-layout">
        <div className="game-board-section">
          <GameBoard
            position={position}
            path={path}
            hoverCell={hoverCell}
            setHoverCell={setHoverCell}
            travelData={travelData}
            getCellData={getCellData}
          />
          <div className="game-board-buttons">
            <button className="btn restart-btn" onClick={handleRestart}>
              Restart
            </button>
            <button className="btn back-btn" onClick={handleBackToLogin}>
              Back to Login
            </button>
          </div>
        </div>
        <div className="game-side-panel">
          <div className="side-row-flex">
            <PlayerInfoCard playerName={playerName} budget={budget} />
            <DiceCard
              isRolling={isRolling || gameOver}
              onRoll={handleDiceRoll}
            />
          </div>
          <CurrentCellCard
            position={position}
            cellInfo={cellInfo}
            currentCellData={currentCellData}
          />
        </div>
      </div>
    </div>
  );
};

export default Game;
