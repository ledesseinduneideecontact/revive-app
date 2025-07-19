'use client';

import { useState } from 'react';
import Landing from '@/components/landing/Landing';
import Dashboard from '@/components/dashboard/Dashboard';

export default function HomePage() {
  const [showDashboard, setShowDashboard] = useState(false);

  const handleStartOrder = () => {
    setShowDashboard(true);
  };

  const handleBackToLanding = () => {
    setShowDashboard(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className={`transition-all duration-500 ease-in-out ${
        showDashboard ? 'opacity-100' : 'opacity-100'
      }`}>
        {showDashboard ? (
          <Dashboard onBack={handleBackToLanding} />
        ) : (
          <Landing onStartOrder={handleStartOrder} />
        )}
      </div>
    </main>
  );
} 