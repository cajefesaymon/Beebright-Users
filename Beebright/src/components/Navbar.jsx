import React, { useState } from 'react';
import logo from '../assets/beebrightlogo.jpg';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ onGetStarted, onLogin }) => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src={logo} alt="BeeBright" className="w-8 h-8 object-contain" />
            <span className="font-bold text-2xl bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
              BeeBright
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-700 hover:text-amber-600 font-semibold transition">
              Features
            </a>
            <a href="#about" className="text-gray-700 hover:text-amber-600 font-semibold transition">
              About
            </a>
            <a href="#contact" className="text-gray-700 hover:text-amber-600 font-semibold transition">
              Contact
            </a>
            
            {user ? (
              <div className="flex items-center gap-4">
                <div className="text-gray-700 font-semibold">
                  Welcome, {user.firstName} {user.lastName} 👋
                </div>
                <button
                  onClick={logout}
                  className="bg-gray-500 text-white px-6 py-2 rounded-xl font-semibold hover:bg-gray-600 transition shadow-md"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                {/* Login Button */}
                <button
                  onClick={onLogin}
                  className="bg-blue-500 text-white px-6 py-2 rounded-xl font-semibold hover:bg-blue-600 transition shadow-md"
                >
                  🔐 Login
                </button>
                
                {/* Get Started Button */}
                <button
                  onClick={onGetStarted}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition"
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <a 
              href="#features" 
              className="block text-gray-700 hover:text-amber-600 font-semibold transition py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#about" 
              className="block text-gray-700 hover:text-amber-600 font-semibold transition py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="#contact" 
              className="block text-gray-700 hover:text-amber-600 font-semibold transition py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
            
            {user ? (
              <>
                <div className="text-gray-700 font-semibold py-2">
                  Welcome, {user.firstName} {user.lastName} 👋
                </div>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-gray-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-600 transition shadow-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* Mobile Login Button */}
                <button
                  onClick={() => {
                    onLogin();
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition shadow-md"
                >
                  🔐 Login
                </button>
                
                {/* Mobile Get Started Button */}
                <button
                  onClick={() => {
                    onGetStarted();
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition"
                >
                  Get Started
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;