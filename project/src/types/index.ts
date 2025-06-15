export interface User {
  id: string;
  name: string;
  email: string;
  level: number;
  totalScore: number;
  subscription: 'free' | 'premium';
  createdAt: Date;
}

export interface MathProblem {
  id: string;
  type: 'addition' | 'subtraction' | 'multiplication' | 'division';
  operand1: number;
  operand2: number;
  correctAnswer: number;
  difficulty: number;
}

export interface GameSession {
  id: string;
  userId: string;
  type: string;
  level: number;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  completedAt: Date;
}

export interface UserProgress {
  userId: string;
  level: number;
  totalXP: number;
  streak: number;
  lastActivity: Date;
  categoryProgress: {
    addition: number;
    subtraction: number;
    multiplication: number;
    division: number;
  };
}