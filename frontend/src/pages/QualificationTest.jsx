import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const QualificationTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([{options: []}]);
  const [answers, setAnswers] = useState({});
  const [showExplanation, setShowExplanation] = useState(false);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    console.log(token)
    const response = await axios.get("http://localhost:5000/profile", {
        headers: { Authorization: `Bearer ${token}` },
    });
    setCurrentUser(response.data.user);
    console.log(response.data.user)
  };

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/qualification/test');
      setQuestions(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleAnswer = (index) => {
    setAnswers({ ...answers, [currentQuestion]: index });
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    } else {
      handleSubmit();
    }
  };

  useEffect(() => {
    fetchUser();
    fetchQuestions();
  }, []);

  const handleSubmit = async () => {
    try {
      console.log(answers)
      const response = await axios.post('http://localhost:5000/api/qualification/submit', {
        userId: currentUser._id,
        answers
      });
      console.log(response.data)
      if (response.data.passed) {
        alert('Congratulations! You have passed the qualification test and we welcome you as a companion!');
        navigate('/')
      } else {
        navigate('/training-program');
      }
    } catch (error) {
      console.error('Error submitting test:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Companion Qualification Test</h2>
      {questions[currentQuestion] && (
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="font-semibold mb-4">{questions[currentQuestion].question}</p>
          <div className="space-y-2">
          {questions?.[currentQuestion]?.options?.map((option, index) => (
  <button
    key={index}
    onClick={() => handleAnswer(index)}
    className={`w-full p-3 text-left rounded 
      ${answers[currentQuestion] === index ? 'bg-blue-100' : 'bg-gray-50'}
      ${showExplanation && index === questions[currentQuestion].correctAnswer ? 'bg-green-100' : ''}
      ${showExplanation && answers[currentQuestion] === index && index !== questions[currentQuestion].correctAnswer ? 'bg-red-100' : ''}`}
    disabled={showExplanation}
  >
    {option}
  </button>
))}
          </div>
          {showExplanation && (
            <div className="mt-4 p-4 bg-gray-50 rounded">
              <p className="font-semibold">Explanation:</p>
              <p>{questions[currentQuestion].explanation}</p>
              <button
                onClick={nextQuestion}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Test'}
              </button>
            </div>
          )}
          <div className="mt-4 text-gray-500">
            Question {currentQuestion + 1} of {questions.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default QualificationTest;
