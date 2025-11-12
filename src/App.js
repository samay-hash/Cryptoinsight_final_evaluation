import React, { useState } from 'react';
import { AuthProvider } from 'src/context/AuthContext';
import Navbar from 'src/components/Navbar';
import PrivateRoute from 'src/components/PrivateRoute';
import Footer from 'src/components/Footer';
import HomePage from 'src/pages/HomePage';
import DashboardPage from 'src/pages/DashboardPage';
import WatchlistPage from 'src/pages/WatchlistPage';
import PortfolioPage from 'src/pages/PortfolioPage';
import LoginPage from 'src/pages/LoginPage';
import SignupPage from 'src/pages/SignupPage';

// --- App ---

export default function App() {

  const [page, setPage] = useState('home');

  const navigate = (targetPage) => {
    setPage(targetPage);
    window.scrollTo(0, 0);  
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-black text-white font-sans">
        <Navbar navigate={navigate} />
        <main className="pt-20">
        
          {(() => {
            switch (page) {
              case 'home':
                return <HomePage navigate={navigate} />;
              case 'dashboard':
                return <PrivateRoute page="dashboard"><DashboardPage /></PrivateRoute>;
              case 'watchlist':
                return <PrivateRoute page="watchlist"><WatchlistPage /></PrivateRoute>;
              case 'portfolio':
                return <PrivateRoute page="portfolio"><PortfolioPage /></PrivateRoute>;
              case 'login':
                return <LoginPage navigate={navigate} />;
              case 'signup':
                return <SignupPage navigate={navigate} />;
              default:
                return <HomePage navigate={navigate} />;
            }
          })()}
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}
