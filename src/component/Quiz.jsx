import React, { useState, useEffect } from "react";
import Results from "./Results";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    fetch("/data/Questions.json")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Failed to load questions:", error));
  }, []);

  useEffect(() => {
    if (feedback || isQuizComplete || !hasStarted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 0) {
          return prev - 1;
        }
        clearInterval(timer); // Stoppa timern när tiden är 0
        return prev; // Behåll värdet som 0
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion, feedback, isQuizComplete, hasStarted]);

  useEffect(() => {
    if (timeLeft === 0) {
      setFeedback("timeout");
      setTimeout(() => handleNext(), 2000);
    }
  }, [timeLeft]);

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setFeedback(null);
    setTimeLeft(10);
    setIsQuizComplete(false);
    setScore(0);
    setHasStarted(false);
  };

  const handleOptionClick = (option) => {
    if (feedback) return;
    setSelectedOption(option);
    const isCorrect = option === questions[currentQuestion].answer;
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
    setFeedback(isCorrect ? "correct" : "wrong");
  };

  const handleNext = () => {
    setSelectedOption(null);
    setFeedback(null);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setTimeLeft(10);
    } else {
      setIsQuizComplete(true);
    }
  };

  if (!hasStarted) {
    return (
      <div className="container text-center mt-5">
        <h1 className="display-4">
          <strong>Tigers Quiz</strong>
        </h1>
        <h2 className="mt-3">All lycka och välfärd</h2>
        <button
          className="btn btn-secondary btn-lg mt-3"
          onClick={() => setHasStarted(true)}
        >
          Starta Quiz
        </button>
      </div>
    );
  }

  if (questions.length === 0) {
    return <p className="text-center">Loading questions...</p>;
  }

  if (isQuizComplete) {
    return (
      <Results score={score} questions={questions} onPlayAgain={resetQuiz} />
    );
  }

  return (
    <div className="container mt-4">
      <h3 className="text-center">
        Fråga {currentQuestion + 1} av {questions.length}
      </h3>
      <p className="text-center text-primary">
        Tid kvar: <strong>{timeLeft} sek</strong>
      </p>
      <p className="lead">
        <strong>{questions[currentQuestion].question}</strong>
      </p>
      <div className="list-group">
        {questions[currentQuestion].options.map((option) => (
          <button
            key={option}
            onClick={() => handleOptionClick(option)}
            className={`list-group-item list-group-item-action ${
              feedback && option === questions[currentQuestion].answer
                ? "list-group-item-success"
                : feedback && option === selectedOption
                ? "list-group-item-danger"
                : ""
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      <button
        onClick={handleNext}
        className={`btn btn-secondary mt-3 ${!feedback ? "hidden" : ""}`}
      >
        {currentQuestion < questions.length - 1
          ? "Nästa fråga"
          : "Avsluta quiz"}
      </button>
    </div>
  );
};

export default Quiz;
