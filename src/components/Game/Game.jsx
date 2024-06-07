import React, { useState } from 'react';
import './Game.css';

const Game = () => {
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      question: "What is the translation of 'apple'?",
      options: ["яблоко", "апельсин", "банан", "груша"],
      correctAnswer: "яблоко"
    },
    {
      question: "What is the translation of 'orange'?",
      options: ["яблоко", "апельсин", "банан", "груша"],
      correctAnswer: "апельсин"
    },
    {
      question: "What is the translation of 'banana'?",
      options: ["яблоко", "апельсин", "банан", "груша"],
      correctAnswer: "банан"
    }
  ];

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert(`Game over! Your score is ${score}/${questions.length}`);
      setCurrentQuestionIndex(0);
      setScore(0);
    }
  };

  return (
    <div className="game-container">
      <h1>Word Learning Game</h1>
      <p>Engage in interactive games to improve your vocabulary and language skills!</p>
      <div className="quiz-container">
        <h2>{questions[currentQuestionIndex].question}</h2>
        <ul>
          {questions[currentQuestionIndex].options.map((option, index) => (
            <li key={index}>
              <button
                onClick={() => handleAnswerSelect(option)}
                style={{ backgroundColor: selectedAnswer === option ? '#2fb9ce' : '#3cc9d6' }}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
        <button onClick={handleSubmitAnswer} disabled={!selectedAnswer}>
          Submit Answer
        </button>
        {showResult && (
          <div>
            {selectedAnswer === questions[currentQuestionIndex].correctAnswer ? (
              <p>Correct!</p>
            ) : (
              <p>Incorrect. The correct answer is {questions[currentQuestionIndex].correctAnswer}</p>
            )}
            <button onClick={handleNextQuestion}>Next Question</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;
