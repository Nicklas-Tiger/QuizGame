import React from "react";

const Results = ({ score, questions, onPlayAgain }) => {
  return (
    <div className="container text-center mt-4">
      <h3 className="text-success">Även livets goda tar slut ibland</h3>
      <p className="lead">
        Du svarade rätt på <strong>{score}</strong> av{" "}
        <strong>{questions.length}</strong> frågor!
      </p>
      <button className="btn btn-secondary" onClick={onPlayAgain}>
        Spela igen!
      </button>
    </div>
  );
};

export default Results;
