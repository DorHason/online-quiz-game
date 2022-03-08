export const setNewBestScoreAction = (dispatch, score) => {
  dispatch({
    type: "SET_NEW_BEST_SCORE",
    score: score,
  });
};
