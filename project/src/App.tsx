import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import PracticeSession from './components/PracticeSession';
import ProgressTracker from './components/ProgressTracker';
import SubscriptionPlan from './components/SubscriptionPlan';
import AuthScreen from './components/AuthScreen';

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState('dashboard');
  const [practiceType, setPracticeType] = useState<string | null>(null);

  const handleStartPractice = (type: string) => {
    setPracticeType(type);
    setCurrentView('practice');
  };

  const handleBackToDashboard = () => {
    setPracticeType(null);
    setCurrentView('dashboard');
  };

  if (!user) {
    return <AuthScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'dashboard' && (
          <Dashboard onStartPractice={handleStartPractice} />
        )}
        
        {currentView === 'practice' && practiceType && (
          <PracticeSession 
            type={practiceType} 
            onBack={handleBackToDashboard} 
          />
        )}
        
        {currentView === 'progress' && (
          <ProgressTracker />
        )}
        
        {currentView === 'subscription' && (
          <SubscriptionPlan />
        )}
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;