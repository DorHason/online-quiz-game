export const setQuestionsAction = (dispatch, value) => {
  dispatch({
    type: "SET_QUESTIONS",
    questions: value,
  });
};
