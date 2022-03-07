import React from "react";
import { useSelector } from "react-redux";
import RETRIEVE_QUESTIONS_BASE_URL from "./consts";
import { changeIsLoadingAction } from "./actions/global-actions.js";
import { setQuestionsAction } from "./actions/start-button-actions.js";

function startButton(props) {
  const { buttonText } = props;
  const dispatch = useDispatch();

  const questionsAmount = useSelector((state) => state.options.questionsAmount);
  const questionsCategory = useSelector(
    (state) => state.options.questionsCategory
  );
  const questionsDifficulty = useSelector(
    (state) => state.options.questionsDifficulty
  );
  const questionsType = useSelector((state) => state.options.questionsType);

  const handleQuery = async () => {
    let retrieveQuestionsURL = `${RETRIEVE_QUESTIONS_BASE_URL}?amount=${questionsAmount}`;
    if (questionsCategory.length) {
      apiUrl = apiUrl.concat(`&category=${questionCategory}`);
    }
    if (questionsDifficulty.length) {
      apiUrl = apiUrl.concat(`&difficulty=${questionDifficulty}`);
    }
    if (questionsType.length) {
      apiUrl = apiUrl.concat(`&type=${questionType}`);
    }
    changeIsLoadingAction(dispatch, true);
    await fetch(retrieveQuestionsURL)
      .then((res) => res.json())
      .then((response) => {
        changeIsLoadingAction(dispatch, false);
        setQuestionsAction(dispatch, response.results);
      });
  };
  return <button onClick={handleQuery}>{buttonText}</button>;
}
export default startButton;
