import React from 'react';
import { TrendingUp, Star, Zap, Target, Award, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface DashboardProps {
  onStartPractice: (type: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onStartPractice }) => {
  const { user } = useAuth();

  const mathCategories = [
    {
      id: 'addition',
      name: 'Addition',
      description: 'Master the art of adding numbers',
      color: 'from-green-400 to-green-600',
      icon: '➕',
      progress: 75,
    },
    {
      id: 'subtraction',
      name: 'Subtraction',
      description: 'Learn to subtract with confidence',
      color: 'from-red-400 to-red-600',
      icon: '➖',
      progress: 60,
    },
    {
      id: 'multiplication',
      name: 'Multiplication',
      description: 'Multiply your way to success',
      color: 'from-blue-400 to-blue-600',
      icon: '✖️',
      progress: 45,
    },
    {
      id: 'division',
      name: 'Division',
      description: 'Divide and conquer math problems',
      color: 'from-purple-400 to-purple-600',
      icon: '➗',
      progress: 30,
    },
  ];

  const stats = [
    { label: 'Current Level', value: user?.level || 1, icon: TrendingUp, color: 'text-blue-600' },
    { label: 'Total Score', value: user?.totalScore || 0, icon: Star, color: 'text-yellow-600' },
    { label: 'Streak', value: '7 days', icon: Zap, color: 'text-orange-600' },
    { label: 'Accuracy', value: '87%', icon: Target, color: 'text-green-600' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}! 👋</h1>
            <p className="text-blue-100 text-lg">Ready to level up your math skills today?</p>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{user?.level}</div>
              <div className="text-sm text-blue-200">Level</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{user?.totalScore}</div>
              <div className="text-sm text-blue-200">Points</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg bg-gray-50 ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Math Categories */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Challenge</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {mathCategories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-200 cursor-pointer group"
              onClick={() => onStartPractice(category.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center text-white text-xl`}>
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-sm">{category.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{category.progress}%</div>
                  <div className="text-xs text-gray-500">Progress</div>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div
                  className={`h-2 rounded-full bg-gradient-to-r ${category.color}`}
                  style={{ width: `${category.progress}%` }}
                ></div>
              </div>
              
              <button className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200 group-hover:bg-gray-100">
                Start Practice →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-2 mb-4">
          <Award className="w-5 h-5 text-yellow-600" />
          <h3 className="text-lg font-semibold text-gray-900">Recent Achievements</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              🏆
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Speed Demon</p>
              <p className="text-xs text-gray-600">Completed 10 problems in under 2 minutes</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              🎯
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Perfect Score</p>
              <p className="text-xs text-gray-600">Got 100% accuracy in Addition Level 3</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;