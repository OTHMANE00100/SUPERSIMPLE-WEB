import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Star, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { MathProblem } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface PracticeSessionProps {
  type: string;
  onBack: () => void;
}

const PracticeSession: React.FC<PracticeSessionProps> = ({ type, onBack }) => {
  const { user, updateUser } = useAuth();
  const [currentProblem, setCurrentProblem] = useState<MathProblem | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const generateProblem = (): MathProblem => {
    const level = user?.level || 1;
    const maxNumber = Math.min(10 + level * 5, 100);
    
    let operand1, operand2, correctAnswer;
    
    switch (type) {
      case 'addition':
        operand1 = Math.floor(Math.random() * maxNumber) + 1;
        operand2 = Math.floor(Math.random() * maxNumber) + 1;
        correctAnswer = operand1 + operand2;
        break;
      case 'subtraction':
        operand1 = Math.floor(Math.random() * maxNumber) + 1;
        operand2 = Math.floor(Math.random() * operand1) + 1;
        correctAnswer = operand1 - operand2;
        break;
      case 'multiplication':
        operand1 = Math.floor(Math.random() * Math.min(12, level + 2)) + 1;
        operand2 = Math.floor(Math.random() * Math.min(12, level + 2)) + 1;
        correctAnswer = operand1 * operand2;
        break;
      case 'division':
        correctAnswer = Math.floor(Math.random() * Math.min(12, level + 2)) + 1;
        operand2 = Math.floor(Math.random() * Math.min(12, level + 2)) + 1;
        operand1 = correctAnswer * operand2;
        break;
      default:
        operand1 = 1;
        operand2 = 1;
        correctAnswer = 2;
    }

    return {
      id: Date.now().toString(),
      type: type as any,
      operand1,
      operand2,
      correctAnswer,
      difficulty: level,
    };
  };

  const getOperatorSymbol = (type: string) => {
    switch (type) {
      case 'addition': return '+';
      case 'subtraction': return '-';
      case 'multiplication': return '×';
      case 'division': return '÷';
      default: return '+';
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setCurrentProblem(generateProblem());
    setTimeLeft(60);
  };

  const handleSubmit = () => {
    if (!currentProblem || !userAnswer) return;

    const answer = parseInt(userAnswer);
    const correct = answer === currentProblem.correctAnswer;
    
    setIsCorrect(correct);
    setShowFeedback(true);
    
    if (correct) {
      setScore(score + 10 + (user?.level || 1) * 2);
      setCorrectAnswers(correctAnswers + 1);
    }
    
    setQuestionCount(questionCount + 1);
    
    setTimeout(() => {
      if (timeLeft > 0 && questionCount < 9) {
        setCurrentProblem(generateProblem());
        setUserAnswer('');
        setShowFeedback(false);
      } else {
        endGame();
      }
    }, 1500);
  };

  const endGame = () => {
    setGameEnded(true);
    const accuracy = questionCount > 0 ? (correctAnswers / questionCount) * 100 : 0;
    
    if (user) {
      const newTotalScore = (user.totalScore || 0) + score;
      const shouldLevelUp = accuracy >= 80 && correctAnswers >= 8;
      
      updateUser({
        totalScore: newTotalScore,
        level: shouldLevelUp ? (user.level || 1) + 1 : user.level,
      });
    }
  };

  const resetGame = () => {
    setScore(0);
    setQuestionCount(0);
    setCorrectAnswers(0);
    setTimeLeft(60);
    setGameStarted(false);
    setGameEnded(false);
    setShowFeedback(false);
    setUserAnswer('');
    setCurrentProblem(null);
  };

  useEffect(() => {
    if (gameStarted && timeLeft > 0 && !gameEnded) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !gameEnded) {
      endGame();
    }
  }, [timeLeft, gameStarted, gameEnded]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !showFeedback) {
      handleSubmit();
    }
  };

  if (!gameStarted) {
    return (
      <div className="max-w-2xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl text-white">{getOperatorSymbol(type)}</span>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4 capitalize">
            {type} Challenge
          </h1>
          
          <p className="text-gray-600 mb-8 text-lg">
            Test your {type} skills! You'll have 60 seconds to solve as many problems as possible.
            Get ready to boost your math abilities!
          </p>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">60s</div>
              <div className="text-sm text-gray-600">Time Limit</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">10</div>
              <div className="text-sm text-gray-600">Max Questions</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">Level {user?.level}</div>
              <div className="text-sm text-gray-600">Difficulty</div>
            </div>
          </div>

          <button
            onClick={startGame}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
          >
            Start Practice Session
          </button>
        </div>
      </div>
    );
  }

  if (gameEnded) {
    const accuracy = questionCount > 0 ? Math.round((correctAnswers / questionCount) * 100) : 0;
    const performance = accuracy >= 90 ? 'Excellent!' : accuracy >= 70 ? 'Good Job!' : 'Keep Practicing!';
    
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Session Complete!</h1>
          <p className="text-xl text-gray-600 mb-8">{performance}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{score}</div>
              <div className="text-sm text-gray-600">Points Earned</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{correctAnswers}</div>
              <div className="text-sm text-gray-600">Correct</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{questionCount}</div>
              <div className="text-sm text-gray-600">Total Questions</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{accuracy}%</div>
              <div className="text-sm text-gray-600">Accuracy</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={resetGame}
              className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Try Again</span>
            </button>
            <button
              onClick={onBack}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit</span>
        </button>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-lg">
            <Clock className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">{timeLeft}s</span>
          </div>
          <div className="flex items-center space-x-2 bg-yellow-50 px-3 py-1 rounded-lg">
            <Star className="w-4 h-4 text-yellow-600" />
            <span className="text-sm font-medium text-yellow-900">{score}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="text-center mb-8">
          <div className="text-sm text-gray-500 mb-2">
            Question {questionCount + 1} of 10
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div
              className="h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-300"
              style={{ width: `${((questionCount) / 10) * 100}%` }}
            ></div>
          </div>
        </div>

        {currentProblem && (
          <div className="text-center">
            <div className="text-5xl font-bold text-gray-900 mb-8 space-x-4">
              <span>{currentProblem.operand1}</span>
              <span className="text-gray-400">{getOperatorSymbol(type)}</span>
              <span>{currentProblem.operand2}</span>
              <span className="text-gray-400">=</span>
              <span className="text-blue-600">?</span>
            </div>

            <div className="max-w-xs mx-auto">
              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Your answer"
                className="w-full px-4 py-3 text-2xl text-center border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200"
                disabled={showFeedback}
                autoFocus
              />
              
              {!showFeedback && (
                <button
                  onClick={handleSubmit}
                  disabled={!userAnswer}
                  className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Answer
                </button>
              )}
            </div>

            {showFeedback && (
              <div className={`mt-6 p-4 rounded-xl ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
                <div className="flex items-center justify-center space-x-2">
                  {isCorrect ? (
                    <>
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <span className="text-lg font-semibold text-green-800">Correct!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-6 h-6 text-red-600" />
                      <span className="text-lg font-semibold text-red-800">
                        Incorrect. The answer is {currentProblem.correctAnswer}
                      </span>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PracticeSession;