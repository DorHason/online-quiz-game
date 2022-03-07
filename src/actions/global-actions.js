export const changeIsLoadingAction = (dispatch, value) => {
  dispatch({
    type: "CHANGE_LOADING",
    loading: value,
  });
};
