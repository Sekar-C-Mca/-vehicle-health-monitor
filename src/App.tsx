import React, { useState } from 'react';
import { HomePage } from './components/HomePage';
import { Dashboard } from './components/Dashboard';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'dashboard'>('home');

  const navigateTo = (page: 'home' | 'dashboard') => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen">
      {currentPage === 'home' ? (
        <HomePage onNavigate={navigateTo} />
      ) : (
        <Dashboard onNavigate={navigateTo} />
      )}
    </div>
  );
}

export default App;