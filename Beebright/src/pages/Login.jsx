import React, { useState } from 'react';
// Remove this line:
// import logo from '../assets/beebrightlogo.jpg';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from 'lucide-react';

const Login = ({ onBack, onForgotPassword }) => {
  const { login, showNotification } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Mock user database - In real app, this would be an API call
  const mockUsers = {
    'alex@student.com': { 
      password: 'student123', 
      role: 'student', 
      name: 'Alex Chen', 
      grade: 'Grade 5', 
      avatar: '🧒' 
    },
    'emma@student.com': { 
      password: 'student123', 
      role: 'student', 
      name: 'Emma Chen', 
      grade: 'Grade 3', 
      avatar: '👧' 
    },
    'parent@beebright.com': { 
      password: 'parent123', 
      role: 'parent', 
      name: 'Mrs. Chen', 
      avatar: '👩' 
    },
    'tutor@beebright.com': { 
      password: 'tutor123', 
      role: 'tutor', 
      name: 'Ms. Garcia', 
      avatar: '👩‍🏫' 
    },
    'admin@beebright.com': { 
      password: 'admin123', 
      role: 'admin', 
      name: 'Admin User', 
      avatar: '👨‍💼' 
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call delay
    setTimeout(() => {
      const user = mockUsers[formData.email];

      if (!user) {
        setError('Email not found. Please check your email address or contact admin.');
        setIsLoading(false);
        return;
      }

      if (user.password !== formData.password) {
        setError('Incorrect password. Please try again.');
        setIsLoading(false);
        return;
      }

      // Login successful - redirect based on role
      login({
        email: formData.email,
        role: user.role,
        name: user.name,
        grade: user.grade,
        avatar: user.avatar
      });

      showNotification('Logged in successfully', 'success');

      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-neutral-600 hover:text-primary-600 mb-6 transition"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </button>
        )}

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-neutral-100">
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4 animate-float">🐝</div>
            <h1 className="font-display font-bold text-3xl text-neutral-900 mb-2">
              Welcome Back!
            </h1>
            <p className="text-neutral-600">Login to access your dashboard</p>
          </div>

          {/* Demo Credentials Info */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6">
            <div className="font-semibold text-blue-900 mb-2">🔐 Demo Accounts:</div>
            <div className="text-sm text-blue-800 space-y-1">
              <div><strong>Student:</strong> alex@student.com / student123</div>
              <div><strong>Parent:</strong> parent@beebright.com / parent123</div>
              <div><strong>Tutor:</strong> tutor@beebright.com / tutor123</div>
              <div><strong>Admin:</strong> admin@beebright.com / admin123</div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6 text-red-700">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-primary-500 focus:outline-none transition"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-12 pr-12 py-3 rounded-xl border-2 border-neutral-200 focus:border-primary-500 focus:outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-neutral-300" />
                <span className="text-sm text-neutral-600">Remember me</span>
              </label>
              <button
                type="button"
                onClick={onForgotPassword}
                className="text-sm text-primary-600 hover:text-primary-700 font-semibold"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transform hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Logging in...
                </span>
              ) : (
                'Login to Dashboard'
              )}
            </button>
          </form>

          {/* Enrollment link */}
          <div className="mt-6 text-center">
            <p className="text-neutral-600 text-sm">
              Don't have an account yet?{' '}
              <button 
                onClick={onBack}
                className="text-primary-600 hover:text-primary-700 font-semibold"
              >
                Request Enrollment
              </button>
            </p>
            <p className="text-xs text-neutral-500 mt-2">
              💡 Accounts are created by administrators after enrollment approval
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center text-sm text-neutral-500">
          🔒 Your data is protected with industry-standard encryption
        </div>
      </div>
    </div>
  );
};

export default Login;