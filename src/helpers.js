export const getAmountRange = () => {
  return Array(10)
    .fill(null)
    .map((_, i) => i + 1);
};

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

export const getNormalizedAnswersFromQuestion = (question) => {
  if (!question) {
    return null;
  }
  let answers = [...question.incorrect_answers];
  answers.splice(
    getRandomInt(question.incorrect_answers.length),
    0,
    question.correct_answer
  );
  return answers;
};

export const decodeHTML = (html) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

export const calculateScore = (currentScore, timeLeft, questionDifficulty) => {
  let multiplier = 1;
  if (questionDifficulty === "medium") {
    multiplier = 1.5;
  } else if (questionDifficulty === "hard") {
    multiplier = 2;
  }
  return Math.round(currentScore + timeLeft * multiplier);
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
