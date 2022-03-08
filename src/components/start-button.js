import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RETRIEVE_QUESTIONS_BASE_URL } from "../consts";
import {
  changeIsLoadingAction,
  setCurrentQuestionIndexAction,
  setScoreAction,
  setQuestionsAction,
} from "../actions/global-actions.js";

function StartButton(props) {
  const { buttonText } = props;
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const numberOfQuestions = useSelector(
    (state) => state.welcomeOptions.numberOfQuestions
  );
  const questionsCategory = useSelector(
    (state) => state.welcomeOptions.questionsCategory
  );
  const questionsDifficulty = useSelector(
    (state) => state.welcomeOptions.questionsDifficulty
  );
  const questionsType = useSelector(
    (state) => state.welcomeOptions.questionsType
  );
  const currentQuestionIndex = useSelector(
    (state) => state.gameFlow.currentQuestionIndex
  );

  const handleQuery = async () => {
    let retrieveQuestionsURL = `${RETRIEVE_QUESTIONS_BASE_URL}?amount=${numberOfQuestions}`;
    if (questionsCategory.length) {
      retrieveQuestionsURL = retrieveQuestionsURL.concat(
        `&category=${questionsCategory}`
      );
    }
    if (questionsDifficulty.length) {
      retrieveQuestionsURL = retrieveQuestionsURL.concat(
        `&difficulty=${questionsDifficulty}`
      );
    }
    if (questionsType.length) {
      retrieveQuestionsURL = retrieveQuestionsURL.concat(
        `&type=${questionsType}`
      );
    }
    changeIsLoadingAction(dispatch, true);
    await fetch(retrieveQuestionsURL)
      .then((res) => res.json())
      .then((response) => {
        const responseCode = response.response_code;
        if (responseCode === 0) {
          setQuestionsAction(dispatch, response.results);
          changeIsLoadingAction(dispatch, false);
        } else if (responseCode === 1) {
          setErrorMessage(
            "We're sorry, but we don't have enough questions of this type - please choose different settings"
          );
          setTimeout(() => setErrorMessage(null), 5000);
        } else {
          setErrorMessage(
            "We're sorry for the inconvinence, but an error occurred on our side - please try again later"
          );
          setTimeout(() => setErrorMessage(null), 5000);
        }
      });

    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndexAction(dispatch, 0);
      setScoreAction(dispatch, 0);
    }
  };
  return (
    <div>
      <button className="start-button" onClick={handleQuery}>
        {buttonText}
      </button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}
export default StartButton;
