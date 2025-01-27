import "bootstrap/dist/css/bootstrap.min.css";
import QuizGame from "./component/Quiz";
import "./App.css";
import plHuvud from "./images/PLHuvud.png";

function App() {
  return (
    <div>
      <div className="anim_gradient"></div>
      <div>
        <img
          src={plHuvud}
          alt="PL Huvud"
          className="img-fluid mx-auto d-block mt-3 custom-image"
        />
        <QuizGame />
      </div>
    </div>
  );
}

export default App;
