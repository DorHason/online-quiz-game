import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getNormalizedAnswersFromQuestion,
  decodeHTML,
  calculateScore,
  capitalizeFirstLetter,
} from "../helpers";
import {
  TIME_FOR_QUESTION,
  CORRECT_ANSWER_COLOR,
  WRONG_ANSWER_COLOR,
} from "../consts";
import {
  setScoreAction,
  setCurrentQuestionIndexAction,
} from "../actions/global-actions";

function Question() {
  const [questions, setQuestions] = useState([]);
  const [possibleAnswers, setPossibleAnswers] = useState([]);
  const [timer, setTimer] = useState(TIME_FOR_QUESTION);
  const [timerIndex, setTimerIndex] = useState(null);
  const [earnedScore, setEarnedScore] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

  const dispatch = useDispatch();
  const questionsDifficulty = useSelector(
    (state) => state.welcomeOptions.questionsDifficulty
  );
  const numberOfQuestions = useSelector(
    (state) => state.welcomeOptions.numberOfQuestions
  );
  const score = useSelector((state) => state.gameFlow.score);
  const encodedQuestions = useSelector((state) => state.questions);
  const currentQuestionIndex = useSelector(
    (state) => state.gameFlow.currentQuestionIndex
  );

  useEffect(() => {
    const decodedQuestions = encodedQuestions.map((q) => {
      return {
        ...q,
        question: decodeHTML(q.question),
        correct_answer: decodeHTML(q.correct_answer),
        incorrect_answers: q.incorrect_answers.map((a) => decodeHTML(a)),
      };
    });
    setQuestions(decodedQuestions);
  }, [encodedQuestions]);

  useEffect(() => {
    setTimer(TIME_FOR_QUESTION);
    const intervalId = setInterval(() => setTimer((timer) => timer - 1), 1000);
    setTimerIndex(intervalId);
  }, [currentQuestionIndex]);

  const question = questions[currentQuestionIndex];
  const correctAnswer = question && question.correct_answer;

  useEffect(() => {
    const normalizedAnswers = getNormalizedAnswersFromQuestion(question);
    if (normalizedAnswers) {
      setPossibleAnswers(normalizedAnswers);
    }
  }, [question]);

  const moveToNextQuestion = useCallback(() => {
    setCurrentQuestionIndexAction(dispatch, currentQuestionIndex + 1);
    clearInterval(timerIndex);
  }, [currentQuestionIndex, dispatch, timerIndex]);

  const clearEarnedScoreAsync = useCallback(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const currentTimeoutId = setTimeout(() => setEarnedScore(null), 3000);
    setTimeoutId(currentTimeoutId);
  }, [timeoutId]);

  useEffect(() => {
    if (timer === 0 && currentQuestionIndex + 1 <= questions.length) {
      moveToNextQuestion();
      setEarnedScore("Time out!");
      clearEarnedScoreAsync();
    }
  }, [
    timer,
    currentQuestionIndex,
    questions.length,
    moveToNextQuestion,
    setEarnedScore,
    clearEarnedScoreAsync,
  ]);

  const handleListItemClick = (event) => {
    if (event.target.textContent === correctAnswer) {
      const calculatedScore = calculateScore(score, timer, question.difficulty);
      setScoreAction(dispatch, calculatedScore);
      setEarnedScore(`Correct! +${calculatedScore - score}`);
    } else {
      setEarnedScore("Wrong answer");
    }
    clearEarnedScoreAsync();

    if (currentQuestionIndex + 1 <= questions.length) {
      moveToNextQuestion();
    }
  };

  const getNoticeStyle = () => {
    if (!earnedScore) {
      return;
    }
    let style = { fontWeight: "500" };
    if (earnedScore.includes("Correct")) {
      style.color = CORRECT_ANSWER_COLOR;
    } else {
      style.color = WRONG_ANSWER_COLOR;
    }
    return style;
  };

  if (question) {
    return (
      <div>
        <div>Time: {timer}</div>
        <p>
          Question {currentQuestionIndex + 1} / {numberOfQuestions}
        </p>
        {!questionsDifficulty && (
          <p>Level: {capitalizeFirstLetter(question.difficulty)}</p>
        )}
        <h3>{question.question}</h3>
        <ul>
          {possibleAnswers.map((possibleAnswer, i) => (
            <li key={i} onClick={handleListItemClick}>
              {possibleAnswer}
            </li>
          ))}
        </ul>
        <div>Score: {score}</div>
        {earnedScore && <p style={getNoticeStyle()}>{earnedScore}</p>}
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
}
export default Question;
