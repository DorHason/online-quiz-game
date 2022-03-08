import { useSelector } from "react-redux";
import backgroundImg from "./assets/background-image.jpg";
import Welcome from "./components/welcome";
import Question from "./components/question";
import GameOver from "./components/game-over";

import "./App.css";

function App() {
  const questions = useSelector((state) => state.questions);
  const currentQuestionIndex = useSelector(
    (state) => state.gameFlow.currentQuestionIndex
  );

  let component;

  if (questions.length && currentQuestionIndex + 1 <= questions.length) {
    component = <Question />;
  } else if (!questions.length) {
    component = <Welcome />;
  } else {
    component = <GameOver />;
  }

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
      }}
    >
      <div className="app-container">{component}</div>
    </div>
  );
}

export default App;
