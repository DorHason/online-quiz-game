import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setScoreAction, setQuestionsAction } from "../actions/global-actions";
import { setNewBestScoreAction } from "../actions/game-over-actions";
import StartButton from "./start-button";

function GameOver() {
  const [isNewBestScore, setIsNewBestScore] = useState(false);
  const score = useSelector((state) => state.gameFlow.score);
  const bestScore = useSelector((state) => state.bestScore);
  const dispatch = useDispatch();
  const settings = () => {
    setQuestionsAction(dispatch, []);
    setScoreAction(dispatch, 0);
  };
  useEffect(() => {
    if (score > bestScore) {
      setNewBestScoreAction(dispatch, score);
      setIsNewBestScore(true);
    }
  }, [score, bestScore, dispatch]);

  return (
    <div>
      {isNewBestScore && <h1>New Best Score!</h1>}
      <h2>Final Score: {score}</h2>
      <h3>Your Best Score: {bestScore}</h3>
      <StartButton buttonText="New game" />
      <button className="back-to-settings-button" onClick={settings}>
        Back to settings
      </button>
    </div>
  );
}
export default GameOver;
