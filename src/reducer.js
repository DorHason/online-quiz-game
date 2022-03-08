const initialState = {
  welcomeOptions: {
    isLoading: false,
    questionsCategory: "",
    questionsDifficulty: "",
    questionsType: "",
    numberOfQuestions: 5,
  },
  questions: [],
  gameFlow: {
    currentQuestionIndex: 0,
    score: 0,
  },
  bestScore: 0,
};
const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_IS_LOADING":
      return {
        ...state,
        welcomeOptions: {
          ...state.welcomeOptions,
          isLoading: action.value,
        },
      };
    case "CHANGE_CATEGORY":
      return {
        ...state,
        welcomeOptions: {
          ...state.welcomeOptions,
          questionsCategory: action.value,
        },
      };
    case "CHANGE_DIFFICULTY":
      return {
        ...state,
        welcomeOptions: {
          ...state.welcomeOptions,
          questionsDifficulty: action.value,
        },
      };
    case "CHANGE_TYPE":
      return {
        ...state,
        welcomeOptions: {
          ...state.welcomeOptions,
          questionsType: action.value,
        },
      };
    case "CHANGE_AMOUNT":
      return {
        ...state,
        welcomeOptions: {
          ...state.welcomeOptions,
          numberOfQuestions: action.value,
        },
      };
    case "SET_QUESTIONS":
      return {
        ...state,
        questions: action.questions,
      };
    case "SET_CURRENT_QUESTION_INDEX":
      return {
        ...state,
        gameFlow: {
          ...state.gameFlow,
          currentQuestionIndex: action.currentQuestionIndex,
        },
      };

    case "SET_SCORE":
      return {
        ...state,
        gameFlow: {
          ...state.gameFlow,
          score: action.score,
        },
      };
    case "SET_NEW_BEST_SCORE":
      return {
        ...state,
        bestScore: action.score,
      };
    default:
      return state;
  }
};
export default Reducer;
