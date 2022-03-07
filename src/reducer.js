const initialState = {
  welcomeOptions: {
    isLoading: false,
    questionsCategory: "",
    questionsDifficulty: "",
    questionsType: "",
    numberOfQuestions: 5,
  },
  questions: [],
};
const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_IS_LOADING":
      return {
        ...state,
        options: {
          ...state.options,
          isLoading: action.value,
        },
      };
    case "CHANGE_CATEGORY":
      return {
        ...state,
        options: {
          ...state.options,
          questionsCategory: action.value,
        },
      };
    case "CHANGE_DIFFICULTY":
      return {
        ...state,
        options: {
          ...state.options,
          questionsDifficulty: action.value,
        },
      };
    case "CHANGE_TYPE":
      return {
        ...state,
        options: {
          ...state.options,
          questionsType: action.value,
        },
      };
    case "CHANGE_AMOUNT":
      return {
        ...state,
        options: {
          ...state.options,
          numberOfQuestions: action.value,
        },
      };
    case "SET_QUESTIONS":
      return {
        ...state,
        questions: action.questions,
      };
    default:
      return state;
  }
};
export default Reducer;
