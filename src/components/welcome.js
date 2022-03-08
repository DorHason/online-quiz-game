import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RETRIEVE_CATEGORIES_URL } from "../consts";
import { getAmountRange } from "../helpers";
import StartButton from "./start-button";
import { changeIsLoadingAction } from "../actions/global-actions.js";
import {
  changeCategoryAction,
  changeDifficultyAction,
  changeTypeAction,
  changeAmountAction,
} from "../actions/welcome-actions.js";

function Welcome() {
  const [questions, setQuestions] = useState(null);
  const isLoading = useSelector((state) => state.welcomeOptions.isLoading);
  const questionsCategory = useSelector(
    (state) => state.welcomeOptions.questionsCategory
  );
  const questionsDifficulty = useSelector(
    (state) => state.welcomeOptions.questionsDifficulty
  );
  const questionsType = useSelector(
    (state) => state.welcomeOptions.question_type
  );
  const numberOfQuestions = useSelector(
    (state) => state.welcomeOptions.numberOfQuestions
  );
  const amountRange = getAmountRange();

  const dispatch = useDispatch();

  useEffect(() => {
    changeIsLoadingAction(dispatch, true);

    fetch(RETRIEVE_CATEGORIES_URL)
      .then((res) => res.json())
      .then((response) => {
        setQuestions(response.trivia_categories);
        changeIsLoadingAction(dispatch, false);
      });
  }, [dispatch, setQuestions]);
  const handleCategoryChange = (event) => {
    changeCategoryAction(dispatch, event.target.value);
  };
  const handleDifficultyChange = (event) => {
    changeDifficultyAction(dispatch, event.target.value);
  };
  const handleTypeChange = (event) => {
    changeTypeAction(dispatch, event.target.value);
  };
  const handleAmountChange = (event) => {
    changeAmountAction(dispatch, event.target.value);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  } else {
    return (
      <div>
        <div>
          <h2>Select Category:</h2>
          <select value={questionsCategory} onChange={handleCategoryChange}>
            <option>All</option>
            {questions &&
              questions.map((question) => (
                <option value={question.id} key={question.id}>
                  {question.name}
                </option>
              ))}
          </select>
        </div>

        <div>
          <h2>Select Difficulty:</h2>
          <select value={questionsDifficulty} onChange={handleDifficultyChange}>
            <option value="" key="difficulty-0">
              All
            </option>
            <option value="easy" key="difficulty-1">
              Easy
            </option>
            <option value="medium" key="difficulty-2">
              Medium
            </option>
            <option value="hard" key="difficulty-3">
              Hard
            </option>
          </select>
        </div>

        <div>
          <h2>Select Question Type:</h2>
          <select value={questionsType} onChange={handleTypeChange}>
            <option value="" key="type-0">
              All
            </option>
            <option value="multiple" key="type-1">
              Multiple Choice
            </option>
            <option value="boolean" key="type-2">
              True/False
            </option>
          </select>
        </div>

        <div>
          <h2>Amount of Questions:</h2>
          <select value={numberOfQuestions} onChange={handleAmountChange}>
            {amountRange.map((amount) => (
              <option value={amount} key={amount}>
                {amount}
              </option>
            ))}
          </select>
        </div>

        <StartButton buttonText="Get started!" />
      </div>
    );
  }
}
export default Welcome;
