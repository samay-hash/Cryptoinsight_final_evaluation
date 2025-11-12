import React, { useState } from 'react';
import { DollarSign, BarChart2, Eye, User, LogIn, LogOut, ArrowRight, Trash2, Plus, Search, ChevronDown, ChevronUp, Menu, X } from 'lucide-react';
import { useAuth } from 'src/context/AuthContext';

// --- Navigation ---
function Navbar({ navigate }) {
  const { isAuthenticated, logout, user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNav = (page) => {
    navigate(page);
    setIsMobileMenuOpen(false);
  };

  const NavLinks = ({ isMobile }) => (
    <>
      <button onClick={() => handleNav('home')} className={`px-3 py-2 rounded-md text-sm font-medium ${isMobile ? 'block' : ''} hover:bg-gray-800`}>Home</button>
      {isAuthenticated && (
        <>
          <button onClick={() => handleNav('dashboard')} className={`px-3 py-2 rounded-md text-sm font-medium ${isMobile ? 'block' : ''} hover:bg-gray-800`}>Dashboard</button>
          <button onClick={() => handleNav('watchlist')} className={`px-3 py-2 rounded-md text-sm font-medium ${isMobile ? 'block' : ''} hover:bg-gray-800`}>Watchlist</button>
          <button onClick={() => handleNav('portfolio')} className={`px-3 py-2 rounded-md text-sm font-medium ${isMobile ? 'block' : ''} hover:bg-gray-800`}>Portfolio</button>
        </>
      )}
    </>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black bg-opacity-80 backdrop-blur-md border-b border-gray-900 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <button onClick={() => handleNav('home')} className="flex items-center space-x-2">
              <DollarSign className="h-8 w-8 text-green-400" />
              <span className="text-2xl font-bold text-white">Crypto<span className="text-green-400">Insight</span></span>
            </button>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLinks isMobile={false} />
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                <span className="text-gray-400 text-sm">{user.email}</span>
                <button
                  onClick={logout}
                  className="flex items-center bg-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleNav('login')}
                  className="bg-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleNav('signup')}
                  className="bg-green-500 text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-400 transition-colors"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLinks isMobile={true} />
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            {isAuthenticated ? (
              <div className="flex flex-col items-start px-5 space-y-3">
                <span className="text-gray-400 text-base">{user.email}</span>
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left flex items-center bg-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col px-4 space-y-2">
                <button
                  onClick={() => handleNav('login')}
                  className="w-full text-left bg-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleNav('signup')}
                  className="w-full text-left bg-green-500 text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-400 transition-colors"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
