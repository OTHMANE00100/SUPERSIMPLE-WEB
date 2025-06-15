import React from 'react';
import { TrendingUp, Calendar, Target, Award, Clock, BarChart3, Zap, Trophy } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const ProgressTracker: React.FC = () => {
  const { user } = useAuth();

  // Mock data for demonstration
  const weeklyProgress = [
    { day: 'Mon', score: 85, problems: 12 },
    { day: 'Tue', score: 92, problems: 15 },
    { day: 'Wed', score: 78, problems: 10 },
    { day: 'Thu', score: 95, problems: 18 },
    { day: 'Fri', score: 88, problems: 14 },
    { day: 'Sat', score: 90, problems: 16 },
    { day: 'Sun', score: 87, problems: 13 },
  ];

  const categoryProgress = [
    { name: 'Addition', level: 8, progress: 75, accuracy: 92, totalProblems: 145 },
    { name: 'Subtraction', level: 6, progress: 60, accuracy: 88, totalProblems: 120 },
    { name: 'Multiplication', level: 5, progress: 45, accuracy: 85, totalProblems: 95 },
    { name: 'Division', level: 4, progress: 30, accuracy: 82, totalProblems: 80 },
  ];

  const achievements = [
    { id: 1, title: 'Speed Demon', description: 'Solved 10 problems in under 2 minutes', icon: '⚡', earned: true, date: '2 days ago' },
    { id: 2, title: 'Perfect Week', description: 'Practiced every day this week', icon: '🏆', earned: true, date: '1 week ago' },
    { id: 3, title: 'Multiplication Master', description: 'Reached level 10 in multiplication', icon: '🎯', earned: false, date: null },
    { id: 4, title: 'Century Club', description: 'Solved 100 problems in a single session', icon: '💯', earned: false, date: null },
  ];

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'from-green-400 to-green-600';
    if (progress >= 60) return 'from-yellow-400 to-yellow-600';
    if (progress >= 40) return 'from-orange-400 to-orange-600';
    return 'from-red-400 to-red-600';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-700 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Your Progress</h1>
            <p className="text-purple-100 text-lg">Track your mathematical journey</p>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <div className="text-center">
              <div className="text-3xl font-bold">{user?.level}</div>
              <div className="text-sm text-purple-200">Current Level</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{user?.totalScore}</div>
              <div className="text-sm text-purple-200">Total Points</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-lg bg-blue-50">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">24</p>
              <p className="text-sm text-gray-600">Sessions This Week</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-lg bg-green-50">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">89%</p>
              <p className="text-sm text-gray-600">Average Accuracy</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-lg bg-orange-50">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-sm text-gray-600">Day Streak</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-lg bg-purple-50">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">+15%</p>
              <p className="text-sm text-gray-600">Improvement</p>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Progress Chart */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Weekly Performance</h3>
        <div className="space-y-4">
          {weeklyProgress.map((day, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-12 text-sm font-medium text-gray-600">{day.day}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-700">Score: {day.score}%</span>
                  <span className="text-gray-500">{day.problems} problems</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full bg-gradient-to-r ${getProgressColor(day.score)} transition-all duration-300`}
                    style={{ width: `${day.score}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Progress */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Skills Progress</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {categoryProgress.map((category, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-900">{category.name}</h4>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">Level {category.level}</div>
                  <div className="text-xs text-gray-500">{category.totalProblems} problems</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium">{category.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full bg-gradient-to-r ${getProgressColor(category.progress)}`}
                    style={{ width: `${category.progress}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between text-sm pt-2">
                  <span className="text-gray-600">Accuracy</span>
                  <span className="font-medium text-green-600">{category.accuracy}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-2 mb-6">
          <Trophy className="w-5 h-5 text-yellow-600" />
          <h3 className="text-lg font-semibold text-gray-900">Achievements</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                achievement.earned
                  ? 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100'
                  : 'bg-gray-50 border-gray-200 opacity-60'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`text-2xl ${achievement.earned ? '' : 'grayscale'}`}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <h4 className={`font-semibold ${achievement.earned ? 'text-gray-900' : 'text-gray-500'}`}>
                    {achievement.title}
                  </h4>
                  <p className={`text-sm ${achievement.earned ? 'text-gray-600' : 'text-gray-400'}`}>
                    {achievement.description}
                  </p>
                  {achievement.earned && achievement.date && (
                    <p className="text-xs text-yellow-600 mt-1">Earned {achievement.date}</p>
                  )}
                </div>
                {achievement.earned && (
                  <div className="text-yellow-500">
                    <Award className="w-5 h-5" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;