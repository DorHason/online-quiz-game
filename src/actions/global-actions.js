export const changeIsLoadingAction = (dispatch, value) => {
  dispatch({
    type: "CHANGE_LOADING",
    loading: value,
  });
};

export const setCurrentQuestionIndexAction = (
  dispatch,
  currentQuestionIndex
) => {
  dispatch({
    type: "SET_CURRENT_QUESTION_INDEX",
    currentQuestionIndex,
  });
};

export const setScoreAction = (dispatch, score) => {
  dispatch({
    type: "SET_SCORE",
    score: score,
  });
};

export const setQuestionsAction = (dispatch, questions) => {
  dispatch({
    type: "SET_QUESTIONS",
    questions,
  });
};
