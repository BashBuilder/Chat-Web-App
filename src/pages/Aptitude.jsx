import { Button } from "@/components/ui/button"
import { useState, useEffect } from 'react';
import "../styles/aptitude.css"

const questions = [
  {
    question: 'What is the capital of France?',
    options: ['Berlin', 'London', 'Paris', 'Madrid'],
    correctAnswer: 'Paris'
  },
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Mars', 'Earth', 'Jupiter', 'Venus'],
    correctAnswer: 'Mars'
  },
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Mars', 'Earth', 'Jupiter', 'Venus'],
    correctAnswer: 'Mars'
  },
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Mars', 'Earth', 'Jupiter', 'Venus'],
    correctAnswer: 'Mars'
  },
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Mars', 'Earth', 'Jupiter', 'Venus'],
    correctAnswer: 'Mars'
  },
  // Add more questions here...
];

export default function Aptitude() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(questions.map(() => ""));
  // const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(''));
  const [remainingTime, setRemainingTime] = useState(180); // 3 minutes in seconds
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);


  let timer; 

  useEffect(() => {
    if (remainingTime === 0) {
      handleSubmit();
    }

    timer = setInterval(() => {
      setRemainingTime(prevTime => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(timer); // Stop the timer
          handleSubmit();
          return 0;
        }
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [remainingTime]);

  const handleOptionSelect = (selectedOption) => {
    if (!isSubmitted) {
      const updatedUserAnswers = [...userAnswers];
      updatedUserAnswers[currentQuestionIndex] = selectedOption;
      setUserAnswers(updatedUserAnswers);

      if (selectedOption === currentQuestion.correctAnswer) {
        setScore(prevScore => prevScore + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    clearInterval(timer); // Stop the timer
    setIsSubmitted(true);
    alert(`Your score: ${score} out of ${questions.length}`);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="app">
      <h1>Aptitude Test</h1>
      <div className="timer">
        Time Remaining: {Math.floor(remainingTime / 60)}:{remainingTime % 60}
      </div>
      <div className="question-container">
        <h2>Question {currentQuestionIndex + 1}:</h2>
        <p>{currentQuestion.question}</p>
        <ul>
          {currentQuestion.options.map((option, index) => (
            <li
              key={index}
              // className={`option ${
              //   isSubmitted && userAnswers[currentQuestionIndex] === option
              //     ? currentQuestion.correctAnswer === option
              //       ? 'correct'
              //       : 'incorrect'
              //     : ''
              // }`}
              className={`option ${
                isSubmitted
                  ? userAnswers[currentQuestionIndex] === option
                    ? 'chosen'
                    : currentQuestion.correctAnswer === option
                    ? 'correct'
                    : ''
                  : ''
              }`}
            >
              <label>
                <input
                  type="radio"
                  name="option"
                  value={option}
                  checked={userAnswers[currentQuestionIndex] === option}
                  onChange={() => handleOptionSelect(option)}
                  disabled={isSubmitted}
                />
                {option}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="button-container flex justify-center gap-8">
        <Button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
          Previous
        </Button>
        <Button onClick={handleNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>
          Next
        </Button>
        <Button onClick={handleSubmit} disabled={isSubmitted}>
          Submit
        </Button>
      </div>
      <div className="score">
        {isSubmitted && <p>Your score: {score} out of {questions.length}</p>}
      </div>
    </div>
  );
}